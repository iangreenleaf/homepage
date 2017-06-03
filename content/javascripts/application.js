//= require pjax.js
//= require proudify.js
//= require simple_tabs.js

$(function() {
  var trickOutContent = function() {
    $("#proudify_github").proudify({'username':'iangreenleaf'});
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
