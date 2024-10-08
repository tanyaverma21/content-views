<?php
/**
 * Register Content Layouts block.
 *
 * @package content-views
 */

namespace Content_Views\Includes\Blocks;

use WP_Query;

/**
 * Class for register blocks.
 */
class Block_Content_Views_Layouts {


	/**
	 * Creates instance of the class.
	 *
	 * @return Block_Content_Views_Layouts
	 * @since  1.0.0
	 */
	public static function content_views_get_instance(): Block_Content_Views_Layouts {
		$instance = new Block_Content_Views_Layouts();
		return $instance;
	}

	/**
	 * Render Callback
	 *
	 * @param array $attributes block attributes.
	 *
	 * @return string $html
	 * @since  1.0.0
	 */
	public function content_views_render_callback( array $attributes ): string {
		// Get attributes.
		$post_type          = isset( $attributes['postType'] ) && ! empty( $attributes['postType'] ) ? $attributes['postType'] : 'post';
		$post_view          = isset( $attributes['postView'] ) && ! empty( $attributes['postView'] ) ? $attributes['postView'] : 'all';
		$post_count         = isset( $attributes['postCount'] ) && ! empty( $attributes['postCount'] ) ? $attributes['postCount'] : 20;
		$post_layout        = isset( $attributes['postLayout'] ) && ! empty( $attributes['postLayout'] ) ? $attributes['postLayout'] : 'grid';
		$orderby            = isset( $attributes['orderBy'] ) && ! empty( $attributes['orderBy'] ) ? $attributes['orderBy'] : 'date';
		$selected_posts     = isset( $attributes['selectedPosts'] ) && ! empty( $attributes['selectedPosts'] ) ? array_column( $attributes['selectedPosts'], 'id' ) : array();
		$order              = isset( $attributes['order'] ) && ! empty( $attributes['order'] ) ? $attributes['order'] : 'desc';
		$pagination         = isset( $attributes['pagination'] ) && ! empty( $attributes['pagination'] ) ? $attributes['pagination'] : 'numbers';
		$display_taxonomies = isset( $attributes['displayTaxonomies'] ) ? $attributes['displayTaxonomies'] : true;
		$display_date       = isset( $attributes['displayDate'] ) ? $attributes['displayDate'] : true;
		$display_author     = isset( $attributes['displayAuthor'] ) ? $attributes['displayAuthor'] : true;
		ob_start();
		?>
		<div class="wp-block-content-views-layouts-view view-block <?php echo esc_attr( $post_layout ); ?>">
			<?php
			// Query arguments for WP_Query.
			$query_args = array(
				'post_type'              => $post_type,
				'orderby'                => $orderby,
				'order'                  => $order,
				'post_status'            => 'publish',
				'update_post_term_cache' => false,
				'update_post_meta_cache' => false,
			);

			// Get posts by ids.
			if ( ! empty( $selected_posts ) && 'selected' === $post_view ) {
				$query_args['post__in'] = $selected_posts;
				$query_args['orderby']  = 'post__in';
			}

			// Sets number of posts to display.
			if ( ! empty( $post_count ) && 'all' === $post_view ) {
				$query_args['posts_per_page'] = ( 'vertical' === $post_layout || 'horizontal' === $post_layout ) ? 5 : $post_count;
			}

			// Sets paged arguments when layout is set to 'tiles' or 'grid'.
			if ( 'tiles' === $post_layout || 'grid' === $post_layout ) {
				$paged               = ( get_query_var( 'paged' ) ) ? get_query_var( 'paged' ) : 1;
				$query_args['paged'] = $paged;
			}

			// Process query.
			$post_query = new WP_Query( $query_args );
			$index      = 0;
			$count      = 0;
			if ( $post_query->have_posts() ) {
				while ( $post_query->have_posts() ) {
					$post_query->the_post();
					$post_id         = get_the_ID();
					$taxonomies      = get_object_taxonomies( get_post_type( $post_id ) );
					$post_taxonomies = array();
					$post_thumbnail  = \has_post_thumbnail( $post_id ) ? get_the_post_thumbnail_url( $post_id, 'post-thumbnail' ) : CONTENT_VIEWS_PLACEHOLDER_THUMB_IMG;
					++$count;
					++$index;
					if ( 'double-line-scroll' === $post_layout && 1 === $count ) {
						?>
						<div class="slide-post-item">
						<?php
					}
					if ( 1 === $index && ( 'horizontal' === $post_layout || 'vertical' === $post_layout ) ) {
						?>
						<div class="large-container">
						<?php
					}
					if ( 2 === $index && ( 'horizontal' === $post_layout || 'vertical' === $post_layout ) ) {
						?>
						<div class="small-containers">
						<?php
					}
					?>
					<div class="post-item">
						<?php if ( 'tiles' === $post_layout ) { ?>
							<div class="tile-left">
							<?php
						}
						if ( ! empty( $taxonomies ) && $display_taxonomies ) :
							?>
							<?php
							foreach ( $taxonomies as $taxonomy ) :
								$taxos = wp_get_post_terms( $post_id, $taxonomy, array( 'fields' => 'names' ) );
								foreach ( $taxos as $tax ) {
									$post_taxonomies[] = $tax;
								}
								?>
								<?php
							endforeach;
							$post_taxonomies = array_slice( $post_taxonomies, 0, 3 );
								endif;

						if ( 'tiles' === $post_layout || 'grid' === $post_layout ) {
							$this->content_views_grid_tiles_layout( $post_taxonomies, $display_taxonomies, $post_layout, $display_date, $display_author, $post_id );
						} elseif ( 'collapsible' === $post_layout ) {
							$this->content_views_collapsible_layout( $post_taxonomies, $display_taxonomies, $display_date, $display_author, $post_id );
						} elseif ( 'single-line-scroll' === $post_layout || 'double-line-scroll' === $post_layout ) {
							$this->content_views_scrollable_layout( $post_taxonomies, $display_taxonomies, $display_date, $post_id );
						} elseif ( 'horizontal' === $post_layout || 'vertical' === $post_layout ) {
							$this->content_views_horizontal_layout( $post_taxonomies, $display_taxonomies, $post_layout, $display_date, $display_author, $post_id, $index );
						}

						if ( 'tiles' === $post_layout ) {
							?>
							</div>
							<?php } ?>
						<div class="details-popup" id="popup-<?php echo \esc_attr( $post_id ); ?>">
							<button id="<?php echo \esc_attr( $post_id ); ?>"  class="close-button">X</button>
							<div class="post-details">
								<h3><?php echo wp_kses_post( get_the_title() ); ?></h3>
								<div class="post-image">
									<img src="<?php echo esc_url( $post_thumbnail ); ?>" />
								</div>
								<div class="date">Published On: <span><?php echo wp_kses_post( get_the_date( 'F d, Y' ) ); ?></span></div>
								<div class="author">Published By: <a href="<?php echo esc_url( get_the_author_posts_link( $post_id ) ); ?>" title="<?php echo get_the_author(); ?>"><?php echo wp_kses_post( get_the_author() ); ?></a></div>
								<div class="terms">
								<?php
								if ( ! empty( $taxonomies ) ) :
									foreach ( $taxonomies as $taxonomy ) :
										$taxos = wp_get_post_terms( $post_id, $taxonomy, array( 'fields' => 'names' ) );
										if ( ! empty( $taxos ) ) {
											?>
												<span><?php echo esc_html( ucfirst( $taxonomy ) ); ?>: </span>
												<?php
												echo esc_html( implode( ', ', $taxos ) );
										}
										?>
										<?php
										endforeach;
									endif;
								?>
								</div>
								<div class="content">
									<?php echo wp_kses_post( get_the_content( $post_id ) ); ?>
								</div>
								<div class="view-post">
									<a target="_blank" href="<?php echo esc_url( get_the_permalink() ); ?>"><?php esc_html_e( 'View Post', 'content-views' ); ?></a>
								</div>
							</div>
						</div>
					</div>
					<?php
					if ( 'double-line-scroll' === $post_layout && 2 === $count ) {
						?>
						</div>
						<?php
						$count = 0;
					}

					if ( ( 6 === $index || 1 === $index ) && ( 'horizontal' === $post_layout || 'vertical' === $post_layout ) ) {
						?>
						</div>
						<?php
					}
				}
				?>
				<?php if ( 'tiles' === $post_layout || 'grid' === $post_layout ) { ?>
					<div class="pagination <?php echo \esc_attr( $pagination ); ?>">
						<?php
						if ( 'numbers' === $pagination ) {
							echo wp_kses_post(
								paginate_links(
									array(
										'base'         => str_replace( 999999999, '%#%', esc_url( get_pagenum_link( 999999999 ) ) ),
										'total'        => $post_query->max_num_pages,
										'current'      => max( 1, get_query_var( 'paged' ) ),
										'format'       => '?paged=%#%',
										'show_all'     => false,
										'type'         => 'plain',
										'end_size'     => 2,
										'mid_size'     => 1,
										'prev_next'    => true,
										'prev_text'    => '<',
										'next_text'    => '>',
										'add_args'     => false,
										'add_fragment' => '',
									)
								)
							);
						} elseif ( 'prevnext' === $pagination ) {
							previous_posts_link( '>Prev', $post_query->max_num_pages );
							next_posts_link( 'Next>', $post_query->max_num_pages );
						}
						?>
					</div>
					<?php
				}
			}
			\wp_reset_postdata();
			?>
		</div>
		<?php
		return ob_get_clean();
	}

