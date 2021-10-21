var vertexShaderStr = `

precision mediump float;

attribute vec2 vertPosition;
attribute vec3 vertColor;

varying vec3 fragColor;
varying vec2 fragPos;

uniform mat4 matWorld;

void main()
{
    fragPos=vertPosition;
    fragColor=vertColor;
    gl_Position=matWorld * vec4(vertPosition, 0.0, 1.0);
}


`;

var fragmentShaderStr = `

precision mediump float;

varying vec3 fragColor;
varying vec2 fragPos;

// void main()
// {
//     gl_FragColor.rgb += fragColor * (1.5-length(fragPos));
//     gl_FragColor.a = 1.0;
// }

// #ifdef GL_ES
// precision mediump float;
// #endif

//uniform vec2 u_resolution;
uniform float time;

void main()
{
    vec2 coord=10.0*fragPos;
    
    float len;
    
    for(int i=0;i<100;i++){
        len=sqrt(length(coord));
        
        coord.x-=cos(time*exp(-time/1000.+cos(len)))*(time/100.);
        coord.y+=sin(time*exp(-time/1000.+cos(len)))*(time/100.);
    }
    
    gl_FragColor=vec4(cos(len),3.*cos(len),3.*cos(len),1.);
}

`;