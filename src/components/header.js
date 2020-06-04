import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header
    data-scroll
    data-scroll-sticky
    data-scroll-target="#container"
    style={{
      width: `100%`,
      position: `fixed`,
      top: 0,
      left: 0,
      zIndex: 10,
    }}
  >
    <div
      className="header"
      style={{
        background: `rebeccapurple`,
        transition: `transform 0.35s ease`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem`,
          height: `80px`,
          display: `flex`,
          alignItems: `center`,
        }}
      >
        <h1 style={{ fontSize: `30px`, margin: 0 }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
      </div>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
