import { useMatch } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { getKeepSvg } from '../services/SVG.service'
export function AppNav() {
  return (
    <section className="app-nav">
      <section className="nav-container">
        <span className="nav-link-div">
          <NavLink to="/notes">
            <span
              dangerouslySetInnerHTML={{
                __html: getKeepSvg('light'),
              }}
            ></span>
          </NavLink>
        </span>
        <span className="nav-link-div">
          <NavLink to="/canvas">
            <span
              dangerouslySetInnerHTML={{
                __html: getKeepSvg('notification'),
              }}
            ></span>
          </NavLink>
        </span>
        <span className="nav-link-div">
          <NavLink to="/save">
            <span
              dangerouslySetInnerHTML={{
                __html: getKeepSvg('save'),
              }}
            ></span>
          </NavLink>
        </span>
        <span className="nav-link-div">
          <NavLink to="/removed">
            <span
              title="removed"
              dangerouslySetInnerHTML={{
                __html: getKeepSvg('delete'),
              }}
            ></span>
          </NavLink>
        </span>
      </section>
    </section>
  )
}
