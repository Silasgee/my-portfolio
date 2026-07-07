<?php
/**
 * Template Name: About Us
 *
 * @package Paradise
 */

get_header();

while ( have_posts() ) :
	the_post();
	?>

	<section class="page-hero">
		<div class="container">
			<h1 class="page-hero__title"><?php the_title(); ?></h1>
			<p class="page-hero__subtitle"><?php esc_html_e( 'Your trusted partner for genuine land investment in Calabar, Cross River State.', 'paradise' ); ?></p>
		</div>
	</section>

	<section class="section">
		<div class="container about-intro">
			<div class="about-intro__text reveal">
				<?php the_content(); ?>
			</div>
			<figure class="about-intro__media reveal">
				<?php if ( has_post_thumbnail() ) : ?>
					<?php the_post_thumbnail( 'paradise-card' ); ?>
				<?php else : ?>
					<img src="<?php echo esc_url( PARADISE_URI . '/assets/img/estate-2.svg' ); ?>" alt="<?php esc_attr_e( 'A developing estate in Calabar', 'paradise' ); ?>" width="800" height="560" loading="lazy" />
				<?php endif; ?>
			</figure>
		</div>
	</section>

	<section class="section section--tinted">
		<div class="container">
			<?php
			paradise_section_heading(
				__( 'Our Values', 'paradise' ),
				__( 'What We Stand For', 'paradise' )
			);

			$paradise_values = array(
				array(
					'title' => __( 'Integrity First', 'paradise' ),
					'text'  => __( 'We only sell land we have verified ourselves. Every document we issue is genuine, registered and independently verifiable.', 'paradise' ),
				),
				array(
					'title' => __( 'Client Before Commission', 'paradise' ),
					'text'  => __( 'Free inspections, honest advice and zero pressure. We would rather lose a sale than sell you the wrong plot.', 'paradise' ),
				),
				array(
					'title' => __( 'Long-Term Partnership', 'paradise' ),
					'text'  => __( 'Our relationship does not end at payment. We support your documentation, development and future resale.', 'paradise' ),
				),
			);
			?>
			<div class="feature-grid feature-grid--three">
				<?php foreach ( $paradise_values as $paradise_value ) : ?>
					<div class="feature-card reveal">
						<span class="feature-card__icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 1 3 5v6c0 5.6 3.8 10.7 9 12 5.2-1.3 9-6.4 9-12V5l-9-4zm-1.5 15.5-4-4L8 11l2.5 2.5L16 8l1.5 1.5-7 7z"/></svg></span>
						<h3><?php echo esc_html( $paradise_value['title'] ); ?></h3>
						<p><?php echo esc_html( $paradise_value['text'] ); ?></p>
					</div>
				<?php endforeach; ?>
			</div>
		</div>
	</section>

	<section class="section">
		<div class="container container--narrow">
			<?php
			paradise_section_heading(
				__( 'How It Works', 'paradise' ),
				__( 'From Inquiry to Ownership in 4 Steps', 'paradise' )
			);

			$paradise_steps = array(
				array( __( 'Reach Out', 'paradise' ), __( 'Call, WhatsApp or send the contact form. Tell us your budget and what you want to achieve.', 'paradise' ) ),
				array( __( 'Inspect the Land', 'paradise' ), __( 'Join a free physical inspection — or a live video inspection if you are abroad.', 'paradise' ) ),
				array( __( 'Reserve with ₦500,000', 'paradise' ), __( 'Lock in your plot and today’s price with the initial deposit, then spread the balance flexibly.', 'paradise' ) ),
				array( __( 'Receive Your Documents', 'paradise' ), __( 'Get your receipt, registered survey plan and deed of assignment — and start building when ready.', 'paradise' ) ),
			);
			?>
			<ol class="steps reveal">
				<?php foreach ( $paradise_steps as $paradise_index => $paradise_step ) : ?>
					<li class="steps__item">
						<span class="steps__number" aria-hidden="true"><?php echo esc_html( $paradise_index + 1 ); ?></span>
						<div>
							<h3><?php echo esc_html( $paradise_step[0] ); ?></h3>
							<p><?php echo esc_html( $paradise_step[1] ); ?></p>
						</div>
					</li>
				<?php endforeach; ?>
			</ol>
		</div>
	</section>

	<section class="cta-band">
		<div class="container cta-band__inner reveal">
			<h2><?php esc_html_e( 'Let’s Find Your Perfect Plot', 'paradise' ); ?></h2>
			<p><?php esc_html_e( 'Browse our available properties or chat with us for personalised guidance.', 'paradise' ); ?></p>
			<div class="cta-band__actions">
				<a class="btn btn--gold btn--lg" href="<?php echo esc_url( get_post_type_archive_link( 'property' ) ); ?>"><?php esc_html_e( 'View Properties', 'paradise' ); ?></a>
				<a class="btn btn--outline btn--lg" href="<?php echo esc_url( paradise_whatsapp_url( __( 'Hello! I just read about Paradise & Co. Properties and I would like to know more.', 'paradise' ) ) ); ?>" target="_blank" rel="noopener noreferrer"><?php esc_html_e( 'Chat on WhatsApp', 'paradise' ); ?></a>
			</div>
		</div>
	</section>

	<?php
endwhile;

get_footer();
