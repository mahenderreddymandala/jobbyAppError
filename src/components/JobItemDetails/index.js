import {AiFillStar} from 'react-icons/ai'

import {HiLocationMarker} from 'react-icons/hi'
import {BsFillBagFill} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import {Component} from 'react'

import Cookies from 'js-cookie'

import Header from '../Header'

import './index.css'

const ApiStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
  initial: '',
}

class JobItemDetails extends Component {
  state = {
    status: ApiStatus.initial,
    jobsData: '',
  }

  componentDidMount() {
    this.getjobDetails()
  }

  getjobDetails = async () => {
    this.setState({status: ApiStatus.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    //  console.log(id)

    const url = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      console.log(data.job_details.title)

      const updatedData = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,

        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        skills: data.job_details.skills,
        lifeAtCompany: data.job_details.life_at_company,
        similarJobs: data.similar_jobs,
        title: data.job_details.title,
      }
      // console.log(updatedData)

      this.setState({
        status: ApiStatus.success,

        jobsData: updatedData,
      })
    } else {
      this.setState({status: ApiStatus.failure})
    }
  }

  renderLoading = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobSuccess = () => {
    const {jobsData} = this.state

    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      skills,
      lifeAtCompany,
      similarJobs,
    } = jobsData
    console.log(companyWebsiteUrl)

    return (
      <div className="black-section">
        <div className="jobs-container-sections">
          <div className="image">
            <img src={companyLogoUrl} alt="job details company logo" />

            <div className="para">
              <h1 className="title">{title}</h1>
              <div className="star">
                <AiFillStar className="starss" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="p-h">
            <div className="h-section">
              <HiLocationMarker className="stars" />
              <p className="location">{location}</p>
              <BsFillBagFill className="stars" />
              <p className="type">{employmentType}</p>
            </div>
            <div>
              <h1 className="package">{packagePerAnnum}</h1>
            </div>
          </div>
          <hr />
          <div className="company-logos">
            <h1>Description</h1>
            <a href={companyWebsiteUrl} alt="company">
              Visit
            </a>
          </div>
          <p className="job-des">{jobDescription}</p>
          <h1 className="head-sub">Skills</h1>

          <div className="skills-section">
            {skills.map(each => (
              <li key={each.name} className="list-item-sections">
                <img
                  src={each.image_url}
                  alt={each.name}
                  className="skills-name"
                />

                <p className="name-skills">{each.name}</p>
              </li>
            ))}
          </div>
          <h1 className="head-sub">Life at Company</h1>
          <div className="life">
            <p className="life-description">{lifeAtCompany.description}</p>
            <img
              src={lifeAtCompany.image_url}
              alt="life at company"
              className="url"
            />
          </div>
          <div className="lifes">
            <p className="life-description">{lifeAtCompany.description}</p>
            <img src={lifeAtCompany.image_url} alt="url" className="url" />
          </div>
        </div>
        <h1 className="head-sub">Similar Jobs</h1>

        <div className="similar-jobs">
          {similarJobs.map(each => (
            <li key={each.id} className="list-item-section">
              <div className="image">
                <img
                  src={each.company_logo_url}
                  alt="similar job company logo"
                  className="image-2"
                />

                <div className="para">
                  <h1 className="title">{each.title}</h1>
                  <div className="star">
                    <AiFillStar className="starss" />
                    <p className="rating">{each.rating}</p>
                  </div>
                </div>
              </div>
              <h1>Description</h1>
              <p className="job-des">{each.job_description}</p>
              <div className="p-h">
                <div className="h-section">
                  <HiLocationMarker className="stars" />
                  <p className="location">{each.location}</p>
                  <BsFillBagFill className="stars" />
                  <p className="type">{each.employment_type}</p>
                </div>
              </div>
            </li>
          ))}
        </div>
      </div>
    )
  }

  renderJobFailure = () => (
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

  renderJobItemDetails = () => {
    const {status} = this.state
    switch (status) {
      case ApiStatus.success:
        return this.renderJobSuccess()
      case ApiStatus.failure:
        return this.renderJobFailure()
      case ApiStatus.loading:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="background">
        <Header />
        <div>{this.renderJobItemDetails()}</div>
      </div>
    )
  }
}

export default JobItemDetails
