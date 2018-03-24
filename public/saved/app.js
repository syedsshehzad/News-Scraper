// Delete song
$(".delete").click(function() {
	$.post("/remove", { songId: $(this).attr("id") })
		.then(function(response) {
			alert(response.errmsg ? response.errmsg : response);
			location.reload();
		});
});

// Delete comment
$(".x").click(function() {
	$.post("/x/" + $(this).attr("target"))
		.then(function(response) {
			location.reload();
		});
});

$(".group").hide();

$(".show").click(function() {
	var div = $(this).parentsUntil()[1];
	var commentGroup = $(div).find(".group").toggle("slow");
	console.log(commentGroup);
});