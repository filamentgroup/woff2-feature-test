var supportsWoff2 = (function( win ){
	if( !( "FontFace" in win ) ) {
		return false;
	}

	var f = new win.FontFace( "t", 'url( "data:application/font-woff2," ) format( "woff2" )', {} );
	f.load()['catch'](function() {});

	return f.status == 'loading';
})( this );
