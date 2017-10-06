$( document ).ready(function() {



function createToDo() {
  var toDo = $(".enter-form").val();
  var blank = "";
  $(".to-dos").append("<div class='active-to-do big-text'>" + toDo + "</div>");
  $(".enter-form").val(blank);
}
$(document).keypress(function(e) {
    if(e.which == 13) {
        createToDo();
    }
});

function strikeThrough() {
  
}


});
