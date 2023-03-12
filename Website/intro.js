var textWrapper = document.querySelector('.sliding-text .letters')
textWrapper.innerHTML = textWrapper.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>")

anime.timeline({ loop: false })
	.add({
		targets: '.sliding-text .line',
		scaleY: [0, 1],
		opacity: [0.5, 1],
		easing: 'easeOutExpo',
		duration: 700,
	})
	.add({
		targets: '.sliding-text .line',
		translateX: [0, document.querySelector('.sliding-text .letters').getBoundingClientRect().width + 10],
		easing: 'easeOutExpo',
		duration: 700,
		delay: 100,
	})
	.add({
		targets: '.sliding-text .letter',
		opacity: [0, 1],
		easing: 'easeOutExpo',
		duration: 600,
		offset: '-=775',
		delay: (el, i) => 34 * (i + 1) - 600,
	})
	.add({
		targets: '.line',
		opacity: 0,
		duration: 1000,
		easing: 'easeOutExpo',
	})

const canvas = document.querySelector('canvas')
const renderer = new THREE.WebGLRenderer({ canvas })
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const scene = new THREE.Scene()

// Add lights
const light = new THREE.AmbientLight(0xffffff, 1)
scene.add(light)

const loader = new THREE.GLTFLoader()

loader.load('scene.gltf', function (gltf) {
	const model = gltf.scene
	scene.add(model)
	animate()
})

camera.position.z = 5

function animate() {
	requestAnimationFrame(animate)
	renderer.render(scene, camera)
}
