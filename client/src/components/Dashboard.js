import React, { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import Profile from './user/Profile';

class Dashboard extends Component {
  state = {
    user: {},
    show_modal: false,
    name: ''
  }
  // STEP #11
  componentDidMount() {
    axios.get(`/user?email=${localStorage.getItem('user_email')}`)
      .then(res => {
        // STEP #13
        this.setState({user: res.data, name: res.data.name || ''});
      });
  }
  
  toggleModal = (show) => {
    this.setState({show_modal: show});
  }

  handleChange = (e) => {
    this.setState({name: e.target.value});
  }

  updateName = () => {
    axios.put('/user', {name: this.state.name, email: this.state.user.email})
      .then(res => {
        this.setState({user: res.data, show_modal: false});
      });
  }

  render() {
    return(
      <div className="dashboard">
        <h1>Dashboard</h1>

        {this.state.show_modal ? (
          <div className="modal">
            <input 
              type="text" 
              placeholder="Type Your Name" 
              value={this.state.name}
              onChange={this.handleChange} />
            <button onClick={this.updateName}>Update</button>
            <button onClick={() => this.toggleModal(false)}>Close Modal</button>
          </div>
        ) : ''}

        <Route path="/dashboard/profile" render={() => (
          <Profile user={this.state.user} toggleModal={this.toggleModal} />
        )} />
      </div>
    )
  }
};

export default Dashboard;