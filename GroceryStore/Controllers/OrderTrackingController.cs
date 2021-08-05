using GroceryStore.Models;
using Raven.Database.Plugins.Builtins.Monitoring.Snmp.Objects.Database.Statistics;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GroceryStore.Controllers
{
    public class OrderTrackingController : Controller
    {
        //
        // GET: /OrderTracking/
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetOrderTrackingRecord()
        {
            object data = null;
            OrderTrackingRecord orderTrackingRecord = new OrderTrackingRecord();
            //orderTrackingRecord.TrackingNumber = "9e81b2ec";
            orderTrackingRecord.TrackingNumber = Request.Form["TrackingNo"];
            try
            {
                string connectionString = ConfigurationManager.ConnectionStrings["Square_Grocery_StoreEntities"].ConnectionString;
                if (connectionString.ToLower().StartsWith("metadata="))
                {
                    System.Data.Entity.Core.EntityClient.EntityConnectionStringBuilder efBuilder = new System.Data.Entity.Core.EntityClient.EntityConnectionStringBuilder(connectionString);
                    connectionString = efBuilder.ProviderConnectionString;
                }
                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    SqlDataAdapter dataAdapter = new SqlDataAdapter("GetOrderTrackingRecord", conn);
                    dataAdapter.SelectCommand.CommandType = CommandType.StoredProcedure;
                    dataAdapter.SelectCommand.Parameters.AddWithValue("@TrackingNo", orderTrackingRecord.TrackingNumber);

                    DataSet ds = new DataSet();
                    dataAdapter.Fill(ds);
                    if (ds != null || ds.Tables.Count > 0)
                    {
                        orderTrackingRecord.Customer = DbHelper.MapDataTableToObject<CustomerInfoMetaData>(ds.Tables[0]);
                        orderTrackingRecord.ProductList = DbHelper.MapDataTableToList<CatProductMetaData>(ds.Tables[1]).ToList();
                        orderTrackingRecord.OrderProgressStatusList = DbHelper.MapDataTableToList<OrderProgressMetaData>(ds.Tables[2]).ToList();
                    }
                    data = new { Result = "SUCCESS", Records = orderTrackingRecord };
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return Json(data, JsonRequestBehavior.AllowGet);
        }
	}
}