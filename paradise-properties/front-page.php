<?php
/**
 * Home page: hero, deposit highlight, available properties,
 * why invest, testimonials, FAQ and closing call to action.
 *
 * @package Paradise
 */

get_header();
?>

<section class="hero">
	<div class="hero__backdrop" aria-hidden="true"></div>
	<div class="container hero__inner">
		<div class="hero__content">
			<span class="hero__eyebrow"><?php esc_html_e( 'Verified Land · Calabar, Cross River State', 'paradise' ); ?></span>
			<h1 class="hero__title"><?php echo esc_html( paradise_get_option( 'hero_title' ) ); ?></h1>
			<p class="hero__subtitle"><?php echo esc_html( paradise_get_option( 'hero_subtitle' ) ); ?></p>
			<div class="hero__actions">
				<a class="btn btn--gold btn--lg" href="<?php echo esc_url( get_post_type_archive_link( 'property' ) ); ?>"><?php esc_html_e( 'View Properties', 'paradise' ); ?></a>
				<a class="btn btn--outline btn--lg" href="<?php echo esc_url( paradise_page_url( 'contact' ) ? paradise_page_url( 'contact' ) : paradise_whatsapp_url() ); ?>"><?php esc_html_e( 'Contact Us', 'paradise' ); ?></a>
			</div>
			<ul class="hero__stats">
				<li><strong>230–900</strong><span><?php esc_html_e( 'SQM plot sizes', 'paradise' ); ?></span></li>
				<li><strong>₦1.3M</strong><span><?php esc_html_e( 'Plots from', 'paradise' ); ?></span></li>
				<li><strong>₦500K</strong><span><?php esc_html_e( 'Initial deposit', 'paradise' ); ?></span></li>
			</ul>
		</div>
	</div>
</section>

<div class="deposit-banner" role="note">
	<div class="container deposit-banner__inner">
		<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1 3 5v6c0 5.6 3.8 10.7 9 12 5.2-1.3 9-6.4 9-12V5l-9-4zm-1.5 15.5-4-4L8 11l2.5 2.5L16 8l1.5 1.5-7 7z"/></svg>
		<p><strong><?php echo esc_html( paradise_get_option( 'deposit_text' ) ); ?></strong> — <?php esc_html_e( 'reserve any plot today and spread the balance with a flexible payment plan.', 'paradise' ); ?></p>
		<a class="btn btn--white" href="<?php echo esc_url( paradise_whatsapp_url( __( 'Hello! I would like to reserve a plot with the ₦500,000 initial deposit.', 'paradise' ) ) ); ?>" target="_blank" rel="noopener noreferrer"><?php esc_html_e( 'Reserve Now', 'paradise' ); ?></a>
	</div>
</div>

<section class="section" id="properties">
	<div class="container">
		<?php
		paradise_section_heading(
			__( 'Available Properties', 'paradise' ),
			__( 'Genuine Plots, Ready for You', 'paradise' ),
			__( 'Every plot is verified, charted and backed by genuine documentation — choose the size that fits your dream.', 'paradise' )
		);

		$paradise_home_query = new WP_Query(
			array(
				'post_type'      => 'property',
				'posts_per_page' => 3,
				'orderby'        => array( 'menu_order' => 'ASC', 'date' => 'DESC' ),
			)
		);
		?>
		<?php if ( $paradise_home_query->have_posts() ) : ?>
			<div class="property-grid">
				<?php
				while ( $paradise_home_query->have_posts() ) {
					$paradise_home_query->the_post();
					paradise_property_card( get_the_ID() );
				}
				wp_reset_postdata();
				?>
			</div>
			<p class="section__more reveal">
				<a class="btn btn--primary btn--lg" href="<?php echo esc_url( get_post_type_archive_link( 'property' ) ); ?>"><?php esc_html_e( 'Browse All Properties', 'paradise' ); ?></a>
			</p>
		<?php else : ?>
			<p class="section__empty"><?php esc_html_e( 'New plots are being added. Contact us on WhatsApp for current availability.', 'paradise' ); ?></p>
		<?php endif; ?>
	</div>
</section>

