let addNotetoggle = true;
let promptBlurToggle = true;
let profileToggle = true;

function handleClick() {
  if (addNotetoggle) {
    takeOut();
  } else {
    takeIn();
  }
};
function animateAddition() {
  anime({
    targets: `.notes`,
    opacity: [0, 1],
    duration: 4000,
  });
};

function deleteAnimation(index) {
  anime({
    targets: `#notes${index}`,
    translateY: [0, 100],
    opacity: [1, 0],
    duration: 1000
  });
}
function takeOut() {
  anime({
    targets: '.noteClass',
    translateY: function(el, i) {
      return ((i+1)*50)+60;
    },
    delay: function(el, i) {
      return i * 100
    },
    duration: 1000,
    scaleX: [0, 1],
    opacity: [0, 1]
  })
  anime({
    targets: '.fa-plus',
    rotate: 135
  })
  addNotetoggle = false;
}

function takeIn() {
  anime({
    targets: '.noteClass',
    translateY: function(el, i) {
      return -(((i+1)/50)+60);
    },
    delay: function(el, i) {
      return i * 100
    },
    duration: 1000,
    scaleX: [1, 0],
    opacity: [1, 0]
  })
  anime({
    targets: '.fa-plus',
    rotate: 0
  })
  addNotetoggle = true;
}

function alertSlideIn() {
  anime({
    targets: '.alert',
    translateX: [100, 0],
  });
}

function alertSlideOut() {
  anime({
    targets: '.alert',
    translateX: [0, 100],
  });
}
function promptBlur() {
  var targetElm = document.getElementById('container');
  if (promptBlurToggle) {
    anime({
      update: function(anim) {
        targetElm.style.filter = 'blur(' + 10 * anim.progress / 100 + 'px)'
      }
    });
    promptBlurToggle = false;
  } else {
    anime({
      update: function(anim) {
        targetElm.style.filter = 'blur('+ 20 / (anim.progress) + 'px)'
      }
    });
    promptBlurToggle = true;
  }
}

function profile() {
  let main = document.getElementById('main').style;
  if (profileToggle) {
    anime({
      targets: '#main',
      translateX: [0, '100%'],
      scale: [1, 0.2],
      easing: 'easeInOutQuad',
    })
    setTimeout(function() {
      anime({
        targets: main,
        update: function() {
          main.display = 'none'
        }
      })
    }, 1000);
    profileToggle = false;
  } else {
    anime({
      targets: '#main',
      translateX: ['100%', 0],
      scale: [0.2, 1],
      easing: 'easeInOutQuad'
    });
    anime({
      targets: main,
      update: function() {
        main.display = 'flex'
      }
    });
    profileToggle = true;
  }

}
