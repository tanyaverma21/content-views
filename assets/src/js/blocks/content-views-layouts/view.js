jQuery(document).ready(function() {
    /**
     * Event handler for collapsible layout in content layout block.
     */
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
     * Event handler for click event on post thumbnail.
     */
    jQuery( '.post-thumbnail img' ).on( 'click', function () {
        const postId = jQuery(this).parent().attr('data-post_id');
        jQuery(`#popup-${postId}`).show();
    } );

    /**
     * Event handler for click event on post thumbnail.
     */
    jQuery( '.close-button' ).on( 'click', function () {
        const postId = jQuery(this).attr('id');
        jQuery(`#popup-${postId}`).hide();
    } );

    /**
     * Event handler for click event on slick next button.
     */
    jQuery("body").on('click', '.single-line-scroll .slick-next', function () {
        jQuery('.details-popup').css("margin-left", "400px");
    } );

    /**
     * Event handler for click event on slick previous button.
     */
    jQuery("body").on('click', '.single-line-scroll .slick-prev', function () {
        jQuery('.details-popup').css("margin-left", "unset");
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
});
