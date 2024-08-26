///// copy code example on clipboard (using clipboard.js & highlights.js)
var copyCodeToClipboard = function(){
	var container = themeName+'-code',
			containerEl = '.'+container,
			block = container+'__clipboard',
			blockEl = containerEl+'__clipboard',
			$item = $(blockEl),
			successMod = block+bem.mod.success;

	$item.each(function() {
		var $this = $(this),
				targetEl = $this.parents(containerEl).find('code'),
				targetText = targetEl.text();

		$this.attr('data-clipboard-text',targetText);
	});

	var clipboard = new ClipboardJS(blockEl);

	clipboard.on('success',function(e){
		e.trigger.classList.add(successMod);
		setTimeout(function() {
			e.trigger.classList.remove(successMod);
		}, 2000);
	});
};
copyCodeToClipboard();
