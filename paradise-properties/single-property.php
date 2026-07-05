<?php
/**
 * Property details page: gallery, specs, features, inquiry actions
 * and related plots.
 *
 * @package Paradise
 */

get_header();

while ( have_posts() ) :
	the_post();

	$paradise_size     = get_post_meta( get_the_ID(), '_paradise_size', true );
	$paradise_price    = (float) get_post_meta( get_the_ID(), '_paradise_price', true );
	$paradise_location = get_post_meta( get_the_ID(), '_paradise_location', true );
	$paradise_status   = get_post_meta( get_the_ID(), '_paradise_status', true );
	$paradise_features = get_post_meta( get_the_ID(), '_paradise_features', true );
	$paradise_gallery  = array_filter( array_map( 'absint', explode( ',', (string) get_post_meta( get_the_ID(), '_paradise_gallery', true ) ) ) );
	?>

	<section class="page-hero page-hero--compact">
		<div class="container">
			<nav class="breadcrumbs" aria-label="<?php esc_attr_e( 'Breadcrumb', 'paradise' ); ?>">
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Home', 'paradise' ); ?></a>
				<span aria-hidden="true">/</span>
				<a href="<?php echo esc_url( get_post_type_archive_link( 'property' ) ); ?>"><?php esc_html_e( 'Properties', 'paradise' ); ?></a>
				<span aria-hidden="true">/</span>
				<span><?php the_title(); ?></span>
			</nav>
			<h1 class="page-hero__title"><?php the_title(); ?></h1>
			<p class="page-hero__meta">
				<span class="badge <?php echo 'sold' === $paradise_status ? 'badge--sold' : 'badge--available'; ?>">
					<?php echo esc_html( 'sold' === $paradise_status ? __( 'Sold', 'paradise' ) : __( 'Available', 'paradise' ) ); ?>
				</span>
				<?php if ( $paradise_location ) : ?>
					<span class="page-hero__location">
						<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/></svg>
						<?php echo esc_html( $paradise_location ); ?>
					</span>
				<?php endif; ?>
			</p>
		</div>
	</section>

	<section class="section section--first">
		<div class="container property-single">
			<div class="property-single__main">
				<div class="property-gallery reveal">
					<figure class="property-gallery__main">
						<?php paradise_property_image( get_the_ID(), 'paradise-hero' ); ?>
					</figure>
					<?php if ( $paradise_gallery ) : ?>
						<div class="property-gallery__thumbs">
							<?php foreach ( $paradise_gallery as $paradise_image_id ) : ?>
								<?php $paradise_full = wp_get_attachment_image_url( $paradise_image_id, 'paradise-hero' ); ?>
								<?php if ( $paradise_full ) : ?>
									<button type="button" class="property-gallery__thumb" data-full="<?php echo esc_url( $paradise_full ); ?>" aria-label="<?php esc_attr_e( 'View image', 'paradise' ); ?>">
										<?php echo wp_get_attachment_image( $paradise_image_id, 'paradise-thumb', false, array( 'loading' => 'lazy' ) ); ?>
									</button>
								<?php endif; ?>
							<?php endforeach; ?>
						</div>
					<?php endif; ?>
				</div>

				<div class="property-single__content reveal">
					<h2><?php esc_html_e( 'About This Property', 'paradise' ); ?></h2>
					<?php the_content(); ?>
				</div>

				<?php if ( $paradise_features ) : ?>
					<div class="property-single__features reveal">
						<h2><?php esc_html_e( 'Key Features', 'paradise' ); ?></h2>
						<ul class="feature-list">
							<?php foreach ( array_filter( array_map( 'trim', explode( "\n", $paradise_features ) ) ) as $paradise_feature ) : ?>
								<li>
									<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
									<?php echo esc_html( $paradise_feature ); ?>
								</li>
							<?php endforeach; ?>
						</ul>
					</div>
				<?php endif; ?>
			</div>

			<aside class="property-single__sidebar">
				<div class="property-summary reveal">
					<p class="property-summary__price">
						<?php echo esc_html( paradise_format_price( $paradise_price ) ); ?>
						<span><?php echo esc_html( paradise_format_price_full( $paradise_price ) ); ?></span>
					</p>
					<ul class="property-summary__specs">
						<?php if ( $paradise_size ) : ?>
							<li>
								<span><?php esc_html_e( 'Plot Size', 'paradise' ); ?></span>
								<strong><?php echo esc_html( number_format( (float) $paradise_size ) ); ?> <?php esc_html_e( 'SQM', 'paradise' ); ?></strong>
							</li>
						<?php endif; ?>
						<li>
							<span><?php esc_html_e( 'Location', 'paradise' ); ?></span>
							<strong><?php echo esc_html( $paradise_location ? $paradise_location : __( 'Calabar', 'paradise' ) ); ?></strong>
						</li>
						<li>
							<span><?php esc_html_e( 'Initial Deposit', 'paradise' ); ?></span>
							<strong>₦500,000</strong>
						</li>
						<li>
							<span><?php esc_html_e( 'Status', 'paradise' ); ?></span>
							<strong><?php echo esc_html( 'sold' === $paradise_status ? __( 'Sold', 'paradise' ) : __( 'Available', 'paradise' ) ); ?></strong>
						</li>
					</ul>
					<a class="btn btn--whatsapp btn--block" href="<?php echo esc_url( paradise_property_whatsapp_url( get_the_ID() ) ); ?>" target="_blank" rel="noopener noreferrer">
						<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.6.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.4-3c-.3-.4 0-.5.2-.8l.4-.5c.1-.2.1-.3 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.9.9-1.2 2.2-.4 3.7 1.1 2.1 2.7 3.7 4.8 4.8 1.5.7 2.7.8 3.6.5.6-.2 1.3-.7 1.5-1.4.2-.6.2-1.1.1-1.2-.1-.1-.3-.2-.6-.3z"/></svg>
						<?php esc_html_e( 'Inquire on WhatsApp', 'paradise' ); ?>
					</a>
					<a class="btn btn--primary btn--block" href="tel:<?php echo esc_attr( preg_replace( '/\s+/', '', paradise_get_option( 'phone_display' ) ) ); ?>">
						<?php
						/* translators: %s: phone number */
						printf( esc_html__( 'Call %s', 'paradise' ), esc_html( paradise_get_option( 'phone_display' ) ) );
						?>
					</a>
					<p class="property-summary__note"><?php esc_html_e( 'Free site inspections available every week — book yours today.', 'paradise' ); ?></p>
				</div>
			</aside>
		</div>
	</section>

	<?php
	$paradise_related = new WP_Query(
		array(
			'post_type'      => 'property',
			'posts_per_page' => 3,
			'post__not_in'   => array( get_the_ID() ),
			'orderby'        => array( 'menu_order' => 'ASC', 'date' => 'DESC' ),
		)
	);
	if ( $paradise_related->have_posts() ) :
		?>
		<section class="section section--tinted">
			<div class="container">
				<?php paradise_section_heading( __( 'More Plots', 'paradise' ), __( 'You May Also Like', 'paradise' ) ); ?>
				<div class="property-grid">
					<?php
					while ( $paradise_related->have_posts() ) {
						$paradise_related->the_post();
						paradise_property_card( get_the_ID() );
					}
					wp_reset_postdata();
					?>
				</div>
			</div>
		</section>
	<?php endif; ?>

	<div class="lightbox" id="paradise-lightbox" hidden>
		<button type="button" class="lightbox__close" aria-label="<?php esc_attr_e( 'Close', 'paradise' ); ?>">&times;</button>
		<img src="" alt="" />
	</div>

	<?php
endwhile;

get_footer();
