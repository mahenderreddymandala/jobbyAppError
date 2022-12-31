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
  } = jobs

  return (
    <div className="mg-container">
      <div className="image">
        <img src={companyLogoUrl} alt={title} className="image-2" />
      </div>
      <div className="para">
        <h1 className="title">{title}</h1>
        <p className="rating">{rating}</p>
      </div>
      <div className="h-section">
        <div>
          <p className="location">{location}</p>
          <p className="type">{employmentType}</p>
        </div>
        <div>
          <h1 className="package">{packagePerAnnum}</h1>
        </div>
      </div>
      <h1>Description</h1>
      <p className="job-des">{jobDescription}</p>
    </div>
  )
}

export default JobItem
