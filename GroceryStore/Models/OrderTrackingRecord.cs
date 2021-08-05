using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GroceryStore.Models
{
    public class OrderTrackingRecord
    {
        public string TrackingNumber { get; set; }

        public CustomerInfoMetaData Customer { get; set; }
        public List<CatProductMetaData> ProductList { get; set; }
        public List<OrderProgressMetaData> OrderProgressStatusList { get; set; }
    }
}