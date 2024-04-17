<?php
/**
 * The core plugin class.
 *
 * @since      1.0.0
 * @package    AW_Products
 * @subpackage AW_Products/includes
 * @author     Multidots <info@multidots.com>
 */

namespace Content_Views\Includes;

/**
 * Main class File.
 */
class Content_Views {

	/**
	 * The unique identifier of this plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $plugin_name    The string used to uniquely identify this plugin.
	 */
	protected $plugin_name;

	/**
	 * The current version of the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $version    The current version of the plugin.
	 */
	protected $version;

	/**
	 * Define the core functionality of the plugin.
	 *
	 * @since    1.0.0
	 */
	public function __construct() {
        $this->cv_setup_hooks();
	}

    /**
	 * Function is used to setup local hooks.
	 */
	public function cv_setup_hooks() {
        if ( defined( 'CV_VERSION' ) ) {
			$this->version = CV_VERSION;
		} else {
			$this->version = '1.0.0';
		}
		$this->plugin_name = 'content-views';

		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_admin_scripts' ) );
		add_action( 'plugins_loaded', array( $this, 'cv_set_locale' ) );
		/**
		 * The 'enqueue_block_assets' hook includes styles and scripts both in editor and frontend,
		 * except when is_admin() is used to include them conditionally
		 */
		add_action( 'enqueue_block_assets', array( $this, 'enqueue_editor_assets' ) );
		Blocks::get_instance();
	}

	/**
	 * Creates instance of the class.
	 *
	 * @return WP_Object $instance.
	 * @since 1.0.0
	 */
	public static function get_instance() {
        $instance = new Content_Views();
        return $instance;
    }

    /**
	 * Define the locale for this plugin for internationalization.
	 *
	 * Uses the AW_Products_i18n class in order to set the domain and to register the hook
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	public function cv_set_locale() {
		$locale = apply_filters( 'plugin_locale', get_locale(), 'content-views' );
		load_textdomain( 'content-views', CV_DIR . '/languages/' . $locale . '.mo' );
		load_plugin_textdomain(
			'content-views',
			false,
			dirname( dirname( CV_BASEPATH ) ) . '/languages/'
		);
	}

	/**
	 * Move render blocking JS to the footer.
	 *
	 * @return void
	 * @since 1.0.0
	 */
	public function enqueue_scripts() {
		wp_enqueue_script( 'jquery', '/wp-includes/js/jquery/jquery.min.js', array(), CV_VERSION, true );
	}

	/**
	 * Enqueue admin js.
	 *
	 * @return void
	 * @since 1.0.0
	 */
	public function enqueue_admin_scripts() {
		wp_enqueue_script( 'cv-admin-js', CV_URL.'assets/src/js/admin.js', array('jquery'), CV_VERSION, true );
	}

	/**
	 * Enqueue editor scripts and styles.
	 *
	 * @return void
	 * @since 1.0.0
	 */
	public function enqueue_editor_assets() {
		if ( is_admin() || has_block( 'content-views/content-views-layouts' ) ) {
			wp_enqueue_script(
				'cv-slick-js',
				CV_URL . 'assets/src/js/slick.min.js',
				array( 'jquery' ),
				filemtime( CV_PATH . '/assets/src/js/slick.min.js' ),
				true
			);
			wp_enqueue_style(
				'cv-slick-css',
				CV_URL . 'assets/src/css/slick.min.css',
				array(),
				filemtime( CV_PATH . '/assets/src/css/slick.min.css' ),
				'all'
			);
		}

		// Change block Priority to head.
		$blocks = \WP_Block_Type_Registry::get_instance()->get_all_registered();
		foreach ( $blocks as $block ) {
			if ( has_block( $block->name ) ) {
				wp_enqueue_style( $block->style );
			}
		}
	}

}
