import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function timeConvert(n) {
    const num = n;
    const hours = (num / 60);
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes);
    return `${rhours} h ${rminutes} min`;
    }

const Flight = ({flightData, meta}) => (
        <Card className="md-6 sm-12" style={{ width: '80vm' }}>
            <Card.Header> 
            <FontAwesomeIcon icon="plane-departure" />
            </Card.Header>
            {console.log(flightData)}
            {console.log(meta)}
        <Card.Body>
        <Card.Title>
            From {meta.origin} to {meta.destination}
        </Card.Title>
        
        <Card.Text>
            <Row>
                <Col>
                    Flight Nr: {flightData.outbound.segments[0].flightNumber}
                </Col>
                <Col>
                    Departure date: {flightData.outbound.segments[0].departureDate}
                </Col>
            </Row>
        </Card.Text>

        <Card.Text>
            Duration: {timeConvert(flightData.outbound.duration)}
        </Card.Text>

        <Card.Text>
            Price: {flightData.totalPrice.price + "PLN"}
        </Card.Text>
        <Button variant="primary">Book</Button>
    </Card.Body>
    </Card>
)


export default Flight
