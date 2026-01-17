// src/pages/Products.js
import React, { useEffect, useMemo, useState, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import * as THREE from "three"
import SEO from "../components/SEO"

// Use fully-auto orbit so model-viewer can pick the same "close" framing it settles on after layout changes.
const PREVIEW_CAMERA_ORBIT = "auto auto auto"

async function waitForModelViewerUpgraded(el, { maxFrames = 60 } = {}) {
  if (!el) return false
  // Ensure the custom element is defined
  if (window.customElements?.whenDefined) {
    try {
      await window.customElements.whenDefined("model-viewer")
    } catch (e) {
      // ignore
    }
  }

  // Wait until model-viewer methods exist (upgraded)
  for (let i = 0; i < maxFrames; i++) {
    if (typeof el.updateFraming === "function") return true
    await new Promise((r) => requestAnimationFrame(r))
  }
  return typeof el.updateFraming === "function"
}

async function waitForNonZeroSize(el, { maxFrames = 60 } = {}) {
  if (!el) return false
  for (let i = 0; i < maxFrames; i++) {
    const r = el.getBoundingClientRect?.()
    if (r && r.width > 0 && r.height > 0) return true
    await new Promise((res) => requestAnimationFrame(res))
  }
  const r = el.getBoundingClientRect?.()
  return !!(r && r.width > 0 && r.height > 0)
}

function applyPreviewBaseAttributes(el) {
  if (!el) return
  // Reference uses camera-controls + auto-rotate; we keep pointer events disabled for hover.
  el.setAttribute("camera-controls", "")
  // Keep rotation ON from the start so it never depends on init timing.
  el.setAttribute("auto-rotate", "")
  el.setAttribute("shadow-intensity", "1")
  el.setAttribute("interaction-prompt", "none")
  el.setAttribute("ar-modes", "webxr scene-viewer quick-look")

  // Dead-center in view
  el.setAttribute("bounds", "tight")
  el.setAttribute("camera-target", "auto")
  el.setAttribute("camera-orbit", PREVIEW_CAMERA_ORBIT)

  // Prevent any interaction in inline preview
  el.style.pointerEvents = "none"
  el.style.touchAction = "pan-y"
  el.style.opacity = "1"
  el.style.visibility = "visible"
}

function frameAndStartPreviewRotation(el) {
  if (!el) return
  // Ensure framing happens with the right target/orbit, then enable auto-rotate
  el.setAttribute("camera-target", "auto")
  el.setAttribute("camera-orbit", PREVIEW_CAMERA_ORBIT)
  if (typeof el.updateFraming === "function") el.updateFraming()
  el.setAttribute("auto-rotate", "")
}

function schedulePreviewRefit(el) {
  if (!el || !el.isConnected) return
  requestAnimationFrame(() => requestAnimationFrame(() => frameAndStartPreviewRotation(el)))
}

const Products = () => {
 const publicUrl = process.env.PUBLIC_URL || "";

  // Modal state for AR View
  const [isAROpen, setIsAROpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
// Store refs for inline model-viewer elements (non-interactive)
  const modelViewerRefs = useRef({})
  const previewResizeObservers = useRef({})
  // Store ref for modal model-viewer (interactive)
  const modalViewerRef = useRef(null)

  const openARModal = useCallback((product, productIdx) => {
    setSelectedProduct(product)
    setIsAROpen(true)
    // Lock body scroll
    document.body.style.overflow = "hidden"
    
    // Pre-initialize modal viewer with camera settings from inline viewer if available
    setTimeout(() => {
      const inlineViewer = modelViewerRefs.current[productIdx]
      if (inlineViewer && modalViewerRef.current) {
        try {
          // Copy camera settings from inline viewer to ensure consistency
          const cameraOrbit = inlineViewer.getAttribute("camera-orbit") || product?.cameraOrbit || "0deg 70deg 120%"
          const cameraTarget = inlineViewer.getAttribute("camera-target") || product?.cameraTarget || "0m 0m 0m"
          
          modalViewerRef.current.setAttribute("camera-orbit", cameraOrbit)
          modalViewerRef.current.setAttribute("camera-target", cameraTarget)
          modalViewerRef.current.cameraOrbit = cameraOrbit
          modalViewerRef.current.cameraTarget = cameraTarget
          
          // Ensure visibility
          modalViewerRef.current.style.opacity = "1"
          modalViewerRef.current.style.visibility = "visible"
          
          // Update framing to ensure model is visible
          if (typeof modalViewerRef.current.updateFraming === "function") {
            modalViewerRef.current.updateFraming()
          }
      } catch (e) {
        // Ignore errors
      }
    }
    }, 50)
  }, [])

  const closeARModal = useCallback(() => {
    setIsAROpen(false)
    setSelectedProduct(null)
    // Restore body scroll
    document.body.style.overflow = ""
    // Dispose modal viewer controls when closing
    if (modalViewerRef.current) {
      try {
        modalViewerRef.current.removeAttribute("camera-controls")
      } catch (e) {
        // Ignore errors
      }
    }
  }, [])

  // Handle ESC key to close modal
  useEffect(() => {
    if (!isAROpen) return
    
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        closeARModal()
      }
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [isAROpen, closeARModal])

  // Cleanup preview resize observers
  useEffect(() => {
    return () => {
      try {
        Object.values(previewResizeObservers.current || {}).forEach((obs) => obs?.disconnect?.())
      } catch (e) {
        // ignore
      }
    }
  }, [])

  // Ensure modal viewer is properly centered using bounding box math
  useEffect(() => {
    if (!isAROpen || !selectedProduct || !modalViewerRef.current) return

    const viewer = modalViewerRef.current

    // Center the canvas in shadowRoot - ensure it fills the modal area
    const centerCanvas = () => {
      if (viewer.shadowRoot) {
        const containerDiv = viewer.shadowRoot.querySelector("div.container")
        if (containerDiv) {
          containerDiv.style.width = "100%"
          containerDiv.style.height = "100%"
          containerDiv.style.margin = "0"
          containerDiv.style.padding = "0"
          containerDiv.style.position = "absolute"
          containerDiv.style.top = "0"
          containerDiv.style.left = "0"
          containerDiv.style.right = "0"
          containerDiv.style.bottom = "0"
        }

        const canvas = viewer.shadowRoot.querySelector("canvas")
        if (canvas) {
          canvas.style.width = "100%"
          canvas.style.height = "100%"
          canvas.style.display = "block"
          canvas.style.margin = "0"
          canvas.style.padding = "0"
        }

        // Also handle slot canvas if it exists
        const slotCanvas = viewer.shadowRoot.querySelector("slot canvas") || 
                          viewer.shadowRoot.querySelector("canvas")
        if (slotCanvas) {
          slotCanvas.style.width = "100%"
          slotCanvas.style.height = "100%"
          slotCanvas.style.display = "block"
          slotCanvas.style.margin = "0"
        }
      }
    }

    // ALWAYS set default camera settings first to ensure model is visible
    const setDefaultCamera = () => {
      try {
        const baseOrbit = selectedProduct?.cameraOrbit || "0deg 70deg 120%"
        const cameraTarget = "0m 0m 0m"
        
        viewer.setAttribute("camera-orbit", baseOrbit)
        viewer.setAttribute("camera-target", cameraTarget)
        viewer.cameraOrbit = baseOrbit
        viewer.cameraTarget = cameraTarget
        
        // Ensure visibility
        viewer.style.opacity = "1"
        viewer.style.visibility = "visible"
        
        // Call updateFraming() to ensure model is visible
        if (typeof viewer.updateFraming === "function") {
          viewer.updateFraming()
        }
      } catch (e) {
        // Ignore errors
      }
    }

    // Set default camera immediately
    setDefaultCamera()

    // Robust centering using TRUE center alignment (not grounding)
    const centerAndFrameModel = () => {
      if (!viewer || !viewer.isConnected) {
        // If centering fails, ensure default camera is set
        setDefaultCamera()
        return
      }

      try {
        // Wait for scene and model to be available
        if (!viewer.scene || !viewer.model) {
          // If scene/model not ready, use default camera
          setDefaultCamera()
          return
        }

        const scene = viewer.scene
        const model = viewer.model

        // Find the root model object (the GLTF scene or main group)
        let rootModelObject = null
        scene.traverse((child) => {
          // Find the top-level group that contains the model
          if (child.type === "Group" && child.parent === scene) {
            rootModelObject = child
          } else if (child.type === "Mesh" && !rootModelObject) {
            // If no group found, use the first mesh's parent or the mesh itself
            rootModelObject = child.parent === scene ? child : child.parent
          }
        })

        // If we can't find a specific object, use the scene's first child or scene itself
        if (!rootModelObject) {
          if (scene.children.length > 0) {
            rootModelObject = scene.children[0]
          } else {
            rootModelObject = scene
          }
        }

        // Compute bounding box from the FINAL rendered object
        const box = new THREE.Box3().setFromObject(rootModelObject)
        const center = new THREE.Vector3()
        const size = new THREE.Vector3()
        box.getCenter(center)  // TRUE center, not minY
        box.getSize(size)

        // IMPORTANT: Recenter to world origin using TRUE center (NOT minY grounding)
        // Move the model by subtracting the center to bring it to (0,0,0)
        // Compute the offset needed: current position - center = new position at origin
        if (rootModelObject.parent && rootModelObject.parent !== scene) {
          // If there's a parent wrapper, move the parent
          rootModelObject.parent.position.set(
            rootModelObject.parent.position.x - center.x,
            rootModelObject.parent.position.y - center.y,
            rootModelObject.parent.position.z - center.z
          )
        } else {
          // Move the model itself to center it at origin
          rootModelObject.position.set(
            rootModelObject.position.x - center.x,
            rootModelObject.position.y - center.y,
            rootModelObject.position.z - center.z
          )
        }

        // Compute camera fit distance using proper FOV math
        const maxDim = Math.max(size.x, size.y, size.z)
        const camera = viewer.getCamera ? viewer.getCamera() : null
        const fovDegrees = camera ? camera.fov : 30
        const fovRad = THREE.MathUtils.degToRad(fovDegrees)
        const aspect = camera ? camera.aspect : 1
        
        // Compute fit distances for both height and width
        const fitHeightDistance = (maxDim / 2) / Math.tan(fovRad / 2)
        const fitWidthDistance = fitHeightDistance / aspect
        const baseDistance = Math.max(fitHeightDistance, fitWidthDistance)
        const padding = 1.3 // Padding factor
        const distance = padding * baseDistance

        // Convert distance to model-viewer's camera-orbit percentage format
        const baseDistancePercent = maxDim * 1.2
        const orbitDistancePercent = Math.max(120, Math.min(300, (distance / baseDistancePercent) * 100))

        // Get base camera angles from product or use defaults
        const baseOrbit = selectedProduct?.cameraOrbit || "0deg 70deg 120%"
        const orbitMatch = baseOrbit.match(/(\d+deg)\s+(\d+deg)\s+(\d+)%/)
        const azimuth = orbitMatch ? orbitMatch[1] : "0deg"
        const polar = orbitMatch ? orbitMatch[2] : "70deg"

        // Set camera-orbit with computed distance
        const cameraOrbit = `${azimuth} ${polar} ${Math.round(orbitDistancePercent)}%`
        const cameraTarget = "0m 0m 0m"  // MUST be at origin after recentering

          viewer.setAttribute("camera-orbit", cameraOrbit)
          viewer.setAttribute("camera-target", cameraTarget)
          viewer.cameraOrbit = cameraOrbit
          viewer.cameraTarget = cameraTarget
          
                        // Call updateFraming() to ensure model is visible, then immediately re-center
                        // We'll re-center after a short delay to override any grounding
                        if (typeof viewer.updateFraming === "function") {
                          viewer.updateFraming()
                          // Re-center after updateFraming to prevent grounding
                          setTimeout(() => {
                            if (rootModelObject && viewer.scene) {
                              const box2 = new THREE.Box3().setFromObject(rootModelObject)
                              const center2 = new THREE.Vector3()
                              box2.getCenter(center2)
                              
                              if (rootModelObject.parent && rootModelObject.parent !== scene) {
                                rootModelObject.parent.position.set(
                                  rootModelObject.parent.position.x - center2.x,
                                  rootModelObject.parent.position.y - center2.y,
                                  rootModelObject.parent.position.z - center2.z
                                )
                              } else {
                                rootModelObject.position.set(
                                  rootModelObject.position.x - center2.x,
                                  rootModelObject.position.y - center2.y,
                                  rootModelObject.position.z - center2.z
                                )
                              }
                              
                              // Re-set camera target to ensure it stays centered
                              viewer.setAttribute("camera-target", "0m 0m 0m")
                              viewer.cameraTarget = "0m 0m 0m"
                            }
                          }, 50)
                        }

                        // Ensure canvas is properly sized
                        centerCanvas()
        } catch (e) {
        console.warn("Error centering model:", e)
        // Fallback to default settings - ALWAYS ensure model is visible
        setDefaultCamera()
      }
    }

    // Initialize canvas centering immediately
    centerCanvas()

    // Wait for model to load, then center and frame
    const handleModelLoad = () => {
      setTimeout(() => {
        // Always ensure default camera first
        setDefaultCamera()
        centerCanvas()
        // Then try to center and frame
        centerAndFrameModel()
      }, 100)
    }

    // Initialize immediately
    centerCanvas()
    setDefaultCamera()

    // Also try after delays to ensure it works - always set default first
    const timeout1 = setTimeout(() => {
      setDefaultCamera()
      handleModelLoad()
    }, 200)
    const timeout2 = setTimeout(() => {
      setDefaultCamera()
      handleModelLoad()
    }, 500)
    const timeout3 = setTimeout(() => {
      setDefaultCamera()
      handleModelLoad()
    }, 1000)

    // If model is already loaded, initialize now
    if (viewer.loaded) {
      setDefaultCamera()
      handleModelLoad()
    } else {
      // Wait for model to load
      viewer.addEventListener("load", () => {
        setDefaultCamera()
        handleModelLoad()
      }, { once: true })
    }

    // Handle resize to maintain centering
    const handleResize = () => {
      centerCanvas()
      centerAndFrameModel()
    }
    window.addEventListener("resize", handleResize)
    
    return () => {
      clearTimeout(timeout1)
      clearTimeout(timeout2)
      clearTimeout(timeout3)
      window.removeEventListener("resize", handleResize)
    }
  }, [isAROpen, selectedProduct])

  // Preview init is handled per-preview (in the ref callback) so it runs exactly when each model is ready.
  useEffect(() => {
    if (!document.querySelector('script[data-model-viewer="true"]')) {
      const s = document.createElement("script")
      s.type = "module"
      s.async = true
      s.src = "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
      s.setAttribute("data-model-viewer", "true")
      document.body.appendChild(s)
    }
  }, [])

  useEffect(() => {
    const centerModels = () => {
      const modelViewers = document.querySelectorAll("model-viewer")
      modelViewers.forEach((viewer) => {
        const handleLoad = () => {
          try {
            viewer.cameraTarget = "0m 0m 0m"
            try {
              viewer.scale = "0.7 0.7 0.7"
            } catch (e) {
              if (viewer.model) {
                const model = viewer.model
                if (model.scale) {
                  model.scale.set(0.7, 0.7, 0.7)
                }
              }
            }
            if (typeof viewer.updateFraming === "function") {
              viewer.updateFraming()
            }
          } catch (error) {}
        }

        if (viewer.loaded) {
          setTimeout(handleLoad, 100)
        } else {
          viewer.addEventListener("load", handleLoad, { once: true })
        }
      })
    }

    const checkInterval = setInterval(() => {
      if (window.customElements?.get("model-viewer")) {
        clearInterval(checkInterval)
        setTimeout(centerModels, 300)
        setTimeout(centerModels, 1000)
      }
    }, 100)

    return () => clearInterval(checkInterval)
  }, [])

  useEffect(() => {
    const updateCanvasSizes = () => {
      requestAnimationFrame(() => {
        const modelViewers = document.querySelectorAll("model-viewer")
        modelViewers.forEach((viewer) => {
          const container = viewer.parentElement
          if (!container) return

          const article = container.closest("article")

          const containerRect = container.getBoundingClientRect()
          let containerWidth = containerRect.width || container.clientWidth || container.offsetWidth
          let containerHeight = containerRect.height || container.clientHeight || container.offsetHeight

          if (article) {
            const articleRect = article.getBoundingClientRect()
            const articleWidth = articleRect.width || article.clientWidth || article.offsetWidth
            containerWidth = articleWidth
            container.style.width = "100%"
            container.style.maxWidth = "none"
          }

          const containerComputedHeight = containerRect.height || container.clientHeight || container.offsetHeight
          if (containerComputedHeight > containerHeight) {
            containerHeight = containerComputedHeight
          }

          if (containerWidth > 0 && containerHeight > 0) {
            container.style.width = `${containerWidth}px`
            container.style.height = `${containerHeight}px`
            container.style.maxWidth = "none"
            container.style.maxHeight = "none"

            const viewerRect = viewer.getBoundingClientRect()
            let viewerWidth = viewerRect.width || viewer.clientWidth || viewer.offsetWidth
            let viewerHeight = viewerRect.height || viewer.clientHeight || viewer.offsetHeight

            viewer.style.width = `${containerWidth}px`
            viewer.style.height = `${containerHeight}px`
            viewer.style.maxWidth = "none"
            viewer.style.maxHeight = "none"

            viewerWidth = containerWidth
            viewerHeight = containerHeight

            const roundedWidth = Math.round(viewerWidth)
            const roundedHeight = Math.round(viewerHeight)

            if (viewer.shadowRoot) {
              const containerDiv = viewer.shadowRoot.querySelector("div.container")
              if (containerDiv) {
                containerDiv.style.width = `${roundedWidth}px`
                containerDiv.style.height = `${roundedHeight}px`
                containerDiv.style.maxWidth = "none"
                containerDiv.style.maxHeight = "none"
                containerDiv.style.margin = "0"
                containerDiv.style.padding = "0"
                containerDiv.style.position = "absolute"
                containerDiv.style.top = "0"
                containerDiv.style.left = "0"
                containerDiv.style.right = "0"
                containerDiv.style.bottom = "0"
                containerDiv.style.boxSizing = "border-box"

                const userInputDiv = containerDiv.querySelector("div.userInput.show") || containerDiv.querySelector("div.userInput")
                if (userInputDiv) {
                  userInputDiv.style.width = `${roundedWidth}px`
                  userInputDiv.style.height = `${roundedHeight}px`
                  userInputDiv.style.maxWidth = "none"
                  userInputDiv.style.maxHeight = "none"
                  userInputDiv.style.margin = "0"
                  userInputDiv.style.padding = "0"
                  userInputDiv.style.position = "absolute"
                  userInputDiv.style.top = "0"
                  userInputDiv.style.left = "0"
                  userInputDiv.style.right = "0"
                  userInputDiv.style.bottom = "0"
                  userInputDiv.style.boxSizing = "border-box"
                  userInputDiv.style.overflow = "visible"
                  userInputDiv.style.transform = "none"
                  userInputDiv.style.transformOrigin = "top left"
                }
              }
            }

            const canvas = viewer.shadowRoot?.querySelector("canvas") || viewer.querySelector("canvas")
            if (canvas) {
              canvas.style.width = `${roundedWidth}px`
              canvas.style.height = `${roundedHeight}px`
              canvas.style.maxWidth = "none"
              canvas.style.maxHeight = "none"
              canvas.style.position = "absolute"
              canvas.style.top = "0"
              canvas.style.left = "0"
              canvas.style.right = "auto"
              canvas.style.bottom = "auto"
              canvas.style.margin = "0"
              canvas.style.padding = "0"
              canvas.style.transform = "none"
              canvas.style.border = "none"
              canvas.style.outline = "none"

              canvas.setAttribute("width", roundedWidth.toString())
              canvas.setAttribute("height", roundedHeight.toString())

              if (canvas.width !== roundedWidth) {
                canvas.width = roundedWidth
              }
              if (canvas.height !== roundedHeight) {
                canvas.height = roundedHeight
              }
            }
          }
        })
      })
    }

    const timeouts = [
      setTimeout(updateCanvasSizes, 100),
      setTimeout(updateCanvasSizes, 500),
      setTimeout(updateCanvasSizes, 1000),
    ]

    let resizeTimeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(updateCanvasSizes, 100)
    }
    window.addEventListener("resize", handleResize)

    const resizeObservers = []
    const modelViewers = document.querySelectorAll("model-viewer")
    modelViewers.forEach((viewer) => {
      const container = viewer.parentElement
      if (container) {
        const containerObserver = new ResizeObserver(() => {
          updateCanvasSizes()
        })
        containerObserver.observe(container)
        resizeObservers.push(containerObserver)
      }

      const viewerObserver = new ResizeObserver(() => {
        updateCanvasSizes()
      })
      viewerObserver.observe(viewer)
      resizeObservers.push(viewerObserver)
    })

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            const viewers = node.nodeName === "MODEL-VIEWER" ? [node] : node.querySelectorAll?.("model-viewer") || []
            viewers.forEach((viewer) => {
              const container = viewer.parentElement
              if (container) {
                const containerObserver = new ResizeObserver(() => {
                  updateCanvasSizes()
                })
                containerObserver.observe(container)
                resizeObservers.push(containerObserver)
              }

              const viewerObserver = new ResizeObserver(() => {
                updateCanvasSizes()
              })
              viewerObserver.observe(viewer)
              resizeObservers.push(viewerObserver)
            })
          }
        })
      })
      setTimeout(updateCanvasSizes, 50)
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      timeouts.forEach(clearTimeout)
      clearTimeout(resizeTimeout)
      window.removeEventListener("resize", handleResize)
      resizeObservers.forEach((ro) => ro.disconnect())
      observer.disconnect()
    }
  }, [])

