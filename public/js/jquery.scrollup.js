/*! jquery.scrollup v1.0.0, @license MIT */

(function ( $ ) {

  $.fn.scrollup = {}

  $.fn.scrollup.create = function(selector, options) {

    options = $(this).scrollup.options(options);

    if (options.debug) {
        console.log('jQuery.scrollup initialised on selector: "'+selector+'"');
    }

    $(selector).on('wheel', function(e) {
      if ($(this).scrollTop() == 0 && e.originalEvent.wheelDelta >= 0) {

        if ($(this).children('.' + options.class).length == 0) {

            if (options.debug) { console.log('jQuery.scrollup object is being created.'); }
            if (options.create) { options.create(); }

            var scrollupElement = $('<div class="'+options.class+'">'+options.content+'</div>');

            scrollupElement.hide().prependTo(selector).show(options.animationSpeed);

            if (options.debug) { console.log('jQuery.scrollup object has been created.'); }
            if (options.created) { options.created(); }

            if (options.timeout) {

                var timer = setTimeout(function() {
                    if (options.debug) { console.log('jQuery.scrollup object has timed out.'); }
                    if (options.timedOut) { options.timedOut(); }

                    $(this).scrollup.remove(selector, options);
                }, options.timeout);

                scrollupElement.attr('data-scrollup-timer', timer);

            }

        } else {

            if (options.debug) { console.log('jQuery.scrollup triggered, but object already exists.'); }
            if (options.exists) { options.exists(); }

        }
      }
    });

  }
  
  
  
  $.fn.scrollup.remove = function(selector, options) {

    options = $(this).scrollup.options(options);
    
    if (options.debug) { console.log('jQuery.scrollup object is being removed.'); }
    if (options.remove) { options.remove(); }
    
    var scrollupElement = $(selector).children('.' + options.class);
    
    if (scrollupElement.length) {
        $(scrollupElement).hide(options.animationSpeed, function() {
            $(scrollupElement).remove();
            clearTimeout($(scrollupElement).attr('data-scrollup-timer'));
            if (options.debug) { console.log('jQuery.scrollup object has been removed.'); }
            if (options.removed) { options.removed(); }
            return true;
        });
    } else {
        if (options.debug) {
            console.log('jQuery.scrollup did not find a scrollup object to remove.');
        }
        return false;
    }

  }
  
  
  
  $.fn.scrollup.options = function(options) {

    if (typeof options == 'undefined') {
        options = {};
    }

    if (typeof options.content == 'undefined') {
        options.content = '';
    }

    if (typeof options.class == 'undefined') {
        options.class = 'scrollup';
    }

    if (typeof options.animationSpeed == 'undefined' || options.animationSpeed.toLowerCase() != 'fast' || options.animationSpeed.toLowerCase() != 'slow') {
        options.animationSpeed = 'fast';
    }
    
    return options;

  }
  


}( jQuery ));
