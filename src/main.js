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
        1.0, 1.0, 1.0, 0.0, 0.0,
        -1.0, 0.0, 1.0, 0.0, 0.0,
        0.0, -1.0, 1.0, 0.0, 0.0
    ]

    var vbo = createBuffer(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var positionAttrib = gl.getAttribLocation(program, 'vertPosition');
    var colorAttrib = gl.getAttribLocation(program, 'vertColor');

    gl.vertexAttribPointer(positionAttrib, 2, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
    gl.vertexAttribPointer(colorAttrib, 3, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);

    gl.enableVertexAttribArray(positionAttrib);
    gl.enableVertexAttribArray(colorAttrib);

    gl.useProgram(program);

    var u_matWorld = gl.getUniformLocation(program, 'matWorld');

    var matWorld = new Float32Array(9);
    glMatrix.mat3.identity(matWorld);

    gl.uniformMatrix3fv(u_matWorld, gl.FALSE, matWorld);



    var loop = function () {

        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.drawArrays(gl.TRIANGLES, 0, 3);
        requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
};