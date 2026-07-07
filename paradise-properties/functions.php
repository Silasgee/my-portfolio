<?php
/**
 * Paradise & Co. Properties — theme functions and definitions.
 *
 * @package Paradise
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'PARADISE_VERSION', '1.0.0' );
define( 'PARADISE_DIR', get_template_directory() );
define( 'PARADISE_URI', get_template_directory_uri() );

require PARADISE_DIR . '/inc/post-types.php';
require PARADISE_DIR . '/inc/meta-boxes.php';
require PARADISE_DIR . '/inc/customizer.php';
require PARADISE_DIR . '/inc/template-tags.php';
require PARADISE_DIR . '/inc/query-filters.php';
require PARADISE_DIR . '/inc/contact-form.php';
require PARADISE_DIR . '/inc/demo-content.php';

/**
 * Theme setup.
 */
function paradise_setup() {
	load_theme_textdomain( 'paradise', PARADISE_DIR . '/languages' );

	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ) );
	add_theme_support(
		'custom-logo',
		array(
			'height'      => 96,
			'width'       => 96,
			'flex-height' => true,
			'flex-width'  => true,
		)
	);

	register_nav_menus(
		array(
			'primary' => __( 'Primary Menu', 'paradise' ),
			'footer'  => __( 'Footer Menu', 'paradise' ),
		)
	);

	// Crisp, consistent card and hero crops.
	add_image_size( 'paradise-card', 800, 560, true );
	add_image_size( 'paradise-hero', 1600, 900, true );
	add_image_size( 'paradise-thumb', 320, 220, true );
}
add_action( 'after_setup_theme', 'paradise_setup' );

/**
 * Front-end scripts and styles.
 */
function paradise_enqueue_assets() {
	wp_enqueue_style(
		'paradise-fonts',
		'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap',
		array(),
		null
	);

	wp_enqueue_style( 'paradise-main', PARADISE_URI . '/assets/css/main.css', array( 'paradise-fonts' ), PARADISE_VERSION );

	wp_enqueue_script( 'paradise-main', PARADISE_URI . '/assets/js/main.js', array(), PARADISE_VERSION, true );
	wp_script_add_data( 'paradise-main', 'strategy', 'defer' );
}
add_action( 'wp_enqueue_scripts', 'paradise_enqueue_assets' );

/**
 * Preconnect to Google Fonts for faster first paint.
 *
 * @param array  $urls          URLs to print for resource hints.
 * @param string $relation_type The relation type the URLs are printed for.
 * @return array
 */
function paradise_resource_hints( $urls, $relation_type ) {
	if ( 'preconnect' === $relation_type ) {
		$urls[] = array(
			'href'        => 'https://fonts.gstatic.com',
			'crossorigin' => 'anonymous',
		);
		$urls[] = array( 'href' => 'https://fonts.googleapis.com' );
	}
	return $urls;
}
add_filter( 'wp_resource_hints', 'paradise_resource_hints', 10, 2 );

/**
 * Admin assets for the property gallery picker.
 *
 * @param string $hook Current admin page.
 */
function paradise_admin_assets( $hook ) {
	if ( 'post.php' !== $hook && 'post-new.php' !== $hook ) {
		return;
	}
	$screen = get_current_screen();
	if ( $screen && 'property' === $screen->post_type ) {
		wp_enqueue_media();
		wp_enqueue_script( 'paradise-admin-gallery', PARADISE_URI . '/assets/js/admin-gallery.js', array( 'jquery' ), PARADISE_VERSION, true );
	}
}
add_action( 'admin_enqueue_scripts', 'paradise_admin_assets' );

/**
 * Trim archive excerpts to a card-friendly length.
 *
 * @param int $length Words.
 * @return int
 */
function paradise_excerpt_length( $length ) {
	return is_admin() ? $length : 22;
}
add_filter( 'excerpt_length', 'paradise_excerpt_length' );

/**
 * Elegant excerpt ending.
 *
 * @param string $more The default "more" string.
 * @return string
 */
function paradise_excerpt_more( $more ) {
	return is_admin() ? $more : '&hellip;';
}
add_filter( 'excerpt_more', 'paradise_excerpt_more' );

