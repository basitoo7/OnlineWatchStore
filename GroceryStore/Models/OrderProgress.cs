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
    using System.Collections.Generic;
    
    public partial class OrderProgress
    {
        public long Id { get; set; }
        public long OrderMainId { get; set; }
        public System.DateTime Date { get; set; }
        public System.DateTime Time { get; set; }
        public byte Status { get; set; }
    
        public virtual OrderMain OrderMain { get; set; }
    }
}
