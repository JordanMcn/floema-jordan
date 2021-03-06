import { Plane, Transform } from 'ogl'

import map from 'lodash/map'

import Gallery from './Gallery'

export default class Home {
  constructor ({ gl, scene, sizes }) {
    this.gl = gl
    this.sizes = sizes

    this.group = new Transform()

    this.createGeometry()
    this.createGalleries()

    this.onResize({
      sizes: this.sizes
    })

    this.group.setParent(scene)

    this.show()
  }

  createGeometry () {
    this.geometry = new Plane(this.gl)
  }

  createGalleries () {
    this.galleriesElements = document.querySelectorAll('.about__gallery')

    this.galleries = map(this.galleriesElements, (element, index) => {
      return new Gallery({
        element,
        geometry: this.geometry,
        index,
        gl: this.gl,
        scene: this.group,
        sizes: this.sizes
      })
    })
  }

  /**
   * Animations.
   */
  show () {
    map(this.galleries, gallery => gallery.show())
  }

  hide () {
    map(this.galleries, gallery => gallery.hide())
  }

  /**
   * Events.
   */
  onResize (event) {
    map(this.galleries, gallery => gallery.onResize(event))
  }

  onTouchDown (event) {
    map(this.galleries, gallery => gallery.onTouchDown(event))
  }

  onTouchMove (event) {
    map(this.galleries, gallery => gallery.onTouchMove(event))
  }

  onTouchUp (event) {
    map(this.galleries, gallery => gallery.onTouchUp(event))
  }

  onWheel ({ pixelX, pixelY }) {}

  /**
   * Update.
   */
  update (scroll) {
    map(this.galleries, gallery => gallery.update(scroll))
  }

  /**
   * Destroy.
   */
  destroy () {
    // TODO: check if in final project, if next line is there
    this.group.setParent(null)
    map(this.galleries, gallery => gallery.destroy())
  }
}
