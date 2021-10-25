var canvas = document.getElementById('canvas');
var gl = canvas.getContext('webgl2');

function setup() {
    gl.canvas.width = window.innerWidth;
    gl.canvas.height = window.innerHeight;
    gl.viewport(0, 0, window.innerWidth, window.innerHeight);

    var VSBack = createShader(gl.VERTEX_SHADER, VSBackStr);
    if (VSBack == -1) return;
    var FSBack = createShader(gl.FRAGMENT_SHADER, FSBackStr);
    if (FSBack == -1) return;
    var programBack = createProgram(VSBack, FSBack);
    if (programBack == -1) return;

    var verticesBack = [
        -1.0, 1.0,
        1.0, 1.0,
        1.0, -1.0,
        -1.0, -1.0
    ];

    var indicesBack = [
        3, 2, 1, 0
    ];

    var vboBack = createBuffer(gl.ARRAY_BUFFER, new Float32Array(verticesBack), gl.STATIC_DRAW);
    var iboBack = createBuffer(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indicesBack), gl.STATIC_DRAW);

    var positionAttribBack = gl.getAttribLocation(programBack, 'vertPosition');

    var u_matWorld = gl.getUniformLocation(programBack, 'matWorld');

    var matWorld = new Float32Array(16);
    glMatrix.mat4.identity(matWorld);

    var matIdentity = new Float32Array(16);
    glMatrix.mat4.identity(matIdentity);

    var matScaled = new Float32Array(16);
    var matRotated = new Float32Array(16);
    var matTranslated = new Float32Array(16);


    var u_mainColor = gl.getUniformLocation(programBack, 'mainColor');
    var mainColor = [2.0, 0.0, 4.0];
    var colorList = [
        //[1.0, 0.0, 0.0],
        //[0.0, 1.0, 0.0],
        //[0.0, 0.0, 1.0],
        [2.0, 0.0, 4.0],
    ];

    var u_timeFactor = gl.getUniformLocation(programBack, 'timeFactor');

    var timeLimit = Math.PI;
    var timeFactor = 0.5;

    var u_animationValueTop = gl.getUniformLocation(programBack, 'animationValueTop');
    var animationValueTop = timeLimit * timeFactor;
    var animationCounterTop = 0.0;
    var animationOpenTop = false;

    var u_animationValueBottom = gl.getUniformLocation(programBack, 'animationValueBottom');
    var animationValueBottom = timeLimit * timeFactor;
    var animationCounterBottom = 0.0;
    var animationOpenBottom = false;

    document.getElementById('skills').addEventListener('click', function () {
        if (animationValueBottom == timeLimit * timeFactor || animationValueBottom == 0.0) {
            animationCounterBottom = 0.0;
            animationOpenBottom = !animationOpenBottom;

            //mainColor = colorList[Math.floor(Math.random() * (colorList.length))];

            if (!animationOpenBottom)
                document.querySelector('.skillspace').style.setProperty('z-index', 2);
        }
    });

    document.getElementById('projects').addEventListener('click', function () {
        if (animationValueTop == timeLimit * timeFactor || animationValueTop == 0.0) {
            animationCounterTop = 0.0;
            animationOpenTop = !animationOpenTop;

            //mainColor = colorList[Math.floor(Math.random() * (colorList.length))];
        }
    });


    var u_time = gl.getUniformLocation(programBack, 'time');
    var time = 0.0;
    var lastTime = 0.0;
    var dt = 0.0;
    /*
    usePorgram
    bindBuffer
    vertexAttribPointer
    enableVertexAttribArray
    gl.uniform
    gl.draw

    */
    gl.enable(gl.DEPTH_TEST);

    var loop = function () {
        time = performance.now() / 1000;
        dt = time - lastTime;
        lastTime = time;

        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////

        gl.useProgram(programBack);
        gl.bindBuffer(gl.ARRAY_BUFFER, vboBack);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboBack);
        gl.vertexAttribPointer(positionAttribBack, 2, gl.FLOAT, gl.FALSE, 2 * Float32Array.BYTES_PER_ELEMENT, 0);
        gl.enableVertexAttribArray(positionAttribBack);


        animationCounterTop += dt;
        animationCounterBottom += dt;

        if (animationCounterTop < timeLimit * timeFactor) animationValueTop += dt;
        else {
            if (animationOpenTop) {
                animationValueTop = timeLimit * timeFactor;
                //document.querySelector('.skillspace').style.setProperty('z-index', 4);
            }
            else {
                animationValueTop = 0.0;
                //document.querySelector('.skillspace').style.setProperty('z-index', 2);
            }
        }
        if (animationCounterBottom < timeLimit * timeFactor) animationValueBottom += dt;
        else {
            if (animationOpenBottom) {
                animationValueBottom = timeLimit * timeFactor;
                document.querySelector('.skillspace').style.setProperty('z-index', 4);
            }
            else animationValueBottom = 0.0;

        }


        gl.uniform3fv(u_mainColor, mainColor);
        gl.uniform1f(u_timeFactor, timeFactor);
        gl.uniform1f(u_time, time);
        gl.uniform1f(u_animationValueTop, animationValueTop);
        gl.uniform1f(u_animationValueBottom, animationValueBottom);

        glMatrix.mat4.scale(matScaled, matIdentity, [1.1, 1.1, 0.0]);
        glMatrix.mat4.rotate(matRotated, matScaled, 0.0, [0.0, 0.0, 1.0]);
        glMatrix.mat4.translate(matWorld, matRotated, [0.0, 0.0, 0.0]);

        gl.uniformMatrix4fv(u_matWorld, gl.FALSE, matWorld);

        gl.drawElements(gl.TRIANGLE_FAN, indicesBack.length, gl.UNSIGNED_SHORT, 0);

        requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
};