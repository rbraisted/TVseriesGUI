"use strict";

function indexOf(arr, x) {
	var index = _.indexOf(arr, x);	//	check primitives
	if (index < 0) index = _.findIndex(arr, x); //	check objs - for sats, groups, receivers, etc
	return index;
}

(function(tvro) {

var

hash = window.location.hash.substring(1),
hashCallbacks = [
	function debug(hash) {
		console.log('calling hashCallbacks with '+hash+'!');
	}
];

tvro.hash = function(arg) {
	if (_.isFunction(arg)) {
		hashCallbacks.push(arg);
	} else if (_.isUndefined(arg)) {
		_.invoke(hashCallbacks, 'call', null, hash);
	} else {
		hash = arg;
		window.location.hash = '#'+hash;
	}
	return this;
}

tvro.hash.toString = function() {
	return hash;
}

tvro.hash.add = function(str) {
	tvro.hash(hash+'#'+str);
}

tvro.hash.remove = function(str) {
	tvro.hash(hash.replace(new RegExp('#'+str+'$'), ''));
}

window.onhashchange = function() {
	if (hash !== window.location.hash.substring(1)) {
		tvro.hash(window.location.hash.substring(1)).hash();
	}
}


}(window.tvro = window.tvro || {}));