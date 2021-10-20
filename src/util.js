var createShader = function (type, sourceString) {
    let id = gl.createShader(type);
    gl.shaderSource(id, sourceString);

    gl.compileShader(id);
    if (!gl.getShaderParameter(id, gl.COMPILE_STATUS)) {
        console.error('Vertex Shader Not Compiled: ', gl.getShaderInfoLog(id));
        return -1;
    }

    return id;
};

var createProgram = function (vertexShaderID, fragmentShaderID) {

    let programID = gl.createProgram();
    gl.attachShader(programID, vertexShaderID);
    gl.attachShader(programID, fragmentShaderID);

    gl.linkProgram(programID);

    gl.linkProgram(programID);
    if (!gl.getProgramParameter(programID, gl.LINK_STATUS)) {
        console.error('Linking Program: ', gl.getProgramInfoLog(programID));
        return -1;
    }

    gl.validateProgram(programID);
    if (!gl.getProgramParameter(programID, gl.VALIDATE_STATUS)) {
        console.error('Validating Program: ', gl.getProgramInfoLog(programID));
        return -1;
    }

    return programID;
};

var createBuffer = function (type, vertices, draw_mode) {
    let bufferID = gl.createBuffer();
    gl.bindBuffer(type, bufferID);
    gl.bufferData(type, new Float32Array(vertices), draw_mode);

    return bufferID;
};