// Create Slider

function createSlider(args) {
  const {
    slider,
    itemsPerSlide = 1,
    autoplayBool = false,
    autoplayInterval = 4000,
    dotsBool = true,
    arrowsBool = true,
    draggableBool = true,
  } = args;
  // Creates slider elements
  if (!slider.classList.contains('createSlider')) {
    slider.classList.add('createSlider');
    slider.style.display = 'flex';
    slider.style.position = 'relative';
    slider.style.flexWrap = 'wrap';

    const list = document.createElement('div');
    list.classList.add('createSlider__list');
    list.style.display = 'flex';

    const sliderItems = Array.from(slider.children);

    sliderItems.forEach(function(item, i) {
      const itemWrapper = document.createElement('div');
      itemWrapper.classList.add('createSlider__list--item');
      itemWrapper.appendChild(item);

      list.appendChild(itemWrapper);
    });
    slider.appendChild(list);
  }

  // Initialise values
  const wrapper = document.getElementsByClassName('createSlider__list')[0];
  const newSliderItems = Array.from(wrapper.children);
  const sliderWidth = slider.offsetWidth;

  newSliderItems.forEach(function(item, i) {
    item.style.width = `${sliderWidth / itemsPerSlide}px`;
  });

  let mousePosOnClick = 0;
  let mouseMoveAmmount = 0;
  let MouseMoveRound = 0;
  const totalWidth =
    sliderWidth * (newSliderItems.length / itemsPerSlide) - sliderWidth;
  wrapper.style.transform = `translateX(${0}px)`;

  // Set Active Slide
  newSliderItems[0].classList.add('active');

  function setActiveSlide() {
    const currentSlide = MouseMoveRound / (sliderWidth / itemsPerSlide);

    newSliderItems.forEach(function(item, i) {
      item.classList.remove('active');
    });
    newSliderItems[currentSlide].classList.add('active');

    const navItems = Array.from(
      slider.getElementsByClassName('createSlider__nav--single')
    );
    navItems.forEach(function(item, i) {
      item.classList.remove('active');
    });
    navItems[currentSlide].classList.add('active');
  }

  // Snap To Slide
  function snapToSlide(ammount) {
    wrapper.style.transition = 'transform 500ms';
    window.setTimeout(function() {
      wrapper.style.transition = 'transform 0ms';
    }, 500);

    if (ammount > totalWidth) {
      MouseMoveRound = totalWidth;
    } else if (ammount < 0) {
      MouseMoveRound = 0;
    } else {
      MouseMoveRound =
        (sliderWidth / itemsPerSlide) *
        Math.round(ammount / (sliderWidth / itemsPerSlide));
    }

    setActiveSlide();
    wrapper.style.transform = `translateX(${-MouseMoveRound}px)`;
  }

  // Jump to slide
  function jumpToSlide(ammount) {
    wrapper.style.transition = 'transform 500ms';
    window.setTimeout(function() {
      wrapper.style.transition = 'transform 0ms';
    }, 500);

    setActiveSlide();
    wrapper.style.transform = `translateX(${-ammount}px)`;
  }

  // Arrows
  if (slider.getElementsByClassName('createSlider__arrow')[0]) {
    const arrows = Array.from(
      slider.getElementsByClassName('createSlider__arrow')
    );
    arrows.forEach(function(arrow) {
      arrow.remove();
    });
  }

  if (arrowsBool) {
    const arrowPrev = document.createElement('button');
    arrowPrev.classList.add('createSlider__arrow', 'createSlider__button');
    arrowPrev.style.position = 'absolute';
    arrowPrev.style.zIndex = '5';
    const arrowNext = arrowPrev.cloneNode(true);
    arrowNext.style.right = '0';
    arrowNext.innerHTML = 'Next';
    arrowPrev.innerHTML = 'Previous';
    slider.prepend(arrowPrev);
    slider.appendChild(arrowNext);

    arrowNext.onclick = function() {
      if (MouseMoveRound < totalWidth) {
        MouseMoveRound += sliderWidth / itemsPerSlide;
        jumpToSlide(MouseMoveRound);
      }
    };

    arrowPrev.onclick = function() {
      if (MouseMoveRound > 0) {
        MouseMoveRound -= sliderWidth / itemsPerSlide;
        jumpToSlide(MouseMoveRound);
      }
    };
  }

  // Autoplay
  const slideAuto = function() {
    if (autoplayBool) {
      if (MouseMoveRound < totalWidth) {
        MouseMoveRound += sliderWidth / itemsPerSlide;
      } else {
        MouseMoveRound = 0;
      }
      jumpToSlide(MouseMoveRound);
    }
  };
  let slideInterval = setInterval(slideAuto, autoplayInterval);

  // Resets interval
  function slideAutoReset() {
    window.clearInterval(slideInterval);
    slideInterval = window.setInterval(slideAuto, autoplayInterval);
  }

  // Dots
  if (slider.getElementsByClassName('createSlider__nav')[0]) {
    slider.getElementsByClassName('createSlider__nav')[0].remove();
  }
  if (dotsBool) {
    const dotsWrapper = document.createElement('div');
    dotsWrapper.classList.add('createSlider__nav');
    dotsWrapper.style.zIndex = '5';
    dotsWrapper.style.width = '100%';

    const dotsNum = newSliderItems.length - itemsPerSlide + 1;

    for (i=0; i < dotsNum; i++) {
      const dotSingle = document.createElement('button');
      dotSingle.innerHTML = i + 1;
      dotSingle.classList.add(
        'createSlider__nav--single',
        'createSlider__button'
      );
      dotsWrapper.appendChild(dotSingle);
    };
    slider.appendChild(dotsWrapper);

    const dotItems = Array.from(
      document.getElementsByClassName('createSlider__nav--single')
    );

    dotItems.forEach(function(dot, i) {
      dot.onclick = function() {
        MouseMoveRound = (sliderWidth / itemsPerSlide) * i;
        jumpToSlide(MouseMoveRound);
        slideAutoReset();
      };
    });
  }

  if (draggableBool){
    // Desktop Drag
    function desktopDrag(e) {
      mouseMoveAmmount = mousePosOnClick - e.clientX + MouseMoveRound;
      wrapper.style.transform = `translateX(${-mouseMoveAmmount}px)`;
    }

    // Desktop Event Listeners
    window.addEventListener('mousedown', function(e) {
      mousePosOnClick = e.clientX;
      window.addEventListener('mousemove', desktopDrag);
    });
    window.addEventListener('mouseup', function(event) {
      window.removeEventListener('mousemove', desktopDrag);
      if (!event.target.classList.contains('createSlider__button')) {
        snapToSlide(mouseMoveAmmount);
      }
      slideAutoReset();
    });

    // Mobile Drag
    function mobileDrag(e) {
      mouseMoveAmmount = mousePosOnClick - e.touches[0].pageX + MouseMoveRound;
      wrapper.style.transform = `translateX(${-mouseMoveAmmount}px)`;
    }

    // Mobile Event Listeners
    slider.addEventListener('touchstart', function(e) {
      mousePosOnClick = e.touches[0].pageX;
      slider.addEventListener('touchmove', mobileDrag);
    });
    slider.addEventListener('touchend', function(event) {
      slider.removeEventListener('touchmove', mobileDrag);
      if (!event.target.classList.contains('createSlider__button')) {
        snapToSlide(mouseMoveAmmount);
      }
      slideAutoReset();
    });
  }
}
