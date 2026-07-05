<?php
/**
 * One-time demo content: seeds the three advertised plots, testimonials
 * and the About / Contact pages the first time the theme is activated,
 * so the site looks complete out of the box. Runs only when no
 * properties exist yet — it never overwrites the admin's own content.
 *
 * @package Paradise
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Seed demo content on first activation.
 */
function paradise_seed_demo_content() {
	if ( get_option( 'paradise_demo_seeded' ) ) {
		return;
	}

	$existing = get_posts(
		array(
			'post_type'      => 'property',
			'posts_per_page' => 1,
			'fields'         => 'ids',
		)
	);
	if ( empty( $existing ) ) {
		paradise_seed_properties();
		paradise_seed_testimonials();
	}

	paradise_seed_pages();

	update_option( 'paradise_demo_seeded', 1 );
	flush_rewrite_rules();
}
add_action( 'after_switch_theme', 'paradise_seed_demo_content' );

/**
 * The three advertised plots.
 */
function paradise_seed_properties() {
	$properties = array(
		array(
			'title'    => __( '230 SQM Residential Plot', 'paradise' ),
			'size'     => 230,
			'price'    => 1300000,
			'order'    => 1,
			'excerpt'  => __( 'A perfectly sized starter plot for your dream bungalow — dry, table-flat land in a fast-developing Calabar neighbourhood.', 'paradise' ),
			'content'  => __( "This 230 SQM plot is the ideal entry point into Calabar's booming property market. Located within a serene, fast-developing layout, it suits a modern bungalow or a smart buy-and-hold investment.\n\nThe land is completely dry all year round, sits on table-flat terrain and enjoys motorable access roads. All documentation is verified and ready for immediate transfer, so you can start building whenever you are ready.\n\nSecure this plot today with an initial deposit of only ₦500,000 and spread the balance with our flexible payment plan.", 'paradise' ),
			'features' => __( "Registered survey plan and deed of assignment\nDry, table-flat land — no filling required\nMotorable access road\nFast-developing residential neighbourhood\nFlexible payment plan from ₦500,000 deposit", 'paradise' ),
		),
		array(
			'title'    => __( '450 SQM Standard Plot', 'paradise' ),
			'size'     => 450,
			'price'    => 2500000,
			'order'    => 2,
			'excerpt'  => __( 'Our most popular plot size — generous space for a family duplex with room to spare, in a strategic Calabar location.', 'paradise' ),
			'content'  => __( "The 450 SQM standard plot is our best seller, and for good reason. It offers generous space for a full family duplex, a compound and landscaping, while remaining remarkably affordable.\n\nPositioned in a strategic location suitable for both residential and commercial development, this plot benefits from ongoing infrastructure growth across Calabar, Cross River State. Documentation is genuine, verified and transferred without stress.\n\nPay an initial deposit of ₦500,000 to reserve your plot instantly, then complete payment on a plan that suits you.", 'paradise' ),
			'features' => __( "Suitable for residential and commercial use\nRegistered survey plan and deed of assignment\nExcellent road network and drainage plan\nHigh appreciation potential\nFlexible payment plan from ₦500,000 deposit", 'paradise' ),
		),
		array(
			'title'    => __( '900 SQM Premium Plot', 'paradise' ),
			'size'     => 900,
			'price'    => 5000000,
			'order'    => 3,
			'excerpt'  => __( 'A premium double plot for estates, commercial projects or serious investors seeking maximum return on investment.', 'paradise' ),
			'content'  => __( "Our 900 SQM premium plot is built for vision. Whether you are planning a private estate, a mini-estate development, a school, a shopping plaza or simply the strongest land bank in your portfolio, this double plot delivers.\n\nSet in one of Calabar's most promising corridors, the location combines tranquillity with strategic access to major roads and amenities. Titles are genuine and verified, with professional support through every step of the transfer.\n\nReserve now with an initial deposit of ₦500,000 and lock in today's price before the next appreciation cycle.", 'paradise' ),
			'features' => __( "Double plot — ideal for estates and commercial projects\nRegistered survey plan and deed of assignment\nStrategic corridor with major road access\nExcellent return on investment\nFlexible payment plan from ₦500,000 deposit", 'paradise' ),
		),
	);

	foreach ( $properties as $property ) {
		$post_id = wp_insert_post(
			array(
				'post_type'    => 'property',
				'post_status'  => 'publish',
				'post_title'   => $property['title'],
				'post_content' => $property['content'],
				'post_excerpt' => $property['excerpt'],
				'menu_order'   => $property['order'],
			)
		);

		if ( $post_id && ! is_wp_error( $post_id ) ) {
			update_post_meta( $post_id, '_paradise_size', $property['size'] );
			update_post_meta( $post_id, '_paradise_price', $property['price'] );
			update_post_meta( $post_id, '_paradise_location', __( 'Calabar, Cross River State', 'paradise' ) );
			update_post_meta( $post_id, '_paradise_status', 'available' );
			update_post_meta( $post_id, '_paradise_features', $property['features'] );
		}
	}
}

