<?php
/**
 * Plugin Name:     Content Layouts
 * Plugin URI:      https://github.com/tanyaverma21/content-views/
 * Description:     Content Layouts showcase different types of content types available in the system in different kinds of layouts.
 * Author:          Tanya Chopra
 * Author URI:      https://profiles.wordpress.org/tanyaverma
 * Text Domain:     content-views
 * Domain Path:     /languages
 * Version:         1.1.3
 *
 * @package content-views
 * @license http://www.gnu.org/licenses/gpl-3.0.html GNU General Public License, version 3 or higher
 * License:         GPLv3
 */

namespace Content_Views;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

// Constants.
define( 'CONTENT_VIEWS_VERSION', '1.1.3' );
define( 'CONTENT_VIEWS_URL', plugin_dir_url( __FILE__ ) );
define( 'CONTENT_VIEWS_DIR', plugin_dir_path( __FILE__ ) );
define( 'CONTENT_VIEWS_BASEPATH', plugin_basename( __FILE__ ) );
define( 'CONTENT_VIEWS_PLACEHOLDER_IMG', CONTENT_VIEWS_URL . 'assets/src/images/placeholder.png' );
define( 'CONTENT_VIEWS_PLACEHOLDER_THUMB_IMG', CONTENT_VIEWS_URL . 'assets/src/images/placeholder-150x150.png' );

// Plugin path.
if ( ! defined( 'CONTENT_VIEWS_PATH' ) ) {
	define( 'CONTENT_VIEWS_PATH', __DIR__ );
}

// Load the autoloader.
require_once CONTENT_VIEWS_DIR . '/includes/autoloader.php';


/**
 * Begins execution of the plugin.
 *
 * @since  1.0.0
 * @return void
 */
function content_views_initialize(): void {
	new \Content_Views\Includes\Content_Views();
}//end content_views_initialize()


content_views_initialize();
