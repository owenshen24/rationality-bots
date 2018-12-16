$(function() {
    $("#update-size").click(function(){
        var size = parseInt($("#size-field").val(), 10);
        if (size != NaN) {
            $(".ql-container").css("font-size", size);
        }
    });
});