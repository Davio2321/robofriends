import React, { Component } from 'react';
import CardList from '../Components/CardList';
import SearchBox from '../Components/SearchBox';
import Scroll from '../Components/Scroll.js';
// import ErrorBoundary from '../Components/ErrorBoundary';
import './App.css';


class App extends Component {
  constructor(){
    super()
    this.state = {
      robot: [],
      searchfield: ''
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response=> response.json())
    .then(users=> this.setState({ robot: users}));
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value })
  }

  render() {
    const { robot, searchfield } = this.state;
    const filteredRobots = robot.filter(robot => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })
      return !robot.length ?
      <h1>Loading</h1> :
      (
        <div className='tc'>
          <h1 className='f1'>RoboFriends</h1>
          <SearchBox searchChange={this.onSearchChange}/>
          <Scroll>
            <ErrorBoundary>
              <CardList robots={filteredRobots}/>
            </ErrorBoundary>
          </Scroll>
        </div>
      );
  }

}

export default App;
