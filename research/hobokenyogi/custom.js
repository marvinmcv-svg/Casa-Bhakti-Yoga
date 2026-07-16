//REGISTER GSAP PLUGINS
gsap.registerPlugin(SplitText)
gsap.registerPlugin(DrawSVGPlugin)
gsap.registerPlugin(ScrollTrigger)
//gsap.registerPlugin(MorphSVGPlugin);
//REGISTER GSAP PLUGINS END

gsap.config({
  nullTargetWarn: false,
});


// GET OUR LETTER RANDOM VALS
const scrollLetters = document.querySelectorAll(".lettering div") //get our letters
let randomValues = [] //make our array
// for each letter generate a random value and add it to the array

scrollLetters.forEach(letter => {
  const val = Math.random() //make random value
  randomValues.push(val) // add random value to array
  //console.log(val)
})
// console.log(randomValues)

document.documentElement.className="js";
window.onbeforeunload = function () {
  window.scrollTo(0,0);
};
const smoothScroll = function(){
  if(window.innerWidth > 1024){
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector(".content"),
      smooth: true,
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the ".content" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".content", {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform
      //the content at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile.
      //We sense it by checking to see if there's a transform applied to the content (the LocomotiveScroll-controlled element).
      pinType: document.querySelector(".content").style.transform ? "transform" : "fixed"
    });


    // SCROLL TO ANCHOR
    var scrollDiv = document.querySelector(".content");
    var anchorWrapperOffset = Math.abs(scrollDiv.getBoundingClientRect().top)
    var scrollCount = Math.round(anchorWrapperOffset)
    var scrollToTop = scrollCount - scrollCount

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();

          var anchorTarget = document.querySelector(this.getAttribute('href'));
          const anchorOffsetTop = scrollDiv.offsetTop;
          var anchorHelper = scrollDiv.getBoundingClientRect().top;
          var anchorTargetOffset = anchorTarget.getBoundingClientRect().top-anchorHelper+anchorOffsetTop;
          locoScroll.scrollTo(anchorTargetOffset)

      });
    });

    $('#wrapper').imagesLoaded( function() {
        // remove loading after preloading images
        document.body.classList.remove('loading');
        setTimeout(function(){
          locoScroll.update()
        },500)

        if ($(".content").hasClass("home")) {
          locoScroll.stop()
          // INTRO ANIMATION
          const introAnimation = function() {
            const navTags = document.querySelectorAll("#nav")
            const progress = document.querySelector(".progress-circle")
            const spinTag = document.querySelectorAll(".spin img")
            const spinInnerTag = document.querySelectorAll(".spin div")
            const letterTags = document.querySelectorAll(".lettering div")
            const heroImg = document.querySelector(".home-img")

            const introTimeline = new TimelineMax();
            introTimeline.set(".lettering", { perspective: 200,})
              introTimeline.staggerFrom(letterTags, 1.5, {
                y: 20,
                x: 50,
                rotation: 30,
                rotationX: 90,
                opacity: 0,
                transformOrigin: "0% 100%",
                ease: Quint.easeOut
              }, .05)
              introTimeline.from(heroImg, 1.5, {
                opacity:0,
                y: 250,
                x: "-50%",
                rotation: 25,
                ease: Quint.easeOut,
                onComplete: inject
              }, "=-1");
              introTimeline.from(spinInnerTag, 1.5, {
                opacity: 0,
                y: 30,
                ease: Quint.easeOut
              },  "=-1.15")
              introTimeline.staggerFrom(spinTag, 1.5, {
                scale: .2,
                opacity: 0,
                rotation: gsap.utils.wrap([135, 150]),
                ease: Quint.easeOut
              }, .2, "=-2");
              introTimeline.staggerFrom(navTags, 1.25, {
                opacity: 0,
                y: -80,
                ease: Quint.easeOut
              }, .05, "=-1.85")
              introTimeline.from(progress, 1.5, {
                opacity: 0,
                ease: Quint.easeOut
              }, "=-1.5");

          }
          introAnimation();
          function inject() {
            locoScroll.start()
            // random letter scroll
            function randomLetters() {
              const distance = document.querySelector(".content").getBoundingClientRect().top

              scrollLetters.forEach((letter, index) => {

                if(
                    letter.getBoundingClientRect().top < window.innerHeight + 200 &&
                    letter.getBoundingClientRect().top + letter.clientHeight > -200
                ){

                  let myVal = randomValues[index];
                  gsap.to(letter, {
                    duration: 1,
                    y: `${Math.abs(distance * myVal / 3)}px`
                  })

                }
              })
              requestAnimationFrame(randomLetters)
            }
            randomLetters()

          }
        }
      });

  }
}
// IF LOWER than 1024
if(window.innerWidth < 1025) {
  // Preload images
  const preloadImages = () => {
      return new Promise((resolve, reject) => {
          imagesLoaded(document.querySelectorAll('img'), {background: true}, resolve);
      });
  };
   preloadImages().then(() => {
      // remove loading after preloading images
      document.body.classList.remove('loading');

      if ($(".content").hasClass("home")) {
        // INTRO ANIMATION
        const introAnimation = function() {
          const navTags = document.querySelectorAll("#nav")
          const progress = document.querySelector(".progress-circle")
          const spinTag = document.querySelectorAll(".spin img")
          const spinInnerTag = document.querySelectorAll(".spin div")
          const letterTags = document.querySelectorAll(".lettering div")
          const heroImg = document.querySelector(".home-img")

          const introTimeline = new TimelineMax();
          introTimeline.set(".lettering", { perspective: 200,})
            introTimeline.staggerFrom(letterTags, 1.5, {
              y: 20,
              x: 50,
              rotation: 30,
              rotationX: 90,
              opacity: 0,
              transformOrigin: "0% 100%",
              ease: Quint.easeOut
            }, .05)
            introTimeline.from(heroImg, 1.5, {
              opacity:0,
              y: 250,
              x: "-50%",
              rotation: 25,
              ease: Quint.easeOut,
              onComplete: inject
            }, "=-1");
            introTimeline.from(spinInnerTag, 1.5, {
              opacity: 0,
              y: 30,
              ease: Quint.easeOut
            },  "=-1.15")
            introTimeline.staggerFrom(spinTag, 1.5, {
              scale: .2,
              opacity: 0,
              rotation: gsap.utils.wrap([135, 150]),
              ease: Quint.easeOut
            }, .2, "=-2");
            introTimeline.staggerFrom(navTags, 1.25, {
              opacity: 0,
              y: -80,
              ease: Quint.easeOut
            }, .05, "=-1.85")
            introTimeline.from(progress, 1.5, {
              opacity: 0,
              ease: Quint.easeOut
            }, "=-1.5");

        }
        introAnimation();
        function inject() {
          // random letter scroll
          function randomLetters() {
            const distance = document.querySelector(".content").getBoundingClientRect().top

            scrollLetters.forEach((letter, index) => {

              if(
                  letter.getBoundingClientRect().top < window.innerHeight + 200 &&
                  letter.getBoundingClientRect().top + letter.clientHeight > -200
              ){

                let myVal = randomValues[index];
                gsap.to(letter, {
                  duration: 1,
                  y: `${Math.abs(distance * myVal / 3)}px`
                })

              }
            })
            requestAnimationFrame(randomLetters)
          }
          randomLetters()

        }
      }

  });
}


$(document).ready(function(){
    $(this).scrollTop(0);
});

// END SMOOTH SCROLL
// remove classes on timeout

// random letter scroll
if (!$(".content").hasClass("home")) {
  const randomLetTimeline = gsap.timeline();
  randomLetTimeline.set(".lettering", { perspective: 200,
  })
  randomLetTimeline.from(scrollLetters, {
      duration: .7,
      y: 20,
      x: 50,
      stagger: .065,
      rotation: 30,
      rotationX: 90,
      opacity: 0,
      transformOrigin: "0% 100%",
      onComplete: randomLetterScroll,
      ease: "power4.Out"
  })
    function randomLetterScroll() {
      const distance = document.querySelector(".content").getBoundingClientRect().top
      scrollLetters.forEach((letter, index) => {

        if(
            letter.getBoundingClientRect().top < window.innerHeight + 200 &&
            letter.getBoundingClientRect().top + letter.clientHeight > -200
        ){

          let myVal = randomValues[index];
          gsap.to(letter,  {
            duration: 1,
            y: `${Math.abs(distance * myVal / 3)}px`
          })
        }

        //letter.style.transform = `translateY(${distance * myVal / 2}px)`
      })
      requestAnimationFrame(randomLetterScroll)
    }
}

