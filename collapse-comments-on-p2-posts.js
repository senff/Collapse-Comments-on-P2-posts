// ==UserScript==
// @name         Collapse P2 comments by default
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Collapse all comments on a P2 post by default
// @author       Senff
// @require      https://code.jquery.com/jquery-1.12.4.js
// @match        https://*.wordpress.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=wordpress.com
// @grant        GM_setClipboard
// ==/UserScript==

var $ = window.jQuery;

$('body').on('click','a.open-comments',function(oc){
    console.log('opening comments');
    $('article > .o2-post-comments').show().removeClass('comments-collapsed').addClass('comments-visible');
    $('.open-comments').css('display','none');
    $('.close-comments').css('display','inline');
    oc.preventDefault();
});

$('body').on('click','a.close-comments',function(cc){
    $('article > .o2-post-comments').addClass('comments-collapsed').removeClass('comments-visible');
    $('.close-comments').css('display','none');
    $('.open-comments').css('display','inline');
    cc.preventDefault();
});

var checkIfLoaded = setInterval(function() {
    if($('body.single-post').length) {
        if(!$('.comments-collapsed').length) {
            $('body').append('<style type="text/css" id="P2-comment-styles">article > .o2-post-comments{overflow: hidden; display: none !important;}article > .o2-post-comments.comments-visible{display: block !important;}</style>');
            $('#comments-count').append(' - <a href="#" class="open-comments" style="display: inline;">Show All</a> <a href="#" class="close-comments" style="display: none;">Hide All</a>');
            $('article > .o2-post-comments').addClass('comments-collapsed');
            clearInterval(checkIfLoaded);
        } else {
            clearInterval(checkIfLoaded);
        }
    } else {
        clearInterval(checkIfLoaded);
    }
}, 100);
