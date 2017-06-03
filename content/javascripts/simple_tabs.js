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

      var tabNav = function(clickedTab, options) {
        var opts = $.extend({}, base.options, options);

        // Figure out current list via CSS class
        var curList = base.$el.find("a."+opts.activeTabClass).attr("href");

        // List moving to
        var $newList = $(clickedTab);

        // Figure out ID of new list
        var listID = $newList.attr("href");

        if (listID != curList) {

          base.$el.find(curList).hide();
          base.$el.find(listID).show();

          // Remove highlighting - Add to just-clicked tab
          base.$nav.find("li, li > a").removeClass(opts.activeTabClass);
          $newList.addClass(opts.activeTabClass);
          $newList.parent("li").addClass(opts.activeTabClass);

          // Add this anchor to the URL
          if (opts.modifyURL
              && listID[0] === "#"
              && typeof history[opts.historyFunc] != "undefined") {
            l = window.location;
            history[opts.historyFunc](null, null, l.protocol + "//" + l.host + l.pathname + l.search + listID);
          }
        }
      };
      base.$nav.delegate("li > a", "click", function(event) { tabNav($(this)); $(this).blur(); return false; });

      // Hide other tabs on page load
      var inactiveTabs = base.$nav.find("li > a:not(."+base.options.activeTabClass+")");
      inactiveTabs.each(function (i,tab) {
        var anchor = $(tab).attr("href").substring(1);
        base.$el.find("#"+anchor).hide();
      });
      // Activate correct tab if anchor given
      var findTabByHash = function() {
        if (window.location.hash) {
          var activatedTab = base.$nav.find("li > a[href="+window.location.hash+"]");
          if (activatedTab.length) {
            tabNav(activatedTab, { modifyURL: false });
            return true;
          }
        }
        // If we didn't successfully navigate by hash, pick first tab instead
        tabNav(base.$nav.find("li:first-child > a"), { modifyURL: false });
        return false;
      };
      if (findTabByHash()) {
        // Chrome is a jerk about scrolling
        setTimeout(function() { $(window).scrollTop(0); }, 1 );
      }
      // Change tabs when navigating
      $(window).on('popstate', function() { findTabByHash(); return true; });
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
    // Where to scroll the viewport after loading a tab on page init.
    // Function that takes the container element as an argument and returns a scroll position.
    // Default: top of the nav element.
    , scrollTo: function(el) { return el.position().top }
    // Which function to use to modify the browser history. Only applies if options.modifyURL == true.
    // Possible options are 'pushState' (default) and 'replaceState'
    , historyFunc: 'pushState'
  };

  $.fn.simpleTabs = function(options) {
    return this.each(function() {
      (new $.simpleTabs(this, options));
    });
  };

})(jQuery);
