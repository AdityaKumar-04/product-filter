import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

function KitchenSinkExample({
    id,
    title,
    price,
    category,
    description,
    image,
  }) {
  return (
    <Card style={{ width: '18rem' ,marginBottom:'15px'}}>
      <Card.Img variant="top" src={image} style={{height:"250px", objectFit:"cover"}}/>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>{category}</ListGroup.Item>
        <ListGroup.Item>{price}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
      <Button variant="success" style={{cursor:"pointer"}}>Add to Card</Button>
      </Card.Body>
    </Card>
  );
}

export default KitchenSinkExample;