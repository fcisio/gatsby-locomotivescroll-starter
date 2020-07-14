import React, { useState, useRef, useEffect } from "react"
import { gsap } from "gsap/all"
import { isBrowser } from "react-device-detect"

//! This method is essential to keep the scroll height up to date.
const updateScroll = () => isBrowser && window.scroll.update()

const collapsible = node => {
  const tl = gsap.timeline({
    defaults: {
      duration: 0.35,
      ease: " power1.inOut",
    },
  })

  const animation = height =>
    tl
      .to(node, { height: height, willChange: "height" })
      .to(node, { clearProps: "willChange" }, "-=0.45")
      .call(() => updateScroll()) //! We call this method after every change that impacts the page height.
      .pause()

  let open = () => animation("auto").play()
  let close = () => animation(0).play()

  return { open, close }
}

const Collapsible = ({ children }) => {
  const [state, setState] = useState({
    initial: false,
    clicked: null,
  })

  let body = useRef(null)

  const handleClick = () => {
    if (state.initial === false) {
      setState({
        initial: null,
        clicked: true,
      })
    } else if (state.clicked === true) {
      setState({
        clicked: !state.clicked,
      })
    } else if (state.clicked === false) {
      setState({
        clicked: !state.clicked,
      })
    }
  }

  useEffect(() => {
    if (state.clicked === false) {
      collapsible(body).close()
    } else if (
      state.clicked === true ||
      (state.clicked === true && state.initial === null)
    ) {
      collapsible(body).open()
    }
  }, [state])

  return (
    <button className="Collapse" onClick={() => handleClick()}>
      <div className="Collapse_Plus">Click Me +</div>
      {children && (
        <div className="Collapse_Content" ref={el => (body = el)}>
          <div>{children}</div>
        </div>
      )}
    </button>
  )
}

export default Collapsible
