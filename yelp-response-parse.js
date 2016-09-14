module.exports = function (data) {
	var parsed = [];
	for (var item of data.businesses) {
		var entry = {};
		if (item.name) {
			entry.name = item.name;
		} else {
			//we dont need a business without a name
			continue;
		}

		if (item.location.address instanceof Array && item.location.address.length > 0) {
			entry.address = item.location.address.join();
		} else {
			entry.address = 'NA';
		}

		if (item.categories instanceof Array && item.categories.length > 0) {
			entry.categories = [];
			item.categories.forEach(function (e) {
				if (e instanceof Array) {
					entry.categories.push(e[0]);
				}
			});
		} else {
			entry.categories = 'NA';
		}

		if (item.location.coordinate instanceof Object &&
			item.location.coordinate.latitude !== undefined &&
			item.location.coordinate.longitude !== undefined) {
			entry.cords = {lat: item.location.coordinate.latitude, lon: item.location.coordinate.longitude};
		} else {
			//we dont need a business without coordinates
			continue;
		}

		if (item.location.city) {
			entry.city = item.location.city;
		} else {
			entry.city = 'NA';
		}

		if (item.rating) {
			entry.rating = item.rating;
		} else {
			entry.rating = 'NA';
		}

		if (item.display_phone) {
			entry.phone = item.display_phone;
		} else {
			entry.phone = 'NA';
		}

		if (item.snippet_image_url) {
			entry.photo = item.image_url;
		} else {
			entry.photo = 'http://www.megaicons.net/static/img/icons_sizes/8/60/256/science-business-icon.png';
		}

		if (item.url) {
			entry.url = item.url;
		} else {
			entry.url = 'NA';
		}

		if (item.snippet_text) {
			entry.description = item.snippet_text;
		} else {
			entry.description = 'NA';
		}

		parsed.push(entry);
	}
	return parsed;
};