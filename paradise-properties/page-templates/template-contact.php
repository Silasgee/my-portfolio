<?php
/**
 * Template Name: Contact
 *
 * @package Paradise
 */

get_header();

while ( have_posts() ) :
	the_post();

	$paradise_phone     = paradise_get_option( 'phone_display' );
	$paradise_instagram = paradise_get_option( 'instagram' );
	$paradise_email     = paradise_get_option( 'email' );
	?>

	<section class="page-hero">
		<div class="container">
			<h1 class="page-hero__title"><?php the_title(); ?></h1>
			<p class="page-hero__subtitle"><?php esc_html_e( 'Questions about a plot? Ready to book an inspection? We respond fast.', 'paradise' ); ?></p>
		</div>
	</section>

	<section class="section">
		<div class="container contact-layout">
			<div class="contact-layout__info reveal">
				<?php if ( get_the_content() ) : ?>
					<div class="contact-layout__intro"><?php the_content(); ?></div>
				<?php endif; ?>

				<ul class="contact-cards">
					<li class="contact-card">
						<span class="contact-card__icon" aria-hidden="true">
							<svg viewBox="0 0 24 24"><path d="M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1l-2.2 2.2z"/></svg>
						</span>
						<div>
							<h3><?php esc_html_e( 'Call / WhatsApp', 'paradise' ); ?></h3>
							<a href="tel:<?php echo esc_attr( preg_replace( '/\s+/', '', $paradise_phone ) ); ?>"><?php echo esc_html( $paradise_phone ); ?></a><br />
							<a href="<?php echo esc_url( paradise_whatsapp_url( __( 'Hello Paradise & Co. Properties!', 'paradise' ) ) ); ?>" target="_blank" rel="noopener noreferrer"><?php esc_html_e( 'Start a WhatsApp chat →', 'paradise' ); ?></a>
						</div>
					</li>
					<li class="contact-card">
						<span class="contact-card__icon" aria-hidden="true">
							<svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 4.8a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.4-1a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0zM12 8.8a3.2 3.2 0 1 1 0 6.4 3.2 3.2 0 0 1 0-6.4z"/></svg>
						</span>
						<div>
							<h3><?php esc_html_e( 'Instagram', 'paradise' ); ?></h3>
							<a href="<?php echo esc_url( 'https://instagram.com/' . $paradise_instagram ); ?>" target="_blank" rel="noopener noreferrer">@<?php echo esc_html( $paradise_instagram ); ?></a>
						</div>
					</li>
					<li class="contact-card">
						<span class="contact-card__icon" aria-hidden="true">
							<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>
						</span>
						<div>
							<h3><?php esc_html_e( 'Email', 'paradise' ); ?></h3>
							<a href="mailto:<?php echo esc_attr( $paradise_email ); ?>"><?php echo esc_html( $paradise_email ); ?></a>
						</div>
					</li>
					<li class="contact-card">
						<span class="contact-card__icon" aria-hidden="true">
							<svg viewBox="0 0 24 24"><path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/></svg>
						</span>
						<div>
							<h3><?php esc_html_e( 'Office', 'paradise' ); ?></h3>
							<p><?php echo esc_html( paradise_get_option( 'address' ) ); ?></p>
						</div>
					</li>
				</ul>
			</div>

			<div class="contact-layout__form reveal">
				<h2><?php esc_html_e( 'Send Us a Message', 'paradise' ); ?></h2>
				<?php paradise_contact_form(); ?>
			</div>
		</div>
	</section>

	<section class="section section--flush">
		<div class="map-embed reveal">
			<iframe
				src="<?php echo esc_url( paradise_get_option( 'map_embed' ) ); ?>"
				title="<?php esc_attr_e( 'Map of Calabar, Cross River State', 'paradise' ); ?>"
				loading="lazy"
				referrerpolicy="no-referrer-when-downgrade"
				allowfullscreen></iframe>
		</div>
	</section>

	<?php
endwhile;

get_footer();
