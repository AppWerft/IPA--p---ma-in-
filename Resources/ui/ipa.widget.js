module.exports = function(_data) {
	var self = Ti.UI.createTableViewRow({
		itemId : _data.val.a,
		height : Ti.UI.SIZE,
		backgroundColor : 'white'
	});
	var container = Ti.UI.createView({
		layout : 'vertical',
		left : 50,
		top : 5,
		right : 0,
		height : Ti.UI.SIZE,
	});
	self.add(container);
	self.add(Ti.UI.createLabel({
		text : _data.c,
		left : 10,
		top : 10,
		height : Ti.UI.SIZE,
		color : 'gray',
		font : {
			fontSize : 64,
			fontFamily : 'GentiumPlus'
		}
	}));
	container.add(Ti.UI.createLabel({
		text : _data.val.a.replace(/_/g,' '),
		left : 30,
		top : 0,
		right : 0,
		touchEnabled : false,
		height : Ti.UI.SIZE,
		color : '#333',
		font : {
			fontSize : 19,
			fontWeight:'bold',
			fontFamily : 'GentiumPlus'
		}
	}));
	container.add(Ti.UI.createLabel({
		text : _data.val.d,
		left : 30,
		top : 0,
		right : 50,
		touchEnabled : false,
		height : Ti.UI.SIZE,
		color : 'black',
		font : {
			fontSize : 14,
			fontFamily : 'GentiumPlus'
		}
	}));
	self.add(Ti.UI.createView({
		right : 5,
		width : 36,
		height : 36,
		backgroundImage : '/assets/ls.png'
	}));
	return self;
};
