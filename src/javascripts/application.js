$(function() {
  var trickOutContent = function() {
    $("#proudify_github").proudify({'username':'iangreenleaf'});
    $("#proudify_coderwall").proudify({'username':'iangreenleaf', 'service':'coderwall'});
    $("#proudify_coderwall2").proudify({'username':'iangreenleaf', 'service':'coderwall'});
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
  };
  trickOutContent();
  $("body").bind("pjax:end", trickOutContent);
  $("nav li a").pjax("#content", { fragment: ".shim" });
});
