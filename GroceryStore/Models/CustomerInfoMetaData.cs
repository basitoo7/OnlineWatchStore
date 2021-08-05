using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GroceryStore.Models
{
    public class CustomerInfoMetaData
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }


        #region Association
        public decimal OrderTotal { get; set; }
        public string TrackingNumber { get; set; }
        //public BKDTO.Enumerations.OrderProgressStatus OrderProgressStatus { get; set; }
        public byte OrderProgressStatus { get; set; }
        public long OrderMainId { get; set; }
        //public string OrderCancellationComments { get; set; }
        #endregion
    }
}