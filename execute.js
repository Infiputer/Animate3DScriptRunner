functionParameters = {
    load_object: ['[glb_location]', 'as', '[object_name]'],
    position: ['[object_name]', 'to', '[x]', '[y]', '[z]'],
    change_position: ['[object_name]', '[coordinate_type]', 'by', '[change]'],
    hide: ['[object_name]'],
    show: ['[object_name]'],
    wait: ['[time]', 'seconds'],
    rotation: ['[x]', '[y]', '[z]'],
    change_rotation: ['[object_name]', '[coordinate_type]', 'by', '[change]'],
    position_camera: ['to', '[x]', '[y]', '[z]'],
    move_camera: ['[coordinate_type]', 'by', '[change]'],
    print: ['[text]'],
    jmp: ['[label]'],
    set: ['[variable]', 'to', '[value]'],
    add: ['[num1]', 'and', '[num2]', 'to', '[result]'],
    cmp: ['[value1]', 'with', '[value2]'],
    jmpg: ['[label]'],
    jmpe: ['[label]'],
    jmpl: ['[label]'],
    set_size: ['[object_name]', 'to', '[x]', '[y]', '[z]']
}

function error(err) {
    console.warn(err)
}

ProgramObjects = {};
ProgramVariables = {};
ProgramCMPFlag = 0; // -1=less that, 0=equal to, 1=greater than when the input is rotating in one direction
ObjectLoader = new THREE.GLTFLoader();

