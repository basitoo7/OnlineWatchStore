var GS = GS || {};

GS.LatestOrder = {

    //productBoxItemTemplate: {},
    orderList: [],

    getAllOrder: function () {

        $.ajax({

            dataType: "json",
            type: "GET",
            //url: '@Url.Action("getProductsByCategory", "Product")',
            url: "/LastestOrder/GetLatestOrders",


            contentType: 'application/json; charset=utf-8',
            cache: false,
            //data: {},
            success: function (response) {

                GS.LatestOrder.orderList = response.Records;

                var trHTML = "";

                $.each(GS.LatestOrder.orderList, function (key, value) {

                    if (value.OrderStatus == 1) {
                        value.OrderStatus = "Accepted";
                    }
                    else if (value.OrderStatus == 2) {
                        value.OrderStatus = "InProgress";
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
                    

                    trHTML = '<tr><td>' + value.CustomerName + '</td><td>' + value.CustomerPhone + '</td><td>' + value.CustomerEmail + '</td><td>' + value.OrderTotal + '</td><td>' + value.TrackingNumber + '</td><td class="tdOrderStatus">' + value.OrderStatus + '</td><td class="OrderMainID">' + value.OrderMainId + '</td><td class="btnOrderProgress"><input type=button class="btnAccepted" value="Accepted" /></td><td class="btnOrderProgress"><input type=button class="btnInProgress" value="In Progress" /></td><td class="btnOrderProgress"><input type=button class="btnShipped" value="Shipped" /></td><td class="btnOrderProgress"><input type=button class="btnDelivered" value="Delivered" /></td><td class="btnOrderProgress"><input type=button class="btnCompleted" value="Completed" /></td><td class="btnOrderProgress"><input type=button class="btnOrderCancel" value="Cancel" /></td></tr>';
                    //trHTML = '<tr><td>' + value.Title + '</td><td>' + value.Qty + '</td><td>' + value.UnitText + '</td><td>' + value.UnitPrice + '</td><td>' + "Pending" + '</td><td>' + value.OrderMainId + '</td><td>' + GS.LatestOrderDetail.orderTrackingNumber + '</td></tr>';

                    $("#body").append(trHTML);
                    $("#tblOrderList, #tblOrderList thead, #tblOrderList tr, #tblOrderList td").css("border", "1px solid black");
                    //$("#trackrecord .container").show();
                    $(".container").show();


                    $("#body .tdOrderStatus").each(function () {
                        var orderStatus = $(this).text();
                        if (orderStatus == "InProgress") {
                            $(this).siblings("td.btnOrderProgress").find("input.btnInProgress").parent().prevAll("td.btnOrderProgress").find("input").attr("disabled", "disabled");
                        }
                        else if (orderStatus == "Shipped") {
                            $(this).siblings("td.btnOrderProgress").find("input.btnShipped").parent().prevAll("td.btnOrderProgress").find("input").attr("disabled", "disabled");
                        }
                        else if (orderStatus == "Delivered") {
                            $(this).siblings("td.btnOrderProgress").find("input.btnDelivered").parent().prevAll("td.btnOrderProgress").find("input").attr("disabled", "disabled");
                        }
                        else if (orderStatus == "Completed") {
                            $(this).siblings("td.btnOrderProgress").find("input.btnCompleted").parent().prevAll("td.btnOrderProgress").find("input").attr("disabled", "disabled");
                        }
                        else if (orderStatus == "Cancelled") {
                            $(this).siblings("td.btnOrderProgress").find("input.btnOrderCancel").parent().prevAll("td.btnOrderProgress").find("input").attr("disabled", "disabled");
                        }


                    });

                });
            },
            error: function (xhr) {
                alert(xhr.responseText);
            }
        });




    },

    saveOrderStatus: function (orderMainId, orderProgressStatus, cancellationComments) {

        $.ajax({
            cache: false,
            async: true,
            data: {
                OrderMainId: orderMainId,
                OrderProgressStatus: orderProgressStatus,
                CancellationComments: cancellationComments
                
            },
            dataType: "json",
            type: "POST",
            url: "/LastestOrder/SaveOrderStatus",
            success: function (response) {
                //alert(response);
                if (response.Result == "SUCCESS") {

                    alert("Order Status saved successfully");
                }
                else {
                    alert("something went wrong");
                }

            }
        });

    }

};

$(document).ready(function () {
    try {
        //GS.LatestOrder.productBoxItemTemplate = $(".productTemplate").clone().removeClass("productTemplate");
        //GS.LatestOrder.productBoxItemTemplate = $(".productTemplate").clone().removeClass("productTemplate").addClass("odw_productbox");


    }
    catch (e) {

    }

});

