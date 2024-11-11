import './styles/style.css'
import * as THREE from 'three'

//sound
// let mySound = new Audio('/sound.mp3')
// if (mouseX)
// mySound.play()


//texture loader    
const loader = new THREE.TextureLoader();
const star = loader.load('./static/star.png');

//Canvas
const canvas = document.querySelector('canvas.webgl');

//Scene
const scene = new THREE.Scene();

//Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener( 'resize', () =>{
    sizes.height = window.innerHeight,
    sizes.width = window.innerWidth

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height);
})

//Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width/ sizes.height, 0.1, 1000);
camera.position.z = 2;
scene.add(camera);

//Geometry

const geometry = new THREE.TorusGeometry( .7, .2, 16, 100);

const particlesGeometry = new THREE.BufferGeometry;
const particlesCnt = 5000;

const posArray = new Float32Array( particlesCnt * 3 );

for (let i = 0; i < particlesCnt * 3; i++){
    // posArray[i] = Math.random()
    // posArray[i] = Math.random() - 0.5
    // posArray[i] = (Math.random() - 0.5) * 5
    posArray[i] = (Math.random() - 0.5) * (Math.random() * 5)
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

//Material
const material = new THREE.PointsMaterial({
    size: 0.005
});

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.001
    // map: star,
    // transparent: true,
    // color: 'white'
});

//Mesh
const mesh = new THREE.Points( geometry, material ); 
const particlesMesh = new THREE.Points (particlesGeometry, particlesMaterial)
scene.add(mesh, particlesMesh);



//Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setClearColor(new THREE.Color('#21282a'),1)
renderer.render( scene, camera );

// Mouse

document.addEventListener ('mousemove', animateParticles)

let mouseX = 0
let mouseY = 0

function animateParticles(event){

    mouseY = event.clientY
    mouseX = event.clientX


}


// Animate

// function animate(){
//     requestAnimationFrame( animate );

//     mesh.rotation.y += 0.01;
//     mesh.rotation.z += 0.01;

    
// }
// animate();

const clock = new THREE.Clock()

const tick = () =>
    {
    
        const elapsedTime = clock.getElapsedTime()
    
        // Update objects
        mesh.rotation.y = .1 * elapsedTime
        particlesMesh.rotation.y = .1 * elapsedTime
       
        if (mouseX > 0){
        mesh.rotation.x = mouseY * (elapsedTime * 0.00008)
        mesh.rotation.y = mouseX * (elapsedTime * 0.00008)
        particlesMesh.rotation.x = mouseY * (elapsedTime * 0.00008)
        particlesMesh.rotation.y = mouseX * (elapsedTime * 0.00008)
        }
    
        // Update Orbital Controls
        // controls.update()
    
        // Render
        renderer.render(scene, camera)
    
        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
    }
    
    tick()

