(function(factory){
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else {
    factory(window.jQuery);
  }
})(function($){
  if (!$) return;

  $.fn.counterUp = function() {
    return this.each(function() {
      var $element = $(this);
      var target = parseInt($element.data('target'), 10);
      if (!isNaN(target)) {
        $element.text(target);
      }
    });
  };
});
