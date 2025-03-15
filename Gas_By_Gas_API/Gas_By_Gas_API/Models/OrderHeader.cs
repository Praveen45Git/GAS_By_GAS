using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Gas_By_Gas_API.Models
{
    public class OrderHeader
    {
        public long TokenId { get; set; }
        public string OutletId { get; set; }
        public string CustomerId { get; set; }
        public DateTime Date { get; set; }
        public DateTime DeliveryDate { get; set; }
        public string Status { get; set; }
        public List<OrderDetail> OrderDetail { get; set; }
    }
}