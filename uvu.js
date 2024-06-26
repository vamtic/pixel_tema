// ==UserScript==
// @name     _Override banner_url styles
// @include  http://YOUR_SERVER.COM/YOUR_PATH/*
// @grant    GM_addStyle
// @run-at   document-start
// ==/UserScript==

GM_addStyle ( `
    .banner_url {
        background: url('http://www.pxleyes.com/images/contests/kiwis/fullsize/sourceimage.jpg') no-repeat center center fixed !important;
        -webkit-background-size: cover !important;
        -moz-background-size: cover !important;
        -o-background-size: cover !important;
        background-size: cover !important;
    }
` );
