/* Using appjs
 */

var app = require("appjs");

// serve files to browser requests to "http://appjs/*"
app.serveFilesFrom(__dirname+'/public');

var window = app.createWindow('http://appjs/', {
	width: 640,
	height: 460,
});
window.on('create', function(){
	console.log("Window Created");
	window.frame.show();
	window.frame.center();
});