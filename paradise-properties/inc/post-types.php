<?php
/**
 * Custom post types: Properties and Testimonials.
 *
 * Registering these in the theme keeps the site a one-folder install;
 * the admin manages listings from Dashboard → Properties.
 *
 * @package Paradise
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register the Property post type.
 */
function paradise_register_post_types() {
	register_post_type(
		'property',
		array(
			'labels'        => array(
				'name'               => __( 'Properties', 'paradise' ),
				'singular_name'      => __( 'Property', 'paradise' ),
				'add_new'            => __( 'Add New Property', 'paradise' ),
				'add_new_item'       => __( 'Add New Property', 'paradise' ),
				'edit_item'          => __( 'Edit Property', 'paradise' ),
				'new_item'           => __( 'New Property', 'paradise' ),
				'view_item'          => __( 'View Property', 'paradise' ),
				'search_items'       => __( 'Search Properties', 'paradise' ),
				'not_found'          => __( 'No properties found.', 'paradise' ),
				'not_found_in_trash' => __( 'No properties found in Trash.', 'paradise' ),
				'all_items'          => __( 'All Properties', 'paradise' ),
			),
			'public'        => true,
			'has_archive'   => true,
			'rewrite'       => array(
				'slug'       => 'properties',
				'with_front' => false,
			),
			'menu_position' => 5,
			'menu_icon'     => 'dashicons-admin-multisite',
			'supports'      => array( 'title', 'editor', 'excerpt', 'thumbnail', 'page-attributes' ),
			'show_in_rest'  => true,
		)
	);

	register_post_type(
		'testimonial',
		array(
			'labels'        => array(
				'name'          => __( 'Testimonials', 'paradise' ),
				'singular_name' => __( 'Testimonial', 'paradise' ),
				'add_new_item'  => __( 'Add New Testimonial', 'paradise' ),
				'edit_item'     => __( 'Edit Testimonial', 'paradise' ),
				'not_found'     => __( 'No testimonials found.', 'paradise' ),
			),
			'public'        => false,
			'show_ui'       => true,
			'menu_position' => 6,
			'menu_icon'     => 'dashicons-format-quote',
			'supports'      => array( 'title', 'editor', 'thumbnail' ),
			'show_in_rest'  => true,
		)
	);
}
add_action( 'init', 'paradise_register_post_types' );

/**
 * Admin list columns for Properties: size, price, location, status.
 *
 * @param array $columns Existing columns.
 * @return array
 */
function paradise_property_columns( $columns ) {
	$date = $columns['date'];
	unset( $columns['date'] );

	$columns['paradise_size']     = __( 'Plot Size', 'paradise' );
	$columns['paradise_price']    = __( 'Price', 'paradise' );
	$columns['paradise_location'] = __( 'Location', 'paradise' );
	$columns['paradise_status']   = __( 'Status', 'paradise' );
	$columns['date']              = $date;

	return $columns;
}
add_filter( 'manage_property_posts_columns', 'paradise_property_columns' );

/**
 * Render the custom admin columns.
 *
 * @param string $column  Column key.
 * @param int    $post_id Post ID.
 */
function paradise_property_column_content( $column, $post_id ) {
	switch ( $column ) {
		case 'paradise_size':
			$size = get_post_meta( $post_id, '_paradise_size', true );
			echo $size ? esc_html( $size . ' SQM' ) : '&mdash;';
			break;
		case 'paradise_price':
			echo esc_html( paradise_format_price( (float) get_post_meta( $post_id, '_paradise_price', true ) ) );
			break;
		case 'paradise_location':
			$location = get_post_meta( $post_id, '_paradise_location', true );
			echo $location ? esc_html( $location ) : '&mdash;';
			break;
		case 'paradise_status':
			$status = get_post_meta( $post_id, '_paradise_status', true );
			echo esc_html( 'sold' === $status ? __( 'Sold', 'paradise' ) : __( 'Available', 'paradise' ) );
			break;
	}
}
add_action( 'manage_property_posts_custom_column', 'paradise_property_column_content', 10, 2 );
