const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer();
function bodyLoaded() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

light = new THREE.PointLight(0xffffff, 2, 200);
light.position.set(5, 10, 5);
scene.add(light);
THREE.Cache.enabled = true;

rawCode = `
print start
load_object assets/person.glb as person
load_object assets/ground.glb as ground
wait 0.5 seconds
position_camera to 0 2 0
set_size ground to 0.05 0.05 0.05
position person to 0 0.6 0
set cam_z to 0
$scene1
wait 0.02 seconds
add #cam_z and 0.01 to cam_z
position_camera to 0 2 #cam_z
cmp #cam_z with 5
jmpg $scene2
jmp $scene1
$scene2
wait 1 seconds
jmp $scene2
`

lines = rawCode.split("\n")
Sections = {}; // {label:line}
function generateSections(){
    for(i in lines){
        if(lines[i][0] == '$'){
            Sections[lines[i]] = i;
        }
    }
}

LineNumberExecuting = 0;
async function beginExecution() {
    for (LineNumberExecuting = 0; LineNumberExecuting < lines.length; LineNumberExecuting++) {
        if(lines[LineNumberExecuting].trim() == '') continue;
        if(lines[LineNumberExecuting][0] == '$') continue;
        await new Promise(async (resolve, reject) => {
            func = lines[LineNumberExecuting].split(" ")[0];
            await executeFunction(JSON.parse(JSON.stringify(lines[LineNumberExecuting].split(" "))));
            resolve();
        });
    }
}

generateSections();
beginExecution();

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

