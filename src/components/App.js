import React, { Component } from 'react';
import '../styles/App.css';
import WeatherForm from './WeatherForm'
import Response from './Response'
import Error from './Error'
import Footer from './Footer'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Shocked from '../images/shocked.png'

class App extends Component {
  state = {
    time: null,
    input: '',
    weather: null,
    error: null,
    missingCity: null,
    isForecastNeeded: false,
  }

  calcTime = (offset) => {
    const d = new Date();
    const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    const nd = new Date(utc + (3600000 * offset));
    return nd.toLocaleString();
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
    const numbers = /^[0-9]+$/;
    if (element.match(numbers)) {
      this.setState({
        error: 'you entered numbers instead of city',
        input: '',
        missingCity: element,
      });
      flag = false;
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
            time: this.calcTime((data.timezone / 3600).toString()),
            input: '',
            weather: data,
            error: false,
            isForecastNeeded: false
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
  handleForecastChange = () => {
    this.setState(prevState => {
      return { isForecastNeeded: !prevState.isForecastNeeded };
    });
  }
  Main = () => {
    return (
      <div id="container">
        <div className="App">
          <WeatherForm val={this.state.input} subimt={this.handleFormSubmition} change={this.handleInputChange} />
          {this.state.error && <Error city={this.state.missingCity} err={this.state.error} />}
          {(this.state.weather && !this.state.error) && <Response
            weather={this.state.weather} time={this.state.time}
            handleForecastChange={this.handleForecastChange}
            isForecastNeeded={this.state.isForecastNeeded} />}
        </div>
      </div>
    )
  }
  About = () => {
    return (
      <div id="About">
        <div className="About">
          <p>All weather data comes from <em>
            <a href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer">
              OpenWeather API</a></em></p>
          <p>Used icons comes from
           <em> <a href="https://origin.fontawesome.com/icons?d=gallery" target="_blank" rel="noopener noreferrer"> FontAwesome</a></em></p>
          <p>Background source is
           <em> <a href="https://pixabay.com/" target="_blank" rel="noopener noreferrer"> Pixabay</a></em></p>
          <p style={{ marginTop: "20px", marginBottom: "10px" }}>
            Let me know if you found a bug or have ideas how to improve a project<br />
            <a type="email" href="mailto:logbook1155@gmail.com">logbook1155@gmail.com</a> </p>
          <Link id="back" to="/">Retur to forecast</Link>
        </div>
      </div >
    )
  }
  BadPath = () => {
    return (
      <div id="About">
        <div className="About">
          <div className="errorResponse">
            <img src={Shocked} alt="emoji" />
            <p className="errorNumber">Error number: <span className='erNumber'>404</span></p>
            <p>It looks like the page you are looking for does not exist</p>
          </div>
          <Link id="back" to="/">Retur to forecast</Link>
        </div>
      </div >
    )
  }
  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path="/" exact component={this.Main} />
          <Route path="/about" exact component={this.About} />
          <Route component={this.BadPath} />
        </Switch>
        <Footer />
      </Router>
    );
  }
}

export default App;