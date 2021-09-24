import { Mesh, Plane, Program } from 'ogl'
import GSAP from 'gsap'

import vertex from 'shaders/plane-vertex.glsl'
import fragment from 'shaders/plane-fragment.glsl'

export default class Media {
  constructor ({ gl, scene, sizes, transition }) {
    this.id = 'detail'

    this.element = document.querySelector('.detail__media__image')

    this.gl = gl
    this.scene = scene
    this.sizes = sizes
    this.transition = transition

    this.geometry = new Plane(this.gl)

    this.createTexture()
    this.createProgram()
    this.createMesh()
    this.createBounds({
      sizes: this.sizes
    })

    this.show()
  }

  createTexture () {
    const image = this.element.getAttribute('data-src')

    this.texture = window.TEXTURES[image]
  }

  createProgram () {
    this.program = new Program(this.gl, {
      vertex,
      fragment,
      uniforms: {
        uAlpha: { value: 0 },
        tMap: { value: this.texture }
      }
    })
  }

  createMesh () {
    this.mesh = new Mesh(this.gl, {
      program: this.program,
      geometry: this.geometry
    })

    this.mesh.setParent(this.scene)

    // this.mesh.rotation.z = GSAP.utils.random(-Math.PI * 0.03, Math.PI * 0.03)
  }

  createBounds ({ sizes }) {
    this.sizes = sizes
    this.bounds = this.element.getBoundingClientRect()

    this.updateScale()
    this.updateX()
    this.updateY()
  }

  /**
   * Animations.
   */
  show () {
    if (this.transition) {
      this.transition.animate(this.mesh, _ => {
        this.program.uniforms.uAlpha.value = 1
      })
    } else {
      GSAP.to(this.program.uniforms.uAlpha, {
        value: 1
      })
    }
  }

  hide () {
  }

  /**
   * Events.
   */
  onResize (sizes) {
    this.createBounds(sizes)
    this.updateX()
    this.updateY()
  }

  onTouchDown () {

  }

  onTouchMove () {

  }

  onTouchUp () {

  }

  /**
   * Loops
   */
  updateScale () {
    this.width = this.bounds.width / window.innerWidth
    this.height = this.bounds.height / window.innerHeight

    this.mesh.scale.x = this.sizes.width * this.width
    this.mesh.scale.y = this.sizes.height * this.height
  }

  updateX () {
    this.x = (this.bounds.left) / window.innerWidth
    this.mesh.position.x = -(this.sizes.width / 2) + (this.mesh.scale.x / 2) + (this.x * this.sizes.width)
  }

  updateY () {
    this.y = (this.bounds.top) / window.innerHeight
    this.mesh.position.y = (this.sizes.height / 2) - (this.mesh.scale.y / 2) - (this.y * this.sizes.height)
  }

  update () {
    this.updateX()
    this.updateY()
  }

  /**
   * Destroy.
   */
  destroy () {
    this.scene.removeChild(this.mesh)
  }
}
