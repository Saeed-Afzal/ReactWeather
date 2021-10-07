import './App.css';
import { useState, useEffect, useRef } from "react"
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { Container, Row, Col, Input } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [weather, setweather] = useState(null)

  // const [cityName, setCityName] = useState("karachi")
  const cityName = useRef(null);

  const [location, setLocation] = useState(null)

  const [submit, setSubmit] = useState(false)

  useEffect(() => {

    let name = "";

    if (cityName.current.value) {
      name = `q=${cityName.current.value}`
    } else if (location) {

      if (!location) {

      } else if (location === "fail") {
        name = "q=new york";
      } else if (location && location.latitude) {
        name = `lat=${location.latitude}&lon=${location.longitude}`
      }
    }

    console.log("name: ", name)
    if (name) {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?${name}&appid=363a0329911c1b074081245aae1023c3&units=metric`)
        .then(res => {
          const newWeather = res.data;
          // console.log("newWeather: ", newWeather);

          setweather(newWeather);
        });
    }

  }, [submit, location]);


  useEffect(() => {

    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log("position got: ", position.coords.latitude);
          // console.log("position got: ", position.coords.longitude);
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })

        }, function (error) {

          setLocation("fail")

        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }

    getLocation()

  }, []);

  return (
    <div>
      <Container fluid className="bg-success text-center text-white">
        <Row>
          <Col><h1>WEATHER APP</h1></Col>
        </Row>

      </Container>
      <br />
      {/* <input onChange={(e) => {

        console.log("e: ", e.target.value)
        setCityName(e.target.value)
      }} /> */}
      <div className="d-flex justify-content-end">
        <Container>
          <Row className="justify-content-center">
            <div class="input-group mb-3 w-50  justify-content-center">
              <input ref={cityName} type="text" class="form-control " placeholder="Enter City Name" aria-label="Recipient's username" />


            </div>
            {/* <input ref={cityName} /> */}
            <br />

          </Row>
        </Container>
        {/* <br/>
<div className="mb-2 justify-content-center">
    <Button variant="primary" size="md">
      Large button
    </Button>
</div> */}
      </div>


      <Row className=" justify-content-center ">
        <Button variant="primary" className="justify-content-center btn-md wea" onClick={() => {

          console.log("name: ", cityName.current.value)

          setSubmit(!submit)

        }} >Submit</Button>
      </Row>



      <br />

      {/* <h1>{weather?.main?.temp}</h1> */}

      {
        (weather !== null) ?
          <>
            <div className = " bg-success text-center text-white "> 
           <h1> {weather.name} Weather </h1>
            </div>
            <div className=" justify-content-center text-center">
            <h1>Temperature: <Badge> {weather?.main?.temp}</Badge></h1>
            <h2>{weather?.weather[0].description}</h2>
            <h2>Wind Speed: <Badge bg="success">{weather?.wind.speed}</Badge> </h2>
            </div>
          </>
          :
          <h1>Loading...</h1>
      }

    </div>
  );
}
export default App;
