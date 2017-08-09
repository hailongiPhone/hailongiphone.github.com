---
    layout: null
---

/**
 * 页面ready方法
 */
$(document).ready(function() {
    // generateContent();
    // share();
    // disqus();
    // $('#toc').toc();
    // alert("I am an alert box!!");

    // Floating-Fixed table of contents
    // $('.toc-wrapper').pushpin({
    //        top: 0,
    //       //  bottom: 1000,
    // });

    $('#toc').toc();

});

/**
 * 侧边目录
 */
// function generateContent() {
//     var $mt = $('.toc');
//     var toc = $(".post ul#markdown-toc").clone().get(0);
//     $mt.each(function(i,o){
//         $(o).html(toc);
//     });
// }

function share(){
    window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"1","bdSize":"24"},"share":{}};
    with(document)0[getElementsByTagName("script")[0].parentNode.appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
}


function disqus(){
    /* * * CONFIGURATION VARIABLES * * */
    var disqus_shortname = '{{site.disqus_shortname}}';

    var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
    dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
    document.getElementsByTagName("script")[0].parentNode.appendChild(dsq);
}

//构造函数
(function($){
    // $function(){


      var window_width = $(window).width();
     // Floating-Fixed table of contents
     setTimeout(function() {
       var tocWrapperHeight = 260; // Max height of ads.
       var tocHeight = $('.toc-wrapper .table-of-contents').height ? $('.toc-wrapper .table-of-contents').height() : 0;
       var footerOffset = $('body > footer').first().height ? $('body > footer').first().offset().top : 0;
       var bottomOffset = footerOffset - tocHeight - tocWrapperHeight;

       if ($('nav').height) {
         $('.toc-wrapper').pushpin({
           top: $('nav').height(),
           bottom: bottomOffset
         });
       }else {
         $('.toc-wrapper').pushpin({
           top: 0,
           bottom: bottomOffset
         });
       }
     }, 100);
    // }

    // Plugin initialization
    // $('.scrollspy').scrollSpy();
})(jQuery);
