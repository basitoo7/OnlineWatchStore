using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using GroceryStore.Models;

namespace GroceryStore.Controllers
{
    public class CatagoriesController : Controller
    {
        private Square_Grocery_StoreEntities db = new Square_Grocery_StoreEntities();

        public object WebMsgBox { get; private set; }
        public object Hello { get; private set; }

        // GET: Catagories
        public ActionResult Index()
        {
            return View(db.Catagories.ToList());
        }

        // GET: Catagories/Details/5
        public ActionResult Details(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Catagory catagory = db.Catagories.Find(id);
            if (catagory == null)
            {
                return HttpNotFound();
            }
            return View(catagory);
        }

        // GET: Catagories/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Catagories/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "id,name,Is_deleted,is_created,description,is_active")] Catagory catagory)
        {
            if (ModelState.IsValid)
            {
                db.Catagories.Add(catagory);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(catagory);
        }

        // GET: Catagories/Edit/5
        public ActionResult Edit(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Catagory catagory = db.Catagories.Find(id);
            if (catagory == null)
            {
                return HttpNotFound();
            }
            return View(catagory);
        }

        // POST: Catagories/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "id,name,Is_deleted,is_created,description,is_active")] Catagory catagory)
        {

            if (catagory.id == 0)
            {
                TempData["Message"] = "Category id is required";
            }
            else if (catagory.name == " "|| catagory.name==null)
            {
                
                TempData["Message"] = "Category Name is required";
                

            }
            else if (catagory.Is_deleted == true)
            {
                TempData["Message"] = "Uncheck 'is_deleted' checkbox is required";
                
            }
            else if (catagory.is_created==null)
            {
                TempData["Message"] = "date of created category is required";

                
            }
            else if (catagory.description == " ")
            {
                TempData["Message"] = "Category description is required";
                
            }
            else if (catagory.is_active == false)
            {
                TempData["Message"] = "check 'is_created' checkbox is required";
                
            }
            else  if (ModelState.IsValid)     {        
                db.Entry(catagory).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(catagory);
        }

        // GET: Catagories/Delete/5
        public ActionResult Delete(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Catagory catagory = db.Catagories.Find(id);
            if (catagory == null)
            {
                return HttpNotFound();
            }
            return View(catagory);
        }

        // POST: Catagories/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(long id)
        {
            Catagory catagory = db.Catagories.Find(id);
            db.Catagories.Remove(catagory);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
