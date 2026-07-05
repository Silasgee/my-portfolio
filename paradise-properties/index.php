<?php
/**
 * Fallback template for posts, search results and anything
 * without a more specific template.
 *
 * @package Paradise
 */

get_header();
?>

<section class="page-hero">
	<div class="container">
		<h1 class="page-hero__title">
			<?php
			if ( is_search() ) {
				/* translators: %s: search query */
				printf( esc_html__( 'Search results for “%s”', 'paradise' ), esc_html( get_search_query() ) );
			} elseif ( is_archive() ) {
				echo esc_html( wp_strip_all_tags( get_the_archive_title() ) );
			} else {
				esc_html_e( 'Latest Updates', 'paradise' );
			}
			?>
		</h1>
	</div>
</section>

<section class="section">
	<div class="container container--narrow">
		<?php if ( have_posts() ) : ?>
			<?php
			while ( have_posts() ) :
				the_post();
				?>
				<article <?php post_class( 'post-listing reveal' ); ?>>
					<h2 class="post-listing__title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
					<p class="post-listing__meta"><?php echo esc_html( get_the_date() ); ?></p>
					<div class="post-listing__excerpt"><?php the_excerpt(); ?></div>
					<a class="btn btn--primary" href="<?php the_permalink(); ?>"><?php esc_html_e( 'Read More', 'paradise' ); ?></a>
				</article>
			<?php endwhile; ?>

			<nav class="pagination-wrap" aria-label="<?php esc_attr_e( 'Pagination', 'paradise' ); ?>">
				<?php the_posts_pagination(); ?>
			</nav>
		<?php else : ?>
			<div class="section__empty">
				<h2><?php esc_html_e( 'Nothing found', 'paradise' ); ?></h2>
				<p><?php esc_html_e( 'Try a different search, or browse our available properties.', 'paradise' ); ?></p>
				<?php get_search_form(); ?>
				<p><a class="btn btn--primary" href="<?php echo esc_url( get_post_type_archive_link( 'property' ) ); ?>"><?php esc_html_e( 'View Properties', 'paradise' ); ?></a></p>
			</div>
		<?php endif; ?>
	</div>
</section>

<?php
get_footer();
