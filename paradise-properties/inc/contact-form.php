<?php
/**
 * Native contact form: renders the form and handles submission via
 * admin-post.php, emailing the site admin. No plugin required.
 *
 * @package Paradise
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Handle a contact form submission.
 */
function paradise_handle_contact_form() {
	$redirect = wp_get_referer() ? wp_get_referer() : home_url( '/' );
	$redirect = remove_query_arg( array( 'contact', '_wpnonce' ), $redirect );

	if ( ! isset( $_POST['paradise_contact_nonce'] ) || ! wp_verify_nonce( sanitize_key( $_POST['paradise_contact_nonce'] ), 'paradise_contact' ) ) {
		wp_safe_redirect( add_query_arg( 'contact', 'error', $redirect ) );
		exit;
	}

	// Honeypot — bots fill every field.
	if ( ! empty( $_POST['paradise_website'] ) ) {
		wp_safe_redirect( add_query_arg( 'contact', 'sent', $redirect ) );
		exit;
	}

	$name    = isset( $_POST['contact_name'] ) ? sanitize_text_field( wp_unslash( $_POST['contact_name'] ) ) : '';
	$email   = isset( $_POST['contact_email'] ) ? sanitize_email( wp_unslash( $_POST['contact_email'] ) ) : '';
	$phone   = isset( $_POST['contact_phone'] ) ? sanitize_text_field( wp_unslash( $_POST['contact_phone'] ) ) : '';
	$subject = isset( $_POST['contact_subject'] ) ? sanitize_text_field( wp_unslash( $_POST['contact_subject'] ) ) : '';
	$message = isset( $_POST['contact_message'] ) ? sanitize_textarea_field( wp_unslash( $_POST['contact_message'] ) ) : '';

	if ( ! $name || ! is_email( $email ) || ! $message ) {
		wp_safe_redirect( add_query_arg( 'contact', 'invalid', $redirect ) );
		exit;
	}

	$to   = get_option( 'admin_email' );
	$body = sprintf(
		"%s\n\n%s: %s\n%s: %s\n%s: %s\n\n%s:\n%s",
		__( 'New inquiry from the Paradise & Co. Properties website.', 'paradise' ),
		__( 'Name', 'paradise' ),
		$name,
		__( 'Email', 'paradise' ),
		$email,
		__( 'Phone', 'paradise' ),
		$phone ? $phone : '—',
		__( 'Message', 'paradise' ),
		$message
	);

	$mail_subject = sprintf( '[%s] %s', get_bloginfo( 'name' ), $subject ? $subject : __( 'Website Inquiry', 'paradise' ) );

	wp_mail( $to, $mail_subject, $body, array( 'Reply-To: ' . $name . ' <' . $email . '>' ) );

	wp_safe_redirect( add_query_arg( 'contact', 'sent', $redirect ) );
	exit;
}
add_action( 'admin_post_paradise_contact', 'paradise_handle_contact_form' );
add_action( 'admin_post_nopriv_paradise_contact', 'paradise_handle_contact_form' );

/**
 * Render the contact form with status notices.
 */
function paradise_contact_form() {
	$status = isset( $_GET['contact'] ) ? sanitize_key( $_GET['contact'] ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
	?>
	<?php if ( 'sent' === $status ) : ?>
		<div class="form-notice form-notice--success" role="status">
			<?php esc_html_e( 'Thank you! Your message has been sent. We will get back to you shortly — or reach us instantly on WhatsApp.', 'paradise' ); ?>
		</div>
	<?php elseif ( 'invalid' === $status ) : ?>
		<div class="form-notice form-notice--error" role="alert">
			<?php esc_html_e( 'Please fill in your name, a valid email address and a message.', 'paradise' ); ?>
		</div>
	<?php elseif ( 'error' === $status ) : ?>
		<div class="form-notice form-notice--error" role="alert">
			<?php esc_html_e( 'Something went wrong. Please try again.', 'paradise' ); ?>
		</div>
	<?php endif; ?>

	<form class="contact-form" method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
		<input type="hidden" name="action" value="paradise_contact" />
		<?php wp_nonce_field( 'paradise_contact', 'paradise_contact_nonce' ); ?>
		<p class="screen-reader-text" aria-hidden="true">
			<label for="paradise_website"><?php esc_html_e( 'Leave this field empty', 'paradise' ); ?></label>
			<input type="text" id="paradise_website" name="paradise_website" tabindex="-1" autocomplete="off" />
		</p>

		<div class="contact-form__row">
			<p class="contact-form__field">
				<label for="contact_name"><?php esc_html_e( 'Full Name', 'paradise' ); ?> <span aria-hidden="true">*</span></label>
				<input type="text" id="contact_name" name="contact_name" required autocomplete="name" />
			</p>
			<p class="contact-form__field">
				<label for="contact_email"><?php esc_html_e( 'Email Address', 'paradise' ); ?> <span aria-hidden="true">*</span></label>
				<input type="email" id="contact_email" name="contact_email" required autocomplete="email" />
			</p>
		</div>
		<div class="contact-form__row">
			<p class="contact-form__field">
				<label for="contact_phone"><?php esc_html_e( 'Phone / WhatsApp', 'paradise' ); ?></label>
				<input type="tel" id="contact_phone" name="contact_phone" autocomplete="tel" />
			</p>
			<p class="contact-form__field">
				<label for="contact_subject"><?php esc_html_e( 'Subject', 'paradise' ); ?></label>
				<input type="text" id="contact_subject" name="contact_subject" placeholder="<?php esc_attr_e( 'e.g. 450 SQM plot inquiry', 'paradise' ); ?>" />
			</p>
		</div>
		<p class="contact-form__field">
			<label for="contact_message"><?php esc_html_e( 'Message', 'paradise' ); ?> <span aria-hidden="true">*</span></label>
			<textarea id="contact_message" name="contact_message" rows="6" required placeholder="<?php esc_attr_e( 'Tell us which plot you are interested in…', 'paradise' ); ?>"></textarea>
		</p>
		<p>
			<button type="submit" class="btn btn--primary btn--lg"><?php esc_html_e( 'Send Message', 'paradise' ); ?></button>
		</p>
	</form>
	<?php
}
