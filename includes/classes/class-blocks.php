<?php
/**
 * Dynamic Blocks.
 *
 * @package content-views
 */

namespace Content_Views\Includes;

/**
 * Class Blocks.
 */
class Blocks {

	/**
	 * Block_Content_Views_Layouts Class instance.
	 *
	 * @var $block_content_views_layouts
	 */
	protected $block_content_views_layouts;

	/**
	 * Construct method.
	 */
	protected function __construct() {
		// Setup initial hooks and actions.
		$this->content_views_setup_hooks();
	}

	/**
	 * To register action/filter.
	 *
	 * @return void
	 * @since  1.0.0
	 */
	protected function content_views_setup_hooks(): void {
		/**
		 * Load blocks classes.
		 */
		$this->block_content_views_layouts = Blocks\Block_Content_Views_Layouts::content_views_get_instance();
		add_action( 'init', array( $this, 'content_views_register_blocks' ) );
		add_filter( 'block_categories_all', array( $this, 'content_views_register_block_category' ) );
	}

	/**
	 * Register blocks.
	 *
	 * @return void
	 * @since  1.0.0
	 */
	public function content_views_register_blocks(): void {
		register_block_type(
			CONTENT_VIEWS_PATH . '/assets/build/js/blocks/content-views-layouts',
			array(
				'render_callback' => array( $this->block_content_views_layouts, 'content_views_render_callback' ),
			)
		);
	}

	/**
	 * Creates instance of the class.
	 *
	 * @return Blocks.
	 * @since  1.0.0
	 */
	public static function content_views_get_instance(): Blocks {
		$instance = new Blocks();
		return $instance;
	}

	/**
	 * Register Custom Block Category.
	 *
	 * @param array $categories return categories array.
	 *
	 * @return array
	 * @since  1.0.0
	 */
	public function content_views_register_block_category( array $categories ): array {
		return array_merge(
			array(
				array(
					'slug'  => 'content-layouts',
					'title' => __( 'Content Layouts', 'content-views' ),
					'icon'  => 'screenoptions',
				),
			),
			$categories
		);
	}
}
