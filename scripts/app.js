// Variables for setup
let container, camera, renderer, scene, house

function init() {
    container = document.querySelector('.scene')
    
    // RENDERER
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    container.appendChild(renderer.domElement)

    // SCENE
    scene = new THREE.Scene()

    const fov = 35;
    const aspect = container.clientWidth / container.clientHeight
    const near = 0.1
    const far = 1000
    
    // CAMERA
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far)

    const cameraPos = {
        x: 0,
        y: 5,
        z: 30
    }
    camera.position.set(cameraPos.x, cameraPos.y, cameraPos.z)

    // LIGHTS
    const ambientLight = new THREE.AmbientLight(0x404040, .5)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
    directionalLight.position.set(50, 50, 100)
    scene.add(ambientLight)
    scene.add(directionalLight)

    // MODEL
    let loader = new THREE.GLTFLoader()
    loader.load('./3d_model/scene.gltf', function (gltf) {
        //console.log(gltf)
        scene.add(gltf.scene)
        house = gltf.scene.children[0]
        animate()
    })
}

function animate() {
    requestAnimationFrame(animate)
    house.rotation.z += 0.0005
    renderer.render(scene, camera)
}

init()

function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(container.clientWidth, container.clientHeight)
}

window.addEventListener('resize', onWindowResize)