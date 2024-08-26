///--- Start function
var partsUI = {
  init: function(){
    /////--- THEME GLOBAL VARIABLES
  	//= require src/scripts/vars.js

  	/////--- PARTS UI BASE
  	//= require vendors/parts-ui-beta/js/base/global.js
    //= require vendors/parts-ui-beta/js/base/bem.js
  	//= require vendors/parts-ui-beta/js/base/names.js
  	//= require vendors/parts-ui-beta/js/base/mobile-detect.js
  	//= require vendors/parts-ui-beta/js/base/mobile-init.js


  	////////--- Layouts / UI Core / Components
    /////////////--- layout

    /////////////--- components
  	//= require vendors/parts-ui-beta/js/scripts/toggle/toggle-outside.js
  	//= require vendors/parts-ui-beta/js/scripts/inputs/input-focus.js
  	//= require vendors/parts-ui-beta/js/scripts/inputs/input-phone.js
    //= require vendors/parts-ui-beta/ui-core/form/selectbox/selectbox.js

    /////--- LOCAL

    //= require src/components/**/*.js

    $('.parts-selectbox__option').on('click',function(){
      $(this).parents('.parts-selectbox').addClass('parts-selectbox--selected');
    })
  }
}
partsUI.init();
