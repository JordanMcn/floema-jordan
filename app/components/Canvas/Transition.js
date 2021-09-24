import GSAP from 'gsap'
import { Mesh, Plane, Program } from 'ogl'

import vertex from 'shaders/plane-vertex.glsl'
import fragment from 'shaders/plane-fragment.glsl'

export default class Media {
  constructor ({ collections, details, gl, scene, sizes, url }) {
    this.from = collections || details
    this.gl = gl
    this.scene = scene
    this.sizes = sizes
    this.url = url

    this.geometry = new Plane(this.gl)
  }

  createProgram (texture) {
    this.program = new Program(this.gl, {
      vertex,
      fragment,
      uniforms: {
        uAlpha: { value: 1 },
        tMap: { value: texture }
      }
    })
  }

  createMesh (mesh) {
    this.mesh = new Mesh(this.gl, {
      program: this.program,
      geometry: this.geometry
    })

    this.mesh.scale.x = mesh.scale.x
    this.mesh.scale.y = mesh.scale.y
    this.mesh.scale.z = mesh.scale.z

    this.mesh.position.x = mesh.position.x
    this.mesh.position.y = mesh.position.y
    this.mesh.position.z = mesh.position.z + 0.01

    this.mesh.setParent(this.scene)
  }

  /**
   * Events.
   */
  setElement (element) {
    if (element.id === 'collections') {
      const { index, medias } = element

      const media = medias[index]

      this.createProgram(media.texture)
      this.createMesh(media.mesh)

      this.transition = 'detail'
    } else {
      this.createProgram(element.texture)
      this.createMesh(element.mesh)

      this.transition = 'collections'
    }
  }

  /**
   * Animations.
   */
  animate (element, onComplete) {
    const timeline = GSAP.timeline({
      onComplete
    })

    timeline.to(this.mesh.scale, {
      duration: 1.5,
      ease: 'expo.inOut',
      x: element.scale.x,
      y: element.scale.y,
      z: element.scale.z
    }, 0)

    timeline.to(this.mesh.position, {
      duration: 1.5,
      ease: 'expo.inOut',
      x: element.position.x,
      y: element.position.y,
      z: element.position.z
    }, 0)

    timeline.call(_ => {
      this.scene.removeChild(this.mesh)
    })
  }
}
