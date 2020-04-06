import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ScheduleList extends Component {

	constructor(props) {
		super(props)
    let appState = localStorage["appState"]
        ? JSON.parse(localStorage["appState"])
        : "";  
  

		this.state = {
			schedules: [],
      token: null,
      user: this.props.user
      
		}

    if(new Date().getTime() < appState.tokenExpiration || !appState.token) {
    
      this.state.token = appState.token;
     
    }

    this.handleLogout = this.handleLogout.bind(this)
	}
  handleLogout(e) {
    e.preventDefault();
    axios.post('/api/logout',{},{headers: {Authorization: 'Bearer ' + this.state.token}}).then(response => {
      console.log(response)
      localStorage.removeItem('appState');

      window.location.replace('/login')
    })
    // save app state with user date in local storage

  }
  
	componentDidMount() {
		axios.get('/api/schedules',{headers: {Authorization: 'Bearer ' + this.state.token}}).then(response => {
			this.setState({
				schedules: response.data
			})
		})
      axios.get('/api/user',{headers: {Authorization: 'Bearer ' + this.state.token}})
      .then(response => {
        this.setState({
          user: response.data
        })
      })
	}

  render () {
    const { schedules } = this.state
    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <div className='card'>
              <div className='card-header'>Hello, {this.state.user.name}
                <div className="float-right">
                  <form onSubmit={this.handleLogout}>
                    <button
                      style={{ padding: 10, backgroundColor: "red", color: "white" }}
                      onClick={this.handleLogout.bind(this)}
                      >
                      Logout
                    </button>                  
                  </form>
                </div>
              </div>

              <div className='card-body'>
                <Link className='btn btn-primary btn-sm mb-3' to='schedule/create'>
                  Create new Schedule
                </Link>
                <ul className='list-group list-group-flush'>
                  {schedules.map(schedule => (
                    <Link
                      className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'
                      to={`schedule/${schedule.id}`}
                      key={schedule.id}
                    >
                      {schedule.name}
                      <span className='badge badge-primary badge-pill'>
                        {schedule.tasks_count}
                      </span>
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}


export default ScheduleList