precision highp float;

uniform float uAlpha;
uniform sampler2D tMap;

varying vec4 vPosition;
varying vec2 vUv;

void main() {
  vec4 texture = texture2D(tMap, vUv);

  gl_FragColor = vec4(texture);
//  gl_FragColor.a = (1. - abs(vPosition.x * 0.5)) * uAlpha;
  gl_FragColor.a = uAlpha;
}
