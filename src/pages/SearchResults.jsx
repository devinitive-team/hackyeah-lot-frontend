import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import queryString from 'query-string'
import gql from 'graphql-tag'
import { withRouter } from 'react-router-dom'

import Flight from '../components/Flight'
import Spinner from '../components/Spinner'
import CenterDetails from '../components/CenterDetails'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

const GET_FLIGHTS = gql`
    query Flights($origin: String!, $destination: String!, $departureDate: String!, $cabinClass: String!, $market: String!, $tripType: String!, $adt: Int!, $returnDate: String) {
        flights(origin: $origin, destination: $destination, departureDate: $departureDate, cabinClass: $cabinClass, market: $market, tripType: $tripType, adt: $adt, returnDate: $returnDate) {
            offerId
            totalPrice {
                price
                basePrice
            }
            outbound {
                duration
                segments {
                    departureDate
                    flightNumber
                    operationCarrier
                    arrivalAirport
                    departureAirport
                }
            }
            inbound {
                duration
                segments {
                    departureDate
                    flightNumber
                    operationCarrier
                    arrivalAirport
                    departureAirport
                }
            }
            url
        }
    }
`;
      
const SearchResults = ({location, history}) => {
  const queryParams = queryString.parse(location.search) || null
  queryParams.market = 'PL';
  const {adt, ...rest} = queryParams;

  const { data, loading } = useQuery(
    GET_FLIGHTS,
    { variables: {...rest, adt: parseInt(adt, 10)} }
  );

  if(loading) return <Spinner />
  if (!loading && data.flights) {
    return (
      <Container fluid={true}>
        <Row>
          {!loading && data.flights.map((el, i) => (
            <Col md={6} className="my-3">
              <Flight key={`flight-${i}`} flightData={el} meta={queryParams}/>
            </Col>
          ))}
        </Row>
      </Container>
    )
  }
  return (
    <Container fluid={true}>
      <Row>
        <CenterDetails style={{width: '100vw'}}>
          <h4>No flights found!</h4>
          <Button onClick={() => history.push('/reservation')}>Search again</Button>
        </CenterDetails>
      </Row>
  </Container>
  )
}
export default withRouter(SearchResults)
