var canvas = document.getElementById('canvas');
var gl = canvas.getContext('webgl2');

function setup() {
    gl.canvas.width = window.innerWidth;
    gl.canvas.height = window.innerHeight;
    gl.viewport(0, 0, window.innerWidth, window.innerHeight);

    var vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderStr);
    if (vertexShader == -1) return;

    var fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderStr);
    if (fragmentShader == -1) return;

    var program = createProgram(vertexShader, fragmentShader);
    if (program == -1) return;

    var vertices = [
        -2.0, 2.0, 1.0, 0.0, 0.0,
        2.0, 2.0, 1.0, 0.0, 0.0,
        2.0, -2.0, 1.0, 0.0, 0.0,
        -2.0, -2.0, 1.0, 0.0, 0.0
    ];

    var indices = [
        3, 2, 1, 0
    ];


    var vbo = createBuffer(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    var ibo = createBuffer(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);


    var positionAttrib = gl.getAttribLocation(program, 'vertPosition');
    var colorAttrib = gl.getAttribLocation(program, 'vertColor');

    gl.vertexAttribPointer(positionAttrib, 2, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
    gl.vertexAttribPointer(colorAttrib, 3, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);

    gl.enableVertexAttribArray(positionAttrib);
    gl.enableVertexAttribArray(colorAttrib);

    gl.useProgram(program);


    var u_matWorld = gl.getUniformLocation(program, 'matWorld');

    var matWorld = new Float32Array(16);
    glMatrix.mat4.identity(matWorld);

    var matIdentity = new Float32Array(16);
    glMatrix.mat4.identity(matIdentity);

    var matScaled = new Float32Array(16);
    var matRotated = new Float32Array(16);
    var matTranslated = new Float32Array(16);

    glMatrix.mat4.scale(matScaled, matIdentity, [1.0, 1.0, 0.0]);
    glMatrix.mat4.rotate(matRotated, matScaled, 0.0, [0.0, 0.0, 1.0]);
    glMatrix.mat4.translate(matWorld, matRotated, [0.0, 0.0, 0.0]);

    gl.uniformMatrix4fv(u_matWorld, gl.FALSE, matWorld);


    var u_time = gl.getUniformLocation(program, 'time');
    var time = 0.0;

    var loop = function () {
        time = performance.now() / 1000;
        gl.uniform1f(u_time, time);

        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.drawElements(gl.TRIANGLE_FAN, indices.length, gl.UNSIGNED_SHORT, 0);
        requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
};