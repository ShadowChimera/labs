$(document).ready(function() {
    $(".changeable-paragraphs > p").click(function(){
        let mark = $(this).attr("class") ?? "";
        if(mark.includes("normal-mark") || !mark.length) {
            $(this).removeClass("normal-mark");
            $(this).addClass("weight-mark");
        }
        else if(mark.includes("weight-mark")) {
            $(this).removeClass("weight-mark");
            $(this).addClass("italic-mark");
        }
        else if(mark.includes("italic-mark")) {
            $(this).removeClass("italic-mark");
            $(this).addClass("underline-mark");
        }
        else if(mark.includes("underline-mark")) {
            $(this).removeClass("underline-mark");
            $(this).addClass("line-through-mark");
        }
        else {
            $(this).removeClass("line-through-mark");
            $(this).addClass("normal-mark");
        }
    });

    $(".animation > .block").click(function() {
        $(this).animate({right: "0px"}, 2000)
                .animate({width: "300px", height: "150px"}, 1000)
                .animate({left: "0px", top: "50%"}, 2000);
    });

    $("#order-form > input[type=checkbox]").click(function() {
        if($(this).is(":checked")) {
            $radio = $("#order-form > input[type=radio]:first");
            $radio.attr("disabled", true);
            $radio.prop("checked", false);
            $radio =  $("#order-form > input[type=radio]:last");
            $radio.attr("disabled", true);
            $radio.prop("checked", false);
        }
        else {
            $("#order-form > input[type=radio]:first").attr("disabled", false);
            $("#order-form > input[type=radio]:last").attr("disabled", false);
        }
    });
});