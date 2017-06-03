$(function() {
  var trickOutContent = function() {
    $("#proudify_github").proudify({'username':'iangreenleaf'});
    $("#proudify_coderwall").proudify({'username':'iangreenleaf', 'service':'coderwall'});
    $("#proudify_coderwall2").proudify({'username':'iangreenleaf', 'service':'coderwall'});
  };
  var menuTransition = function(_, xhr, options) {
    $("nav li.current").removeClass("current");
    $(options.clickedElement).parent("li").addClass("current");
  }

  var pageSetup = function() {
    trickOutContent();
    $("#offerings").simpleTabs({navSelector: "ul.tabs", scrollTo: function() { return 0 }});
  }

  $("body").bind("pjax:start", menuTransition);
  $("body").bind("pjax:end", pageSetup);
  pageSetup();
  $("nav li a").pjax("#content", { fragment: ".shim" });
});
