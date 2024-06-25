//ADD BANK LIST BT

function AddBankList(PlaceId) {
    $('body').append(

'<div id="BankPickerDiv" class="modal" onclick ="$(this).hide()" style="display:none;" >\
        <div class="modal-content" style="width:400px;max-width: 90%;">\
            <div class="ClosingBt" onclick="$(this).parent().parent().hide()">X</div>\
            <div style="font-family: inherit; text-align: center; font-weight: bold; padding-top: 10px; font-size: 26px;margin-bottom:20px">רשימת בנקים</div>\
            <input type="button" style="width:80%;text-align:right" class="BigBt" dir="rtl" value="בנק אגוד - 13" onclick="$(\'#Bank\').val(\'13\'); $(\'#BankPickerDiv\').hide()" /><br />\
            <input type="button" style="width:80%;text-align:right" class="BigBt" dir="rtl" value="בנק אוצר החייל - 14" onclick="$(\'#Bank\').val(\'14\'); $(\'#BankPickerDiv\').hide()" /><br />\
            <input type="button" style="width:80%;text-align:right" class="BigBt" dir="rtl" value="בנק דיסקונט - 11" onclick="$(\'#Bank\').val(\'11\'); $(\'#BankPickerDiv\').hide()" /><br />\
            <input type="button" style="width:80%;text-align:right" class="BigBt" dir="rtl" value="בנק הדואר - 09" onclick="$(\'#Bank\').val(\'09\'); $(\'#MasavAgency\').val(\'001\'); $(\'#BankPickerDiv\').hide()" /><br />\
            <input type="button" style="width:80%;text-align:right" class="BigBt" dir="rtl" value="בנק הפועלים - 12" onclick="$(\'#Bank\').val(\'12\'); $(\'#BankPickerDiv\').hide()" /><br />\
            <input type="button" style="width:80%;text-align:right" class="BigBt" dir="rtl" value="בנק יהב - 04" onclick="$(\'#Bank\').val(\'04\'); $(\'#BankPickerDiv\').hide()" /><br />\
            <input type="button" style="width:80%;text-align:right" class="BigBt" dir="rtl" value="בנק ירושלים - 54" onclick="$(\'#Bank\').val(\'54\'); $(\'#BankPickerDiv\').hide()" /><br />\
            <input type="button" style="width:80%;text-align:right" class="BigBt" dir="rtl" value="בנק לאומי - 10" onclick="$(\'#Bank\').val(\'10\'); $(\'#BankPickerDiv\').hide()" /><br />\
            <input type="button" style="width:80%;text-align:right" class="BigBt" dir="rtl" value="בנק מזרחי טפחות - 20" onclick="$(\'#Bank\').val(\'20\'); $(\'#BankPickerDiv\').hide()" /><br />\
            <input type="button" style="width:80%;text-align:right" class="BigBt" dir="rtl" value="בנק מסד - 46" onclick="$(\'#Bank\').val(\'46\'); $(\'#BankPickerDiv\').hide()" /><br />\
            <input type="button" style="width:80%;text-align:right" class="BigBt" dir="rtl" value="בנק מרכנתיל דיסקונט - 17" onclick="$(\'#Bank\').val(\'17\'); $(\'#BankPickerDiv\').hide()" /><br />\
            <input type="button" style="width:80%;text-align:right" class="BigBt" dir="rtl" value="בנק פאג&quot;י (פועלי אגודת ישראל) - 52" onclick="$(\'#Bank\').val(\'52\'); $(\'#BankPickerDiv\').hide()" /><br />\
            <input type="button" style="width:80%;text-align:right" class="BigBt" dir="rtl" value="בנק הבנלאומי - 31" onclick="$(\'#Bank\').val(\'31\'); $(\'#BankPickerDiv\').hide()" /><br />\
        </div >\
</div > \
<style>\
    .ClosingBt {\
    -webkit-user-select:none;\
    float:right;\
    width:40px;\
    line-height: 40px;\
    text-align: center;\
    border-radius: 10px;\
    background-color: salmon;\
    color: white;\
    font-size: large;\
    font-weight: bold;\
    cursor: pointer;\
    margin: -10px;\
    position: absolute;\
}\
.BigBt {\
    border: 1px solid lightgray;\
    background-color:white;\
    font-weight:bold;\
    border-radius:3px;\
    padding:7px;\
    color:cadetblue;\
    cursor:pointer;\
    user-select:none !important;\
    -webkit-user-select:none !important;\
    margin:3px;\
    font-size:17px;\
}\
</style >'



    )


    Place = 'BankDiv'
    //console.log(PlaceId)
    if (PlaceId !== undefined) { Place = PlaceId}
        $('#' + Place).append(
            '<div id="SpanBankList" ><span style="display: inline-block;padding: 2px 10px;background-color: aliceblue;border-radius: 5px;font-family: Assistant;margin-right: 5px;color: rgb(86,130,171);margin-top: 3px;border: 1px solid darkgrey;font-size: 15px;cursor: pointer;user-select: none;" onclick="$(\'#Bank\').blur();$(\'#BankPickerDiv\').show();">הצג רשימה</span></div>'
     )
}
