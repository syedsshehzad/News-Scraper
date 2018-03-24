$(".save").click(function() {
	$.post("/save", { songId: $(this).attr("id") })
	.then(function(response) {
		console.log(response);
		alert(response.errmsg ? response.errmsg.slice(0, 32) : response);
	});
});