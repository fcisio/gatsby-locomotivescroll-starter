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

  //! We call this method after every change that impacts the page height.
  const animation = tl
    .call(() => updateScroll())
    .fromTo(
      node,
      { height: 0, willChange: "height" },
      { height: "auto", clearProps: "willChange" }
    )
    .call(() => updateScroll())
    .pause()

  let open = () => animation.play()
  let close = () => animation.reverse(0)

  return { open, close }
}

const Collapsible = ({ opened, children, ...props }) => {
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
      opened ? collapsible(body).open() : collapsible(body).close()
    } else if (
      state.clicked === true ||
      (state.clicked === true && state.initial === null)
    ) {
      opened ? collapsible(body).close() : collapsible(body).open()
    }
  }, [state, opened])

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
