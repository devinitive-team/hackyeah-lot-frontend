import React, { useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import queryString from 'query-string'
import gql from 'graphql-tag'

// const FETCH_FLIGHTS = gql`
//   query FetchFlights($origin: String!, $destination: String!, $departureDate: String!, $cabinClass: String!, $market: String!, $tripType: String!, $adt: Int!) {
//     fetchFlights(origin: $origin, destination: $destination, departureDate: $departureDate, cabinClass: $cabinClass, market: $market, tripType: $tripType, adt: $adt) {
//       offerId
//       totalPrice {
//         price
//         basePrice
//         tax
//         currency
//       }
//       url
//     }     
//   }
// `

const FETCH_FLIGHTS = gql`
  query Flights($origin: String!, $destination: String!, $departureDate: String!, $cabinClass: String!, $market: String!, $tripType: String!, $adt: Int!) {
    flights(adt: 7, cabinClass: "E", departureDate: "17092019", destination: "AMS", origin: "WAW", returnDate: "18092019", tripType: "R", market: "PL") {
      offerId
      totalPrice {
        price
        basePrice
        tax
        currency
      }
      url
      }
      `;
      
const SearchResults = ({location}) => {
  const queryParams = queryString.parse(location.search) || null
  queryParams.market = 'PL';
  const {loading, error, data } = useQuery(FETCH_FLIGHTS, {
    variables: {...queryParams},
  });

  if(!loading) console.log(data)

  return (
    <div>SearchResults</div>
  )
}
export default SearchResults
