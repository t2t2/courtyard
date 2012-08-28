var socket = io.connect();

$(function() {
	$(document).on("click focus", ".control-group.error input", function() {
		$(this).parents(".control-group.error").removeClass("error")
	});


	$("#connect-form").submit(function() {
		var irc_server = $("#irc-server").val()
		var irc_username = $("#irc-username").val()
		var irc_channel = $("#irc-channel").val()
		if(!irc_server) {
			$("#irc-server").parents(".control-group").addClass("error")
		}
		if(!irc_username) {
			$("#irc-username").parents(".control-group").addClass("error")
		}
		if(!irc_channel) {
			$("#irc-channel").parents(".control-group").addClass("error")
		}
		if(!irc_server && !irc_username && !irc_channel) {
			return false
		}
		socket.emit("connect-to-irc", irc_server, irc_username, irc_channel)
		$("#irc-server, #irc-username, #irc-channel").val("")
		$('#connect-form').parent().removeClass('open')
		return false
	});
});

socket.on("getMessage", function(nick, to, text) {
	$("#messages").append($("<li></li>").text("<"+nick+"> "+text))
	speak.play(text);
});