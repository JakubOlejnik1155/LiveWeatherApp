import React, { Component } from 'react';
import '../styles/App.css';
import WeatherForm from './WeatherForm'
import Response from './Response'
import Error from './Error'

class App extends Component {
  state = {
    input: '',
    weather: null,
    error: null,
    missingCity: null
  }
  handleInputChange = (event) => {
    this.setState({ input: event.target.value });
  }
  handleFormSubmition = (event) => {
    event.preventDefault()
    const element = this.state.input;
    let flag = true;
    if (!element) {
      flag = false
    }
    for (let index = 0; index < this.state.input.length; index++) {
      if (element.charAt(index) > 33 && element.charAt(index) < 64) {
        this.setState({
          error: 'you entered numbers instead of city',
          input: '',
          missingCity: element,
        });
        flag = false;
      }
    }
    if (flag) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.input}&appid=9b2e69fdc3396e7b6cd92b0d5a636435&units=metric`)
        .then(response => {
          if (response.ok) {
            return response;
          }
          this.setState({ error: response.status });
          throw Error(response.status)
        })
        .then(response => response.json())
        .then(data => {
          this.setState({
            input: '',
            weather: data,
            error: false
          });
        })
        .catch(error => {
          this.setState({
            input: '',
            missingCity: this.state.input,
          });
        })
    }
  }
  render() {
    return (
      <div className="App">
        <WeatherForm val={this.state.input} subimt={this.handleFormSubmition} change={this.handleInputChange} />
        {this.state.error && <Error city={this.state.missingCity} err={this.state.error} />}
        {(this.state.weather && !this.state.error) && <Response weather={this.state.weather} />}
      </div>
    );
  }
}

export default App;