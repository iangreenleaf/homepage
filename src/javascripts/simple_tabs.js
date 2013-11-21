/*
 * Original source:
 * http://css-tricks.com/organic-tabs/
 *
 * Modified by Ian Young
 */
(function($) {

  $.simpleTabs = function(el, options) {

    var base = this;
    base.options = $.extend({},$.simpleTabs.defaultOptions, options);
    base.$el = $(el);
    base.$nav = base.$el.find(base.options.navSelector);

    base.init = function() {

      base.$nav.delegate("li > a", "click", function(event) {
        if (base.options.beforeHook) {
          // Call the hook within this context
          if (base.options.beforeHook.call(this, event) === false) {
            return false;
          }
        }

        // Figure out current list via CSS class
        var curList = base.$el.find("a."+base.options.activeTabClass).attr("href");

        // List moving to
        var $newList = $(this);

        // Figure out ID of new list
        var listID = $newList.attr("href");

        if (listID != curList) {

          base.$el.find(curList).hide();
          base.$el.find(listID).show();

          // Remove highlighting - Add to just-clicked tab
          base.$nav.find("li, li > a").removeClass(base.options.activeTabClass);
          $newList.addClass(base.options.activeTabClass);
          $newList.parent("li").addClass(base.options.activeTabClass);

          // Add this anchor to the URL
          if (base.options.modifyURL
              && listID[0] === "#"
              && typeof history.replaceState != "undefined") {
            l = window.location;
            history.replaceState(null, null, l.protocol + "//" + l.host + l.pathname + l.search + listID);
          }
        }

        $(this).blur()

        // Stop propagation and bubbling
        return false;
      });

      // Hide other tabs on page load
      var inactiveTabs = base.$nav.find("li > a:not(."+base.options.activeTabClass+")");
      inactiveTabs.each(function (i,tab) {
        var anchor = $(tab).attr("href").substring(1);
        base.$el.find("#"+anchor).hide();
      });
      // Activate correct tab if anchor given
      if (window.location.hash) {
        var activatedTab = base.$nav.find("li > a[href="+window.location.hash+"]");
        if (activatedTab.length) {
          activatedTab.click();
          // Chrome is a jerk about scrolling
          setTimeout(function() { $(window).scrollTop(0); }, 1 );
        }
      }
    };
    base.init();
  };

  $.simpleTabs.defaultOptions = {
    // What class the currently active nav item gets
    activeTabClass: "active"
    // Selector to identify the nav list. Scoped within the calling element.
    , navSelector: ".tabs-nav"
    // Inject the tab's anchor into the URL
    , modifyURL: true
    // Run a function before tabbing. If it returns false, tab is canceled.
    , beforeHook: null
    // Where to scroll the viewport after loading a tab on page init.
    // Function that takes the container element as an argument and returns a scroll position.
    // Default: top of the nav element.
    , scrollTo: function(el) { return el.position().top }
  };

  $.fn.simpleTabs = function(options) {
    return this.each(function() {
      (new $.simpleTabs(this, options));
    });
  };

})(jQuery);
