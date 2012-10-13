Googleajaxurls
==============

Convert to and from the url format required by the [Google's Ajax Crawling Specification](https://developers.google.com/webmasters/ajax-crawling/docs/specification).

    http://domain.com/#!key1=value1&key2=value2

becomes

    http://domain.com/?_escaped_fragment_=key1=value1%26key2=value2

Usage
----

### Hashbang Mode

    var googleajaxurls = require('googleajaxurls')({hashbangMode: true}),
        startUrl = 'http://domain.com/#!one/two/three';
    
    googleajaxurls.toEscapedFragment(startUrl); // 					--> http://domain.com/?_escaped_fragment_=one%2Ftwo%2Fthree
    googleajaxurls.fromEscapedFragment(googleajaxurls.toEscapedFragment(startUrl)); // 	--> http://domain.com/#!one/two/three
   
### Normal Mode

    var googleajaxurls = require('googleajaxurls')(),
        startUrl = 'http://domain.com/one/two/three';
    
    googleajaxurls.toEscapedFragment(startUrl); //                  --> http://domain.com/one/two/three?_escaped_fragment_=
    googleajaxurls.fromEscapedFragment(googleajaxurls.toEscapedFragment(startUrl)); //  --> http://domain.com/one/two/three
   