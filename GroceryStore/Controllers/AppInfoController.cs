using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GroceryStore.Controllers
{
    public class AppInfoController : Controller
    {
        //
        // GET: /AppInfo/
        //public ActionResult Index()
        //{
        //    return View();
        //}

        public ActionResult AboutUs()
        {
            return View();
        }

        public ActionResult NavigateToFAQs()
        {
            return View();
        }

        public ActionResult NavigateToHowToUse()
        {
            return View();
        }

        public ActionResult NavigateToAppInfo()
        {
            return View();
        }

	}
}