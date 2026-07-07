<?php
/**
 * Property archive search & filtering (plot size, budget, keyword).
 * Reads GET params from the filter bar on the Properties page.
 *
 * @package Paradise
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Size range choices shared by the filter form and query.
 *
 * @return array
 */
function paradise_size_ranges() {
	return array(
		'0-300'   => __( 'Up to 300 SQM', 'paradise' ),
		'301-600' => __( '301 – 600 SQM', 'paradise' ),
		'601-'    => __( '601 SQM and above', 'paradise' ),
	);
}

/**
 * Budget choices shared by the filter form and query.
 *
 * @return array
 */
function paradise_budget_ranges() {
	return array(
		'2000000'  => __( 'Up to ₦2M', 'paradise' ),
		'3000000'  => __( 'Up to ₦3M', 'paradise' ),
		'5000000'  => __( 'Up to ₦5M', 'paradise' ),
		'10000000' => __( 'Up to ₦10M', 'paradise' ),
	);
}

/**
 * Apply filters to the main property archive query.
 *
 * @param WP_Query $query The query.
 */
function paradise_filter_properties( $query ) {
	if ( is_admin() || ! $query->is_main_query() || ! $query->is_post_type_archive( 'property' ) ) {
		return;
	}

	$query->set( 'posts_per_page', 9 );
	$query->set( 'orderby', array( 'menu_order' => 'ASC', 'date' => 'DESC' ) );

	$meta_query = array();

	// Plot size range, e.g. "301-600" or "601-".
	if ( ! empty( $_GET['plot_size'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$range = sanitize_text_field( wp_unslash( $_GET['plot_size'] ) ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		if ( array_key_exists( $range, paradise_size_ranges() ) ) {
			list( $min, $max ) = array_pad( explode( '-', $range ), 2, '' );
			if ( '' !== $max ) {
				$meta_query[] = array(
					'key'     => '_paradise_size',
					'value'   => array( (int) $min, (int) $max ),
					'type'    => 'NUMERIC',
					'compare' => 'BETWEEN',
				);
			} else {
				$meta_query[] = array(
					'key'     => '_paradise_size',
					'value'   => (int) $min,
					'type'    => 'NUMERIC',
					'compare' => '>=',
				);
			}
		}
	}

	// Maximum budget.
	if ( ! empty( $_GET['max_price'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$max_price = absint( $_GET['max_price'] ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		if ( $max_price > 0 ) {
			$meta_query[] = array(
				'key'     => '_paradise_price',
				'value'   => $max_price,
				'type'    => 'NUMERIC',
				'compare' => '<=',
			);
		}
	}

	// Availability.
	if ( ! empty( $_GET['availability'] ) && 'available' === $_GET['availability'] ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$meta_query[] = array(
			'relation' => 'OR',
			array(
				'key'     => '_paradise_status',
				'value'   => 'sold',
				'compare' => '!=',
			),
			array(
				'key'     => '_paradise_status',
				'compare' => 'NOT EXISTS',
			),
		);
	}

	if ( $meta_query ) {
		$query->set( 'meta_query', $meta_query );
	}

	// Keyword search within the archive.
	if ( ! empty( $_GET['keyword'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$query->set( 's', sanitize_text_field( wp_unslash( $_GET['keyword'] ) ) ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended
	}
}
add_action( 'pre_get_posts', 'paradise_filter_properties' );

/**
 * Render the filter bar used on the Properties archive.
 */
function paradise_property_filter_form() {
	$keyword      = isset( $_GET['keyword'] ) ? sanitize_text_field( wp_unslash( $_GET['keyword'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
	$plot_size    = isset( $_GET['plot_size'] ) ? sanitize_text_field( wp_unslash( $_GET['plot_size'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
	$max_price    = isset( $_GET['max_price'] ) ? absint( $_GET['max_price'] ) : 0; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
	$availability = isset( $_GET['availability'] ) ? sanitize_text_field( wp_unslash( $_GET['availability'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
	?>
	<form class="property-filter reveal" method="get" action="<?php echo esc_url( get_post_type_archive_link( 'property' ) ); ?>">
		<div class="property-filter__field property-filter__field--grow">
			<label for="filter-keyword"><?php esc_html_e( 'Search', 'paradise' ); ?></label>
			<input type="search" id="filter-keyword" name="keyword" value="<?php echo esc_attr( $keyword ); ?>" placeholder="<?php esc_attr_e( 'e.g. residential plot…', 'paradise' ); ?>" />
		</div>
		<div class="property-filter__field">
			<label for="filter-size"><?php esc_html_e( 'Plot Size', 'paradise' ); ?></label>
			<select id="filter-size" name="plot_size">
				<option value=""><?php esc_html_e( 'Any size', 'paradise' ); ?></option>
				<?php foreach ( paradise_size_ranges() as $value => $label ) : ?>
					<option value="<?php echo esc_attr( $value ); ?>" <?php selected( $plot_size, $value ); ?>><?php echo esc_html( $label ); ?></option>
				<?php endforeach; ?>
			</select>
		</div>
		<div class="property-filter__field">
			<label for="filter-price"><?php esc_html_e( 'Budget', 'paradise' ); ?></label>
			<select id="filter-price" name="max_price">
				<option value=""><?php esc_html_e( 'Any budget', 'paradise' ); ?></option>
				<?php foreach ( paradise_budget_ranges() as $value => $label ) : ?>
					<option value="<?php echo esc_attr( $value ); ?>" <?php selected( (string) $max_price, $value ); ?>><?php echo esc_html( $label ); ?></option>
				<?php endforeach; ?>
			</select>
		</div>
		<div class="property-filter__field">
			<label for="filter-availability"><?php esc_html_e( 'Status', 'paradise' ); ?></label>
			<select id="filter-availability" name="availability">
				<option value=""><?php esc_html_e( 'All', 'paradise' ); ?></option>
				<option value="available" <?php selected( $availability, 'available' ); ?>><?php esc_html_e( 'Available only', 'paradise' ); ?></option>
			</select>
		</div>
		<div class="property-filter__actions">
			<button type="submit" class="btn btn--primary"><?php esc_html_e( 'Filter', 'paradise' ); ?></button>
			<a class="property-filter__reset" href="<?php echo esc_url( get_post_type_archive_link( 'property' ) ); ?>"><?php esc_html_e( 'Reset', 'paradise' ); ?></a>
		</div>
	</form>
	<?php
}
