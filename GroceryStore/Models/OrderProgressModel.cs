using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GroceryStore.Models
{
    public class OrderProgressModel
    {
        public long Id { get; set; }
        public long OrderMainId { get; set; }
        public DateTime Date { get; set; }
        public DateTime Time { get; set; }
        public Enumerations.OrderProgressStatus OrderProgressStatus { get; set; }
        public string UserInput { get; set; }
        public string Comment { get; set; }
    }
}