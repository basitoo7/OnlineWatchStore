using GroceryStore.Common;
using GroceryStore.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using RestSharp;

namespace GroceryStore.Controllers
{
    public class CustomerController : Controller
    {
        Square_Grocery_StoreEntities db = new Square_Grocery_StoreEntities();
        
        //
        // GET: /Customer/
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult SaveCustomerOrder(CustomerOrder customerOrder)
        {
            object data = null;

            try
            {
                customerOrder.CustomerName = Request.Form["Name"];
                customerOrder.CustomerPhone = Request.Form["Phone"];
                customerOrder.CustomerEmail = Request.Form["Email"];
                customerOrder.OrderMainTotalAmount = Convert.ToDecimal(Request.Form["TotalPrice"]);
                customerOrder.CustomerAddress = Request.Form["Address"];
                customerOrder.OrderMainStatus = 1;
                Session["Name"] = Request.Form["Name"];
                Session["Phone"] = Request.Form["Phone"];
                Session["Email"] = Request.Form["Email"];
                Session["TotalPrice"] = Request.Form["TotalPrice"];
                Session["Address"] = Request.Form["Address"];
                //customerOrder.Products = new JavaScriptSerializer().Deserialize<IList<Product>>(Request.Form["Products"]);
                customerOrder.Products = new JavaScriptSerializer().Deserialize<IList<ProductMetaData>>(Request.Form["Products"]);
                customerOrder.TrackingNumber = this.GenerateTrackingNumber();

                string xmlProducts = "";
                DataSet dsxml = new DataSet();
                if (customerOrder.Products != null && customerOrder.Products.Count > 0)
                {
                    DataTable product = DTConversionHelper.ToDataTable(customerOrder.Products);
                    product.TableName = "Product";
                    dsxml.Tables.Add(product);
                    xmlProducts = dsxml.GetXml();
                }

                //customerOrder.OrderMainId = db.SaveCustomerOrder(customerOrder.CustomerName, customerOrder.CustomerPhone, customerOrder.CustomerEmail, customerOrder.OrderMainDeliveryDate, customerOrder.OrderDate, customerOrder.OrderMainTotalAmount, customerOrder.OrderMainStatus, customerOrder.TrackingNumber, customerOrder.Products);
                customerOrder.OrderMainId = db.SaveCustomerOrder(customerOrder.CustomerName, customerOrder.CustomerPhone, customerOrder.CustomerEmail, customerOrder.OrderMainTotalAmount, customerOrder.CustomerAddress, customerOrder.OrderMainStatus, customerOrder.TrackingNumber, xmlProducts);

                //data = new {Message = "SUCCESS", Result = customerOrder.TrackingNumber, Records = customerOrder.TrackingNumber };
                data = new { Result = "SUCCESS", Records = customerOrder };
            }
            catch (Exception)
            {
                throw;
            }
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        private string GenerateTrackingNumber()
        {
            string trackingNumber = Guid.NewGuid().ToString();
            Session["trackingNumber"]= trackingNumber.Substring(0, 8);
            return trackingNumber.Substring(0, 8);
        }

        public JsonResult GetOrderDetailByCustomer()
        {
            object data = null;
            OrderDetailMetaData orderDetail = new OrderDetailMetaData();

            try
            {
                orderDetail.CustomerInfoId = Convert.ToInt64(Request.Form["CustomerInfoId"]);

                var orderDetailList = db.GetOrderDetailByCustomer(orderDetail.CustomerInfoId).ToList();
                data = new { Result = "SUCCESS", Records = orderDetailList };
            }
            catch (Exception)
            {
                throw;
            }
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetCustomerDetailForSMSForwarding()
        {
            object data = null;
            try
            {

                string toNumber = Request.Form["CustomerPhone"];

                string MessageText = "**S-Gold-Smith** \nDear "+Session["Name"]+ ", we just receive your order. you will receive order confirmation call very soon. \n\nOrder tracking No: " + Session["TrackingNumber"] + "\n\n Order total amount PKR: " + Session["TotalPrice"]+ "\n\n after confirmation, your order will deliver in 3 working days at " + Session["Address"] + "\n for tracking your order click link below \n\nhttp://sgoldsmith.pk/OrderTracking\n\nThanks for shopping with us.\n\nsgoldsmith.pk";
                string MessageText1 = "**S-Gold-Smith** \n New order request \n\nOrder detail number: " + Session["TrackingNumber"] + "\n click link below for order detail and enter the tracking number \n\nhttp://sgoldsmith.pk/OrderTracking\n\n Customer name: " + Session["Name"] + "\n\n Customer email: " + Session["Email"] + "\n\n Customer phone: " + Session["Phone"] + "\n\n Delivery address: " + Session["Address"] + ".\n for check new order click the link below \n\nhttp://sgoldsmith.pk/LastestOrder/Index";
                string jsonResponse = SendSMSToCustomer(toNumber, MessageText);
                string jsonResponse1 = SendSMSToOwner("03219999955", MessageText1);
                data = new { Result = "SUCCESS", Records = jsonResponse };
            }
            catch (Exception)
           {
                throw;
            }
            return Json(data, JsonRequestBehavior.AllowGet);
        }


        public string SendSMSToCustomer(string toNumber, string MessageText)
        {
            //string uri1= "http://smsctp1.eocean.us:24555/api?action=sendmessage&username=qmatic_careem_Api&password=pak!456&recipient="
            //        + MessageText + "&messagedata=" + "923084372370";
            try
            {
                var client = new RestClient("http://feedbackpro.io/");
                var json = "{\"phoneNumber\":\" + " + toNumber + " + \",\"body\":\"+" + MessageText +"\"}";
                var CreateVisitRequest = new RestRequest("sms/api/callSMSGateway", Method.POST);
                CreateVisitRequest.AddHeader("Content-Type", "application/json");
                CreateVisitRequest.AddParameter("application/json; charset=utf-8", json, ParameterType.RequestBody);
                CreateVisitRequest.RequestFormat = DataFormat.Json;
                var CreateVisitRespose = client.Execute(CreateVisitRequest);
            }
            catch (WebException ex)
            {
                var httpWebResponse = ex.Response as HttpWebResponse;
                if (httpWebResponse != null)
                {
                    switch (httpWebResponse.StatusCode)
                    {
                        case HttpStatusCode.NotFound:
                            return "404:URL not found :";
                            break;
                        case HttpStatusCode.BadRequest:
                            return "400:Bad Request";
                            break;
                        default:
                            return httpWebResponse.StatusCode.ToString();
                    }
                }
            }
            return null;
        }
        public string SendSMSToOwner(string toNumber, string MessageText1)
        {
            //string uri1= "http://smsctp1.eocean.us:24555/api?action=sendmessage&username=qmatic_careem_Api&password=pak!456&recipient="
            //        + MessageText + "&messagedata=" + "923084372370";
            try
            {
                var client = new RestClient("http://feedbackpro.io/");
                var json = "{\"phoneNumber\":\" + " + toNumber + " + \",\"body\":\"+" + MessageText1 + "\"}";
                var CreateVisitRequest = new RestRequest("sms/api/callSMSGateway", Method.POST);
                CreateVisitRequest.AddHeader("Content-Type", "application/json");
                CreateVisitRequest.AddParameter("application/json; charset=utf-8", json, ParameterType.RequestBody);
                CreateVisitRequest.RequestFormat = DataFormat.Json;
                var CreateVisitRespose = client.Execute(CreateVisitRequest);
                Session.Abandon();
            }
            catch (WebException ex)
            {
                var httpWebResponse = ex.Response as HttpWebResponse;
                if (httpWebResponse != null)
                {
                    switch (httpWebResponse.StatusCode)
                    {
                        case HttpStatusCode.NotFound:
                            return "404:URL not found :";
                            break;
                        case HttpStatusCode.BadRequest:
                            return "400:Bad Request";
                            break;
                        default:
                            return httpWebResponse.StatusCode.ToString();
                    }
                }
            }
            return null;
        }
    }
}