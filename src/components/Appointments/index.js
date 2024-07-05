// Write your code here
import {Component} from 'react'
import {format} from 'date-fns'
import {v4 as uuid4} from 'uuid'
import './index.css'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentList: [],
    isStarredClass: false,
  }

  gettingTitle = e => {
    this.setState({
      titleInput: e.target.value,
    })
  }

  gettingDate = e => {
    this.setState({
      dateInput: e.target.value,
    })
  }

  isStarredButton = () => {
    const {isStarredClass} = this.state
    this.setState({
      isStarredClass: !isStarredClass,
    })
  }

  appointmentItemList = () => {
    const {titleInput, dateInput} = this.state
    const dateIs = format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
    const appointmentItem = {
      id: uuid4(),
      title: titleInput,
      date: dateIs,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, appointmentItem],
      titleInput: '',
      dateInput: '',
    }))
  }

  isAppointmentStarred = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return eachItem
      }),
    }))
  }

  isStarredItemsList = () => {
    const {appointmentList, isStarredClass} = this.state
    if (isStarredClass) {
      return appointmentList.filter(
        eachItem => eachItem.isStarred === isStarredClass,
      )
    }
    return appointmentList
  }

  render() {
    const {titleInput, dateInput, isStarredClass} = this.state
    const classIs = isStarredClass ? 'starred-class' : ''
    const filterElementsList = this.isStarredItemsList()
    return (
      <div className="appoitment-bg-container">
        <div className="appoitment-input-container">
          <h1 className="appoitment-heading">Add Appointment</h1>
          <div className="form-container">
            <form className="form-control-container">
              <div className="form-control">
                <label htmlFor="title" className="label-heading">
                  TITLE
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="Title"
                  className="label-input"
                  onChange={this.gettingTitle}
                  value={titleInput}
                />
              </div>
              <div className="form-control">
                <label htmlFor="date" className="label-heading">
                  DATE
                </label>
                <input
                  type="date"
                  id="date"
                  className="label-input"
                  onChange={this.gettingDate}
                  placeholder="dd/mm/yyyy"
                  value={dateInput}
                />
              </div>
              <button
                className="form-button"
                type="button"
                onClick={this.appointmentItemList}
              >
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appoitment-image"
            />
          </div>
          <hr className="form-line" />
          <div className="appointments-continer-list">
            <div className="appointments-starrted-container">
              <h1 className="appointments-heading">Appointments</h1>
              <button
                type="button"
                className={`starrted-button ${classIs}`}
                onClick={this.isStarredButton}
              >
                Starred
              </button>
            </div>
            <ul className="appointmentItem-list">
              {filterElementsList.map(appointmentItem => (
                <AppointmentItem
                  appointmentItem={appointmentItem}
                  isAppointmentStarred={this.isAppointmentStarred}
                  key={appointmentItem.id}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
