using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Gas_By_Gas_API.Models
{
    public class Users
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Type { get; set; }
        public DateTime Lastlogin { get; set; }
    }
}