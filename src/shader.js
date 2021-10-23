var VSBackStr = `
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

var FSBackStr = `
precision mediump float;
varying vec2 pixelPos;
uniform float time;
uniform float animationValueTop;
uniform float animationValueBottom;
uniform float timeFactor;
uniform vec3 mainColor; 

float calcWave(float animationValue){
    return sin((animationValue/timeFactor + pixelPos.x) / 2.0);;
}

void main()
{   
    vec3 color1 = mainColor;
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
        if(mainColor.r == 2.0 && mainColor.b == 4.0)
            color += vec3(0.5,0.0,1.0);
        else 
            color += vec3(mainColor) / 2.5;
    }

    if(mixValue < 0.9){
        mixValue = 0.0;
        color = vec3(0.0, 0.0, 0.0);
    }

    gl_FragColor = vec4(color,mixValue);
    

    if(length(pixelPos) < 0.215){
        gl_FragColor.a = 0.35 * abs(sin(time + pixelPos.x*5.0)*2.0);
    }
}

`;
