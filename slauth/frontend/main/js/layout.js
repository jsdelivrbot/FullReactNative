$(document).ready(function () {
  $('.data-layout').each(function(index, obj){
    $.get('layout/' + $(obj).data('layout'), function(data) {
      $(obj).html(data);
    }, 'text');
  });
  window.onbeforeunload = function(event){
    return false;
  }
});
