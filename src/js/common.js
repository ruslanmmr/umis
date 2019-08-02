$(document).ready(function () {
  lazy();
  nav();
  banner()
});
$(window).resize(function () {
  innerWidth = $('body').innerWidth();
  setTimeout(function() {
    $('img').each(function() {
      imagesResize($(this))
    });
  })
});

//global variables
var innerWidth = $('body').innerWidth();

//nav
function nav() {
  var $navButton = $('.nav-open'),
    $navClose = $('.nav-close'),
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

function lazy() {
  $(".lazy").Lazy({
    effect: 'show',
    visibleOnly: true,
    threshold: 0,
    imageBase: false,
    defaultImage: false,
    afterLoad: function(element) {
      var box = element.parent();
      if(!box.hasClass('cover-box_size-auto')) {
        var boxH = box.height(),
          boxW = box.width(),
          imgH = element.height(),
          imgW = element.width();
        if ((boxW / boxH) >= (imgW / imgH)) {
          element.addClass('ww').removeClass('wh');
        } else {
          element.addClass('wh').removeClass('ww');
        }
      }
      element.addClass('visible');
    }
  });
}
function imagesResize(element) {
  var box = element.parent();
  if(!box.hasClass('cover-box_size-auto')) {
    var boxH = box.height(),
      boxW = box.width(),
      imgH = element.height(),
      imgW = element.width();
    if ((boxW / boxH) >= (imgW / imgH)) {
      element.addClass('ww').removeClass('wh');
    } else {
      element.addClass('wh').removeClass('ww');
    }
  }
}

//banner
function banner() {
  var $slider = $('.banner__slider'),
    $navLink = $('.banner__nav-link'),
    activeSlide;

  $slider.on('init', function(event, slick, currentSlide, nextSlide){
    pag();
  });

  $slider.slick({
    infinite: true,
    dots: false,
    arrows: false,
    fade: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
  });

    $slider.on('swipe beforeChange', function(event, slick, currentSlide, nextSlide){
      setTimeout(function() {
        pag();
      }, 300)
    });

    $navLink.on('click', function(event) {
      event.preventDefault();
      var index = $(this).parent().index();
      $slider.slick('slickGoTo', index);
      pag();
    });

  //custom pagination
  function pag() {
    activeSlide = $slider.find('.slick-active').index();
    $navLink.removeClass('active');
    $('.banner__nav-item').eq(activeSlide).find($navLink).addClass('active');
  }
}