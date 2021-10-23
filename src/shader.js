var vertexShaderStr = `
precision mediump float;
attribute vec2 vertPosition;
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
uniform float animationValueTop;
uniform float animationValueBottom;

float calcWave(float animationValue){
    return sin((animationValue + pixelPos.x) / 2.0);
}

void main()
{   
    vec3 color1 = vec3(2.5,0.0,2.5);
    vec3 color2 = vec3(0.0,0.0,0.0);

    float wave = calcWave(animationValueTop);

    float mixValue = distance(pixelPos*abs(wave/6.0),vec2(0.0,1.0));
    vec3 color = mix(color1,color2,mixValue);

    if(mixValue > 1.0){
        wave = calcWave(animationValueBottom);

        mixValue = distance(pixelPos*abs(wave/6.0),vec2(0.0,-1.0));
        color = mix(color1,color2,mixValue);
    }

    if(mixValue > 0.93){
        color += vec3(0.5,0.0,1.0);
    }

    if(mixValue < 0.9){
        mixValue = 0.0;
        color = vec3(0.0, 0.0, 0.0);
    }

    gl_FragColor = vec4(color,mixValue);
}

`;