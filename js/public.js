var ky = {};
if(typeof define === 'function' && define.amd) {
	define(['jquery'], function ($) {
		return ky;
	});
}

;(function (ky) {
	function extend(target, source, deep) {
		for(var key in source) {
			if(deep && ky.utils.isArray(source[key])) {
				if(ky.utils.isArray(source[key]) && !ky.utils.isArray(target[kye])) {
					target[key] = [];
				}
				extend(target[key], source[key], deep);
			}
			else {
				if(source[key] != undefined) {
					target[key] = source[key];
				}
			}
		}
	}
	ky.extend = extend;
})(ky); 
;(function(window, ky) {
	var isXXX = {
		isNaN: function (o) {
			return o !== o;
		},
		isString: function (o) {
			return typeof o === 'string'
		},
		isNumber: function (o) {
			return typeof o === 'number'
		},
		isArray: function (o) {
			if(typeof Array.isArray === 'function') {
				return Array.isArray(o);
			}
			else {
				return Object.prototype.toString.call(o) === '[object Array]';
			}
		},
		isEmptyObject: function (o) {
			for(var k in o) {
				return false;
			}
			return true;
		}
	}

	ky.extend(ky, utils);
})(window, ky);
;(function(window, ky) {
	function trim(str) {
		return str == null ? 
			'' :
			(str + '').replace(/^(\s+)|(\s+)$/g, '');
	}
	function rtrim(str) {
		return str == null ?
			'' :
			(str + '').replace(/(\s+)$/, '');
	}
	function ltrim(str) {
		return str == null ?
			'' :
			(str + '').replace(/^(\s+)/, '');
	}
	ky.trim = trim;
	ky.rtrim = rtrim;
	ky.ltrim = ltrim;
})(window, ky);