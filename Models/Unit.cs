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
    
    public partial class Unit
    {
        public Unit()
        {
            this.Products = new HashSet<Product>();
        }
    
        public long id { get; set; }
        public string name { get; set; }
    
        public virtual ICollection<Product> Products { get; set; }
    }
}