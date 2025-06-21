'use strict';

import { save, load } from 'settings';

export function init() {
	handleSettingsForm();
}

function handleSettingsForm() {
	load('emailer-ses', $('.emailer-settings'));

	$('#save').on('click', () => {
		save('emailer-ses', $('.emailer-settings'));
	})
}