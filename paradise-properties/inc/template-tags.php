<?php
/**
 * Reusable template helpers.
 *
 * @package Paradise
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Format a Naira amount the way it appears in marketing: ₦1.3M, ₦500,000.
 *
 * @param float $amount Amount in Naira.
 * @return string
 */
function paradise_format_price( $amount ) {
	if ( $amount <= 0 ) {
		return __( 'Price on request', 'paradise' );
	}
	if ( $amount >= 1000000 ) {
		$millions = $amount / 1000000;
		$label    = ( floor( $millions ) === $millions ) ? number_format( $millions ) : rtrim( rtrim( number_format( $millions, 2 ), '0' ), '.' );
		return '₦' . $label . 'M';
	}
	return '₦' . number_format( $amount );
}

/**
 * Full formatted price, e.g. ₦2,500,000.
 *
 * @param float $amount Amount in Naira.
 * @return string
 */
function paradise_format_price_full( $amount ) {
	return $amount > 0 ? '₦' . number_format( $amount ) : __( 'Price on request', 'paradise' );
}

/**
 * URL of a page created by the demo importer (about/contact), by slug.
 *
 * @param string $slug Page slug.
 * @return string|false
 */
function paradise_page_url( $slug ) {
	$page = get_page_by_path( $slug );
	return $page ? get_permalink( $page ) : false;
}

/**
 * Property featured image with an elegant estate placeholder fallback.
 *
 * @param int    $post_id Post ID.
 * @param string $size    Image size.
 */
function paradise_property_image( $post_id, $size = 'paradise-card' ) {
	if ( has_post_thumbnail( $post_id ) ) {
		echo get_the_post_thumbnail( $post_id, $size, array( 'loading' => 'lazy' ) );
		return;
	}

	// Rotate through bundled estate illustrations so cards don't repeat.
	$index = ( $post_id % 4 ) + 1;
	printf(
		'<img src="%s" alt="%s" loading="lazy" width="800" height="560" />',
		esc_url( PARADISE_URI . '/assets/img/estate-' . $index . '.svg' ),
		esc_attr( get_the_title( $post_id ) )
	);
}

/**
 * WhatsApp inquiry link for a property.
 *
 * @param int $post_id Post ID.
 * @return string
 */
function paradise_property_whatsapp_url( $post_id ) {
	$size  = get_post_meta( $post_id, '_paradise_size', true );
	$price = paradise_format_price( (float) get_post_meta( $post_id, '_paradise_price', true ) );

	$message = sprintf(
		/* translators: 1: property title, 2: plot size, 3: price, 4: permalink */
		__( 'Hello Paradise & Co. Properties! I am interested in the %1$s (%2$s SQM at %3$s). Please share more details. %4$s', 'paradise' ),
		get_the_title( $post_id ),
		$size,
		$price,
		get_permalink( $post_id )
	);

	return paradise_whatsapp_url( $message );
}

/**
 * Render one property card. Used on the home page and archive.
 *
 * @param int $post_id Post ID.
 */
function paradise_property_card( $post_id ) {
	$size   = get_post_meta( $post_id, '_paradise_size', true );
	$price  = (float) get_post_meta( $post_id, '_paradise_price', true );
	$status = get_post_meta( $post_id, '_paradise_status', true );
	?>
	<article class="property-card reveal">
		<a class="property-card__media" href="<?php echo esc_url( get_permalink( $post_id ) ); ?>" aria-hidden="true" tabindex="-1">
			<?php paradise_property_image( $post_id ); ?>
			<?php if ( 'sold' === $status ) : ?>
				<span class="property-card__badge property-card__badge--sold"><?php esc_html_e( 'Sold', 'paradise' ); ?></span>
			<?php else : ?>
				<span class="property-card__badge"><?php esc_html_e( 'Available', 'paradise' ); ?></span>
			<?php endif; ?>
			<span class="property-card__price"><?php echo esc_html( paradise_format_price( $price ) ); ?></span>
		</a>
		<div class="property-card__body">
			<h3 class="property-card__title">
				<a href="<?php echo esc_url( get_permalink( $post_id ) ); ?>"><?php echo esc_html( get_the_title( $post_id ) ); ?></a>
			</h3>
			<ul class="property-card__meta">
				<?php if ( $size ) : ?>
					<li>
						<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3h8v2H5v6H3V3zm18 18h-8v-2h6v-6h2v8zM3 21v-8h2v6h6v2H3zM21 3v8h-2V5h-6V3h8z"/></svg>
						<?php echo esc_html( number_format( (float) $size ) ); ?> <?php esc_html_e( 'SQM', 'paradise' ); ?>
					</li>
				<?php endif; ?>
				<li>
					<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/></svg>
					<?php echo esc_html( get_post_meta( $post_id, '_paradise_location', true ) ?: __( 'Calabar', 'paradise' ) ); ?>
				</li>
			</ul>
			<p class="property-card__excerpt"><?php echo esc_html( get_the_excerpt( $post_id ) ); ?></p>
			<div class="property-card__actions">
				<a class="btn btn--primary" href="<?php echo esc_url( get_permalink( $post_id ) ); ?>"><?php esc_html_e( 'View Details', 'paradise' ); ?></a>
				<a class="btn btn--whatsapp" href="<?php echo esc_url( paradise_property_whatsapp_url( $post_id ) ); ?>" target="_blank" rel="noopener noreferrer">
					<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.6.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.4-3c-.3-.4 0-.5.2-.8l.4-.5c.1-.2.1-.3 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.9.9-1.2 2.2-.4 3.7 1.1 2.1 2.7 3.7 4.8 4.8 1.5.7 2.7.8 3.6.5.6-.2 1.3-.7 1.5-1.4.2-.6.2-1.1.1-1.2-.1-.1-.3-.2-.6-.3z"/></svg>
					<?php esc_html_e( 'WhatsApp', 'paradise' ); ?>
				</a>
			</div>
		</div>
	</article>
	<?php
}

/**
 * Section heading with eyebrow label.
 *
 * @param string $eyebrow  Small label above the title.
 * @param string $title    Section title.
 * @param string $subtitle Optional supporting sentence.
 */
function paradise_section_heading( $eyebrow, $title, $subtitle = '' ) {
	echo '<div class="section-heading reveal">';
	if ( $eyebrow ) {
		echo '<span class="section-heading__eyebrow">' . esc_html( $eyebrow ) . '</span>';
	}
	echo '<h2 class="section-heading__title">' . esc_html( $title ) . '</h2>';
	if ( $subtitle ) {
		echo '<p class="section-heading__subtitle">' . esc_html( $subtitle ) . '</p>';
	}
	echo '</div>';
}
