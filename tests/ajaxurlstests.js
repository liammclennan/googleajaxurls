var assert = require('assert'),
    gau = require('../googleajaxurls');

assert.equal(gau.toEscapedFragment('http://domain.com/#!key1=value1&key2=value2'), 'http://domain.com/?_escaped_fragment_=key1=value1%26key2=value2')


// gau.toEscapedFragment('http://domain.com/#!key1=value1&key2=value2') == 'http://domain.com/?_escaped_fragment_=key1=value1%26key2=value2'
// gau.fromEscapedFragment('http://domain.com/?_escaped_fragment_=key1=value1%26key2=value2') == 'http://domain.com/#!key1=value1&key2=value2'
// gau.toEscapedFragment('http://domain.com/some/read/path?arg1=one&arg2=two') == 'http://domain.com/some/read/path?arg1=one&arg2=two&_escaped_fragment_='
// gau.fromEscapedFragment('http://domain.com/some/read/path?arg1=one&arg2=two') == 'http://domain.com/some/read/path?arg1=one&arg2=two&_escaped_fragment_='
// gau.toEscapedFragment('http://domain.com/some/read/path') == 'http://domain.com/some/read/path?_escaped_fragment_='
// gau.fromEscapedFragment('http://domain.com/some/read/path?_escaped_fragment_=') == 'http://domain.com/some/read/path'