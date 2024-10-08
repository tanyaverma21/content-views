<?php
/**
 * The plugin main class.
 *
 * @since   1.0.0
 * @package content-views
 */

namespace Content_Views\Includes;

/**
 * Class Content_Views.
 */
class Content_Views {


	/**
	 * The unique identifier of this plugin.
	 *
	 * @since  1.0.0
	 * @access protected
	 * @var    string $plugin_name The string used to uniquely identify this plugin.
	 */
	protected $plugin_name;

	/**
	 * The current version of the plugin.
	 *
	 * @since  1.0.0
	 * @access protected
	 * @var    string $version The current version of the plugin.
	 */
	protected $version;

	/**
	 * Define the core functionality of the plugin.
	 *
	 * @since 1.0.0
	 */
	public function __construct() {
		// Setup initial hooks and actions.
		$this->content_views_setup_hooks();
	}

	/**
	 * Function is used to setup local hooks.
	 *
	 * @return void
	 */
	public function content_views_setup_hooks(): void {
		if ( defined( 'CONTENT_VIEWS_VERSION' ) ) {
			$this->version = CONTENT_VIEWS_VERSION;
		} else {
			$this->version = '1.1.3';
		}

		// Assigns plugin name to the member variable.
		$this->plugin_name = 'content-views';

		// Enqueue scripts.
		add_action( 'admin_enqueue_scripts', array( $this, 'content_views_enqueue_admin_scripts' ) );
		add_action( 'plugins_loaded', array( $this, 'content_views_set_locale' ) );

		/**
		 * The 'enqueue_block_assets' hook includes styles and scripts both in editor and frontend,
		 * except when is_admin() is used to include them conditionally
		 */
		add_action( 'enqueue_block_assets', array( $this, 'content_views_enqueue_editor_assets' ) );
		Blocks::content_views_get_instance();
	}

	/**
	 * Creates instance of the class.
	 *
	 * @return Content_Views.
	 * @since  1.0.0
	 */
	public static function content_views_get_instance(): Content_Views {
		$instance = new Content_Views();
		return $instance;
	}

	/**
	 * Define the locale for this plugin for internationalization.
	 *
	 * @since  1.0.0
	 * @access public
	 */
	public function content_views_set_locale(): void {
		$locale = apply_filters( 'plugin_locale', get_locale(), 'content-views' );
		load_textdomain( 'content-views', CONTENT_VIEWS_DIR . '/languages/' . $locale . '.mo' );
		load_plugin_textdomain(
			'content-views',
			false,
			dirname( dirname( CONTENT_VIEWS_BASEPATH ) ) . '/languages/'
		);
	}

	/**
	 * Enqueue admin script.
	 *
	 * @return void
	 * @since  1.0.0
	 */
	public function content_views_enqueue_admin_scripts(): void {
		wp_enqueue_script( 'content-views-admin-js', CONTENT_VIEWS_URL . 'assets/src/js/admin.js', array( 'jquery' ), CONTENT_VIEWS_VERSION, true );
	}

	/**
	 * Enqueue editor scripts and styles.
	 *
	 * @return void
	 * @since  1.0.0
	 */
	public function content_views_enqueue_editor_assets(): void {
		if ( is_admin() || has_block( 'content-views/content-views-layouts' ) ) {
			wp_enqueue_script(
				'content-views-slick-js',
				CONTENT_VIEWS_URL . 'assets/src/js/slick.min.js',
				array( 'jquery' ),
				filemtime( CONTENT_VIEWS_PATH . '/assets/src/js/slick.min.js' ),
				true
			);
			wp_enqueue_style(
				'content-views-slick-css',
				CONTENT_VIEWS_URL . 'assets/src/css/slick.min.css',
				array(),
				filemtime( CONTENT_VIEWS_PATH . '/assets/src/css/slick.min.css' ),
				'all'
			);
		}

		// Change block Priority to head.
		$blocks = \WP_Block_Type_Registry::get_instance()->get_all_registered();
		foreach ( $blocks as $block ) {
			if ( has_block( $block->name ) ) {
				// Enqueue block styles.
				wp_enqueue_style( $block->style );
			}
		}
	}
}
