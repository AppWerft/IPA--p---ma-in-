var self = Ti.UI.createTabGroup({
	fullscreen : true,
	exitOnClose : true,
});
var tab1 = Ti.UI.createTab({
	window : require('ui/main.window')(),
	title : 'IPA Sprechmaschine'
});
var tab2 = Ti.UI.createTab({
	window : require('ui/ipatable.window')(),
	title : 'IPA Liste'
});
self.addTab(tab1);
self.addTab(tab2);
self.open();

self.addEventListener('open', function() {
	var activity = self.getActivity();
	if (!activity.actionBar) {
		console.log('Warning: no actionbar');
		return;
	}
	activity.actionBar.setTitle('I.P.A.');
	activity.actionBar.setSubtitle('ʃpʁɛçmaʃinə');
	activity.onCreateOptionsMenu = function(e) {
		if (Ti.Network.online) {
			e.menu.add({
				title : 'Weiterverwenden',
				itemId : '0',
				showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM,
				icon : Ti.App.Android.R.drawable.ic_action_share,
				visible:false
			}).addEventListener("click", function() {
				var intent = Ti.Android.createIntent({
					action : Ti.Android.ACTION_SEND,
					type : "text/plain"
				});
				intent.putExtra(Ti.Android.EXTRA_TEXT, self.tabs[0].window.ipa.value);
				intent.addCategory(Ti.Android.CATEGORY_DEFAULT);
				Ti.Android.currentActivity.startActivity(intent);
			});
			self.tabs[0].window.addEventListener('ipa',function(){
				e.menu.findItem('0').visible = true;
			});
			e.menu.add({
				title : 'Mikrofon',
				showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM,
				icon : Ti.App.Android.R.drawable.ic_action_mic
			}).addEventListener("click", function() {
				Ti.UI.createNotification({
					message : 'Sprech jetzt den Text …'
				}).show();
				self.setActiveTab(0);
				self.tabs[0].window.speechrecognizer.setAction(1);
				self.tabs[0].window.speechrecognizer.start();
			});
		} else
			alert('Netzwerkprobleme.');
	};
});

// Jan Lorenzen 040 428133 105