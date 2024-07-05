// Write your code here

import './index.css'

const AppointmentItem = props => {
  const {appointmentItem, isAppointmentStarred} = props
  const {id, title, date, isStarred} = appointmentItem
  const starImg = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const isStarredImg = () => {
    isAppointmentStarred(id)
  }
  return (
    <li className="list-container">
      <div className="title-star-container">
        <p className="title-name">{title}</p>
        <button
          className="titile-star-button"
          type="button"
          onClick={isStarredImg}
          data-testid="star"
        >
          <img src={starImg} className="star-image" alt="star" />
        </button>
      </div>
      <p className="date-is">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