const products = useMemo(
  () => [
    {
      type: "3d",
      title: "Double Coupler 3D Component",
      desc: "High-strength double coupler for connecting scaffold tubes at 90° with precise alignment.",
      model: `${publicUrl}/assets/products/double_coupler.glb`,
      badge: "3D VIEW",
      cameraOrbit: "0deg 70deg 120%",
      fieldOfView: "30deg",
      cameraTarget: "0m 0m 0m",
      specs: [
        "3D interactive model",
        "Ideal for tube and fitting systems",
        "Optimized for heavy-duty connections",
      ],
      tags: ["Rotate", "Zoom", "Inspect"],
    },
    {
      type: "3d",
      title: "H Frame 3D Component",
      desc: "3D visualization of H frame scaffolding for façade and elevation works.",
      model: `${publicUrl}/assets/products/h_frame.glb`,
      badge: "3D VIEW",
      cameraOrbit: "0deg 70deg 120%",
      fieldOfView: "30deg",
      cameraTarget: "0m 0m 0m",
      specs: [
        "Quick-assembly frame geometry",
        "Stable vertical support",
        "Compatible with standard accessories",
      ],
      tags: ["Rotate", "Zoom", "Inspect"],
    },
    {
      type: "3d",
      title: "Joint Coupler 3D Component",
      desc: "3D model of the joint coupler used to connect scaffold tubes end-to-end.",
      model: `${publicUrl}/assets/products/joint_coupler.glb`,
      badge: "3D VIEW",
      cameraOrbit: "0deg 70deg 120%",
      fieldOfView: "30deg",
      cameraTarget: "0m 0m 0m",
      specs: [
        "End-to-end tube connection",
        "Rigid alignment in elevation",
        "Ideal for extending ledgers and standards",
      ],
      tags: ["Rotate", "Zoom", "Inspect"],
    },
    {
      type: "3d",
      title: "Half Coupler 3D Component",
      desc: "3D visualization of half coupler used for connecting scaffold tubes to accessories.",
      model: `${publicUrl}/assets/products/half_coupler.glb`,
      badge: "3D VIEW",
      cameraOrbit: "0deg 70deg 120%",
      fieldOfView: "30deg",
      cameraTarget: "0m 0m 0m",
      specs: [
        "Single jaw connection",
        "For beams, brackets and specials",
        "High tightening capacity",
      ],
      tags: ["Rotate", "Zoom", "Inspect"],
    },
    {
      type: "3d",
      title: "Swivel Coupler 3D Component",
      desc: "3D model of swivel coupler for connecting tubes at variable angles.",
      model: `${publicUrl}/assets/products/swivel_coupler.glb`,
      badge: "3D VIEW",
      cameraOrbit: "0deg 70deg 120%",
      fieldOfView: "30deg",
      cameraTarget: "0m 0m 0m",
      specs: [
        "Flexible angle connections",
        "Perfect for bracing and ties",
        "High-strength forged body",
      ],
      tags: ["Rotate", "Zoom", "Inspect"],
    },
    {
      type: "3d",
      title: "Stirrup Head 3D Component",
      desc: "3D model of a stirrup head used for shoring support and formwork applications where stable load transfer and safe positioning are required.",
      model: `${publicUrl}/assets/products/stirrup_head.glb`,
      badge: "3D VIEW",
      cameraOrbit: "0deg 70deg 120%",
      fieldOfView: "30deg",
      cameraTarget: "0m 0m 0m",
      specs: [
        "Shoring head accessory for props",
        "Supports beams and formwork elements",
        "Designed for stable positioning on site",
      ],
      tags: ["Rotate", "Zoom", "Inspect"],
    },
    {
      type: "img",
      title: "Standard Frame Scaffolding",
      desc: "Modular steel frames for construction and maintenance work.",
      img: `${publicUrl}/assets/products/Standard_Frame_Scaffolding.jpg`,
      specs: ["Height per bay: up to 6 m", "Load class: up to 3", "Finish: painted / galvanized"],
    },
    {
      type: "img",
      title: "Ringlock System Scaffolding",
      desc: "Heavy-duty system scaffolding for high-rise structures.",
      img: `${publicUrl}/assets/products/Ringlock_System_Scaffolding.png`,
      specs: ["High load capacity", "Flexible geometry", "Ideal for multi-storey projects"],
    },
    {
      type: "img",
      title: "Suspended Scaffolding Platforms",
      desc: "Motorized and manual swing stages for façade works.",
      img: `${publicUrl}/assets/products/Suspended_Scaffolding_Platforms.jpg`,
      specs: ["Adjustable height", "Excellent for façades", "Safety guardrails included"],
    },
    {
      type: "img",
      title: "Adjustable Base Jacks",
      desc: "Precise leveling for uneven or sloped surfaces.",
      img: `${publicUrl}/assets/products/Adjustable_Base_Jacks.jpg`,
      specs: ["Diameter: 38–48 mm", "Adjustment: up to 600 mm", "Galvanized steel"],
    },
    {
      type: "img",
      title: "Steel Scaffold Planks",
      desc: "Anti-slip planks for working surfaces.",
      img: `${publicUrl}/assets/products/Steel_Scaffold_Planks.jpg`,
      specs: ["Lengths: 1.0 – 3.0 m", "Anti-slip surface", "Secure locking hooks"],
    },
    {
      type: "img",
      title: "Full Scaffolding Safety Kit",
      desc: "Complete safety protection equipment.",
      img: `${publicUrl}/assets/products/Full_Scaffolding_Safety_Kit.png`,
      specs: ["Harness and double lanyard", "Helmet and vest", "Gloves and safety shoes"],
    },
  ],
  [publicUrl]
)


  return (
    <main className="bg-[#f5f7fb] text-[#1b3155]">
       <SEO
        title="Scaffolding Systems & Equipment | ACHI Scaffolding"
        description="ACHI Scaffolding supplies professional scaffolding and access equipment for construction, restoration, and industrial use. Our product range is selected for load capacity, modularity, and compliance, ensuring safety and efficiency on site."
        canonical="https://achi-scaffolding.github.io/products"
       />

      <style>{`
        model-viewer {
          width: 100% !important;
          height: 100% !important;
          display: block !important;
          background: transparent !important;
          margin: 0 !important;
          padding: 0 !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          border: none !important;
          outline: none !important;
          opacity: 1 !important;
          transition: opacity 0.2s ease-in-out !important;
          will-change: auto !important;
          overflow: hidden !important;
        }
        model-viewer canvas {
          display: block !important;
          margin: 0 !important;
          padding: 0 !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          border: none !important;
          outline: none !important;
          box-sizing: border-box !important;
          opacity: 1 !important;
          transition: opacity 0.2s ease-in-out !important;
        }
        model-viewer::part(default-progress-bar) { display: none !important; }
        model-viewer::part(default-ar-button) { transform: scale(0.9); }

        model-viewer::part(controls) { display: none !important; }
        model-viewer::part(overlay) { display: none !important; }
        model-viewer::part(interaction-prompt) { display: none !important; }
        
        /* Modal-specific styling for centered 3D model */
        [data-modal-viewer] {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        [data-modal-viewer]::part(default-container) {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }

        /* Reference-matching inline 3D preview container (products.html HTML version) */
        .product-image-3d {
          background: radial-gradient(circle at top, #e5efff, #f5f7fb 70%);
          width: 100%;
          height: 100%;
          min-height: 260px;
          padding: 0;
          overflow: hidden;
          position: relative;
        }
        .product-3d-viewer {
          width: 100%;
          height: 100%;
          display: block;
          background: transparent;
        }
      `}</style>

      <section className="py-[60px]">
  <div className="w-[90%] max-w-[1200px] mx-auto text-center">
    <h1 className="text-[#214f9b] font-[900] uppercase text-h1">
      Scaffolding Systems & Equipment
    </h1>

    <p className="mt-[10px] text-[#4a5c7a] text-[14px] md:text-[15px] leading-[1.7] max-w-[820px] mx-auto">
      ACHI Scaffolding supplies professional scaffolding and access equipment for construction, restoration, and industrial use.
      Our product range is selected for load capacity, modularity, and compliance, ensuring safety and efficiency on site.
    </p>

    <h2 className="sr-only">Systems & Equipment Categories</h2>
    

  </div>
      </section>


      <section className="pb-[60px]">
       <div className="w-[90%] max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[18px]">
          {products.map((p, idx) => {
            const is3DProduct = p.type === "3d"

      return (
        <article
          key={`${p.title}-${idx}`}
          className="group rounded-[16px] overflow-hidden flex flex-col bg-white shadow-[0_10px_30px_rgba(17,35,64,0.08)]"
          itemScope
          itemType="https://schema.org/Product"
        >
          <div className="relative bg-white" style={{ width: "100%", minHeight: "380px", overflow: "hidden" }}>
            {is3DProduct ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="product-image-3d w-full">
                <model-viewer
                  ref={(el) => {
                      if (!el) return
                      modelViewerRefs.current[idx] = el

                      // Match reference behavior: model-viewer with auto-rotate + camera-controls,
                      // but keep hover working by disabling pointer events for inline previews.
                      applyPreviewBaseAttributes(el)

                      // IMPORTANT: run the exact "perfect state" framing AFTER:
                      // - model-viewer upgrades
                      // - model loads
                      // - element has real size
                      const initOnce = async () => {
                        const upgraded = await waitForModelViewerUpgraded(el, { maxFrames: 120 })
                        if (!upgraded || !el.isConnected) return

                        const sized = await waitForNonZeroSize(el, { maxFrames: 120 })
                        if (!sized || !el.isConnected) return

                        // 2 rAFs to ensure layout + internal canvas are settled
                        requestAnimationFrame(() => {
                          requestAnimationFrame(() => {
                            if (!el.isConnected) return
                            frameAndStartPreviewRotation(el)
                          })
                        })
                      }

                      // Keep it matching the "after modal close" state:
                      // refit when the preview container size changes (initial layout settle, responsive, etc.)
                      const previewContainer = el.parentElement // .product-image-3d
                      if (previewContainer && !previewResizeObservers.current[idx]) {
                        const ro = new ResizeObserver(() => schedulePreviewRefit(el))
                        ro.observe(previewContainer)
                        previewResizeObservers.current[idx] = ro
                      }

                      // If already loaded, init now; otherwise init on load
                      if (el.loaded) initOnce()
                      else el.addEventListener("load", initOnce, { once: true })

                      // Safety: also try shortly after mount (covers rare missed load events)
                      setTimeout(() => {
                        if (el.isConnected) initOnce()
                      }, 400)

                      // Also refit on full window load (fonts/images/layout settle)
                      window.addEventListener("load", () => schedulePreviewRefit(el), { once: true })
                    }}
                    key={`${p.model}-${idx}`}
                    src={p.model}
                    alt={p.title}
                    class="product-3d-viewer"
                    camera-controls
                    auto-rotate
                    shadow-intensity="1"
                    interaction-prompt="none"
                    loading="eager"
                    bounds="tight"
                    camera-target="auto"
                    camera-orbit="0deg 75deg auto"
                    ar-modes="webxr scene-viewer quick-look"
                    style={{ pointerEvents: "none" }}
                  />
                </div>
              </div>
            ) : (
              <img
                src={p.img}
                alt={p.title}
                className="absolute inset-0 w-full h-full object-contain block"
                loading="lazy"
                itemProp="image"
              />
            )}

            {is3DProduct && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  openARModal(p, idx)
                }}
                className="absolute top-[12px] left-[12px] bg-[#214f9b] text-white text-[12px] font-[900] px-[10px] py-[6px] rounded-full z-20 hover:bg-[#1a3d7a] transition-colors duration-200 cursor-pointer"
                aria-label="Open AR View"
                type="button"
              >
                AR VIEW
              </button>
            )}

            {!is3DProduct && (
              <span className="absolute top-[12px] left-[12px] bg-[#214f9b] text-white text-[12px] font-[900] px-[10px] py-[6px] rounded-full z-10 opacity-100 group-hover:opacity-0 transition-opacity duration-300 ease-out">
                EQUIPMENT
              </span>
            )}

            {/* Hover info overlay - always shown when not hovering AR button */}
              <div className="absolute inset-0 pointer-events-none">
                <div
                  className="absolute inset-x-0 bottom-0 p-[16px] md:p-[18px]
                             bg-gradient-to-t from-black/80 via-black/35 to-transparent
                             opacity-0 translate-y-[10px]
                             group-hover:opacity-100 group-hover:translate-y-0
                             transition-all duration-300 ease-out"
                >
                  <div className="pointer-events-auto max-w-[92%]">
                    <p className="text-white text-[14px] leading-[1.7] mb-[12px]" itemProp="description">
                      {p.desc}
                    </p>

                    <ul className="space-y-[6px] text-[13px] text-white">
                      {(p.specs || []).map((s) => (
                        <li key={`${p.title}-${s}`} className="flex gap-[8px]">
                          <span aria-hidden="true" className="mt-[6px] w-[6px] h-[6px] rounded-full bg-white" />
                          <span className="leading-[1.6]">{s}</span>
                        </li>
                      ))}
                    </ul>

                    {p.type === "img" && (
                      <button
                        type="button"
                        className="mt-[12px] inline-flex w-full justify-center rounded-[12px] px-[14px] py-[10px]
                                   border-2 border-white text-white font-[900] uppercase text-[13px]
                                   hover:bg-white hover:text-[#214f9b] transition-all"
                        aria-label={`Request specifications for ${p.title}`}
                        onClick={() => window.open("https://wa.me/96103322811", "_blank", "noopener,noreferrer")}
                      >
                        Request Specs
                      </button>
                    )}
                  </div>
                </div>
              </div>
          </div>

          <h3
            className="font-[900] text-h5 text-center px-[10px] min-h-[56px] flex items-center justify-center"
            itemProp="name"
          >
            {p.title}
          </h3>
        </article>
      )
    })}
  </div>
