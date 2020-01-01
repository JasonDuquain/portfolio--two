

/********** zenscroll code ************/

!function(t,e){"function"==typeof define&&define.amd?define([],e()):"object"==typeof module&&module.exports?module.exports=e():function n(){document&&document.body?t.zenscroll=e():setTimeout(n,9)}()}(this,function(){"use strict";var t=function(t){return t&&"getComputedStyle"in window&&"smooth"===window.getComputedStyle(t)["scroll-behavior"]};if("undefined"==typeof window||!("document"in window))return{};var e=function(e,n,o){n=n||999,o||0===o||(o=9);var i,r=function(t){i=t},u=function(){clearTimeout(i),r(0)},c=function(t){return Math.max(0,e.getTopOf(t)-o)},a=function(o,i,c){if(u(),0===i||i&&i<0||t(e.body))e.toY(o),c&&c();else{var a=e.getY(),f=Math.max(0,o)-a,s=(new Date).getTime();i=i||Math.min(Math.abs(f),n),function t(){r(setTimeout(function(){var n=Math.min(1,((new Date).getTime()-s)/i),o=Math.max(0,Math.floor(a+f*(n<.5?2*n*n:n*(4-2*n)-1)));e.toY(o),n<1&&e.getHeight()+o<e.body.scrollHeight?t():(setTimeout(u,99),c&&c())},9))}()}},f=function(t,e,n){a(c(t),e,n)},s=function(t,n,i){var r=t.getBoundingClientRect().height,u=e.getTopOf(t)+r,s=e.getHeight(),l=e.getY(),d=l+s;c(t)<l||r+o>s?f(t,n,i):u+o>d?a(u-s+o,n,i):i&&i()},l=function(t,n,o,i){a(Math.max(0,e.getTopOf(t)-e.getHeight()/2+(o||t.getBoundingClientRect().height/2)),n,i)};return{setup:function(t,e){return(0===t||t)&&(n=t),(0===e||e)&&(o=e),{defaultDuration:n,edgeOffset:o}},to:f,toY:a,intoView:s,center:l,stop:u,moving:function(){return!!i},getY:e.getY,getTopOf:e.getTopOf}},n=document.documentElement,o=function(){return window.scrollY||n.scrollTop},i=e({body:document.scrollingElement||document.body,toY:function(t){window.scrollTo(0,t)},getY:o,getHeight:function(){return window.innerHeight||n.clientHeight},getTopOf:function(t){return t.getBoundingClientRect().top+o()-n.offsetTop}});if(i.createScroller=function(t,o,i){return e({body:t,toY:function(e){t.scrollTop=e},getY:function(){return t.scrollTop},getHeight:function(){return Math.min(t.clientHeight,window.innerHeight||n.clientHeight)},getTopOf:function(t){return t.offsetTop}},o,i)},"addEventListener"in window&&!window.noZensmooth&&!t(document.body)){var r="history"in window&&"pushState"in history,u=r&&"scrollRestoration"in history;u&&(history.scrollRestoration="auto"),window.addEventListener("load",function(){u&&(setTimeout(function(){history.scrollRestoration="manual"},9),window.addEventListener("popstate",function(t){t.state&&"zenscrollY"in t.state&&i.toY(t.state.zenscrollY)},!1)),window.location.hash&&setTimeout(function(){var t=i.setup().edgeOffset;if(t){var e=document.getElementById(window.location.href.split("#")[1]);if(e){var n=Math.max(0,i.getTopOf(e)-t),o=i.getY()-n;0<=o&&o<9&&window.scrollTo(0,n)}}},9)},!1);var c=new RegExp("(^|\\s)noZensmooth(\\s|$)");window.addEventListener("click",function(t){for(var e=t.target;e&&"A"!==e.tagName;)e=e.parentNode;if(!(!e||1!==t.which||t.shiftKey||t.metaKey||t.ctrlKey||t.altKey)){if(u){var n=history.state&&"object"==typeof history.state?history.state:{};n.zenscrollY=i.getY();try{history.replaceState(n,"")}catch(t){}}var o=e.getAttribute("href")||"";if(0===o.indexOf("#")&&!c.test(e.className)){var a=0,f=document.getElementById(o.substring(1));if("#"!==o){if(!f)return;a=i.getTopOf(f)}t.preventDefault();var s=function(){window.location=o},l=i.setup().edgeOffset;l&&(a=Math.max(0,a-l),r&&(s=function(){history.pushState({},"",o)})),i.toY(a,null,s)}}},!1)}return i});