// AUTOSLIDE CONSTRUCTOR
if($("#auto-slide").length > 0) {
  // GENERATE RANDOM VALUES FOR SLIDER
  const autoSlideItem = document.querySelectorAll("#auto-slide .row img")
  let asValue = []

  autoSlideItem.forEach((si, index) => {
    let num = Math.floor(Math.random()*20) + 1; // this will get a number between 1 and 99;
    num *= Math.floor(Math.random()*2) == 1 ? 1 : -1; // this will add - to 50% of numbers
    //const val = Math.random() //make random value
    asValue.push(num) // add random value to array
  })


  const autoSlide = document.querySelector("#auto-slide")
  const slideInner = document.querySelector("#auto-slide .row")
  const autoOffsetTop = autoSlide.getBoundingClientRect().top
  const autoSlider = function() {
    const slideTop = autoSlide.getBoundingClientRect().top - window.innerHeight
    const slideBottom = autoSlide.getBoundingClientRect().bottom
    const scrolledPx = document.querySelector(".content").getBoundingClientRect().top - window.innerHeight
    let slideRatio = slideTop - slideBottom
    let tVal = 100 / slideRatio
    const innerRight = slideInner.getBoundingClientRect().right

    if(window.innerWidth > 1024) {
      const tDiff = -autoOffsetTop - scrolledPx - 600
      if(
          autoSlide.getBoundingClientRect().top < window.innerHeight - 600 &&
          autoSlide.getBoundingClientRect().top + autoSlide.clientHeight > 0
      ){
        gsap.to(slideInner, {
          duration: .8,
          x: -tDiff * 1.45,
          ease: "power3"
        })
        autoSlideItem.forEach((slideItem, index) => {
            let randomValue = randomValues[index];
            gsap.to(slideItem, {
              y: `${(-tDiff * .1) * (randomValue)}px`
            })
        })
      }
    }
    if(window.innerWidth < 1024) {
      const tDiff = -autoOffsetTop - scrolledPx - 400
     if(
        autoSlide.getBoundingClientRect().top < window.innerHeight - 400 &&
        autoSlide.getBoundingClientRect().top + autoSlide.clientHeight > 0
      ) {
        gsap.to(slideInner, {
          duration: .8,
          x: -tDiff * 4,
          ease: "power3"
        })
        autoSlideItem.forEach((slideItem, index) => {
            let randomValue = randomValues[index];
            gsap.to(slideItem, {
              y: `${(-tDiff * .1) * (randomValue)}px`
            })
        })
      }
  }

    requestAnimationFrame(autoSlider)
  }
  autoSlider()
}



// ===========================================================
// BALL FOLLOW HELPER
var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
if(isSafari){


} else {
  if(document.querySelector("div#circle") && window.innerWidth > 1024) {
    const ball = document.querySelector("div#circle")
    const ballInner = document.querySelector("div#circle .inner")
    let mouseX = 0
    let mouseY = 0
    let ballX = 0
    let ballY = 0
    let ballSpeed = 0.12

    function animateBall() {
      let distX = mouseX - ballX
      let distY = mouseY - ballY

      ballX = ballX + (distX * ballSpeed)
      ballY = ballY + (distY * ballSpeed)

      const centerHeight = ball.offsetHeight / 2
      const centerWidth = ball.offsetWidth / 2

      ball.style.transform = `translateX(${ballX - centerWidth}px) translateY(${ballY - centerHeight}px) `
      requestAnimationFrame(animateBall)
    }
    animateBall()


    // APPEAR ON PROJECT ENTER
    const projectArea = document.querySelectorAll("#hy-slider, .insta-slider")
    projectArea.forEach(follower => {
       follower.addEventListener("mouseenter", function() {
        ball.classList.add("show")
        mouseX = event.pageX
        mouseY = event.clientY
      })
      follower.addEventListener("mouseleave", function() {
        ball.classList.remove("show", "down")
      })
      follower.addEventListener("mousemove", function (e) {
        mouseX = event.pageX
        mouseY = event.clientY
      })
      follower.addEventListener("mousedown", function () {
        ball.classList.add("down")
      })
      follower.addEventListener("mouseup", function () {
        ball.classList.remove("down")
      })
    })
  }
}


// ===========================================================
// PAGE INITS

