$(document).ready(function () {
  lazy();
  cover();
  banner()
  gallery();
  nav();
  popup();
  scrollpage();
});
$(window).resize(function () {
  innerWidth = $('body').innerWidth();
});

//global variables
var innerWidth = $('body').innerWidth();

//nav
function nav() {
  var $navButton = $('.nav-open'),
    $navClose = $('.nav__close, .scroll-button'),
    $nav = $('.header__nav'),
    $page = $('.wrapper__container'),
    $overlay = $('.overlay')

  $navButton.on('click', function (e) {
    e.preventDefault();
    $nav.toggleClass('header__content_visible');
    navState();
  })
  $navClose.on('click', function () {
    $nav.removeClass('header__content_visible');
    navState();
  })
  $overlay.on('click touchstart', function () {
    $nav.removeClass('header__content_visible');
    navState();
  })
  
  function navState() {
    if ($nav.hasClass('header__content_visible')) {
      scrollLock.hide($("body"));
      $page.addClass('active');
      $overlay.fadeIn(300);
    } else {
      scrollLock.show($("body"));
      $page.removeClass('active');
      $overlay.fadeOut(300);
    }
  }
  $(window).resize(function () {
    if (innerWidth > 992) {
      $nav.removeClass('header__content_visible');
      navState();
    }
  });
}
//lazy
function lazy() {
  $(".lazy").Lazy({
    visibleOnly: false,
    threshold: '500',
    effect: 'fadeIn',
    effectTime: '300',
    afterLoad: function() {
      cover();
    }
  });
}
//image-cover-box
function cover() {
  $('.cover-box').each(function() {
    //set size
    var th = $(this).height(),//box height
        tw = $(this).width(),//box width
        im = $(this).children('img'),//image
        ih = im.height(),
        iw = im.width();
    if ((tw/th) >= (iw/ih)) {
        im.addClass('ww').removeClass('wh');
    } else {
        im.addClass('wh').removeClass('ww');
    }
  });
}
//banner
function banner() {
  var $slider = $('.banner-slider__container');

  $slider.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
    //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
    $('.banner-slider__current').text((currentSlide ? currentSlide : 0) + 1);
    $('.banner-slider__count').text(slick.slideCount);
    lazy();
  });

  $slider.slick({
    infinite: true,
    dots: false,
    arrows: true,
    fade: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: '.banner-slider__prev',
    nextArrow: '.banner-slider__next'
  });
}

//gallery
function gallery() {
  var $slider = $('.gallery-slider__container');
  $slider.on('afterChange', function(event){
    lazy();
  });
  $slider.slick({
    infinite: true,
    dots: false,
    arrows: true,
    fade: false,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 4,
    prevArrow: '.gallery-slider__prev',
    nextArrow: '.gallery-slider__next',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
}

//popup
function popup() {
  var selector = '.gallery-slide:not(.slick-cloned)';

  // Skip cloned elements
  $().fancybox({
    selector : selector,
    backFocus : false,
    loop: true
  });

  $(document).on('click', '.slick-cloned', function(e) {
    $(selector)
      .eq( ( $(e.currentTarget).attr("data-slick-index") || 0) % $(selector).length )
      .trigger("click.fb-start", {
        $trigger: $(this)
      });

    return false;
  });
  $('body').removeClass('compensate-for-scrollbar');
}

//scroll
function scrollpage() {
  var $scrollTopbutton = $('.up__button'),
      $scrolLink = $('.scroll-button'),
      $body = $("html, body");

  $scrollTopbutton.on('click', function() {
    $('body,html').animate({
      scrollTop: 0
    }, 500);
  })

  scroll();
  $(window).scroll(function(){
    scroll();
  });
  $scrolLink.on('click', function (event) {
    var id  = $(this).attr('href'),
        top = $(id).offset().top;
    
    event.preventDefault();

    $('body,html').animate({scrollTop: top}, 400);
      $body.addClass("in-scroll");
      setTimeout(function() {
        $body.removeClass("in-scroll");
      }, 400)
  })
}