async function runFunction(functionName, parameters) {
    switch (functionName) {
        case "load_object":
            console.log("loading object", parameters.glb_location, "as", parameters.object_name);
            ObjectLoader.load(
                parameters.glb_location,
                function (glb) {
                    let character = glb.scene;
                    character.scale.set(0.01, 0.01, 0.01);
                    character.rotation.y = 3.14;
                    ProgramObjects[parameters.object_name] = character;
                    scene.add(character);
                }
            )
            break;
        case "position":
            if (ProgramObjects[parameters.object_name] == undefined) {
                error("Object '" + parameters.object_name + "'" + " was not defined");
                break;
            }
            ProgramObjects[parameters.object_name].position.x = parseFloat(parameters.x);
            ProgramObjects[parameters.object_name].position.y = parseFloat(parameters.y);
            ProgramObjects[parameters.object_name].position.z = parseFloat(parameters.z);
            break;
        case "change_position":
            if (ProgramObjects[parameters.object_name] == undefined) {
                error("Object '" + parameters.object_name + "'" + " was not defined");
                break;
            }
            if (parameters.coordinate_type == 'x') {
                ProgramObjects[parameters.object_name].position.x += parseFloat(parameters.change);
            }
            if (parameters.coordinate_type == 'y') {
                ProgramObjects[parameters.object_name].position.y += parseFloat(parameters.change);
            }
            if (parameters.coordinate_type == 'z') {
                ProgramObjects[parameters.object_name].position.z += parseFloat(parameters.change);
            }
            break;
        case "hide":
            if (ProgramObjects[parameters.object_name] == undefined) {
                error("Object '" + parameters.object_name + "'" + " was not defined");
                break;
            }
            ProgramObjects[parameters.object_name].visible = false;
            break;
        case "show":
            if (ProgramObjects[parameters.object_name] == undefined) {
                error("Object '" + parameters.object_name + "'" + " was not defined");
                break;
            }
            ProgramObjects[parameters.object_name].visible = true;
            break;
        case "wait":
            await sleep(parseFloat(parameters.time) * 1000);
            break;
        case "rotation":
            if (ProgramObjects[parameters.object_name] == undefined) {
                error("Object '" + parameters.object_name + "'" + " was not defined");
                break;
            }
            ProgramObjects[parameters.object_name].rotation.x = parseFloat(parameters.x);
            ProgramObjects[parameters.object_name].rotation.y = parseFloat(parameters.y);
            ProgramObjects[parameters.object_name].rotation.z = parseFloat(parameters.z);
            break;
        case "change_rotation":
            if (ProgramObjects[parameters.object_name] == undefined) {
                error("Object '" + parameters.object_name + "'" + " was not defined");
                break;
            }
            if (parameters.coordinate_type == 'x') {
                ProgramObjects[parameters.object_name].rotation.x += parseFloat(parameters.change);
            }
            if (parameters.coordinate_type == 'y') {
                ProgramObjects[parameters.object_name].rotation.y += parseFloat(parameters.change);
            }
            if (parameters.coordinate_type == 'z') {
                ProgramObjects[parameters.object_name].rotation.z += parseFloat(parameters.change);
            }
            break;
        case "position_camera":
            camera.position.x = parameters.x;
            camera.position.y = parameters.y;
            camera.position.z = parameters.z;
            break;
        case "move_camera":
            break;
        case "print":
            console.log(parameters.text)
            break;
        case "jmp":
            if (Sections[parameters.label] == undefined) {
                error("Undefined label '", parameters.label, "'")
                break;
            }
            LineNumberExecuting = Sections[parameters.label];
            break;
        case "set":
            ProgramVariables[parameters.variable] = parameters.value;
            break;
        case "add":
            ProgramVariables[parameters.result] = parseFloat(parameters.num1) + parseFloat(parameters.num2);
            break;
        case "cmp":
            if (parseFloat(parameters.value1) < parseFloat(parameters.value2)) ProgramCMPFlag = -1;
            if (parseFloat(parameters.value1) == parseFloat(parameters.value2)) ProgramCMPFlag = 0;
            if (parseFloat(parameters.value1) > parseFloat(parameters.value2)) ProgramCMPFlag = 1;
            break;
        case "jmpg":
            if (Sections[parameters.label] == undefined) {
                error("Undefined label '" + parameters.label + "'")
                break;
            }
            if (ProgramCMPFlag == 1) {
                LineNumberExecuting = Sections[parameters.label];
            }
            break;
        case "jmpe":
            if (Sections[parameters.label] == undefined) {
                error("Undefined label '" + parameters.label + "'")
                break;
            }
            if (ProgramCMPFlag == 0) {
                LineNumberExecuting = Sections[parameters.label];
            }
            break;
        case "jmpl":
            if (Sections[parameters.label] == undefined) {
                error("Undefined label '" + parameters.label + "'")
                break;
            }
            if (ProgramCMPFlag == -1) {
                LineNumberExecuting = Sections[parameters.label];
            }
            break;
        case "set_size":
            if (ProgramObjects[parameters.object_name] == undefined) {
                error("Object '" + parameters.object_name + "'" + " was not defined");
                break;
            }
            ProgramObjects[parameters.object_name].scale.set(
                parseFloat(parameters.x),
                parseFloat(parameters.y),
                parseFloat(parameters.z)
            );
            break;
    }
}

async function executeFunction(f) {
    if (f.length == 0 || f[0] == '' || f[0] == '$') {
        return;
    }
    // console.log("FUNCTION " + f[0] + " CALLED");
    funcParamsNeeded = functionParameters[f[0]];
    if (funcParamsNeeded == undefined) {
        error("Undefined function '" + f[0] + "'");
        return;
    }
    if (funcParamsNeeded.length != f.length - 1) {
        error("Not Enough Parameters for " + f[0] + " requires '" + funcParamsNeeded.join(" ")+"'");
        return;
    }
    parameters = {}
    for (i in f) {
        if (i == 0) continue;
        if (funcParamsNeeded[i - 1][0] == '[' && funcParamsNeeded[i - 1][funcParamsNeeded[i - 1].length - 1] == ']') {
            if (f[i][0] == '#') {
                f[i] = ProgramVariables[f[i].substring(1)];
            }
            parameters[funcParamsNeeded[i - 1].substring(1, funcParamsNeeded[i - 1].length - 1)] = f[i];
            continue;
        }
        if (f[i] != funcParamsNeeded[i - 1]) {
            error(
                "Function Parameter expected '" + funcParamsNeeded[i - 1] + "' at position " + i +
                " got " + f[i]
            )
            return;
        }
    }
    await runFunction(f[0], parameters);
}

