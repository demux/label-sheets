(function($, undefined){
  return $.fn.boxfit = function(options){
    var settings;
    if (this.length === 0) {return this;}

    settings = {
      width: null,
      step_size: 0.5,
      step_limit: 200,
      multiline: false,
      minimum_font_size: 5,
      maximum_font_size: null
    };

    $.extend(settings, options);
    if (!settings.multiline) {
      $(this).css('white-space', 'nowrap');
    }

    this.each(function() {
      var original_width, $span, current_step, next_font_size;

      original_width = settings.width || $(this).width();

      $span = $(this).find('span.boxfitted')
      if(!$span.length) {
        $span = $($('<span>').addClass('boxfitted').html($(this).html()));
      }

      $(this).html($span);
      current_step = 1;
      $(this).css("font-size", settings.minimum_font_size + 'pt');

      while($span.width() < original_width) {
        if(current_step++ > settings.step_limit) {break;}

        next_font_size = parseFloat($(this)[0].style.fontSize, 10);

        if(settings.maximum_font_size && next_font_size > settings.maximum_font_size) {
          break;
        }
        $(this).css("font-size", (next_font_size + settings.step_size) + 'pt');
      }
    });
    return this;
  };
})(jQuery);
