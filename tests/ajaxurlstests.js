var assert = require('assert'),
    gau = require('../googleajaxurls')(),
    gauHashbang = require('../googleajaxurls')({hashbangMode:true});

assert(gau.__isHashbanger('http://domain.com/#!key1=value1&key2=value2'));
assert(gau.__isHashbanger('http://domain.com?foo=bar&bar=foo#!key1=value1&key2=value2'));
assert(!gau.__isHashbanger('http://domain.com/#key1=value1&key2=value2'));
assert(!gau.__isHashbanger('http://domain.com?foo=bar&bar=foo'));

assert.equal(gau.__encodeGau('Ac#&+a%Z=t'), 'Ac%23%26%2Ba%25Z=t', 'encoding');
assert.equal(gau.__decodeGau(gau.__encodeGau('Ac#&+a%Z=t')), 'Ac#&+a%Z=t', 'decoding encoded');

assert.equal(
    gau.toEscapedFragment('http://domain.com/#!key1=value1&key2=value2'), 
    'http://domain.com/?_escaped_fragment_=key1=value1%26key2=value2', 
    'converting basic hashfragment'
);

assert.equal(
    gau.fromEscapedFragment('http://domain.com/#!key1=value1&key2=value2'),
    'http://domain.com/#!key1=value1&key2=value2', 
    'reverting non-converted url'
);

assert.equal(
    gauHashbang.fromEscapedFragment('http://domain.com/?_escaped_fragment_=key1=value1%26key2=value2'),
    'http://domain.com/#!key1=value1&key2=value2', 
    'reverting basic hashfragment'
);

assert.equal(
    gau.fromEscapedFragment('http://domain.com/?key1=value1%26key2=value2&_escaped_fragment_='),
    'http://domain.com/?key1=value1%26key2=value2', 
    'reverting basic hashfragment'
);

assert.equal(
    gau.toEscapedFragment('http://domain.com/#!some/read/path'), 
    'http://domain.com/?_escaped_fragment_=some/read/path', 
    'converting hashfragment with path'
);

assert.equal(
    gauHashbang.fromEscapedFragment('http://domain.com/?_escaped_fragment_=some/read/path'), 
    'http://domain.com/#!some/read/path', 
    'converting hashfragment with path'
);

assert.equal(
    gau.toEscapedFragment('http://domain.com/?query1=val1#!some/read/path'), 
    'http://domain.com/?query1=val1&_escaped_fragment_=some/read/path', 
    'converting hashfragment query params'
);

assert.equal(
    gauHashbang.fromEscapedFragment('http://domain.com/?query1=val1&_escaped_fragment_=some/read/path'), 
    'http://domain.com/?query1=val1#!some/read/path',
    'converting hashfragment query params'
);

assert.equal(
    gau.toEscapedFragment('http://domain.com/some/read/path?arg1=one&arg2=two'),
    'http://domain.com/some/read/path?arg1=one&arg2=two&_escaped_fragment_=',
    'converting non-hash fragment with path and args'
);

assert.equal(
    gau.fromEscapedFragment('http://domain.com/some/read/path?arg1=one&arg2=two&_escaped_fragment_='),
    'http://domain.com/some/read/path?arg1=one&arg2=two',
    'converting non-hash fragment with path and args'
);

assert.equal(
    gau.toEscapedFragment('http://domain.com/some/read'),
    'http://domain.com/some/read?_escaped_fragment_=',
    'converting non-hash fragment with path'
);

assert.equal(
    gau.fromEscapedFragment('http://domain.com/some/read?_escaped_fragment_='),
    'http://domain.com/some/read',
    'converting non-hash fragment with path'
);
