var GS = GS || {};

GS.OrderTracking = {

    customer: {},
    productList: {},
    orderProgressStatusList: {},

    getTrackingRecord: function (trackingNo) {

        $.ajax({

            cache: false,
            async: true,
            dataType: "json",
            type: "POST",
            //url: '@Url.Action("getProductsByCategory", "Product")',
            url: "/OrderTracking/GetOrderTrackingRecord",
            data: { TrackingNo: trackingNo },

            //contentType: 'application/json; charset=utf-8',
            //cache: false,
            //data: {},
            success: function (response) {
                if (response.Records.ProductList.length == 0) {
                    alert("Invalid tracking number");
                    return;
                }
                GS.OrderTracking.customer = response.Records.Customer;
                GS.OrderTracking.productList = response.Records.ProductList;
                GS.OrderTracking.orderProgressStatusList = response.Records.OrderProgressStatusList;

                var trHTMLCustomerInfo = "";
                var statusImageURL = "";
                GS.OrderTracking.resetOrderProgressDivHTML();
                //var acceptedDeactiveImageURL = "/uploads/AcceptedActiveImage1.png";
                //var inProgressDeactiveImageURL = "/uploads/ActiveImageProgress1.png";
                //var shippedDeactiveImageURL = "/uploads/shipactive1.png";
                //var deliveredDeactiveImageURL = "/uploads/deliveredactive1.png";
                //var completedDeactiveImageURL = "/uploads/competedactive1.png";

                //$('.acceptedStatus').css('background-image', 'url(' + acceptedDeactiveImageURL + ')');
                //$('.inProgressStatus').css('background-image', 'url(' + inProgressDeactiveImageURL + ')');
                //$('.shippedStatus').css('background-image', 'url(' + shippedDeactiveImageURL + ')');
                //$('.deliveredStatus').css('background-image', 'url(' + deliveredDeactiveImageURL + ')');
                //$('.completedStatus').css('background-image', 'url(' + completedDeactiveImageURL + ')');

                if (GS.OrderTracking.customer.OrderProgressStatus == 1) {
                    GS.OrderTracking.customer.OrderProgressStatus = "Accepted";
                    statusImageURL = "/uploads/AcceptedActiveImage.png";
                    $('.acceptedStatus').css('background-image', 'url(' + statusImageURL + ')');
                    $(".spnAccepted").css("color", "#1800cf");
                }
                else if (GS.OrderTracking.customer.OrderProgressStatus == 2) {
                    GS.OrderTracking.customer.OrderProgressStatus = "In Progress";
                    statusImageURL = "/uploads/ActiveImageProgress.png";
                    $('.inProgressStatus').css('background-image', 'url(' + statusImageURL + ')');
                    $(".spnInProgress").css("color", "#1800cf");
                }
                else if (GS.OrderTracking.customer.OrderProgressStatus == 3) {
                    GS.OrderTracking.customer.OrderProgressStatus = "Shipped";
                    statusImageURL = "/uploads/shipactive.png";
                    $('.shippedStatus').css('background-image', 'url(' + statusImageURL + ')');
                    $(".spnShipped").css("color", "#1800cf");
                }
                else if (GS.OrderTracking.customer.OrderProgressStatus == 4) {
                    GS.OrderTracking.customer.OrderProgressStatus = "Delivered";
                    statusImageURL = "/uploads/deliveredactive.png";
                    $('.deliveredStatus').css('background-image', 'url(' + statusImageURL + ')');
                    $(".spnDelivered").css("color", "#1800cf");
                }
                else if (GS.OrderTracking.customer.OrderProgressStatus == 5) {
                    GS.OrderTracking.customer.OrderProgressStatus = "Completed";
                    statusImageURL = "/uploads/competedactive.png";
                    $('.completedStatus').css('background-image', 'url(' + statusImageURL + ')');
                    $(".spnCompleted").css("color", "#1800cf");
                }
                
                trHTMLCustomerInfo = '<tr><td>' + GS.OrderTracking.customer.Name + '</td><td>' + GS.OrderTracking.customer.Phone + '</td><td>' + GS.OrderTracking.customer.Email + '</td><td>' + GS.OrderTracking.customer.OrderTotal + '</td><td>' + GS.OrderTracking.customer.TrackingNumber + '</td><td class="tdOrderStatus">' + GS.OrderTracking.customer.OrderProgressStatus + '</td></tr>';
                $("#customerInfo tbody").html("");
                $("#customerInfo tbody").append(trHTMLCustomerInfo);

                //var trHTMLOrderDetails = "";
                $("#orderDetails tbody").html("");
                $.each(GS.OrderTracking.productList, function (index, value) {
                    var productTotal = value.Quantity * value.UnitPrice;
                    var productTotalRounded = productTotal.toFixed(2);
                    var trHTMLOrderDetails = '<tr><td>' + value.Title + '</td><td>' + value.Quantity + '</td><td>' + value.UnitPrice + '</td><td>' + productTotalRounded + '</td></tr>';
                    
                    $("#orderDetails tbody").append(trHTMLOrderDetails);
                });


            },
            error: function (xhr) {
                alert(xhr.responseText);
            }
        });




    },

    resetOrderProgressDivHTML: function () {
        var acceptedDeactiveImageURL = "/uploads/AcceptedActiveImage1.png";
        var inProgressDeactiveImageURL = "/uploads/ActiveImageProgress1.png";
        var shippedDeactiveImageURL = "/uploads/shipactive1.png";
        var deliveredDeactiveImageURL = "/uploads/deliveredactive1.png";
        var completedDeactiveImageURL = "/uploads/competedactive1.png";

        $('.acceptedStatus').css('background-image', 'url(' + acceptedDeactiveImageURL + ')');
        $('.inProgressStatus').css('background-image', 'url(' + inProgressDeactiveImageURL + ')');
        $('.shippedStatus').css('background-image', 'url(' + shippedDeactiveImageURL + ')');
        $('.deliveredStatus').css('background-image', 'url(' + deliveredDeactiveImageURL + ')');
        $('.completedStatus').css('background-image', 'url(' + completedDeactiveImageURL + ')');

        $(".spnAccepted").css("color", "#cf7400");
        $(".spnInProgress").css("color", "#cf7400");
        $(".spnShipped").css("color", "#cf7400");
        $(".spnDelivered").css("color", "#cf7400");
        $(".spnCompleted").css("color", "#cf7400");

    }

};

$(document).ready(function () {
    try {
        //GS.OrderTracking.productBoxItemTemplate = $(".productTemplate").clone().removeClass("productTemplate");
        //GS.OrderTracking.productBoxItemTemplate = $(".productTemplate").clone().removeClass("productTemplate").addClass("odw_productbox");


    }
    catch (e) {

    }

});

