/********** zenscroll code ************/

!function(t,e){"function"==typeof define&&define.amd?define([],e()):"object"==typeof module&&module.exports?module.exports=e():function n(){document&&document.body?t.zenscroll=e():setTimeout(n,9)}()}(this,function(){"use strict";var t=function(t){return t&&"getComputedStyle"in window&&"smooth"===window.getComputedStyle(t)["scroll-behavior"]};if("undefined"==typeof window||!("document"in window))return{};var e=function(e,n,o){n=n||999,o||0===o||(o=9);var i,r=function(t){i=t},u=function(){clearTimeout(i),r(0)},c=function(t){return Math.max(0,e.getTopOf(t)-o)},a=function(o,i,c){if(u(),0===i||i&&i<0||t(e.body))e.toY(o),c&&c();else{var a=e.getY(),f=Math.max(0,o)-a,s=(new Date).getTime();i=i||Math.min(Math.abs(f),n),function t(){r(setTimeout(function(){var n=Math.min(1,((new Date).getTime()-s)/i),o=Math.max(0,Math.floor(a+f*(n<.5?2*n*n:n*(4-2*n)-1)));e.toY(o),n<1&&e.getHeight()+o<e.body.scrollHeight?t():(setTimeout(u,99),c&&c())},9))}()}},f=function(t,e,n){a(c(t),e,n)},s=function(t,n,i){var r=t.getBoundingClientRect().height,u=e.getTopOf(t)+r,s=e.getHeight(),l=e.getY(),d=l+s;c(t)<l||r+o>s?f(t,n,i):u+o>d?a(u-s+o,n,i):i&&i()},l=function(t,n,o,i){a(Math.max(0,e.getTopOf(t)-e.getHeight()/2+(o||t.getBoundingClientRect().height/2)),n,i)};return{setup:function(t,e){return(0===t||t)&&(n=t),(0===e||e)&&(o=e),{defaultDuration:n,edgeOffset:o}},to:f,toY:a,intoView:s,center:l,stop:u,moving:function(){return!!i},getY:e.getY,getTopOf:e.getTopOf}},n=document.documentElement,o=function(){return window.scrollY||n.scrollTop},i=e({body:document.scrollingElement||document.body,toY:function(t){window.scrollTo(0,t)},getY:o,getHeight:function(){return window.innerHeight||n.clientHeight},getTopOf:function(t){return t.getBoundingClientRect().top+o()-n.offsetTop}});if(i.createScroller=function(t,o,i){return e({body:t,toY:function(e){t.scrollTop=e},getY:function(){return t.scrollTop},getHeight:function(){return Math.min(t.clientHeight,window.innerHeight||n.clientHeight)},getTopOf:function(t){return t.offsetTop}},o,i)},"addEventListener"in window&&!window.noZensmooth&&!t(document.body)){var r="history"in window&&"pushState"in history,u=r&&"scrollRestoration"in history;u&&(history.scrollRestoration="auto"),window.addEventListener("load",function(){u&&(setTimeout(function(){history.scrollRestoration="manual"},9),window.addEventListener("popstate",function(t){t.state&&"zenscrollY"in t.state&&i.toY(t.state.zenscrollY)},!1)),window.location.hash&&setTimeout(function(){var t=i.setup().edgeOffset;if(t){var e=document.getElementById(window.location.href.split("#")[1]);if(e){var n=Math.max(0,i.getTopOf(e)-t),o=i.getY()-n;0<=o&&o<9&&window.scrollTo(0,n)}}},9)},!1);var c=new RegExp("(^|\\s)noZensmooth(\\s|$)");window.addEventListener("click",function(t){for(var e=t.target;e&&"A"!==e.tagName;)e=e.parentNode;if(!(!e||1!==t.which||t.shiftKey||t.metaKey||t.ctrlKey||t.altKey)){if(u){var n=history.state&&"object"==typeof history.state?history.state:{};n.zenscrollY=i.getY();try{history.replaceState(n,"")}catch(t){}}var o=e.getAttribute("href")||"";if(0===o.indexOf("#")&&!c.test(e.className)){var a=0,f=document.getElementById(o.substring(1));if("#"!==o){if(!f)return;a=i.getTopOf(f)}t.preventDefault();var s=function(){window.location=o},l=i.setup().edgeOffset;l&&(a=Math.max(0,a-l),r&&(s=function(){history.pushState({},"",o)})),i.toY(a,null,s)}}},!1)}return i});



let rootElement = document.documentElement;
let body = document.body;


/****** rotating header *******/

let nav = document.querySelector('.nav');
let header = document.querySelector('.header');

let styles = window.getComputedStyle(nav);
let navHeight = styles.getPropertyValue('height');
header.style.setProperty('--navheight', navHeight)


/* https://stackoverflow.com/questions/31223341/detecting-scroll-direction */
var lastScrollTop = 0;
window.addEventListener("scroll", function(){ // or 
   var st = window.pageYOffset || document.documentElement.scrollTop; 
   if (st > lastScrollTop) {
      nav.classList.add('is--scrolling');
   } else {
      nav.classList.remove('is--scrolling');
   }
   lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
}, false);




/*******  HEADER/HERO ANIMATION  ******/

let tl = gsap.timeline();
var headingOneBefore = CSSRulePlugin.getRule('.header__heading-one::before');
var headingTwoBefore = CSSRulePlugin.getRule('.header__heading-two::before');