PageInits = {

    footerFormSubmissions: function() {
      let footerForm = document.querySelector('form.subscribe_form');
      let footerFormWrap = document.querySelector('form.subscribe_form .wrap');
      footerFormWrap.style.position = 'relative';
      let footerFormResults = document.querySelectorAll('form.subscribe_form .form-result');

      footerForm.addEventListener('submit', event => {
        event.preventDefault();
        event.stopImmediatePropagation();
        // Get form data
        const formData = new FormData(event.target);
        // Data to object
        let formObject = Object.fromEntries(formData);
        // Create data object
        let bodyData = {};
        // Fill data object
        Object.entries(formObject).forEach(item => {
          if (item[0] === "email") {
            bodyData.email = item[1];
          }
        })
        // // Fetch options
        // let options = {
        //   method: 'POST',
        //   mode: 'no-cors',
        //   body: JSON.stringify(bodyData),
        //   headers: {
        //     "Content-Type": "application/json",  // sent request
        //     "Accept":       "application/json"   // expected data sent back
        //   },
        // }


        // const formData = {}

        // Object.entries(this.input).map(item => {
        //   const key = item[0]
        //   const value = item[1]
        //   const input = document.querySelector(value.DOM)
        //   formData[key] = input.value
        // })

        // Fetch
        window.fetch('/newsletterform', {
          method: 'post',
          body: JSON.stringify(bodyData),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8'
          }
        }).then((response) => {
          return response.json()
        }).then((data) => {
        // fetch('/newsletterform', options)
        // .then(response => response.json())
        // .then(data => {
          // data is anything returned by your API/backend code
          // let MCResponse = JSON.parse(data);
          let MCResponse = data;
          event.target.classList.add('active')
          if (event.target.classList.contains('active')) {
            let resetTl = gsap.timeline({ default: { ease: "power4" }});
            resetTl.set(footerForm, {
              height: function() {
                // Keep forms height while responses reset for next response
                return footerForm.getBoundingClientRect().height;
              },
            })
            resetTl.to(footerFormResults, {
              opacity: 0,
              duration: 0.4,
              overwrite: true,
            })
            resetTl.set(footerFormResults, {
              height: 0,
              onComplete: () => {
                footerFormResults.forEach(result => {
                  gsap.set(result.children[0], {
                    clearProps: "all",
                  });
                })
              }
            }).then(() => {
              formResponses(MCResponse);
            })
          } else {
            formResponses(MCResponse)
          }
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });

        // Forms response animations
        function formResponses(MCResponse) {
          // Success
          // if (MCResponse.status == "subscribed" && MCResponse.status == 200) {
          if (MCResponse.status == "subscribed") {
            let success = document.querySelector('footer .form-result.success');
            let email = document.querySelector('footer form input[type=email]');
            let button = document.querySelector('footer form button');
            let tl = gsap.timeline({ default: { ease: "power4" }});
            tl.set(footerForm, {
              height: 'auto'
            })
            tl.to([email,button], {
              opacity: 0,
              duration: 0.4,
            })
            tl.set([email,button], {
              height: 0,
            })
            tl.set(success, {
              height: 'auto',
              overflow: 'visible',
            })
            tl.set(success.children[0], {
              padding: 0,
            })
            tl.to(success, {
              delay: 0.1,
              opacity: 1,
              duration: 0.6,
            })
            tl.to(success, {
              delay: 5,
              opacity: 0,
              duration: 0.6,
            })
            tl.to(success, {
              height: 0,
              duration: 0.2,
            })
          }
          // Already subscribed
          // else if (MCResponse.title == "Member Exists" && MCResponse.status == 400) {
          else if (MCResponse.title == "Member Exists") {
            let other = document.querySelector('footer .form-result.other-message');
            let tl2 = gsap.timeline({ default: { ease: "power4" }});
            tl2.set(footerForm, {
              height: 'auto'
            })
            tl2.set(other, {
              height: 'auto',
              overflow: 'visible',
            })
            tl2.to(other, {
              delay: 0.1,
              opacity: 1,
              duration: 0.6,
            })
          }
          // Invalid error
          // else if (MCResponse.title == "Invalid Resource" && MCResponse.status == 400) {
          else if (MCResponse.title == "Invalid Resource") {
            let failed = document.querySelector('footer .form-result.failed');
            let message = document.querySelector('footer .form-result.failed .inner p');
            message.textContent = "This email is fake or invalid. Please try another email."
            let tl3 = gsap.timeline();
            tl3.set(footerForm, {
              height: 'auto'
            })
            tl3.to(failed, {
              height: 'auto',
              duration: 0.2,
              ease: "power4",
            })
            tl3.to(failed, {
              opacity: 1,
              duration: 0.6,
              ease: "power4",
            })
          }
          // Failed
          else {
            let failed = document.querySelector('footer .form-result.failed');
            let tl4 = gsap.timeline();
            tl4.set(footerForm, {
              height: 'auto'
            })
            tl4.to(failed, {
              height: 'auto',
              duration: 0.2,
              ease: "power4",
            })
            tl4.to(failed, {
              opacity: 1,
              duration: 0.6,
              ease: "power4",
            })
          }
        }
      })
    },

    retreatsDetailModalInit: function() {
      const modal = document.querySelector('#signup-modal');
      const openBtn = document.querySelector('.js-open-modal');
      const closeBtn = document.querySelector('.close-modal');
      const formContainer = document.querySelector('.modal-content-form');
      const successContainer = document.querySelector('.modal-content-success');
      const form = document.querySelector('#retreat-signup-form');

      if (!modal || !openBtn) return;

      // Timeline principal de abertura do modal
      const modalTl = gsap.timeline({ paused: true });
      modalTl.to(modal, {
          display: "flex",
          opacity: 1,
          duration: 0.4,
          ease: "power2.out"
      }).from(".modal-container", {
          y: 50,
          opacity: 0,
          duration: 0.5,
          ease: "back.out(1.7)"
      }, "-=0.2");

      openBtn.addEventListener('click', (e) => {
          e.preventDefault();
          // Resetar o estado interno para exibir o formulário sempre que abrir
          gsap.set(formContainer, { display: "block", opacity: 1 });
          gsap.set(successContainer, { display: "none", opacity: 0 });
          modalTl.play();
      });

      closeBtn.addEventListener('click', () => modalTl.reverse());

      modal.addEventListener('click', (e) => {
          if (e.target === modal) modalTl.reverse();
      });

      form.addEventListener('submit', event => {
          event.preventDefault();
          event.stopImmediatePropagation();

          form.style.pointerEvents = 'none';

          const formData = new FormData(event.target);
          let bodyData = Object.fromEntries(formData);

          window.fetch('/contactform', {
              method: 'post',
              body: JSON.stringify(bodyData),
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json; charset=UTF-8'
              }
          }).then((response) => {
              return response.json();
          }).then((data) => {
              const currentHeight = formContainer.offsetHeight;

              const successTl = gsap.timeline();

              successTl.to(formContainer, {
                  opacity: 0,
                  duration: 0.3,
                  onComplete: () => {
                      formContainer.style.display = 'none';
                      successContainer.style.display = 'flex';
                      successContainer.style.flexDirection = 'column';
                      successContainer.style.alignItems = 'center';
                      successContainer.style.justifyContent = 'center';
                      successContainer.style.minHeight = currentHeight + 'px';
                  }
              });

              successTl.to(successContainer, {
                  opacity: 1,
                  duration: 0.4,
                  ease: "power2.out"
              });

              const checkPaths = successContainer.querySelectorAll("path");
              successTl.fromTo(checkPaths,
                  { drawSVG: "0%" },
                  { drawSVG: "100%", duration: 1, stagger: 0.2, ease: "power3.out" },
                  "-=0.2"
              );

              form.style.pointerEvents = 'auto';

              setTimeout(() => {
                  if(modal.offsetParent !== null) modalTl.reverse();
              }, 4000);

          }).catch((error) => {
              console.log(error);
              form.style.pointerEvents = 'auto';
              window.alert("Something went wrong. Please try again.");
          });
      });
    },

    dragSlider: function() {
        if(window.innerWidth > 1024) {

        // SLIDER
        function _getClosest(item, array, getDiff) {
            var closest,
                diff;

            if (!Array.isArray(array)) {
                throw new Error("Get closest expects an array as second argument");
            }

            array.forEach(function (comparedItem, comparedItemIndex) {
                var thisDiff = getDiff(comparedItem, item);

                if (thisDiff >= 0 && (typeof diff == "undefined" || thisDiff < diff)) {
                    diff = thisDiff;
                    closest = comparedItemIndex;
                }
            });

            return closest;
        }


        function number(item, array) {
          return _getClosest(item, array, function (comparedItem, item) {
            return Math.abs(comparedItem - item);
          });
        }

        function lerp(a, b, n) {
            return (1 - n) * a + n * b
        }

        class Slider {
          constructor(options = {}) {
            this.bind()

            this.opts = {
              el: options.el || '.js-slider',
              ease: options.ease || 0.1,
              speed: options.speed || 1.25,
              velocity: 0,
              scroll: options.scroll || false
            }

            this.slider = document.querySelector('.js-slider')
            this.sliderInner = this.slider.querySelector('.js-slider__inner')
            this.slides = [...this.slider.querySelectorAll('.js-slide')]
            this.slidesNumb = this.slides.length

            this.rAF = undefined

            this.sliderWidth = 0

            this.onX = 0
            this.offX = 0

            this.currentX = 0
            this.lastX = 0

            this.min = 0
            this.max = 0

            this.centerX = window.innerWidth / 2
          }

          bind() {
            ['setPos', 'run', 'on', 'off', 'resize'].forEach((fn) => this[fn] = this[fn].bind(this))
          }

          setBounds() {
            const bounds = this.slides[0].getBoundingClientRect()
            const slideWidth = bounds.width
            if($(".slide-titles").length > 0) {
              const slideTitle = document.querySelector("#hy-slider .slide-titles")
            }
            const slideNumber = document.querySelector("#hy-slider .slide-numbers")

            this.sliderWidth = this.slidesNumb * slideWidth + (window.innerWidth / 2)
            this.max = -(this.sliderWidth - window.innerWidth)


            this.slides.forEach((slide, index) => {
              slide.style.left = `${index * slideWidth}px`
            })
          }


          setPos(e) {
            if (!this.isDragging) return
            this.currentX = this.offX + ((e.clientX - this.onX) * this.opts.speed)
            this.clamp()
          }

          clamp() {
            this.currentX = Math.max(Math.min(this.currentX, this.min), this.max)
          }

          run() {
            this.lastX = lerp(this.lastX, this.currentX, this.opts.ease)
            this.lastX = Math.floor(this.lastX * 100) / 100

            const sd = this.currentX - this.lastX
            const acc = sd / window.innerWidth
            let velo =+ acc

            this.sliderInner.style.transform = `translate3d(${this.lastX}px, 0, 0) skewX(${velo * this.opts.velocity}deg)`

            // TITLE SLIDES
            const sliderTag = document.querySelectorAll('#hy-slider .js-slide')
            const sliderLength = sliderTag.length

            const slideTitleInner = document.querySelector("#hy-slider .slide-titles .inner")
            const sliderWidthVal = this.sliderWidth - window.innerWidth -170
            let slidePerc = (this.lastX / sliderWidthVal * 100) * (1/sliderLength * (sliderLength-1))
            if ($(".slide-titles").length > 0) {
              slideTitleInner.style.transform = `translateY(${slidePerc}%)`
              //console.log(slideTitleInner.style.transform = `translateY(${slidePerc}%)`)
            }

            // TITLE numbers
            const slideNumberInner = document.querySelector("#hy-slider .slide-numbers .inner")
            if ($("#hy-slider").length > 0) {
              slideNumberInner.style.transform = `translateY(${slidePerc}%)`
            }



            this.requestAnimationFrame()
          }

          on(e) {
            this.isDragging = true
            this.onX = e.clientX
            this.slider.classList.add('is-grabbing')

          }

          off(e) {
            this.snap()
            this.isDragging = false
            this.offX = this.currentX
            this.slider.classList.remove('is-grabbing')
          }

          closest() {
            const numbers = []
            this.slides.forEach((slide, index) => {
              const bounds = slide.getBoundingClientRect()
              const diff = this.currentX - this.lastX
              const center = (bounds.x + diff) + (bounds.width / 2)
              const fromCenter = this.centerX - center
              numbers.push(fromCenter)
            })

            let closest = number(0, numbers)
            closest = numbers[closest]

            return {
              closest
            }
          }

          snap() {
            const { closest } = this.closest()

            this.currentX = this.currentX + closest
            this.clamp()
          }

          requestAnimationFrame() {
            this.rAF = requestAnimationFrame(this.run)
          }

          cancelAnimationFrame() {
            cancelAnimationFrame(this.rAF)
          }

          addEvents() {
            this.run()

            this.slider.addEventListener('mousemove', this.setPos, { passive: true })
            this.slider.addEventListener("touchmove", this.setPos, { passive: true });

            this.slider.addEventListener('mousedown', this.on, false)
            this.slider.addEventListener("touchstart", this.on, false);
            this.slider.addEventListener('mouseup', this.off, false)
            this.slider.addEventListener('touchend', this.off, false)
            this.slider.addEventListener('mouseleave', this.off, false)

            window.addEventListener('resize', this.resize, false)
          }

          removeEvents() {
            this.cancelAnimationFrame(this.rAF)

            this.slider.removeEventListener('mousemove', this.setPos, { passive: true })
            this.slider.addEventListener("touchmove", this.setPos, { passive: true });
            this.slider.removeEventListener('mousedown', this.on, false)
            this.slider.addEventListener("touchstart", this.on, false);
            this.slider.removeEventListener('mouseup', this.off, false)
            this.slider.addEventListener('touchend', this.off, false)
            this.slider.removeEventListener('mouseleave', this.off, false)
          }

          resize() {
            this.setBounds()
          }

          destroy() {
            this.removeEvents()

            this.opts = {}
          }

          init() {
            this.setBounds()
            this.addEvents()
          }
        }

        const slider = new Slider()
        slider.init()
        // END Slider
      }

    },
    instaSlider: function() {
      if ($(".insta-slider").length > 0) {

        // SLIDER
        function _getClosest(item, array, getDiff) {
            var closest,
                diff;

            if (!Array.isArray(array)) {
                throw new Error("Get closest expects an array as second argument");
            }

            array.forEach(function (comparedItem, comparedItemIndex) {
                var thisDiff = getDiff(comparedItem, item);

                if (thisDiff >= 0 && (typeof diff == "undefined" || thisDiff < diff)) {
                    diff = thisDiff;
                    closest = comparedItemIndex;
                }
            });

            return closest;
        }


        function number(item, array) {
          return _getClosest(item, array, function (comparedItem, item) {
            return Math.abs(comparedItem - item);
          });
        }

        function lerp(a, b, n) {
            return (1 - n) * a + n * b
        }

        class Slider {
          constructor(options = {}) {
            this.bind()

            this.opts = {
              el: options.el || '.insta-slider',
              ease: options.ease || 0.1,
              speed: options.speed || 1.5,
              velocity: 0,
              scroll: options.scroll || false
            }

            this.slider = document.querySelector('.insta-slider')
            this.sliderInner = this.slider.querySelector('.insta-slider .js-slider__inner')
            this.slides = [...this.slider.querySelectorAll('.insta-slider .js-slide')]
            this.slidesNumb = this.slides.length

            this.rAF = undefined

            this.sliderWidth = 0

            this.onX = 0
            this.offX = 0

            this.currentX = 0
            this.lastX = 0

            this.min = 0
            this.max = 0

            this.centerX = window.innerWidth / 2
          }

          bind() {
            ['setPos', 'run', 'on', 'off', 'resize'].forEach((fn) => this[fn] = this[fn].bind(this))
          }

          setBounds() {
            const bounds = this.slides[0].getBoundingClientRect()
            const slideWidth = bounds.width

            this.sliderWidth = this.slidesNumb * slideWidth
            this.max = -(this.sliderWidth - window.innerWidth)


            this.slides.forEach((slide, index) => {
              slide.style.left = `${index * slideWidth}px`
            })
          }


          setPos(e) {
            if (!this.isDragging) return
            this.currentX = this.offX + ((e.clientX - this.onX) * this.opts.speed)
            this.clamp()
          }

          clamp() {
            this.currentX = Math.max(Math.min(this.currentX, this.min), this.max)
          }

          run() {
            this.lastX = lerp(this.lastX, this.currentX, this.opts.ease)
            this.lastX = Math.floor(this.lastX * 100) / 100

            const sd = this.currentX - this.lastX
            const acc = sd / window.innerWidth
            let velo =+ acc

            this.sliderInner.style.transform = `translate3d(${this.lastX}px, 0, 0) skewX(${velo * this.opts.velocity}deg)`

            this.requestAnimationFrame()
          }

          on(e) {
            this.isDragging = true
            this.onX = e.clientX
            this.slider.classList.add('is-grabbing')
          }

          off(e) {
            this.snap()
            this.isDragging = false
            this.offX = this.currentX
            this.slider.classList.remove('is-grabbing')
          }

          closest() {
            const numbers = []
            this.slides.forEach((slide, index) => {
              const bounds = slide.getBoundingClientRect()
              const diff = this.currentX - this.lastX
              const center = (bounds.x + diff) + (bounds.width / 2)
              const fromCenter = this.centerX - center
              numbers.push(fromCenter)
            })

            let closest = number(0, numbers)
            closest = numbers[closest]

            return {
              closest
            }
          }

          snap() {
            const { closest } = this.closest()

            this.currentX = this.currentX + closest
            this.clamp()
          }

          requestAnimationFrame() {
            this.rAF = requestAnimationFrame(this.run)
          }

          cancelAnimationFrame() {
            cancelAnimationFrame(this.rAF)
          }

          addEvents() {
            this.run()

            this.slider.addEventListener('mousemove', this.setPos, { passive: true })
            this.slider.addEventListener('mousedown', this.on, false)
            this.slider.addEventListener('mouseup', this.off, false)
            this.slider.addEventListener('mouseleave', this.off, false)

            window.addEventListener('resize', this.resize, false)
          }

          removeEvents() {
            this.cancelAnimationFrame(this.rAF)

            this.slider.removeEventListener('mousemove', this.setPos, { passive: true })
            this.slider.removeEventListener('mousedown', this.on, false)
            this.slider.removeEventListener('mouseup', this.off, false)
            this.slider.addEventListener('mouseleave', this.off, false)
          }

          resize() {
            this.setBounds()
          }

          destroy() {
            this.removeEvents()

            this.opts = {}
          }

          init() {
            this.setBounds()
            this.addEvents()
          }
        }

        const instaSlider = new Slider()
        instaSlider.init()
        // END Slider
      }

    },
    mainScript: function() {

        // MOBILE SLIDER

        if(document.querySelector(".siema") && window.innerWidth < 1024) {
          const mbSlider = new Siema ({
            selector: '.siema',
            duration: 200,
            easing: 'ease-out',
            perPage: 1,
            startIndex: 0,
            draggable: true,
            multipleDrag: true,
            threshold: 20,
            loop: false,
            rtl: false,
            onInit: () => {},
            onChange: () => {},
          });
        }

        if(document.querySelector(".insta-siema") && window.innerWidth < 1024) {
          const mbigSlider = new Siema({
            selector: '.insta-siema',
            duration: 200,
            easing: 'ease-out',
            perPage: 1,
            startIndex: 0,
            draggable: true,
            multipleDrag: true,
            threshold: 20,
            loop: false,
            rtl: false,
            onInit: () => {},
            onChange: () => {},
          });
        }


        // KILL LOCOMOTIVE SCROLLBAR
        if($(".c-scrollbar").length > 0) {
          const scrollbar = document.querySelector(".c-scrollbar")
          scrollbar.remove();
        }


        // ===========================================================
        // HAMBURGER
        // ===========================================================
        if(window.innerWidth < 1024) {
          const content = document.querySelector(".content")
          const navPane = document.querySelector("#nav nav")
          const navInner = document.querySelector("#nav nav .inner")
          const logoImg = document.querySelector("#logo img")
          const logoName = document.querySelector("#logo span:nth-of-type(2)")
          const hamb = document.querySelector(".hamburger")
          const hLine1 = document.querySelector(".hamburger span:first-of-type")
          const hLine2 = document.querySelector(".hamburger span:nth-of-type(2)")

          gsap.set(navPane, {rotationZ: 7})
          gsap.set(navInner, {x: "30%", rotationZ: 7})

          hamb.addEventListener("click", function() {
            if (hamb.classList.contains("opened")) {
                hamb.classList.remove("opened")
                gsap.to(navInner, {x: "30%", rotationZ: 7, duration: .5, ease: "power4"})
                gsap.to(logoImg, {scale: 1, x: "0%", duration: .7, ease: "power4"})
                gsap.to(logoName, {x: "0%", scale: 1, duration: .7, ease: "power4"})
                //gsap.to(hLine1, {rotationZ: 0, top: "45%", duration: .5, ease: "power4"})
                //gsap.to(hLine2, {rotationZ: 0, top: "55%", duration: .5, ease: "power4"})
                gsap.to(navPane, {rotationZ: 7, x: "100%", duration: .7, ease: "power4"})
                gsap.to(content, {scale: 1, x: "0%", duration: .7, ease: "power4"})

                // console.log("Closed")
            } else {
                hamb.classList.add("opened")
                gsap.to(navInner, {x: "0%", rotationZ: 0, duration: 1, ease: "power4", delay: .15})
                gsap.to(logoImg, {scale: .5, x: "-150%", duration: .7, ease: "power4"})
                gsap.to(logoName, {x: "-40%", scale: 1.2, duration: .7, ease: "power4"})
                //gsap.to(hLine1, {rotationZ: 45, top: "50%", duration: .5, ease: "power4"})
                //gsap.to(hLine2, {rotationZ: -45, top: "50%", duration: .5, ease: "power4"})
                gsap.to(navPane, {rotationZ: 0, x: "0%", duration: .7, ease: "power4"})
                gsap.to(content, {scale: 1, x: "-30%", duration: .7, ease: "power4"})

                // console.log("Opened")
            }
          })
        }



        // ===========================================================
        // INTERSECTION OBSERVERS
        // MULTIOBSERVER
        const callback = function (entries, observer) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              entry.target.timeline.play();
            } else {
               entry.target.timeline.pause();
            }
          });
        };
        const options = {
          threshold: .4
        };
        const loopObs = {
          threshold: 0
        };
        const observer = new IntersectionObserver(callback, options);


        if(window.innerWidth > 1024) {
          //================================================================
          // TEXT ANIMATIONS
          //================================================================
          const titleTag = gsap.utils.toArray('.title-split');

          titleTag.forEach(split => {
            let titleSplit = new SplitText(split, {type: "lines, words, chars"})

            if(window.innerWidth > 1024) {
              const textAnim = gsap.timeline({
                scrollTrigger: {
                  trigger: split,
                  scroller: ".content",
                  start: "top 80%",
                  end: "bottom 80%",
                  //markers: true,
                  //scrub: true,
                  //toggleActions: "restart none reverse none",
                }
              })
              if (!$(split).hasClass("chars")) {
                textAnim.set(split, {perspective: 200})
                textAnim.from(titleSplit.lines, {
                  opacity: 0,
                  duration: 1.25,
                  y: 250,
                  scaleY: 2,
                  stagger: 0.15,
                  transformOrigin: "0% 0% 0%",
                  rotation: 15,
                  rotationX: -45,
                  ease: "power3"
                })
              }
              if(split.classList.contains("chars")) {
                textAnim.set(split, {perspective: 200})
                textAnim.from(titleSplit.chars, {
                  duration: 1.5,
                  y: 20,
                  x: 50,
                  stagger: .1,
                  rotation: 30,
                  rotationX: 90,
                  opacity: 0,
                  transformOrigin: "0% 100%",
                  ease: Quint.easeOut
                })
              }
            }
          });
          //================================================================
          // END TEXT ANIMATIONS
          //================================================================

          //================================================================
          // YEAR CHANGE
          //================================================================
          if($("#years").length > 0) {
            const yearChange = document.querySelectorAll(".year-wrap");
            const yearInner = document.querySelector(".year-change")

            const yearChangeAnim = gsap.timeline({
              scrollTrigger: {
                trigger: yearChange,
                scroller: ".content",
                start: "top 90%",
                end: "bottom 90%",
                //markers: true,
                //scrub: true,
                //toggleActions: "restart none reverse none",
              }
            })
            yearChangeAnim.to(yearInner, {
              duration: 3,
              y: "-1000%",
              transformOrigin: "50% 50%",
              ease: "power3.inOut"
            })

            // appear image on scroll
            const yearImg = document.querySelector(".years-image .img-container")
            gsap.set(yearImg, {y: "-50%", rotateX: 40,})
            gsap.to(yearImg, {
             scrollTrigger: {
                trigger: yearImg,
                scroller: ".content",
                start: "top 150%",
                end: "bottom -150%",
                //markers: true,
                scrub: true,
                //toggleActions: "restart none reverse none",
              },
              y: "50%",
              scale: 1,
              rotateX: -40,
              ease: "power0"
            })

          }
        //================================================================
        // END YEAR CHANGE
        //================================================================


        if($(".scrolling-text").length > 0) {
          const sText = document.querySelector(".scrolling-text");

          const scrollTextAnim = gsap.timeline({
            scrollTrigger: {
              trigger: ".scrolling-container",
              scroller: ".content",
              start: "top 95%",
              end: "bottom 0%",
              //markers: true,
              scrub: true,
              //toggleActions: "restart none reverse none",
            }
          })
          scrollTextAnim.to(sText, {
            duration: 3,
            x: "-25%",
            transformOrigin: "50% 50%",
            ease: "power0"
          })
        }

        //================================================================
        // ZEN QUOTE ANIMATION
        //================================================================
        const zenLine =  document.querySelector('.zen-line');
        const zenIcon = document.querySelectorAll(".zen-line .icon path")
        const zenImg = gsap.utils.toArray('.zen-img');
        let zenSplit = new SplitText(zenLine, {type: "lines, words, chars"})
        gsap.set(zenIcon, {drawSVG: "0%"})


        const zenAnim = gsap.timeline({
          scrollTrigger: {
            trigger: "#zen-quote",
            scroller: ".content",
            start: "top 25%",
            end: "bottom 0%",
            //markers: true,
            //scrub: true,
            toggleActions: "play pause play pause",
          }
        })
        zenAnim.from(zenSplit.chars, {
          opacity: 0,
          duration: 1.5,
          y: 250,
          scaleY: 2,
          stagger: 0.025,
          transformOrigin: "0% 0% 0%",
          rotation: 15,
          rotationX: -45,
          ease: "power3"
        })
        zenAnim.from(zenImg, {
          opacity: 0,
          stagger: .15,
          scale: .25,
          duration: 1.25,
          ease: "power2"
        }, "=-1.3")
        zenAnim.to(zenIcon, {duration: 2.5, stagger: .1, drawSVG: "100%", ease: "power3"}, "=-1.1");


        //================================================================
        // ON SCROLL GREY BG CHANGE
        //================================================================
        if($(".grey-bg").length > 0) {
          const greyBg = document.querySelector(".grey-bg")
          const bgChange = document.querySelector(".color-bg")

          gsap.to(bgChange, {
            scrollTrigger: {
              trigger: greyBg,
              scroller: ".content",
              start: "top 85vh",
              end: "bottom 70vh",
              toggleActions: "play reverse play reverse",
            },
            backgroundColor: "#D4CEC0",
            duration: .75,
            ease: "power0"
          })
        }
        if($(".private-class").length > 0) {
          gsap.to(".color-bg", {
            backgroundColor: "#ffffff",
            duration: .75,
            ease: "power0"
          })
          gsap.to(".progress-circle", {
            scale: 0,
          })
        } else {
          gsap.to(".progress-circle", {
            scale: .25,
          })
        }


        //================================================================
        // CHAPTERS ANIMATION
        //================================================================
        const chapters = gsap.utils.toArray('.chapter-icon');

        chapters.forEach(chapter => {
          const chImg = $(chapter).find('img');
          const chSpan = $(chapter).find('span');

          const chapterTween = gsap.timeline({
            scrollTrigger: {
              trigger: chapter,
              scroller: ".content",
              start: "top 70%",
              end: "bottom 80vh",
            }
          })
          chapterTween.to(chImg, {
            duration: 2,
            opacity: .25,
            rotation: gsap.utils.wrap([135, 150, 165, 180, 195]),
            scale: 1,
            transformOrigin:'center center',
            ease: "power4",
            stagger: .1
          })
          chapterTween.from(chSpan, {
            duration: 2,
            opacity: 0,
            y: 50,
            rotation: 10,
            ease: "power4"
          }, '-=2')
        })
        //================================================================
        // CHAPTERS ANIMATION  END
        //================================================================
      }
      //================================================================
      // NAV TO FIXED
      //================================================================
      if(window.innerWidth > 1024) {
        const logoText = document.querySelector("#logo div")
        let logoSplit = new SplitText(logoText, {type: "lines, words, chars"})

        const navFixed = gsap.timeline({})
        navFixed.to(logoSplit.chars, {
          y: -50,
          opacity: 0,
          duration: .4,
          stagger: .03,
          ease: "power3.inOut"
        }, "=-.7")
        navFixed.pause()

        const nft = document.querySelector(".content")

        const nftf = function() {
          if(nft.getBoundingClientRect().top < -200) {
            navFixed.play()
          } else {
            navFixed.reverse()
          }

          requestAnimationFrame(nftf)
        }
        nftf()
      }



      //================================================================
      // DRAW SVG PATH
      //================================================================
        const drawPath = document.querySelectorAll(".draw")
        drawPath.forEach(function(path) {
          const drawSvg = gsap.timeline({paused:true});
          const myPath = path.querySelectorAll("path")
          drawSvg.fromTo(myPath, {drawSVG: "0%"}, {duration: 2.5, delay: .2, stagger: .1, drawSVG: "100%", ease: "power3"});

          path.timeline = drawSvg;
        });
        Array.prototype.forEach.call(drawPath, (el) => {observer.observe(el);});
      //================================================================
      // DRAW SVG PATH END
      //================================================================


      // ADDING VIEW INTO ELEMENTS
        const viewTag = '.view';
        const tagClass = 'in-view';
        const tagAnimate = element => (
          element.classList.add("in-view")
        );
        const tagIsAnimated = element => (
          element.classList.contains("in-view")
        );
        const myConf = {
          root: null, // setting root to null sets it to viewport
          threshold: 0
        };
        const inView = new IntersectionObserver((entries, observer, options) => {
          entries.forEach((entry) => {
            // when element's is in viewport,
            if (entry.isIntersecting) {
              tagAnimate(entry.target);
            }
            //observer.unobserve(entry.target);
          });
        }, myConf);
        // get only these elements,
        // which are not animated yet
        const elements = [].filter.call(
          document.querySelectorAll(viewTag),
          element => !tagIsAnimated(element, tagClass),
        );
        // start observing your elements
        elements.forEach((element) => inView.observe(element));

        // OBSERVER ENDS
        // ==========================================================

        // ===========================================================
        // JOIN SECTION
        if ($("#join").length > 0 && window.innerWidth > 1024) {

          const bookImgOverlay = document.querySelectorAll(".book-img")
          const bookImg = document.querySelectorAll(".book-img img")
          const bookBtn = document.querySelectorAll("#join .button")

          bookBtn.forEach(btn => {

            btn.addEventListener("mouseover", function() {
              const btnData = this.dataset.class

              if (btn.dataset.class === btnData) {
                bookImgOverlay.forEach(imgOverlay => {
                  if (imgOverlay.dataset.class === btnData) {
                    imgOverlay.classList.add("hovered")
                  } else {
                    imgOverlay.classList.remove("hovered")
                  }
                })
              }
            })
             btn.addEventListener("mouseout", function() {
              bookImgOverlay.forEach(imgOverlay => {
                imgOverlay.classList.remove("hovered")
              })
            })


          })

        }

          // ===========================================================
        // SMART CAPTCHA
          if ($(".newsletter").length > 0) {
              { coded = "Q7ww@lDfDr3aUDZ7.GDN"
              key = "n5XupWyfQO4ghMeB6rHVaRCJ8TUioPYZl23cmxSzL1A9IqF7DbjswE0GNKtkvd"
              shift=coded.length
              link=""
              for (i=0; i<coded.length; i++) {
                if (key.indexOf(coded.charAt(i))==-1) {
                  ltr = coded.charAt(i)
                  link += (ltr)
                }
                else {
                  ltr = (key.indexOf(coded.charAt(i))-shift+key.length) % key.length
                  link += (key.charAt(ltr))
                }
              }
              var emailAddress = document.querySelector(".newsletter");
              emailAddress.innerHTML = ("<a class='text-link' target='_blank' href='mailto:"+link+"'><span>jill@hobokenyogi.com</span></a>");
            }
          }


          // CLASSES GRID ANIMATION
          if(window.innerWidth > 1024) {
            const cArticle = document.querySelectorAll("#classlist article")
            cArticle.forEach(article => {
              const cTitle = article.querySelector("h2")
              const cText = article.querySelector("p")
              const cImg = article.querySelector("img")
              const cNo = article.querySelector("span")

              gsap.set(cTitle, {
                rotation: -90,
                y: "200%",
                transformOrigin: "0% 0%"
              })
              gsap.set(cText, {
                y: 100,
                opacity: 0
              })

              const classHover = gsap.timeline()
              classHover.pause()
              classHover.to(cTitle, {
                //rotation: 0,
                y: "50%",
                scale: .8,
                duration: .6,
                ease: "power4.inOut"
              })
              classHover.to(cText, {
                y: 0,
                opacity: 1,
                duration: .6,
                ease: "power4.inOut"
              }, "-=0.55")
              classHover.to(cImg, {
                scale: 1.05,
                duration: .9,
                ease: "power4.inOut"
              }, "0")

              article.addEventListener("mouseenter", function() {
                classHover.restart()
              })

              article.addEventListener("mouseleave", function() {
                classHover.reverse()
              })

            })
          }

          // TEXT HOVER ROTATION
          if(window.innerWidth > 1024) {
            // PAST RETREATS
            const prLink = document.querySelectorAll("a.retreat-box")
            prLink.forEach(item => {
              const titleA = item.querySelector("h3 span:first-of-type")
              const titleB = item.querySelector("h3 span:nth-of-type(2)")
              const linkImg = item.querySelector("img")

              let prSplitA = new SplitText(titleA, {type: "lines, words, chars"})
              let prSplitB = new SplitText(titleB, {type: "lines, words, chars"})

              gsap.set(item, {perspective: 600})
              gsap.set(prSplitB.chars, {
                x: "-100%",
                rotationX:-70,
                opacity: 0,
                transformOrigin: "0% 50% -50",
              })

              item.addEventListener("mouseenter", function() {
                gsap.to(prSplitA.chars, {
                  x: "50%",
                  stagger: .02,
                  duration: .5,
                  rotationX:120,
                  y: 50,
                  transformOrigin: "0% 50% -50",
                  opacity: 0,
                  ease: "power2"
                })
                gsap.to(prSplitB.chars, {
                  x: "0%",
                  stagger: .02,
                  duration: .5,
                  skewX: -20,
                  rotationX:0,
                  opacity: 1,
                  ease: "power2"
                })
                gsap.to(linkImg, {
                  scale: 1.05,
                  duration: .8,
                  ease: "power4"
                })
              })
              item.addEventListener("mouseleave", function() {
                gsap.to(prSplitA.chars, {
                  x: "0%",
                  stagger: .02,
                  duration: .5,
                  rotationX:0,
                  y: 0,
                  transformOrigin: "0% 50% -50",
                  opacity: 1,
                  ease: "power2"
                })
                gsap.to(prSplitB.chars, {
                  x: "-100%",
                  stagger: .02,
                  duration: .5,
                  skewX: 0,
                  rotationX:-70,
                  opacity: 0,
                  ease: "power2"
                })
                gsap.to(linkImg, {
                  scale: 1,
                  duration: .8,
                  ease: "power4"
                })
              })
            })


            // OTHER RETREATS
            const orTitle = document.querySelectorAll("#other-retreats li:not(.selected)")
            gsap.set("#other-retreats li.selected span:nth-of-type(2)", {display: "none"})

            orTitle.forEach(title => {

              const lineA = title.querySelector("span:first-of-type")
              const lineB = title.querySelector("span:nth-of-type(2)")
              const orImg = title.querySelector("img")

              let orSplitA = new SplitText(lineA, {type: "lines, words, chars"})
              let orSplitB = new SplitText(lineB, {type: "lines, words, chars"})

              gsap.set(orImg, {opacity: 0, scale: .5, borderRadius: "50%"})
              gsap.set(title, {perspective: 400})
              gsap.set(orSplitB.chars, {
                x: -50,
                rotationX:-90,
                opacity: 0,
                transformOrigin: "0% 50% -50",
              })

              title.addEventListener("mouseenter", function() {
                gsap.to(orSplitA.chars, {
                  x: 50,
                  stagger: .02,
                  duration: .5,
                  rotationX:90,
                  transformOrigin: "0% 50% -50",
                  opacity: 0,
                  ease: "power2"
                })
                gsap.to(orSplitB.chars, {
                  x: 0,
                  stagger: .02,
                  duration: .5,
                  skewX: -20,
                  rotationX:0,
                  opacity: 1,
                  ease: "power2"
                })
                gsap.to(orImg, {
                  scale: 1,
                  opacity: 1,
                  borderRadius: "0%",
                  duration: .75,
                  ease: "power2"
                })
              })

              title.addEventListener("mouseleave", function() {
                gsap.to(orSplitA.chars, {
                  x: 0,
                  stagger: .02,
                  duration: .5,
                  rotationX:0,
                  transformOrigin: "0% 50% -50",
                  opacity: 1,
                  ease: "power2"
                })
                gsap.to(orSplitB.chars, {
                  x: -50,
                  stagger: .02,
                  duration: .5,
                  rotationX:-90,
                  opacity: 0,
                  ease: "power2"
                })
                gsap.to(orImg, {
                  scale: .5,
                  opacity: 0,
                  borderRadius: "50%",
                  duration: .75,
                  ease: "power2"
                })
              })
            })
          }


    },
    rafFunctions: function() {

        // PARALLAX HELPER
        if(window.innerWidth > 1024) {
          const parallaxSection = document.querySelectorAll('.parallax')
          const topViewport = Math.abs(document.querySelector(".content").getBoundingClientRect().top)
          const midViewport = topViewport + (window.innerHeight / 2)
          // FAKE HELPER
          const wrapper = document.querySelector('.content')
          const wrapperTop = wrapper.getBoundingClientRect().top
          let currentPixel = wrapper.getBoundingClientRect().top
          // progress helper
          const distWindow = window.innerHeight;
          const pCircle = document.querySelector(".progress-circle")
          const pArrow = document.querySelector(".progress-circle .arrow")

          // PARALLAX CONSTRUCTOR
          const looper = function() {

            // PROGRESS SCTROLL
            // ===========================================================
            // Progress circle
            if($(".progress-circle").length > 0) {
              const pHeight = Math.round(wrapper.getBoundingClientRect().height - window.innerHeight)
              const pDistTop = Math.round(wrapper.getBoundingClientRect().top + window.innerHeight)
              const pDistBottom = Math.round(wrapper.getBoundingClientRect().bottom - window.innerHeight);

              let progressScale = Math.abs(((pDistBottom - pHeight) / pHeight).toFixed(3))
              const progressDist = (progressScale * 100 / 4).toFixed(2)
              pArrow.style.opacity = 0
              pCircle.style.transform = "translateY("+ progressDist +"vh) scale(.25)";
              if (pDistBottom <= 150)  {
                pArrow.style.opacity = 1
                pCircle.style.transform = "translateY("+ progressDist +"vh) scale(1)";
                pCircle.style.pointerEvents = "auto"
                // click scroll top
                pCircle.style.cursor = "pointer"
              } else if (pDistBottom > 150)  {
                pCircle.style.cursor = "default"
                pCircle.style.pointerEvents = "none"
              }
            }

              // parallax
              // ===========================================================
              parallaxSection.forEach(section => {
                  const topSection = section.getBoundingClientRect().top + topViewport
                  const midSection = topSection + (section.offsetHeight / 2)
                  const dist = midViewport - midSection

                  const parallaxTags = section.querySelectorAll(".img-container")
                  const speed = parseFloat(section.getAttribute("data-parallax"))

                  if(
                      section.getBoundingClientRect().top < window.innerHeight + 200 &&
                      section.getBoundingClientRect().top + section.clientHeight > -200
                  ){
                      parallaxTags.forEach(parallax => {
                          TweenMax.to(parallax, 1, {y: `${dist * speed}px`, ease:Quart.easeOut})
                      })

                  } else if(
                    section.getBoundingClientRect().top > window.innerHeight + 200 ||
                    section.getBoundingClientRect().top + section.clientHeight < -200
                  ){

                  }
              })

              requestAnimationFrame(looper)

          }
          looper()
        }


    },
  }

