import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'

import {HiLocationMarker} from 'react-icons/hi'
import {BsFillBagFill} from 'react-icons/bs'

import './index.css'

const JobItem = props => {
  const {jobs} = props

  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobs
  return (
    <Link to={`jobs/${id}`} className="link-item">
      <div className="jobs-container-section">
        <div className="image">
          <img src={companyLogoUrl} alt={title} className="image-2" />

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
        <h1>Description</h1>
        <p className="job-des">{jobDescription}</p>
      </div>
    </Link>
  )
}

export default JobItem
