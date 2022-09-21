import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import './Card.scss';

function CardComponent(props) {
    
    const [image, setImage] = useState("");

    useEffect(() => {
        axios.get('https://foodish-api.herokuapp.com/api').then((res) => {
            setImage(res.data.image);
          });
    },[]);

    console.log(props.card)
    const {city, name, user_rating } = props.card;
  return (
    <div className="card-container">
        <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title><span>{name}</span><span>{user_rating.average_rating}</span></Card.Title>
        <Card.Text>
            <div>{}</div>  
        </Card.Text>
      </Card.Body>
    </Card>
    </div>
  );
}

export default CardComponent;
