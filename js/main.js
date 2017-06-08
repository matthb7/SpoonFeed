/* Initial href for bounce */
var curr = '#1';
/* Checks if elem is in window view */
function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();
    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}
/* Updates bounce link to appropriate href */
function updateBounce() {
  var up = $('#bounce-up');
  var down = $('#bounce-down');
  $(up).css('visibility', 'hidden');
  $(down).css('visibility', 'visible');
  switch(curr) {
    case '#1':
      curr = '#2';
      $(down).attr('href', curr);
      break;
    /*case '#2':
      curr = '#3';
      $(down).attr('href', curr);
      break;
    case '#3':
      curr = '#4';
      $(down).attr('href', curr);
      break;*/
    case '#2':
      $(up).css('visibility', 'visible');
      $(down).css('visibility', 'hidden');
      break;
  }
}
/* Checks if current device is iOS */
function iOS() {
  var iDevices = [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ];
  if (!!navigator.platform) {
    while (iDevices.length) {
      if (navigator.platform === iDevices.pop()){ return true; }
    }
  }
  return false;
}
/* Functionality */
(function($) {
  /* Scroll to top of page on refresh */
  $(window).on('beforeunload', function() {
    $(window).scrollTop(0); 
  });
  /* Smooth scroll to target when specified element is clicked */
  $(function() {
    $('.smoothScroll').click(function() {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          if (target.length) {
            $('html,body').animate({
                scrollTop: target.offset().top - 50
            }, 1000);
            return false;
          }
      }
    });
  });
  /* Update bounce link to appropriate href as window scrolls to new sections */
  $(function() {
    $(window).scroll(function() {
      const INFOS = $('.info');
      const HEADS = $('.h');
      var found = false;
      for (var i = 0; i < INFOS.length; i++) {
        var info = INFOS[i];
        var head = HEADS[i];
        if (isScrolledIntoView(info)) {
          found = true;
          curr = '#'+$(info).attr('id');
          updateBounce();
        }
        else if (isScrolledIntoView(head)) {
        	found = true;
          curr = '#'+$(info).attr('id');
          updateBounce();
        }
      }
      if (!found) {
        var b = $('#bounce-down');
        curr = '#1';
        $(b).attr('href', curr);
      }
    });
  });
  /* Collapse navbar after clicking link */
  $(function() {
     $('nav').find('a').click(function() {
        $('.navbar-collapse').collapse('hide');
    });
  });
  /* Adjust parallax feature for iOS devices */
  $(function() {
    const PARAS = $('.parallax');
    for (var i = 0; i < PARAS.length; i++) {
      para = PARAS[i];
      if (iOS()) {
        $(para).css('background-attachment','scroll');
      }
      else {
        $(para).css('background-attachment', 'fixed');
      }
    }
  });
  $(function() {
    $('#search').click(function() {
      $('html, body').animate({
          scrollTop: $("#2").offset().top - 50
      }, 1000);
      updateBounce();
      $('.navbar-collapse').collapse('hide');
      var item = $('#searchText').val();
      var el = $('#' + item).addClass('highlight');
      var newone = el.clone(true);
      el.before(newone);
      el.remove();
    });
  });
})(jQuery);