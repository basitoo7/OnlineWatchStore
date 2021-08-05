var Offers = Offers || {};

Offers.Structure = {

    productItemTemplate: {},
    offerProductList: [],
    Customer: {},

    finalOrderedProductsListOffersJs: [],

    //For implementing search
    allProductListFromDB: [],
    //For implementing search

    productListForDivOne: [],
    //if your products / items are more than 8,     than you need to add      productListForDivTwo: []
    productListForDivTwo: [],
    //if your products / items are more than 16,     than you need to add      productListForDivThree: []

    
    getOfferProducts: function () {
        $.ajax({

            dataType: "json",
            type: "GET",
            url: "/Product/GetOfferProducts",
            contentType: 'application/json; charset=utf-8',
            cache: false,
            success: function (response) {

                Offers.Structure.offerProductList = response.Records;
                Offers.Structure.Customer.DBOfferProductList = Offers.Structure.offerProductList;

                localStorage.setItem("customer", JSON.stringify(Offers.Structure.Customer));
                var Customer = JSON.parse(localStorage.getItem("customer"));


                //var resultant10PercentOfferProducts = [];
                //var resultant20PercentOfferProducts = [];
                //var resultant30PercentOfferProducts = [];

                //resultant10PercentOfferProducts = $.grep(Offers.Structure.offerProductList, function (data) {
                //    return data.PercentageApplied == GS.Common.ProductOfferEnum.TenPercentOffer;
                //});


                //resultant20PercentOfferProducts = $.grep(Offers.Structure.offerProductList, function (data) {
                //    return data.PercentageApplied == GS.Common.ProductOfferEnum.TwentyPercentOffer;
                //});

                //resultant30PercentOfferProducts = $.grep(Offers.Structure.offerProductList, function (data) {
                //    return data.PercentageApplied == GS.Common.ProductOfferEnum.ThirtyPercentOffer;
                //});

                //$("#divProducts10Percent").empty();
                $.each(Offers.Structure.offerProductList, function (key, value) {

                    var divContainingListOne = Offers.Structure.productItemTemplate.clone();
                    $(divContainingListOne).data("dataItem", value);
                    $(divContainingListOne).attr("id", value.product_id);
                    var category = "Discount Offers";
                    $("#divProducts").parent().find("h3").text(category);
                    $(divContainingListOne).addClass("col-md-3 top_brand_left dynamicallyAddedDiv");

                    $(divContainingListOne).find("img.productImage").attr("src", value.image_path);
                    $(divContainingListOne).find("p.productName").text(value.product_name);
                    $(divContainingListOne).find("span.productPrice").text(value.Product_price);

                    $(divContainingListOne).find("span.productPrice").css("text-decoration", "line-through");

                    //$(".dynamicallyAddedDiv figure:eq(0)").prepend("<img class='offerImage' style='position:absolute;top:0;width:70px;height:100px;left:0' />")
                    //$(divContainingListOne).find("figure").prepend("<img class='offerImage' style='position:absolute;top:0;width:70px;height:100px;left:0' />")
                    $(divContainingListOne).find(".agile_top_brand_left_grid1").prepend("<img class='offerImage' style='position:absolute; top:-1px; width:108px; height:64px; left:-23px; transform:rotate(-45deg);' />")


                    //position: absolute;
                    //top: -1px;
                    //width: 108px;
                    //height: 64px;
                    //left: -23px;
                    //transform: rotate(-45deg);




                    var imagePath = '';
                    var offerPercentage = 0.0;
                    if (value.PercentageApplied == 10) {
                        imagePath = '/images/10PercentOffer.png';
                        offerPercentage = 0.1;
                    }
                    else if (value.PercentageApplied == 15) {
                        imagePath = '/images/15PercentOffer.png';
                        offerPercentage = 0.15;
                    }
                    else if (value.PercentageApplied == 20) {
                        imagePath = '/images/20PercentOffer.png';
                        offerPercentage = 0.2;
                    }
                    //else if (value.PercentageApplied == 23) {
                    //    imagePath = '/images/20PercentOffer.png';
                    //    offerPercentage = 0.23;
                    //}
                    else if (value.PercentageApplied == 25) {
                        imagePath = '/images/25PercentOffer.png';
                        offerPercentage = 0.25;
                    }
                    else if (value.PercentageApplied == 30) {
                        imagePath = '/images/30PercentOffer.png';
                        offerPercentage = 0.3;
                    }
                    else if (value.PercentageApplied == 40) {
                       imagePath = '/images/40PercentOffer.png';
                        offerPercentage = 0.4;
                    }
                    else if (value.PercentageApplied == 50) {
                        imagePath = '/images/50PercentOffer.png';
                        offerPercentage = 0.5;
                    }
                    else if (value.PercentageApplied == 60) {
                        imagePath = '/images/60PercentOffer.png';
                        offerPercentage = 0.6;
                    }
                    else if (value.PercentageApplied == 70) {
                        imagePath = '/images/70PercentOffer.png';
                        offerPercentage = 0.7;
                    }
                    //var imagePath = '/images/offer.png';
                    //$(".offerImage").attr("src", "@Url.Content('~/images/offer.png')");
                    //$(".offerImage").attr("src", imagePath);
                    $(divContainingListOne).find(".offerImage").attr("src", imagePath);

                    //var offerPercentage = 0.1;
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
                    //Offers.Structure.calculateOrderTotal();
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

                //    //Offers.Structure.displayCartBox();
                //    $(".ui-dialog-titlebar-close").append('<img src="/images/closebtn.png" />');
                //    Offers.Structure.calculateOrderTotal();
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

                //Offers.Structure.displayCartBox();


                $(".ui-dialog-titlebar-close").append('<img src="/images/closebtn.png" />');
                //$(".ui-dialog-titlebar-close").append('<img src="#" alt="close" />');
                //$(".ui-dialog-titlebar-close").text("close");
                //$(".ui-dialog-titlebar-close").html("close");

                Offers.Structure.calculateOrderTotal();
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

            //Offers.Structure.displayCartBox();
            $(".ui-dialog-titlebar-close").append('<img src="/images/closebtn.png" />');
            Offers.Structure.calculateOrderTotal();
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
        //        Offers.Structure.calculateOrderTotal();
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

        //        //Offers.Structure.displayCartBox();
        //        $(".ui-dialog-titlebar-close").append('<img src="/images/closebtn.png" />');
        //        Offers.Structure.calculateOrderTotal();
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
        //    Offers.Structure.calculateOrderTotal();
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

        //    //Offers.Structure.displayCartBox();
        //    $(".ui-dialog-titlebar-close").append('<img src="/images/closebtn.png" />');
        //    Offers.Structure.calculateOrderTotal();
        //}


    },

    displayCartBox: function () {
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

    calculateDiscountPrice: function () {

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
                Offers.Structure.allProductListFromDB = response.Records;
                var fullNameSearchData = [];
                $(Offers.Structure.allProductListFromDB).each(function (index, elem) {
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
        resultantSearchBasedProduct = $.grep(Offers.Structure.allProductListFromDB, function (data) {
            return data.product_name == productName;
        });

        $.each(resultantSearchBasedProduct, function (key, value) {

            //$(".dynamicallyAddedDiv").html("");
            //$("#divProducts .clearfix").html("");
            $(".dynamicallyAddedDiv").remove();

            var divContainingListOne = Offers.Structure.productItemTemplate.clone();
            $(divContainingListOne).data("dataItem", value);
            $(divContainingListOne).attr("id", value.product_id);
            //$(divContainingListOne).attr("class", "dynamicallyAddedDiv");

            var category = "";
            if (value.catagory_id == 1) {
                category = "Baverages";
                $("#divProducts").parent().find("h3").text(category + " Products");
            }
            else if (value.catagory_id == 2) {
                category = "Bakery";
                $("#divProducts").parent().find("h3").text(category + " Products");
            }
            else if (value.catagory_id == 3) {
                category = "Canned Food";
                $("#divProducts").parent().find("h3").text(category + " Products");
            }
            else if (value.catagory_id == 4) {
                category = "Dairy";
                $("#divProducts").parent().find("h3").text(category + " Products");
            }
            else if (value.catagory_id == 5) {
                category = "Baking Goods";
                $("#divProducts").parent().find("h3").text(category + " Products");
            }
            else if (value.catagory_id == 6) {
                category = "Frozen Food";
                $("#divProducts").parent().find("h3").text(category + " Products");
            }
            else if (value.catagory_id == 7) {
                category = "Meat";
                $("#divProducts").parent().find("h3").text(category + " Products");
            }
            else if (value.catagory_id == 8) {
                category = "House Hold";
                $("#divProducts").parent().find("h3").text(category + " Products");
            }

            else if (value.catagory_id == 10) {
                category = "Cleaners";
                $("#divProducts").parent().find("h3").text(category + " Products");
            }
            else if (value.catagory_id == 11) {
                category = "Paper Goods";
                $("#divProducts").parent().find("h3").text(category + " Products");
            }
            else if (value.catagory_id == 12) {
                category = "Personal Care";
                $("#divProducts").parent().find("h3").text(category + " Products");
            }
            else {
                category = "Others";
                $("#divProducts").parent().find("h3").text(category + " Products");
            }


            $(divContainingListOne).addClass("col-md-3 top_brand_left dynamicallyAddedDiv");

            $(divContainingListOne).find("img.productImage").attr("src", value.image_path);
            $(divContainingListOne).find("p.productName").text(value.product_name);
            $(divContainingListOne).find("span.productPrice").text(value.Product_price);

            $("#divProducts").append(divContainingListOne);
            $(".dynamicallyAddedDiv").show();
        });

    },

    populateCartDetail: function () {
        //var Customer = JSON.parse(localStorage.getItem("customer"));
        //CheckOut.Structure.cartProductsList = Customer.CartProductList;

        var trHTML = "";
        $.each(Offers.Structure.finalOrderedProductsListCategoryJs, function (index, value) {
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
            Offers.Structure.calculateCustomerOrderTotal();
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

        Offers.Structure.productItemTemplate = $(".productItemTemplate").clone().removeClass("productItemTemplate10Percent");
        //Offers.Structure.productItemTemplate = $(".productItemTemplate20Percent").clone().removeClass("productItemTemplate20Percent");
        //Offers.Structure.productItemTemplate = $(".productItemTemplate30Percent").clone().removeClass("productItemTemplate30Percent");
        //Offers.Structure.populateCartDetail();

        Offers.Structure.getOfferProducts();
        //Offers.Structure.populateCartDetail();
   
    }
    catch (e) {

    }
});