let rootElement = document.documentElement;
let body = document.body;


/****** rotating header *******/

let nav = document.querySelector('.nav');
let header = document.querySelector('.header');

/*** CSS VARS unsupported in IE11 - fallback conditional code. See algorhythm's post in: https://stackoverflow.com/questions/26633258/how-can-i-detect-css-variable-support-with-javascript ***/
/* MAKE SURE margin-top of the header is the same for either condtional branch...TEST in big 4 browsers */

let computedStylesHeader = getComputedStyle(header);

if (computedStylesHeader.getPropertyValue('margin-top') === '10px') {
    console.log('css vars supported');
    let styles = window.getComputedStyle(nav);
    let navHeight = styles.getPropertyValue('height');
    header.style.setProperty('--navheight', navHeight);
} else {
    console.log('css vars UNsupported -- this should run in IE');
    let navHeight = nav.getBoundingClientRect().height;
    header.style.setProperty('margin-top', navHeight + 'px');
}


/* https://stackoverflow.com/questions/31223341/detecting-scroll-direction */

var isScrolling;

var lastScrollTop = 0;
window.addEventListener("scroll", function() { // or 
   var st = window.pageYOffset || document.documentElement.scrollTop; 
   if (st > lastScrollTop) {
      nav.classList.add('is--scrolling');
   } else {
      nav.classList.remove('is--scrolling');
   }
    
    /************************************************/
    /** that is not a Fat Arrow is is lt or eq!! ***/
    /***********************************************/
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    
    /* detect when a user has stopped scrolling: https://gomakethings.com/detecting-when-a-visitor-has-stopped-scrolling-with-vanilla-javascript/ */
    window.clearTimeout( isScrolling );
    
    isScrolling = setTimeout(function() {
        
		/* scrolling has stopped */
        nav.classList.remove('is--scrolling');
	}, 66);

}, false);




/**** HIGHLIGHT NAV SECTS ON CLICK ****/
let navList = document.querySelector('.nav__list');

/** this list does not include the home nav item or the logo as I do not want those highlighted on click */
let navLinks = document.querySelectorAll('.nav__link:not(.nav__link-not-active)');
let sects = Array.from(document.querySelectorAll('section.about, section.projects, section.contact'));

    
navList.addEventListener('click', function(e) {
    if (e.target.classList.contains('nav__link') && !e.target.classList.contains('nav__link-not-active')) {
        
        console.log('why')
        
        Array.prototype.slice.call(navLinks).forEach(function(el) {
            el.classList.remove('is--active');
            e.target.classList.add('is--active')
        })
    }
});

/**** HIGHLIGHT NAV SECTS ON SCROLL TO THAT SECT ****/

/** this list does not include the home nav item as I do not want that one highlighted on scroll */
let navLinksNoHome = document.querySelectorAll('.nav__link:not(.nav__link-no-home)');

