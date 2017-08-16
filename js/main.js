(function ($) {
  'use strict';

  function slickInit() {
    $('[data-init="slick"]').each(function () {
      var $el = $(this);

      var breakpointsWidth = {tn: 319, xs: 479, sm: 767, md: 991, lg: 1199};

      var slickDefault = {
        dots: false,
        arrows: true,

        fade: false,
        infinite: true,
        autoplay: true,
        pauseOnHover: true,
        speed: 500,

        slidesToShow: 1,
        slidesToScroll: 1,

        mobileFirst: true,
      };

      // Merge settings.
      var settings = $.extend(slickDefault, $el.data());
      delete settings.init;

      // Build breakpoints.
      if (settings.breakpoints) {
        var _responsive = [];
        var _breakpoints = settings.breakpoints;

        var buildBreakpoints = function (key, value) {
          if (breakpointsWidth[key]) {
            _responsive.push({
              breakpoint: breakpointsWidth[key],
              settings: {
                slidesToShow: parseInt(value, 10),
                slidesToScroll: 1
              }
            });
          };
        };

        if (typeof _breakpoints === "object") {
          $.each(_breakpoints, buildBreakpoints);
        }

        delete settings.breakpoints;
        settings.responsive = _responsive;
      }

      // console.log(settings);
      $el.slick(settings);
    });
  }

  /**
   * slick slide
   */
   function sliderSyncing() {
    $('.js-product-slide-for').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: false,
      infinite: false,
      fade: true,
      asNavFor: '.js-product-slide-nav',
      responsive: [
      {
        breakpoint: 480,
        settings: {
          dots: true
        }
      }
      ]
    });
    $('.js-product-slide-nav').slick({
      slidesToShow: 5,
      slidesToScroll: 1,
      asNavFor: '.js-product-slide-for',
      dots: false,
      nav: true,
      focusOnSelect: true,
      infinite: false,
      responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4
        }
      }
      ]
    });

    $('.js-list-post').slick({
      slidesToShow: 2,
      slidesToScroll: 1,
      dots: false,
      arrows: true,
      infinite: false,
      responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 1,
          dots: true,
          arrows: false,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
      ]
    });

    $('.js-special-mean').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      dots: false,
      arrows: true,
      infinite: false,
      responsive: [
      {
        breakpoint: 1400,
        settings: {
          dots: true,
          arrows: false,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1
        }
      }
      ]
    });

    $('.js-event-gallery').slick({
      dots: false,
      arrows: true,
      infinite: false,
      responsive: [
      {
        breakpoint: 1400,
        settings: {
          dots: true,
          arrows: false
        }
      },
      ]
    });
  }

  /**
   * Custom select
   */
   function customSelect() {
    $('select').select2({
     minimumResultsForSearch: Infinity
   });
  }

  /**
   * Datepicker
   */
   function datePicker() {
    $( ".datepicker" ).datepicker({
      showOtherMonths: true,
      dayNamesMin: [ "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su" ]
    });
  }

  /**
   * TimePicker
   */
   function timePicker() {
     $('#timepicker').timepicker();
   }

  /**
   * Popup
   */
   function magnificPopup() {
    $('.popup-video').magnificPopup({
      disableOn: 700,
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,

      fixedContentPos: false
    });

    $('.candia-card-wrapper .candia-card').magnificPopup({
      delegate: 'a',
      type: 'image',
      tLoading: 'Loading image #%curr%...',
      mainClass: 'mfp-img-mobile',
      gallery: {
        enabled: true,
        navigateByImgClick: true,
        preload: [0,1] // Will preload 0 - before current, and 1 after the current image
      }
    });
  }

  // TODO: Fix error
  function launchIntoFullscreen(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }

    $('.candia-card-fullscreen__icon').on('click', function(e) {
      e.preventDefault();

      launchIntoFullscreen($(this).parent().find('.candia-card-fullscreen')[0]);
      $(document).find('.candia-card-fullscreen').trigger('resize');

    });
  }

  $('[data-init="slick"]').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    // console.log(currentSlide);
  });

  $(window).on('load', function() {
    $('.candia-card-fullscreen-wrapper').each(function() {
      var $this = $(this),
      btnOpen = $('.candia-card-fullscreen__icon', $this),
      btnClose = $('.candia-card-fullscreen__icon-close', $this),
      slider = $('.candia-card-fullscreen', $this),
      sliderOverlay = $('.candia-overlay', $this),
      windowHeight = $(window).height(),
      sliderWidth = sliderOverlay.outerWidth(),
      sliderHeight = sliderOverlay.outerHeight(),
      sliderOffsetTop = slider.offset().top,
      sliderOffsetLeft = slider.offset().left;
      $this.css({
        'width': sliderWidth,
        'height': sliderHeight
      });

      btnOpen.on('click', function(e) {
        e.preventDefault();
        var scrollTop = $(window).scrollTop();

        $this.addClass('candia-card-fullscreen-wrapper--active');
        $('body').addClass('overflow-hidden');
        btnClose.addClass('zoom-in').removeClass('zoom-out');
        $(this).addClass('zoom-out').removeClass('zoom-in');

        $('.candia-overlay', $this).css({
          'opacity': '0',
          'transition': 'none'
        });
        slider.css({
          'position': 'fixed',
          'top': sliderOffsetTop - scrollTop,
          'left': sliderOffsetLeft,
          'width': sliderWidth,
          'height': sliderHeight
        }).animate({
          'top': 0,
          'left': 0,
          'width': 100 + '%',
          'height': 100 + '%'
        }, 400, function() {

          $(window).trigger('resize');

          setTimeout(function() {
            $('.candia-overlay', $this).css({
              'opacity': '1',
              'transition': 'all .3s ease'
            });
          }, 100);

        });

      });
      btnClose.on('click', function(e) {
        e.preventDefault();
        var scrollTop = $(window).scrollTop();

        $('body').removeClass('overflow-hidden');
        btnOpen.addClass('zoom-in').removeClass('zoom-out');
        $(this).addClass('zoom-out').removeClass('zoom-in');

        $('.candia-overlay', $this).css({
          'opacity': '0',
          'transition': 'none'
        });
        slider.addClass('slider-fix').animate({
          'top': sliderOffsetTop - scrollTop,
          'left': sliderOffsetLeft,
          'width': sliderWidth,
          'height': sliderHeight
        }, 400, function() {
          $this.removeClass('candia-card-fullscreen-wrapper--active');
          slider
          .removeClass('slider-fix')
          .removeAttr('style');
          $(window).trigger('resize');
          setTimeout(function() {
            $('.candia-overlay', $this).css({
              'opacity': '1',
              'transition': 'all .3s ease'
            });
          }, 100);
        });

      });

      var bg = $('.slick-current', '[data-init="slick"]').find('.img').css('background-image');
      slider.append('<div class="bg-fix"></div>');
      $('.bg-fix', slider).css('background-image', bg);

      slider.on('afterChange', function(event, slick, currentSlide, nextSlide){
        var bg = $('.slick-current', '[data-init="slick"]').find('.img').css('background-image');
        if (slider.children('bg-fix').length == 1)
          slider.append('<div class="bg-fix"></div>');
        $('.bg-fix', slider).css('background-image', bg);
      });
    });
  });


  /**
   * // jquery ui spinner
   */
   function spinerInit() {
    $('input[type="number"]').spinner({
      min: 0,
      step: 1,
      numberFormat: "C"
    });
  }

  /**
   * Countdown
   */
   function countdown() {
    $('.candia-countdown').countdown('2025/10/10', function(event) {
      var $this = $(this).html(event.strftime(''
        + '<span><strong>%d</strong> <br> days</span> '
        + '<span><strong>%H</strong> <br> hours</span> '
        + '<span><strong>%M</strong> <br> minutes</span> '
        + '<span><strong>%S</strong> <br> seconds</span>'));
    });
  }

  /**
   * isotope
   */
   function isotope() {
    $('.filtering__container').each(function() {
      var el = $(this);
      var filtering__container = el,
      filters = $('.filters');
      filters.on('click', 'a', function() {
        var selector = $(this).attr('data-filter');
        $('.current', filters).removeClass('current');
        $(this).addClass('current');
        filtering__container.isotope({
          filter: selector
        });
        return false;
      });

      $(window).on('resize', function() {

        filtering__container.imagesLoaded(function() {
          filtering__container.isotope({
            layoutMode: 'fitRows',
            itemSelector: '.candia-card',
            transitionDuration: '0.5s',
          });
        });

      }).resize();

      filters.find('.current').trigger('click');
    });
  }

  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  /*
   * Fix bootstrap  dropdown hover menu
   */
   var dropdownHover = debounce(function() {
    if ($(window).width()>1200) {
      $('ul.nav li.dropdown').hover(function() {
        $(this).find('.dropdown-menu').stop(true, true).delay(50).fadeIn(200);
      }, function() {
        $(this).find('.dropdown-menu').stop(true, true).delay(50).fadeOut(200);
      });

      $('ul.nav li.dropdown').on('click', function(e) {
        e.stopPropagation();
      });

    }
  }, 100);
   window.addEventListener('resize', dropdownHover);

   function overlay() {
    $('.navbar-toggle').on('click', function(event) {
      $('.navbar-overlay').stop().toggleClass('open');
      $('html, body').stop().toggleClass('overflow-hidden');
    });
  };

  $(function () {
    // Init bootstrap plugins.
    $('[data-toggle="popover"]').popover();
    $('[data-toggle="tooltip"]').tooltip();

    var tpj = jQuery;

    var revapi202;
    tpj(document).ready(function() {
      if (tpj("#rev_slider_202_1").revolution == undefined) {
        revslider_showDoubleJqueryError("#rev_slider_202_1");
      } else {
        revapi202 = tpj("#rev_slider_202_1").show().revolution({
          sliderType: "standard",
          sliderLayout: "fullscreen",
          dottedOverlay: "none",
          delay: 5000,
          navigation: {
            keyboardNavigation: "on",
            keyboard_direction: "horizontal",
            mouseScrollNavigation: "off",
            onHoverStop: "off",
            touch: {
              touchenabled: "on",
              swipe_threshold: 75,
              swipe_min_touches: 50,
              swipe_direction: "horizontal",
              drag_block_vertical: false
            },
            arrows: {
              style:"uranus",
              enable:true,
              hide_onmobile:true,
              hide_under:778,
              hide_onleave:true,
              hide_delay:200,
              hide_delay_mobile:1200,
              tmp:'',
              left: {
                h_align:"left",
                v_align:"center",
                h_offset:20,
                v_offset:0
              },
              right: {
                h_align:"right",
                v_align:"center",
                h_offset:20,
                v_offset:0
              }
            },
            bullets: {
              enable: true,
              hide_onmobile: false,
              style: "hermes",
              hide_onleave: false,
              direction: "horizontal",
              h_align: "center",
              v_align: "bottom",
              h_offset: 0,
              v_offset: 30,
              space: 5,
              tmp: ''
            }
          },
          responsiveLevels: [1240, 1024, 778, 480],
          visibilityLevels: [1240, 1024, 778, 480],
          gridwidth: [1240, 1024, 778, 480],
          gridheight: [868, 768, 960, 720],
          lazyType: "none",
          parallax: {
            type: "scroll",
            origo: "slidercenter",
            speed: 1000,
            levels: [5, 10, 15, 20, 25, 30, 35, 40, 45, 46, 47, 48, 49, 50, 100, 55],
            type: "scroll",
          },
          shadow: 0,
          spinner: "off",
          stopLoop: "off",
          stopAfterLoops: 0,
          stopAtSlide: 6,
          shuffle: "off",
          autoHeight: "off",
          fullScreenAutoWidth: "off",
          fullScreenAlignForce: "off",
          fullScreenOffsetContainer: "",
          fullScreenOffset: "0",
          disableProgressBar: "off",
          hideThumbsOnMobile: "off",
          hideSliderAtLimit: 0,
          hideCaptionAtLimit: 0,
          hideAllCaptionAtLilmit: 0,
          debugMode: false,
          fallbacks: {
            simplifyAll: "off",
            nextSlideOnWindowFocus: "off",
            disableFocusListener: false,
          }
        });
      }
    });

    setTimeout(function(){
      $('body').addClass('loaded');
    }, 500);

    // Call functions here.
    slickInit();
    customSelect();
    datePicker();
    spinerInit();
    sliderSyncing();
    countdown();
    timePicker();
    magnificPopup();
    isotope();
    dropdownHover();
    overlay();

    // launchIntoFullscreen();
  });

})(jQuery);
