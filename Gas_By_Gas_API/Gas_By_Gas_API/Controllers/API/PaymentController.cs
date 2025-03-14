using Gas_By_Gas_API.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using static Gas_By_Gas_API.WebApiApplication;

namespace Gas_By_Gas_API.Controllers.API
{
    public class PaymentController : ApiController
    {
        private readonly string uploadPath = HttpContext.Current.Server.MapPath("~/UploadedImages");

        [HttpPost]
        [Route("api/Payments/ConfirmPayment")]
        public IHttpActionResult ConfirmPayment([FromBody] Payment payment)
        {
            var httpRequest = HttpContext.Current.Request;

            // Check if the request contains multipart content
            if (string.IsNullOrWhiteSpace(payment.tokenId.ToString()))
            {
                return BadRequest("Invalid payment data or missing required fields.");
            }

            try
            {                            
                using (var conn = new SqlConnection(DbConfig.ConnectionString))
                {
                    conn.Open();

                    // Insert payment details into the database
                    string query = @"INSERT INTO PaymentDetails 
                                     (TokenId, CustomerId, OutletId, PayDate, emptyQty, Amount)
                                     VALUES (@tokenId, @customerId, @outletId, @payDate, @emptyQty, @Amount)";

                    using (SqlCommand command = new SqlCommand(query, conn))
                    {
                        command.Parameters.AddWithValue("@tokenId", payment.tokenId);
                        command.Parameters.AddWithValue("@customerId", payment.customerId);
                        command.Parameters.AddWithValue("@outletId", payment.outletId);
                        command.Parameters.AddWithValue("@payDate", payment.payDate);
                
                        command.Parameters.AddWithValue("@emptyQty", payment.emptyQty);
                        command.Parameters.AddWithValue("@Amount", payment.amount);

                        int rowsAffected = command.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            return Ok("Payment confirmed successfully.");
                        }
                        else
                        {
                            return BadRequest("Failed to confirm the payment.");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpDelete]
        [Route("api/Payments/CancelPayment/{orderNo}")]
        public IHttpActionResult CancelPayment(string orderNo)
        {
            try
            {
                using (var conn = new SqlConnection(DbConfig.ConnectionString))
                {
                    conn.Open();

                    string query = "DELETE FROM PaymentDetails WHERE OrderNo = @OrderNo";

                    using (SqlCommand command = new SqlCommand(query, conn))
                    {
                        command.Parameters.AddWithValue("@OrderNo", orderNo);

                        int rowsAffected = command.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            return Ok("Payment cancelled successfully.");
                        }
                        else
                        {
                            return NotFound();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/Payments/GetAllPayments")]
        public IHttpActionResult GetAllPayments()
        {
            List<Payment> paymentDetails = new List<Payment>();

            try
            {
                using (var conn = new SqlConnection(DbConfig.ConnectionString))
                {
                    conn.Open();

                    string query = "SELECT * FROM PaymentDetails";

                    using (SqlCommand command = new SqlCommand(query, conn))
                    {
                        SqlDataReader reader = command.ExecuteReader();

                        while (reader.Read())
                        {
                            paymentDetails.Add(new Payment
                            {
                            });
                        }
                    }
                }

                return Ok(paymentDetails);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

    }
}
