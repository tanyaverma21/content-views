jQuery(document).ready((function(){jQuery(".collapsible-content").hide(),jQuery(".collapsible-header").on("click",(function(){jQuery(this).parent().siblings(".post-item").find(".collapsible-content").slideUp(),jQuery(this).parent().siblings(".post-item").find(".collapsible-header").removeClass("active"),jQuery(this).next(".collapsible-content").slideToggle(),jQuery(this).toggleClass("active")})),jQuery(".post-thumbnail img").on("click",(function(){const e=jQuery(this).parent().attr("data-post_id");jQuery(`#popup-${e}`).show()})),jQuery(".close-button").on("click",(function(){const e=jQuery(this).attr("id");jQuery(`#popup-${e}`).hide()})),jQuery("body").on("click",".single-line-scroll .slick-next",(function(){jQuery(".details-popup").css("margin-left","400px")})),jQuery("body").on("click",".single-line-scroll .slick-prev",(function(){jQuery(".details-popup").css("margin-left","unset")})),jQuery(".wp-block-content-views-layouts-view.view-block.single-line-scroll").slick({infinite:!1,slidesToShow:3,slidesToScroll:1,arrows:!0,responsive:[{breakpoint:1024,settings:{slidesToShow:3,slidesToScroll:1}},{breakpoint:600,settings:{slidesToShow:2,slidesToScroll:1}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1}}]}),jQuery(".wp-block-content-views-layouts-view.view-block.double-line-scroll").slick({infinite:!1,slidesToShow:2,slidesToScroll:1,arrows:!0,responsive:[{breakpoint:1024,settings:{slidesToShow:2,slidesToScroll:1}},{breakpoint:600,settings:{slidesToShow:2,slidesToScroll:1}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1}}]})}));