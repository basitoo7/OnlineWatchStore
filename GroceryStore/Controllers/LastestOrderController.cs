using GroceryStore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GroceryStore.Controllers
{
    public class LastestOrderController : Controller
    {

        Square_Grocery_StoreEntities db = new Square_Grocery_StoreEntities();

        // GET: LastestOrder
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetLatestOrders()
        //public ActionResult GetProductsByCategory(int categoryId)
        {
            //db.Configuration.ProxyCreationEnabled = false;
            var Orders = db.GetAllOrder().ToList();
            object data = null;
            try
            {

                if (Orders != null)
                {
                    data = new { Result = "SUCCESS", Records = Orders };
                }
                else
                {
                    data = new { Result = "ERROR", Message = "Something went wrong" };
                }
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
            //return View(products);
            return Json(data, JsonRequestBehavior.AllowGet);

            //ViewBag.Products = products;
            //return PartialView("~/Views/Shared/_GetProductsByCategory.cshtml");
        }

        //public JsonResult SaveOrderStatus(OrderProgressModel orderProgressStatus)
        public JsonResult SaveOrderStatus()
        {
            object data = null;
            OrderProgressModel orderProgressModel = new OrderProgressModel();
            try
            {
                orderProgressModel.OrderMainId = Convert.ToInt64(Request.Form["OrderMainId"]);
                orderProgressModel.OrderProgressStatus = (Enumerations.OrderProgressStatus)Enum.Parse(typeof(Enumerations.OrderProgressStatus), Request.Form["OrderProgressStatus"]);
                orderProgressModel.Comment = Request.Form["CancellationComments"];
                orderProgressModel.Date = DateTime.Now;
                orderProgressModel.Time = DateTime.Now;
                if (orderProgressModel.OrderMainId > 0 && orderProgressModel.OrderProgressStatus != null)
                {
                    db.SaveOrderStatus(orderProgressModel.OrderMainId, orderProgressModel.Date, orderProgressModel.Time, Convert.ToByte(orderProgressModel.OrderProgressStatus), orderProgressModel.Comment);
                    data = new { Result = "SUCCESS"};
                }
            }
            catch (Exception)
            {
                throw;
            }
            return Json(data, JsonRequestBehavior.AllowGet);
        }

    }
}