<section class="section section--tinted" id="why-us">
	<div class="container">
		<?php
		paradise_section_heading(
			__( 'Why Invest With Us', 'paradise' ),
			__( 'Land Investment Without the Worry', 'paradise' ),
			__( 'We built our reputation on transparency — from verified titles to flexible payments and locations that grow in value.', 'paradise' )
		);

		$paradise_reasons = array(
			array(
				'icon'  => '<path d="M12 1 3 5v6c0 5.6 3.8 10.7 9 12 5.2-1.3 9-6.4 9-12V5l-9-4zm-1.5 15.5-4-4L8 11l2.5 2.5L16 8l1.5 1.5-7 7z"/>',
				'title' => __( 'Verified & Secure Properties', 'paradise' ),
				'text'  => __( 'Every plot passes rigorous due diligence — root-of-title checks, registered surveys and physical charting — before it reaches you.', 'paradise' ),
			),
			array(
				'icon'  => '<path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/>',
				'title' => __( 'Strategic Locations', 'paradise' ),
				'text'  => __( 'Plots positioned in fast-developing corridors of Calabar, perfect for residential living or commercial development.', 'paradise' ),
			),
			array(
				'icon'  => '<path d="M11 8h2v6h-2V8zm1-6C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm-1-4h2v2h-2v-2z" transform="rotate(180 12 12)"/><path d="M4 18h16v2H4zM7 12h2v4H7zm4-3h2v7h-2zm4-4h2v11h-2z"/>',
				'title' => __( 'Flexible Payment Plans', 'paradise' ),
				'text'  => __( 'Start with just ₦500,000 and spread the balance over a plan that suits your budget — no bank stress, no hidden charges.', 'paradise' ),
			),
			array(
				'icon'  => '<path d="M3.5 18.5 2 17l7.5-7.5 4 4L20 7h-3V5h6v6h-2V8.5l-7.5 7.5-4-4-6 6.5z"/>',
				'title' => __( 'Excellent Return on Investment', 'paradise' ),
				'text'  => __( "Calabar's land values keep appreciating. Buy today at ground-floor prices and watch your investment grow year after year.", 'paradise' ),
			),
		);
		?>
		<div class="feature-grid">
			<?php foreach ( $paradise_reasons as $paradise_reason ) : ?>
				<div class="feature-card reveal">
					<span class="feature-card__icon" aria-hidden="true"><svg viewBox="0 0 24 24"><?php echo $paradise_reason['icon']; // phpcs:ignore WordPress.Security.EscapeOutput ?></svg></span>
					<h3><?php echo esc_html( $paradise_reason['title'] ); ?></h3>
					<p><?php echo esc_html( $paradise_reason['text'] ); ?></p>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<?php
$paradise_testimonials = new WP_Query(
	array(
		'post_type'      => 'testimonial',
		'posts_per_page' => 6,
	)
);
if ( $paradise_testimonials->have_posts() ) :
	?>
	<section class="section" id="testimonials">
		<div class="container">
			<?php
			paradise_section_heading(
				__( 'Testimonials', 'paradise' ),
				__( 'What Our Clients Say', 'paradise' ),
				__( 'Families and investors across Nigeria and the diaspora trust Paradise & Co. Properties.', 'paradise' )
			);
			?>
			<div class="testimonial-grid">
				<?php
				while ( $paradise_testimonials->have_posts() ) :
					$paradise_testimonials->the_post();
					?>
					<figure class="testimonial-card reveal">
						<div class="testimonial-card__stars" aria-hidden="true">★★★★★</div>
						<blockquote><?php echo esc_html( wp_strip_all_tags( get_the_content() ) ); ?></blockquote>
						<figcaption>
							<strong><?php the_title(); ?></strong>
							<?php $paradise_role = get_post_meta( get_the_ID(), '_paradise_role', true ); ?>
							<?php if ( $paradise_role ) : ?>
								<span><?php echo esc_html( $paradise_role ); ?></span>
							<?php endif; ?>
						</figcaption>
					</figure>
				<?php endwhile; ?>
				<?php wp_reset_postdata(); ?>
			</div>
		</div>
	</section>
<?php endif; ?>

