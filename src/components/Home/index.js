import './index.css'

import Header from '../Header'

const Home = () => {
  const onclickFind = () => {
    console.log('hi')
  }

  return (
    <div className="home-section">
      <Header />
      <h1 className="h-heading">Find The Job That Fits Your Life</h1>
      <p className="paragraphs">
        Millions of people are searching for jobs, salary information, company
        reviews. Find the job that fits your abilities and potential.
      </p>
      <button type="button" className="button-style" onClick={onclickFind}>
        Find Jobs
      </button>
    </div>
  )
}

export default Home
