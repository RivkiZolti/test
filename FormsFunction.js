$(document).ready(function () {
    var JsErrorCount = 0;
window.onerror = function (msg, url, line, col, error) {

        if (GetURLParameter("test") == '1') return false;
        if (JsErrorCount >= 1) return false;
        if (error == 'EvalError: Possible side-effect in debug-evaluate' || error == 'SyntaxError: Invalid or unexpected token') return false;

        JsErrorCount = 1
        try {
            $.ajax({
                type: "POST",
                url: "Manage.aspx?Action=JSError",
                context: Text,
                timeout: 30000,
                data: "Masof=" + encodeURIComponent(GetURLParameter("MasofId"))
                    + "&msg=" + encodeURIComponent(msg)
                    + "&line=" + encodeURIComponent(line)
                    + "&col=" + encodeURIComponent(col)
                    + "&url=" + encodeURIComponent(url)
                    + "&error=" + encodeURIComponent(error)
            });
        } catch (err) { }
        EAlertConfirm("שגיאת תוכנה. פנה לתמיכה טכנית", "שגיאה: " + msg)
    }
});

function CallbackJson() {
    var Txt = "{";
    for (var Element in Json.FormElements) {
        var JsonElement = Json.FormElements[Element]
        if (JsonElement.DbName !== undefined) {
            Txt += '"' + JsonElement.ElementId + '":"[' + JsonElement.DbName + ']",'

        }
    }
    Txt = Txt.substr(0, Txt.length - 1)
    Txt += '}'

    console.log(Txt)
}



function ShuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];

        // Swap
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
};



function AddDaysToDate(Days) {
    var DateToday = new Date();
    DateToday.setDate(DateToday.getDate() + Days);
    return DateToday.getDate()
}

//Mail
function AutoFillMail(Id) {
    var AllId = Id.split(',')
    for (Id = 0; Id < AllId.length; Id++) {
        (function (Id) {
            $('body').append('<div id="MailHelperDiv_' + AllId[Id] + '" style="position: relative">'
                + '<div style="font-size: small; position: absolute; left: 9%; user-select: none; z-index: 1; background-color: white; box-shadow: rgb(158 158 158 / 55%) 0px 0px 3px 0px; padding: 0.5px 2px; display: none; border-radius: 3px; width: 115px;" id="MailHelper_' + AllId[Id] + '">'
                + '<div dir="ltr">'
                + '<div style="background-color: #f7f7f7; padding: 4px 9px; border-radius: 3px; margin: 2px auto; cursor: pointer; font-size: 15px; display: block; box-sizing: border-box; color: gray; border: 1px solid #e7e7e7; width: 100%; text-align: left;" onclick="$(\'#' + AllId[Id] + '\').val($(\'#' + AllId[Id] + '\').val().split(\'@\')[0] + \'@gmail.com\')">@gmail.com</div>'
                + '<div style="background-color: #f7f7f7; padding: 4px 9px; border-radius: 3px; margin: 2px auto; cursor: pointer; font-size: 15px; display: block; box-sizing: border-box; color: gray; border: 1px solid #e7e7e7; width: 100%; text-align: left;" onclick="$(\'#' + AllId[Id] + '\').val($(\'#' + AllId[Id] + '\').val().split(\'@\')[0] + \'@hotmail.com\')">@hotmail.com</div>'
                + '<div style="background-color: #f7f7f7; padding: 4px 9px; border-radius: 3px; margin: 2px auto; cursor: pointer; font-size: 15px; display: block; box-sizing: border-box; color: gray; border: 1px solid #e7e7e7; width: 100%; text-align: left;" onclick="$(\'#' + AllId[Id] + '\').val($(\'#' + AllId[Id] + '\').val().split(\'@\')[0] + \'@bezeqint.com\')">@bezeqint.net</div>'
                + '<div style="background-color: #f7f7f7; padding: 4px 9px; border-radius: 3px; margin: 2px auto; cursor: pointer; font-size: 15px; display: block; box-sizing: border-box; color: gray; border: 1px solid #e7e7e7; width: 100%; text-align: left;" onclick="$(\'#' + AllId[Id] + '\').val($(\'#' + AllId[Id] + '\').val().split(\'@\')[0] + \'@okmail.com\')">@okmail.co.il</div>'
                + '</div></div></div>')

            document.getElementById(AllId[Id] + 'Div').appendChild(document.getElementById('MailHelperDiv_' + AllId[Id]))

            $('#' + AllId[Id]).focus(function () {
                $('#MailHelper_' + AllId[Id]).show();
            }).focusout(function () {
                if (!$('#MailHelperDiv_' + AllId[Id]).is(':hover')) {
                    $('#MailHelper_' + AllId[Id]).hide();
                }
            }).css("text-align", "left").css("direction", "ltr");

            $('#MailHelperDiv_' + AllId[Id]).click(function () {
                $('#MailHelper_' + AllId[Id]).hide();
            })
        })(Id);
    }
}


function FuntoFixed(Num) {
    Num = String(Num)
    if (Num.split('.').length > 1) {
        if (Num.split('.')[1].length > 1) {
            Num = (+Num).toFixed(2)
        } else {
            Num = (+Num).toFixed(1)
        }
    } else {
        Num = Num
    }
    return +Num
}



//Check Valid Date dd/mm/yyyy
function CheckDate(txt) {
    txt = txt.split('/')[1] + "/" + txt.split('/')[0] + "/" + txt.split('/')[2]
    return /((^(10|12|0?[13578])([/])(3[01]|[12][0-9]|0?[1-9])([/])((1[8-9]\d{2})|([2-9]\d{3}))$)|(^(11|0?[469])([/])(30|[12][0-9]|0?[1-9])([/])((1[8-9]\d{2})|([2-9]\d{3}))$)|(^(0?2)([/])(2[0-8]|1[0-9]|0?[1-9])([/])((1[8-9]\d{2})|([2-9]\d{3}))$)|(^(0?2)([/])(29)([/])([2468][048]00)$)|(^(0?2)([/])(29)([/])([3579][26]00)$)|(^(0?2)([/])(29)([/])([1][89][0][48])$)|(^(0?2)([/])(29)([/])([2-9][0-9][0][48])$)|(^(0?2)([/])(29)([/])([1][89][2468][048])$)|(^(0?2)([/])(29)([/])([2-9][0-9][2468][048])$)|(^(0?2)([/])(29)([/])([1][89][13579][26])$)|(^(0?2)([/])(29)([/])([2-9][0-9][13579][26])$))/.test(txt)
}


// ZeoutCheck
function ValidateID(str) {
    var IDnum = String(str);
    if ((IDnum.length > 9) || (IDnum.length < 5)) return false;
    if (isNaN(IDnum)) return false;
    if (IDnum.length < 9) while (IDnum.length < 9) IDnum = '0' + IDnum;
    var mone = 0;
    var incNum;
    for (var i = 0; i < 9; i++) {
        incNum = Number(IDnum.charAt(i));
        incNum *= (i % 2) + 1;
        if (incNum > 9) incNum -= 9;
        mone += incNum;
    }
    if (mone % 10 == 0) return true; else return false
}




//Convert input to Date as 28\01\2022
function FormatDate(idElement) {
    var idElement = idElement.split(',')
    for (Id = 0; Id < idElement.length; Id++) {
        (function (Id) {
            $('#' + idElement[Id]).on('input', function (e) {
                var TempDate = $(this).val()
                var ArrayLetters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '/']
                var total = ''
                TempDate = TempDate.split('')
                for (i = 0; i < TempDate.length; i++) {
                    if (ArrayLetters.indexOf(TempDate[i]) > -1) {
                        total += TempDate[i]
                    }
                }
                $(this).val(total)
            }).bind('keyup', function (e) {
                var TempDate = $(this).val().replace(/\//g, "")
                var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
                if (key !== 8 && key !== 46 && key !== 0) {
                    if ($.isNumeric(TempDate)) {
                        if (TempDate.length >= 4) {
                            TempDate = TempDate.substr(0, 2) + "/" + TempDate.substr(2, 2) + "/" + TempDate.substr(4)
                        } else if (TempDate.length >= 2) {
                            TempDate = TempDate.substr(0, 2) + "/" + TempDate.substr(2)
                        }
                        $(this).val(TempDate)
                    }
                }
            }).attr("dir", "ltr").attr("maxlength", "10")
        })(Id);
    }
}


//Convert input to Time as 12:04
function FormatTime(idElement) {
    var idElement = idElement.split(',')
    for (Id = 0; Id < idElement.length; Id++) {
        (function (Id) {
            $('#' + idElement[Id]).on('input', function (e) {
                var TempDate = $(this).val()
                var ArrayLetters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':']
                var total = ''
                TempDate = TempDate.split('')
                for (i = 0; i < TempDate.length; i++) {
                    if (ArrayLetters.indexOf(TempDate[i]) > -1) {
                        total += TempDate[i]
                    }
                }
                $(this).val(total)
            }).bind('keyup', function (e) {
                var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
                if (key !== 8 && key !== 46 && key !== 0) {
                    var TempDate = $(this).val()
                    if ($.isNumeric(TempDate)) {
                        if (TempDate.length >= 2) {
                            if (TempDate.indexOf(":") == -1) {
                                TempDate = TempDate.substr(0, 2) + ":" + TempDate.substr(2)
                            }
                        }
                        $(this).val(TempDate)
                    }
                }
            }).attr("dir", "ltr").attr("maxlength", "5")
        })(Id);
    }
}


// OpenPage
function NavigateToPage(PageNum) {
    if (PageNum !== "" && PageNum !== undefined) {
        if (MasofId == "") {
            window.location.href = PageNum + '.html'
        } else {
            window.location.href = PageNum + '.html?MasofId=' + MasofId + '&ClientId=' + ClientId + '&Zeout=' + Zeout + "&Version=10";
        }
    }
}


