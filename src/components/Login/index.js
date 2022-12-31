import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)

    console.log(response)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    }
  }

  onchangeInput = event => {
    this.setState({username: event.target.value})
  }

  onchangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUsername = () => {
    const {username} = this.state

    return (
      <div className="user-section">
        <div>
          <label className="user" htmlFor="user1">
            USERNAME
          </label>
        </div>
        <div>
          <input
            className="input-title"
            id="user1"
            placeholder="Username"
            type="text"
            onChange={this.onchangeInput}
            value={username}
          />
        </div>
      </div>
    )
  }

  renderPassword = () => {
    const {password} = this.state

    return (
      <div className="password-section">
        <div>
          <label className="user" htmlFor="user2">
            PASSWORD
          </label>
        </div>
        <div>
          <input
            id="user2"
            className="input-title"
            placeholder="Password"
            type="password"
            onChange={this.onchangePassword}
            value={password}
          />
        </div>
      </div>
    )
  }

  render() {
    const {username, password} = this.state
    console.log(username)
    console.log(password)
    return (
      <div className="login-page">
        <div className="section-1">
          <form className="form-input" onSubmit={this.submitForm}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="logo"
            />
            <div>{this.renderUsername()}</div>
            <div>{this.renderPassword()}</div>
            <div className="button-class">
              <button className="btn-style" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
