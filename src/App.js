import React, { Component } from 'react';
import Moment from "moment";
import "moment-timezone";
import tz from "zipcode-to-timezone";


class App extends Component {
state = {}; //leave this blank because it will pull from the argument that you pass through
  
getTime = () => {
  const zone = tz.lookup(this.state.zip); //uses zipcode-to-timezone to find timezone of the zip input
  const now = Moment().tz(zone).format("dddd, MMMM Do YYYY, h:mm:ss a"); // uses "moment" to find current date/time then timezone in input using variable above 
  
  this.setState({
    // sets as state to call back in render
    time: now,
  });
};

forecast = () => {
    const zip = document.getElementById("zip").value;
    var api_key= "9ac5bc3be4129c77500db64422716a04";
    var api_call = "http://api.openweathermap.org/data/2.5/weather?zip="+zip + ",&units=imperial&appid="+api_key;

    fetch(api_call)
      .then((response) => {
        if (response.status !== 200) {
          console.log(response.status + "Please wait awhile or enter a valid zip code"
          );
          return;
        }

        response.json().then((data) => {
          console.log(data)
          this.setState({
              zip: zip,
              timezone: data.timezone,
              city: data.name,
              country: data.sys.country,
              lat: data.coord.lat,
              lon: data.coord.lon,
              temperature: "temperature: " + Math.round(data.main.temp)+"°",
              humidity: "humidity: " + data.main.humidity,
              description: data.weather[0].description,
              icon: data.weather[0].icon,
              error: "Please enter a valid zip code" 
           });
           this.getTime();
      });      
    });   
  };

  render() {
    return (
      <div className="container">
        <div>
          <input type = 'text'  id="zip" />
          <button onClick = {this.forecast}>Submit</button>
          <div>{this.state.city}</div>
          <div>{this.state.country}</div>
          <div>{this.state.temperature}</div>
          <div>{this.state.humidity}</div>
          <div>{this.state.description}</div>         
        </div>

          <div>{this.state.time}</div>        

          
      </div>
    );
  } //end of return
    // )
  // }//end of render
 
}// end of class component

export default App;
