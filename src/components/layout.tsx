import { WindowLocation } from "@reach/router"
import { Link } from "gatsby"
import React from "react"
import './layout.scss'

const Layout: React.FC<LayoutProps> = ({title, location, children }) => {
  //@ts-ignore
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header
  let about

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
    about = (
      <h1 className="main-heading-about">
        <Link className="header-link-about" to="/about">
          About
        </Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
    about = (
      <Link className="header-link-about" to="/about">
        About
      </Link>
    )
  }

  about = (
    <h3 className="main-heading-about">
      <Link className="header-link-about" to="/about">
        About
      </Link>
    </h3>
  )

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">
        <div className="global-navbar">
          {header}
          {about}
        </div>
      </header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  )
}

interface LayoutProps {
  title: string;
  location: WindowLocation<WindowLocation["state"]>;
  children: JSX.Element[];
}

export default Layout
