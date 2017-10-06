$( document ).ready(function() {



function createToDo() {
  var toDo = $(".enter-form").val();
  var blank = "";
  $(".to-dos").append("<div class='active to-do big-text'>" + toDo + "</div>");
  $(".enter-form").val(blank);
}
$(document).keypress(function(e) {
    if(e.which == 13) {
        createToDo();
    }
});

//Allows the stuff to be crossed out.
$(".to-dos").click(function(e) {
  let li = e.target;

  if (li.style.textDecoration === "none") {
  li.style.textDecoration = "line-through";
  li.style.opacity = "0.25";
  }
  else {
      li.style.textDecoration = "none";
      li.style.opacity = "1.0";
  }
});


function removeToDo() {
  $(".to-do").remove();
}
$(".reset-button").click(removeToDo);
// Alternative CTRL-x can be used to remove.
$(document).on('keydown', function ( e ) {
    if ((e.metaKey || e.ctrlKey) && ( String.fromCharCode(e.which).toLowerCase() === 'x') ) {
        removeToDo();
    }
});


});
