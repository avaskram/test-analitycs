///--- Start function
var partsUI = {
  init: function(){
    /////--- THEME GLOBAL VARIABLES
  	
  	

  	/////--- PARTS UI BASE
  	/// global variables
  	//////// CSS class names
  	var $window = $(window),
  			$document = $(document),
  			$body = $('body'),
  			$html = $('html'),
  			$bodyHtml = $('body,html'),
  	
  			///// document and body conditions
  			pageLoadingClassName = 'page-is-loading',
  			pageLoadedClassName = 'page-is-loaded',
  			pageFixClassName = 'page-is-fixed',
  	
  			scrollbarCompensateClassName = 'scrollbar-compensate',
  			documentWithoutScrollbarClassName = 'document-without-scroll',
  			documentHasScrollbarClassName = 'document-has-scroll',
  			scrollDirectionUpClassName = 'scroll-direction-up',
  			scrollDirectionDownClassName = 'scroll-direction-down',
  			touchDeviceClassName = 'touch-device';
  	
    var bem = {
    	el: {
    		body: '__body',
    		container: '__container',
    		content: '__content',
    		section: '__section',
    		bg: '__bg',
    		list: '__list',
    		item: '__item',
    		link: '__link',
    		name: '__name',
    		icon: '__icon',
    		title: '__title',
    		text: '__text',
    		note: '__note',
    		value: '__value',
    		number: '__number',
    		image: '__image',
    		toggle: '__toggle',
    		close: '__close'
    	},
    	mod: {
    		active: '--active',
    		inactive: '--inactive',
    		error: '--error',
    		success: '--success',
    		disabled: '--disabled',
    		loading: '--loading',
    		loaded: '--loaded',
    		init: '--init',
    		hover: '--hover',
    		focus: '--focus',
    		color: '--color',
    		hidden: '--hidden',
    		visible: '--visible',
    		invisible: '--invisble',
    		selected: '--selected',
    		opened: '--opened',
    		value: '--value',
    		fixed: '--fixed',
    		colored: '--colored',
    		current: '--current',
    		bg: '--bg',
    		xs: '--xs',
    		sm: '--sm',
    		md: '--md',
    		lg: '--lg',
    		xl: '--xl'
    	}
    }
    
  	///// LAYOUT ELEMENTS
  	//////// names
  	if (themeName == undefined) {
  		var themeName = 'parts';
  	}
  	else {
  		var themeName = themeName;
  	}
  	
  	var themeEl = '.'+themeName,
  			///// LAYOUTS
  			pageClassName = themeName + '-page',
  			headerClassName = themeName + '-header',
  			footerClassName = themeName + '-footer',
  			sectionClassName = themeName + '-section',
  			bannerClassName = themeName + '-banner',
  	
  			//////// jquery elements
  			pageEl = '.' + pageClassName,
  			headerEl = '.' + headerClassName,
  			footerEl = '.' + footerClassName,
  			sectionEl = '.' + sectionClassName,
  			bannerEl = '.' + bannerClassName,
  	
  			///// COMPONENTS
  			menuClassName = themeName + '-menu',
  			popUpClassName = themeName + '-popup',
  			formClassName = themeName + '-form',
  			fieldClassName = themeName + '-field',
  			inputClassName = themeName + '-input',
  			selectClassName = themeName + '-select',
  			selectBoxClassName = themeName + '-selectbox',
  			uploaderClassName = themeName + '-uploader',
  			burgerClassName = themeName + '-burger',
  			btnClassName = themeName + '-btn',
  			cardClassName = themeName + '-card',
  	
  			//////// jquery elements
  			menuEl = '.' + menuClassName,
  			popUpEl = '.' + popUpClassName,
  			formEl = '.' + formClassName,
  			inputEl = '.' + inputClassName,
  			selectEl = '.' + selectClassName,
  			selectBoxEl = '.' + selectBoxClassName,
  			uploaderEl = '.' + uploaderClassName,
  			burgerEl = '.' + burgerClassName,
  			btnEl = '.' + btnClassName,
  			cardEl = '.' + cardClassName,
  	
  			///// STATES
  			activeClassName = themeName + '-active',
  			inactiveClassName = themeName + '-inactive';
  	
  	/// touch and mobile device detect
  	var isMobile = {
  	  Android: function() {
  	  	return navigator.userAgent.match(/Android/i);
  	  },
  	  BlackBerry: function() {
  	  	return navigator.userAgent.match(/BlackBerry/i);
  	  },
  	  iOS: function() {
  	  	return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  	  },
  	  Opera: function() {
  	  	return navigator.userAgent.match(/Opera Mini/i);
  	  },
  	  Windows: function() {
  	  	return navigator.userAgent.match(/IEMobile/i);
  	  },
  	  any: function(){
  	  	return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  	  }
  	}
  	
  	///// touch & mobile devices initialize
  	if (isMobile.any()) {
  		document.body.classList.add(touchDeviceClassName);
  		///// remove hover effects
  	  try { ///// prevent exception on browsers not supporting DOM styleSheets properly
  	    for (var si in document.styleSheets) {
  	      var styleSheet = document.styleSheets[si];
  	      if (!styleSheet.rules) continue;
  	      for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
  	        if (!styleSheet.rules[ri].selectorText) continue;
  	        if (styleSheet.rules[ri].selectorText.match(':hover')) {
  	          styleSheet.deleteRule(ri);
  	        }
  	      }
  	    }
  	  } catch (ex) {}
  	}
  	if (isMobile.iOS()){
  		document.body.setAttribute('style','cursor: pointer;');
  	}
  	


  	////////--- Layouts / UI Core / Components
    /////////////--- layout

    /////////////--- components
  	$.fn.toggleOutside = function(options){
  		var options = $.extend({
  	    exceptions: null,
  	    className: activeClassName,
  			callback: function(){}
  	  },options);
  	
  		var init = function(el){
  			var el = $(this);
  	
  			$document.on('click','body',function(event){
  				var exceptions = options.exceptions;
  				var className = options.className;
  	
  				if (el.attr('data-toggle-exceptions')){
  					var exceptions = el.data('toggle-exceptions');
  				}
  				if (el.attr('data-toggle-class')){
  					var className = el.data('toggle-class');
  				}
  				function clickOutsideEvent(){
  					options.callback();
  					el.removeClass(className);
  					event.stopPropagation();
  				}
  				if (!$(event.target).closest(el).length && !$(event.target).closest(exceptions).length){
  					clickOutsideEvent();
  				}
  			});
  		}
  		return this.each(init);
  	}
  	
  	$('.js-toggle-outside').toggleOutside();
  	
  	var inputFocus = function(el){
  	  var valueMod = inputClassName+bem.mod.value,
  	      focusMod = inputClassName+bem.mod.focus;
  	
  	  $body.on('input keypress focus change',el,function(){
  	    var $this = $(this),
  	        inputDiv = $this.parents(inputEl),
  	        inputValue = $this.val();
  	
  	    inputDiv.addClass(focusMod);
  	
  	    if (inputValue.length > 0) {
  	      inputDiv.addClass(valueMod);
  	    }
  	    else {
  	      inputDiv.removeClass(valueMod);
  	    }
  	  });
  	
  	  $body.on('blur',el,function(){
  	    var $this = $(this),
  	        inputDiv = $this.parents(inputEl),
  	        inputValue = $this.val();
  	
  	    inputDiv.removeClass(focusMod);
  	
  	    if (inputValue.length == 0) {
  	      inputDiv.removeClass(valueMod);
  	    }
  	  });
  	}('.js-input-focus');
  	
  	///// require input symbols only for phone number
  	var inputPhoneRequire = function(el){
  	  var requireEvent = function(event) {
  	    var key = window.event ? event.keyCode : event.which;
  	    if (event.keyCode === 8 || event.keyCode === 46 || event.keyCode === 43) {
  	      return true;
  	    } else if (key < 48 || key > 57) {
  	      return false;
  	    } else {
  	      return true;
  	    }
  	  }
  	  $body.on('keypress',el,requireEvent);
  	}('.js-input-phone');
  	
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
    

    /////--- LOCAL

    var pageNavigation = function(){
      var $link = $('.js-target-link'),
          $burger = $('.burger'),
          $header = $('.header'),
          $headerClose = $('.header__close'),
          offset = 120,
          tween = TweenMax,
          speed = 1,
          easing = Quint.easeOut;
    
      $link.on('click', function(){
        var $this = $(this),
            target = $this.attr('href'),
            $target = $(target);
    
        $header.removeClass('active');
    
        if ($target.length > 0) {
          targetPos = $target.offset().top - offset;
          tween.to(window,speed,{
            scrollTo:{
              y: targetPos,
              autoKill: false
            },ease:easing
          },50);
          return false;
        }
        else {
          window.location.href = '/'+target
        }
      });
    
      $burger.on('click',function(){
        $header.addClass('active');
      })
      $headerClose.on('click',function(){
        $header.removeClass('active');
      })
    }
    window.addEventListener('load',pageNavigation());
    

    $('.parts-selectbox__option').on('click',function(){
      $(this).parents('.parts-selectbox').addClass('parts-selectbox--selected');
    })
  }
}
partsUI.init();
