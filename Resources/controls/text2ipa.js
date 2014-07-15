module.exports = function(_options, callback) {
	var xhr = Ti.Network.createHTTPClient({
		onload : function() {
			var res = this.responseText;
			if (res)
				callback(res.replace(/  /g, ' ').replace(/  /g, ' ').replace(/  /g, ' ').replace(/  /g, ' ').replace(/  /g, ' ').replace(/  /g, ' ').replace(/  /g, ' '));
		},
		onerror : function(e) {
		},
		timeout : 15000
	});
	xhr.open("POST", Ti.App.Properties.getString('ENDPOINT'));
	xhr.send({
		foo : _options.foo
	});
};
/*
 *
 * http://lingorado.com/ipa/
 * output_dialect	br
 output_style	only_tr
 text_to_transcribe
 *
 *
 */