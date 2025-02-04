using Gas_By_Gas_API.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
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



        [HttpGet]
        [Route("api/Stocks/CheckStock/{StockNo}")]
        public IHttpActionResult CheckStock(string StockNo)
        {
            // Corrected SQL Query to check stock existence
            string query = @"
        SELECT CASE 
            WHEN EXISTS (
                SELECT 1 
                FROM Stocks 
                WHERE StockNo = @stockno
            ) 
            THEN CAST(1 AS BIT)
            ELSE CAST(0 AS BIT)
        END AS [Exists]";

            try
            {
                // Connect to the database
                using (var conn = new SqlConnection(DbConfig.ConnectionString))
                {
                    conn.Open();
                    using (var command = new SqlCommand(query, conn))
                    {
                        // Add parameter to prevent SQL injection
                        command.Parameters.AddWithValue("@stockno", StockNo);

                        // Execute query
                        var exists = (bool)command.ExecuteScalar();
                        return Ok(new { exists }); // Return result as JSON
                    }
                }
            }
            catch (Exception ex)
            {
                // Handle errors
                return InternalServerError(ex);
            }
        }


        [HttpPost]
        [Route("api/Stocks/CreateStocks")]
        public IHttpActionResult CreateStocks([FromBody] Stock stock)
        {
            if (stock == null)
            {
                return BadRequest("Invalid product data.");
            }

            try
            {
                using (var conn = new SqlConnection(DbConfig.ConnectionString))
                {
                    conn.Open();

                    string query = @"INSERT INTO Stocks (StockNo, Name, Price, RecQty, IssQty, StockInQty)
                                 VALUES (@StockNo, @Name, @Price, @RecQty, @IssQty, @StockInQty)";

                    using (SqlCommand command = new SqlCommand(query, conn))
                    {
                        command.Parameters.AddWithValue("@StockNo", stock.StockNo);
                        command.Parameters.AddWithValue("@Name", stock.Name);
                        command.Parameters.AddWithValue("@Price", stock.Price);
                        command.Parameters.AddWithValue("@RecQty", 0);
                        command.Parameters.AddWithValue("@IssQty", 0);
                        command.Parameters.AddWithValue("@StockInQty", 0);

                        int rowsAffected = command.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            return Ok("Product inserted successfully.");
                        }
                        else
                        {
                            return BadRequest("Failed to insert the product.");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPut]
        [Route("api/Stocks/UpdateStocks")]
        public IHttpActionResult UpdateStocks([FromBody] Stock stock)
        {
            if (stock == null || string.IsNullOrEmpty(stock.StockNo))
            {
                return BadRequest("Invalid product data or missing StockNo.");
            }

            try
            {
                using (var conn = new SqlConnection(DbConfig.ConnectionString))
                {
                    conn.Open();

                    string query = @"UPDATE Stocks
                             SET Name = @Name,
                                 Price = @Price
                             WHERE StockNo = @StockNo";

                    using (SqlCommand command = new SqlCommand(query, conn))
                    {
                        command.Parameters.AddWithValue("@StockNo", stock.StockNo);
                        command.Parameters.AddWithValue("@Name", stock.Name);
                        command.Parameters.AddWithValue("@Price", stock.Price);

                        int rowsAffected = command.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            return Ok("Product updated successfully.");
                        }
                        else
                        {
                            return NotFound(); // If no rows were affected, the StockNo might not exist
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex); // Handle exceptions and return a 500 status code
            }
        }

        [HttpDelete]
        [Route("api/Stocks/DeleteStocks/{Stockno}")]
        public IHttpActionResult DeleteStocks(string Stockno)
        {

            try
            {
                using (var conn = new SqlConnection(DbConfig.ConnectionString))
                {
                    conn.Open();

                    string query = @"Delete Stocks WHERE StockNo = @StockNo";

                    using (SqlCommand command = new SqlCommand(query, conn))
                    {
                        command.Parameters.AddWithValue("@StockNo", Stockno);

                        int rowsAffected = command.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            return Ok("Product Deleted successfully.");
                        }
                        else
                        {
                            return NotFound(); // If no rows were affected, the StockNo might not exist
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex); // Handle exceptions and return a 500 status code
            }
        }


    }
}
