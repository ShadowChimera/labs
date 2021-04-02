$(document).ready(function() {
    function animateBlock() {
        let $block = $(".animated-block");
        $block.animate({
            opacity: "0"
        }, 0)
        .animate({
            "margin-left": `${$block.position().left + 50}px`,
            opacity: "100%"
        }, 0)
        .animate({
            width: `${$block.width() * 2}px`,
            height: `${$block.height() * 2}px`
        }, 1000)
        .animate({
            "margin-top": `${$block.position().top + 100}px`
        }, 500)
        .animate({
            backgroundColor: "#112233"
        }, 1000)
        .animate({
            opacity: "0"
        }, 500);
    }

    $("button").on("click", animateBlock);
});