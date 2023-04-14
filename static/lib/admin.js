'use strict';

define('admin/plugins/emailer-ses', ['settings'], function (settings) {
	var ACP = {};

	ACP.init = function () {
		settings.load('emailer-ses', $('.emailer-settings'));
		$('#save').on('click', saveSettings);

		$('[data-action="synchronize"]').on('click', ACP.synchronize);
	};

	function saveSettings() {
		settings.save('emailer-ses', $('.emailer-settings'), function () {
            app.alert({
                type: 'success',
                alert_id: 'emailer-ses-saved',
                title: 'Settings saved',
                message: 'Click here to reload NodeBB',
                timeout: 2500,
                clickfn: function(){
                    socket.emit('admin.reload');
                }
            });
		});
	}

	return ACP;
});