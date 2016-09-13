module.exports = function (data, term) {
    var parsed = [];
    var imagees = 'images/';
    var coffee = ['coffee'],
        food = ['food', 'eatery', 'restorant', 'dinner', 'eat'],
        alcohol = ['beer', 'drink', 'drinking'],
        shop = ['shopping', 'mall', 'shop', 'fashion']
        fun = ['fun', 'entertainment','enjoyble','mockery','excitement'];

    for (var item of data){
        if (item.name) {
            entry.name = item.name;
        } else {
            //we dont need a business without a name
            continue;
        }

        var entry = {};
        if (item.location.address) {
            entry.address = item.location.address;
        } else {
            entry.address = 'NA';
        }

        if (item.categories instanceof Array && item.categories.length > 0) {
            entry.categories = [];
            item.categories.forEach(function (e) {
                if (e.name) {
                    entry.categories.push(e.name);
                }
            });
        } else {
            entry.categories = 'NA';
        }

        if (item.location instanceof Object &&
            item.location.lat !== undefined &&
            item.location.lng !== undefined) {
            entry.cords = {lat: item.location.lat, lon: item.location.lng};
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

        if (item.contact.phone) {
            entry.phone = item.contact.phone;
        } else {
            entry.phone = 'NA';
        }

        if (coffee.indexOf(term) !== -1) {
            entry.photo = imagees + 'coffee.png';
        } else if (alcohol.indexOf(term) !== -1) {
            entry.photo = imagees + 'beer.png';
        } else if (food.indexOf(term) !== -1) {
            entry.photo = imagees + 'food.png';
        } else if (shop.indexOf(term) !== -1) {
            entry.photo = imagees + 'shop.png';
        }  else if (fun.indexOf(term) !== -1) {
            entry.photo = imagees + 'fun.png';
        } else {
            entry.photo = 'http://www.megaicons.net/static/img/icons_sizes/8/60/256/science-business-icon.png';
        }

        if (item.url) {
            entry.url = item.url;
        } else {
            entry.url = 'NA';
        }

        if (item.description) {
            entry.description = item.description;
        } else {
            entry.description = 'NA';
        }

        parsed.push(entry);
    }
    return parsed;
};