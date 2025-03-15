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

  
        // GET: api/Users
        [HttpGet]
        [Route("api/Users")]
        public IHttpActionResult GetAllUsers()
        {
            List<User> users = new List<User>();

            using (var conn = new SqlConnection(DbConfig.ConnectionString))
            {
                string query = "SELECT * FROM Users";
                SqlCommand cmd = new SqlCommand(query, conn);
                conn.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    users.Add(new User
                    {
                        UserName = reader["UserName"].ToString(),
                        Password = reader["Password"].ToString(),
                        EmailAddress = reader["EmailAddress"].ToString(),
                        LastLogin = reader["LastLogin"] == DBNull.Value ? (DateTime?)null : (DateTime)reader["LastLogin"],
                        Type = reader["Type"].ToString(),
                    });
                }
            }

            return Ok(users);
        }

        // POST: api/Users
        [HttpPost]
        [Route("api/Users")]
        public IHttpActionResult InsertUser([FromBody] User newUser)
        {
            if (newUser == null)
            {
                return BadRequest("User data is null.");
            }

            using (var conn = new SqlConnection(DbConfig.ConnectionString))
            {
                string query = "INSERT INTO Users (UserName, Password, EmailAddress, LastLogin, Type) VALUES (@UserName, @Password, @EmailAddress, @LastLogin, @Type)";
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@UserName", newUser.UserName);
                cmd.Parameters.AddWithValue("@Password", newUser.Password);
                cmd.Parameters.AddWithValue("@EmailAddress", newUser.EmailAddress);
                cmd.Parameters.AddWithValue("@LastLogin", (object)newUser.LastLogin ?? DBNull.Value);
                cmd.Parameters.AddWithValue("@Type", newUser.Type);

                conn.Open();
                cmd.ExecuteNonQuery();
            }

            return CreatedAtRoute("DefaultApi", new { id = newUser.UserName }, newUser);
        }
    }
}

    // User model to match your Users table
    public class User
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string EmailAddress { get; set; }
        public DateTime? LastLogin { get; set; }
        public string Type { get; set; }
    }