</div>

      </section>

      <section className="py-[55px] bg-[#eef3fb]">
        <div className="w-[90%] max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-[18px]">
          <div className="text-center md:text-left">
            <h2 className="text-[#214f9b] font-[900] uppercase text-h3 md:text-h2">Need a Quote for Your Next Project?</h2>
            <p className="mt-[8px] text-[#4a5c7a] text-small leading-[1.7]">
              Share your project details and we'll recommend the best system for your needs.
            </p>
          </div>

          <a
            href="https://wa.me/96103322811"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center px-[18px] py-[12px] rounded-[12px] bg-[#28509E] text-white font-[900] uppercase text-[13px] border-2 border-white hover:bg-[#25D366] hover:border-[#25D366] transition"
          >
            Send us your enquiry over WhatsApp
          </a>
        </div>
      </section>

      {/* AR View Modal */}
      <AnimatePresence>
        {isAROpen && selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[999999] bg-black/70 flex items-center justify-center px-[16px] py-[16px]"
            onClick={closeARModal}
            role="dialog"
            aria-modal="true"
            aria-label={`3D View: ${selectedProduct.title}`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-[90vw] h-[90vh] max-h-[800px] bg-white rounded-[18px] overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.35)] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={closeARModal}
                className="absolute top-[14px] right-[14px] z-[1000000] w-[42px] h-[42px] rounded-full bg-white shadow-[0_10px_25px_rgba(0,0,0,0.18)] text-[#0f172a] text-[26px] leading-[26px] flex items-center justify-center hover:bg-[#f1f5f9] transition-colors duration-200"
                aria-label="Close 3D View"
              >
                ×
              </button>

              {/* Interactive 3D Model Viewer */}
              <model-viewer
                data-modal-viewer="true"
                ref={(el) => {
                  if (el) {
                    modalViewerRef.current = el

                    // Center the model-viewer element itself
                    el.style.width = "100%"
                    el.style.height = "100%"
                    el.style.display = "block"
                    el.style.margin = "0"
                    el.style.padding = "0"
                    el.style.position = "absolute"
                    el.style.top = "0"
                    el.style.left = "0"
                    el.style.right = "0"
                    el.style.bottom = "0"

                    // Enable full interaction
                    el.setAttribute("camera-controls", "")
                    el.removeAttribute("auto-rotate")
                    el.removeAttribute("auto-rotate-delay")
                    el.removeAttribute("rotation-per-second")
                    el.style.pointerEvents = "auto"
                    el.style.touchAction = "none"
                    el.style.opacity = "1"
                    el.style.visibility = "visible"

                    // ALWAYS set default camera settings first to ensure model is visible
                    const setDefaultCamera = () => {
                      try {
                        const baseOrbit = selectedProduct?.cameraOrbit || "0deg 70deg 120%"
                        const cameraTarget = "0m 0m 0m"
                        
                        el.setAttribute("camera-orbit", baseOrbit)
                        el.setAttribute("camera-target", cameraTarget)
                        el.cameraOrbit = baseOrbit
                        el.cameraTarget = cameraTarget
                        
                        // Ensure visibility
                        el.style.opacity = "1"
                        el.style.visibility = "visible"
                        
                        // Call updateFraming() to ensure model is visible, then we'll re-center it
                        if (typeof el.updateFraming === "function") {
                          el.updateFraming()
                        }
                      } catch (e) {
                        // Ignore errors
                      }
                    }

                    // Set default camera immediately
                    setDefaultCamera()

                    // Robust centering function using TRUE center alignment (not grounding)
                    const centerAndFrameModel = () => {
                      if (!el || !el.isConnected) {
                        // If centering fails, ensure default camera is set
                        setDefaultCamera()
                        return
                      }

                      try {
                        // Wait for scene and model to be available
                        if (!el.scene || !el.model) {
                          // If scene/model not ready, use default camera
                          setDefaultCamera()
                          return
                        }

                        const scene = el.scene
                        const model = el.model

                        // Find the root model object (the GLTF scene or main group)
                        let rootModelObject = null
                        scene.traverse((child) => {
                          // Find the top-level group that contains the model
                          if (child.type === "Group" && child.parent === scene) {
                            rootModelObject = child
                          } else if (child.type === "Mesh" && !rootModelObject) {
                            // If no group found, use the first mesh's parent or the mesh itself
                            rootModelObject = child.parent === scene ? child : child.parent
                          }
                        })

                        // If we can't find a specific object, use the scene's first child or scene itself
                        if (!rootModelObject) {
                          if (scene.children.length > 0) {
                            rootModelObject = scene.children[0]
                          } else {
                            rootModelObject = scene
                          }
                        }

                        // Compute bounding box from the FINAL rendered object
                        const box = new THREE.Box3().setFromObject(rootModelObject)
                        const center = new THREE.Vector3()
                        const size = new THREE.Vector3()
                        box.getCenter(center)  // TRUE center, not minY
                        box.getSize(size)

                        // IMPORTANT: Recenter to world origin using TRUE center (NOT minY grounding)
                        // Move the model by subtracting the center to bring it to (0,0,0)
                        // Compute the offset needed: current position - center = new position at origin
                        const currentPos = rootModelObject.position.clone()
                        const offset = currentPos.sub(center)
                        
                        if (rootModelObject.parent && rootModelObject.parent !== scene) {
                          // If there's a parent wrapper, move the parent
                          rootModelObject.parent.position.set(
                            rootModelObject.parent.position.x - center.x,
                            rootModelObject.parent.position.y - center.y,
                            rootModelObject.parent.position.z - center.z
                          )
                        } else {
                          // Move the model itself to center it at origin
                          rootModelObject.position.set(
                            rootModelObject.position.x - center.x,
                            rootModelObject.position.y - center.y,
                            rootModelObject.position.z - center.z
                          )
                        }

                        // Compute camera fit distance using proper FOV math
                        const maxDim = Math.max(size.x, size.y, size.z)
                        const camera = el.getCamera ? el.getCamera() : null
                        const fovDegrees = camera ? camera.fov : 30
                        const fovRad = THREE.MathUtils.degToRad(fovDegrees)
                        const aspect = camera ? camera.aspect : 1
                        
                        // Compute fit distances for both height and width
                        const fitHeightDistance = (maxDim / 2) / Math.tan(fovRad / 2)
                        const fitWidthDistance = fitHeightDistance / aspect
                        const baseDistance = Math.max(fitHeightDistance, fitWidthDistance)
                        const padding = 1.3 // Padding factor
                        const distance = padding * baseDistance

                        // Convert distance to model-viewer's camera-orbit percentage format
                        // model-viewer uses percentage relative to model size
                        const baseDistancePercent = maxDim * 1.2
                        const orbitDistancePercent = Math.max(120, Math.min(300, (distance / baseDistancePercent) * 100))

                        // Get base camera angles from product or use defaults
                        const baseOrbit = selectedProduct?.cameraOrbit || "0deg 70deg 120%"
                        const orbitMatch = baseOrbit.match(/(\d+deg)\s+(\d+deg)\s+(\d+)%/)
                        const azimuth = orbitMatch ? orbitMatch[1] : "0deg"
                        const polar = orbitMatch ? orbitMatch[2] : "70deg"

                        // Set camera-orbit with computed distance
                        const cameraOrbit = `${azimuth} ${polar} ${Math.round(orbitDistancePercent)}%`
                        const cameraTarget = "0m 0m 0m"  // MUST be at origin after recentering

                        el.setAttribute("camera-orbit", cameraOrbit)
                        el.setAttribute("camera-target", cameraTarget)
                        el.cameraOrbit = cameraOrbit
                        el.cameraTarget = cameraTarget

                        // Call updateFraming() to ensure model is visible, then immediately re-center
                        // We'll re-center after a short delay to override any grounding
                        if (typeof el.updateFraming === "function") {
                          el.updateFraming()
                          // Re-center after updateFraming to prevent grounding
                          setTimeout(() => {
                            if (rootModelObject && el.scene) {
                              const box2 = new THREE.Box3().setFromObject(rootModelObject)
                              const center2 = new THREE.Vector3()
                              box2.getCenter(center2)
                              
                              if (rootModelObject.parent && rootModelObject.parent !== scene) {
                                rootModelObject.parent.position.set(
                                  rootModelObject.parent.position.x - center2.x,
                                  rootModelObject.parent.position.y - center2.y,
                                  rootModelObject.parent.position.z - center2.z
                                )
                              } else {
                                rootModelObject.position.set(
                                  rootModelObject.position.x - center2.x,
                                  rootModelObject.position.y - center2.y,
                                  rootModelObject.position.z - center2.z
                                )
                              }
                              
                              // Re-set camera target to ensure it stays centered
                              el.setAttribute("camera-target", "0m 0m 0m")
                              el.cameraTarget = "0m 0m 0m"
                            }
                          }, 50)
                        }

                        // Ensure canvas is properly sized
                        centerCanvas()
                      } catch (e) {
                        console.warn("Error centering model:", e)
                        // Fallback to default settings - ALWAYS ensure model is visible
                        setDefaultCamera()
                      }
                    }

                    // Center the canvas in shadowRoot
                    const centerCanvas = () => {
                      if (el.shadowRoot) {
                        const containerDiv = el.shadowRoot.querySelector("div.container")
                        if (containerDiv) {
                          containerDiv.style.width = "100%"
                          containerDiv.style.height = "100%"
                          containerDiv.style.margin = "0"
                          containerDiv.style.padding = "0"
                          containerDiv.style.position = "absolute"
                          containerDiv.style.top = "0"
                          containerDiv.style.left = "0"
                          containerDiv.style.right = "0"
                          containerDiv.style.bottom = "0"
                        }

                        const canvas = el.shadowRoot.querySelector("canvas")
                        if (canvas) {
                          canvas.style.width = "100%"
                          canvas.style.height = "100%"
                          canvas.style.display = "block"
                          canvas.style.margin = "0"
                          canvas.style.padding = "0"
                        }

                        // Also handle slot canvas if it exists
                        const slotCanvas = el.shadowRoot.querySelector("slot canvas") || 
                                         el.shadowRoot.querySelector("canvas")
                        if (slotCanvas) {
                          slotCanvas.style.width = "100%"
                          slotCanvas.style.height = "100%"
                          slotCanvas.style.display = "block"
                          slotCanvas.style.margin = "0"
                        }
                      }
                    }

                    // Initialize canvas centering immediately
                    centerCanvas()

                    // Wait for model to load, then center and frame
                    const handleModelLoad = () => {
                      setTimeout(() => {
                        // Always ensure default camera first
                        setDefaultCamera()
                        centerCanvas()
                        // Then try to center and frame
                        centerAndFrameModel()
                      }, 100)
                    }

                    // Set default camera immediately and on load
                    if (el.loaded) {
                      setDefaultCamera()
                      handleModelLoad()
                    } else {
                      el.addEventListener("load", () => {
                        setDefaultCamera()
                        handleModelLoad()
                      }, { once: true })
                    }

                    // Also try after delays to ensure it works - always set default first
                    setTimeout(() => {
                      setDefaultCamera()
                      handleModelLoad()
                    }, 200)
                    setTimeout(() => {
                      setDefaultCamera()
                      handleModelLoad()
                    }, 500)
                    setTimeout(() => {
                      setDefaultCamera()
                      handleModelLoad()
                    }, 1000)
                  }
                }}
                src={selectedProduct.model}
                alt={selectedProduct.title}
                interaction-prompt="none"
                shadow-intensity="1"
                loading="eager"
                camera-controls
                camera-orbit={selectedProduct.cameraOrbit || "0deg 70deg 120%"}
                camera-target="0m 0m 0m"
                field-of-view={selectedProduct.fieldOfView || "30deg"}
                min-field-of-view="20deg"
                max-field-of-view="60deg"
                bounds="tight"
                ar-modes="webxr scene-viewer quick-look"
                style={{
                  width: "100%",
                  height: "100%",
                  display: "block",
                  margin: 0,
                  padding: 0,
                  pointerEvents: "auto",
                  opacity: 1,
                  visibility: "visible",
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

export default Products
