using GroceryStore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GroceryStore.Controllers
{
    public class SignupController : Controller
    {

        Square_Grocery_StoreEntities db = new Square_Grocery_StoreEntities();

        //
        // GET: /Signup/
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult SaveNewUser()
        {
            object data = null;
            SignUpModel signupModel = new SignUpModel();
            
            try
            {
                signupModel.FullName = Request.Form["FullName"];
                signupModel.Email = Request.Form["Email"];
                signupModel.Password = Request.Form["Password"];
                signupModel.Phone = Request.Form["Phone"];
                signupModel.CreatedDate = DateTime.Now;
                //signupModel.UserInfoId = Convert.ToInt64(db.SaveNewUser(signupModel.FullName, signupModel.Email, signupModel.Password, signupModel.Phone));

                db.SaveNewUser(signupModel.FullName, signupModel.Email, signupModel.Password, signupModel.Phone, signupModel.CreatedDate);
                data = new { Result = "SUCCESS"};
                //if (signupModel.UserInfoId > 0)
                //{
                //    data = new { Result = "SUCCESS", Records = signupModel.UserInfoId};
                //}
            }
            catch (Exception)
            {
                throw;
            }
            return Json(data, JsonRequestBehavior.AllowGet);
        }
	}
}