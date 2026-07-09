export const vertexShader = `
uniform float uTime;
uniform float uScroll;
uniform vec2 uMouse;
uniform vec2 uResolution;

attribute float aRandom;

varying vec2 vUv;
varying float vNoise;
varying float vMouseDist;

// Simplex 3D Noise
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
float snoise(vec3 v){ 
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 = v - i + dot(i, C.xxx) ;
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );
  vec3 x1 = x0 - i1 + 1.0 * C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
  i = mod(i, 289.0 ); 
  vec4 p = permute( permute( permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
  float n_ = 1.0/7.0;
  vec3  ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );
  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
}

void main() {
    vUv = uv;
    
    vec3 instancePos = vec3(instanceMatrix[3][0], instanceMatrix[3][1], instanceMatrix[3][2]);
    vec2 normPos = instancePos.xy / 800.0; 
    
    // Calculate precise screen position for localized cursor interaction
    vec4 clipPos = projectionMatrix * viewMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
    vec2 screenPos = clipPos.xy / clipPos.w;
    
    float aspect = uResolution.x / uResolution.y;
    vec2 aspectScreenPos = screenPos * vec2(aspect, 1.0);
    vec2 aspectMousePos = uMouse * vec2(aspect, 1.0);
    
    float dist = distance(aspectScreenPos, aspectMousePos);
    vMouseDist = dist;
    
    // Ambient noise field pushed forward by scroll
    float n1 = snoise(vec3(normPos * 1.5, uTime * 0.1 + uScroll * 2.0));
    vNoise = n1;
    
    // Cursor hover lift (strictly local, miniscule geometric change)
    float hoverInfluence = smoothstep(0.4, 0.0, dist);
    float lift = hoverInfluence * 3.0; 
    
    // Procedural wave linked to scroll
    float scrollWave = sin(normPos.y * 3.0 - uScroll * 15.0 + n1) * 8.0 * uScroll;
    
    vec3 displacedPos = position;
    vec4 worldPosition = instanceMatrix * vec4(displacedPos, 1.0);
    
    // Z-depth displacement ONLY to preserve grid integrity
    worldPosition.z += lift + scrollWave + (n1 * 4.0);
    
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
`;

export const fragmentShader = `
uniform float uTime;
uniform float uScroll;
uniform vec3 uColorDark;    // #050000 (Deepest crimson/near-black)
uniform vec3 uColorBase;    // #120000 (Dark maroon)
uniform vec3 uColorAccent;  // #D02717 (Emissive crimson)

varying vec2 vUv;
varying float vNoise;
varying float vMouseDist;

void main() {
    // Tile bezel calculation to create dark valleys between illuminated modules
    vec2 cUv = vUv * 2.0 - 1.0;
    vec2 absUv = abs(cUv);
    float maxDist = max(absUv.x, absUv.y);
    
    float bezel = smoothstep(0.92, 0.75, maxDist);
    
    // Scroll-linked lighting evolution
    // As we scroll, different parts of the noise field dynamically illuminate
    float illumination = smoothstep(-0.2, 0.8, vNoise + (uScroll * 0.5));
    
    // Interpolate base background colors
    vec3 baseCol = mix(uColorDark, uColorBase, illumination);
    
    // Add glowing emissive regions that organically migrate
    vec3 emissive = uColorAccent * pow(illumination, 4.0) * 0.6;
    
    // Cursor glow (soft, radial additive lighting beneath the tiles)
    float hoverGlow = smoothstep(0.5, 0.0, vMouseDist);
    vec3 cursorEmissive = uColorAccent * hoverGlow * 0.8;
    
    // Add micro-shimmer for continuous ambient life even at rest
    float shimmer = fract(sin(dot(gl_FragCoord.xy ,vec2(12.9898,78.233))) * (43758.5453 + uTime*0.02)) * 0.03;
    
    vec3 finalColor = baseCol + emissive + cursorEmissive + shimmer;
    
    // Apply tile gap shadowing seamlessly matching the dark background
    finalColor *= mix(0.1, 1.0, bezel); 
    
    gl_FragColor = vec4(finalColor, 1.0);
}
`;
