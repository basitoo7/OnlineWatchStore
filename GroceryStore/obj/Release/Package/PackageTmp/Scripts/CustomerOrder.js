var CustomerOrder = CustomerOrder || {};

CustomerOrder.Structure = {

    orderDetailList: {},

    getorderdetailbycustomer: function (customerInfoId) {
        

        $.ajax({
            cache: false,
            async: true,
            //data: {
            //    CustomerInfoId: customerInfoId,
            //    method: 'GetOrderDetailByCustomer'

            //},
            dataType: "json",
            type: "POST",
            url: "/Customer/GetOrderDetailByCustomer",
            data: { CustomerInfoId: customerInfoId },
            success: function (response) {
                //alert(response);
                CustomerOrder.Structure.orderDetailList = response.Records;
                
                var trHTML = "";

                $.each(CustomerOrder.Structure.orderDetailList, function (key, value) {

                    if (value.OrderStatus == 1) {
                        value.OrderStatus = "Accepted";
                    }
                    else if (value.OrderStatus == 2) {
                        value.OrderStatus = "In Progress";
                    }
                    else if (value.OrderStatus == 3) {
                        value.OrderStatus = "Shipped";
                    }
                    else if (value.OrderStatus == 4) {
                        value.OrderStatus = "Delivered";
                    }
                    else if (value.OrderStatus == 5) {
                        value.OrderStatus = "Completed";
                    }
                    else if (value.OrderStatus == 6) {
                        value.OrderStatus = "Cancelled";
                    }

                    var productTotal = value.Qty * value.UnitPrice;

                    var productTotalRounded = productTotal.toFixed(2);

                    trHTML = '<tr><td style="color:#000000">' + value.product_name + '</td><td style="color:#000000">' + value.Qty + '</td><td style="color:#000000">' + value.UnitPrice + '</td><td style="color:#000000">' + productTotalRounded + '</td></tr>';
                    //trHTML = '<tr><td>' + value.Title + '</td><td>' + value.Qty + '</td><td>' + value.UnitText + '</td><td>' + value.UnitPrice + '</td><td>' + value.OrderStatus + '</td><td>' + value.OrderMainId + '</td></tr>';
                    //trHTML = '<tr><td>' + value.Title + '</td><td>' + value.Qty + '</td><td>' + value.UnitText + '</td><td>' + value.UnitPrice + '</td><td>' + "Pending" + '</td><td>' + value.OrderMainId + '</td><td>' + BK.OrderDetail.orderTrackingNumber + '</td></tr>';

                    //$("#body").append(trHTML);
                    $("#tblCustomerDetail tbody").append(trHTML);

                });


            }
        });
    },

    //phone, Customer.Name, Customer.TrackingNumber, Customer.OrderTotal, Customer.Email, Customer.OrderStatus
    getDetailForSMSForwarding: function (customerPhone, customerName, trackingNumber, customerOrderTotal, customerEmail, customerOrderStatus)
    {
        debugger;
        $.ajax({
            cache: false,
            async: true,
            dataType: "json",
            type: "POST",
            url: "/Customer/GetCustomerDetailForSMSForwarding",
            data: { CustomerPhone: customerPhone, TrackingNumber: trackingNumber, CustomerName: customerName, OrderMainTotalAmount: customerOrderTotal, CustomerEmail: customerEmail, CustomerOrderStatus: customerOrderStatus },
            success: function (response) {
                //alert(response);
                
                if (response.Result == "SUCCESS") {

                    alert("Tracking number successfully forwarded to customer");
                }
                else {
                    alert("something went wrong");
                }

            }
        });
    }

}

$(document).ready(function () {

    //var Customer = JSON.parse(localStorage.getItem("customer"));

    //CustomerOrder.Structure.getorderdetailbycustomer(Customer.CustomerInfoId);
});