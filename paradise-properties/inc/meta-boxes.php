<?php
/**
 * Property details and gallery meta boxes.
 *
 * @package Paradise
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register meta boxes.
 */
function paradise_add_meta_boxes() {
	add_meta_box( 'paradise_property_details', __( 'Property Details', 'paradise' ), 'paradise_property_details_box', 'property', 'normal', 'high' );
	add_meta_box( 'paradise_property_gallery', __( 'Image Gallery', 'paradise' ), 'paradise_property_gallery_box', 'property', 'normal', 'default' );
	add_meta_box( 'paradise_testimonial_details', __( 'Client Details', 'paradise' ), 'paradise_testimonial_details_box', 'testimonial', 'side', 'default' );
}
add_action( 'add_meta_boxes', 'paradise_add_meta_boxes' );

/**
 * Property details fields.
 *
 * @param WP_Post $post Current post.
 */
function paradise_property_details_box( $post ) {
	wp_nonce_field( 'paradise_save_property', 'paradise_property_nonce' );

	$size     = get_post_meta( $post->ID, '_paradise_size', true );
	$price    = get_post_meta( $post->ID, '_paradise_price', true );
	$location = get_post_meta( $post->ID, '_paradise_location', true );
	$status   = get_post_meta( $post->ID, '_paradise_status', true );
	$features = get_post_meta( $post->ID, '_paradise_features', true );
	?>
	<style>
		.paradise-fields { display: grid; grid-template-columns: 1fr 1fr; gap: 12px 20px; }
		.paradise-fields label { display: block; font-weight: 600; margin-bottom: 4px; }
		.paradise-fields input, .paradise-fields select, .paradise-fields textarea { width: 100%; }
		.paradise-fields .full { grid-column: 1 / -1; }
		.paradise-fields .description { color: #666; font-style: italic; margin-top: 3px; display: block; }
	</style>
	<div class="paradise-fields">
		<p>
			<label for="paradise_size"><?php esc_html_e( 'Plot Size (SQM)', 'paradise' ); ?></label>
			<input type="number" min="0" step="1" id="paradise_size" name="paradise_size" value="<?php echo esc_attr( $size ); ?>" placeholder="450" />
		</p>
		<p>
			<label for="paradise_price"><?php esc_html_e( 'Price (Naira, numbers only)', 'paradise' ); ?></label>
			<input type="number" min="0" step="1000" id="paradise_price" name="paradise_price" value="<?php echo esc_attr( $price ); ?>" placeholder="2500000" />
			<span class="description"><?php esc_html_e( 'e.g. 2500000 will display as N2.5M', 'paradise' ); ?></span>
		</p>
		<p>
			<label for="paradise_location"><?php esc_html_e( 'Location', 'paradise' ); ?></label>
			<input type="text" id="paradise_location" name="paradise_location" value="<?php echo esc_attr( $location ); ?>" placeholder="<?php esc_attr_e( 'Calabar, Cross River State', 'paradise' ); ?>" />
		</p>
		<p>
			<label for="paradise_status"><?php esc_html_e( 'Status', 'paradise' ); ?></label>
			<select id="paradise_status" name="paradise_status">
				<option value="available" <?php selected( $status, 'available' ); ?>><?php esc_html_e( 'Available', 'paradise' ); ?></option>
				<option value="sold" <?php selected( $status, 'sold' ); ?>><?php esc_html_e( 'Sold', 'paradise' ); ?></option>
			</select>
		</p>
		<p class="full">
			<label for="paradise_features"><?php esc_html_e( 'Key Features (one per line)', 'paradise' ); ?></label>
			<textarea id="paradise_features" name="paradise_features" rows="4" placeholder="<?php esc_attr_e( "Registered survey and deed of assignment\nDry, table-flat land\nMotorable access road", 'paradise' ); ?>"><?php echo esc_textarea( $features ); ?></textarea>
		</p>
	</div>
	<?php
}

/**
 * Gallery picker — stores a comma-separated list of attachment IDs.
 *
 * @param WP_Post $post Current post.
 */
function paradise_property_gallery_box( $post ) {
	$gallery = get_post_meta( $post->ID, '_paradise_gallery', true );
	$ids     = array_filter( array_map( 'absint', explode( ',', (string) $gallery ) ) );
	?>
	<div id="paradise-gallery-box">
		<ul class="paradise-gallery-list" style="display:flex;flex-wrap:wrap;gap:8px;margin:0 0 10px;">
			<?php foreach ( $ids as $id ) : ?>
				<li data-id="<?php echo esc_attr( $id ); ?>" style="position:relative;">
					<?php echo wp_get_attachment_image( $id, 'thumbnail', false, array( 'style' => 'width:90px;height:90px;object-fit:cover;border-radius:6px;display:block;' ) ); ?>
					<button type="button" class="paradise-gallery-remove button-link" aria-label="<?php esc_attr_e( 'Remove image', 'paradise' ); ?>" style="position:absolute;top:-6px;right:-6px;background:#b32d2e;color:#fff;border-radius:50%;width:20px;height:20px;line-height:18px;text-align:center;text-decoration:none;">&times;</button>
				</li>
			<?php endforeach; ?>
		</ul>
		<input type="hidden" id="paradise_gallery" name="paradise_gallery" value="<?php echo esc_attr( implode( ',', $ids ) ); ?>" />
		<button type="button" class="button" id="paradise-gallery-add"><?php esc_html_e( 'Add Images', 'paradise' ); ?></button>
		<p class="description"><?php esc_html_e( 'These images appear in the gallery on the property details page. The Featured Image is used as the main photo.', 'paradise' ); ?></p>
	</div>
	<?php
}

/**
 * Testimonial extra field: client role / plot purchased.
 *
 * @param WP_Post $post Current post.
 */
function paradise_testimonial_details_box( $post ) {
	wp_nonce_field( 'paradise_save_testimonial', 'paradise_testimonial_nonce' );
	$role = get_post_meta( $post->ID, '_paradise_role', true );
	?>
	<p>
		<label for="paradise_role"><strong><?php esc_html_e( 'Role / Purchase', 'paradise' ); ?></strong></label>
		<input type="text" style="width:100%" id="paradise_role" name="paradise_role" value="<?php echo esc_attr( $role ); ?>" placeholder="<?php esc_attr_e( 'Bought 450 SQM, Calabar', 'paradise' ); ?>" />
	</p>
	<?php
}

/**
 * Persist property meta.
 *
 * @param int $post_id Post ID.
 */
function paradise_save_property_meta( $post_id ) {
	if ( ! isset( $_POST['paradise_property_nonce'] ) || ! wp_verify_nonce( sanitize_key( $_POST['paradise_property_nonce'] ), 'paradise_save_property' ) ) {
		return;
	}
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}
	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}

	update_post_meta( $post_id, '_paradise_size', isset( $_POST['paradise_size'] ) ? absint( $_POST['paradise_size'] ) : 0 );
	update_post_meta( $post_id, '_paradise_price', isset( $_POST['paradise_price'] ) ? absint( $_POST['paradise_price'] ) : 0 );
	update_post_meta( $post_id, '_paradise_location', isset( $_POST['paradise_location'] ) ? sanitize_text_field( wp_unslash( $_POST['paradise_location'] ) ) : '' );
	update_post_meta( $post_id, '_paradise_status', ( isset( $_POST['paradise_status'] ) && 'sold' === $_POST['paradise_status'] ) ? 'sold' : 'available' );
	update_post_meta( $post_id, '_paradise_features', isset( $_POST['paradise_features'] ) ? sanitize_textarea_field( wp_unslash( $_POST['paradise_features'] ) ) : '' );

	if ( isset( $_POST['paradise_gallery'] ) ) {
		$ids = array_filter( array_map( 'absint', explode( ',', sanitize_text_field( wp_unslash( $_POST['paradise_gallery'] ) ) ) ) );
		update_post_meta( $post_id, '_paradise_gallery', implode( ',', $ids ) );
	}
}
add_action( 'save_post_property', 'paradise_save_property_meta' );

/**
 * Persist testimonial meta.
 *
 * @param int $post_id Post ID.
 */
function paradise_save_testimonial_meta( $post_id ) {
	if ( ! isset( $_POST['paradise_testimonial_nonce'] ) || ! wp_verify_nonce( sanitize_key( $_POST['paradise_testimonial_nonce'] ), 'paradise_save_testimonial' ) ) {
		return;
	}
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}
	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}

	update_post_meta( $post_id, '_paradise_role', isset( $_POST['paradise_role'] ) ? sanitize_text_field( wp_unslash( $_POST['paradise_role'] ) ) : '' );
}
add_action( 'save_post_testimonial', 'paradise_save_testimonial_meta' );
