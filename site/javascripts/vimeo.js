$( function() {
  $( ".vimeo" ).each( function( index, element ) {
    var link = $( "a", element )
    var video_url = link.attr( "href" )
    $.getJSON(
      "http://vimeo.com/api/oembed.json?callback=?",
      { url: video_url, width: 640, autoplay: true, portrait: false },
      function( data ) {
        link.html(
          $( "<img>", { src: data.thumbnail_url } )
        ).before(
          $( "<h2>" + data.title + "</h2>" )
        );
        link.click( function() {
          link.html( data.html );
          return false;
        });
      }
    );
  });
});
