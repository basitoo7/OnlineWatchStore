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
    
    public partial class GetOrderTrackingRecord_Result
    {
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public decimal OrderTotal { get; set; }
        public string TrackingNumber { get; set; }
        public byte OrderProgressStatus { get; set; }
        public long OrderMainId { get; set; }
    }
}
