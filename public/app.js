$(".save").click(function() {
	$.post("/save", { songId: $(this).attr("id") })
	.then(function(response) {
		console.log(response);
		alert(response.errmsg ? response.errmsg.slice(0, 37) : response);
	});
});

$(".delete").click(function() {
	$.post("/remove", { songId: $(this).attr("id") })
	.then(function(response) {
		alert(response.errmsg ? response.errmsg : response);
		location.reload();
	});
});

$(".hurt").click(function() {
	$("body").css({"background-color": "#444444"});
	$("header").css({"background-color": "#aaaaaa"});
	$("section").css({"background-color": "#aaaaaa"});
	$("div").css({"background-color": "#666666"});
	$("h1").css({"background-color": "#666666"});
	$(".notes").css({"background-color": "#444444"});
});