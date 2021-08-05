using GroceryStore.Common;
using GroceryStore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GroceryStore.Controllers
{
    public class CategoryController : Controller
    {
        Square_Grocery_StoreEntities db = new Square_Grocery_StoreEntities();
        //
        // GET: /Category/
        public ActionResult Index()
        {
            IEnumerable<Catagory> categories = db.Catagories.ToList();
            return View(categories);
        }


        public JsonResult Authenticate()
        {
            object data = null;
            try
            {

                UserRequest req = new UserRequest();

                req.User = new User();

                string userName = Request["UsernName"].ToString();
                string password = Request["UserPassword"].ToString();

                req.User.Email = userName;
                req.User.Password = password;
                //User userResponse = new User();
                var response = db.UM_AuthenticateUser(userName, password).FirstOrDefault();
                //userResponse = db.UM_AuthenticateUser(userName, password);
                //UserResponse response = new UserResponse();
                //response.AppUser = (User)returnedObject;
                //if (response.AppUser != null) //if user is authenticated
                if (response != null) //if user is authenticated
                {
                    LoggedInUser user = new LoggedInUser();

                    user.UserId = response.UserId;
                    user.FullName = response.FullName;
                    user.Email = response.Email;
                    user.Phone = response.Phone;
                    
                    //user.Password = response.Password;
                    user.Password = password;
                    
                    user.RoleId = response.CatUserRoleId;
                    user.Role = response.Role;
                    user.Designation = response.Designation;
                    Session[Appconstants.SessionConstants.USER_INFO] = user;
                    //data = new { Result = "SUCCESS", Records = response, ExtraData = user };
                    data = new { Result = "SUCCESS", Records = response };
                    
                }

            }
            

            catch (Exception)
            {
                //Response.Write("Either email or password is incorrect");
                data = new { Result = "ERROR" };
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            return Json(data, JsonRequestBehavior.AllowGet);
        }

    }
}