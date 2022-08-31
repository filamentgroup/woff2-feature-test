:warning: This project is archived and the repository is no longer maintained.

woff2-feature-test
==================

A simple feature test for the WOFF2 font format.

* Available on [NPM as `woff2-feature-test`](https://www.npmjs.com/package/woff2-feature-test)

## Use Case

Given that we [use `loadCSS` to asynchronously load a stylesheet containing all of our typefaces as data URIs](https://github.com/filamentgroup/loadCSS#usage-example-with-content-fonts), we need a way to programmatically determine if the WOFF2 format is supported in the browser.

```
var fontFile = "/url/to/woff.css";

// Use WOFF2 if supported
if( supportsWoff2 ) {
	fontFile = "/url/to/woff2.css";
}

loadCSS( fontFile );
```

## Requirements

1. Must not make an HTTP request to a remote server, anything using a remote test file was out.
1. Prefer a synchronous approach to an asynchronous one, we want it to execute and the result to be available immediately.
1. More than just an inference. It was suggested that we could infer based on the existence of the [Font Loading API](http://caniuse.com/#feat=font-loading) given that it currently matches support for [WOFF2](http://caniuse.com/#feat=woff2). But what happens if a browser implements the Font Loading API but doesn’t implement WOFF2? This scenario seemed entirely possible and we didn’t want any false positives.

## Approach

We use the Font Loading API to load an empty WOFF2 data URI and see if the font set status is loading or not. If it attempts to load, the format is supported. If it does not, the format is unrecognized (see the [intentionally failing test with an imaginary format](http://filamentgroup.github.io/woff2-feature-test/fail.html)).

## [Demo](http://filamentgroup.github.io/woff2-feature-test/test.html)

If a browser eventually implements the WOFF2 format but does not implement the Font Loading API, this script will report a false negative (which is preferable to the false positive scenarios described above).

## Limitations

Note that if you use a restrictive [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/Security/CSP/CSP_policy_directives#font-src) header on `font-src`, that can cause issues with this feature test.

You’ll also need to make sure your [Content Security Policy allows Data URIs](https://developer.mozilla.org/en-US/docs/Web/Security/CSP/CSP_policy_directives#Data).

For example, github.com (not github.io) uses `Content-Security-Policy:default-src *; font-src assets-cdn.github.com;` which denies our `@font-face` Data URI.

## Addendum

A few previous revisions of this script can be found [on a gist](https://gist.github.com/zachleat/68611e730f6c2280e8c9).
