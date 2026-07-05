<?php
/**
 * 404 template.
 *
 * @package Paradise
 */

get_header();
?>

<section class="page-hero">
	<div class="container">
		<h1 class="page-hero__title"><?php esc_html_e( 'Page Not Found', 'paradise' ); ?></h1>
		<p class="page-hero__subtitle"><?php esc_html_e( 'The page you are looking for may have moved — but your dream plot is still waiting.', 'paradise' ); ?></p>
	</div>
</section>

<section class="section">
	<div class="container container--narrow section__empty">
		<?php get_search_form(); ?>
		<p style="margin-top:1.5rem;">
			<a class="btn btn--primary" href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Back to Home', 'paradise' ); ?></a>
			<a class="btn btn--gold" href="<?php echo esc_url( get_post_type_archive_link( 'property' ) ); ?>"><?php esc_html_e( 'View Properties', 'paradise' ); ?></a>
		</p>
	</div>
</section>

<?php
get_footer();