/**
 * Fallback menu when no menu is assigned: Home, About, Properties, Contact.
 */
function paradise_fallback_menu() {
	$links = array(
		array( home_url( '/' ), __( 'Home', 'paradise' ) ),
		array( paradise_page_url( 'about' ), __( 'About Us', 'paradise' ) ),
		array( get_post_type_archive_link( 'property' ), __( 'Properties', 'paradise' ) ),
		array( paradise_page_url( 'contact' ), __( 'Contact', 'paradise' ) ),
	);

	echo '<ul class="nav-menu">';
	foreach ( $links as $link ) {
		if ( $link[0] ) {
			printf( '<li><a href="%s">%s</a></li>', esc_url( $link[0] ), esc_html( $link[1] ) );
		}
	}
	echo '</ul>';
}

/**
 * SEO: meta description + Open Graph basics on key views.
 */
function paradise_meta_tags() {
	$description = '';

	if ( is_front_page() ) {
		$description = get_bloginfo( 'description' );
		if ( ! $description ) {
			$description = __( 'Genuine and affordable landed properties in Calabar, Cross River State. Verified plots from 230 SQM with flexible payment plans and an initial deposit of only N500,000.', 'paradise' );
		}
	} elseif ( is_singular() ) {
		$post = get_queried_object();
		if ( $post instanceof WP_Post ) {
			$description = $post->post_excerpt ? $post->post_excerpt : wp_trim_words( wp_strip_all_tags( $post->post_content ), 30 );
		}
	} elseif ( is_post_type_archive( 'property' ) ) {
		$description = __( 'Browse verified plots of land for sale in Calabar by Paradise & Co. Properties. Filter by plot size and budget, and secure your plot with an initial deposit of N500,000.', 'paradise' );
	}

	if ( $description ) {
		printf( '<meta name="description" content="%s" />' . "\n", esc_attr( $description ) );
		printf( '<meta property="og:description" content="%s" />' . "\n", esc_attr( $description ) );
	}

	printf( '<meta property="og:site_name" content="%s" />' . "\n", esc_attr( get_bloginfo( 'name' ) ) );
	printf( '<meta property="og:title" content="%s" />' . "\n", esc_attr( wp_get_document_title() ) );

	if ( is_singular() && has_post_thumbnail() ) {
		$image = wp_get_attachment_image_url( get_post_thumbnail_id(), 'paradise-hero' );
		if ( $image ) {
			printf( '<meta property="og:image" content="%s" />' . "\n", esc_url( $image ) );
		}
	}
}
add_action( 'wp_head', 'paradise_meta_tags', 5 );

/**
 * Structured data (schema.org) for the business and property listings.
 */
function paradise_structured_data() {
	$schema = array(
		'@context'  => 'https://schema.org',
		'@type'     => 'RealEstateAgent',
		'name'      => get_bloginfo( 'name' ),
		'url'       => home_url( '/' ),
		'telephone' => paradise_get_option( 'phone_display' ),
		'address'   => array(
			'@type'           => 'PostalAddress',
			'addressLocality' => 'Calabar',
			'addressRegion'   => 'Cross River State',
			'addressCountry'  => 'NG',
		),
	);

	if ( is_singular( 'property' ) ) {
		$price  = (float) get_post_meta( get_the_ID(), '_paradise_price', true );
		$schema = array(
			'@context'    => 'https://schema.org',
			'@type'       => 'Product',
			'name'        => get_the_title(),
			'description' => wp_trim_words( wp_strip_all_tags( get_post_field( 'post_content', get_the_ID() ) ), 40 ),
			'url'         => get_permalink(),
			'offers'      => array(
				'@type'         => 'Offer',
				'price'         => $price,
				'priceCurrency' => 'NGN',
				'availability'  => 'https://schema.org/InStock',
			),
		);
		if ( has_post_thumbnail() ) {
			$schema['image'] = wp_get_attachment_image_url( get_post_thumbnail_id(), 'paradise-hero' );
		}
	}

	echo '<script type="application/ld+json">' . wp_json_encode( $schema ) . '</script>' . "\n";
}
add_action( 'wp_head', 'paradise_structured_data', 20 );
