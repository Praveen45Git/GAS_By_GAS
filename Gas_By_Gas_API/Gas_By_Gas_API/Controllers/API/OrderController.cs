using Gas_By_Gas_API.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using static Gas_By_Gas_API.WebApiApplication;

namespace Gas_By_Gas_API.Controllers.API
{
    public class OrderController : ApiController
    {
        [HttpPost]
        [Route("api/Stocks/InsertOrder")]
        public IHttpActionResult InsertOrder([FromBody] OrderHeader orders)
        {
            if (orders == null || orders.OrderDetail == null || !orders.OrderDetail.Any())
            {
                return BadRequest("Invalid order data.");
            }

            try
            {
                using (var conn = new SqlConnection(DbConfig.ConnectionString))
                {
                    conn.Open();

                    // Begin a transaction
                    using (var transaction = conn.BeginTransaction())
                    {
                        try
                        {
                            // Insert into OrderHeader table
                            string queryHeader = @"INSERT INTO Orderheader (OutletId, CustomerId, Date, DeliveryDate, Status)
                                           VALUES (@OutletId, @CustomerId, GetDate(), @DeliveryDate, 'P');
                                           SELECT SCOPE_IDENTITY();";

                            using (var commandHeader = new SqlCommand(queryHeader, conn, transaction))
                            {
                                commandHeader.Parameters.AddWithValue("@TokenId", orders.TokenId);
                                commandHeader.Parameters.AddWithValue("@OutletId", orders.OutletId);
                                commandHeader.Parameters.AddWithValue("@CustomerId", orders.CustomerId);
                                commandHeader.Parameters.AddWithValue("@DeliveryDate", orders.DeliveryDate);

                                // Get the newly inserted OrderHeader ID
                                long TokenId = Convert.ToInt64(commandHeader.ExecuteScalar());

                                // Insert into OrderDetail table for each item
                                string queryDetail = @"INSERT INTO OrderDetail (TokenId, StockNo, Qty, Price,Amount)
                                               VALUES (@TokenId, @StockNo, @Qty, @Price,@Amount)";

                                foreach (var detail in orders.OrderDetail)
                                {
                                    using (var commandDetail = new SqlCommand(queryDetail, conn, transaction))
                                    {
                                        commandDetail.Parameters.AddWithValue("@TokenId", TokenId);
                                        commandDetail.Parameters.AddWithValue("@StockNo", detail.StockNo);
                                        commandDetail.Parameters.AddWithValue("@Qty", detail.Qty);
                                        commandDetail.Parameters.AddWithValue("@Price", detail.Price);
                                        commandDetail.Parameters.AddWithValue("@Amount", detail.Amount);

                                        commandDetail.ExecuteNonQuery();
                                    }
                                }
                            }

                            // Commit the transaction
                            transaction.Commit();
                            return Ok("Order inserted successfully.");
                        }
                        catch (Exception)
                        {
                            // Rollback the transaction in case of an error
                            transaction.Rollback();
                            throw;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

    }
}
