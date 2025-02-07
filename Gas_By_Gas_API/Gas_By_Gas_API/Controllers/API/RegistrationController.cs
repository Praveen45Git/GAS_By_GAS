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
    public class RegistrationController : ApiController
    {

        [HttpGet]
        [Route("api/Registration/ValidateUser/{UserName}/{Password}")]
        public IHttpActionResult ValidateUser(string UserName, string Password)
        {
            using (var conn = new SqlConnection(DbConfig.ConnectionString))
            {
                string query = @"
                SELECT Type, Username 
                FROM Users 
                WHERE (Username = @Username OR EmailAddress = @UserName) 
                AND Password = @Password";

                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@Username", UserName);
                    cmd.Parameters.AddWithValue("@EmailAddress", UserName);
                    cmd.Parameters.AddWithValue("@Password", Password); // Consider using hashed passwords

                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            string userType = (string)reader["Type"];
                            string user = (string)reader["Username"];
                            return Ok(new { Type = userType, username = user});
                        }
                        else
                        {
                            return Content(HttpStatusCode.NotFound, "Invalid username or password.");
                        }
                    }
                }
            }
        }
    }
}
