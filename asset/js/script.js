---
    layout: null
---

/**
 * 页面ready方法
 */
// $(document).ready(function() {
//     // alert("aaaaa")
//     console.log("你不乖哦，彼此之间留点神秘感不好吗？");
//     $(".button-collapse").sideNav();
//     backToTop();
// });

/**
 * 回到顶部
 */
// function backToTop() {
//     $("[data-toggle='tooltip']").tooltip();
//     var st = $(".page-scrollTop");
//     var $window = $(window);
//     var topOffset;
//     //滚页面才显示返回顶部
//     $window.scroll(function() {
//         var currnetTopOffset = $window.scrollTop();
//         if (currnetTopOffset > 0 && topOffset > currnetTopOffset) {
//             st.fadeIn(500);
//         } else {
//             st.fadeOut(500);
//         }
//         topOffset = currnetTopOffset;
//     });
//
//     //点击回到顶部
//     st.click(function() {
//         $("body").animate({
//             scrollTop: "0"
//         }, 500);
//     });
//
//
// }


// Init Materialize javascripts
(function($){
  $(function(){

    $('.button-collapse').sideNav();

    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scrollToTop').fadeIn();
        } else {
            $('.scrollToTop').fadeOut();
        }
    });

    //Click event to scroll to top
    $('.scrollToTop').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
        return false;
    });



  }); // end of document ready
})(jQuery); // end of jQuery name space
