(function() {
  var $, CoderWall, GitHub;
  $ = jQuery;
  GitHub = (function() {
    function GitHub(element, settings) {
      this.element = element;
      this.settings = settings;
      this.wrapper = $('<div>').addClass('proudify github').appendTo(this.element);
      this.list = $('<ul>').addClass('list').appendTo(this.wrapper);
      this.loading = $('<li>').addClass('item loading').html('<span class="desc">Loading ...</span>').appendTo(this.list);
      this.repositories = [];
      this.fetch('https://api.github.com/users/' + this.settings.username + '/repos?callback=?');
    }
    GitHub.prototype.fetch = function(url) {
      var self;
      self = this;
      return $.getJSON(url, function(result) {
        var repository, _i, _len, _ref;
        _ref = result.data;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          repository = _ref[_i];
          self.repositories.push(repository);
        }
        if (result.meta && result.meta.Link) {
          if (result.meta.Link[0][1]['rel'] === 'first') {
            return self.render();
          } else {
            return self.fetch(result.meta.Link[0][0] + '&callback=?');
          }
        } else {
          return self.render();
        }
      });
    };
    GitHub.prototype.render = function() {
      var pushed_at, self;
      pushed_at = new Date();
      pushed_at.setDate(new Date().getDate() - this.settings.pushed_at);
      this.loading.remove();
      self = this;
      $.each(this.repositories.sort(function(a, b) {
        return new Date(b.pushed_at) - new Date(a.pushed_at);
      }), function(i, item) {
        var li;
        if (item.fork === true && self.settings.forks === false) {
          return;
        }
        if (self.settings.num > 0 && i === self.settings.num) {
          return false;
        }
        li = $('<li>').addClass('item').appendTo(self.list);
        $('<a>').attr('href', item.html_url).attr('target', '_blank').html(item.name).appendTo(li);
        $('<span>').addClass('desc').html(item.description).appendTo(li);
        if (new Date(item.pushed_at) > pushed_at) {
          return $('<span>').addClass('status green').html('ONGOING').appendTo(li);
        } else {
          return $('<span>').addClass('status red').html('ON HOLD').appendTo(li);
        }
      });
      return this.element;
    };
    return GitHub;
  })();
  CoderWall = (function() {
    function CoderWall(element, settings) {
      this.element = element;
      this.settings = settings;
      this.wrapper = $('<div>').addClass('proudify coderwall').appendTo(this.element);
      this.list = $('<ul>').addClass('list').appendTo(this.wrapper);
      this.loading = $('<li>').addClass('item loading').html('<span class="desc">Loading ...</span>').appendTo(this.list);
      this.badges = [];
      this.fetch('http://coderwall.com/' + this.settings.username + '.json?callback=?');
    }
    CoderWall.prototype.fetch = function(url) {
      var self;
      self = this;
      return $.getJSON(url, function(result) {
        var badge, _i, _len, _ref;
        _ref = result.data.badges;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          badge = _ref[_i];
          self.badges.push(badge);
        }
        return self.render();
      });
    };
    CoderWall.prototype.render = function() {
      var self;
      this.loading.remove();
      self = this;
      $.each(this.badges, function(i, item) {
        var li, link;
        li = $('<li>').addClass('item').appendTo(self.list);
        link = $('<a>').attr('href', 'shttp://coderwall.com/' + self.settings.username).attr('target', '_blank').appendTo(li);
        return $('<img>').attr('alt', item.name).attr('title', item.description).attr('src', item.badge).appendTo(link);
      });
      return $('<div>').css('clear', 'both').appendTo(this.list);
    };
    return CoderWall;
  })();
  $.fn.extend({
    proudify: function(options) {
      var VERSION, services, settings;
      VERSION = [0, 1, 0];
      services = {
        github: GitHub,
        coderwall: CoderWall
      };
      settings = $.extend({}, {
        username: false,
        service: 'github',
        pushed_at: 120,
        num: 0,
        forks: false,
        devel: false
      }, options || {});
      if (settings.username) {
        new services[settings.service](this, settings);
      }
      return this;
    }
  });
}).call(this);
