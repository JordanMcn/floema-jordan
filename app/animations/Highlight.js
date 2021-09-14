import GSAP from 'gsap'

import Animation from 'classes/Animation'

export default class Highlight extends Animation {
  constructor ({ element, elements }) {
    super({
      element,
      elements
    })
  }

  animateIn () {
    GSAP.fromTo(this.element, {
      autoAlpha: 0,
      delay: 0.5
    }, {
      autoAlpha: 1,
      duration: 1
    })

    // this.timelineIn = GSAP.timeline({
    //   delay: 0.5
    // })

    // this.timelineIn.fromTo(this.element, {
    //   autoAlpha: 0,
    //   scale: 1.2
    // }, {
    //   autoAlpha: 1,
    //   duration: 1.5,
    //   ease: 'expo.out',
    //   scale: 1
    // })
  }

  animateOut () {
    GSAP.set(this.element, {
      autoAlpha: 0
    })
  }
}
