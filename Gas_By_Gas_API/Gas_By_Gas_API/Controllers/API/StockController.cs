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
    public class StockController : ApiController
    {
        [HttpGet]
        [Route("api/Stocks/GetAllStocks")]
        public IHttpActionResult GetAllProducts()
        {
            List<Stock> products = new List<Stock>();

            using (var conn = new SqlConnection(DbConfig.ConnectionString))
            {
                string query = "SELECT * FROM Stocks";
                SqlCommand cmd = new SqlCommand(query, conn);
                conn.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    products.Add(new Stock
                    {
                        StockNo = (string)reader["StockNo"],
                        Name = reader["Name"].ToString(),
                        Price = (decimal)reader["Price"]
                    });
                }
            }

            return Ok(products);
        }

        [HttpGet]
        [Route("api/Stocks/GetStock/{stockno}")]
        public IHttpActionResult GetStocks(string stockno)
        {
            List<Stock> products = new List<Stock>();

            using (var conn = new SqlConnection(DbConfig.ConnectionString))
            {
                string query = "SELECT * FROM Stocks where stockno=@Stockno";
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@Stockno", stockno);
                conn.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    products.Add(new Stock
                    {
                        StockNo = (string)reader["StockNo"],
                        Name = reader["Name"].ToString(),
                        Price = (decimal)reader["Price"]
                    });
                }
            }

            return Ok(products);
        }

        [HttpGet]
        [Route("api/Stocks/GetStockByQty")]
        public IHttpActionResult GetStocksByQty()
        {
            List<Stock> products = new List<Stock>();

            using (var conn = new SqlConnection(DbConfig.ConnectionString))
            {
                string query = "SELECT * FROM Stocks where StockInQty > 0";
                SqlCommand cmd = new SqlCommand(query, conn);
                conn.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    products.Add(new Stock
                    {
                        StockNo = (string)reader["StockNo"],
                        Name = reader["Name"].ToString(),
                        Price = (decimal)reader["Price"]
                    });
                }
            }

            return Ok(products);
        }
    }
}
