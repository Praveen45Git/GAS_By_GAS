using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Gas_By_Gas_API.Models
{
    public class Stock
    {
        public string StockNo { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public decimal RecQty { get; set; }
        public decimal IssQty { get; set; }
        public decimal StockInQty { get; set; }
        public decimal NewPrice { get; set; }
    }
}