window.addEventListener('scroll', function(e) {
    Array.prototype.slice.call(navLinksNoHome).forEach(function(el, idx) {
        let sect = sects[idx].getBoundingClientRect();
        if (sect.top <= 150 && sect.bottom >= 150) {
            el.classList.add('is--active');
        } else {
            el.classList.remove('is--active');
            
            /** remove the link from 'home' nav **/
            let homey = document.querySelector('.nav__link-no-home');
            if (homey.classList.contains('is--active')) {
                homey.classList.remove('is--active')
            }
        }
    })
})



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
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            /* i had issues embedding the tweens in here so i just am controlling play/pause and putting tweens outside the observing code..see rodrigo and mikels 1st two posts here: https://greensock.com/forums/topic/20831-svg-tweenmax-and-intersection-observer */
            
            if (!entry.isIntersecting) {
                tlTwo.pause(0);
            } else {
                tlTwo.play();
                observer.unobserve(entry.target);
            }
        })
    }, appearOptions)
    
    Array.prototype.slice.call(introHeadings).forEach(function(el) {
        observer.observe(el) 
    }) 
    
} else {
    /*** Fallback for older browsers ****/
    
}

/*******  INTRO COLORED ICONS ANIMATION  ******/
let introIconSects = document.querySelectorAll('.intro__sect')

if ("IntersectionObserver" in window) {
    const appearOptions = {
        threshold: 1
    };
    
    const observerTwo = new IntersectionObserver(function (entries, observer) {
        Array.prototype.slice.call(entries).forEach(function(entry) {
          
          var el = entry.target;
            
            if (!entry.isIntersecting && el.classList.contains('intro__sect')) {
                el.tween.pause(0);
            } else if (entry.isIntersecting && el.classList.contains('intro__sect')) {
                el.tween.play();
                observerTwo.unobserve(el);
            }
        })
    }, appearOptions)
    
    Array.prototype.slice.call(introIconSects).forEach(function(el) {
      el.tween = gsap.fromTo(el, {
        opacity: 0,
        y: 100
      }, {
        opacity: 1,
        y: 0,
        duration: 2
      })
      
      observerTwo.observe(el);
    });
    
} else {
    /*** Fallback for older browsers ****/
    
}


/********** SKEW SECTION ANIMATION  ***********/
/* this code uses skewSects and skewCircles so it cannot be shortened like the code above..plus there are delays on two of the tweens */

let skewSects = document.querySelectorAll('.skew__cell-wrap');
let skewCircles = document.querySelectorAll('.skew__circle');

/* REMEMBER -- the delays are one the lowest cell and the 2nd lowest cell..so the cell with heading 'FLUIDITY' is the highest (skewSects[2]) and does not have a delay */
const tweenTwoOne = gsap.fromTo(skewSects[0], {
    opacity: 0,
    y: '120'
}, {
    opacity: 1,
    y: 0,
    duration: 2,
    delay: 1.5
})
const tweenTwoTwo = gsap.fromTo(skewSects[1], {
    opacity: 0,
    y: '120'
}, {
    opacity: 1,
    y: 0,
    duration: 2,
    delay: .75
})
const tweenTwoThree = gsap.fromTo(skewSects[2], {
    opacity: 0,
    y: '120'
}, {
    opacity: 1,
    y: 0,
    duration: 2
})
const tweenTwoFour = gsap.fromTo(skewSects[3], {
    opacity: 0,
    y: '120'
}, {
    opacity: 1,
    y: 0,
    duration: 2,
    delay: 1.5
})
const tweenTwoFive = gsap.fromTo(skewSects[4], {
    opacity: 0,
    y: '120'
}, {
    opacity: 1,
    y: 0,
    duration: 2,
    delay: .75
})
const tweenTwoSix = gsap.fromTo(skewSects[5], {
    opacity: 0,
    y: '120'
}, {
    opacity: 1,
    y: 0,
    duration: 2
})

