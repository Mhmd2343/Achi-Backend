import React, { useEffect, useRef } from "react"
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

const ProductModelViewer = ({ model }) => {
  const wrapRef = useRef(null)

  useEffect(() => {
    const container = wrapRef.current
    if (!container) return

    const width = container.clientWidth
    const height = container.clientHeight || 260

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100)
    camera.position.set(1.2, 0.9, 1.6)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(1)
    container.appendChild(renderer.domElement)

    const light1 = new THREE.DirectionalLight(0xffffff, 1.2)
    light1.position.set(3, 4, 5)
    scene.add(light1)

    const light2 = new THREE.DirectionalLight(0xffffff, 0.5)
    light2.position.set(-3, 2, -4)
    scene.add(light2)

    const ambient = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambient)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.enablePan = false
    controls.autoRotate = true
    controls.autoRotateSpeed = 1.4
    controls.minDistance = 0.6
    controls.maxDistance = 2.2

    let mounted = true
    let obj = null

    const loader = new GLTFLoader()
    loader.load(
      model,
      (gltf) => {
        if (!mounted) return

        obj = gltf.scene

        const box = new THREE.Box3().setFromObject(obj)
        const center = new THREE.Vector3()
        const size = new THREE.Vector3()
        box.getCenter(center)
        box.getSize(size)

        obj.position.x -= center.x
        obj.position.y -= center.y
        obj.position.z -= center.z

        const scale = 0.8 / Math.max(size.x, size.y, size.z)
        obj.scale.setScalar(scale)

        scene.add(obj)
      },
      undefined,
      () => {}
    )

    let raf = 0
    const animate = () => {
      raf = requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight || 260
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    window.addEventListener("resize", onResize)

    return () => {
      mounted = false
      window.removeEventListener("resize", onResize)
      cancelAnimationFrame(raf)
      controls.dispose()
      renderer.dispose()
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement)
      }
      if (obj) scene.remove(obj)
    }
  }, [model])

  return <div ref={wrapRef} className="w-full h-[380px]" />
}

export default ProductModelViewer