//Type Count / AllowCount:Field1; | Sum  / AllowSum:Field1;
function GetCountSum(Type, FiledName) {
    $.ajax({
        url: "Manage.aspx?Action=GetSumCount&TofesId=" + Json.TofesId + "&FiledName=" + FiledName + "&Type=" + Type,
        context: Text,
        timeout: 60000,
    }).success(function (JsonData) {
        return JsonData.Message
    }).error(function () {
        alert(1)
        EAlertConfirm('שגיאה בקבלת נתונים בדוק תקשורת                       טופס זה מופעל ע"י מלכר מערכות ואין לפנות אל נדרים פלוס כלל !!!')
        return false
    })
}


//TofesStatus Active
function GetTofesStatus(AlertMessageHtml) {
    $.ajax({
        url: "Manage.aspx?Action=GetStatus&&TofesId=" + Json.TofesId,
        context: Text,
        timeout: 60000,
    }).success(function (JsonData) {
        if (JsonData.Message == 'False') {
            //var AlertMessage = '<div style="font-size: 19px;text-align: center;color: indianred; font-weight: bold;font-family: Assistant;margin-top: 20px;margin-bottom: 15px;"><span style="font-size:24px">שים לב!</span><br>טופס זה לא פעיל.</div>'
            //if (AlertMessageHtml !== '' && AlertMessageHtml !== undefined) {
            //    AlertMessage = AlertMessageHtml;
            //}
            //$("#AllMainForm").html(AlertMessage);
            swal({
                type: "error",
                title: 'שים לב! טופס זה לא פעיל',
                html: true,
                showConfirmButton: true,
                allowOutsideClick: false,
            });
        }
    })
}


//OnlyHebrew
function onlyHe(id) {
    var id = id.split(',')
    for (J = 0; J < id.length; J++) {
        (function (J) {
            $(id[J]).on('input', function () {
                var value = $(id[J]).val().split('')
                var text = ""
                for (i = 0; i < value.length; i++) {
                    if (value[i].search('[\u0590-\u05FF \u0020]') != -1) {
                        text += value[i]
                    }
                }
                $(id[J]).val(text)
            })
        })(J);
    }
}


//OnlyNumber
function OnlyNumber(id) {
    var id = id.split(',')
    for (J = 0; J < id.length; J++) {
        (function (J) {
            $("#" + id[J]).on('input', function () {
                var value = $("#" + id[J]).val().split('')
                var text = ""
                for (i = 0; i < value.length; i++) {
                    if (value[i].search('[0-9]') != -1) {
                        text += value[i]
                    }
                }
                $("#" + id[J]).val(text)
            })
        })(J);
    }
}


// After Hide SaveDiv
function MySwal(Text, Id, Type) {
    swal({
        type: Type || "error",
        title: Text,
        showConfirmButton: true,
        allowOutsideClick: false,
    }, function () {
        $('#' + Id).focus()
        $('#' + Id).select();
        ScrollUp('#' + Id)
        setTimeout(function () {
            $("#SaveDiv").show()
            $("#WaitDiv").hide()
        }, 100);
    });
    return false;
}


//Set Field Mandatory Status
function DbNameMandatory(ElementId, Status) {
    for (Elem in Json.FormElements) {
        if (Json.FormElements[Elem].ElementId == ElementId) {
            if (Status == 'Mandatory') {
                Json.FormElements[Elem].Mandatory = true;
                $('#Span_' + ElementId).show()
            } else if (Status == 'NotMandatory') {
                Json.FormElements[Elem].Mandatory = false;
                $('#Span_' + ElementId).hide()
            }
        }
    }
}

function htmlDecode(value) {
    return $("<textarea/>").html(value).text();
}

function AddBankList(AllId) {

    if (AllId == undefined || AllId == "Bank_Div" || AllId == "BankDiv") {
        AllId = "Bank";
        $('#SnifDiv').css("vertical-align", "top");
        $('#AccountDiv').css("vertical-align", "top");
    }

   


    var AllId = AllId.split(',')
    for (Id = 0; Id < AllId.length; Id++) {
        $('body').append(
            '<div id="BankPickerDiv_' + AllId[Id] + '" style="display: none; position: fixed; z-index: 100; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgba(0,0,0,0.5);">\
                        <div style="padding: 20px; border: 1px solid #888; color: #808080; -webkit-box-shadow: 0px 0px 30px 0px rgb(50 50 50 / 75%); background-color: white; border-radius: 20px; width: 95%; max-width: 398px; box-sizing: border-box; margin: 20px auto;">\
                        <div style="-webkit-user-select:none; float:right; width:40px; line-height: 40px; text-align: center; border-radius: 10px; background-color: salmon; color: white; font-size: large; font-weight: bold; cursor: pointer; margin: -10px; position: absolute;" onclick="$(this).parent().parent().hide()">X</div>\
                        <div style="font-family: inherit; text-align: center; font-weight: bold; padding-top: 10px; font-size: 26px;margin-bottom:20px">רשימת בנקים</div>\
                        <div style="border: 1px solid #dbdbdb; background-color: white; font-weight: bold; color: cadetblue; cursor: pointer; -webkit-user-select: none !important; font-size: 17px; text-align: right; margin: 3px auto; max-width: 350px; width: 90%; padding: 7px 24px; box-sizing: border-box; border-radius: 3px;" onclick="$(\'#'+ AllId[Id] + '\').val(\'13\'); $(\'#BankPickerDiv_' + AllId[Id] + '\').hide()">בנק אגוד - 13</div>\
                        <div style="border: 1px solid #dbdbdb; background-color: white; font-weight: bold; color: cadetblue; cursor: pointer; -webkit-user-select: none !important; font-size: 17px; text-align: right; margin: 3px auto; max-width: 350px; width: 90%; padding: 7px 24px; box-sizing: border-box; border-radius: 3px;" onclick="$(\'#'+ AllId[Id] + '\').val(\'14\'); $(\'#BankPickerDiv_' + AllId[Id] + '\').hide()">בנק אוצר החייל - 14</div>\
                        <div style="border: 1px solid #dbdbdb; background-color: white; font-weight: bold; color: cadetblue; cursor: pointer; -webkit-user-select: none !important; font-size: 17px; text-align: right; margin: 3px auto; max-width: 350px; width: 90%; padding: 7px 24px; box-sizing: border-box; border-radius: 3px;" onclick="$(\'#'+ AllId[Id] + '\').val(\'11\'); $(\'#BankPickerDiv_' + AllId[Id] + '\').hide()">בנק דיסקונט - 11</div>\
                        <div style="border: 1px solid #dbdbdb; background-color: white; font-weight: bold; color: cadetblue; cursor: pointer; -webkit-user-select: none !important; font-size: 17px; text-align: right; margin: 3px auto; max-width: 350px; width: 90%; padding: 7px 24px; box-sizing: border-box; border-radius: 3px;" onclick="$(\'#'+ AllId[Id] + '\').val(\'09\'); $(\'#BankPickerDiv_' + AllId[Id] + '\').hide()">בנק הדואר - 09</div>\
                        <div style="border: 1px solid #dbdbdb; background-color: white; font-weight: bold; color: cadetblue; cursor: pointer; -webkit-user-select: none !important; font-size: 17px; text-align: right; margin: 3px auto; max-width: 350px; width: 90%; padding: 7px 24px; box-sizing: border-box; border-radius: 3px;" onclick="$(\'#'+ AllId[Id] + '\').val(\'12\'); $(\'#BankPickerDiv_' + AllId[Id] + '\').hide()">בנק הפועלים - 12</div>\
                        <div style="border: 1px solid #dbdbdb; background-color: white; font-weight: bold; color: cadetblue; cursor: pointer; -webkit-user-select: none !important; font-size: 17px; text-align: right; margin: 3px auto; max-width: 350px; width: 90%; padding: 7px 24px; box-sizing: border-box; border-radius: 3px;" onclick="$(\'#'+ AllId[Id] + '\').val(\'04\'); $(\'#BankPickerDiv_' + AllId[Id] + '\').hide()">בנק יהב - 04</div>\
                        <div style="border: 1px solid #dbdbdb; background-color: white; font-weight: bold; color: cadetblue; cursor: pointer; -webkit-user-select: none !important; font-size: 17px; text-align: right; margin: 3px auto; max-width: 350px; width: 90%; padding: 7px 24px; box-sizing: border-box; border-radius: 3px;" onclick="$(\'#'+ AllId[Id] + '\').val(\'54\'); $(\'#BankPickerDiv_' + AllId[Id] + '\').hide()">בנק ירושלים - 54</div>\
                        <div style="border: 1px solid #dbdbdb; background-color: white; font-weight: bold; color: cadetblue; cursor: pointer; -webkit-user-select: none !important; font-size: 17px; text-align: right; margin: 3px auto; max-width: 350px; width: 90%; padding: 7px 24px; box-sizing: border-box; border-radius: 3px;" onclick="$(\'#'+ AllId[Id] + '\').val(\'10\'); $(\'#BankPickerDiv_' + AllId[Id] + '\').hide()">בנק לאומי - 10</div>\
                        <div style="border: 1px solid #dbdbdb; background-color: white; font-weight: bold; color: cadetblue; cursor: pointer; -webkit-user-select: none !important; font-size: 17px; text-align: right; margin: 3px auto; max-width: 350px; width: 90%; padding: 7px 24px; box-sizing: border-box; border-radius: 3px;" onclick="$(\'#'+ AllId[Id] + '\').val(\'20\'); $(\'#BankPickerDiv_' + AllId[Id] + '\').hide()">בנק מזרחי טפחות - 20</div>\
                        <div style="border: 1px solid #dbdbdb; background-color: white; font-weight: bold; color: cadetblue; cursor: pointer; -webkit-user-select: none !important; font-size: 17px; text-align: right; margin: 3px auto; max-width: 350px; width: 90%; padding: 7px 24px; box-sizing: border-box; border-radius: 3px;" onclick="$(\'#'+ AllId[Id] + '\').val(\'46\'); $(\'#BankPickerDiv_' + AllId[Id] + '\').hide()">בנק מסד - 46</div>\
                        <div style="border: 1px solid #dbdbdb; background-color: white; font-weight: bold; color: cadetblue; cursor: pointer; -webkit-user-select: none !important; font-size: 17px; text-align: right; margin: 3px auto; max-width: 350px; width: 90%; padding: 7px 24px; box-sizing: border-box; border-radius: 3px;" onclick="$(\'#'+ AllId[Id] + '\').val(\'17\'); $(\'#BankPickerDiv_' + AllId[Id] + '\').hide()">בנק מרכנתיל דיסקונט - 17</div>\
                        <div style="border: 1px solid #dbdbdb; background-color: white; font-weight: bold; color: cadetblue; cursor: pointer; -webkit-user-select: none !important; font-size: 17px; text-align: right; margin: 3px auto; max-width: 350px; width: 90%; padding: 7px 24px; box-sizing: border-box; border-radius: 3px;" onclick="$(\'#'+ AllId[Id] + '\').val(\'52\'); $(\'#BankPickerDiv_' + AllId[Id] + '\').hide()">בנק פאג&quot;י (פועלי אגודת ישראל) - 52</div>\
                        <div style="border: 1px solid #dbdbdb; background-color: white; font-weight: bold; color: cadetblue; cursor: pointer; -webkit-user-select: none !important; font-size: 17px; text-align: right; margin: 3px auto; max-width: 350px; width: 90%; padding: 7px 24px; box-sizing: border-box; border-radius: 3px;" onclick="$(\'#'+ AllId[Id] + '\').val(\'31\'); $(\'#BankPickerDiv_' + AllId[Id] + '\').hide()">בנק הבנלאומי - 31</div>\
                    </div></div>')

        $('#' + AllId[Id] + 'Div').append(
            '<div><span style="display: inline-block;padding: 2px 10px;background-color: aliceblue;border-radius: 5px;font-family: Assistant;margin-right: 5px;color: rgb(86,130,171);margin-top: 3px;border: 1px solid darkgrey;font-size: 15px;cursor: pointer;user-select: none;" onclick="$(\'#BankPickerDiv_' + AllId[Id] + '\').show()">הצג רשימה</span></div>'
        )
    }
}



