import axios from 'axios'
import React, {Component} from 'react'

class SingleSchedule extends Component {
	constructor(props) {
		super(props)
    let appState = localStorage["appState"]
        ? JSON.parse(localStorage["appState"])
        : "";
    console.log(appState)
		this.state = {
			schedule: {},
			tasks: [],
      title: '',
      errors: [],
      token: appState.token
		}
    if(new Date().getTime() < appState.tokenExpiration || !appState.token) {
    
      this.state.token = appState.token;
     
    }
		this.handleMarkScheduleAsCompleted = this.handleMarkScheduleAsCompleted.bind(this)
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleAddNewTask = this.handleAddNewTask.bind(this)
    this.hasErrorFor = this.hasErrorFor.bind(this)
    this.renderErrorFor = this.renderErrorFor.bind(this)
	}
	componentDidMount() {
		const scheduleId = this.props.match.params.id

		axios.get(`/api/schedules/${scheduleId}`,{headers: {Authorization: 'Bearer ' + this.state.token}}).then(response => {
			this.setState({
				schedule: response.data,
				tasks: response.data.tasks,
				title: '',
				errors: []
			})
		})
	}
  handleFieldChange (event) {
    this.setState({
      title: event.target.value
    })
  }
  handleAddNewTask(event) {
  	event.preventDefault()
  	const task = {
  		title: this.state.title,
  		schedule_id: this.state.schedule.id
  	}

  	axios.post('/api/tasks', task,{headers: {Authorization: 'Bearer ' + this.state.token}})
  		.then(response => {
  			this.setState({
  				title: ''
  			})
  			this.setState(prevState => ({
  				tasks: prevState.tasks.concat(response.data)
  			}))
  		})
  		.catch(error => {
            console.log('hi')
  			this.setState({
  				errors: error.response.data.errors
  			})
  		})
  }
  hasErrorFor (field) {
    return !!this.state.errors[field]
  }
  renderErrorFor (field) {
    if (this.hasErrorFor(field)) {
      return (
        <span className='invalid-feedback'>
          <strong>{this.state.errors[field][0]}</strong>
        </span>
      )
    }
  }
  handleMarkScheduleAsCompleted () {
    const { history } = this.props

    axios.put(`/api/schedules/${this.state.schedule.id}`,{},
      {headers: {Authorization: 'Bearer ' + this.state.token}})
      .then(response => history.push('/'))
  }
  handleMarkTaskAsCompleted (taskId) {
    axios.put(`/api/tasks/${taskId}`,{},{headers: {Authorization: 'Bearer ' + this.state.token}}).then(response => {
      this.setState(prevState => ({
        tasks: prevState.tasks.filter(task => {
          return task.id !== taskId
        })
      }))
    })
  }
	render () {
    const { schedule, tasks } = this.state

    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <div className='card'>
              <div className='card-header'>{schedule.name}</div>
              <div className='card-body'>
                <p>{schedule.description}</p>

                <button className='btn btn-primary btn-sm' onClick={this.handleMarkScheduleAsCompleted}>
                  Mark as completed
                </button>

                <hr />
						    <form onSubmit={this.handleAddNewTask}>
						      <div className='input-group'>
						        <input
						          type='text'
						          name='title'
						          className={`form-control ${this.hasErrorFor('title') ? 'is-invalid' : ''}`}
						          placeholder='Task title'
						          value={this.state.title}
						          onChange={this.handleFieldChange}
						        />
						        <div className='input-group-append'>
						          <button className='btn btn-primary'>Add</button>
						        </div>
						        {this.renderErrorFor('title')}
						      </div>
						    </form>
                <ul className='list-group mt-3'>
                  {tasks.map(task => (
                    <li
                      className='list-group-item d-flex justify-content-between align-items-center'
                      key={task.id}
                    >
                      {task.title}

                      <button className='btn btn-primary btn-sm'
                      	onClick={this.handleMarkTaskAsCompleted.bind(this,task.id)}>
                        Mark as completed
                      </button>
                    </li>
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

export default SingleSchedule