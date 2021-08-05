using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GroceryStore.Models
{
    public class Enumerations
    {
        public enum OrderProgressStatus
        {
            Accepted = 1,
            InProgress = 2,
            Shipped = 3,
            Delivered = 4,
            Completed = 5,
            Cancelled = 6
            
        }
    }
}