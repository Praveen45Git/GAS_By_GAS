using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Gas_By_Gas_API.Models
{
    public class Payment
    {
        public long id { get; set; } // Auto-generated unique identifier
        public long tokenId { get; set; } // Auto-generated unique identifier
        public string customerId { get; set; }
        public string outletId { get; set; }
        public DateTime payDate{ get; set; }
        public decimal amount { get; set; }
        public string emptyQty { get; set; }
    }
}