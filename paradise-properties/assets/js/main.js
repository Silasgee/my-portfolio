/**
 * Paradise & Co. Properties — front-end behaviour.
 * Mobile nav, sticky header shadow, scroll-reveal, gallery lightbox.
 */
( function () {
	'use strict';

	document.documentElement.classList.remove( 'no-js' );

	/* Mobile navigation toggle */
	var toggle = document.getElementById( 'nav-toggle' );
	var nav = document.getElementById( 'site-nav' );

	if ( toggle && nav ) {
		toggle.addEventListener( 'click', function () {
			var open = nav.classList.toggle( 'is-open' );
			toggle.setAttribute( 'aria-expanded', open ? 'true' : 'false' );
		} );

		document.addEventListener( 'keydown', function ( event ) {
			if ( 'Escape' === event.key && nav.classList.contains( 'is-open' ) ) {
				nav.classList.remove( 'is-open' );
				toggle.setAttribute( 'aria-expanded', 'false' );
				toggle.focus();
			}
		} );
	}

	/* Sticky header shadow once the page scrolls */
	var header = document.getElementById( 'site-header' );
	if ( header ) {
		var onScroll = function () {
			header.classList.toggle( 'is-scrolled', window.scrollY > 8 );
		};
		window.addEventListener( 'scroll', onScroll, { passive: true } );
		onScroll();
	}

	/* Scroll-reveal via IntersectionObserver */
	var revealables = document.querySelectorAll( '.reveal' );
	if ( revealables.length && 'IntersectionObserver' in window ) {
		var observer = new IntersectionObserver(
			function ( entries ) {
				entries.forEach( function ( entry ) {
					if ( entry.isIntersecting ) {
						entry.target.classList.add( 'is-visible' );
						observer.unobserve( entry.target );
					}
				} );
			},
			{ threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
		);
		revealables.forEach( function ( el ) {
			observer.observe( el );
		} );
	} else {
		revealables.forEach( function ( el ) {
			el.classList.add( 'is-visible' );
		} );
	}

	/* Property gallery: thumbnails swap the main image; click main image
	   (or a thumb) to open the lightbox. */
	var galleryMain = document.querySelector( '.property-gallery__main img' );
	var lightbox = document.getElementById( 'paradise-lightbox' );

	function openLightbox( src, alt ) {
		if ( ! lightbox ) {
			return;
		}
		var img = lightbox.querySelector( 'img' );
		img.src = src;
		img.alt = alt || '';
		lightbox.hidden = false;
		document.body.style.overflow = 'hidden';
		lightbox.querySelector( '.lightbox__close' ).focus();
	}

	function closeLightbox() {
		if ( ! lightbox || lightbox.hidden ) {
			return;
		}
		lightbox.hidden = true;
		document.body.style.overflow = '';
	}

	document.querySelectorAll( '.property-gallery__thumb' ).forEach( function ( thumb ) {
		thumb.addEventListener( 'click', function () {
			var full = thumb.getAttribute( 'data-full' );
			if ( full && galleryMain ) {
				galleryMain.src = full;
				galleryMain.removeAttribute( 'srcset' );
				galleryMain.removeAttribute( 'sizes' );
			}
		} );
	} );

	if ( galleryMain && lightbox ) {
		galleryMain.style.cursor = 'zoom-in';
		galleryMain.addEventListener( 'click', function () {
			openLightbox( galleryMain.currentSrc || galleryMain.src, galleryMain.alt );
		} );
	}

	if ( lightbox ) {
		lightbox.querySelector( '.lightbox__close' ).addEventListener( 'click', closeLightbox );
		lightbox.addEventListener( 'click', function ( event ) {
			if ( event.target === lightbox ) {
				closeLightbox();
			}
		} );
		document.addEventListener( 'keydown', function ( event ) {
			if ( 'Escape' === event.key ) {
				closeLightbox();
			}
		} );
	}
} )();
