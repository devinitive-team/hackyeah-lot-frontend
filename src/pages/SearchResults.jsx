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

const GET_ADVERTS = gql`
    {
        cities {
            id
            name
            category
            code
            description
            imagesBig
        }
    }
`

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
                    idInfoSegment
                }
            }
            inbound {
                duration
                segments {
                    idInfoSegment
                }
            }
            url
        }
    }
`;
      
const SearchResults = ({location}) => {
  const queryParams = queryString.parse(location.search) || null
  queryParams.market = 'PL';
  const {adt, ...rest} = queryParams;
  const opts = {
    variables: {...rest, adt: parseInt(adt, 10)},
  }

  console.log(opts)
  const { data, loading, error } = useQuery(
    GET_FLIGHTS,
    { variables: {...rest, adt: parseInt(adt, 10)} }
  );

  if (error) console.error(error)
  if(!loading) console.log(data)

  return (
    <div>SearchResults</div>
  )
}
export default SearchResults
