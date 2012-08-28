/* Using appjs
 */

var app = require("appjs");

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

	function F12(e){ return e.keyIdentifier === 'F12' }
	function Command_Option_J(e){ return e.keyCode === 74 && e.metaKey && e.altKey }

	window.addEventListener('keydown', function(e){
		if (F12(e) || Command_Option_J(e)) {
			window.frame.openDevTools();
		}
	});
});
