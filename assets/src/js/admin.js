jQuery(document).ready(function() {
    setTimeout( function() {
        jQuery( '.collapsible-content' ).hide();
        jQuery( '.collapsible-header' ).on( 'click', function () {
            jQuery( this )
                .parent()
                .siblings( '.post-item' )
                .find( '.collapsible-content' )
                .slideUp();
            jQuery( this )
                .parent()
                .siblings( '.post-item' )
                .find( '.collapsible-header' )
                .removeClass( 'active' );
            jQuery( this ).next( '.collapsible-content' ).slideToggle();
            jQuery( this ).toggleClass( 'active' );
        } );

        /**
         * Slick slider for posts block.
         */
        jQuery( '.wp-block-content-views-layouts-view.view-block.single-line-scroll' ).slick(
            {
                infinite: false,
                slidesToShow: 3,
                slidesToScroll: 1,
                arrows: true,
                responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
                ]
            }
        );

        /**
         * Slick slider for posts block.
         */
        jQuery( '.wp-block-content-views-layouts-view.view-block.double-line-scroll' ).slick(
            {
                infinite: false,
                slidesToShow: 2,
                slidesToScroll: 1,
                arrows: true,
                responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
                ]
            }
        );
    }, 500);
});
