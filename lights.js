lights = [];

numLights = 10;
setTimeout(function(){
    for (i = 0; i < numLights; i++) {
        light = new THREE.PointLight(0xffffff, 1, 200);
        light.position.set(5, 10, 5);
        scene.add(light);
        lights.push(light);
    }
}, 100)
lightSpeed = 0.0001;
lightAngle = 0;
gap = 6.28 / numLights;
setInterval(function () {
    for (i = 0; i < numLights; i++) {
        lights[i].position.set(Math.cos(gap * i + lightAngle) * 100, 10, Math.sin(gap * i + lightAngle) * 100);
    }
    lightAngle += lightSpeed;
    if(lightAngle > 6.28){
        lightAngle = 0;
    }
}, 10)