<?php
/**
 * Properties archive with search and filtering.
 *
 * @package Paradise
 */

get_header();
?>

<section class="page-hero">
	<div class="container">
		<h1 class="page-hero__title"><?php esc_html_e( 'Available Properties', 'paradise' ); ?></h1>
		<p class="page-hero__subtitle"><?php esc_html_e( 'Verified plots of land in Calabar, Cross River State — filter by plot size and budget to find yours.', 'paradise' ); ?></p>
	</div>
</section>

<section class="section">
	<div class="container">
		<?php paradise_property_filter_form(); ?>

		<?php if ( have_posts() ) : ?>
			<div class="property-grid">
				<?php
				while ( have_posts() ) {
					the_post();
					paradise_property_card( get_the_ID() );
				}
				?>
			</div>

			<nav class="pagination-wrap" aria-label="<?php esc_attr_e( 'Properties pagination', 'paradise' ); ?>">
				<?php
				the_posts_pagination(
					array(
						'mid_size'  => 2,
						'prev_text' => __( '&larr; Previous', 'paradise' ),
						'next_text' => __( 'Next &rarr;', 'paradise' ),
					)
				);
				?>
			</nav>
		<?php else : ?>
			<div class="section__empty reveal">
				<h2><?php esc_html_e( 'No properties match your filters', 'paradise' ); ?></h2>
				<p><?php esc_html_e( 'Try adjusting the plot size or budget — or message us on WhatsApp and we will find the right plot for you.', 'paradise' ); ?></p>
				<p>
					<a class="btn btn--primary" href="<?php echo esc_url( get_post_type_archive_link( 'property' ) ); ?>"><?php esc_html_e( 'Reset Filters', 'paradise' ); ?></a>
					<a class="btn btn--whatsapp" href="<?php echo esc_url( paradise_whatsapp_url( __( 'Hello! I am looking for a plot in Calabar. What is currently available?', 'paradise' ) ) ); ?>" target="_blank" rel="noopener noreferrer"><?php esc_html_e( 'Ask on WhatsApp', 'paradise' ); ?></a>
				</p>
			</div>
		<?php endif; ?>
	</div>
</section>

<?php
get_footer();
