$(document).ready(function () {
    var $window = $(window);
    var scrollTime = 0.7;
    var scrollDistance = 250;
    $window.on("mousewheel DOMMouseScroll", function (event) {
        event.preventDefault();
        var delta = event.originalEvent.wheelDelta / 120 || -event.originalEvent.detail / 3;
        var scrollTop = $window.scrollTop();
        var finalScroll = scrollTop - parseInt(delta * scrollDistance);

        TweenMax.to($window, scrollTime, {
            scrollTo: {y: finalScroll, autoKill: true},
            ease: Power1.easeOut,
            autoKill: true,
            overwrite: 5
        });

    });
    $('.accordion').accordion({
        singleOpen: false
    });
    pointMenuDot();
    clipThru();
    $(window).on('scroll', pointMenuDot);
    $(window).on('mousemove', parallaxBg);
    $(document).on("click", '.nav-mobile a, .button-box a, .logo a, .navigation__item', goToLink);
    $('.menu-slim').on("click", animateMenu);

    $('.tooltip').tooltipster({
        theme: 'tooltipster-light',
        contentAsHTML: true,
        viewportAware: true,
        maxWidth: 320,
        trigger:"custom",
        triggerOpen: {
            mouseenter: true,  // For mouse
            tap: true    // For touch device
        },
        triggerClose: {
            mouseleave: true,  // For mouse
            tap: true,    // For touch device
            scroll: true  // For touch device
        }
    });

    if(window.innerWidth >= 768) {
        skrollr.init({
            edgeStrategy: 'set',
            easing: {
                WTF: Math.random,
                inverted: function (p) {
                    return 1 - p;
                }
            },
            constants: {
                endimgmove: $('#indication').offset().top - $('.description__left img').offset().top - $('.description img').height()
            }
        });
    }
});


function clipThru() {
    $('#navigation').clipthru();
}

function pointMenuDot() {
    var winOffTop = $(window).scrollTop();
    $('.sectionSpy').each(function (i, e) {
        var elOffTop = $(e).offset().top;
        if (elOffTop <= winOffTop + 1) {
            $('.navigation__item').removeClass('active');
            $('.navigation__item[data-name="' + $(e).attr('id') + '"]').addClass('active');
        } else if (winOffTop + $(window).height() >= ($(document).height()-20)) {
            $('.navigation__item').removeClass('active');
            $('.navigation__item:last-child').addClass('active');
        }
    });
}


var leftStart = $('.desktop-img-bg').offset().left;
var topStart = $('.desktop-img-bg').offset().top;


    function parallaxBg(e) {
        if($(window).scrollTop() <= 0 || $(window).innerWidth >= 756) {
            var xpos = e.clientX;
            var ypos = e.clientY;
            $('.desktop-img-bg').css('left', ((leftStart / 3.5 + (xpos / 50)) + 'px'));
            $('.desktop-img-bg').css('top', ((topStart / 1.5 + (ypos / 30)) + 'px'));
        }
    }



function goToLink(e) {
    e.preventDefault();
    var id  = $(this).attr('href');
    var h = $('header').height();
    var top;
    if(window.innerWidth <= 768){
        top = $(id).offset().top - h;
    } else {
        top = $(id).offset().top;
    }
    $('body,html').stop(true).animate({scrollTop: top}, 1000);

    var tlMenu = new TimelineMax();
    tlMenu
        .staggerTo('.nav-mobile a', 0.5, {x: '-500%'}, 0.1)
        .to('.nav-mobile', 0.3, {
            bottom: '100%'
        }, "-=0.3");
    $('.menu-slim').removeClass("menu-js-toggle");
}

function animateMenu() {
    $(this).toggleClass("menu-js-toggle");
    var tlMenu = new TimelineMax();
    if ($(this).hasClass("menu-js-toggle")) {
        tlMenu
            .to('.nav-mobile', 0.3, {
                bottom: '0%',
                ease: Power3.easeOut
            })
            .staggerTo('.nav-mobile a', 0.5, {x: '0%'}, 0.1);
    }
    else {
        tlMenu
            .staggerTo('.nav-mobile a', 0.5, {x: '-500%'}, 0.1)
            .to('.nav-mobile', 0.3, {
                bottom: '100%',
                ease: Power3.easeOut
            }, "-=0.3");
    }
}