const shaders = {
    fragmentSrc: [`
    precision mediump float;

    uniform float time;
    uniform vec2 resolution;
    uniform vec2 mouse;

    float noise(vec2 pos) {
        return fract(sin(dot(pos, vec2(12.9898 - time,78.233 + time))) * 43758.5453);
    }

    void main(void) {
        vec2 normalPos = gl_FragCoord.xy / resolution.xy;
        float pos = (gl_FragCoord.y / resolution.y);
        float mouse_dist = length(vec2((mouse.x - normalPos.x) * (resolution.x / resolution.y) , mouse.y - normalPos.y));
        float distortion = clamp(1.0 - (mouse_dist + 0.1) * 3.0, 0.0, 1.0);
    
        pos -= (distortion * distortion) * 0.1;
    
        float c = sin(pos * 400.0) * 0.4 + 0.4;
        c = pow(c, 0.1);
        c *= 0.1;
        
        vec3 color = vec3(0.0, c, 0.0);
    
        gl_FragColor = vec4(color, 0.1);
    }
    `]
};