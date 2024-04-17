<?php
/**
 * Plugin Name:     Content Views 
 * Plugin URI:      https://www.multidots.com
 * Description:     Content Views showcase different types of content types available in the system in different kinds of layouts.
 * Author:          Multidots
 * Author URI:      https://www.multidots.com
 * Text Domain:     content-views
 * Domain Path:     /languages
 * Version:         1.0.0
 *
 * @package         Content_Views
 */

namespace Content_Views;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

define( 'CV_VERSION', '1.0.0' );
define( 'CV_URL', plugin_dir_url( __FILE__ ) );
define( 'CV_DIR', plugin_dir_path( __FILE__ ) );
define( 'CV_BASEPATH', plugin_basename( __FILE__ ) );
define( 'CV_PLACEHOLDER_IMG', CV_URL . 'assets/src/images/placeholder.png' );
define( 'CV_PLACEHOLDER_THUMB_IMG', CV_URL . 'assets/src/images/placeholder-150x150.png' );

if ( ! defined( 'CV_PATH' ) ) {
	define( 'CV_PATH', __DIR__ );
}

// Load the autoloader.
require_once CV_DIR . '/includes/autoloader.php';

/**
 * Begins execution of the plugin.
 *
 * @since    1.0.0
 */
function initialize() {
	new \Content_Views\Includes\Content_Views();
}
initialize();