if ("IntersectionObserver" in window) {
    const appearOptions = {
        threshold: 1
    };
    
    const observerThree = new IntersectionObserver(function(entries, observer) {
        Array.prototype.slice.call(entries).forEach(function(entry) {
            
            if (!entry.isIntersecting && entry.target.classList.contains('skew__circle--one')) {
                tweenTwoOne.pause(0);
            } else if (entry.isIntersecting && entry.target.classList.contains('skew__circle--one')) {
                tweenTwoOne.play();
                observerThree.unobserve(entry.target);
            }
            
            if (!entry.isIntersecting && entry.target.classList.contains('skew__circle--two')) {
                tweenTwoTwo.pause(0);
            } else if (entry.isIntersecting && entry.target.classList.contains('skew__circle--two')) {
                
                /* it shows 0.999811 for intersectionRatio???? */
                
                tweenTwoTwo.play();
                observerThree.unobserve(entry.target);
            }
            
            if (!entry.isIntersecting && entry.target.classList.contains('skew__circle--three')) {
                tweenTwoThree.pause(0);
            } else if (entry.isIntersecting && entry.target.classList.contains('skew__circle--three')) {
                tweenTwoThree.play();
                observerThree.unobserve(entry.target);
            }
            
            if (!entry.isIntersecting && entry.target.classList.contains('skew__circle--four')) {
                tweenTwoFour.pause(0);
            } else if (entry.isIntersecting && entry.target.classList.contains('skew__circle--four')) {
                tweenTwoFour.play();
                observerThree.unobserve(entry.target);
            }
            
            if (!entry.isIntersecting && entry.target.classList.contains('skew__circle--five')) {
                tweenTwoFive.pause(0);
            } else if (entry.isIntersecting && entry.target.classList.contains('skew__circle--five')) {
                tweenTwoFive.play();
                observerThree.unobserve(entry.target);
            }
            
            if (!entry.isIntersecting && entry.target.classList.contains('skew__circle--six')) {
                tweenTwoSix.pause(0);
            } else if (entry.isIntersecting && entry.target.classList.contains('skew__circle--six')) {
                tweenTwoSix.play();
                observerThree.unobserve(entry.target);
            }
        })
    }, appearOptions)
    
    Array.prototype.slice.call(skewCircles).forEach(function(el) {
        observerThree.observe(el)
    }); 
    
} else {
    /*** Fallback for older browsers ****/
    
}



//////////////////*********************////////////////
////******** KEEP USING ES5 ONLY  ****////
////**** UPDATE CODE ABOVE TO ADD SCROLL HANDLERS FOR THE 'ELSE' CLAUSES OF ANY INTERSECTION OBSERVER CODE ****////////////////////
//////////////////*********************////////////////




/********** ABOUT SECTION FUNCTIONALITY and SKILLS ANIMATED CIRCLE %AGES ***********/

let aboutList = document.querySelector('.about__list');
let aboutLinks = document.querySelectorAll('.about__link');
let aboutSects = document.querySelectorAll('.about__sect');

let aboutSectsHeight = [];

Array.prototype.slice.call(aboutSects).forEach(function(el, idx) {
    aboutSectsHeight.push(el.scrollHeight);
}); 

let percent = document.querySelector('.about__percent');
let percentTwo = document.querySelector('.about__percent-two');
let percentThree = document.querySelector('.about__percent-three');
let percentFour = document.querySelector('.about__percent-four');


