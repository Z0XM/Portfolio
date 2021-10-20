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

void main()
{
    gl_FragColor.rgb += fragColor * (1.5-length(fragPos));
    gl_FragColor.a = 1.0;
}

`;