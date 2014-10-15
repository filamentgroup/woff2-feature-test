var supportsWoff2 = (function( win ){
	if( !( "FontFace" in win ) ) {
		return false;
	}

	var f = new win.FontFace( "t", 'url( "data:font/woff2;base64," ) format( "woff2" )' );
	f.load();

	return f.status == 'loading';
})( this );