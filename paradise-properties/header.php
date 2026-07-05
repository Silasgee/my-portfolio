<?php
/**
 * Site header with sticky navigation.
 *
 * @package Paradise
 */
?>
<!doctype html>
<html <?php language_attributes(); ?> class="no-js">
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="profile" href="https://gmpg.org/xfn/11" />
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<a class="skip-link screen-reader-text" href="#main"><?php esc_html_e( 'Skip to content', 'paradise' ); ?></a>

<div class="topbar">
	<div class="container topbar__inner">
		<span class="topbar__item">
			<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/></svg>
			<?php echo esc_html( paradise_get_option( 'address' ) ); ?>
		</span>
		<span class="topbar__item">
			<a href="tel:<?php echo esc_attr( preg_replace( '/\s+/', '', paradise_get_option( 'phone_display' ) ) ); ?>">
				<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1l-2.2 2.2z"/></svg>
				<?php echo esc_html( paradise_get_option( 'phone_display' ) ); ?>
			</a>
		</span>
	</div>
</div>

<header class="site-header" id="site-header">
	<div class="container site-header__inner">
		<div class="site-branding">
			<?php if ( has_custom_logo() ) : ?>
				<?php the_custom_logo(); ?>
			<?php else : ?>
				<a class="site-branding__link" href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
					<span class="site-branding__mark" aria-hidden="true">
						<svg viewBox="0 0 48 48"><path d="M24 6 6 22h5v18h10V28h6v12h10V22h5L24 6z"/></svg>
					</span>
					<span class="site-branding__text">
						<span class="site-branding__name">Paradise &amp; Co.</span>
						<span class="site-branding__tagline"><?php esc_html_e( 'Properties · Calabar', 'paradise' ); ?></span>
					</span>
				</a>
			<?php endif; ?>
		</div>

		<nav class="site-nav" id="site-nav" aria-label="<?php esc_attr_e( 'Primary', 'paradise' ); ?>">
			<?php
			wp_nav_menu(
				array(
					'theme_location' => 'primary',
					'menu_class'     => 'nav-menu',
					'container'      => false,
					'fallback_cb'    => 'paradise_fallback_menu',
					'depth'          => 2,
				)
			);
			?>
			<a class="btn btn--gold site-nav__cta" href="<?php echo esc_url( paradise_whatsapp_url( __( 'Hello Paradise & Co. Properties! I would like to make an inquiry.', 'paradise' ) ) ); ?>" target="_blank" rel="noopener noreferrer">
				<?php esc_html_e( 'Chat on WhatsApp', 'paradise' ); ?>
			</a>
		</nav>

		<button class="nav-toggle" id="nav-toggle" aria-controls="site-nav" aria-expanded="false">
			<span class="screen-reader-text"><?php esc_html_e( 'Menu', 'paradise' ); ?></span>
			<span class="nav-toggle__bar"></span>
			<span class="nav-toggle__bar"></span>
			<span class="nav-toggle__bar"></span>
		</button>
	</div>
</header>

<main id="main" class="site-main">
