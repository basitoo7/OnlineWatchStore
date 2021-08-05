var Categories = Categories || {};

Categories.Structure = {

    productItemTemplate: {},
    productList: [],
    offerProductList: [],
    Customer: {},
    
    finalOrderedProductsListCategoryJs: [],

    //For implementing search
    allProductListFromDB: [],
    //For implementing search

    productListForDivOne: [],
    //if your products / items are more than 8,     than you need to add      productListForDivTwo: []
    productListForDivTwo: [],
    //if your products / items are more than 16,     than you need to add      productListForDivThree: []

    getProductsByCategory: function (categoryId) {
        //$.get('@Url.Action("WelcomeMsg","[controller]")', { input: name }, function (data) {
        //    Categories.Structure.productList = data;
        //    //$("#rData").html(data);
        //});
        $.ajax({
            
            dataType: "json",
            type: "GET",
            //url: '@Url.Action("getProductsByCategory", "Product")',
            url: "/Product/getProductsByCategory",
            data: { categoryId: categoryId },
                    
            contentType: 'application/json; charset=utf-8',
            cache: false,
            //data: {},
            success: function (response) {

                Categories.Structure.productList = response.Records;
                Categories.Structure.Customer.DBProductList = Categories.Structure.productList;

                //For implementing search
                //Categories.Structure.allProductListFromDB = response.ExtraData;
                //var fullNameSearchData = [];
                //$(Categories.Structure.allProductListFromDB).each(function (index, elem) {
                //    fullNameSearchData.push(elem.product_name);
                //});

                //$("#txtSearchbox").autocomplete({
                //    source: fullNameSearchData,
                //    minLength: 2
                //});

                //For implementing search

                localStorage.setItem("customer", JSON.stringify(Categories.Structure.Customer));
                var Customer = JSON.parse(localStorage.getItem("customer"));


                $.each(Categories.Structure.productList, function (key, value) {

                    var divContainingListOne = Categories.Structure.productItemTemplate.clone();
                    $(divContainingListOne).data("dataItem", value);
                    $(divContainingListOne).attr("id", value.product_id);
                    //$(divContainingListOne).attr("class", "dynamicallyAddedDiv");

                    var category = "";
                    if (value.catagory_id == 1) {
                        category = "JEWELLERY";
                        $("#divProducts").parent().find("h3").text(category);
                    }
                    else if (value.catagory_id == 2) {
                        category = "RADO";
                        $("#divProducts").parent().find("h3").text(category);
                    }
                    else if (value.catagory_id == 3) {
                        category = "TISSOT";
                        $("#divProducts").parent().find("h3").text(category);
                    }
                    else if (value.catagory_id == 4) {
                        category = "GUESS";
                        $("#divProducts").parent().find("h3").text(category);
                    }
                    else if (value.catagory_id == 5) {
                        category = "EMPORIO ARMANI";
                        $("#divProducts").parent().find("h3").text(category);
                    }
                    else if (value.catagory_id == 6) {
                        category = "MICHAEL KORS";
                        $("#divProducts").parent().find("h3").text(category);
                    }
                    else if (value.catagory_id == 7) {
                        category = "CITIZEN";
                        $("#divProducts").parent().find("h3").text(category);
                    }
                    else if (value.catagory_id == 8) {
                        category = "EDIFICE";
                        $("#divProducts").parent().find("h3").text(category +" Products");
                    }
                    else if (value.catagory_id == 9) {
                        category = "USED WATCHES";
                        $("#divProducts").parent().find("h3").text(category + " Products");
                    }
                    else {
                        category = "Others";
                        $("#divProducts").parent().find("h3").text(category + " Products");
                    }

                    
                    $(divContainingListOne).addClass("col-md-4 top_brand_left dynamicallyAddedDiv");
                    
                    $(divContainingListOne).find("img.productImage").attr("src", value.image_path);
                    $(divContainingListOne).find("p.productName").text(value.product_name);
                    $(divContainingListOne).find("span.productPrice").text(value.Product_price);
                    
                    $("#divProducts").append(divContainingListOne);
                    $(".dynamicallyAddedDiv").show();
                });
                
            },
            error: function (xhr) {
                alert(xhr.responseText);
            }
        });
    },



    getOfferProducts: function () {
        $.ajax({

            dataType: "json",
            type: "GET",
            url: "/Product/GetOfferProducts",
            contentType: 'application/json; charset=utf-8',
            cache: false,
            success: function (response) {

                Categories.Structure.offerProductList = response.Records;
                Categories.Structure.Customer.DBOfferProductList = Categories.Structure.offerProductList;

                localStorage.setItem("customer", JSON.stringify(Categories.Structure.Customer));
                var Customer = JSON.parse(localStorage.getItem("customer"));


                $.each(Categories.Structure.offerProductList, function (key, value) {

                    var divContainingListOne = Categories.Structure.productItemTemplate.clone();
                    $(divContainingListOne).data("dataItem", value);
                    $(divContainingListOne).attr("id", value.product_id);
                    var category = "Today's Hot Offer";
                    $("#divProducts").parent().find("h3").text(category);
                    $(divContainingListOne).addClass("col-md-3 top_brand_left dynamicallyAddedDiv");

                    $(divContainingListOne).find("img.productImage").attr("src", value.image_path);
                    $(divContainingListOne).find("p.productName").text(value.product_name);
                    $(divContainingListOne).find("span.productPrice").text(value.Product_price);

                    $(divContainingListOne).find("span.productPrice").css("text-decoration", "line-through");

                    //$(".dynamicallyAddedDiv figure:eq(0)").prepend("<img class='offerImage' style='position:absolute;top:0;width:70px;height:100px;left:0' />")
                    //$(divContainingListOne).find("figure").prepend("<img class='offerImage' style='position:absolute;top:0;width:70px;height:100px;left:0' />")
                    $(divContainingListOne).find(".agile_top_brand_left_grid1").prepend("<img class='offerImage' style='position:absolute;top:0;width:70px;height:100px;left:0' />")
                    

                    var imagePath = '/images/offer.png';
                    //$(".offerImage").attr("src", "@Url.Content('~/images/offer.png')");
                    //$(".offerImage").attr("src", imagePath);
                    $(divContainingListOne).find(".offerImage").attr("src", imagePath);

                    var offerPercentage = 0.1;
                    var discountedPrice = value.Product_price * offerPercentage;
                    var priceAfterDiscount = value.Product_price - discountedPrice;
                    $(divContainingListOne).find(".snipcart-thumb").append("<label style='margin-left:40px;'>PKR:<label><span class='discountPrice'>" + priceAfterDiscount + "</span>");


                    $("#divProducts").append(divContainingListOne);
                    $(".dynamicallyAddedDiv").show();
                });

            },
            error: function (xhr) {
                alert(xhr.responseText);
            }
        });
    },



    populateMiniCartDialogItems: function (dataSourceDiv) {

        var DivData = $(dataSourceDiv).data("dataItem");

        //var productId = $(dataSourceDiv).attr("id");
        var productId = DivData.product_id;
        var productImage = $(dataSourceDiv).find("img").attr("src");
        var productTitle = $(dataSourceDiv).find(".productName").text();
        productTitle = $.trim(productTitle);
        //var productQtyText = $(dataSourceDiv).find(".quantity").val();
        //var productQtyValue = parseFloat(productQtyText);
        //var productUnitText = $(dataSourceDiv).find(".unitText").text();

        //var isOfferAppliedProduct = false;
        //if ($(dataSourceDiv).find(".discountPrice")) {
        //    isOfferAppliedProduct = true;
        //}

        var productUnitPriceText = "";
        var productUnitPriceValue = 0.0;
        var productValueRounded = 0.0;
        if (DivData.IsOfferApplied) {
            productUnitPriceText = $(dataSourceDiv).find(".discountPrice").text();
            productUnitPriceValue = parseFloat(productUnitPriceText);
            productValueRounded = productUnitPriceValue.toFixed(2);
        }
        else {
            productUnitPriceText = $(dataSourceDiv).find(".productPrice").text();
            productUnitPriceValue = parseFloat(productUnitPriceText);
            productValueRounded = productUnitPriceValue.toFixed(2);
        }

        var productQtyValue = 1;

        //var trLength = $(".tbodyRow tr").length;
        //if (tr.length > 0) {
        //    var rowData = [];
        //    rowData = $(".tbodyRow tr").toArray();
        //    $(rowData).each(function (index, value) {

        //    });

        var trLength = $(".tbodyRow tr").length;
        if (trLength > 0) {
            var IsProductAlreadyExisting = false;
            $(".tbodyRow tr").each(function (index, value) {
                var productName = $(this).find(".yourorderproname").text();
                productName = $.trim(productName);
                if (productName == productTitle) {
                    IsProductAlreadyExisting = true;
                    
                    return false;                       //for breaking out of loop

                    //var qty = $(this).find(".txtQty").val();
                    //var parsedQty = parseInt(qty);
                    //productQtyValue = parsedQty + 1;
                    //$(this).find(".txtQty").val(productQtyValue);
                    //var newQty = $(this).find(".txtQty").val();
                    //var parsedNewQty = parseInt(newQty);
                    //var unitPrice = $(this).find(".unitPrice").text();
                    //var parsedUnitPrice = parseFloat(unitPrice);
                    //var rowTotal = parsedNewQty * parsedUnitPrice;
                    //$(this).find(".rowTotal").text(rowTotal);
                    //Categories.Structure.calculateOrderTotal();
                }
                
                //else {
                //    IsProductAlreadyExisting = false;
                //}
                //else {
                //    var trHTML = "";
                //    //trHTML += '<tr id="' + productId + '" class="dynamicRow"><td><a href="javascript:void(0);" class="yourorderclosebtn"><img alt="" src="images/closebtn.png" /></a><span class="yourorderimg"><img alt="" src="' + productImage + '" /></span><span class="yourorderproname>' + productTitle + '</span></td><td class="blankTD unitPrice">' + productUnitPriceValue + '</td><td class="qty blankTD"><input type="text" class="yourorderquantity txtQty qtySpinner" value="' + productQtyValue + '" maxlength="5" style="width: 70px" /></td><td class="specific rowTotal blankTD">' + productValue + '</td></tr>';
                //    //trHTML += '<tr id="' + productId + '" class="dynamicRow"><td><a href="javascript:void(0);" class="yourorderclosebtn"><img alt="" src="images/closebtn.png" class="mCS_img_loaded" /></a><span class="yourorderimg"><img class="mCS_img_loaded alt="" src="' + productImage + '" style="width: 40px; height: 40px;" /></span><span class="yourorderproname>' + productTitle + '</span></td><td class="blankTD unitPrice">' + productUnitPriceValue + '</td><td class="qty blankTD"><input type="text" class="yourorderquantity txtQty qtySpinner" value="' + productQtyValue + '" maxlength="5" style="width: 70px" /></td><td class="specific rowTotal blankTD">' + productValue + '</td></tr>';

                //    trHTML += '<tr id="' + productId + '" ><td style="width: 40px;"><a href="javascript:void(0);" class="yourorderclosebtn" ><img alt="" src="/images/closebtn.png" class="mCS_img_loaded removeProduct" /></a><span class="yourorderimg" ><img class="mCS_img_loaded alt="" src="' + productImage + '" style="width: 40px; height: 40px;" /></span><span class="yourorderproname"> ' + productTitle + ' </span></td><td class="unitPrice" >' + productUnitPriceValue + '</td><td class="qty" ><input type="text" class="yourorderquantity txtQty" value="' + productQtyValue + '" maxlength="3" style="width: 70px" /></td><td class="specific rowTotal">' + productValueRounded + '</td></tr>';


                //    $(".yourordertable tbody.tbodyRow").append(trHTML);
                //    //$(".yourordertable tbody.tbodyRow tr.trGrandTotal").before(trHTML);
                //    //$(".containerDivCart").show();
                //    $(".ui-dialog-titlebar-close img").remove();

                //    //Categories.Structure.displayCartBox();
                //    $(".ui-dialog-titlebar-close").append('<img src="/images/closebtn.png" />');
                //    Categories.Structure.calculateOrderTotal();
                //}
            });
            if (IsProductAlreadyExisting) {
                alert("This product already added");
            }
            else {
                var trHTML = "";
                //trHTML += '<tr id="' + productId + '" class="dynamicRow"><td><a href="javascript:void(0);" class="yourorderclosebtn"><img alt="" src="images/closebtn.png" /></a><span class="yourorderimg"><img alt="" src="' + productImage + '" /></span><span class="yourorderproname>' + productTitle + '</span></td><td class="blankTD unitPrice">' + productUnitPriceValue + '</td><td class="qty blankTD"><input type="text" class="yourorderquantity txtQty qtySpinner" value="' + productQtyValue + '" maxlength="5" style="width: 70px" /></td><td class="specific rowTotal blankTD">' + productValue + '</td></tr>';
                //trHTML += '<tr id="' + productId + '" class="dynamicRow"><td><a href="javascript:void(0);" class="yourorderclosebtn"><img alt="" src="images/closebtn.png" class="mCS_img_loaded" /></a><span class="yourorderimg"><img class="mCS_img_loaded alt="" src="' + productImage + '" style="width: 40px; height: 40px;" /></span><span class="yourorderproname>' + productTitle + '</span></td><td class="blankTD unitPrice">' + productUnitPriceValue + '</td><td class="qty blankTD"><input type="text" class="yourorderquantity txtQty qtySpinner" value="' + productQtyValue + '" maxlength="5" style="width: 70px" /></td><td class="specific rowTotal blankTD">' + productValue + '</td></tr>';

                trHTML += '<tr id="' + productId + '" ><td style="width: 40px;"><a href="javascript:void(0);" class="yourorderclosebtn" ><img alt="" src="/images/closebtn.png" class="mCS_img_loaded removeProduct" /></a><span class="yourorderimg" ><img class="mCS_img_loaded alt="" src="' + productImage + '" style="width: 40px; height: 40px;" /></span><span class="yourorderproname"> ' + productTitle + ' </span></td><td class="unitPrice" >' + productUnitPriceValue + '</td><td class="qty" ><input type="text" class="yourorderquantity txtQty" value="' + productQtyValue + '" maxlength="3" style="width: 70px" /></td><td class="specific rowTotal">' + productValueRounded + '</td></tr>';


                $(".yourordertable tbody.tbodyRow").append(trHTML);
                //$(".yourordertable tbody.tbodyRow tr.trGrandTotal").before(trHTML);
                //$(".containerDivCart").show();
                $(".ui-dialog-titlebar-close img").remove();

                //Categories.Structure.displayCartBox();


                $(".ui-dialog-titlebar-close").append('<img src="/images/closebtn.png" />');
                //$(".ui-dialog-titlebar-close").append('<img src="#" alt="close" />');
                //$(".ui-dialog-titlebar-close").text("close");
                //$(".ui-dialog-titlebar-close").html("close");

                Categories.Structure.calculateOrderTotal();
            }
        }
        else {
            var trHTML = "";
            //trHTML += '<tr id="' + productId + '" class="dynamicRow"><td><a href="javascript:void(0);" class="yourorderclosebtn"><img alt="" src="images/closebtn.png" /></a><span class="yourorderimg"><img alt="" src="' + productImage + '" /></span><span class="yourorderproname>' + productTitle + '</span></td><td class="blankTD unitPrice">' + productUnitPriceValue + '</td><td class="qty blankTD"><input type="text" class="yourorderquantity txtQty qtySpinner" value="' + productQtyValue + '" maxlength="5" style="width: 70px" /></td><td class="specific rowTotal blankTD">' + productValue + '</td></tr>';
            //trHTML += '<tr id="' + productId + '" class="dynamicRow"><td><a href="javascript:void(0);" class="yourorderclosebtn"><img alt="" src="images/closebtn.png" class="mCS_img_loaded" /></a><span class="yourorderimg"><img class="mCS_img_loaded alt="" src="' + productImage + '" style="width: 40px; height: 40px;" /></span><span class="yourorderproname>' + productTitle + '</span></td><td class="blankTD unitPrice">' + productUnitPriceValue + '</td><td class="qty blankTD"><input type="text" class="yourorderquantity txtQty qtySpinner" value="' + productQtyValue + '" maxlength="5" style="width: 70px" /></td><td class="specific rowTotal blankTD">' + productValue + '</td></tr>';

            trHTML += '<tr id="' + productId + '" ><td style="width: 40px;"><a href="javascript:void(0);" class="yourorderclosebtn" ><img alt="" src="/images/closebtn.png" class="mCS_img_loaded removeProduct" /></a><span class="yourorderimg" ><img class="mCS_img_loaded alt="" src="' + productImage + '" style="width: 40px; height: 40px;" /></span><span class="yourorderproname"> ' + productTitle + ' </span></td><td class="unitPrice" >' + productUnitPriceValue + '</td><td class="qty" ><input type="text" class="yourorderquantity txtQty" value="' + productQtyValue + '" maxlength="3" style="width: 70px" /></td><td class="specific rowTotal">' + productValueRounded + '</td></tr>';


            $(".yourordertable tbody.tbodyRow").append(trHTML);
            //$(".yourordertable tbody.tbodyRow tr.trGrandTotal").before(trHTML);
            //$(".containerDivCart").show();
            $(".ui-dialog-titlebar-close img").remove();

            //Categories.Structure.displayCartBox();
            $(".ui-dialog-titlebar-close").append('<img src="/images/closebtn.png" />');
            Categories.Structure.calculateOrderTotal();
        }

        //var rowData = [];
        //rowData = $(".tbodyRow tr").toArray();
        //for (var i = 0; i < rowData.length; i++) {
        //    var productName = rowData[i].find(".yourorderproname").text();
        //    var trimmedProductName = $.trim(productName);
        //    if (trimmedProductName == productTitle) {
        //        var qty = rowData[i].find(".txtQty").val();
        //        var parsedQty = parseInt(qty);
        //        productQtyValue = parsedQty + 1;
        //        rowData[i].find(".txtQty").val(productQtyValue);
        //        var newQty = rowData[i].find(".txtQty").val();
        //        var parsedNewQty = parseInt(newQty);
        //        var unitPrice = rowData[i].find(".unitPrice").text();
        //        var parsedUnitPrice = parseFloat(unitPrice);
        //        var rowTotal = parsedNewQty * parsedUnitPrice;
        //        rowData[i].find(".rowTotal").text(rowTotal);
        //        Categories.Structure.calculateOrderTotal();
        //    }
            
        //    else {
        //        var trHTML = "";
        //        //trHTML += '<tr id="' + productId + '" class="dynamicRow"><td><a href="javascript:void(0);" class="yourorderclosebtn"><img alt="" src="images/closebtn.png" /></a><span class="yourorderimg"><img alt="" src="' + productImage + '" /></span><span class="yourorderproname>' + productTitle + '</span></td><td class="blankTD unitPrice">' + productUnitPriceValue + '</td><td class="qty blankTD"><input type="text" class="yourorderquantity txtQty qtySpinner" value="' + productQtyValue + '" maxlength="5" style="width: 70px" /></td><td class="specific rowTotal blankTD">' + productValue + '</td></tr>';
        //        //trHTML += '<tr id="' + productId + '" class="dynamicRow"><td><a href="javascript:void(0);" class="yourorderclosebtn"><img alt="" src="images/closebtn.png" class="mCS_img_loaded" /></a><span class="yourorderimg"><img class="mCS_img_loaded alt="" src="' + productImage + '" style="width: 40px; height: 40px;" /></span><span class="yourorderproname>' + productTitle + '</span></td><td class="blankTD unitPrice">' + productUnitPriceValue + '</td><td class="qty blankTD"><input type="text" class="yourorderquantity txtQty qtySpinner" value="' + productQtyValue + '" maxlength="5" style="width: 70px" /></td><td class="specific rowTotal blankTD">' + productValue + '</td></tr>';

        //        trHTML += '<tr id="' + productId + '" ><td style="width: 40px;"><a href="javascript:void(0);" class="yourorderclosebtn" ><img alt="" src="/images/closebtn.png" class="mCS_img_loaded removeProduct" /></a><span class="yourorderimg" ><img class="mCS_img_loaded alt="" src="' + productImage + '" style="width: 40px; height: 40px;" /></span><span class="yourorderproname"> ' + productTitle + ' </span></td><td class="unitPrice" >' + productUnitPriceValue + '</td><td class="qty" ><input type="text" class="yourorderquantity txtQty" value="' + productQtyValue + '" maxlength="3" style="width: 70px" /></td><td class="specific rowTotal">' + productValueRounded + '</td></tr>';


        //        $(".yourordertable tbody.tbodyRow").append(trHTML);
        //        //$(".yourordertable tbody.tbodyRow tr.trGrandTotal").before(trHTML);
        //        //$(".containerDivCart").show();
        //        $(".ui-dialog-titlebar-close img").remove();

        //        //Categories.Structure.displayCartBox();
        //        $(".ui-dialog-titlebar-close").append('<img src="/images/closebtn.png" />');
        //        Categories.Structure.calculateOrderTotal();
        //    }

        //}

        //$(".tbodyRow tr").length;

        //var trLength = $(".tbodyRow tr").length;
        //if (trLength > 0 && $.trim($(".yourorderproname").text()) == productTitle) {
        //    //productQtyValue = $(".txtQty").val() + 1;
        //    var qty = parseInt($(".txtQty").val());
        //    productQtyValue = qty + 1;
        //    $(".txtQty").val(productQtyValue);
        //    var newQty = parseInt($(".txtQty").val());
        //    var unitPrice = parseFloat($(".unitPrice").text())
        //    var rowTotal = newQty * unitPrice;
        //    $(".rowTotal").text(rowTotal);
        //    Categories.Structure.calculateOrderTotal();
        //}

        //else {
        //    var trHTML = "";
        //    //trHTML += '<tr id="' + productId + '" class="dynamicRow"><td><a href="javascript:void(0);" class="yourorderclosebtn"><img alt="" src="images/closebtn.png" /></a><span class="yourorderimg"><img alt="" src="' + productImage + '" /></span><span class="yourorderproname>' + productTitle + '</span></td><td class="blankTD unitPrice">' + productUnitPriceValue + '</td><td class="qty blankTD"><input type="text" class="yourorderquantity txtQty qtySpinner" value="' + productQtyValue + '" maxlength="5" style="width: 70px" /></td><td class="specific rowTotal blankTD">' + productValue + '</td></tr>';
        //    //trHTML += '<tr id="' + productId + '" class="dynamicRow"><td><a href="javascript:void(0);" class="yourorderclosebtn"><img alt="" src="images/closebtn.png" class="mCS_img_loaded" /></a><span class="yourorderimg"><img class="mCS_img_loaded alt="" src="' + productImage + '" style="width: 40px; height: 40px;" /></span><span class="yourorderproname>' + productTitle + '</span></td><td class="blankTD unitPrice">' + productUnitPriceValue + '</td><td class="qty blankTD"><input type="text" class="yourorderquantity txtQty qtySpinner" value="' + productQtyValue + '" maxlength="5" style="width: 70px" /></td><td class="specific rowTotal blankTD">' + productValue + '</td></tr>';

        //    trHTML += '<tr id="' + productId + '" ><td style="width: 40px;"><a href="javascript:void(0);" class="yourorderclosebtn" ><img alt="" src="/images/closebtn.png" class="mCS_img_loaded removeProduct" /></a><span class="yourorderimg" ><img class="mCS_img_loaded alt="" src="' + productImage + '" style="width: 40px; height: 40px;" /></span><span class="yourorderproname"> ' + productTitle + ' </span></td><td class="unitPrice" >' + productUnitPriceValue + '</td><td class="qty" ><input type="text" class="yourorderquantity txtQty" value="' + productQtyValue + '" maxlength="3" style="width: 70px" /></td><td class="specific rowTotal">' + productValueRounded + '</td></tr>';


        //    $(".yourordertable tbody.tbodyRow").append(trHTML);
        //    //$(".yourordertable tbody.tbodyRow tr.trGrandTotal").before(trHTML);
        //    //$(".containerDivCart").show();
        //    $(".ui-dialog-titlebar-close img").remove();

        //    //Categories.Structure.displayCartBox();
        //    $(".ui-dialog-titlebar-close").append('<img src="/images/closebtn.png" />');
        //    Categories.Structure.calculateOrderTotal();
        //}
        

    },

    displayCartBox: function(){
        $(".containerDivCart").dialog({
            modal: true,
            title: "",
            width: 800,
            height: 300,
            autoOpen: true,
            resizable: false,
            draggable: false,

        });
    },

    calculateDiscountPrice: function(){

    },


    calculateOrderTotal: function () {
        var subTotal = 0;
        var tdData = [];
        tdData = $(".yourordertable td.rowTotal").toArray();
        for (var i = 0; i < tdData.length; i++) {
            if (tdData[i].innerHTML == "") {
                tdData[i].innerHTML = "0";
                subTotal += parseFloat(tdData[i].innerHTML);
            }
            else {
                subTotal += parseFloat(tdData[i].innerHTML);
                //parseFloat(tdData[i].innerHTML);
            }

        }

        var subTotalRoundedValue = subTotal.toFixed(2)

        $("div.divGrandTotal span.spnGrandTotal").text(subTotalRoundedValue);
    },



    AuthenticateUser: function () {
        if (Categories.Structure.ValidateFields()) {
            $('#btnLogin').attr('disabled', 'disabled');
            Categories.Structure.Authenticate();
        }
    },

    ValidateFields: function () {
        var isValidate = true;
        if ($("#logEmail").val() == "") {

            alert("Valid email is required");

            isValidate = false;
        }
        else if ($("#logPssword").val() == "") {

            alert("Password is required");

            isValidate = false;
        }

        else {
            var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

            if (reg.test($.trim($("#logEmail").val())) == false) {

                alert("Please enter a valid Email in Username");
                

                isValidate = false;
            }
        }

        return isValidate;
    },

    Authenticate: function () {

        $('#btnLogin').prop('disabled', true);
        var userName = $.trim($("#logEmail").val());
        var userPassword = $("#logPssword").val();
        //$('#btnSaveForm').removeClass('sign_in');
        //$('#btnAuthenticate').addClass('pleasewait');
        $.ajax({
            cache: false,
            async: true,
            data: {
                UsernName: userName,
                UserPassword: userPassword
                
            },
            dataType: "json",
            type: "POST",
            url: "/Category/Authenticate",
            success: function (response) {
                //alert(response);
                if (response.Result == "SUCCESS") {

                    Categories.Structure.loggedInUser = response.Records;
                    
                    //if (Categories.Structure.loggedInUser != null && Categories.Structure.loggedInUser[0].CatUserRoleId == 1)
                    if (Categories.Structure.loggedInUser != null && Categories.Structure.loggedInUser.CatUserRoleId == 1)
                    {
                        //location.href = '@Url.Action("Index", "Customer")';
                        //var myURL = $("#customerControllerURL").val();
                        var myURL = "/LastestOrder/Index";
                        location.href = myURL;
                    }
                    else if (Categories.Structure.loggedInUser != null && Categories.Structure.loggedInUser.CatUserRoleId == 3) {
                        var myURL = "/Category/Index";
                        location.href = myURL;
                    }
                    else {
                        alert("User name or password incorrect");
                        var myURL = "/Login/Index";
                        location.href = myURL;
                    }
                }
                else {
                    alert("Either email, password is incorrect or user does not exist");
                    var myURL = "/Login/Index";
                    location.href = myURL;
                }

            }
        });

        
    },


    getProductsFoSearchBox: function () {
        $.ajax({

            dataType: "json",
            type: "GET",
            //url: '@Url.Action("getProductsByCategory", "Product")',
            url: "/Product/GetAllProducts",
            //data: { categoryId: categoryId },

            contentType: 'application/json; charset=utf-8',
            cache: false,
            //data: {},
            success: function (response) {

                //For implementing search
                Categories.Structure.allProductListFromDB = response.Records;
                var fullNameSearchData = [];
                $(Categories.Structure.allProductListFromDB).each(function (index, elem) {
                    fullNameSearchData.push(elem.product_name);
                });

                $("#txtSearchbox").autocomplete({
                    source: fullNameSearchData,
                    minLength: 2
                });

            },
            error: function (xhr) {
                alert(xhr.responseText);
            }
        });
    },

    populateSearchBasedDiv: function (productName) {
        var resultantSearchBasedProduct = [];
        resultantSearchBasedProduct = $.grep(Categories.Structure.allProductListFromDB, function (data) {
            return data.product_name == productName;
        });

        $.each(resultantSearchBasedProduct, function (key, value) {

            //$(".dynamicallyAddedDiv").html("");
            //$("#divProducts .clearfix").html("");
            $(".dynamicallyAddedDiv").remove();

            var divContainingListOne = Categories.Structure.productItemTemplate.clone();
            $(divContainingListOne).data("dataItem", value);
            $(divContainingListOne).attr("id", value.product_id);
            //$(divContainingListOne).attr("class", "dynamicallyAddedDiv");

            var category = "";
            if (value.catagory_id == 1) {
                category = "JEWELLERY";
                $("#divProducts").parent().find("h3").text(category);
            }
            else if (value.catagory_id == 2) {
                category = "RADO";
                $("#divProducts").parent().find("h3").text(category);
            }
            else if (value.catagory_id == 3) {
                category = "TISSOT";
                $("#divProducts").parent().find("h3").text(category);
            }
            else if (value.catagory_id == 4) {
                category = "GUESS";
                $("#divProducts").parent().find("h3").text(category);
            }
            else if (value.catagory_id == 5) {
                category = "EMPORIO ARMANI";
                $("#divProducts").parent().find("h3").text(category);
            }
            else if (value.catagory_id == 6) {
                category = "MICHAEL KORS";
                $("#divProducts").parent().find("h3").text(category);
            }
            else if (value.catagory_id == 7) {
                category = "CITIZEN";
                $("#divProducts").parent().find("h3").text(category);
            }
            else if (value.catagory_id == 8) {
                category = "EDIFICE";
                $("#divProducts").parent().find("h3").text(category);
            }
            else if (value.catagory_id == 9) {
                category = "EDIFICE";
                $("#divProducts").parent().find("h3").text(category);
            }
            else {
                category = "Others";
                $("#divProducts").parent().find("h3").text(category + " Products");
            }


            $(divContainingListOne).addClass("col-md-3 top_brand_left dynamicallyAddedDiv");
            $(divContainingListOne).find("img.productImage").attr("src", value.image_path);
            $(divContainingListOne).find("p.productName").text(value.product_name);
            $(divContainingListOne).find("span.productPrice").text(value.Product_price);


            var imagePath = '';
            var offerPercentage = 0.0;
            if (value.PercentageApplied == 10) {
                imagePath = '/images/10PercentOffer.png';
                offerPercentage = 0.1;

                //var offerPercentage = 0.1;
                var discountedPrice = value.Product_price * offerPercentage;
                var priceAfterDiscount = value.Product_price - discountedPrice;
                $(divContainingListOne).find(".snipcart-thumb").append("<label style='margin-left:40px;'>PKR:<label><span class='discountPrice'>" + priceAfterDiscount + "</span>");

                $(divContainingListOne).find("span.productPrice").css("text-decoration", "line-through");

                //$(".dynamicallyAddedDiv figure:eq(0)").prepend("<img class='offerImage' style='position:absolute;top:0;width:70px;height:100px;left:0' />")
                //$(divContainingListOne).find("figure").prepend("<img class='offerImage' style='position:absolute;top:0;width:70px;height:100px;left:0' />")
                $(divContainingListOne).find(".agile_top_brand_left_grid1").prepend("<img class='offerImage' style='position:absolute; top:-1px; width:108px; height:64px; left:-23px; transform:rotate(-45deg);' />")
                $(divContainingListOne).find(".offerImage").attr("src", imagePath);
            }
            else if (value.PercentageApplied == 15) {
                imagePath = '/images/15PercentOffer.png';
                offerPercentage = 0.15;

                //$(divContainingListOne).find(".offerImage").attr("src", imagePath);

                //var offerPercentage = 0.1;
                var discountedPrice = value.Product_price * offerPercentage;
                var priceAfterDiscount = value.Product_price - discountedPrice;
                $(divContainingListOne).find(".snipcart-thumb").append("<label style='margin-left:40px;'>PKR:<label><span class='discountPrice'>" + priceAfterDiscount + "</span>");

                $(divContainingListOne).find("span.productPrice").css("text-decoration", "line-through");

                //$(".dynamicallyAddedDiv figure:eq(0)").prepend("<img class='offerImage' style='position:absolute;top:0;width:70px;height:100px;left:0' />")
                //$(divContainingListOne).find("figure").prepend("<img class='offerImage' style='position:absolute;top:0;width:70px;height:100px;left:0' />")
                $(divContainingListOne).find(".agile_top_brand_left_grid1").prepend("<img class='offerImage' style='position:absolute; top:-1px; width:108px; height:64px; left:-23px; transform:rotate(-45deg);' />")
                $(divContainingListOne).find(".offerImage").attr("src", imagePath);
            }
            else if (value.PercentageApplied == 20) {
                imagePath = '/images/20PercentOffer.png';
                offerPercentage = 0.2;

                //$(divContainingListOne).find(".offerImage").attr("src", imagePath);

                //var offerPercentage = 0.1;
                var discountedPrice = value.Product_price * offerPercentage;
                var priceAfterDiscount = value.Product_price - discountedPrice;
                $(divContainingListOne).find(".snipcart-thumb").append("<label style='margin-left:40px;'>PKR:<label><span class='discountPrice'>" + priceAfterDiscount + "</span>");

                $(divContainingListOne).find("span.productPrice").css("text-decoration", "line-through");

                //$(".dynamicallyAddedDiv figure:eq(0)").prepend("<img class='offerImage' style='position:absolute;top:0;width:70px;height:100px;left:0' />")
                //$(divContainingListOne).find("figure").prepend("<img class='offerImage' style='position:absolute;top:0;width:70px;height:100px;left:0' />")
                $(divContainingListOne).find(".agile_top_brand_left_grid1").prepend("<img class='offerImage' style='position:absolute; top:-1px; width:108px; height:64px; left:-23px; transform:rotate(-45deg);' />")
                $(divContainingListOne).find(".offerImage").attr("src", imagePath);
            }
            //else if (value.PercentageApplied == 23) {
            //    imagePath = '/images/20PercentOffer.png';
            //    offerPercentage = 0.23;
            //}
            else if (value.PercentageApplied == 25) {
                imagePath = '/images/25PercentOffer.png';
                offerPercentage = 0.25;

                //$(divContainingListOne).find(".offerImage").attr("src", imagePath);

                //var offerPercentage = 0.1;
                var discountedPrice = value.Product_price * offerPercentage;
                var priceAfterDiscount = value.Product_price - discountedPrice;
                $(divContainingListOne).find(".snipcart-thumb").append("<label style='margin-left:40px;'>PKR:<label><span class='discountPrice'>" + priceAfterDiscount + "</span>");

                $(divContainingListOne).find("span.productPrice").css("text-decoration", "line-through");

                //$(".dynamicallyAddedDiv figure:eq(0)").prepend("<img class='offerImage' style='position:absolute;top:0;width:70px;height:100px;left:0' />")
                //$(divContainingListOne).find("figure").prepend("<img class='offerImage' style='position:absolute;top:0;width:70px;height:100px;left:0' />")
                $(divContainingListOne).find(".agile_top_brand_left_grid1").prepend("<img class='offerImage' style='position:absolute; top:-1px; width:108px; height:64px; left:-23px; transform:rotate(-45deg);' />")
                $(divContainingListOne).find(".offerImage").attr("src", imagePath);
            }
            else if (value.PercentageApplied == 30) {
                imagePath = '/images/30PercentOffer.png';
                offerPercentage = 0.3;

                //$(divContainingListOne).find(".offerImage").attr("src", imagePath);

                //var offerPercentage = 0.1;
                var discountedPrice = value.Product_price * offerPercentage;
                var priceAfterDiscount = value.Product_price - discountedPrice;
                $(divContainingListOne).find(".snipcart-thumb").append("<label style='margin-left:40px;'>PKR:<label><span class='discountPrice'>" + priceAfterDiscount + "</span>");

                $(divContainingListOne).find("span.productPrice").css("text-decoration", "line-through");

                //$(".dynamicallyAddedDiv figure:eq(0)").prepend("<img class='offerImage' style='position:absolute;top:0;width:70px;height:100px;left:0' />")
                //$(divContainingListOne).find("figure").prepend("<img class='offerImage' style='position:absolute;top:0;width:70px;height:100px;left:0' />")
                $(divContainingListOne).find(".agile_top_brand_left_grid1").prepend("<img class='offerImage' style='position:absolute; top:-1px; width:108px; height:64px; left:-23px; transform:rotate(-45deg);' />")
                $(divContainingListOne).find(".offerImage").attr("src", imagePath);
            }
            else if (value.PercentageApplied == 40) {
                imagePath = '/images/40PercentOffer.png';
                offerPercentage = 0.4;

                //$(divContainingListOne).find(".offerImage").attr("src", imagePath);

                //var offerPercentage = 0.1;
                var discountedPrice = value.Product_price * offerPercentage;
                var priceAfterDiscount = value.Product_price - discountedPrice;
                $(divContainingListOne).find(".snipcart-thumb").append("<label style='margin-left:40px;'>PKR:<label><span class='discountPrice'>" + priceAfterDiscount + "</span>");

                $(divContainingListOne).find("span.productPrice").css("text-decoration", "line-through");

                //$(".dynamicallyAddedDiv figure:eq(0)").prepend("<img class='offerImage' style='position:absolute;top:0;width:70px;height:100px;left:0' />")
                //$(divContainingListOne).find("figure").prepend("<img class='offerImage' style='position:absolute;top:0;width:70px;height:100px;left:0' />")
                $(divContainingListOne).find(".agile_top_brand_left_grid1").prepend("<img class='offerImage' style='position:absolute; top:-1px; width:108px; height:64px; left:-23px; transform:rotate(-45deg);' />")
                $(divContainingListOne).find(".offerImage").attr("src", imagePath);
            }
            else if (value.PercentageApplied == 50) {
                imagePath = '/images/50PercentOffer.png';
                offerPercentage = 0.5;

                //$(divContainingListOne).find(".offerImage").attr("src", imagePath);

                //var offerPercentage = 0.1;
                var discountedPrice = value.Product_price * offerPercentage;
                var priceAfterDiscount = value.Product_price - discountedPrice;
                $(divContainingListOne).find(".snipcart-thumb").append("<label style='margin-left:40px;'>PKR:<label><span class='discountPrice'>" + priceAfterDiscount + "</span>");

                $(divContainingListOne).find("span.productPrice").css("text-decoration", "line-through");

                //$(".dynamicallyAddedDiv figure:eq(0)").prepend("<img class='offerImage' style='position:absolute;top:0;width:70px;height:100px;left:0' />")
                //$(divContainingListOne).find("figure").prepend("<img class='offerImage' style='position:absolute;top:0;width:70px;height:100px;left:0' />")
                $(divContainingListOne).find(".agile_top_brand_left_grid1").prepend("<img class='offerImage' style='position:absolute; top:-1px; width:108px; height:64px; left:-23px; transform:rotate(-45deg);' />")
                $(divContainingListOne).find(".offerImage").attr("src", imagePath);
            }
            else if (value.PercentageApplied == 60) {
                imagePath = '/images/60PercentOffer.png';
                offerPercentage = 0.6;

                //$(divContainingListOne).find(".offerImage").attr("src", imagePath);

                //var offerPercentage = 0.1;
                var discountedPrice = value.Product_price * offerPercentage;
                var priceAfterDiscount = value.Product_price - discountedPrice;
                $(divContainingListOne).find(".snipcart-thumb").append("<label style='margin-left:40px;'>PKR:<label><span class='discountPrice'>" + priceAfterDiscount + "</span>");

                $(divContainingListOne).find("span.productPrice").css("text-decoration", "line-through");

                //$(".dynamicallyAddedDiv figure:eq(0)").prepend("<img class='offerImage' style='position:absolute;top:0;width:70px;height:100px;left:0' />")
                //$(divContainingListOne).find("figure").prepend("<img class='offerImage' style='position:absolute;top:0;width:70px;height:100px;left:0' />")
                $(divContainingListOne).find(".agile_top_brand_left_grid1").prepend("<img class='offerImage' style='position:absolute; top:-1px; width:108px; height:64px; left:-23px; transform:rotate(-45deg);' />")
                $(divContainingListOne).find(".offerImage").attr("src", imagePath);
            }
            else if (value.PercentageApplied == 70) {
                imagePath = '/images/70PercentOffer.png';
                offerPercentage = 0.7;

                //$(divContainingListOne).find(".offerImage").attr("src", imagePath);

                //var offerPercentage = 0.1;
                var discountedPrice = value.Product_price * offerPercentage;
                var priceAfterDiscount = value.Product_price - discountedPrice;
                $(divContainingListOne).find(".snipcart-thumb").append("<label style='margin-left:40px;'>PKR:<label><span class='discountPrice'>" + priceAfterDiscount + "</span>");

                $(divContainingListOne).find("span.productPrice").css("text-decoration", "line-through");

                //$(".dynamicallyAddedDiv figure:eq(0)").prepend("<img class='offerImage' style='position:absolute;top:0;width:70px;height:100px;left:0' />")
                //$(divContainingListOne).find("figure").prepend("<img class='offerImage' style='position:absolute;top:0;width:70px;height:100px;left:0' />")
                $(divContainingListOne).find(".agile_top_brand_left_grid1").prepend("<img class='offerImage' style='position:absolute; top:-1px; width:108px; height:64px; left:-23px; transform:rotate(-45deg);' />")
                $(divContainingListOne).find(".offerImage").attr("src", imagePath);
            }
            //var imagePath = '/images/offer.png';
            //$(".offerImage").attr("src", "@Url.Content('~/images/offer.png')");
            //$(".offerImage").attr("src", imagePath);
            else {
                
            }

            
            $("#divProducts").append(divContainingListOne);
            $(".dynamicallyAddedDiv").show();
        });

    },

    populateCartDetail: function () {
        //var Customer = JSON.parse(localStorage.getItem("customer"));
        //CheckOut.Structure.cartProductsList = Customer.CartProductList;

        var trHTML = "";
        $.each(Categories.Structure.finalOrderedProductsListCategoryJs, function (index, value) {
            //$.each(CheckOut.Structure.finalOrderedProductsList, function (index, value) {
            var serialNo = index + 1;
            //trHTML = '<tr id="' + value.id + '" ><td style="text-align:center">' + serialNo + '</td><td class="invert-image" ><img src="' + value.image_path + '" style="width:40px;height:30px;" alt=" " class="img-responsive" /></td><td class="invert" ><input style="text-align: center;" class="tdQuantity" type="text" value="' + value.quantity + '" maxlength="3" /></td><td class="unitPrice">' + value.unit_price + '</td><td class="invert tdProductName">' + value.name + '</td><td class="invert tdTotalPrice">' + value.TotalPrice + '</td><td class="invert"><div class="rem"><div class="close1 removeProduct"></div></div></td></tr>';
            trHTML = '<tr id="' + value.product_id + '" ><td class="invert-image" ><img src="' + value.image_path + '" style="width:40px;height:30px;" alt=" " class="img-responsive" /></td><td class="invert" ><input style="text-align: center;" class="tdQuantity" type="text" value="' + value.quantity + '" maxlength="3" /></td><td class="unitPrice">' + value.Product_price + '</td><td class="invert tdProductName">' + value.product_name + '</td><td class="invert tdTotalPrice">' + value.TotalPrice + '</td><td class="invert"><div class="rem"><div class="close1 removeProduct"></div></div></td></tr>';

            $(".yourordertable tbody").append(trHTML);
            //$(".dynamicallyAddedDiv").show();
        });
        //var count = $("yourordertable tbody tr").length - 1;
        var count = $("yourordertable tbody tr").length;
        if (count > 1) {
            $("#counter-notify").text(count);
            Categories.Structure.calculateCustomerOrderTotal();
        }
        
    },
    calculateCustomerOrderTotal: function () {
        var subTotal = 0;
        var tdData = [];
        tdData = $(".yourordertable tbody tr td.rowTotal").toArray();
        for (var i = 0; i < tdData.length; i++) {
            if (tdData[i].innerHTML == "") {
                tdData[i].innerHTML = "0";
                subTotal += parseFloat(tdData[i].innerHTML);
            }
            else {
                subTotal += parseFloat(tdData[i].innerHTML);
            }

        }

        var subTotalRoundedValue = subTotal.toFixed(2)

        $(".yourordertable tbody spnGrandTotal").text(subTotalRoundedValue);
    },

}

$(document).ready(function () {
    try {

        Categories.Structure.productItemTemplate = $(".productItemTemplate").clone().removeClass("productItemTemplate");

        //Categories.Structure.populateCartDetail();

        //Categories.Structure.getOfferProducts();
        //Categories.Structure.populateCartDetail();
        
    }
    catch (e) {

    }
});