<section class="section section--tinted" id="faq">
	<div class="container container--narrow">
		<?php
		paradise_section_heading(
			__( 'FAQ', 'paradise' ),
			__( 'Frequently Asked Questions', 'paradise' ),
			__( 'Everything you need to know before securing your plot.', 'paradise' )
		);

		$paradise_faqs = apply_filters(
			'paradise_faqs',
			array(
				array(
					'q' => __( 'Are the lands genuinely free from disputes ("omo onile" issues)?', 'paradise' ),
					'a' => __( 'Yes. Every plot we sell undergoes thorough due diligence, including root-of-title verification and physical charting, before it is offered to clients. You buy dispute-free land with genuine documentation.', 'paradise' ),
				),
				array(
					'q' => __( 'What documents will I receive after purchase?', 'paradise' ),
					'a' => __( 'You receive a receipt of payment, a registered survey plan and a deed of assignment. We also support clients who wish to process further title documents.', 'paradise' ),
				),
				array(
					'q' => __( 'How does the ₦500,000 initial deposit work?', 'paradise' ),
					'a' => __( 'The initial deposit of ₦500,000 reserves your chosen plot at the current price. You then complete the balance through a flexible payment plan agreed with our team — no interest, no hidden charges.', 'paradise' ),
				),
				array(
					'q' => __( 'Can I inspect the land before paying?', 'paradise' ),
					'a' => __( 'Absolutely — we encourage it. Free inspections are arranged weekly, and for diaspora clients we conduct detailed live video inspections.', 'paradise' ),
				),
				array(
					'q' => __( 'Can I buy from abroad?', 'paradise' ),
					'a' => __( 'Yes. Many of our clients are in the diaspora. We handle video inspections, share all documents with your lawyer for independent verification, and keep you updated at every step.', 'paradise' ),
				),
				array(
					'q' => __( 'How soon can I start building?', 'paradise' ),
					'a' => __( 'Once payment is completed and your documents are issued, you can begin development immediately. There is no mandatory development timeline.', 'paradise' ),
				),
			)
		);
		?>
		<div class="faq-list reveal">
			<?php foreach ( $paradise_faqs as $paradise_faq ) : ?>
				<details class="faq-item">
					<summary>
						<span><?php echo esc_html( $paradise_faq['q'] ); ?></span>
						<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15.5 4.5 8 6 6.5l6 6 6-6L19.5 8 12 15.5z"/></svg>
					</summary>
					<p><?php echo esc_html( $paradise_faq['a'] ); ?></p>
				</details>
			<?php endforeach; ?>
		</div>

		<script type="application/ld+json">
			<?php
			$paradise_faq_schema = array(
				'@context'   => 'https://schema.org',
				'@type'      => 'FAQPage',
				'mainEntity' => array(),
			);
			foreach ( $paradise_faqs as $paradise_faq ) {
				$paradise_faq_schema['mainEntity'][] = array(
					'@type'          => 'Question',
					'name'           => $paradise_faq['q'],
					'acceptedAnswer' => array(
						'@type' => 'Answer',
						'text'  => $paradise_faq['a'],
					),
				);
			}
			echo wp_json_encode( $paradise_faq_schema );
			?>
		</script>
	</div>
</section>

<section class="cta-band">
	<div class="container cta-band__inner reveal">
		<h2><?php esc_html_e( 'Ready to Own Land in Calabar?', 'paradise' ); ?></h2>
		<p><?php esc_html_e( 'Speak with our team today — get answers, book a free inspection and reserve your plot with just ₦500,000.', 'paradise' ); ?></p>
		<div class="cta-band__actions">
			<a class="btn btn--gold btn--lg" href="<?php echo esc_url( paradise_whatsapp_url( __( 'Hello Paradise & Co. Properties! I am ready to own land in Calabar.', 'paradise' ) ) ); ?>" target="_blank" rel="noopener noreferrer"><?php esc_html_e( 'Chat on WhatsApp', 'paradise' ); ?></a>
			<?php if ( paradise_page_url( 'contact' ) ) : ?>
				<a class="btn btn--outline btn--lg" href="<?php echo esc_url( paradise_page_url( 'contact' ) ); ?>"><?php esc_html_e( 'Contact Us', 'paradise' ); ?></a>
			<?php endif; ?>
		</div>
	</div>
</section>

<?php
get_footer();
