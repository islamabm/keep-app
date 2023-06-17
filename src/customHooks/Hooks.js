import { useEffect, useRef } from 'react'

export function useOnDraw(onDraw, isErasing, currentLineWidth) {
  const canvasRef = useRef(null)
  const isDrawingRef = useRef(false)
  const prevPointRef = useRef(null)

  const mouseMoveListenerRef = useRef(null)
  const mouseUpListenerRef = useRef(null)

  function setCanvasRef(ref) {
    canvasRef.current = ref
  }

  function onCanvasMouseDown() {
    isDrawingRef.current = true
  }
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = canvasRef.current.offsetWidth
      canvasRef.current.height = canvasRef.current.offsetHeight
    }
  }, [])

  useEffect(() => {
    function computePointInCanvas(clientX, clientY) {
      if (canvasRef.current) {
        const boundingRect = canvasRef.current.getBoundingClientRect()
        return {
          x: clientX - boundingRect.left,
          y: clientY - boundingRect.top,
        }
      } else {
        return null
      }
    }
    function initMouseMoveListener() {
      const mouseMoveListener = (e) => {
        if (isDrawingRef.current && canvasRef.current) {
          const point = computePointInCanvas(e.clientX, e.clientY)
          const ctx = canvasRef.current.getContext('2d')

          if (isErasing) {
            ctx.globalCompositeOperation = 'destination-out'
            ctx.lineWidth = 10
          } else {
            ctx.globalCompositeOperation = 'source-over'
            ctx.lineWidth = currentLineWidth // Use the currently selected line width
          }

          if (onDraw) onDraw(ctx, point, prevPointRef.current)
          prevPointRef.current = point
        }
      }
      mouseMoveListenerRef.current = mouseMoveListener
      window.addEventListener('mousemove', mouseMoveListener)
    }

    function initMouseUpListener() {
      const listener = () => {
        isDrawingRef.current = false
        prevPointRef.current = null
      }
      mouseUpListenerRef.current = listener
      window.addEventListener('mouseup', listener)
    }

    function cleanup() {
      if (mouseMoveListenerRef.current) {
        window.removeEventListener('mousemove', mouseMoveListenerRef.current)
      }
      if (mouseUpListenerRef.current) {
        window.removeEventListener('mouseup', mouseUpListenerRef.current)
      }
    }

    initMouseMoveListener()
    initMouseUpListener()
    return () => cleanup()
  }, [onDraw, isErasing, currentLineWidth])

  return {
    setCanvasRef,
    onCanvasMouseDown,
    canvasRef,
  }
}
