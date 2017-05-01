window.addEventListener('DOMContentLoaded', function(e) {

  var lis = document.querySelectorAll('.nav li');
  for (var i = 0; i < lis.length; i++) {
    var li = lis[i];
    li.onclick = function() {

      for (var k = 0; k < lis.length; k++) {
        lis[k].classList.remove('selected');
      }

      this.className += ' selected';

      var currentSectionId = this.getAttribute('data-section');
      var currentSection = document.getElementById(currentSectionId);
      var currentTop = currentSection.getBoundingClientRect().top;
      var moveRange = currentTop - 50;


      var scrollToCurrentSection = function(moveRange) {

        var step = 10;
        var eachRange = moveRange / step;

        window.scroller = setInterval(function() {
          window.scrollBy(0, eachRange);
          console.log("===eachRange===",eachRange)
          step--;
          if (step === 0) {
            clearInterval(window.scroller);
          }
        }, 30);
      };

      scrollToCurrentSection(moveRange);
    }
  }

  window.addEventListener('scroll', function() {
    var sections = document.querySelectorAll('.section');
    var tops = [];
    for (var i = 0; i < sections.length; i++) {
      var section = sections[i];
      var top = section.getBoundingClientRect().top;
      if (top <= 50) {
        tops.push(section);
      }
    }
    var currentSection = tops.pop();
    var currentNavId = currentSection.getAttribute('data-nav');

    var lis = document.querySelectorAll('.nav li');
    for (var i = 0; i < lis.length; i++) {
      var li = lis[i];
      li.classList.remove('selected');
      if (li.id === currentNavId) {
        li.classList.add('selected');
      }
    }

  });

}, false);