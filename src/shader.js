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

const float PI = 3.1415926535897932384626433832795;

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

    vec2 pos = pixelPos + vec2(0.0, 0.05);
    
    if(abs(pixelPos.x) <= 0.215 && abs(pos.y) <= 0.15){
        gl_FragColor.a = 0.35 * abs(sin(time + pixelPos.x*5.0)*1.0);
    }

    pos = pixelPos + vec2(0.0, 0.1);

    float y_length;
    //if(pos.y > 0.0)y_length = pos.y * abs(sin(animationValueTop));
    //else
    if(pos.y < 0.0)
     y_length = pos.y * abs(sin(animationValueBottom));
    if(abs(y_length) >= 0.120 && abs(y_length) <= 0.125){
        if(abs(pixelPos.x) <= 0.2){
            gl_FragColor.rgb = vec3(1.0, 1.0, 1.0);
        }
        // if(abs(sin(abs(pixelPos.x) - time*2.0)) >= 0.999 && abs(sin(abs(pixelPos.x) - time*2.0)) <= 1.0)
        // {
        //     gl_FragColor.rgb = vec3(1.0);
        // }
    }

    float deg = animationValueTop;
    if(deg > PI*timeFactor) deg = 2.0*PI*timeFactor - deg;

    pos = pixelPos - vec2(0.0, 0.1835);
    float a = 0.226, b = 0.10, c = 0.222, d=0.097;
    if(pos.x*pos.x*a*a + pos.y*pos.y*b*b <= a*a*b*b 
    && pos.x*pos.x*c*c + pos.y*pos.y*d*d >= c*c*d*d
    && acos(pixelPos.x / length(pixelPos)) <= 2.0*(deg) 
    ){
        gl_FragColor.rgb += vec3(0.5, 1.0, 0.0);
    }

    if(animationValueTop == 0.0 && animationValueBottom == 0.0 && (abs(pixelPos.x) > 0.88 || abs(pixelPos.y) > 0.85)){
        gl_FragColor.rgb += vec3(0.7 * abs(sin(time + pixelPos.x + pixelPos.y)));//vec3(abs(sin(length(pixelPos))));
        gl_FragColor.a += 0.0;
    }
}

`;