	/**
	 * Outputs html for tiles and grid layout.
	 *
	 * @param array   $post_taxonomies    Post Taxonomies.
	 * @param boolean $display_taxonomies Check whether to display taxonomies.
	 * @param string  $post_layout        Layout of the content.
	 * @param boolean $display_date       Check whether to display date.
	 * @param boolean $display_author     Check whether to display author.
	 * @param int     $post_id            Post id.
	 *
	 * @return void
	 * @since  1.0.0
	 */
	public function content_views_grid_tiles_layout( $post_taxonomies, $display_taxonomies, $post_layout, $display_date, $display_author, $post_id ): void {
		$post_thumbnail = \has_post_thumbnail( $post_id ) ? get_the_post_thumbnail_url( $post_id, 'post-thumbnail' ) : CONTENT_VIEWS_PLACEHOLDER_THUMB_IMG;
		if ( ! empty( $post_taxonomies ) && $display_taxonomies ) {
			?>
			<div class="post-entities">
			<?php echo esc_html( implode( ', ', $post_taxonomies ) ); ?>
			</div>
			<?php
		}
		?>
		<div class="post-thumbnail">
			<a href="javascript:void(0)" data-post_id="<?php echo \esc_attr( $post_id ); ?>" title="<?php echo esc_attr( get_the_title( $post_id ) ); ?>">
				<img src="<?php echo esc_url( $post_thumbnail ); ?>" />
			</a>
		</div>
		<?php if ( 'tiles' === $post_layout ) { ?>
			</div>
			<div class="tile-right">
		<?php } ?>
		<div class="post-title">
			<h2 class="entry-title">
				<a href="<?php echo esc_url( get_the_permalink( $post_id ) ); ?>" title="<?php echo esc_attr( get_the_title( $post_id ) ); ?>">
		<?php echo wp_kses_post( get_the_title( $post_id ) ); ?>
				</a>
			</h2>
		</div>
		<div class="post-excerpt">
		<?php echo wp_kses_post( get_the_excerpt() ); ?>
		</div>
		<div class="post-meta">
		<?php if ( $display_date ) : ?>
				<span class="post-date">
			<?php echo wp_kses_post( get_the_date( 'F d, Y' ) ); ?>
				</span>
		<?php endif; ?>
		<?php if ( $display_author ) : ?>
				<span class="post-author">
					<a href="<?php echo esc_url( get_the_author_posts_link( $post_id ) ); ?>" title="<?php echo get_the_author(); ?>"><?php echo wp_kses_post( get_the_author() ); ?></a>
				</span>
		<?php endif; ?>
		</div>
		<?php
	}

