# Animate3D Script Runner

Recovered Replit project from the original `animate3d` folder.

## What It Does

This is a browser-based Three.js animation experiment driven by a small custom scripting language. The script in `index.js` loads GLB models, positions objects, moves the camera, waits between steps, stores variables, compares values, and jumps between labels to create a simple animated scene.

The project includes:

- `execute.js`, a command parser and interpreter for the animation script
- `index.js`, the sample animation program and Three.js scene setup
- `lights.js`, animated point lights around the scene
- `assets/person.glb` and `assets/ground.glb`, the recovered model assets
- `threejs/GLTFLoader.js`, the vendored loader used by the original Replit project

## Running Locally

Serve the folder with any static web server:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Recovery Notes

No credential-like secrets were found during recovery. The scanner hits are expected URLs and `accessor` references inside the vendored Three.js GLTF loader. The original CDN reference to Three.js was preserved.
