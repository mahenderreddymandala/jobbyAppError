import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import {AiOutlineSearch} from 'react-icons/ai'
import Header from '../Header'

import JobItem from '../JobItem'

import './index.css'

const profileApiStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
  initial: '',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    profileDetails: '',
    jobDetails: [],
    profileStatus: profileApiStatus.initial,
    jobsStatus: profileApiStatus.initial,
    employmentType: '',
    packages: '',
    search: '',
  }

  componentDidMount() {
    this.getprofileApiUrl()
    this.getjobsApiUrl()
  }

  getprofileApiUrl = async () => {
    this.setState({profileStatus: profileApiStatus.loading})
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')

    //  console.log(jwtToken)
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    //  console.log(response)

    const data = await response.json()

    if (response.ok === true) {
      //  console.log(data)

      const formattedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      //  console.log(formattedData)
      this.setState({
        profileDetails: formattedData,
        profileStatus: profileApiStatus.success,
      })
    } else {
      this.setState({profileStatus: profileApiStatus.failure})
    }
  }

  renderProfileSuccess = () => {
    const {profileDetails} = this.state
    const {profileImageUrl, name, shortBio} = profileDetails

    return (
      <div className="profile-section">
        <img src={profileImageUrl} alt="profile" className="profile" />
        <h1 className="name">{name}</h1>
        <p className="paragraph">{shortBio}</p>
      </div>
    )
  }

  onchangeSalary = event => {
    this.setState({packages: event.target.id}, this.getjobsApiUrl)
  }

  renderSalaryList = () => (
    <ul>
      {salaryRangesList.map(each => (
        <li key={each.salaryRangeId} className="list-item">
          <input
            id={each.salaryRangeId}
            type="radio"
            onChange={this.onchangeSalary}
            value={this.packages}
          />
          <label htmlFor={each.salaryRangeId}>{each.label}</label>
        </li>
      ))}
    </ul>
  )

  onChangeemploymentType = event => {
    this.setState({employmentType: event.target.id}, this.getjobsApiUrl)
  }

  renderEmployementType = () => (
    <ul>
      {employmentTypesList.map(each => (
        <li key={each.employmentTypeId} className="list-item">
          <input
            type="checkbox"
            id={each.employmentTypeId}
            onChange={this.onChangeemploymentType}
            value={this.employmentType}
          />
          <label htmlFor={each.employementTypeId}>{each.label}</label>
        </li>
      ))}
    </ul>
  )

  getjobsApiUrl = async () => {
    this.setState({jobsStatus: profileApiStatus.loading})
    const {employmentType, packages, search} = this.state
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${packages}&search=${search}`
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',

      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()

    if (response.ok === true) {
      const formattedData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobDetails: formattedData,
        jobsStatus: profileApiStatus.success,
      })
    } else {
      this.setState({jobsStatus: profileApiStatus.failure})
    }
  }

  onRetry = () => this.renderProfile()

  onSearch = event => {
    this.setState({search: event.target.value})
  }

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailure = () => (
    <div>
      <button className="btn-style" type="button" onClick={this.onRetry}>
        Retry
      </button>
    </div>
  )

  renderProfileStatus = () => {
    const {profileStatus} = this.state
    switch (profileStatus) {
      case profileApiStatus.success:
        return this.renderProfileSuccess()
      case profileApiStatus.failure:
        return this.renderFailure()
      case profileApiStatus.loading:
        return this.renderLoader()
      default:
        return null
    }
  }

  renderJobsSuccess = () => {
    const {jobDetails} = this.state
    const nojobs = jobDetails.length === 0
    console.log(nojobs)
    return nojobs ? (
      <ul>
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="nojobs-image"
        />
        <h1 className="no-jobs">No Jobs Found</h1>
        <p className="no">We could not find any jobs. Try other filters</p>
      </ul>
    ) : (
      <ul className="ul-job-items-container">
        {jobDetails.map(eachItem => (
          <JobItem key={eachItem.id} jobs={eachItem} />
        ))}
      </ul>
    )
  }

  renderJobsList = () => {
    const {jobsStatus} = this.state

    switch (jobsStatus) {
      case profileApiStatus.success:
        return this.renderJobsSuccess()
      case profileApiStatus.failure:
        return this.renderJobsFailure()
      case profileApiStatus.loading:
        return this.renderLoader()
      default:
        return null
    }
  }

  renderJobsFailure = () => (
    <ul>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="nojobs-image"
      />
      <h1 className="no-jobs">Oops! Something Went Wrong</h1>
      <p className="no">We cannot seem to find the page you are looking for.</p>
      <button className="btn-style" type="button" onClick={this.onRetry}>
        Retry
      </button>
    </ul>
  )

  onKey = () => {
    this.getjobsApiUrl()
  }

  render() {
    const {jobDetails} = this.state
    console.log(jobDetails)
    return (
      <div className="background">
        <Header />

        <div className="job-section">
          <div className="input-type">
            <input
              type="search"
              placeholder="Search"
              onChange={this.onSearch}
              className="search-input"
              value={this.search}
            />
            <AiOutlineSearch className="search-icon" onClick={this.onKey} />
          </div>
          <div className="section-11">
            {this.renderProfileStatus()}
            <hr />

            <h1 className="heading-sub">Type of Employment</h1>

            {this.renderEmployementType()}
            <h1 className="heading-sub">Salary Ranges</h1>

            {this.renderSalaryList()}
          </div>
          <div>
            <div className="section-22">
              <input
                type="search"
                placeholder="Search"
                onChange={this.onSearch}
                className="search-input"
                value={this.search}
              />
              <AiOutlineSearch className="search-icon" onClick={this.onKey} />
            </div>
            {this.renderJobsList()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
