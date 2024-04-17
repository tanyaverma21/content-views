/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, RangeControl, SelectControl } from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';

/**
 * React hook that is used to mark the packages element.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/
 */
import { useEffect, useState } from '@wordpress/element';

import './editor.scss';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps } from '@wordpress/block-editor';

import PostSelector from './components/post-selector';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param root0
 * @param root0.attributes
 * @param root0.attributes.heading
 * @param root0.setAttributes
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes, clientId }) {
	const {
		postType,
        postView,
        postCount,
        postLayout,
        orderBy,
        order,
        displayDate,
        displayAuthor,
        displayTaxonomies,
        pagination
	} = attributes;

    let {selectedPosts} = attributes;

	const [postOptions, setPostOptions] = useState([]);
    const [editingFlag, setEditingFlag] = useState(false);
    const [sliderObject, setSliderObject] = useState({});
    const [posts, setPosts] = useState([]);

    const startEditingMode = () => {
        if (false === editingFlag) {
            loadPosts(postType);
            setEditingFlag(true);
            jQuery('#content-type-selector').attr('disabled', true);
        }

        if (true === editingFlag) {
            setEditingFlag(false);
            jQuery('#content-type-selector').attr('disabled', false);
        }
	};

    const stopEditingMode = () => {
        if (true === editingFlag) {
            setEditingFlag(false);
            jQuery('#content-type-selector').attr('disabled', false);
        }
	};

    /**
     * Loads post types for the post type options selector.
     */
    const loadPostTypes = () => {
        let postTypes = [];
        let excludePostTypes = [
            "attachment",
            "nav_menu_item", 
            "wp_block",
            "wp_template",
            "wp_template_part",
            "wp_navigation"
        ];

        wp.apiFetch({ path: `/wp/v2/types` }).then(
			(types) => {
				Object.values(types).forEach(function(el) {
                    if (!excludePostTypes.includes(el.slug)) {
                        postTypes.push({
                            label: el.name,
                            value: el.slug,
                        });					
                        setPostOptions(postTypes);
                    }
                })	
			}
		);
    };

    /**
     * Loads posts for the post selector.
     */
    const loadPosts = (type) => {
        let base = type === 'post' ? 'posts' : 'page' ? 'pages' : type;
        let url = `/wp/v2/${base}?orderby=${orderBy}&order=${order}&_embed=1`;
        if (selectedPosts?.length > 0) {
            let ids = [];
            selectedPosts.map(el=>{ ids.push(el.id)});
            url = `${url}&exclude=${ids.join()}`;
        }

        if (postType === 'all') {
            url = `${url}&per_page=${postCount}`;
        }

        wp.apiFetch({ path: url}).then(
			(postsArr) => {		
                setPosts(postsArr);
			}
		);
    };

    /**
     * useEffect method.
     */
    useEffect(() => {
		loadPostTypes();
        if ('single-line-scroll' === postLayout || 'double-line-scroll' === postLayout) {
            if ( 0 === Object.keys(sliderObject).length ) {
                setTimeout(() => initSlider(), 1000);
            }
        }
	}, []);

    useEffect(() => {
        if ('single-line-scroll' === postLayout || 'double-line-scroll' === postLayout) {
            if ( sliderObject && 0 === Object.keys(sliderObject).length ) {
                initSlider();
            } else {
                reloadSlider();
            }
        }

        if ('collapsible' === postLayout) {
            setTimeout(function() {
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
            }, 1000)
        }
    }, [postLayout]);

    function initSlider() {
        let sliderObj;
        if (postLayout === 'single-line-scroll') {
            /**
             * Slick slider for single-line scrollable posts block.
             */
            sliderObj = jQuery( '.wp-block-content-views-layouts-view.view-block.single-line-scroll' ).slick(
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
        } else if (postLayout === 'double-line-scroll') {
            /**
             * Slick slider for double-line scrollable posts block.
             */
            sliderObj = jQuery( '.wp-block-content-views-layouts-view.view-block.double-line-scroll' ).slick(
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
        }
		
		setSliderObject(sliderObj);
    }

	function reloadSlider () {	
        sliderObject.slick("unslick");
		setTimeout(() => {
			initSlider();
		}, 1000);		
	}

	const blockProps = useBlockProps();

	return (
		<div {...blockProps}>
            <InspectorControls>
                <PanelBody
                    title={ __( 'Content Settings', 'content-views' ) }
                >
                    <SelectControl
                        label={__( 'Content Type', 'content-views' )}
                        value={ postType }
                        onChange={ (type) => {
                            setAttributes({ postType: type, selectedPosts: [] });
                            if (editingFlag) {
                                loadPosts(type);
                            }
                        }}
                        options={ postOptions }
                    />
                    <SelectControl
                        label={__( 'Content Layout', 'content-views' )}
                        value={ postLayout }
                        onChange={ (type) => {
                            setAttributes({ postLayout: type });
                        }}
                        options={ [
                            { label: __('Tiles', 'content-views'), value: 'tiles' },
                            { label: __('Grid', 'content-views'), value: 'grid' },
                            { label: __('Single Row Scrollable', 'content-views'), value: 'single-line-scroll' },
                            { label: __('Double Row Scrollable', 'content-views'), value: 'double-line-scroll' },
                            { label: __('1-4 Posts Vertical Layout', 'content-views'), value: 'vertical' },
                            { label: __('1-4 Posts Horizontal Layout', 'content-views'), value: 'horizontal' },
                            { label: __('Collapsible', 'content-views'), value: 'collapsible' },
                        ] }
                    />
                    {('tiles' === postLayout || 'grid' === postLayout) && (<SelectControl
                        label={__( 'Content Pagination', 'content-views' )}
                        value={ pagination }
                        onChange={ (type) => setAttributes({ pagination: type })}
                        options={ [
                            { label: __('1,2,..n', 'content-views'), value: 'numbers' },
                            { label: __('<<Prev Next>>', 'content-views'), value: 'prevnext' },
                            { label: __('Infinite Scroll', 'content-views'), value: 'infinite-scroll' },
                        ] }
                    />)}
                    <SelectControl
                        label={__( 'Content View', 'content-views' )}
                        id="content-type-selector"
                        value={ postView }
                        onChange={ (type) => setAttributes({ postView: type })}
                        options={ [
                            { label: __('Selected Posts', 'content-views'), value: 'selected' },
                            { label: __('All Posts', 'content-views'), value: 'all' },
                        ] }
                    />
                </PanelBody>
                <PanelBody
                    title={ __( 'Data Settings', 'content-views' ) }
                >
                    {postView === 'all' && (<RangeControl
                        label={__( 'Number of Posts to display', 'content-views' )}
                        value={ postCount }
                        onChange={ ( value ) => setAttributes({ postCount: parseInt( value ) }) }
                        min={4}
                        max={99}
                        step={1}
                    />)}
                    <SelectControl
                        label={__( 'Order By', 'content-views' )}
                        value={ orderBy }
                        onChange={ (type) => setAttributes({ orderBy: type })}
                        options={ [
                            { label: __('Published Date', 'content-views'), value: 'date' },
                            { label: __('Post Title', 'content-views'), value: 'title' },
                            { label: __('Selected Posts Order', 'content-views'), value: 'include' },
                        ] }
                    />
                    <SelectControl
                        label={__( 'Order', 'content-views' )}
                        value={ order }
                        onChange={ (type) => setAttributes({ order: type })}
                        options={ [
                            { label: __('ASC', 'content-views'), value: 'asc' },
                            { label: __('DESC', 'content-views'), value: 'desc' },
                        ] }
                    />
                </PanelBody>
                <PanelBody
                    title={ __( 'Display Settings', 'content-views' ) }
                >
                    <ToggleControl
                        label={__('Display Date', 'content-views')}
                        checked={displayDate}
                        onChange={ (value) => setAttributes({ displayDate: value })}
                    />
                    <ToggleControl
                        label={__('Display Author', 'content-views')}
                        checked={displayAuthor}
                        onChange={ (value) => setAttributes({ displayAuthor: value })}
                    />
                    <ToggleControl
                        label={__('Display Taxonomies', 'content-views')}
                        checked={displayTaxonomies}
                        onChange={ (value) => setAttributes({ displayTaxonomies: value })}
                    />
                </PanelBody>
            </InspectorControls>
            <div className='wp-block-content-views-layouts'>
                <div className="swap-buttons-wrapper">
                    {postView === 'selected' && (
                        <>
                            <button
                                className="start-editing-btn is-primary components-button is-button is-default is-large"
                                onClick={startEditingMode}
                            >
                                {false === editingFlag ? __("Select Posts", "howmet") : __("Save", "howmet")}
                            </button>
                            {editingFlag && (<button
                                className="start-editing-btn is-primary components-button cancel is-button is-default is-large"
                                onClick={stopEditingMode}
                            >
                                 {__("Cancel", "howmet")}
                            </button>)}
                            {editingFlag && (posts?.length > 0 || selectedPosts?.length > 0) && (
                                <PostSelector posts={posts} selectedPosts={selectedPosts} setAttributes={setAttributes} setPosts={setPosts} attributes={attributes} />
                            )}
                            {!editingFlag && selectedPosts && (
                                <ServerSideRender
                                    block="content-views/content-views-layouts"
                                    httpMethod="POST"
                                    attributes={{
                                        postType: postType,
                                        postView: postView,
                                        selectedPosts: selectedPosts,
                                        postCount: postCount,
                                        postLayout: postLayout,
                                        displayDate: displayDate,
                                        displayAuthor: displayAuthor,
                                        displayTaxonomies: displayTaxonomies,
                                        pagination: pagination
                                    }}
                                />
                            )}
                        </>
                    )}
                    {postView === 'all' && !editingFlag && (
                        <ServerSideRender
                            block="content-views/content-views-layouts"
                            httpMethod="POST"
                            attributes={{
                                postType: postType,
                                postView: postView,
                                postCount: postCount,
                                postLayout: postLayout,
                                orderBy: orderBy,
                                order: order,
                                displayDate: displayDate,
                                displayAuthor: displayAuthor,
                                displayTaxonomies: displayTaxonomies,
                                pagination: pagination
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
	);
}