function AddLogin(Type , ElementId) {
    AddClientHtml();


    if (Type == 'NotMandatory') {
        $('#WaitDiv2').after(
            '<div id="Client_Div" style="margin-right:7px;color:#808080;font-size:small;">משתמש רשום? <span style="cursor: pointer; color: cornflowerblue;" onclick="Client_Dt()">לחץ כאן</span></div >'
        )
        document.getElementById(ElementId).appendChild(document.getElementById('Client_Div'))
    } else if (Type == 'Mandatory') {

        $('#WaitDiv2').after(
            '<div id="ComputerNote" style="text-align:center;font-size:18px;color:indianred;font-weight:bold;font-family:Assistant;display:none;margin-top:20px;margin-bottom: 40px;"><span style="font-size:24px;">שים לב!</span><br />טופס זה ניתן למילוי ע"י משתמשים רשומים בנדרים בלבד.<div><div class="Bt" style="display:inline-block;margin-top:20px" onclick="OpenLogIn(\'\', false, function () { ClientId = ClientJson.ID; Zeout = ClientJson.Zeout; GetOldTofesData(); $(\'#AllMainForm\').show();$(\'#ComputerNote\').hide(); })">לזיהוי לחץ כאן</div></div></div>'
        )

        var Special = GetURLParameter("Special");
        var MasofId = GetURLParameter("MasofId");

        if (Special != 1 && MasofId == '') {
            $("#ComputerNote").show();
            $("#AllMainForm").hide();
        } else {
            $("#ComputerNote").hide();
            $("#AllMainForm").show();
        }
    }
}




function CreatingPopUpWindow(Data) {
    setTimeout(function () {
        console.log(d)
    }, 2000)
    //CreatingPopUpWindow({
    //    ElementId: 'City',
    //    Title: 'עיר',
    //    Array: ['נתיבות', 'ירושלים', 'בני ברק', 'ירושלים', 'נתיבות'],
    //    Search: true,
    //    Sort: false,
    //    DeleteDuplicates: false,
    //    Focus:true

    //})
    var html = ''
    html += '<div id="PopUpWindow_' + Data.ElementId + '" style="position: fixed; z-index: 100; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; padding: 14px 0; background-color: rgba(0, 0, 0, 0.5);display:none;">'
    html += '<div style="margin: 5px auto 20px; padding: 20px; border: 1px solid #888; width: 80%; color: #808080; font-family: Assistant, sans-serif; -webkit-box-shadow: 0px 0px 30px 0px rgb(50 50 50 / 75%); background-color: white; max-width: 500px; min-width: 200px; position: relative; border-radius: 20px; text-align: center;">'
    html += '<span style="cursor: pointer; position: absolute; background: indianred; padding: 6px 15px; color: white; font-weight: 600; font-size: 22px; border-radius: 7px 15px; top: 5px; right: 5px;" onclick="$(this).parent().parent().hide()" >X</span>'
    html += '<div style="text-align:center">'
    html += '<div style="display: inline-block; font-family: Assistant, sans-serif; font-size: 22px; color: #ff6a00; font-weight: bold; width: 90%; margin-top: 27px; margin-bottom: 18px; -webkit-user-select: none; text-align: center; padding: 0;">בחר ' + Data.Title + ':</div>'
    html += '<input id="PopUpWindowSearch_' + Data.ElementId + '" style="-webkit-appearance: none; font-size: large; color: #3f475e; text-align: center; padding: 6px; border-color: #f7bb4d; border-style: solid; border-width: 0px 0px 2px 0px; margin: 5px 5px; background-color: #FFFFFB; -webkit-box-sizing: border-box;margin-top: -7px;display:none;" type="text" placeholder="חפש ' + Data.Title + '" />'
    html += '<div id="CardFixedCount_' + Data.ElementId + '" style="padding: 5px 0 13px;display:none">סה"כ תוצאות: <span></span></div>'
    html += '<table id="PopUpWindowTable_' + Data.ElementId + '" style="text-align:center;width:95%;font-size:medium;background-color:white"></table>'
    html += '</div></div></div>'

    $('body').append(html)

    $("#" + Data.ElementId).focus(function () {
        $("#PopUpWindow_" + Data.ElementId).show()
        $("#" + Data.ElementId).blur()
        $('#PopUpWindowSearch_' + Data.ElementId).val('')
        PopUpWindowSearch()
        if (Data.Focus == true) {
            $('#PopUpWindowSearch_' + Data.ElementId).focus()
        }
    });

    if (Data.DeleteDuplicates == true) {
        var TestDuplicates = []
        for (i = 0; i < Data.Array.length; i++) {
            if (TestDuplicates.indexOf(Data.Array[i]) == -1) {
                TestDuplicates.push(Data.Array[i])
            }
        }
        Data.Array = TestDuplicates
    }


    if (Data.Sort == true) {
        Data.Array.sort(function (a, b) {
            if (a < b) return -1;
            if (a > b) return 1;
            return 0;
        })
    }


    function PopUpWindowSearch() {
        $('#PopUpWindowTable_' + Data.ElementId).html('')
        var KeyWord = $('#PopUpWindowSearch_' + Data.ElementId).val().split(' ')
        var Counter = 0
        for (var i = 0; i < Data.Array.length; i++) {
            var Exist = true
            for (var j = 0; j < KeyWord.length; j++) {
                if (Data.Array[i].indexOf(KeyWord[j]) < 0) { Exist = false }
            }
            if (Data.Array[i] == $('#PopUpWindowSearch_' + Data.ElementId).val()) { Exist = true }
            if (Exist == true) {
                Counter += 1
                $('#PopUpWindowTable_' + Data.ElementId).append('<tr><td id="PopUpWindowBt_' + Data.ElementId + i + '" style="user-select: none;cursor:pointer;font-weight:bold;width:80%;text-align:right"><div style="text-align:center;font-size: 20px;color: #2B3A63;">' + Data.Array[i] + '</div></td></tr>');
                (function (i) {
                    $('#PopUpWindowBt_' + Data.ElementId + i).click(function () {
                        $("#" + Data.ElementId).val(Data.Array[i])
                        $("#PopUpWindow_" + Data.ElementId).hide()
                        setTimeout(function () { ScrollUp($('#' + Data.ElementId)) }, 100);
                    });
                })(i);
            };
        }
        $('#CardFixedCount_' + Data.ElementId + ' span').html(Counter)
    }

    PopUpWindowSearch()


    $('#PopUpWindowSearch_' + Data.ElementId).on('input', function () {
        PopUpWindowSearch()
    })

    if (Data.Search == true) {
        $('#PopUpWindowSearch_' + Data.ElementId).show()
        $('#CardFixedCount_' + Data.ElementId).show()
    }
}




//CheckAllowedZeout ***********  959
//function ZeoutCheck() {

//    $("#ZeoutCheckSave").hide()
//    $("#ZeoutCheckWait").show()
//    ZeoutNumber = $("#ZeoutCheckText").val();
//    if ($.isNumeric(ZeoutNumber) == false) { LoginSwal("נא להקיש מספר זהות בספרות בלבד, ללא סימנים", "ZeoutCheckText"); return false };

//    $.ajax({
//        url: "Manage.aspx?Action=CheckAllowedZeout&MosadId=" + Json.MosadId + "&Zeout=" + encodeURIComponent(ZeoutNumber),
//        context: Text,
//        timeout: 16000,
//    }).success(function (JsonData) {
//        if (JsonData.Status == 'Error' || JsonData.Result == 'Error') {
//            swal({
//                type: "warning",
//                title: "מספר הזהות שהוקש לא נמצא במערכת <br/> הנך מועבר לטופס הרשמה למערכת",
//                timer: 3000,
//                showConfirmButton: false,
//                html: true
//            }, function (r) {
//                Open(968)
//            })
//        }
//        else {
//            $('#AllMainForm').show();
//            $('#ZeoutCheck').hide();
//            $("#Zeout").val(ZeoutNumber);
//            $("#Zeout").attr('disabled', 'disabled');
//            return false;
//        }
//    }).error(function () {
//        EAlertConfirm("שגיאה בקבלת נתונים. בדוק תקשורת")
//    });


