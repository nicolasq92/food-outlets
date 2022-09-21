import './App.scss';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import _debounce from 'lodash/debounce';
import Card from './cardComponent/Card';

function App() {

  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  const [currentCity, setCurrentCity] = useState("");

  useEffect(() => {
    setCities([]);
    setCity("");
    setCurrentCity("");
  }, []);


  const debounceFn = useCallback(_debounce(handleDebounceFn, 1000), []);

    function handleDebounceFn(city) {
      setCities([]);
      setCurrentCity(city);
      const urlString = "http://localhost:8080/city/"+city;
        if (city !== "") {
          axios.get(urlString).then((res) => {
            console.log(res.data);
            setCities(res.data);
            setCity("");
          });
        }
    }

    function handleChange (event) {
        event.preventDefault();
        setCity(event.target.value);
        debounceFn(event.target.value);
    };

    function printCards (cards) { 
      return cards.map((card,index) => {
        return <Card key={index} card={card}></Card>;
      })
    }

  return (
    <div className="app">
      <div className="container">
        <header>Foot Outlets {currentCity ? `- ${currentCity}` : ""}</header>
        <div className="search-box">
          <Form>
            <Form.Group>
                <Form.Control
                type="text"
                id="inputText"
                value={city}
                onChange={handleChange}
                placeholder='Insert the name of the city'
                />
            </Form.Group>
          </Form>
        </div>
        <div className="foods-container">
          {printCards(cities)}
        </div>
        <footer>Nicolas Quijada</footer>
      </div>
    </div>
  );
}

export default App;