	/**
	 * Outputs html for collapsible layout.
	 *
	 * @param array   $post_taxonomies    Post Taxonomies.
	 * @param boolean $display_taxonomies Check whether to display taxonomies.
	 * @param boolean $display_date       Check whether to display date.
	 * @param boolean $display_author     Check whether to display author.
	 * @param int     $post_id            Post id.
	 *
	 * @return void
	 * @since  1.0.0
	 */
	public function content_views_collapsible_layout( $post_taxonomies, $display_taxonomies, $display_date, $display_author, $post_id ): void {
		$post_thumbnail = \has_post_thumbnail( $post_id ) ? get_the_post_thumbnail_url( $post_id, 'post-thumbnail' ) : CONTENT_VIEWS_PLACEHOLDER_THUMB_IMG;
		?>
		<div class="collapsible-header">
		<?php
		if ( ! empty( $post_taxonomies ) && $display_taxonomies ) {
			?>
				<div class="post-entities">
			<?php echo esc_html( implode( ', ', $post_taxonomies ) ); ?>
				</div>
				<?php
		}
		?>
			<div class="post-meta">
		<?php if ( $display_date ) : ?>
					<span class="post-date">
			<?php echo wp_kses_post( get_the_date( 'F d, Y' ) ); ?>
					</span>
		<?php endif; ?>
		<?php if ( $display_author ) : ?>
					<span class="post-author">
						<a href="<?php echo esc_url( get_the_author_posts_link( $post_id ) ); ?>" title="<?php echo get_the_author(); ?>"><?php echo wp_kses_post( get_the_author() ); ?></a>
					</span>
		<?php endif; ?>
			</div>
			<div class="post-title">
				<h2 class="entry-title">
					<a href="<?php echo esc_url( get_the_permalink( $post_id ) ); ?>" title="<?php echo esc_attr( get_the_title( $post_id ) ); ?>">
		<?php echo wp_kses_post( get_the_title( $post_id ) ); ?>
					</a>
				</h2>
			</div>
		</div>
		<div class="collapsible-content">
			<div class="post-thumbnail">
				<a href="javascript:void(0)" data-post_id="<?php echo \esc_attr( $post_id ); ?>" title="<?php echo esc_attr( get_the_title( $post_id ) ); ?>">
					<img src="<?php echo esc_url( $post_thumbnail ); ?>" />
				</a>
			</div>
			<div class="post-excerpt">
		<?php echo wp_kses_post( get_the_excerpt() ); ?>
			</div>
		</div>
		<?php
	}

