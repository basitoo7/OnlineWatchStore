//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace GroceryStore.Models
{
    using System;
    
    public partial class GetAllOrder_Result
    {
        public string CustomerName { get; set; }
        public string CustomerPhone { get; set; }
        public string CustomerEmail { get; set; }
        public decimal OrderTotal { get; set; }
        public string TrackingNumber { get; set; }
        public byte OrderStatus { get; set; }
        public long OrderMainId { get; set; }
    }
}
