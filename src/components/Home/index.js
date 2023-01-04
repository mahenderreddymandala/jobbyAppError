import {Redirect, Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

import Header from '../Header'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <div className="home-section">
      <Header />
      <h1 className="h-heading">Find The Job That Fits Your Life</h1>
      <p className="paragraphs">
        Millions of people are searching for jobs, salary information, company
        reviews. Find the job that fits your abilities and potential.
      </p>
      <Link to="/jobs" className="link-item">
        <button type="button" className="button-style" testid="searchButton">
          Find Jobs
        </button>
      </Link>
    </div>
  )
}

export default Home