	/**
	 * Outputs html for scrollable layouts.
	 *
	 * @param array   $post_taxonomies    Post Taxonomies.
	 * @param boolean $display_taxonomies Check whether to display taxonomies.
	 * @param boolean $display_date       Check whether to display date.
	 * @param int     $post_id            Post id.
	 *
	 * @return void
	 * @since  1.0.0
	 */
	public function content_views_scrollable_layout( $post_taxonomies, $display_taxonomies, $display_date, $post_id ) {
		$post_thumbnail = \has_post_thumbnail( $post_id ) ? get_the_post_thumbnail_url( $post_id, 'post-thumbnail' ) : CONTENT_VIEWS_PLACEHOLDER_THUMB_IMG;
		?>
		<div class="scroll-header">
		<?php
		if ( ! empty( $post_taxonomies ) && $display_taxonomies ) {
			?>
				<div class="post-entities">
			<?php foreach ( $post_taxonomies as $taxonomy ) { ?>
						<span><?php echo esc_html( $taxonomy ); ?></span>
										<?php
			}
			?>
				</div>
				<?php
		}
		?>
			<div class="post-meta">
		<?php if ( $display_date ) : ?>
					<span class="post-date">
			<?php echo wp_kses_post( get_the_date( 'F d, Y' ) ); ?>
					</span>
		<?php endif; ?>
			</div>
		</div>
		<div class="post-thumbnail">
			<a href="javascript:void(0)" data-post_id="<?php echo \esc_attr( $post_id ); ?>" title="<?php echo esc_attr( get_the_title( $post_id ) ); ?>">
				<img src="<?php echo esc_url( $post_thumbnail ); ?>" />
			</a>
		</div>
		<div class="post-title">
			<h2 class="entry-title">
				<a href="<?php echo esc_url( get_the_permalink( $post_id ) ); ?>" title="<?php echo esc_attr( get_the_title( $post_id ) ); ?>">
		<?php echo wp_kses_post( get_the_title( $post_id ) ); ?>
				</a>
			</h2>
		</div>
		<?php
	}

