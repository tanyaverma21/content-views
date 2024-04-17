<?php
/**
 * Dynamic Blocks.
 *
 * @package howmet
 */

namespace Content_Views\Includes;

/**
 * Class Blocks
 */
class Blocks {

    /**
     * @var $this->block_content_views_layouts.
     */
    protected $block_content_views_layouts;

	/**
	 * Construct method.
	 */
	protected function __construct() {
		$this->cv_setup_hooks();
	}

	/**
	 * To register action/filter.
	 *
	 * @return void
	 * @since 1.0.0
	 */
	protected function cv_setup_hooks() {
		/**
		 * Load blocks classes.
		 */
		$this->block_content_views_layouts = Blocks\Block_Content_Views_Layouts::get_instance();
		add_action( 'init', array( $this, 'cv_register_blocks' ) );
		add_filter( 'block_categories_all', array( $this, 'cv_register_block_category' ) );
	}

	/**
	 * Register blocks.
	 *
	 * @return void
	 * @since 1.0.0
	 */
	public function cv_register_blocks() {
		register_block_type(
			CV_PATH . '/assets/build/js/blocks/content-views-layouts',
			array(
				'render_callback' => array($this->block_content_views_layouts, 'render_callback'),
			)
		);
	}

    /**
	 * Creates instance of the class.
	 *
	 * @return WP_Object $instance.
	 * @since 1.0.0
	 */
	public static function get_instance() {
        $instance = new Blocks();
        return $instance;
    }

	/**
	 * Register Custom Block Category
	 *
	 * @param string $categories return categories array.
	 *
	 * @return string
	 * @since 1.0.0
	 */
	public function cv_register_block_category( $categories ) {
		return array_merge(
			array(
				array(
					'slug'  => 'cv-layouts',
					'title' => __( 'Content Views', 'content-views' ),
					'icon'  => 'screenoptions',
				),
			),
			$categories
		);
	}
}
