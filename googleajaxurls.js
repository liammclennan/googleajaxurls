var gau = require('../googleajaxurls'),
    _ = require('underscore');

module.exports = function (options) {
    var defaults = { hashbangMode: false };
    defaults = _.extend(defaults, options);

    var decCodesToEscape = _.range(33).concat(35,37,38,43,_.range(127,256));

    function toEscapedFragment(url) {
        if (isHashbanger(url)) {
            var parts = url.split('#!');
            return parts[0] + getSeparator() + '_escaped_fragment_=' + encodeGau(parts[1]);
        }
        return url + getSeparator() + '_escaped_fragment_=';

        function getSeparator() {
            return url.indexOf('?') > -1 ? '&' : '?'
        }
    }

    function fromEscapedFragment(url) {
        if (url.indexOf('_escaped_fragment_=') === -1) return url;

        var parts = url.split('_escaped_fragment_=');

        return parts[0].substring(0, parts[0].length-1) + (defaults.hashbangMode ? '#!' : '') + decodeGau(parts[1]);
    }

    function isHashbanger(url) {
        return /#!/.test(url);
    }

    function encodeGau(fragment) {
        return _.reduce(fragment, function(memo, item) {
            memo += _(decCodesToEscape).contains(item.charCodeAt(0)) 
                ? encodeURIComponent(item) 
                : item;        
            return memo;
        }, '');
    }

    function decodeGau(fragment) {
        return decodeURIComponent(fragment);
    }

    return {
        toEscapedFragment: toEscapedFragment,
        fromEscapedFragment: fromEscapedFragment,
        __isHashbanger: isHashbanger,
        __encodeGau: encodeGau,
        __decodeGau: decodeGau
    };
};