using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GroceryStore.Models
{
    public class CatProductMetaData
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal Total { get; set; }
        public double Qty { get; set; }
        public string ImagePath { get; set; }
        public int CatUnitId { get; set; }
        public string UnitText { get; set; }
        //public long RowIndex { get; set; }

        public string Description { get; set; }

        public double Quantity { get; set; }
        public bool IsOfferApplied { get; set; }
    }
}