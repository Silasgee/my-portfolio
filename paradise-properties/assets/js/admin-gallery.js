/**
 * Property gallery picker (admin) — uses the WordPress media modal
 * and stores selected attachment IDs in the hidden #paradise_gallery field.
 */
( function ( $ ) {
	'use strict';

	var frame;
	var $box = $( '#paradise-gallery-box' );

	if ( ! $box.length ) {
		return;
	}

	var $input = $box.find( '#paradise_gallery' );
	var $list = $box.find( '.paradise-gallery-list' );

	function currentIds() {
		return $input
			.val()
			.split( ',' )
			.filter( function ( id ) {
				return '' !== id;
			} );
	}

	function syncInput() {
		var ids = [];
		$list.find( 'li' ).each( function () {
			ids.push( $( this ).data( 'id' ) );
		} );
		$input.val( ids.join( ',' ) );
	}

	$box.on( 'click', '#paradise-gallery-add', function ( e ) {
		e.preventDefault();

		if ( frame ) {
			frame.open();
			return;
		}

		frame = wp.media( {
			title: 'Select gallery images',
			button: { text: 'Add to gallery' },
			library: { type: 'image' },
			multiple: true
		} );

		frame.on( 'select', function () {
			var existing = currentIds();
			frame
				.state()
				.get( 'selection' )
				.each( function ( attachment ) {
					var id = String( attachment.id );
					if ( -1 !== existing.indexOf( id ) ) {
						return;
					}
					var sizes = attachment.get( 'sizes' ) || {};
					var thumb = ( sizes.thumbnail || sizes.full || {} ).url || attachment.get( 'url' );
					$list.append(
						'<li data-id="' + id + '" style="position:relative;">' +
							'<img src="' + thumb + '" alt="" style="width:90px;height:90px;object-fit:cover;border-radius:6px;display:block;" />' +
							'<button type="button" class="paradise-gallery-remove button-link" aria-label="Remove image" style="position:absolute;top:-6px;right:-6px;background:#b32d2e;color:#fff;border-radius:50%;width:20px;height:20px;line-height:18px;text-align:center;text-decoration:none;">&times;</button>' +
						'</li>'
					);
				} );
			syncInput();
		} );

		frame.open();
	} );

	$box.on( 'click', '.paradise-gallery-remove', function ( e ) {
		e.preventDefault();
		$( this ).closest( 'li' ).remove();
		syncInput();
	} );
} )( jQuery );
