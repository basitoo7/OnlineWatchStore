using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GroceryStore.Models
{
    public class OrderProgressMetaData
    {
        public System.DateTime? OrderProgressDate { get; set; }
        public System.DateTime? OrderProgressTime { get; set; }
        //public BKDTO.Enumerations.OrderProgressStatus OrderProgressStatus { get; set; }
        public byte OrderProgressStatus { get; set; }

        public string OrderProgressDateString
        {
            get
            {
                if (OrderProgressDate.HasValue)
                {
                    //return OrderProgressDate.Value.ToString("dd/MM/yyyy");
                    return OrderProgressDate.Value.ToString("dddd, dd MMMM yyyy");
                }
                return string.Empty;
            }
        }

        public string OrderProgressTimeString
        {
            get
            {
                if (OrderProgressTime.HasValue)
                {
                    //return OrderProgressTime.Value.ToString("dd/MM/yyyy");
                    return OrderProgressTime.Value.ToString("hh:mm tt");
                }
                return string.Empty;
            }
        }

        public string OrderCancellationComments { get; set; }
    }
}