aboutList.addEventListener('click', function(e) {
    e.preventDefault();
    
    if (e.target.classList.contains('about__link') && !e.target.classList.contains('about__link--current')) {
        Array.prototype.slice.call(aboutLinks).forEach(function  (el, idx) {
            el.classList.remove('about__link--current');
            aboutSects[idx].classList.remove('about__sect--visible');
            aboutSects[idx].style.height = 0;
            e.target.classList.add('about__link--current');

            if (e.target.getAttribute('href').slice(1) === aboutSects[idx].getAttribute('data-id')) {
                aboutSects[idx].classList.add('about__sect--visible');
                aboutSects[idx].style.height = aboutSectsHeight[idx] + 'px';
            }
        });
    }
    
    /**** MAKE SURE SVG CIRCLE ANIMATION ONLY RUNS ONCE ****/
    if (e.target.classList.contains('about__link-skills')) {
        
        if (!sessionStorage.getItem('animate')) {

        let num = 0;
        let numTwo = 0;
        let numThree = 0;
        let numFour = 0;
            
        let clearIt = setInterval(function() {
            num += 4.5;
            percent.textContent = num.toFixed(0) + '%';
        }, 100);

        let clearItTwo = setInterval(function() {
            numTwo += 3.8;
            console.log(numTwo)
            percentTwo.textContent = numTwo.toFixed(0) + '%';
        }, 100);

        let clearItThree = setInterval(function() {
            numThree += 2.7;
            percentThree.textContent = numThree.toFixed(0) + '%';
        }, 100);

        let clearItFour = setInterval(function() {
            numFour += 2;
            percentFour.textContent = numFour.toFixed(0) + '%';
        }, 100);

        setTimeout(function() {
            clearInterval(clearIt); 
            clearInterval(clearItTwo); 
            clearInterval(clearItThree); 
            clearInterval(clearItFour); 
        }, 2000);
  
        } else {
            
            /* code to keep animation from running but make sure the strokes and numbers are in place */
            let svgPaths = document.querySelectorAll('.about__progress svg:nth-child(2) path');
            Array.prototype.slice.call(svgPaths).forEach(function(el) {
                /* setting animation play state to paused keeps the strokes from appearing */
                el.style.animation = 'none';
            })
            
            percent.textContent = '90%';
            percentTwo.textContent = '76%';
            percentThree.textContent = '54%';
            percentFour.textContent = '40%';
        }

        sessionStorage.setItem('animate', 'once');
    }
    
});


/************* PROJECTS ANIMATIONS  ***************/
let projectsCellTwo = document.querySelector('.projects__grid-cell--two');
let projectsCellTwoBefore = CSSRulePlugin.getRule('.projects__grid-cell--two::before');
let projectsImageOne = document.querySelector('.projects__image--one');

let tlThree = gsap.timeline();

tlThree.fromTo(projectsCellTwoBefore, {
    cssRule: {
        left: '-110%'
    }
}, {
    cssRule: {
        left: '110%'
    },
    duration: 1.2,
    ease: 'linear'
})
tlThree.fromTo(projectsCellTwo, {
     x: '-40px'
}, {
    x: 0,
    duration: 1.4,
    ease: Power4
}, "<")
.fromTo(projectsImageOne, {
    visibility: 'hidden'
}, {
    visibility: 'visible',
    duration: .1
}, "<.6")
/* setbackground color to black to the hover animation works */
.set(projectsCellTwo, { backgroundColor: '#000' })


/*** HIGHLIGHT ICONS ON FORM ELEMENTS FOCUS ***/

let inputs = document.querySelectorAll('input, textarea');

Array.prototype.slice.call(inputs).forEach(function(el) {
    el.addEventListener('focus', focusInput)
});

Array.prototype.slice.call(inputs).forEach(function(el) {
    el.addEventListener('blur', focusBlur)
});

function focusInput(e) {
    let svg = e.target.previousElementSibling.children[0];
    let span = e.target.previousElementSibling;
    svg.style.fill = 'hsl(250, 18%, 25%)';
    span.style.backgroundColor = 'transparent'
}

function focusBlur(e) {
    let svg = e.target.previousElementSibling.children[0];
    let span = e.target.previousElementSibling;
    svg.style.fill = 'white';
    span.style.backgroundColor = 'hsl(250, 18%, 25%)';
}


/********   BACK TO TOP BTN  *********/
let docElement = document.documentElement;
let docBody = document.body;
let bttBtn = document.querySelector('.js-btt-btn');
let highestHeight = docElement.scrollHeight;

//changed from document to window - still not working on mobile
window.addEventListener('scroll', function(e) {
    (window.pageYOffset > (highestHeight / 8)) ? bttBtn.classList.add('active') : bttBtn.classList.remove('active');
});


/********  COPYRIGHT DATE *******/
let year = document.querySelector('.year');
year.textContent = new Date().getFullYear();


