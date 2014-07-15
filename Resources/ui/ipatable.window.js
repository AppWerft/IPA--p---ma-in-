module.exports = function() {
	var tableview = Ti.UI.createTableView({
	});
	var player = Ti.Media.createSound();
	var ipa = require('models/ipa');
	var data = [];
	for (var c in ipa) {
		if (c)
			data.push(require('ui/ipa.widget')({
				c : c,
				val : ipa[c]
			}));
	}
	tableview.setData(data);
	var win = Ti.UI.createWindow({
		backgroundColor : "black",
		navBarHidden : false,
		title : "Main Window"
	});
	win.add(tableview);
	tableview.addEventListener('click', function(_e) {
		player.release();
		player.url = '/assets/sounds/' + _e.row.itemId + '.mp3';
		player.play();
	});
	return win;
};
