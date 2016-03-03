// When the browser is ready...
//De serialize Form Data
(function (jQuery) {
    jQuery.fn.deserialize = function (data) {
        var f = jQuery(this),
            map = {},
            find = function (selector) { return f.is("form") ? f.find(selector) : f.filter(selector); };
        //Get map of values
        jQuery.each(data.split("&"), function () {
            var nv = this.split("="),
                n = decodeURIComponent(nv[0]),
                v = nv.length > 1 ? decodeURIComponent(nv[1]) : null;
            if (!(n in map)) {
                map[n] = [];
            }
            map[n].push(v);
        })
        //Set values for all form elements in the data
        jQuery.each(map, function (n, v) {
            find("[name='" + n + "']").val(v);
        })
        //Clear all form elements not in form data
        find("input:text,select,textarea").each(function () {
            if (!(jQuery(this).attr("name") in map)) {
                jQuery(this).val("");
            }
        })
        find("input:checkbox:checked,input:radio:checked").each(function () {
            if (!(jQuery(this).attr("name") in map)) {
                this.checked = false;
            }
        })
        return this;
    };
})(jQuery);
$(function () {
    //#region US State names
    var stateName = [
           { 'StateName': 'Alabama' },
           { 'StateName': 'Alaska' },
           { 'StateName': 'Arizona' },
           { 'StateName': 'Arkansas' },
           { 'StateName': 'California' },
           { 'StateName': 'Colorado' },
           { 'StateName': 'Connecticut' },
           { 'StateName': 'Delaware' },
           { 'StateName': 'District of Columbia' },
           { 'StateName': 'Florida' },
           { 'StateName': 'Georgia' },
           { 'StateName': 'Hawaii' },
           { 'StateName': 'Idaho' },
           { 'StateName': 'Illinois' },
           { 'StateName': 'Indiana' },
           { 'StateName': 'Iowa' },
           { 'StateName': 'Kansas' },
           { 'StateName': 'Kentucky' },
          { 'StateName': 'Louisiana' },
          { 'StateName': 'Maine' },
          { 'StateName': 'Maryland' },
          { 'StateName': 'Massachusetts' },
          { 'StateName': 'Michigan' },
          { 'StateName': 'Minnesota' },
          { 'StateName': 'Mississippi' },
          { 'StateName': 'Missouri' },
          { 'StateName': 'Montana' },
          { 'StateName': 'Nebraska' },
          { 'StateName': 'Nevada' },
          { 'StateName': 'New Hampshire' },
          { 'StateName': 'New Jersey' },
          { 'StateName': 'New Mexico' },
          { 'StateName': 'New York' },
          { 'StateName': 'North Carolina' },
          { 'StateName': 'North Dakota' },
          { 'StateName': 'Ohio' },
          { 'StateName': 'Oklahoma' },
          { 'StateName': 'Oregon' },
          { 'StateName': 'Pennsylvania' },
          { 'StateName': 'Rhode Island' },
          { 'StateName': 'South Carolina' },
          { 'StateName': 'South Dakota' },
          { 'StateName': 'Tennessee' },
          { 'StateName': 'Texas' },
          { 'StateName': 'Utah' },
          { 'StateName': 'Vermont' },
          { 'StateName': 'Virginia' },
          { 'StateName': 'Virgin Islands' },
          { 'StateName': 'Washington' },
          { 'StateName': 'West Virginia' },
          { 'StateName': 'Wisconsin' },
          { 'StateName': 'Wyoming' }
    ];
    //#endregion

    //#region Security Questions
    var securityQuestions = [
        { 'Question': 'What was your childhood nickname?' },
         { 'Question': 'In what city did you meet your spouse/significant other?' },
          { 'Question': 'What is the name of your favorite childhood friend?' },
           { 'Question': 'What school did you attend in sixth grade?' },
           { 'Question': 'What street did you live on in the third grade?' }
    ];
    //#endregion

    //#region Office Type  
    var companyType = [
        {'IndustryRole':'Back Office / Operations'},
        {'IndustryRole':'Credit'},
        {'IndustryRole':'Sales'},
         {'IndustryRole':'Research'},
          {'IndustryRole':'Issuer'},
          {'IndustryRole':'Underwriter'},
           {'IndustryRole':'Legal'},
            {'IndustryRole':'Media'},
            {'IndustryRole':'Rating Agency'},
            {'IndustryRole':'Trustee'},
        {'IndustryRole':'Bond Investor'},
        {'IndustryRole':'Property Investor'},
        {'IndustryRole':'Servicer'}
    ];
    //#endregion

    //#region Fill Up Drop Downs

    // create DropDownList For State   
    var stateDdl = $("#StateDropDown");
    $.each(stateName, function () {
        stateDdl.append($("<option />").val(this.StateName).text(this.StateName));
    });
   

    //Create DropDownlist for securityQuestion   
    var questionsDdl = $("#SecurityQuestion");
    $.each(securityQuestions, function () {
        questionsDdl.append($("<option />").val(this.Question).text(this.Question));
    });

    //Create DropDownlist for Company Type   
    var companyTypeDdl = $("#CompanyType");
    $.each(companyType, function () {
        companyTypeDdl.append($("<option />").val(this.IndustryRole).text(this.IndustryRole));
    });
  
    //#endregion

    //#region Validate Registration Form
    $("#cspw-register-form").validate({
        rules: {
            firstName: { required: true },
            lastName: { required: true },
            Email: { required: true, email: true },
            Company: { required: true },
            IndustryRole: { required: true },
            city: { required: true },
            StateDropDown: { required: true },
            PostalCode: {
                required: true,
                validatePostalCode :true
            },
            Telephone: {
                required: true,
                validTelephoneDigit: true,
                minlength: 10,
                maxlength: 10
            },
            password: {
                required: true,
                checkPasswordStrength: true,
                minlength: 8
            },
            confirmPassword: {
                required: true,
                equalTo: "#password"
            },
            SecurityQuestion: { required: true },
            SecurityQuestionAnswer: { required: true },
            TermsAndConditions: { required: true },
            CaptchaInputText: { required: true }
        },
        messages: {
            firstName: "*Please enter your first name",
            lastName: "*Please enter your last name",
            Email: "*Please enter a valid email address",
            Company: "*Please enter Company Name",
            IndustryRole: "*Please select a value from Drop Down",
            city: "*Please enter City",
            StateDropDown: "*Please select a value from Drop Down",
            PostalCode: {
                required : "*Please enter Zip Code",
                validatePostalCode:"*Please enter valid Zip Code"},
            Telephone: {
                required: "*Please enter Phone Number",
                validTelephoneDigit: "*Invalid Phone Number.<br/>Please enter using following format 9999999999.",
             
            },
            password: {
                required: " *Please provide a password",
                checkPasswordStrength: "*Password does not match all criteria",
                minlength: "*Your password must be at least 8 characters long"
            },
            confirmPassword: {
                required: "*Please provide a password",
                equalTo: "*Entered passwords do not match."
            },
            SecurityQuestion :"*Please select a value from Drop Down",
            SecurityQuestionAnswer: "*Please enter Answer for Security Question.",
            TermsAndConditions: "*Please accept Terms and Conditions <br/>",
            CaptchaInputText: "*Please Enter a Value."
        },
        errorClass: 'fieldError',
        onkeyup: false,
        onblur: false,
        errorElement: 'label',
        submitHandler: function (form) {
            $("#lblFormError").hide();

            $('#registrationFormProcessing').show();
            ('#errorTextFrmSrv').text = '';
            $('#errorTextFrmSrv').hide();

            var registrationModel = $('form').serialize();
            sessionStorage['RegistrationFormData'] = registrationModel;
            $.post(glSiteName + "/Account/Register", registrationModel)
              .done(function (data) {
                 // alert("User Successfully Registered.");
                  sessionStorage.removeItem('RegistrationFormData');
                  sessionStorage["RegistrationSucessMessage"] = "Registration Successful";
                  window.location.href = data.message;
              })
              .fail(function (err) {
                  sessionStorage["ErrorMsgWhileSubmittingForm"] = "*"+ err.responseJSON.message;
                  if (err.status === 302) {
                      console.log(err.responseText);
                      window.location.href = err.responseJSON.message;
                  }
                //  alert(err.responseJSON.message)
                  location.reload();
                  $('form').deserialize(registrationModel);
                 
              })
              .always(function () {
                  $('#registrationFormProcessing').hide();
              });
        }
    });

    $.validator.addMethod("checkPasswordStrength",
                       function (value) {                          
                           return /^[A-Za-z0-9\d=!\-@\$%#=&+._*]*$/.test(value) // consists of only these
                               && /[A-Z]/.test(value) //has a upper case letter
                               && /[a-z]/.test(value) // has a lowercase letter
                               && /\d/.test(value) // has a digit
                               && /[$&=@#+%!-]/.test(value) // has a special character
                       });
    $.validator.addMethod("validatePostalCode",
                      function (value) {
                          return /^(\d{5}-\d{4})?$|^(\d{5})?$/.test(value) // 5  digit
                             
                      });
    $.validator.addMethod("validTelephoneDigit",
                    function (value) {
                        return /^(\d{10})|(([\(]?([0-9]{3})[\)]?)?[ \.\-]?([0-9]{3})[ \.\-]([0-9]{4}))$/.test(value) // Telephone Number
                        
                           
                    });

    //#endregion

    //#region Terms and Condition 
    $("#btnTermsAndConditions").click(function () {
        console.log("btnTermsAndConditions clicked");
        $('#dialog-message').hide();
        $("#TermsAndConditions").prop('checked', true);
        enableBtnSubmit();
    });
    $("#btnTermsAndConditionsDeclined").click(function () {
        console.log("btnTermsAndConditionsDecline clicked");
        $('#dialog-message').hide();
        $("#TermsAndConditions").prop('checked', false);
        window.location.href = sessionStorage["CurrentUrl"];
        $("#btnSubmitRegistrationForm").attr("disabled", "disabled");
    });

    $('#btnTermsAndConditionsHide').click(function () {
        $('#dialog-message').hide();
        $("#TermsAndConditions").prop('checked', false);
        $("#btnSubmitRegistrationForm").attr("disabled", "disabled");
    })
    $('#TermsAndConditions').change(function () {
        $('#dialog-message').show();
        return false;
    });

    $('#btnTermsAndConditionsPrint').click(
        function () {
            var data = $('.tc-PopUpBox-content').html();
            var mywindow = window.open('', 'my div', 'height=400,width=600');
            mywindow.document.write('</head><body >');
            mywindow.document.write(data);
            mywindow.document.write('</body></html>');

            mywindow.document.close(); // necessary for IE >= 10
            mywindow.focus(); // necessary for IE >= 10

            mywindow.print();
            mywindow.close();

            return true;
        });

    //#endregion

    //#region Submit Registration Form
    $('#btnCancelRegistration').click(function () {
        window.location.href = sessionStorage["CurrentUrl"];
    });
    $('#btnSubmitRegistrationForm').click(function () {
              
    });
    //#endregion

    //#region Reload Data from sessionStorage iF any
    var reloadData = sessionStorage.getItem('RegistrationFormData')
    if (reloadData !== null) {
        var tmp = reloadData.split('&'), dataObj = {};
        //Populate an Object with Serialized data
        for (var i = 0; i < tmp.length; i++) {
            var keyValPair = tmp[i].split('=');
            // Do not Populate Captcha and Security Questions
            if (keyValPair[0] !== "CaptchaDeText" && keyValPair[0] !== "CaptchaInputText" && keyValPair[0] !== "SecurityQuestion" && keyValPair[0] !== "SecurityQuestionAnswer") {
                dataObj[keyValPair[0]] = keyValPair[1];
            }          
           
        }

        //Loop through Form and Populate each data
        $('#cspw-register-form' + ' :input').each(function (index, element) {
            if (dataObj[$(this).attr('name')]) {
               
                $(this).val(decodeURIComponent( dataObj[$(this).attr('name')]));
            }
        });
        
        sessionStorage.removeItem('RegistrationFormData');
    }
    //#endregion

    //#region Display Error Message inside Form if any
    var formErrorMessage = sessionStorage.getItem('ErrorMsgWhileSubmittingForm');
    if (formErrorMessage != null) {
        $("#lblFormError").text(formErrorMessage);
        sessionStorage.removeItem('ErrorMsgWhileSubmittingForm');
        $("#lblFormError").show();

    }
    //#endregion


    //#region Enable Disable Submit Button
    $("form input").keyup(function () {
       
        enableBtnSubmit();
    });
    $("#SecurityQuestion,#StateDropDown,#CompanyType").change(function () {
        enableBtnSubmit();
    });

    var enableBtnSubmit = function () {
        var isAnyFieldEmpty = false; //assume all field have values
        $("form input").each(function () {           
            if ($(this).val() == "") {
                isAnyFieldEmpty = true; //oh snap got a empty field
            }
        });
        //Check Drop Down Doesn't have default Value Selected
        if (($("#SecurityQuestion").val() === "") || ($("#StateDropDown").val() === "") || ($("#CompanyType").val() === ""))
        {
            isAnyFieldEmpty = true;
        }
       //Check whether Terms and Conditions has been accepted or not
        if ($("#TermsAndConditions").is(":checked")) {
            if (isAnyFieldEmpty) {
                $("#btnSubmitRegistrationForm").attr("disabled", "disabled"); //disable submit button
            } else {
                $("#btnSubmitRegistrationForm").removeAttr("disabled"); //enable submit button
            }
        }
    }
    //#endregion
});