	/**
	 * Outputs html for horizontal posts layout.
	 *
	 * @param array   $post_taxonomies    Post Taxonomies.
	 * @param boolean $display_taxonomies Check whether to display taxonomies.
	 * @param string  $post_layout        Layout of the content.
	 * @param boolean $display_date       Check whether to display date.
	 * @param boolean $display_author     Check whether to display author.
	 * @param int     $post_id            Post id.
	 * @param int     $index              Post Index.
	 *
	 * @return void
	 * @since  1.0.0
	 */
	public function content_views_horizontal_layout( $post_taxonomies, $display_taxonomies, $post_layout, $display_date, $display_author, $post_id, $index ) {
		$post_thumbnail = \has_post_thumbnail( $post_id ) ? get_the_post_thumbnail_url( $post_id, 'post-thumbnail' ) : CONTENT_VIEWS_PLACEHOLDER_THUMB_IMG;
		if ( 'vertical' === $post_layout && ( $index > 1 && $index < 6 ) ) {
			?>
			<div class="left-container">
			<?php
		}
		if ( ! empty( $post_taxonomies ) && $display_taxonomies ) {
			?>
			<div class="post-entities">
			<?php foreach ( $post_taxonomies as $taxonomy ) { ?>
					<span><?php echo esc_html( $taxonomy ); ?></span>
									<?php
			}
			?>
			</div>
			<?php
		}
		?>
		<div class="post-thumbnail">
			<a href="javascript:void(0)" data-post_id="<?php echo \esc_attr( $post_id ); ?>" title="<?php echo esc_attr( get_the_title( $post_id ) ); ?>">
				<img src="<?php echo esc_url( $post_thumbnail ); ?>" />
			</a>
		</div>
		<?php
		if ( 'vertical' === $post_layout ) {
			?>
			</div>
			<div class="right-container">
			<?php
		}
		?>
		<div class="post-title">
			<h2 class="entry-title">
				<a href="<?php echo esc_url( get_the_permalink( $post_id ) ); ?>" title="<?php echo esc_attr( get_the_title( $post_id ) ); ?>">
		<?php echo wp_kses_post( get_the_title( $post_id ) ); ?>
				</a>
			</h2>
		</div>
		<div class="post-meta">
		<?php if ( $display_date ) : ?>
				<span class="post-date">
			<?php echo wp_kses_post( get_the_date( 'F d, Y' ) ); ?>
				</span>
		<?php endif; ?>
		<?php if ( $display_author ) : ?>
				/<span class="post-author">
					<a href="<?php echo esc_url( get_the_author_posts_link( $post_id ) ); ?>" title="<?php echo get_the_author(); ?>"><?php echo wp_kses_post( get_the_author() ); ?></a>
				</span>
		<?php endif; ?>
		</div>
		<?php if ( 1 === $index ) : ?>
			<div class="post-excerpt">
			<?php echo wp_kses_post( get_the_excerpt() ); ?>
			</div>
			<?php
		endif;
		if ( 'vertical' === $post_layout && ( $index > 1 && $index < 6 ) ) {
			?>
			</div>
			<?php
		}
	}
}
