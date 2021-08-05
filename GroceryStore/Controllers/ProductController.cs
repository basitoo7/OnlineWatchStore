using GroceryStore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GroceryStore.Controllers
{
    public class ProductController : Controller
    {
        Square_Grocery_StoreEntities db = new Square_Grocery_StoreEntities();
        //
        // GET: /Produt/
        public ActionResult Index()
        {
            return View();
        }

        //public ActionResult GetProductsByCategory(int categoryId)
        [HttpGet]
        public JsonResult GetProductsByCategory(int categoryId)
        //public ActionResult GetProductsByCategory(int categoryId)
        {
            db.Configuration.ProxyCreationEnabled = false;
            IEnumerable<Product> products = db.Products.Where(p => p.catagory_id == categoryId && p.IsOfferApplied == false).ToList();
            //IEnumerable<Product> listAllProducts = db.Products.ToList();
            object data = null;
            try
            {

                if (products != null)
                {
                    data = new { Result = "SUCCESS", Records = products };
                    //data = new { Result = "SUCCESS", Records = products, ExtraData = listAllProducts };
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



        public JsonResult GetOfferProducts()
        {
            db.Configuration.ProxyCreationEnabled = false;
            IEnumerable<Product> offerProducts = db.Products.Where(p => p.IsOfferApplied == true).ToList();
            object data = null;
            try
            {
                if (offerProducts != null)
                {
                    data = new { Result = "SUCCESS", Records = offerProducts };
                    //data = new { Result = "SUCCESS", Records = products, ExtraData = listAllProducts };
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
            
        }



        public JsonResult GetAllProducts()
        {
            db.Configuration.ProxyCreationEnabled = false;
            IEnumerable<Product> products = db.Products.ToList();
            object data = null;
            try
            {
                if (products != null)
                {
                    data = new { Result = "SUCCESS", Records = products };
                    //data = new { Result = "SUCCESS", Records = products, ExtraData = listAllProducts };
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

	}
}