//}



//Snif PopUp + HTML. 909  **************





//Generic
function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0].toLowerCase() == sParam.toLowerCase()) {
            return sParameterName[1];
        }
    }
    return ''
}

function IsVisible(Element) {
    if (Element == undefined) return false
    var element = document.getElementById(Element);
    while (element.parentNode) {
        if ($("#" + element.id).css('display') == 'none') return false
        element = element.parentNode;
    }
    return true
}

function decode(str) {
    return decodeURIComponent(str.replace(/\+/g, " "));
}

function htmlEncode(value) {
    return $('<textarea/>').text(value).html();
}

function EnableForm(Enable) {
    $.ajax({
        url: "Manage.aspx?Action=EnableForm&MosadId=" + Json.MosadId + "&TofesId=" + Json.TofesId + "&Enable=" + encodeURIComponent(Enable),
        context: Text,
        timeout: 16000,
    }).success(function (JsonData) {
        if (JsonData.Status == 'Error' || JsonData.Result == 'Error') {
            EAlertConfirm("שגיאה", JsonData.Message)
        }
        else {
            IAlertConfirm("הפעולה בוצעה בהצלחה");
        }
    }).error(function () {
        alert(2)
        EAlertConfirm('שגיאה בקבלת נתונים בדוק תקשורת                       טופס זה מופעל ע"י מלכר מערכות ואין לפנות אל נדרים פלוס כלל !!!')
    });
}

