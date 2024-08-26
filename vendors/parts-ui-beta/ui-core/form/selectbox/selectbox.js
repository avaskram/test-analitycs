///// select customization
function selectBoxInit(select){

	///// class names
	//////// elements names
	var selectFieldClassName = selectBoxClassName+'__field',
			selectArrowClassName = selectBoxClassName+'__arrow',
			selectValueClassName = selectBoxClassName+'__value',
			selectDropdownClassName = selectBoxClassName+'__dropdown',
			selectOptionsListClassName = selectBoxClassName+'__list',
			selectOptionClassName = selectBoxClassName+'__option',
			selectOptionsGroupClassName = selectBoxClassName+'__optgroup',
			selectTitleClassName = selectBoxClassName+'__title'
			selectOptionTextClassName = selectBoxClassName+'__text',
			selectValueIconClassName = selectBoxClassName+'__icon',
			selectFieldEl = '.'+selectFieldClassName,
			selectOptionEl = '.'+selectOptionClassName,
			selectOptionsGroupEl = '.'+selectOptionsGroupClassName,
			selectOptionsListEl = '.'+selectOptionsListClassName,
			selectDropdownEl = '.'+selectDropdownClassName,
			iconEl = '.'+selectValueIconClassName,

			//////// modifiers / states
			placeholderMod = selectBoxClassName+'--placeholder',
			openedMod = selectBoxClassName+'--opened',
			iconsMod = selectBoxClassName+'--icons',
			currentMod = selectOptionClassName+'--current',

			//////// initialize types of class names
			placeholderValue = selectValueClassName+'--placeholder',
			optionsIcons = selectClassName+'--icons',
			dataIcon = 'icon';

	///// initialize
	select.each(function(){
		///// base
		var $this = $(this),
				$option = $this.children('option'),
				$optionsGroup = $this.children('optgroup'),
				$firstOption = $option.eq(0),
				$selectedOption = $this.find(':selected'),

				selectedOptionText = $selectedOption.text(),
				selectedOptionVal = $selectedOption.val(),
				selectedOptionIndex = $selectedOption.index(),
				selectedOptionIcon = $selectedOption.data(dataIcon),
				firstOptionText = $firstOption.text(),

				optionsNumber = $option.length,
				optionsGroupsNumber = $optionsGroup.length,
				optionsGroupTitle = $optionsGroup.length,
				placeholderText = $this.data('placeholder'),
				optionIcon = $option.data(dataIcon),
				selectModifiers = $this.data('modifier');

				///// html templates
				selectBoxTemplate ='<div class="'+selectBoxClassName+'"></div>',
				selectFieldTemplate =
					'<div class="' + selectFieldClassName+'">'+
						'<div class="' + selectValueClassName + '"></div>'+
						'<div class="' + selectArrowClassName + '"></div>'+
					'</div>',
				selectDropdownTemplate = '<div class="' + selectDropdownClassName+'"></div>',
				selectOptionsListTemplate = '<ul class="'+selectOptionsListClassName+'"/>',
				selectOptionsGroupTemplate = '<div>',
				selectOptionTemplate = '<li>',
				selectOptionTextTemplate = '<div class="'+selectOptionTextClassName+'">',
				selectIconTemplate = '<div class="'+selectValueIconClassName+'"></div>',
				selectedIconTemplate = '<div class="'+selectValueIconClassName+'" style="background-image: url('+selectedOptionIcon+');">';


		if (!$this.parent().hasClass(selectBoxClassName)){
			//////// create html structure
			///////////// create box
			$this.wrap(selectBoxTemplate);
			$this.after(selectFieldTemplate);

			var $selectBox = $this.parents(selectBoxEl),
					$selectField = $selectBox.find(selectFieldEl),
					$selectValue = $selectBox.find('.'+selectValueClassName);



			///////////// options dropdown list
			$selectBox.append(selectDropdownTemplate);

			var $selectDropdown = $selectBox.find(selectDropdownEl),
					$selectOptionsList = $(selectOptionsListTemplate).appendTo($selectDropdown);


			for (var i = 0; i < optionsNumber; i++) {
				if ($this.hasClass(optionsIcons)) {
					$(selectOptionTemplate, {
						text: $option.eq(i).text(),
						class: selectOptionClassName,
						'data-icon': $option.eq(i).data(dataIcon)
					}).appendTo($selectOptionsList);
				}
				else {
					$(selectOptionTemplate,{
						text: $option.eq(i).text(),
						class: selectOptionClassName
					}).appendTo($selectOptionsList);
				}
			}

			if ($optionsGroup.length) {
				for (var i = 0; i < optionsGroupsNumber; i++) {
					var groupLabel = $optionsGroup.eq(i).attr('label');

					$(selectOptionsGroupTemplate,{
						html: '<span class="'+selectTitleClassName+'">'+groupLabel+'</span>',
						class: selectOptionsGroupClassName,
						'data-label': groupLabel
					}).appendTo($selectDropdown);
				}

				var $selectOptionsGroup = $selectBox.find(selectOptionsGroupEl),
						$selectOptionsList = $(selectOptionsListTemplate).appendTo($selectOptionsGroup);

				$optionsGroup.each(function(){
					var $this = $(this),
							$option = $this.find('option'),
							optionsNumber = $option.length,
							groupLabel = $this.attr('label'),
							$currentGroup = $selectBox.find(selectOptionsGroupEl+'[data-label="'+groupLabel+'"]'),
							$selectOptionsList = $currentGroup.find(selectOptionsListEl);

					for (var i = 0; i < optionsNumber; i++) {
						$(selectOptionTemplate,{
							text: $option.eq(i).text(),
							class: selectOptionClassName
						}).appendTo($selectOptionsList);
					}
				});
			}

			var $selectOption = $selectBox.find(selectOptionEl),
					$selectOptionFirst = $selectOptionsList.find(selectOptionEl+':first');


			$selectOption.wrapInner(selectOptionTextTemplate);
			$selectOption.eq(selectedOptionIndex).addClass(currentMod);


			var $selectOptionFirstText = $selectOptionFirst.find('.'+selectOptionTextClassName);


			if ($.trim($selectOptionFirstText.text()) == '') {
				$selectOptionFirst.remove();
			}

			///// modify types
			///////////// if has placeholder
			if (placeholderText) {
				$selectBox.addClass(placeholderMod);

				if (selectedOptionIndex > 0) {
					$selectValue.text(selectedOptionVal).removeClass(placeholderValue);
				}
				else {
					$selectValue.text(placeholderText).addClass(placeholderValue);
				}
			}
			else {
				$selectValue.text(selectedOptionVal);
			}
			///// options with icons
			if ($this.hasClass(optionsIcons)){
				$selectBox.addClass(iconsMod);
				$selectField.prepend(selectedIconTemplate);
				$selectOption.each(function(){
					var $this = $(this),
							icon = $this.data(dataIcon);

					$this.prepend(selectIconTemplate);
					$this.find('.'+selectValueIconClassName).attr('style','background-image: url('+icon+');');
				});
			}
			if (selectModifiers){
				$selectBox.addClass(selectModifiers);
			}
		}
	});


	///// select dropdown resize
	var selectDropdownSize = function(){
		$dropdown = $(selectDropdownEl);
		$dropdown.each(function(){
			var $this = $(this),
					dropPosTop = $this.offset().top,
					windowScroll = $window.scrollTop(),
					dropPos = dropPosTop - windowScroll,
					windowHeight = $window.height(),
					thisHeight = $this.innerHeight(),
					visibleHeight = windowHeight - dropPos;

				if (thisHeight > visibleHeight) {
					$this.css({
						height: visibleHeight-14+'px'
					});
				}
				else {
					$this.attr('style','');
				}
		});
	}
	window.addEventListener('resize',selectDropdownSize);

	$body.on('click',selectOptionEl,function(){
		var $this = $(this),
				$box = $this.parents(selectBoxEl),
				$field = $box.find(selectFieldEl),
				$value = $box.find('.'+selectValueClassName),
				$text = $this.find('.'+selectOptionTextClassName),
				$items = $box.find(selectOptionEl),
				$select = $box.find('select'),
				text = $text.text(),
				optionValue = $select.find('option:contains("'+text+'")').val();
				placeholderText = $select.data('placeholder');

		$select.val(optionValue).change();

		if (optionValue == placeholderText || optionValue == '') {
			$value.text(text).addClass(placeholderValue);
		}
		else {
			$value.text(text).removeClass(placeholderValue);
		}

		if ($select.hasClass(optionsIcons)) {
			iconValue = $field.find('.'+selectValueIconClassName),
			icon = $this.data(dataIcon);
			iconValue.attr('style','background-image: url('+icon+');');
		}

		$box.removeClass(openedMod);
		$items.removeClass(currentMod);
		$this.addClass(currentMod);
		$(selectDropdownEl).attr('style','');

	});

	$body.on('click',selectFieldEl,function(){
		var $this = $(this),
				$items = $(selectBoxEl),
				$item = $(this).parents(selectBoxEl);

		if ($item.hasClass(openedMod)){
			$items.removeClass(openedMod);
		}
		else {
			$items.removeClass(openedMod);
			$item.addClass(openedMod);
		}
		selectDropdownSize();
	});

	$(selectBoxEl).toggleOutside({
		className: openedMod,
		exceptions: selectFieldEl+', '+selectBoxEl,
		callback: function(){
			$(selectDropdownEl).attr('style','');
		}
	});
};

selectBoxInit($(selectEl));
