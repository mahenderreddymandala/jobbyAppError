import {Component} from 'react'

import Cookies from 'js-cookie'

import JobItem from '../JobItem'

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
    jobDetails: '',
  }

  componentDidMount() {
    this.getprofileApiUrl()
    this.getjobsApiUrl()
  }

  getprofileApiUrl = async () => {
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
      this.setState({profileDetails: formattedData})
    }
  }

  renderProfile = () => {
    const {profileDetails} = this.state
    const {profileImageUrl, name, shortBio} = profileDetails

    return (
      <div>
        <img src={profileImageUrl} alt="profile" className="profile" />
        <h1 className="name">{name}</h1>
        <p className="paragraph">{shortBio}</p>
      </div>
    )
  }

  renderSalaryList = () => {
    const salaryList = each => {
      const {label} = each
      return <li>{label}</li>
    }

    return (
      <div>
        <h1 className="heading-2">Salary Range</h1>
        {salaryRangesList.map(each => salaryList(each))}
      </div>
    )
  }

  renderEmployementType = () => {
    const renderEmployement = each => {
      const {label} = each
      return <li>{label}</li>
    }

    return (
      <div>
        <h1 className="heading-2">Type of Employment</h1>
        {employmentTypesList.map(each => renderEmployement(each))}
      </div>
    )
  }

  getjobsApiUrl = async () => {
    const url = 'https://apis.ccbp.in/jobs'
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
      this.setState({jobDetails: formattedData})
    }
  }

  renderjobDetails = () => {
    const {jobDetails} = this.state
    console.log(jobDetails)

    return (
      <ul>
        {jobDetails.map(each => (
          <JobItem jobs={each} key={each.id} />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="job-section">
        {this.renderProfile()}
        {this.renderEmployementType()}
        {this.renderSalaryList()}
        <div className="image-section">{this.renderjobDetails()}</div>
      </div>
    )
  }
}

export default Jobs