function GetExcel() {
    var url = "Manage.aspx?Action=GetExcel&MosadId=" + Json.MosadId + "&TofesId=" + Json.TofesId
    var FormData = '<form action="' + url + '" method="post" target="_blank" style="display:none">'
    for (var Element in Json.FormElements) {
        var JsonElement = Json.FormElements[Element]
        if (JsonElement.Type == "Margin" || JsonElement.Type == "List" || JsonElement.Type == "Koteret" || JsonElement.DbName == undefined) { continue; }
        FormData += '<input type="text" name="' + JsonElement.DbName + '" value="' + JsonElement.fieldName.replace(/"/g, '&quot;').replace(/<b>/g, '').replace(/<\/b>/g, '') + '" />'
    }
    FormData += '</form>'
    var form = $(FormData);
    $('body').append(form);
    form.submit();
}

function ResetForm() {
    swal({
        title: "<span style='font-size: 22px; color: #607d8b;'>טופס " + Json.TofesId + "</span><br />איפוס המידע השמור בשרתים",
        text: "על מנת לבצע איפוס, נא להקליד \"אני מאשר\".",
        html: true,
        type: "input",
        showCancelButton: true,
        closeOnConfirm: false,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "אישור",
        cancelButtonText: "ביטול",
        inputPlaceholder: "הקלד כאן את המילים: אני מאשר",
        showLoaderOnConfirm: true,
    }, function (inputValue) {
        if (inputValue === false) return false;
        if (inputValue === "") {
            swal.showInputError("נא להקליד: אני מאשר");
            return false
        }
        if (inputValue !== "אני מאשר" && inputValue !== "tbh ntar") {
            swal.showInputError("נא להקליד: אני מאשר");
            return false
        }
        $.ajax({
            url: "Manage.aspx?Action=ResetForm&MosadId=" + Json.MosadId + "&TofesId=" + Json.TofesId,
            context: Text,
            timeout: 16000,
        }).success(function (JsonData) {
            if (JsonData.Status == 'Error' || JsonData.Result == 'Error') {
                EAlertConfirm("שגיאה", JsonData.Message)
            }
            else {
                IAlertConfirm("הפעולה בוצעה בהצלחה");
            }
        }).error(function () {
            alert(3)
            EAlertConfirm('שגיאה בקבלת נתונים בדוק תקשורת                       טופס זה מופעל ע"י מלכר מערכות ואין לפנות אל נדרים פלוס כלל !!!')
        });
    });

}

function EAlertConfirm(message, insidetext) {
    swal({
        type: "error",
        title: message, text: insidetext,
        timer: 10000,
        showConfirmButton: true,
        allowOutsideClick: false,
    });
}

function IAlertConfirm(message, insidetext) {
    swal({
        type: "info",
        title: message, text: insidetext,
        timer: 30000,
        html: true,
        showConfirmButton: true,
        allowOutsideClick: false,
    });
}

// רשימת DbName ריקים בדף
function GetCheckDbName() {
    var ar = []
    var AllOb = []
    var MaxObj = []
    var tot = []
    var totMax = []

    for (i = 0; i < CheckDbName.length; i++) {
        if (CheckDbName[i].indexOf("Max") > -1) {
            MaxObj.push(CheckDbName[i])
        } else {
            AllOb.push(CheckDbName[i])
        }
    }

    for (i = 0; i <= 100; i++) {
        ar.push("")
    }

    for (i = 0; i < AllOb.length; i++) {
        ar[AllOb[i].substr(5)] = AllOb[i]
    }

    for (i = 0; i < ar.length; i++) {
        if (ar[i] == "" && i != 0) {
            tot.push("Field" + i)
        }
    }

    for (i = 0; i <= 10; i++) {
        totMax.push("")
    }

    for (i = 0; i < MaxObj.length; i++) {
        totMax[MaxObj[i].substring(5, 6)] = MaxObj[i]
    }

    for (i = 0; i < totMax.length; i++) {
        if (totMax[i] == "" && i != 0) {
            tot.push("Field" + i + "Max")
        }
    }
    return tot
}











// יבוא כל רשימת הערים והרחובות לדף
listCityGetAllCity({
   CityId: '#City',
   StreetId: '#Street',
   Auto_Focus_After_City_Selection: true,
   list_Citys: []
})
function listCityOpenCloseCardFixed(Type, Num) {
    if (Type == "Close") {
        $("#CardFixed_" + Num + '_listCity').hide();
        $("#CardFixed_" + Num + '_listCity_Search').val('');
    }
    else {
        $("#CardFixed_" + Num + '_listCity').show().scrollTop(0)
        $("#CardFixed_" + Num + '_listCity_Search').focus();
    }
}
var listCityAllCity = []
function listCityGetAllCity(data) {
    var city = data.CityId
    var Adders = data.StreetId
    var Action = data.Auto_Focus_After_City_Selection
    var listCitys = data.list_Citys


    $.ajax({
        url: "https://www.matara.pro/nedarimplus/Forms/Manage.aspx?Action=GetCitys",
        context: Text,
        timeout: 16000,
    }).success(function (res) {

        if (res.Status == 'Error') {
            swal({
                title: res.Message,
                type: "error",
                showCancelButton: false,
                confirmButtonText: 'אישור',
                closeOnConfirm: true,
                allowOutsideClick: false,
            })
            return false
        }

        for (i = 0; i < res.Data.length; i++) {
            listCityAllCity.push({ name: res.Data[i].CityName.trim(), Cityid: res.Data[i].CityId.trim() })
        }

        if (listCitys) {
            if (JSON.stringify(listCitys) != '[]') {
                listCityAllCity = listCityAllCity.filter(function (elm) { return listCitys.indexOf(elm.name) > -1 })
            }
        }

        listCityAllCity.sort(function (a, b) {
            if (a.name < b.name) return -1
            return a.name > b.name ? 1 : 0
        })

        listCityBuildHtml(city, Adders, Action)
    }).error(function () {
        alert(4)
        swal({
            title: 'שגיאה בקבלת נתונים בדוק תקשורת                       טופס זה מופעל ע"י מלכר מערכות ואין לפנות אל נדרים פלוס כלל !!!',
            type: "error",
            showCancelButton: false,
            confirmButtonText: 'אישור',
            closeOnConfirm: true,
            allowOutsideClick: false,
        })
    })
}
function listCityBuildHtml(City, Adders, Action) {
    var html = ''
    html += '<style>'
    html += '.listCityModal {'
    html += 'display: none;'
    html += 'position: fixed;'
    html += 'z-index: 100;'
    html += 'left: 0;'
    html += 'top: 0;'
    html += 'width: 100%;'
    html += 'height: 100%;'
    html += 'overflow: auto;'
    html += 'padding: 14px 0;'
    html += 'background-color: rgba(0, 0, 0, 0.5);}'

    html += '.listCitymodal-content {'
    html += 'max-width:400px;'
    html += 'margin: 5px auto 20px;'
    html += 'background-color: #fefefe;'
    html += 'padding: 20px;'
    html += 'border: 1px solid #888;'
    html += 'width: 80%;'
    html += 'color: #808080;'
    html += 'font-family: "Assistant", sans-serif;'
    html += '-webkit-box-shadow: 0px 0px 30px 0px rgba(50, 50, 50, 0.75);'
    html += 'background-color: white;'
    html += 'max-width: 500px;'
    html += 'min-width: 200px;'
    html += 'min-height: 250px;'
    html += 'position: relative;'
    html += 'border-radius: 20px;'
    html += 'text-align: center;}'

    html += 'td {'
    html += 'color: #2B3A63;'
    html += 'font-size: 20px;'
    html += 'border-bottom: 1px solid #d7cece;'
    html += 'padding-left: 5px;'
    html += 'padding-right: 5px;'
    html += 'padding-top: 15px;'
    html += 'padding-bottom: 15px;}'


    html += 'th {'
    html += 'color: #2B3A63;'
    html += 'font-family: assistant,Arial;}'


    html += '.bordered td, .bordered th {'
    html += 'border-left: 1px solid #ccc;'
    html += 'border-top: 1px solid #ccc;'
    html += 'padding: 5px;}'

    html += '.TableLightFont {'
    html += 'font-weight: lighter;'
    html += 'font-size: 14px;}'

    html += 'table {'
    html += 'border-collapse: collapse;'
    html += 'border: 1px solid #d7cece;'
    html += 'font-family: "Assistant", sans-serif;'
    html += 'margin-right: auto;'
    html += 'margin-left: auto;}'

    html += 'tr:nth-child(even) {'
    html += 'background-color: #f2f2f2;}'
    html += '</style>'


    html += '<div dir="rtl" id="CardFixed_1_listCity" class="listCityModal" onclick="if (event.target == this) listCityOpenCloseCardFixed(\'Close\', \'1\')">'
    html += '<div class="listCitymodal-content">'
    html += '<div style="-webkit-user-select: none;"> <span style="cursor: pointer; width: 25px; height: auto; margin-top: 10px; margin-right: 10px; position: absolute; background: indianred; padding: 6px 8px; color: white; font-weight: 600; font-size: 22px; border-radius: 8px 16px; top: -6px; right: -6px;" onclick="listCityOpenCloseCardFixed(\'Close\', \'1\')">X</span>'
    html += '<div style="text-align:center">'
    html += '<div style="display: inline-block; font-family: Assistant, sans-serif; font-size: 22px; color: #ff6a00; font-weight: bold; width: 90%; margin-top: 27px; margin-bottom: 10px; -webkit-user-select: none; text-align: center; padding: 0;">בחר עיר:</div>'
    html += '<input autocomplete="off" id="CardFixed_1_listCity_Search" style="-webkit-appearance: none; font-family: Assistant,Arial; font-size: large; color: #3f475e;outline: none; padding: 6px; border-color: #f7bb4d; border-style: solid; border-width: 0px 0px 2px 0px; margin: 5px 5px; background-color: #FFFFFB; -webkit-box-sizing: border-box;text-align:center" type="text" placeholder="חפש עיר" />'
    html += '<div style="padding: 5px 0 13px;">סה"כ תוצאות: <span id="CardFixed_1_listCity_Count"></span></div>'
    html += '<table id="CardFixed_1_listCity_Table" style="text-align:center;width:95%;font-size:medium;background-color:white"></table>'
    html += '</div></div></div></div>'


    if (Adders != '') {
        html += '<div dir="rtl" id="CardFixed_2_listCity" class="listCityModal" onclick="if (event.target == this) listCityOpenCloseCardFixed(\'Close\', \'2\')">'
        html += '<div class="listCitymodal-content">'
        html += '<div style="-webkit-user-select: none;"> <span style="cursor: pointer; width: 25px; height: auto; margin-top: 10px; margin-right: 10px; position: absolute; background: indianred; padding: 6px 8px; color: white; font-weight: 600; font-size: 22px; border-radius: 8px 16px; top: -6px; right: -6px;" onclick="listCityOpenCloseCardFixed(\'Close\', \'2\')">X</span>'
        html += '<div style="text-align:center">'
        html += '<div style="display: inline-block; font-family: Assistant, sans-serif; font-size: 22px; color: #ff6a00; font-weight: bold; width: 90%; margin-top: 27px; margin-bottom: 10px; -webkit-user-select: none; text-align: center; padding: 0;">בחר רחוב:</div>'
        html += '<input autocomplete="off" id="CardFixed_2_listCity_Search" style="-webkit-appearance: none; font-family: Assistant,Arial; font-size: large; color: #3f475e;outline: none; padding: 6px; border-color: #f7bb4d; border-style: solid; border-width: 0px 0px 2px 0px; margin: 5px 5px; background-color: #FFFFFB; -webkit-box-sizing: border-box;text-align:center" type="text" placeholder="חפש רחוב" />'
        html += '<div id="CardFixed_2_listCitywait" style="display:none;padding: 5px 0 13px;"><img style="width: 49px;" src="https://matara.pro/nedarimplus/waitnew.gif"/><div>נא להמתין..</div></div>'
        html += '<div id="CardFixed_2_listCity_Count" style="padding: 5px 0 13px;">סה"כ תוצאות: <span></span></div>'
        html += '<table id="CardFixed_2_listCity_Table" style="text-align:center;width:95%;font-size:medium;background-color:white"></table>'
        html += '</div></div></div>'
    }

    $('body').append(html)


    if (City != '') {
        $(City).focus(function () {
            $(City).blur()
            $("#CardFixed_1_listCity_Search").on('input', function () {
                CardFixed_1_listCityDom($('#CardFixed_1_listCity_Search').val(), City, Adders, Action)
            });
            CardFixed_1_listCityDom('', City, Adders, Action)
            listCityOpenCloseCardFixed('Open', '1')
        });
    }


    if (Adders != '') {
        $(Adders).focus(function () {
            $(Adders).blur()
            if ($(City).val() == '') {
                $(City).focus()
                return false
            }

            $("#CardFixed_2_listCity_Search").on('input', function () {
                CardFixed_2_listCityDom($('#CardFixed_2_listCity_Search').val(), Adders)
            });

            CardFixed_2_listGetAdders('', Adders, City)
            listCityOpenCloseCardFixed('Open', '2')
        });
    }

}
function CardFixed_1_listCityDom(Search, idcity, Idadders, Action) {
    $("#CardFixed_1_listCity_Table").html('')
    var KeyWord = Search.split(' ')
    var Counter = 0
    for (var i = 0; i < listCityAllCity.length; i++) {
        var Exist = true
        for (var j = 0; j < KeyWord.length; j++) {
            if (listCityAllCity[i].name.indexOf(KeyWord[j]) < 0) { Exist = false }
        }
        if (listCityAllCity[i].name == Search) { Exist = true }
        if (Exist == true) {
            Counter += 1
            if (Counter > 200) continue;
            $("#CardFixed_1_listCity_Table").append('<tr><td id="CardFixed_1_listCity_Table_Row_' + i + '" style="user-select: none;cursor:pointer;font-weight:bold;width:80%;text-align:right"><div style="text-align:center;font-size: 20px;color: #2B3A63;">' + listCityAllCity[i].name + '</div></td></tr>');
            (function (i) {
                $("#CardFixed_1_listCity_Table_Row_" + i).click(function () {
                    if ($(idcity).val() != listCityAllCity[i].name) {
                        $(idcity).val(listCityAllCity[i].name).attr('Cityid', listCityAllCity[i].Cityid)
                        $(Idadders).val('')
                    }

                    if (Action == true) {
                        $(Idadders).focus()
                    }
                    listCityOpenCloseCardFixed('Close', '1')
                });
            })(i);
        };
    }
    $('#CardFixed_1_listCity_Count').html(Counter)
}
var ValCity = ''
var listCityAllAdders = []
function CardFixed_2_listGetAdders(Search, Idadders, idcity) {
    if ($(idcity).val() == ValCity) {
        CardFixed_2_listCityDom(Search, Idadders)
        return false
    } else {
        ValCity = $(idcity).val()
    }

    $("#CardFixed_2_listCity_Table").html('')
    listCityAllAdders = []

    $("#CardFixed_2_listCity_Count").hide()
    $("#CardFixed_2_listCitywait").show()

    $.ajax({
        url: "https://www.matara.pro/nedarimplus/Forms/Manage.aspx?Action=GetStreets&Cityid=" + $(idcity).attr('Cityid'),
        context: Text,
        timeout: 16000,
    }).success(function (res) {

        if (res.Status == 'Error') {
            swal({
                title: res.Message,
                type: "error",
                showCancelButton: false,
                confirmButtonText: 'אישור',
                closeOnConfirm: true,
                allowOutsideClick: false,
            })
            return false
        }

        for (i = 0; i < res.Data.length; i++) {
            listCityAllAdders.push({ name: res.Data[i].StreetName.trim() })
        }

        listCityAllAdders.sort(function (a, b) {
            if (a.name < b.name) return -1
            return a.name > b.name ? 1 : 0
        })

        CardFixed_2_listCityDom(Search, Idadders)
    }).error(function () {
        alert(5)
        swal({
            title: 'שגיאה בקבלת נתונים בדוק תקשורת                       טופס זה מופעל ע"י מלכר מערכות ואין לפנות אל נדרים פלוס כלל !!!',
            type: "error",
            showCancelButton: false,
            confirmButtonText: 'אישור',
            closeOnConfirm: true,
            allowOutsideClick: false,
        })
    }).complete(function () {
        $("#CardFixed_2_listCity_Count").show()
        $("#CardFixed_2_listCitywait").hide()
    });
}
function CardFixed_2_listCityDom(Search, Idadders) {
    $("#CardFixed_2_listCity_Table").html('')
    var KeyWord = Search.split(' ')
    var Counter = 0
    for (var i = 0; i < listCityAllAdders.length; i++) {
        var Exist = true
        for (var j = 0; j < KeyWord.length; j++) {
            if (listCityAllAdders[i].name.indexOf(KeyWord[j]) < 0) { Exist = false }
        }
        if (listCityAllAdders[i].name == Search) { Exist = true }
        if (Exist == true) {
            Counter += 1
            if (Counter > 200) continue;
            $("#CardFixed_2_listCity_Table").append('<tr><td id="CardFixed_2_listCity_Table_Row_' + i + '" style="user-select: none;cursor:pointer;font-weight:bold;width:80%;text-align:right"><div style="text-align:center;font-size: 20px;color: #2B3A63;">' + listCityAllAdders[i].name + '</div></td></tr>');
            (function (i) {
                $("#CardFixed_2_listCity_Table_Row_" + i).click(function () {
                    $(Idadders).val(listCityAllAdders[i].name)
                    listCityOpenCloseCardFixed('Close', '2')
                });
            })(i);
        };
    }
    $('#CardFixed_2_listCity_Count span').html(Counter)
}










//CreatingPopUpWindowDoubel({
//    // הגדרות לחלון ראשון
//    ElementIdCard1: 'Country',
//    TitleCard1: 'שכונה',
//    SearchCard1: true,
//    SortCard1: true,
//    DeleteDuplicatesCard1: true,
//    FocusCard1: true,


//    // הגדרות לחלון שני
//    Card2: true,
//    ElementIdCard2: 'City',
//    TitleCard2: 'בית מדרש',
//    SearchCard2: true,
//    SortCard2: true,
//    DeleteDuplicatesCard2: true,
//    FocusCard2: true,
//    AutoFillOneResultCard2: true,


//    // הגדרות לחלון שלישי
//    Card3: true,
//    ElementIdCard3: 'Street',
//    TitleCard3: 'כתובת ביה\"מד',
//    SearchCard3: true,
//    SortCard3: true,
//    DeleteDuplicatesCard3: true,
//    FocusCard3: true,
//    AutoFillOneResultCard3: true,

//    // הגדרות לחלון רביעי
//    Card4: true,
//    ElementIdCard4: 'Street1',
//    TitleCard4: 'ראש החבורה',
//    SearchCard4: true,
//    SortCard4: true,
//    DeleteDuplicatesCard4: true,
//    FocusCard4: true,
//    AutoFillOneResultCard4: true,

//    // אם לפתוח את החלון הבא אחרי הבחירה
//    OpenCard2AfterSelectCard1: true,
//    OpenCard3AfterSelectCard2: true,
//    OpenCard4AfterSelectCard3: true,

//    // רשימה
//    http://www.unit-conversion.info/texttools/replace-text/
//    ArrayData: [
//        { "Card1": "ארמון הנציב ", "Card2": "חניכי הישיבות ", "Card3": "יעקב רז 19", "Card4": "הרב חגי לוי" }]
//})


function CreatingPopUpWindowDoubel(Data) {
    var html = ''
    html += '<div id="PopUpWindow_' + Data.ElementIdCard1 + '" style="position: fixed; z-index: 100; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; padding: 14px 0; background-color: rgba(0, 0, 0, 0.5);display:none;">'
    html += '<div style="margin: 5px auto 20px; padding: 20px; border: 1px solid #888; width: 80%; color: #808080; font-family: Assistant, sans-serif; -webkit-box-shadow: 0px 0px 30px 0px rgb(50 50 50 / 75%); background-color: white; max-width: 450px; min-width: 200px; position: relative; border-radius: 20px; text-align: center;">'
    html += '<span style="cursor: pointer; position: absolute; background: indianred; padding: 6px 15px; color: white; font-weight: 600; font-size: 22px; border-radius: 7px 15px; top: 5px; right: 5px;" onclick="$(this).parent().parent().hide()" >X</span>'
    html += '<div style="text-align:center">'
    html += '<div style="display: inline-block; font-family: Assistant, sans-serif; font-size: 22px; color: #ff6a00; font-weight: bold; width: 90%; margin-top: 27px; margin-bottom: 18px; -webkit-user-select: none; text-align: center; padding: 0;">בחר ' + Data.TitleCard1 + ':</div>'
    html += '<input id="PopUpWindowSearch_' + Data.ElementIdCard1 + '" style="-webkit-appearance: none; font-size: large; color: #3f475e; text-align: center; padding: 6px; border-color: #f7bb4d; border-style: solid; border-width: 0px 0px 2px 0px; margin: 5px 5px; background-color: #FFFFFB; -webkit-box-sizing: border-box;margin-top: -7px;display:none;" type="text" placeholder="חפש ' + Data.TitleCard1 + '" />'
    html += '<div id="CardFixedCount_' + Data.ElementIdCard1 + '" style="padding: 5px 0 13px;display:none">סה"כ תוצאות: <span></span></div>'
    html += '<table id="PopUpWindowTable_' + Data.ElementIdCard1 + '" style="text-align:center;width:95%;font-size:medium;background-color:white"></table>'
    html += '</div></div></div>'


    $('body').append(html)


    $("#" + Data.ElementIdCard1).focus(function () {
        $("#PopUpWindow_" + Data.ElementIdCard1).show()
        $("#" + Data.ElementIdCard1).blur()
        $('#PopUpWindowSearch_' + Data.ElementIdCard1).val('')
        PopUpWindowSearchCard1()
        if (Data.FocusCard1 == true) {
            $('#PopUpWindowSearch_' + Data.ElementIdCard1).focus()
        }
    });

    var ArrayDataParsCard1 = []
    if (Data.DeleteDuplicatesCard1 == true) {
        for (i = 0; i < Data.ArrayData.length; i++) {
            if (ArrayDataParsCard1.indexOf(Data.ArrayData[i].Card1) == -1) {
                ArrayDataParsCard1.push(Data.ArrayData[i].Card1)
            }
        }
    } else {
        for (i = 0; i < Data.ArrayData.length; i++) {
            ArrayDataParsCard1.push(Data.ArrayData[i].Card1)
        }
    }


    if (Data.SortCard1 == true) {
        ArrayDataParsCard1.sort(function (a, b) {
            if (a < b) return -1;
            if (a > b) return 1;
            return 0;
        })
    }

    function PopUpWindowSearchCard1() {
        $('#PopUpWindowTable_' + Data.ElementIdCard1).html('')
        var KeyWord = $('#PopUpWindowSearch_' + Data.ElementIdCard1).val().split(' ')
        var Counter = 0
        for (var i = 0; i < ArrayDataParsCard1.length; i++) {
            var Exist = true
            for (var j = 0; j < KeyWord.length; j++) {
                if (ArrayDataParsCard1[i].indexOf(KeyWord[j]) < 0) { Exist = false }
            }
            if (ArrayDataParsCard1[i] == $('#PopUpWindowSearch_' + Data.ElementIdCard1).val()) { Exist = true }
            if (Exist == true) {
                Counter += 1
                $('#PopUpWindowTable_' + Data.ElementIdCard1).append('<tr><td id="PopUpWindowBt_' + Data.ElementIdCard1 + i + '" style="user-select: none;cursor:pointer;font-weight:bold;width:80%;text-align:right"><div style="text-align:center;font-size: 20px;color: #2B3A63;">' + ArrayDataParsCard1[i] + '</div></td></tr>');
                (function (i) {
                    $('#PopUpWindowBt_' + Data.ElementIdCard1 + i).click(function () {
                        if ($("#" + Data.ElementIdCard1).val() != ArrayDataParsCard1[i]) {
                            $("#" + Data.ElementIdCard1).val(ArrayDataParsCard1[i])
                            if (Data.Card2 == true) {
                                $("#" + Data.ElementIdCard2).val('');
                            }
                            if (Data.Card3 == true) {
                                $("#" + Data.ElementIdCard3).val('');
                            }
                            if (Data.Card4 == true) {
                                $("#" + Data.ElementIdCard4).val('');
                            }
                        }
                        $("#PopUpWindow_" + Data.ElementIdCard1).hide()
                        setTimeout(function () { ScrollUp($('#' + Data.ElementIdCard1)) }, 100);
                        if (Data.Card2 == true) {
                            if (Data.OpenCard2AfterSelectCard1 == true) {
                                Card2Focus()
                            }
                        }
                    });
                })(i);
            };
        }
        $('#CardFixedCount_' + Data.ElementIdCard1 + ' span').html(Counter)
    }

    PopUpWindowSearchCard1()

    $('#PopUpWindowSearch_' + Data.ElementIdCard1).on('input', function () {
        PopUpWindowSearchCard1()
    })

    if (Data.SearchCard1 == true) {
        $('#PopUpWindowSearch_' + Data.ElementIdCard1).show()
        $('#CardFixedCount_' + Data.ElementIdCard1).show()
    }




    //////////////////  Card2


    function Card2Focus() {
        if (Data.AutoFillOneResultCard2 == true) {
            var TotalFilter = Data.ArrayData.filter(function (elm) {
                return $("#" + Data.ElementIdCard1).val() == elm.Card1
            })

            var TotalFilterDeleteDuplicates = TotalFilter
            if (Data.DeleteDuplicatesCard2 == true) {
                TotalFilterDeleteDuplicates = []
                for (i = 0; i < TotalFilter.length; i++) {
                    if (TotalFilterDeleteDuplicates.indexOf(TotalFilter[i].Card2) == -1) {
                        TotalFilterDeleteDuplicates.push(TotalFilter[i].Card2)
                    }
                }
            }


            if (TotalFilterDeleteDuplicates.length == 1) {
                if (TotalFilterDeleteDuplicates[0].Card1) {
                    $("#" + Data.ElementIdCard2).val(TotalFilterDeleteDuplicates[0].Card2)
                }
                else {
                    $("#" + Data.ElementIdCard2).val(TotalFilterDeleteDuplicates[0])
                }
                Card3Focus()
            } else {
                $("#" + Data.ElementIdCard2).focus()
            }
        } else {
            $("#" + Data.ElementIdCard2).focus()
        }
    }


    if (Data.Card2 == true) {
        var html = ""
        html += '<div id="PopUpWindow_' + Data.ElementIdCard2 + '" style="position: fixed; z-index: 100; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; padding: 14px 0; background-color: rgba(0, 0, 0, 0.5);display:none;">'
        html += '<div style="margin: 5px auto 20px; padding: 20px; border: 1px solid #888; width: 80%; color: #808080; font-family: Assistant, sans-serif; -webkit-box-shadow: 0px 0px 30px 0px rgb(50 50 50 / 75%); background-color: white; max-width: 450px; min-width: 200px; position: relative; border-radius: 20px; text-align: center;">'
        html += '<span style="cursor: pointer; position: absolute; background: indianred; padding: 6px 15px; color: white; font-weight: 600; font-size: 22px; border-radius: 7px 15px; top: 5px; right: 5px;" onclick="$(this).parent().parent().hide()" >X</span>'
        html += '<div style="text-align:center">'
        html += '<div style="display: inline-block; font-family: Assistant, sans-serif; font-size: 22px; color: #ff6a00; font-weight: bold; width: 90%; margin-top: 27px; margin-bottom: 18px; -webkit-user-select: none; text-align: center; padding: 0;">בחר ' + Data.TitleCard2 + ':</div>'
        html += '<input id="PopUpWindowSearch_' + Data.ElementIdCard2 + '" style="-webkit-appearance: none; font-size: large; color: #3f475e; text-align: center; padding: 6px; border-color: #f7bb4d; border-style: solid; border-width: 0px 0px 2px 0px; margin: 5px 5px; background-color: #FFFFFB; -webkit-box-sizing: border-box;margin-top: -7px;display:none;" type="text" placeholder="חפש ' + Data.TitleCard2 + '" />'
        html += '<div id="CardFixedCount_' + Data.ElementIdCard2 + '" style="padding: 5px 0 13px;display:none">סה"כ תוצאות: <span></span></div>'
        html += '<table id="PopUpWindowTable_' + Data.ElementIdCard2 + '" style="text-align:center;width:95%;font-size:medium;background-color:white"></table>'
        html += '</div></div></div>'

        $('body').append(html)


        $("#" + Data.ElementIdCard2).focus(function () {
            if ($("#" + Data.ElementIdCard1).val() == "") {
                $("#" + Data.ElementIdCard1).focus()
            } else {
                $("#PopUpWindow_" + Data.ElementIdCard2).show()
                $("#" + Data.ElementIdCard2).blur()
                $('#PopUpWindowSearch_' + Data.ElementIdCard2).val('')
                if (Data.FocusCard2 == true) {
                    $('#PopUpWindowSearch_' + Data.ElementIdCard2).focus()
                }


                var ArrayDataParsCard2 = []
                for (i = 0; i < Data.ArrayData.length; i++) {
                    if (Data.DeleteDuplicatesCard2 == true) {
                        if (Data.ArrayData[i].Card1 == $("#" + Data.ElementIdCard1).val() && ArrayDataParsCard2.indexOf(Data.ArrayData[i].Card2) == -1) {
                            ArrayDataParsCard2.push(Data.ArrayData[i].Card2)
                        }
                    } else {
                        if (Data.ArrayData[i].Card1 == $("#" + Data.ElementIdCard1).val()) {
                            ArrayDataParsCard2.push(Data.ArrayData[i].Card2)
                        }
                    }
                }


                if (Data.SortCard2 == true) {
                    ArrayDataParsCard2.sort(function (a, b) {
                        if (a < b) return -1;
                        if (a > b) return 1;
                        return 0;
                    })
                }



                $('#PopUpWindowSearch_' + Data.ElementIdCard2).on('input', function () {
                    PopUpWindowSearchCard2()
                })

                if (Data.SearchCard2 == true) {
                    $('#PopUpWindowSearch_' + Data.ElementIdCard2).show()
                    $('#CardFixedCount_' + Data.ElementIdCard2).show()
                }


                function PopUpWindowSearchCard2() {
                    $('#PopUpWindowTable_' + Data.ElementIdCard2).html('')
                    var KeyWord = $('#PopUpWindowSearch_' + Data.ElementIdCard2).val().split(' ')
                    var Counter = 0
                    for (var i = 0; i < ArrayDataParsCard2.length; i++) {
                        var Exist = true
                        for (var j = 0; j < KeyWord.length; j++) {
                            if (ArrayDataParsCard2[i].indexOf(KeyWord[j]) < 0) { Exist = false }
                        }
                        if (ArrayDataParsCard2[i] == $('#PopUpWindowSearch_' + Data.ElementIdCard2).val()) { Exist = true }
                        if (Exist == true) {
                            Counter += 1
                            $('#PopUpWindowTable_' + Data.ElementIdCard2).append('<tr><td id="PopUpWindowBt_' + Data.ElementIdCard2 + i + '" style="user-select: none;cursor:pointer;font-weight:bold;width:80%;text-align:right"><div style="text-align:center;font-size: 20px;color: #2B3A63;">' + ArrayDataParsCard2[i] + '</div></td></tr>');
                            (function (i) {
                                $('#PopUpWindowBt_' + Data.ElementIdCard2 + i).click(function () {
                                    if ($("#" + Data.ElementIdCard2).val() != ArrayDataParsCard2[i]) {
                                        $("#" + Data.ElementIdCard2).val(ArrayDataParsCard2[i])
                                        if (Data.Card3 == true) {
                                            $("#" + Data.ElementIdCard3).val('');
                                        }
                                        if (Data.Card4 == true) {
                                            $("#" + Data.ElementIdCard4).val('');
                                        }
                                    }
                                    $("#PopUpWindow_" + Data.ElementIdCard2).hide()
                                    setTimeout(function () { ScrollUp($('#' + Data.ElementIdCard2)) }, 100);
                                    if (Data.Card3 == true) {
                                        if (Data.OpenCard3AfterSelectCard2 == true) {
                                            Card3Focus()
                                        }
                                    }
                                });
                            })(i);
                        };
                    }
                    $('#CardFixedCount_' + Data.ElementIdCard2 + ' span').html(Counter)
                }

                PopUpWindowSearchCard2()
            }
        });
    }


    //////////////////  Card3

    function Card3Focus() {
        if (Data.AutoFillOneResultCard3 == true) {
            var TotalFilter = Data.ArrayData.filter(function (elm) {
                return $("#" + Data.ElementIdCard1).val() == elm.Card1 && $("#" + Data.ElementIdCard2).val() == elm.Card2
            })

            var TotalFilterDeleteDuplicates = TotalFilter
            if (Data.DeleteDuplicatesCard3 == true) {
                TotalFilterDeleteDuplicates = []
                for (i = 0; i < TotalFilter.length; i++) {
                    if (TotalFilterDeleteDuplicates.indexOf(TotalFilter[i].Card3) == -1) {
                        TotalFilterDeleteDuplicates.push(TotalFilter[i].Card3)
                    }
                }
            }
            if (TotalFilterDeleteDuplicates.length == 1) {
                if (TotalFilterDeleteDuplicates[0].Card1) {
                    $("#" + Data.ElementIdCard3).val(TotalFilterDeleteDuplicates[0].Card3)
                }
                else {
                    $("#" + Data.ElementIdCard3).val(TotalFilterDeleteDuplicates[0])
                }
                Card4Focus()
            } else {
                $("#" + Data.ElementIdCard3).focus()
            }
        } else {
            $("#" + Data.ElementIdCard3).focus()
        }
    }


    if (Data.Card3 == true) {
        var html = ""
        html += '<div id="PopUpWindow_' + Data.ElementIdCard3 + '" style="position: fixed; z-index: 100; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; padding: 14px 0; background-color: rgba(0, 0, 0, 0.5);display:none;">'
        html += '<div style="margin: 5px auto 20px; padding: 20px; border: 1px solid #888; width: 80%; color: #808080; font-family: Assistant, sans-serif; -webkit-box-shadow: 0px 0px 30px 0px rgb(50 50 50 / 75%); background-color: white; max-width: 450px; min-width: 200px; position: relative; border-radius: 20px; text-align: center;">'
        html += '<span style="cursor: pointer; position: absolute; background: indianred; padding: 6px 15px; color: white; font-weight: 600; font-size: 22px; border-radius: 7px 15px; top: 5px; right: 5px;" onclick="$(this).parent().parent().hide()" >X</span>'
        html += '<div style="text-align:center">'
        html += '<div style="display: inline-block; font-family: Assistant, sans-serif; font-size: 22px; color: #ff6a00; font-weight: bold; width: 90%; margin-top: 27px; margin-bottom: 18px; -webkit-user-select: none; text-align: center; padding: 0;">בחר ' + Data.TitleCard3 + ':</div>'
        html += '<input id="PopUpWindowSearch_' + Data.ElementIdCard3 + '" style="-webkit-appearance: none; font-size: large; color: #3f475e; text-align: center; padding: 6px; border-color: #f7bb4d; border-style: solid; border-width: 0px 0px 2px 0px; margin: 5px 5px; background-color: #FFFFFB; -webkit-box-sizing: border-box;margin-top: -7px;display:none;" type="text" placeholder="חפש ' + Data.TitleCard3 + '" />'
        html += '<div id="CardFixedCount_' + Data.ElementIdCard3 + '" style="padding: 5px 0 13px;display:none">סה"כ תוצאות: <span></span></div>'
        html += '<table id="PopUpWindowTable_' + Data.ElementIdCard3 + '" style="text-align:center;width:95%;font-size:medium;background-color:white"></table>'
        html += '</div></div></div>'

        $('body').append(html)


        $("#" + Data.ElementIdCard3).focus(function () {
            if ($("#" + Data.ElementIdCard1).val() == "") {
                $("#" + Data.ElementIdCard1).focus()
            } else if ($("#" + Data.ElementIdCard2).val() == "") {
                Card2Focus()
            } else {
                $("#PopUpWindow_" + Data.ElementIdCard3).show()
                $("#" + Data.ElementIdCard3).blur()
                $('#PopUpWindowSearch_' + Data.ElementIdCard3).val('')
                if (Data.FocusCard3 == true) {
                    $('#PopUpWindowSearch_' + Data.ElementIdCard3).focus()
                }


                var ArrayDataParsCard3 = []
                for (i = 0; i < Data.ArrayData.length; i++) {
                    if (Data.DeleteDuplicatesCard3 == true) {
                        if (Data.ArrayData[i].Card1 == $("#" + Data.ElementIdCard1).val() && Data.ArrayData[i].Card2 == $("#" + Data.ElementIdCard2).val() && ArrayDataParsCard3.indexOf(Data.ArrayData[i].Card3) == -1) {
                            ArrayDataParsCard3.push(Data.ArrayData[i].Card3)
                        }
                    } else {
                        if (Data.ArrayData[i].Card1 == $("#" + Data.ElementIdCard1).val() && Data.ArrayData[i].Card2 == $("#" + Data.ElementIdCard2).val()) {
                            ArrayDataParsCard3.push(Data.ArrayData[i].Card3)
                        }
                    }
                }

                if (Data.SortCard3 == true) {
                    ArrayDataParsCard3.sort(function (a, b) {
                        if (a < b) return -1;
                        if (a > b) return 1;
                        return 0;
                    })
                }



                $('#PopUpWindowSearch_' + Data.ElementIdCard3).on('input', function () {
                    PopUpWindowSearchCard3()
                })

                if (Data.SearchCard3 == true) {
                    $('#PopUpWindowSearch_' + Data.ElementIdCard3).show()
                    $('#CardFixedCount_' + Data.ElementIdCard3).show()
                }


                function PopUpWindowSearchCard3() {
                    $('#PopUpWindowTable_' + Data.ElementIdCard3).html('')
                    var KeyWord = $('#PopUpWindowSearch_' + Data.ElementIdCard3).val().split(' ')
                    var Counter = 0
                    for (var i = 0; i < ArrayDataParsCard3.length; i++) {
                        var Exist = true
                        for (var j = 0; j < KeyWord.length; j++) {
                            if (ArrayDataParsCard3[i].indexOf(KeyWord[j]) < 0) { Exist = false }
                        }
                        if (ArrayDataParsCard3[i] == $('#PopUpWindowSearch_' + Data.ElementIdCard3).val()) { Exist = true }
                        if (Exist == true) {
                            Counter += 1
                            $('#PopUpWindowTable_' + Data.ElementIdCard3).append('<tr><td id="PopUpWindowBt_' + Data.ElementIdCard3 + i + '" style="user-select: none;cursor:pointer;font-weight:bold;width:80%;text-align:right"><div style="text-align:center;font-size: 20px;color: #2B3A63;">' + ArrayDataParsCard3[i] + '</div></td></tr>');
                            (function (i) {
                                $('#PopUpWindowBt_' + Data.ElementIdCard3 + i).click(function () {
                                    if ($("#" + Data.ElementIdCard3).val() != ArrayDataParsCard3[i]) {
                                        $("#" + Data.ElementIdCard3).val(ArrayDataParsCard3[i])
                                        if (Data.Card4 == true) {
                                            $("#" + Data.ElementIdCard4).val('');
                                        }
                                    }
                                    $("#PopUpWindow_" + Data.ElementIdCard3).hide()
                                    setTimeout(function () { ScrollUp($('#' + Data.ElementIdCard3)) }, 100);
                                    if (Data.Card4 == true) {
                                        if (Data.OpenCard4AfterSelectCard3 == true) {
                                            Card4Focus()
                                        }
                                    }
                                });
                            })(i);
                        };
                    }
                    $('#CardFixedCount_' + Data.ElementIdCard3 + ' span').html(Counter)
                }

                PopUpWindowSearchCard3()
            }
        });
    }



    //////////////////  Card4

    function Card4Focus() {
        if (Data.AutoFillOneResultCard4 == true) {
            var TotalFilter = Data.ArrayData.filter(function (elm) {
                return $("#" + Data.ElementIdCard1).val() == elm.Card1 && $("#" + Data.ElementIdCard2).val() == elm.Card2 && $("#" + Data.ElementIdCard3).val() == elm.Card3
            })

            var TotalFilterDeleteDuplicates = TotalFilter
            if (Data.DeleteDuplicatesCard4 == true) {
                TotalFilterDeleteDuplicates = []
                for (i = 0; i < TotalFilter.length; i++) {
                    if (TotalFilterDeleteDuplicates.indexOf(TotalFilter[i].Card4) == -1) {
                        TotalFilterDeleteDuplicates.push(TotalFilter[i].Card4)
                    }
                }
            }

            if (TotalFilterDeleteDuplicates.length == 1) {
                if (TotalFilterDeleteDuplicates[0].Card1) {
                    $("#" + Data.ElementIdCard4).val(TotalFilterDeleteDuplicates[0].Card4)
                } else {
                    $("#" + Data.ElementIdCard4).val(TotalFilterDeleteDuplicates[0])
                }
            } else {
                $("#" + Data.ElementIdCard4).focus()
            }
        } else {
            $("#" + Data.ElementIdCard4).focus()
        }
    }


    if (Data.Card4 == true) {
        var html = ""
        html += '<div id="PopUpWindow_' + Data.ElementIdCard4 + '" style="position: fixed; z-index: 100; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; padding: 14px 0; background-color: rgba(0, 0, 0, 0.5);display:none;">'
        html += '<div style="margin: 5px auto 20px; padding: 20px; border: 1px solid #888; width: 80%; color: #808080; font-family: Assistant, sans-serif; -webkit-box-shadow: 0px 0px 30px 0px rgb(50 50 50 / 75%); background-color: white; max-width: 450px; min-width: 200px; position: relative; border-radius: 20px; text-align: center;">'
        html += '<span style="cursor: pointer; position: absolute; background: indianred; padding: 6px 15px; color: white; font-weight: 600; font-size: 22px; border-radius: 7px 15px; top: 5px; right: 5px;" onclick="$(this).parent().parent().hide()" >X</span>'
        html += '<div style="text-align:center">'
        html += '<div style="display: inline-block; font-family: Assistant, sans-serif; font-size: 22px; color: #ff6a00; font-weight: bold; width: 90%; margin-top: 27px; margin-bottom: 18px; -webkit-user-select: none; text-align: center; padding: 0;">בחר ' + Data.TitleCard4 + ':</div>'
        html += '<input id="PopUpWindowSearch_' + Data.ElementIdCard4 + '" style="-webkit-appearance: none; font-size: large; color: #3f475e; text-align: center; padding: 6px; border-color: #f7bb4d; border-style: solid; border-width: 0px 0px 2px 0px; margin: 5px 5px; background-color: #FFFFFB; -webkit-box-sizing: border-box;margin-top: -7px;display:none;" type="text" placeholder="חפש ' + Data.TitleCard4 + '" />'
        html += '<div id="CardFixedCount_' + Data.ElementIdCard4 + '" style="padding: 5px 0 13px;display:none">סה"כ תוצאות: <span></span></div>'
        html += '<table id="PopUpWindowTable_' + Data.ElementIdCard4 + '" style="text-align:center;width:95%;font-size:medium;background-color:white"></table>'
        html += '</div></div></div>'

        $('body').append(html)


        $("#" + Data.ElementIdCard4).focus(function () {
            if ($("#" + Data.ElementIdCard1).val() == "") {
                $("#" + Data.ElementIdCard1).focus()
            } else if ($("#" + Data.ElementIdCard2).val() == "") {
                Card2Focus()
            } else if ($("#" + Data.ElementIdCard3).val() == "") {
                Card3Focus()
            } else {
                $("#PopUpWindow_" + Data.ElementIdCard4).show()
                $("#" + Data.ElementIdCard4).blur()
                $('#PopUpWindowSearch_' + Data.ElementIdCard4).val('')
                if (Data.FocusCard4 == true) {
                    $('#PopUpWindowSearch_' + Data.ElementIdCard4).focus()
                }


                var ArrayDataParsCard4 = []
                for (i = 0; i < Data.ArrayData.length; i++) {
                    if (Data.DeleteDuplicatesCard4 == true) {
                        if (Data.ArrayData[i].Card1 == $("#" + Data.ElementIdCard1).val() && Data.ArrayData[i].Card2 == $("#" + Data.ElementIdCard2).val() && Data.ArrayData[i].Card3 == $("#" + Data.ElementIdCard3).val() && ArrayDataParsCard4.indexOf(Data.ArrayData[i].Card4) == -1) {
                            ArrayDataParsCard4.push(Data.ArrayData[i].Card4)
                        }
                    } else {
                        if (Data.ArrayData[i].Card1 == $("#" + Data.ElementIdCard1).val() && Data.ArrayData[i].Card2 == $("#" + Data.ElementIdCard2).val() && Data.ArrayData[i].Card3 == $("#" + Data.ElementIdCard3).val()) {
                            ArrayDataParsCard4.push(Data.ArrayData[i].Card4)
                        }
                    }
                }

                if (Data.SortCard4 == true) {
                    ArrayDataParsCard4.sort(function (a, b) {
                        if (a < b) return -1;
                        if (a > b) return 1;
                        return 0;
                    })
                }



                $('#PopUpWindowSearch_' + Data.ElementIdCard4).on('input', function () {
                    PopUpWindowSearchCard4()
                })

                if (Data.SearchCard4 == true) {
                    $('#PopUpWindowSearch_' + Data.ElementIdCard4).show()
                    $('#CardFixedCount_' + Data.ElementIdCard4).show()
                }


                function PopUpWindowSearchCard4() {
                    $('#PopUpWindowTable_' + Data.ElementIdCard4).html('')
                    var KeyWord = $('#PopUpWindowSearch_' + Data.ElementIdCard4).val().split(' ')
                    var Counter = 0
                    for (var i = 0; i < ArrayDataParsCard4.length; i++) {
                        var Exist = true
                        for (var j = 0; j < KeyWord.length; j++) {
                            if (ArrayDataParsCard4[i].indexOf(KeyWord[j]) < 0) { Exist = false }
                        }
                        if (ArrayDataParsCard4[i] == $('#PopUpWindowSearch_' + Data.ElementIdCard4).val()) { Exist = true }
                        if (Exist == true) {
                            Counter += 1
                            $('#PopUpWindowTable_' + Data.ElementIdCard4).append('<tr><td id="PopUpWindowBt_' + Data.ElementIdCard4 + i + '" style="user-select: none;cursor:pointer;font-weight:bold;width:80%;text-align:right"><div style="text-align:center;font-size: 20px;color: #2B3A63;">' + ArrayDataParsCard4[i] + '</div></td></tr>');
                            (function (i) {
                                $('#PopUpWindowBt_' + Data.ElementIdCard4 + i).click(function () {
                                    $("#" + Data.ElementIdCard4).val(ArrayDataParsCard4[i])
                                    $("#PopUpWindow_" + Data.ElementIdCard4).hide()
                                    setTimeout(function () { ScrollUp($('#' + Data.ElementIdCard4)) }, 100);
                                });
                            })(i);
                        };
                    }
                    $('#CardFixedCount_' + Data.ElementIdCard4 + ' span').html(Counter)
                }

                PopUpWindowSearchCard4()
            }
        });
    }
}

