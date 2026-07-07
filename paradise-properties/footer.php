<?php
/**
 * Site footer, social links and floating WhatsApp button.
 *
 * @package Paradise
 */

$paradise_instagram = paradise_get_option( 'instagram' );
$paradise_phone     = paradise_get_option( 'phone_display' );
?>
</main>

<footer class="site-footer">
	<div class="container site-footer__grid">
		<div class="site-footer__col site-footer__col--brand">
			<a class="site-branding__link site-branding__link--footer" href="<?php echo esc_url( home_url( '/' ) ); ?>">
				<span class="site-branding__mark" aria-hidden="true">
					<svg viewBox="0 0 48 48"><path d="M24 6 6 22h5v18h10V28h6v12h10V22h5L24 6z"/></svg>
				</span>
				<span class="site-branding__name">Paradise &amp; Co. Properties</span>
			</a>
			<p><?php esc_html_e( 'Genuine, affordable and verified landed properties in Calabar, Cross River State. Your trusted partner for secure land investment in Nigeria.', 'paradise' ); ?></p>
			<div class="social-links">
				<a href="<?php echo esc_url( 'https://instagram.com/' . $paradise_instagram ); ?>" target="_blank" rel="noopener noreferrer" aria-label="<?php esc_attr_e( 'Instagram', 'paradise' ); ?>">
					<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.1 0-3.5 0-4.8.1-1.1.1-1.5.2-1.7.3-.4.2-.7.4-.9.6-.3.3-.5.5-.6.9-.1.3-.3.7-.3 1.8-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.8c.1 1.1.2 1.5.3 1.7.2.4.4.7.6.9.3.3.5.5.9.6.3.1.7.3 1.8.3 1.2.1 1.6.1 4.7.1s3.5 0 4.8-.1c1.1-.1 1.5-.2 1.7-.3.4-.2.7-.4.9-.6.3-.3.5-.5.6-.9.1-.3.3-.7.3-1.8.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.8c-.1-1.1-.2-1.5-.3-1.7-.2-.4-.4-.7-.6-.9-.3-.3-.5-.5-.9-.6-.3-.1-.7-.3-1.8-.3-1.2-.1-1.6-.1-4.7-.1zm0 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 8.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4zm6.4-8.4a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z"/></svg>
				</a>
				<a href="<?php echo esc_url( paradise_whatsapp_url() ); ?>" target="_blank" rel="noopener noreferrer" aria-label="<?php esc_attr_e( 'WhatsApp', 'paradise' ); ?>">
					<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.6.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.4-3c-.3-.4 0-.5.2-.8l.4-.5c.1-.2.1-.3 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.9.9-1.2 2.2-.4 3.7 1.1 2.1 2.7 3.7 4.8 4.8 1.5.7 2.7.8 3.6.5.6-.2 1.3-.7 1.5-1.4.2-.6.2-1.1.1-1.2-.1-.1-.3-.2-.6-.3z"/></svg>
				</a>
			</div>
		</div>

		<div class="site-footer__col">
			<h3><?php esc_html_e( 'Quick Links', 'paradise' ); ?></h3>
			<?php
			wp_nav_menu(
				array(
					'theme_location' => 'footer',
					'menu_class'     => 'footer-menu',
					'container'      => false,
					'fallback_cb'    => 'paradise_fallback_menu',
					'depth'          => 1,
				)
			);
			?>
		</div>

		<div class="site-footer__col">
			<h3><?php esc_html_e( 'Contact Us', 'paradise' ); ?></h3>
			<ul class="footer-contact">
				<li>
					<strong><?php esc_html_e( 'Call / WhatsApp:', 'paradise' ); ?></strong>
					<a href="tel:<?php echo esc_attr( preg_replace( '/\s+/', '', $paradise_phone ) ); ?>"><?php echo esc_html( $paradise_phone ); ?></a>
				</li>
				<li>
					<strong><?php esc_html_e( 'Instagram:', 'paradise' ); ?></strong>
					<a href="<?php echo esc_url( 'https://instagram.com/' . $paradise_instagram ); ?>" target="_blank" rel="noopener noreferrer">@<?php echo esc_html( $paradise_instagram ); ?></a>
				</li>
				<li>
					<strong><?php esc_html_e( 'Address:', 'paradise' ); ?></strong>
					<?php echo esc_html( paradise_get_option( 'address' ) ); ?>
				</li>
			</ul>
		</div>

		<div class="site-footer__col">
			<h3><?php esc_html_e( 'Start Your Investment', 'paradise' ); ?></h3>
			<p><?php echo esc_html( paradise_get_option( 'deposit_text' ) ); ?></p>
			<a class="btn btn--gold" href="<?php echo esc_url( get_post_type_archive_link( 'property' ) ); ?>"><?php esc_html_e( 'View Properties', 'paradise' ); ?></a>
		</div>
	</div>

	<div class="site-footer__bottom">
		<div class="container">
			<p>&copy; <?php echo esc_html( gmdate( 'Y' ) ); ?> Paradise &amp; Co. Properties, Calabar — Cross River State, Nigeria. <?php esc_html_e( 'All rights reserved.', 'paradise' ); ?></p>
		</div>
	</div>
</footer>

<a class="whatsapp-float" href="<?php echo esc_url( paradise_whatsapp_url( __( 'Hello Paradise & Co. Properties! I would like to make an inquiry about your plots in Calabar.', 'paradise' ) ) ); ?>" target="_blank" rel="noopener noreferrer" aria-label="<?php esc_attr_e( 'Chat with us on WhatsApp', 'paradise' ); ?>">
	<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.6.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.4-3c-.3-.4 0-.5.2-.8l.4-.5c.1-.2.1-.3 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.9.9-1.2 2.2-.4 3.7 1.1 2.1 2.7 3.7 4.8 4.8 1.5.7 2.7.8 3.6.5.6-.2 1.3-.7 1.5-1.4.2-.6.2-1.1.1-1.2-.1-.1-.3-.2-.6-.3z"/></svg>
	<span class="whatsapp-float__label"><?php esc_html_e( 'Chat with us', 'paradise' ); ?></span>
</a>

<?php wp_footer(); ?>
</body>
</html>
