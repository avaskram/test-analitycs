///// highlights js init
function codeStylesInit(){
  $('code').each(function(i,block) {
    hljs.highlightBlock(block);
  });
}
window.addEventListener('load',codeStylesInit);
