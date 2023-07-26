import './index.css'

const AppointmentItem = props => {
  const {details, isStarredToggle} = props
  const {id, isStarred, title, date} = details

  const onClickStar = () => {
    isStarredToggle(id)
  }

  const starUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li>
      <div className="appointments">
        <div className="start-container">
          <p>{title}</p>
          <button type="button" onClick={onClickStar}>
            <img src={starUrl} alt="star" className="star" data-testid="star" />
          </button>
        </div>
        <div>
          <p>{date}</p>
        </div>
      </div>
    </li>
  )
}

export default AppointmentItem
