var GS = GS || {};

GS.SignUp = {

    
    saveNewUser: function (fullName, email, password, phone) {

        $.ajax({
            cache: false,
            async: true,
            data: {
                FullName: fullName,
                Email: email,
                Password: password,
                Phone: phone

            },
            dataType: "json",
            type: "POST",
            url: "/Signup/SaveNewUser",
            success: function (response) {
                //alert(response);
                if (response.Result == "SUCCESS") {

                    alert("Registration Completed successfully");
                }
                else {
                    alert("something went wrong");
                }

            }
        });

    },

    resetFields: function () {
        $("#txtFullName").val("");
        $("#txtEmail").val("");
        $("#txtPassword").val("");
        $("#txtPhone").val("");
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

