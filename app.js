var irc = require("irc"),
	file = new(require("node-static").Server)('./public'),
	port = process.argv[2] || 8333;

var server = require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        //
        // Serve files!
        //
        file.serve(request, response);
    });
})
server.listen(port);
console.log("Server listening on http://localhost:"+port)

var io = require("socket.io").listen(server)

io.sockets.on("connection", function(socket) {
	socket.on("connect-to-irc", function(server, nick, channel) {
		console.log("Connect to", server);
		var client = new irc.Client(server, nick, {
			userName: nick+"-courtyard",
			realName: "Courtyard powered by nodeJS IRC - github.com/t2t2/courtyard",
			debug: true,
			channels: [channel]
		});
		
		client.addListener('message', function(nick, to, text, message) {
			console.log("Message:", nick, to, text);
			if(to == channel) {
				socket.emit("getMessage", nick, to, text)
			}
		});
	});
});