// INITS
if ($("#hy-slider").length > 0) {
  PageInits.dragSlider()
}
// INIT OUR FUNCTIONS
if(window.innerWidth > 1024) {
  smoothScroll()
}
PageInits.instaSlider()
PageInits.mainScript()
PageInits.rafFunctions()
if($(".subscribe_form").length > 0) {
  PageInits.footerFormSubmissions()
}
if ($("#signup-modal").length > 0) {
    PageInits.retreatsDetailModalInit()
}


///////////////////////////////////////////////////////
//////////////////// SMOOTHSTATE ///////////////////////////

// PAGE TO PAGE ANIMATI
$(function(){
  'use strict';

  var options = {
    prefetch: true,
    cacheLength: 2,
    onStart: {
      duration: 1550, // Duration of our animation
      render: function ($container) {
        // Add your CSS animation reversing class
        $container.addClass('is-exiting');
        // Restart your animation
        smoothState.restartCSSAnimations();

        // RUN ANIMATION IN
        // PAGE TO PAGE ANIMATION
        const loadingWrap = document.querySelector(".page-to-page")
        lottie.loadAnimation({
          container: document.querySelector(".page-to-page"), // the dom element that will contain the animation
          renderer: 'svg',
          loop: false,
          autoplay: false,
          path: 'js/data.json',
          rendererSettings: {
            preserveAspectRatio: 'none', // Supports the same options as the svg element's preserveAspectRatio property
            progressiveLoad: false, // Boolean, only svg renderer, loads dom elements when needed. Might speed up initialization for large number of elements.
            hideOnTransparent: true, //Boolean, only svg renderer, hides elements when opacity reaches 0 (defaults to true)
            className: 'lottie'
          }
        });

        lottie.play()
        //pageAnimIn.restart()
        gsap.to(loadingWrap, {opacity: 1, duration: .1, ease: "power2"})
        gsap.to(".content", {opacity: 0, duration: .7, ease: "power2"})


      }
    },
    onReady: {
      duration: 0,
      render: function ($container, $newContent) {
        // Remove your CSS animation reversing class
        $container.removeClass('is-exiting pending');
        $container.addClass('is-animating');

        // Inject the new content
        $container.html($newContent);

      }
    },
    onAfter: function($container, $newContent) {
        $(".grid-overlay").removeClass("is-exiting");
        $container.removeClass('is-animating');
        //pageAnimOut.restart()
        gsap.from(".content", {opacity: 0, duration: .7, ease: "power2"})

          // Reset to the start position of lottie aniamtion
          const lottieSvg = document.querySelector(".page-to-page svg")
          setTimeout(function() {
            lottieSvg.remove()
          }, 1000)


            // RESET BG COLOR
            gsap.set(".color-bg", {backgroundColor: "#ffffff"})

            // ===========================================================
            // BALL FOLLOW HELPER
            if(document.querySelector("div#circle")) {
              const ball = document.querySelector("div#circle")
              const ballInner = document.querySelector("div#circle .inner")
              let mouseX = 0
              let mouseY = 0
              let ballX = 0
              let ballY = 0
              let ballSpeed = 0.12
              // ===========================================================
              // BALL FOLLOW
              function animateBall() {
                let distX = mouseX - ballX
                let distY = mouseY - ballY

                ballX = ballX + (distX * ballSpeed)
                ballY = ballY + (distY * ballSpeed)

                const centerHeight = ball.offsetHeight / 2
                const centerWidth = ball.offsetWidth / 2

                ball.style.transform = `translateX(${ballX - centerWidth}px) translateY(${ballY - centerHeight}px) `
                requestAnimationFrame(animateBall)
              }
              animateBall()

              // APPEAR ON PROJECT ENTER
              const projectArea = document.querySelectorAll("#hy-slider, .insta-slider")
                projectArea.forEach(follower => {
                 follower.addEventListener("mouseenter", function() {
                  ball.classList.add("show")
                  mouseX = event.pageX
                  mouseY = event.clientY
                })
                follower.addEventListener("mouseleave", function() {
                  ball.classList.remove("show", "down")
                })
                follower.addEventListener("mousemove", function (e) {
                  mouseX = event.pageX
                  mouseY = event.clientY
                })
                follower.addEventListener("mousedown", function () {
                  ball.classList.add("down")
                })
                follower.addEventListener("mouseup", function () {
                  ball.classList.remove("down")
                })
              })
            }


            // GENERATE RANDOM VALUES FOR SLIDER
            const autoSlideItem = document.querySelectorAll("#auto-slide .row img")
            let asValue = []

            autoSlideItem.forEach((si, index) => {
              let num = Math.floor(Math.random()*20) + 1; // this will get a number between 1 and 99;
              num *= Math.floor(Math.random()*2) == 1 ? 1 : -1; // this will add - to 50% of numbers
              //const val = Math.random() //make random value
              asValue.push(num) // add random value to array
            })

            // AUTOSLIDE CONSTRUCTOR
            if($("#auto-slide").length > 0) {
              // GENERATE RANDOM VALUES FOR SLIDER
              const autoSlideItem = document.querySelectorAll("#auto-slide .row img")
              let asValue = []

              autoSlideItem.forEach((si, index) => {
                let num = Math.floor(Math.random()*20) + 1; // this will get a number between 1 and 99;
                num *= Math.floor(Math.random()*2) == 1 ? 1 : -1; // this will add - to 50% of numbers
                //const val = Math.random() //make random value
                asValue.push(num) // add random value to array
              })


              const autoSlide = document.querySelector("#auto-slide")
              const slideInner = document.querySelector("#auto-slide .row")
              const autoOffsetTop = autoSlide.getBoundingClientRect().top
              const autoSlider = function() {
                const slideTop = autoSlide.getBoundingClientRect().top - window.innerHeight
                const slideBottom = autoSlide.getBoundingClientRect().bottom
                const scrolledPx = document.querySelector(".content").getBoundingClientRect().top - window.innerHeight
                let slideRatio = slideTop - slideBottom
                let tVal = 100 / slideRatio
                const innerRight = slideInner.getBoundingClientRect().right

                if(window.innerWidth > 1024) {
                  const tDiff = -autoOffsetTop - scrolledPx - 600
                  if(
                      autoSlide.getBoundingClientRect().top < window.innerHeight - 600 &&
                      autoSlide.getBoundingClientRect().top + autoSlide.clientHeight > 0
                  ){
                    gsap.to(slideInner, {
                      duration: .8,
                      x: -tDiff * 1.45,
                      ease: "power3"
                    })
                    autoSlideItem.forEach((slideItem, index) => {
                        let randomValue = randomValues[index];
                        gsap.to(slideItem, {
                          y: `${(-tDiff * .1) * (randomValue)}px`
                        })
                    })
                  }
                }
                if(window.innerWidth < 1024) {
                  const tDiff = -autoOffsetTop - scrolledPx - 400
                 if(
                    autoSlide.getBoundingClientRect().top < window.innerHeight - 400 &&
                    autoSlide.getBoundingClientRect().top + autoSlide.clientHeight > 0
                  ) {
                    gsap.to(slideInner, {
                      duration: .8,
                      x: -tDiff * 4,
                      ease: "power3"
                    })
                    autoSlideItem.forEach((slideItem, index) => {
                        let randomValue = randomValues[index];
                        gsap.to(slideItem, {
                          y: `${(-tDiff * .1) * (randomValue)}px`
                        })
                    })
                  }
              }

                requestAnimationFrame(autoSlider)
              }
              autoSlider()
            }

            // GET OUR LETTER RANDOM VALS
            const scrollLetters = document.querySelectorAll(".lettering div") //get our letters
            let randomValues = [] //make our array
            // for each letter generate a random value and add it to the array

            scrollLetters.forEach(letter => {
              const val = Math.random() //make random value
              randomValues.push(val) // add random value to array
              //console.log(val)
            })


            // random letter scroll
            if (!$(".content").hasClass("home")) {
              const randomLetTimeline = gsap.timeline();
              randomLetTimeline.set(".lettering", { perspective: 200,
              })
              randomLetTimeline.from(scrollLetters, {
                  duration: .7,
                  y: 20,
                  x: 50,
                  stagger: .065,
                  rotation: 30,
                  rotationX: 90,
                  opacity: 0,
                  transformOrigin: "0% 100%",
                  onComplete: randomLetterScroll,
                  ease: "power4.Out"
              })
                function randomLetterScroll() {
                  const distance = document.querySelector(".content").getBoundingClientRect().top
                  scrollLetters.forEach((letter, index) => {

                    if(
                        letter.getBoundingClientRect().top < window.innerHeight + 200 &&
                        letter.getBoundingClientRect().top + letter.clientHeight > -200
                    ){

                      let myVal = randomValues[index];
                      gsap.to(letter,  {
                        duration: 1,
                        y: `${Math.abs(distance * myVal / 3)}px`
                      })
                    }

                    //letter.style.transform = `translateY(${distance * myVal / 2}px)`
                  })
                  requestAnimationFrame(randomLetterScroll)
                }
            }



        // RETRIGGER FUNCTIONS
        if ($("#hy-slider").length > 0) {
          PageInits.dragSlider()
        }
        if(window.innerWidth > 1024) {
          smoothScroll()
        }
        PageInits.instaSlider()
        PageInits.mainScript()
        PageInits.rafFunctions()
        if($(".subscribe_form").length > 0) {
          PageInits.footerFormSubmissions()
        }
        if ($("#signup-modal").length > 0) {
            PageInits.retreatsDetailModalInit()
        }
    },
  },
  smoothState = $('#wrapper').smoothState(options).data('smoothState');
});







