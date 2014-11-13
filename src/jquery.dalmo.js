/* ==================================
 * jQuery dalmo v0.0.1
 * https://github.com/hikarock/dalmo
 * ==================================
 * Copyright 2014 hikarock.
 * Licensed under MIT
 * ================================== */

(function ($) {

  'use strict';

  var Dalmo = function (element, options) {
    this.options = options;
    this.$body   = $(document.body);
    this.isShown = false;
  };

  Dalmo.VERSION = '0.0.1';
  Dalmo.isShown = false;
  Dalmo.DEFAULTS = {
    modeless: false
  };

  $.fn.extend({
    dalmo: function (option) {
      return this.each(function() {

        var $this = $(this);
        var options  = $.extend({}, Dalmo.DEFAULTS, typeof option == 'object' && option);
        var dalmo = new Dalmo(this, options);

        var selector = $this.data('target');

        Dalmo.$modal = createModal(selector, options);

        $this.on('click', function(evt) {
          evt.preventDefault();

          Dalmo.$modal.show();
          Dalmo.isShown = true;

          var $modal = Dalmo.$modal.find('.dalmo');
          calcHeight($modal);

          $(window).on('resize', function(evt) {
            console.log('resize');
            calcHeight($modal);
          });

          $(window).on('orientationchange', function(evt) {
            console.log('orientationchange');
            calcHeight($modal);
          });

          Dalmo.$modal.find('.dalmo-overray')
          .off('click')
          .on('click', function(evt) {
            evt.preventDefault();
            close();
          });

          $modal.find('.close')
          .off('click')
          .on('click', function(evt) {
            evt.preventDefault();
            close();
          });

          $(window).on('touchmove.noScroll', function(evt) {
            if ($(evt.target).hasClass('body')) {
              return;
            }
            evt.preventDefault();
          });
        });
      });
    }
  });

  function close() {
    Dalmo.$modal.hide();
    Dalmo.isShown = false;
    $(window).off('.noScroll');
  }

  function createModal(selector, options) {

    var $modal, $overray, $wrapper;

    if ($(selector).length < 1) {
      // error
      console.log('error');
      return;
    }

    var $buttons = $(selector).find('footer button');
    var count = $buttons.length;

    if (count > 2) {
      count = 3;
    }

    $buttons.each(function(i) {
      $(this).addClass('cnt-' + count);
    });

    $modal = $('<div>').addClass('dalmo').append($(selector).html());
    $wrapper = $('<div>').append($modal);

    if (!options.modeless) {
      $overray = $('<div>').addClass('dalmo-overray');
      $wrapper.append($overray);
    }

    $('body').append($wrapper.hide());

    return $wrapper;
  }

  function calcHeight($modal) {

    var height        = $modal.height(),
        maxHeight     = Math.round($(window).height() * 0.8),
        headerHeight  = $modal.find('header').height(),
        footerHeight  = $modal.find('footer').height(),
        maxBodyHeight = maxHeight - (headerHeight + footerHeight),
        marginTop     = 0;

    if (height > maxHeight) {
      marginTop = Math.round(0 - (maxHeight / 2));
    } else {
      marginTop = Math.round(0 - (height / 2));
    }

    $modal.find('.body').css('max-height', maxBodyHeight + 'px');
    $modal.css({
      'max-height': maxHeight + 'px',
      'top': '50%',
      'margin-top': marginTop + 'px'
    });

    return $modal;
  }

})(jQuery);