/**
 * Starter testimonials.
 */
function paradise_seed_testimonials() {
	$testimonials = array(
		array(
			'name'    => __( 'Mrs. Blessing Okon', 'paradise' ),
			'role'    => __( 'Bought 450 SQM · Calabar', 'paradise' ),
			'content' => __( 'From my first WhatsApp message to receiving my documents, everything was transparent and stress-free. I inspected the land the same week and the papers were exactly as promised. I have already recommended Paradise & Co. to my colleagues.', 'paradise' ),
		),
		array(
			'name'    => __( 'Engr. David Effiong', 'paradise' ),
			'role'    => __( 'Bought 900 SQM · Calabar', 'paradise' ),
			'content' => __( 'As someone in construction, I am very careful about land documentation. Paradise & Co. Properties provided a registered survey and deed without any pressure tactics. The flexible payment plan made it easy to complete payment in three months.', 'paradise' ),
		),
		array(
			'name'    => __( 'Ms. Adaeze Nwosu', 'paradise' ),
			'role'    => __( 'Diaspora Investor · UK', 'paradise' ),
			'content' => __( 'I bought my plot from London without setting foot in Nigeria. They handled the inspection on video call, sent every document for my lawyer to verify, and kept me updated at each step. Completely trustworthy.', 'paradise' ),
		),
	);

	foreach ( $testimonials as $testimonial ) {
		$post_id = wp_insert_post(
			array(
				'post_type'    => 'testimonial',
				'post_status'  => 'publish',
				'post_title'   => $testimonial['name'],
				'post_content' => $testimonial['content'],
			)
		);
		if ( $post_id && ! is_wp_error( $post_id ) ) {
			update_post_meta( $post_id, '_paradise_role', $testimonial['role'] );
		}
	}
}

/**
 * About Us and Contact pages with their templates assigned.
 */
function paradise_seed_pages() {
	$pages = array(
		'about'   => array(
			'title'    => __( 'About Us', 'paradise' ),
			'template' => 'page-templates/template-about.php',
			'content'  => __( "Paradise & Co. Properties is a real estate company headquartered in Calabar, Cross River State, Nigeria. We help families, professionals and diaspora investors acquire genuine, affordable landed properties with complete documentation and zero stress.\n\nEvery plot we sell passes through rigorous due diligence — from root-of-title verification to physical charting — before it ever reaches our clients. That is why our buyers build with confidence and our investors sleep well.", 'paradise' ),
		),
		'contact' => array(
			'title'    => __( 'Contact', 'paradise' ),
			'template' => 'page-templates/template-contact.php',
			'content'  => __( 'We would love to hear from you. Call or WhatsApp us, send a message with the form below, or visit us in Calabar.', 'paradise' ),
		),
	);

	foreach ( $pages as $slug => $page ) {
		if ( get_page_by_path( $slug ) ) {
			continue;
		}
		$post_id = wp_insert_post(
			array(
				'post_type'    => 'page',
				'post_status'  => 'publish',
				'post_name'    => $slug,
				'post_title'   => $page['title'],
				'post_content' => $page['content'],
			)
		);
		if ( $post_id && ! is_wp_error( $post_id ) ) {
			update_post_meta( $post_id, '_wp_page_template', $page['template'] );
		}
	}
}
