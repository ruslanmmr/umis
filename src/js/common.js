$(document).ready(function () {
  lazy();
  autoBlockHeight();
  reviews();
  nav();
  home();
  $(".input_phone").mask("(999) 999-99-99");
});
$(window).resize(function () {
  innerWidth = $('body').innerWidth();
});

//global variables
var innerWidth = $('body').innerWidth();

//nav
function nav() {
  var $navButton = $('.nav-open'),
    $navClose = $('.nav__close'),
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
    effectTime: '300'
  });
}
//blocks
function autoBlockHeight() {
  var $block = $(".opportunities-block__container"),
        $block1 = $(".opportunities-block__container_1"),
        $block2 = $(".opportunities-block__container_2");

  if(innerWidth > 576) {
    resize();
  }
  $(window).resize(function () {
    if(innerWidth > 576) {
      resize();
    } else {
      $block.css('height', 'auto')
    }
  });

  function resize() {
    $block.css('height', 'auto');
    var mh1 = 0,
        mh2 = 0;

    $block1.each(function () {
      var h_block = parseInt($(this).height());
      if(h_block > mh1) {
        mh1 = h_block;
      };
    });
    $block1.height(mh1);

    $block2.each(function () {
      var h_block = parseInt($(this).height());
      if(h_block > mh2) {
        mh2 = h_block;
      };
    });
    $block2.height(mh2);
  }
}
//clients
function home() {
  var $slider = $('.home .banner'),
      prevArrow = $slider.parents('.slider').find('.slider-button_prev'),
      nextArrow = $slider.parents('.slider').find('.slider-button_next');

  $slider.on('init reInit afterChange', function(){
    lazy();
  })

  $slider.slick({
    infinite: true,
    dots: false,
    arrows: true,
    fade: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: prevArrow,
    nextArrow: nextArrow
  });
}
//reviews
function reviews() {
  var $slider = $('.reviews__slider'),
      prevArrow = $slider.parents('.slider').find('.slider-button_prev'),
      nextArrow = $slider.parents('.slider').find('.slider-button_next');

  $slider.on('init reInit afterChange', function(){
    lazy();
  })

  $slider.slick({
    infinite: true,
    dots: false,
    arrows: true,
    speed: 400,
    slidesToShow: 2,
    slidesToScroll: 2,
    prevArrow: prevArrow,
    nextArrow: nextArrow,
    responsive: [
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
}