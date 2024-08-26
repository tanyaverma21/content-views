<?php
/**
 * Autoloader file for plugin.
 *
 * @package content-views
 */

namespace Content_Views\Includes;

/**
 * Auto loader function.
 *
 * @param string $file_resource Source namespace.
 *
 * @return void
 */
function autoloader( string $file_resource = '' ): void {
	$resource_path  = false;
	$namespace_root = 'Content_Views\\';
	$file_resource  = trim( $file_resource, '\\' );

	// Return if resource is not present.
	if ( empty( $file_resource ) || strpos( $file_resource, '\\' ) === false || strpos( $file_resource, $namespace_root ) !== 0 ) {
		// Not our namespace, bail out.
		return;
	}

	// Remove our root namespace.
	$file_resource = str_replace( $namespace_root, '', $file_resource );
	$path          = explode(
		'\\',
		str_replace( '_', '-', strtolower( $file_resource ) )
	);

	/**
	 * Time to determine which type of resource path it is,
	 * so that we can deduce the correct file path for it.
	 */
	if ( empty( $path[0] ) || empty( $path[1] ) ) {
		return;
	}

	// Define directory and file_name as empty initially.
	$directory = '';
	$file_name = '';

	// Checks if path has includes directory.
	if ( 'includes' === $path[0] ) {
		switch ( $path[1] ) {
			case 'classes':
				$directory = 'classes';
				$file_name = sprintf( 'class-%s', trim( strtolower( $path[1] ) ) );
				break;

			default:
				if ( ! empty( $path[2] ) ) {
					$directory = sprintf( 'classes/%s', $path[1] );
					$file_name = sprintf( 'class-%s', trim( strtolower( $path[2] ) ) );
					break;
				} else {
					$directory = 'classes';
					$file_name = sprintf( 'class-%s', trim( strtolower( $path[1] ) ) );
					break;
				}
		}

		// Prepares resource path.
		$resource_path = sprintf( '%s/includes/%s/%s.php', untrailingslashit( CONTENT_VIEWS_DIR ), $directory, $file_name );
	}

	/**
	 * If $is_valid_file has 0 means valid path or 2 means the file path contains a Windows drive path.
	 */
	$is_valid_file = validate_file( $resource_path );
	if ( ! empty( $resource_path ) && file_exists( $resource_path ) && ( 0 === $is_valid_file || 2 === $is_valid_file ) ) {
		// We already making sure that file is exists and valid.
     require_once( $resource_path ); // phpcs:ignore
	}
}

// Registers the autoloader.
spl_autoload_register( '\Content_Views\Includes\autoloader' );
