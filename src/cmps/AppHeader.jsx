import { useNavigate } from 'react-router-dom'
import { getKeepSvg } from '../services/SVG.service'
import { eventBus } from '../services/event-bus.service'
import { useSelector } from 'react-redux'
export function AppHeader(props) {
  const user = useSelector((storeState) => storeState.userModule.loggedInUser)

  const navigate = useNavigate()

  function goSearch() {
    navigate('/search')
  }

  function goToNotesPage() {
    console.log('hi notes')
    navigate('/notes')
  }

  return (
    <header className="app-header">
      <section className="header-container">
        <div className="hamburger-section">
          <div>
            <span
              dangerouslySetInnerHTML={{
                __html: getKeepSvg('menu'),
              }}
            ></span>
          </div>
          <p>Keep</p>
          <img src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png" />
        </div>
        <div onClick={goSearch} className="search-for-mobile">
          <i className="header-search-icon">
            <span
              dangerouslySetInnerHTML={{
                __html: getKeepSvg('search'),
              }}
            ></span>
          </i>
        </div>

        <div>
          <div onClick={goSearch} className="header-search-container">
            <div className="svg-delete-header-container">
              <i className="header-search-icon">
                <span
                  dangerouslySetInnerHTML={{
                    __html: getKeepSvg('search'),
                  }}
                ></span>
              </i>
            </div>
            <form className="header-form">
              <input
                className="header-input"
                type="search"
                placeholder="Search"
                autoFocus
              />
            </form>
            <div onClick={goToNotesPage} className="svg-header-container">
              <i className="header-search-icon">
                <span
                  dangerouslySetInnerHTML={{
                    __html: getKeepSvg('close'),
                  }}
                ></span>
              </i>
            </div>
          </div>
          <span></span>
        </div>
        <div className="user-actions">
          <div onClick={() => eventBus.emit('open-modal')}>
            <img
              className="ai-image"
              src="https://chatgptarb.com/wp-content/uploads/2023/05/cropped-chatgpt-1.png"
            />
          </div>
          <div className="user">
            <i>
              <span
                className="user-icon"
                dangerouslySetInnerHTML={{
                  __html: getKeepSvg('userIcon'),
                }}
              ></span>
            </i>
            <span>{user.name}</span>
          </div>
        </div>
      </section>
    </header>
  )
}
