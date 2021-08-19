import GSAP from 'gsap'

class Color {
  change ({
    backgroundColor,
    color
  }) {
    GSAP.to(document.documentElement, {
      backgroundColor,
      color,
      duration: 1.5
    })
  }
}

export const ColorsManager = new Color()
