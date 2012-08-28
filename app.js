/* Using appjs
 */

var app = require("appjs"),
	irc = require("irc");

// serve files to browser requests to "http://appjs/*"
app.serveFilesFrom(__dirname+'/public');

var window = app.createWindow('http://appjs/', {
	width: 700,
	height: 520,
});
window.on('create', function(){
	console.log("Window Created");
	window.frame.show();
	window.frame.center();
});
window.on('ready', function(){
	console.log("Window Ready");
			window.frame.openDevTools();

	function F12(e){ return e.keyIdentifier === 'F12' }
	function Command_Option_J(e){ return e.keyCode === 74 && e.metaKey && e.altKey }

	window.addEventListener('keydown', function(e){
		if (F12(e) || Command_Option_J(e)) {
			window.frame.openDevTools();
		}
	});
	window.makeconnect = function(server, nick, channel) {
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
				window.getMessage(nick, to, text)
			}
		});
	}
});
window.on('close', function() {

});