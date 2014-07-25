module.exports = function() {
	var self = Ti.UI.createWindow({
		exitOnClose : true,
		backgroundImage : '/assets/ternes.jpg',
		layout : 'vertical',
		fullscreen : true
	});
	self.message = Ti.UI.createTextArea({
		top : 0,
		borderWidth : 1,
		width : Ti.UI.FILL,
		height : '50%',
		color : 'black',
		backgroundColor : 'white',
		autocorrect : false,
		returnKey : true,
		returnKeyType : Ti.UI.RETURNKEY_GO,
		opacity : 0,
		font : {
			fontSize : 25,
			fontFamily : 'GentiumPlus'
		}
	});
	self.add(self.message);
	self.message.add(Ti.UI.createLabel({
		top : '40%',
		height : Ti.UI.SIZE,
		touchEnabled : false,
		text : 'Texteingabe',
		width : Ti.UI.SIZE,
		color : '#aaa',
		zIndex : 9999,
		font : {
			fontWeight : 'bold',
			fontSize : 60,
			fontFamily : 'GentiumPlus'
		}
	}));
	
	self.ipa = Ti.UI.createTextArea({
		top : 0,
		borderWidth : 1,
		width : Ti.UI.FILL,
		color : 'black',
		autocorrect : false,
		touchEnabled : false,
		editable : false,
		backgroundColor : 'white',
		opacity : 0,
		height : '50%',
		font : {
			fontSize : 25,
			fontFamily : 'GentiumPlus'
		}
	});
	self.ipa && self.ipa.animate({
		opacity : 0.96,
		duration : 800
	});
	self.message && self.message.animate({
		opacity : 0.96,
		duration : 800
	});	
	self.ipa.add(Ti.UI.createLabel({
		bottom : 10,
		height : Ti.UI.SIZE,
		text : 'IPA',
		width : Ti.UI.FILL,
		textAlign : 'center',
		color : '#bbb',
		zIndex : 9999,
		font : {
			fontSize : 50,
			fontWeight : 'bold',
			fontFamily : 'GentiumPlus'
		}
	}));
	self.message.addEventListener('click', function() {
		self.ipa.value = '';
		//	self.message.value = '';
	});
	
	self.activityIndicator = Ti.UI.createActivityIndicator({
		style : Ti.UI.ActivityIndicatorStyle.BIG,
		bottom : '25%'
	});
	self.add(self.ipa);
	self.add(self.activityIndicator);
	if (Ti.Android) {
		var speechrecognizerModule = require('jp.isisredirect.speechrecognizer');
		self.speechrecognizer = speechrecognizerModule.createSpeechRecognizer();
		self.speechrecognizer.setLangtag('de-DE');
		self.speechrecognizer.addEventListener(speechrecognizerModule.RESULTS, function(e) {
			if (e.results && e.results.split(',')[0]) {
				var results = e.results.split(',');
				results.pop();
				var opts = {
					options : results,
					title : 'Folgendes habe ich erkannt, wähle aus!'
				};
				var dialog = Ti.UI.createOptionDialog(opts);
				dialog.show();
				dialog.addEventListener('click', function(_e) {
					self.message.setValue(_e.source.options[_e.index]);
					self.activityIndicator.show();
					require('controls/text2ipa')({
						lang : 'DE_de',
						foo : _e.source.options[_e.index]
					}, function(_res) {
						self.activityIndicator.hide();
						self.ipa.setValue(_res);
						self.fireEvent('ipa');
					});
				});
			}
			self.speechrecognizer.stop();
		});
	}
	self.player = null;
	self.message.addEventListener('return', function() {
		self.activityIndicator.show();
		self.message.blur();
		require('controls/text2ipa')({
			lang : 'DE_de',
			foo : self.message.getValue()
		}, function(_res) {
			self.activityIndicator.hide();
			self.ipa.setValue(_res);
			self.fireEvent('ipa');
		});
	});
	return self;
};