function init() {
    tl.to([headingOneBefore, headingTwoBefore], {stagger: 0.4, duration: 1.2, cssRule: {scaleY: 0}})
    .fromTo('.header__summary', {
        opacity: 0, 
        y: 100,
        ease: 'power1'
    }, {
        opacity: 1,
        y: 0,
        ease: 'power4',
        duration: .7
    }, "<.4")
    .fromTo(['.header__button', '.header__image'], {
        opacity: 0,
        x: '600px'
    }, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power4.out'
    }, "<.6")
    .fromTo('.header__heading', {
        backgroundImage: 'none'
    }, {
        backgroundImage: 'url(../img/brush.png)',
    }, "<")
}

/* change to main .header if the header__grid has issues */
window.addEventListener("load", function(event) {
  gsap.set(".header__grid", {autoAlpha:1})
  init(); 
});


/*******  INTRO HEADER ANIMATION  ******/
let introHeadings = document.querySelectorAll('.intro__beauty, .intro__usability');

let tlTwo = gsap.timeline();

tlTwo.fromTo('.intro__beauty', {
    opacity: 0,
    x: '-300px',
    y: '-50%'
}, {
    opacity: 1,
    x: 0,
    y: '-50%',
    translateY: '-50%',
    duration: 1.2
})
tlTwo.fromTo('.intro__usability', {
    opacity: 0,
    x: '350px',
    y: '-60%'
}, {
    opacity: 1,
    x: '45%',
    y: '-60%',
    duration: 1.2
}, "<")


if ("IntersectionObserver" in window) {
    const appearOptions = {
        threshold: 1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            /* i had issues embedding the tweens in here so i just am controlling play/pause and putting tweens outside the observing code..see rodrigo and mikels 1st two posts here: https://greensock.com/forums/topic/20831-svg-tweenmax-and-intersection-observer */
            
            if (!entry.isIntersecting) {
                tlTwo.pause(0);
            } else {
                tlTwo.play();
                observer.unobserve(entry.target);
            }
        })
    }, appearOptions)
    
    introHeadings.forEach((el) => observer.observe(el)) 
    
} else {
    /*** Fallback for older browsers ****/
    
}




/*******  INTRO COLORED ICONS ANIMATION  ******/
let introIconSects = document.querySelectorAll('.intro__sect')


const tweenOne = gsap.fromTo(introIconSects[0], {
    opacity: 0,
    y: '100'
}, {
    opacity: 1,
    y: 0,
    duration: 2
})
const tweenTwo = gsap.fromTo(introIconSects[1], {
    opacity: 0,
    y: '100'
}, {
    opacity: 1,
    y: 0,
    duration: 2
})
const tweenThree = gsap.fromTo(introIconSects[2], {
    opacity: 0,
    y: '100'
}, {
    opacity: 1,
    y: 0,
    duration: 2
})


if ("IntersectionObserver" in window) {
    const appearOptions = {
        threshold: 1
    };
    
    const observerTwo = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            
            if (!entry.isIntersecting && entry.target.classList.contains('intro__sect--one')) {
                tweenOne.pause(0);
            } else if (entry.isIntersecting && entry.target.classList.contains('intro__sect--one')) {
                tweenOne.play();
                observerTwo.unobserve(entry.target);
            }
            
            if (!entry.isIntersecting && entry.target.classList.contains('intro__sect--two')) {
                tweenTwo.pause(0);
            } else if (entry.isIntersecting && entry.target.classList.contains('intro__sect--two')) {
                tweenTwo.play();
                observerTwo.unobserve(entry.target);
            }
            
            if (!entry.isIntersecting && entry.target.classList.contains('intro__sect--three')) {
                tweenThree.pause(0);
            } else if (entry.isIntersecting && entry.target.classList.contains('intro__sect--three')) {
                tweenThree.play();
                observerTwo.unobserve(entry.target);
            }
        })
    }, appearOptions)
    
    introIconSects.forEach((el) => observerTwo.observe(el)) 
    
} else {
    /*** Fallback for older browsers ****/
    
}


/********** SKEW SECTION ANIMATION  ***********/

let skewSects = document.querySelectorAll('.skew__cell-wrap');
let skewCircles = document.querySelectorAll('.skew__circle');

const tweenTwoOne = gsap.fromTo(skewSects[0], {
    opacity: 0,
    y: '100'
}, {
    opacity: 1,
    y: 0,
    duration: 2
})
const tweenTwoTwo = gsap.fromTo(skewSects[1], {
    opacity: 0,
    y: '100'
}, {
    opacity: 1,
    y: 0,
    duration: 2
})
const tweenTwoThree = gsap.fromTo(skewSects[2], {
    opacity: 0,
    y: '100'
}, {
    opacity: 1,
    y: 0,
    duration: 2
})

if ("IntersectionObserver" in window) {
    const appearOptions = {
        threshold: 1
    };
    
    const observerThree = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            
            if (!entry.isIntersecting && entry.target.classList.contains('skew__circle--one')) {
                tweenTwoOne.pause(0);
            } else if (entry.isIntersecting && entry.target.classList.contains('skew__circle--one')) {
                tweenTwoOne.play();
                observerThree.unobserve(entry.target);
            }
            
            if (!entry.isIntersecting && entry.target.classList.contains('skew__circle--two')) {
                tweenTwoTwo.pause(0);
            } else if (entry.isIntersecting && entry.target.classList.contains('skew__circle--two')) {
                tweenTwoTwo.play();
                observerThree.unobserve(entry.target);
            }
            
            if (!entry.isIntersecting && entry.target.classList.contains('skew__circle--three')) {
                tweenTwoThree.pause(0);
            } else if (entry.isIntersecting && entry.target.classList.contains('skew__circle--three')) {
                tweenTwoThree.play();
                observerThree.unobserve(entry.target);
            }
        })
    }, appearOptions)
    
    skewCircles.forEach((el) => observerThree.observe(el)) 
    
} else {
    /*** Fallback for older browsers ****/
    
}

