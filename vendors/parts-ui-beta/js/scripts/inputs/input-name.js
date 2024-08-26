///// input number
var inputNameRequire = function(el){
  var requireEvent = function(event) {
    if(/[^a-zA-ZА-Яа-яЁё]/.test($(this).val())){
      let Selection = this.selectionStart-1;
      $(this).val( $(this).val().replace(/[^a-zA-ZА-Яа-яЁё]/g,'') );
      this.setSelectionRange(Selection, Selection)
    }
  }
  $body.on('input',el,requireEvent);
}('.js-input-name');
