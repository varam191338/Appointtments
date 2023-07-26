import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import './index.css'

import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    appointmentsList: [],
    starred: false,
  }

  getFilteredAppointments = () => {
    const {starred, appointmentsList} = this.state
    let filteredList
    if (starred === true) {
      filteredList = appointmentsList.filter(
        eachItem => eachItem.isStarred === true,
      )
    } else {
      filteredList = appointmentsList
    }

    return filteredList
  }

  startFiltered = () => {
    this.setState(prevState => ({
      starred: !prevState.starred,
    }))
  }

  isStarredToggle = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return eachItem
      }),
    }))
  }

  renderAppointmentsList = () => {
    const filteredList = this.getFilteredAppointments()

    return filteredList.map(eachItem => (
      <AppointmentItem
        key={eachItem.id}
        details={eachItem}
        isStarredToggle={this.isStarredToggle}
      />
    ))
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const newAppointment = {
      id: uuidv4(),
      title,
      date,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
    }))
  }

  onChangeTitle = event => {
    this.setState({
      title: event.target.value,
    })
  }

  onChangeDate = event => {
    this.setState({
      date: event.target.value,
    })
  }

  render() {
    const {title, date} = this.state

    return (
      <div className="bg-container">
        <div className="card-container">
          <div className="content-image">
            <div className="content">
              <form onSubmit={this.onAddAppointment}>
                <h1> Add Appointment </h1>
                <label htmlFor="mycontainer"> TITLE </label>
                <input
                  placeholder="Title"
                  onChange={this.onChangeTitle}
                  value={title}
                  id="mycontainer"
                />
                <br />
                <label htmlFor="myCheck"> DATE </label>
                <input
                  id="myCheck"
                  type="date"
                  placeholder="dd/mm/yyyy"
                  onChange={this.onChangeDate}
                  value={date}
                />
                <br />
                <button type="submit">Add</button>
              </form>
            </div>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointments"
              />
            </div>
          </div>
          <hr className="line" />
          <div className="starred">
            <h1> Appointments </h1>
            <button
              type="button"
              className="starred-button"
              onClick={this.startFiltered}
            >
              Starred
            </button>
          </div>
          <ul>{this.renderAppointmentsList()}</ul>
        </div>
      </div>
    )
  }
}

export default Appointments
