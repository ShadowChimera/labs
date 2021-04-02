$(document).ready(function() {
    function animateBlock() {
        let $block = $(".animated-block");
        $block.animate({
            opacity: 0
        }, 0)
        .animate({
            marginLeft: "+=50px",
            opacity: 1
        }, 0)
        .animate({
            width: `${$block.width() * 2}px`,
            height: `${$block.height() * 2}px`
        }, 1000)
        .animate({
            marginTop: "+=100px"
        }, 700)
        .animate({
            backgroundColor: "red"
        }, 1000)
        .animate({
            opacity: "0"
        }, 700);
    }

    $("button").on("click", animateBlock);
});