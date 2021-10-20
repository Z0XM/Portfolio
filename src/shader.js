var vertexShaderStr = `

precision mediump float;

attribute vec2 vertPosition;
attribute vec3 vertColor;

varying vec3 fragColor;

uniform mat3 matWorld;

void main()
{
    gl_Position.w=1.;

    fragColor=vertColor;
    gl_Position.xyw=matWorld * vec3(vertPosition, 1.0);
}


`;

var fragmentShaderStr = `

precision mediump float;

varying vec3 fragColor;

void main()
{
    gl_FragColor=vec4(fragColor,1.);
}

`;