 jQuery(document).ready(function ($) {
    var options = {
        $FillMode: 2,                                       
        $AutoPlay: true,
        $Idle: 4000,  
    };
    var jssor_slider1 = new $JssorSlider$("slider1_container", options);
    function ScaleSlider() {
        var bodyWidth = document.body.clientWidth;
        if (bodyWidth)
            jssor_slider1.$ScaleWidth(Math.min(bodyWidth, 1920));
        else
            window.setTimeout(ScaleSlider, 30);
    }
    ScaleSlider();

    $(window).bind("load", ScaleSlider);
    $(window).bind("resize", ScaleSlider);
    $(window).bind("orientationchange", ScaleSlider);
});



 $('.content_gallery').nrTab({
    tab:'.tab_gallery li',
    view:'.detail_gallery',
    action:'hover',
    href:'ref'
});