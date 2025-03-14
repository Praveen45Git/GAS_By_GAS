using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Gas_By_Gas_API.Models
{
    public class Payment
    {
        public long tokenId { get; set; }
        public long customerId { get; set; }
        public long Amount { get; set; }
        public long outletId { get; set; }
        public decimal emptyQty { get; set; }
        public decimal amount { get; set; }
        public decimal payDate { get; set; }
    }
}