var ratingCount = function(){
  var itemName = themeName+'-rating',
      item = themeEl+'-rating'
      input = item+'__input',
      note = item+'__note',
      value = item+'__value',
      selectedMod = itemName+bem.mod.selected;

  $body.on('change', input, function(){
    var $this = $(this),
        $item = $this.parents(item),
        currentValue = $this.val(),
        valueField =  $item.find(value);
        dataInput =  $item.find('input[type="hidden"]');

    $item.addClass(selectedMod);
    valueField.text(currentValue);
    dataInput.val(currentValue);
  });

}();
