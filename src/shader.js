var vertexShaderStr = `

precision mediump float;

attribute vec2 vertPosition;
//attribute vec3 vertColor;

varying vec2 pixelPos;

uniform mat4 matWorld;

void main()
{
    pixelPos = vertPosition;
    gl_Position=matWorld * vec4(vertPosition, 0.0, 1.0);
}


`;

var fragmentShaderStr = `

precision mediump float;

varying vec2 pixelPos;

uniform float time;

void main()
{   
    vec3 color1 = vec3(2.5,0.0,2.5);
    vec3 color2 = vec3(0.0,0.0,0.0);

    float mixValue = distance(pixelPos*abs(cos((time + pixelPos.x)/2.0)/6.0),vec2(0.0,1.0));
    vec3 color = mix(color1,color2,mixValue);

    if(color[2] < 0.0){
        mixValue = distance(pixelPos*abs(cos((time+pixelPos.x)/2.0)/6.0),vec2(0.0,-1.0));
        color = mix(color1,color2,mixValue);
    }

    gl_FragColor = vec4(color,mixValue);
    
    //gl_FragColor = vec4(pixelPos*0.5 + 0.5, 0.0, 1.0);
}

`;