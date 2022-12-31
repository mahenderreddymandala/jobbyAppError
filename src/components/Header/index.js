import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const {history} = props
  const onlogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-section">
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
          alt="website logo"
          className="logo-el"
        />
      </div>

      <div>
        <Link to="/" className="link-item">
          Home
        </Link>
        <Link to="/jobs" className="link-item">
          Jobs
        </Link>
      </div>
      <div>
        <button onClick={onlogout} type="button" className="btn-style">
          Logout
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)
