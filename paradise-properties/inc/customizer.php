<?php
/**
 * Theme Customizer — contact details, hero copy, socials.
 * Everything editable under Appearance → Customize → Paradise Settings.
 *
 * @package Paradise
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Option defaults, used by paradise_get_option().
 *
 * @return array
 */
function paradise_option_defaults() {
	return array(
		'phone_display'   => '0814 526 2599',
		'whatsapp_number' => '2348145262599',
		'instagram'       => 'paradise_properties_ng',
		'email'           => 'hello@paradiseproperties.ng',
		'address'         => __( 'Calabar, Cross River State, Nigeria', 'paradise' ),
		'hero_title'      => __( "Invest in Calabar's Future with Paradise & Co. Properties", 'paradise' ),
		'hero_subtitle'   => __( 'Secure your future today with genuine and affordable landed properties in the heart of Calabar, Cross River State.', 'paradise' ),
		'deposit_text'    => __( 'Initial Deposit: Only ₦500,000', 'paradise' ),
		'map_embed'       => 'https://www.google.com/maps?q=Calabar%2C%20Cross%20River%20State%2C%20Nigeria&output=embed',
	);
}

/**
 * Read a theme option with its default.
 *
 * @param string $key Option key.
 * @return string
 */
function paradise_get_option( $key ) {
	$defaults = paradise_option_defaults();
	$value    = get_theme_mod( 'paradise_' . $key, isset( $defaults[ $key ] ) ? $defaults[ $key ] : '' );
	return is_string( $value ) ? trim( $value ) : $value;
}

/**
 * wa.me link with an optional prefilled message.
 *
 * @param string $message Prefilled message.
 * @return string
 */
function paradise_whatsapp_url( $message = '' ) {
	$number = preg_replace( '/\D/', '', paradise_get_option( 'whatsapp_number' ) );
	$url    = 'https://wa.me/' . $number;
	if ( $message ) {
		$url .= '?text=' . rawurlencode( $message );
	}
	return $url;
}

/**
 * Register customizer settings.
 *
 * @param WP_Customize_Manager $wp_customize Customizer instance.
 */
function paradise_customize_register( $wp_customize ) {
	$wp_customize->add_section(
		'paradise_settings',
		array(
			'title'    => __( 'Paradise Settings', 'paradise' ),
			'priority' => 30,
		)
	);

	$fields = array(
		'phone_display'   => array( __( 'Phone Number (display)', 'paradise' ), 'sanitize_text_field' ),
		'whatsapp_number' => array( __( 'WhatsApp Number (international, e.g. 2348145262599)', 'paradise' ), 'sanitize_text_field' ),
		'instagram'       => array( __( 'Instagram Handle (without @)', 'paradise' ), 'sanitize_text_field' ),
		'email'           => array( __( 'Email Address', 'paradise' ), 'sanitize_email' ),
		'address'         => array( __( 'Office Address', 'paradise' ), 'sanitize_text_field' ),
		'hero_title'      => array( __( 'Hero Headline', 'paradise' ), 'sanitize_text_field' ),
		'hero_subtitle'   => array( __( 'Hero Subheading', 'paradise' ), 'sanitize_text_field' ),
		'deposit_text'    => array( __( 'Deposit Highlight Text', 'paradise' ), 'sanitize_text_field' ),
		'map_embed'       => array( __( 'Google Maps Embed URL', 'paradise' ), 'esc_url_raw' ),
	);

	$defaults = paradise_option_defaults();

	foreach ( $fields as $key => $field ) {
		$wp_customize->add_setting(
			'paradise_' . $key,
			array(
				'default'           => isset( $defaults[ $key ] ) ? $defaults[ $key ] : '',
				'sanitize_callback' => $field[1],
			)
		);
		$wp_customize->add_control(
			'paradise_' . $key,
			array(
				'label'   => $field[0],
				'section' => 'paradise_settings',
				'type'    => 'text',
			)
		);
	}
}
add_action( 'customize_register', 'paradise_customize_register' );
