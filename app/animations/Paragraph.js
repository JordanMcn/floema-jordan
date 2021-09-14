import GSAP from 'gsap'

import Animation from 'classes/Animation'

// import { calculate, split } from 'utils/text'
// import { each } from 'lodash'

// Commented part are for special text animation, but pretty heavy

export default class Paragraph extends Animation {
  constructor ({ element, elements }) {
    super({
      element,
      elements
    })

    // this.elementLinesSpans = split({
    //   append: true,
    //   element: this.element
    // })
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

    // this.timelineIn.set(this.element, {
    //   autoAlpha: 1
    // })

    // each(this.elementsLines, (line, index) => {
    //   this.timelineIn.fromTo(line, {
    //     autoAlpha: 0,
    //     y: '100%'
    //   }, {
    //     autoAlpha: 1,
    //     delay: index * 0.1,
    //     duration: 1.5,
    //     ease: 'expo.out',
    //     y: '0%'
    //   }, 0)
    // })
  }

  animateOut () {
    GSAP.set(this.element, {
      autoAlpha: 0
    })
  }

  // onResize () {
  //   this.elementsLines = calculate(this.elementLinesSpans)
  // }
}
