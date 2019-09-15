import React from 'react'
import styled from 'styled-components'
import { Formik, Field } from 'formik'
import Select from 'react-select'
import * as yup from 'yup'
import queryString from 'query-string'
import { withRouter } from 'react-router-dom'

import renameProp from '../utils/renameProp'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

import MainColumn from '../components/MainColumn'

import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const Wrapper = styled.section`
  height: calc(100vh - 100px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const schema = yup.object({
  origin: yup.string().required(),
  destination: yup.string().required(),
  departureDate: yup.string().required(),
  returnDate: yup.string().required(),
  adt: yup.number().required()
})

const GET_AIRPORTS = gql`
  {
    cities {
      name
      code
    }
  }
`

const tripType = [
  { value: 'R', label: 'Round-trip flight' },
  { value: 'O', label: 'One-way flight' }
]

const cabinClass = [
  { value: 'E', label: 'Economy' },
  { value: 'B', label: 'Business' },
  { value: 'F', label: 'First' }
]

const dates = [
  { value: '15092019', label: '15.09.2019' },
  { value: '16092019', label: '15.09.2019' },
  { value: '17092019', label: '15.09.2019' },
  { value: '18092019', label: '15.09.2019' },
  { value: '19092019', label: '19.09.2019' },
  { value: '20092019', label: '20.09.2019' },
  { value: '21092019', label: '21.09.2019' },
  { value: '22092019', label: '22.09.2019' },
  { value: '23092019', label: '23.09.2019' },
  { value: '25092019', label: '25.09.2019' },
  { value: '26092019', label: '26.09.2019' },
  { value: '27092019', label: '27.09.2019' },
  { value: '28092019', label: '28.09.2019' },
  { value: '29092019', label: '29.09.2019' },
  { value: '30092019', label: '30.09.2019' }
]

const adults = []
const numbers = [...Array(10).keys()]
numbers.map(n => adults.push({ value: n, label: n }))

const ReservationForm = ({ location, history }) => {
  const { loading, data: airports_data } = useQuery(GET_AIRPORTS)
  let airports
  if (!loading) {
    const renameLabel = airports_data.cities.filter(airport => airport.name !== '')
    const renameValue = renameLabel.map(airport =>
      renameProp('name', 'label', airport)
    )
    airports = renameValue.map(airport => renameProp('code', 'value', airport))
  }

  const defaultDestination = queryString.parse(location.search).destination || ''

  return (
    <MainColumn>
      <Formik
        validationSchema={schema}
        onSubmit={values => {
          const {
            origin,
            destination,
            departureDate,
            returnDate,
            tripType,
            cabinClass,
            adt
          } = values
          history.push(
            `/searchresults?origin=${origin}&destination=${destination}&departureDate=${departureDate}&returnDate=${returnDate}&tripType=${tripType}&cabinClass=${cabinClass}&adt=${adt}`
          )
        }}
        initialValues={{
          origin: 'WAW',
          destination: defaultDestination,
          departureDate: '',
          returnDate: '',
          tripType: 'R',
          cabinClass: 'E',
          adt: '1'
        }}
      >
        {({ handleSubmit }) => (
          <Wrapper>
            <h2 style={{ marginBottom: 30 }}>Booking process</h2>
            <Form style={{ width: 500 }} onSubmit={handleSubmit}>
              <Form.Row>
                <Form.Group as={Col} controlId='validationFormikFlightOrigin'>
                  <Form.Label>From</Form.Label>
                  <Field
                    name='origin'
                    render={({ form, field }) => (
                      <Select
                        options={airports}
                        value={
                          airports
                            ? airports.find(option => option.value === field.value)
                            : ''
                        }
                        onChange={option =>
                          form.setFieldValue(field.name, option.value)
                        }
                      />
                    )}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId='validationFormikFlightDestination'>
                  <Form.Label>To</Form.Label>
                  <Field
                    name='destination'
                    render={({ form, field }) => (
                      <Select
                        options={airports}
                        value={
                          airports
                            ? airports.find(option => option.value === field.value)
                            : ''
                        }
                        onChange={option =>
                          form.setFieldValue(field.name, option.value)
                        }
                      />
                    )}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} md='3' controlId='validationFormikDepartureDate'>
                  <Form.Label>Departure date</Form.Label>
                  <Field
                    name='departureDate'
                    render={({ form, field }) => (
                      <Select
                        options={dates}
                        value={
                          dates
                            ? dates.find(option => option.value === field.value)
                            : ''
                        }
                        onChange={option =>
                          form.setFieldValue(field.name, option.value)
                        }
                      />
                    )}
                  />
                </Form.Group>
                <Form.Group as={Col} md='3' controlId='validationFormikReturnDate'>
                  <Form.Label>Return date</Form.Label>
                  <Field
                    name='returnDate'
                    render={({ form, field }) => (
                      <Select
                        options={dates}
                        value={
                          dates
                            ? dates.find(option => option.value === field.value)
                            : ''
                        }
                        onChange={option =>
                          form.setFieldValue(field.name, option.value)
                        }
                      />
                    )}
                  />
                </Form.Group>
                <Form.Group as={Col} md='3' controlId='validationFormikTripType'>
                  <Form.Label>Trip type</Form.Label>
                  <Field
                    name='tripType'
                    render={({ form, field }) => (
                      <Select
                        options={tripType}
                        value={
                          tripType
                            ? tripType.find(option => option.value === field.value)
                            : ''
                        }
                        onChange={option =>
                          form.setFieldValue(field.name, option.value)
                        }
                      />
                    )}
                  />
                </Form.Group>
                <Form.Group as={Col} md='3' controlId='validationFormikCabinClass'>
                  <Form.Label>Cabin class</Form.Label>
                  <Field
                    name='cabinClass'
                    render={({ form, field }) => (
                      <Select
                        options={cabinClass}
                        value={
                          cabinClass
                            ? cabinClass.find(option => option.value === field.value)
                            : ''
                        }
                        onChange={option =>
                          form.setFieldValue(field.name, option.value)
                        }
                      />
                    )}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group
                  as={Col}
                  md='6'
                  controlId='validationFormikNumberOfPassangers'
                >
                  <Form.Label>Number of passangers</Form.Label>
                  <Field
                    name='adt'
                    render={({ form, field }) => (
                      <Select
                        options={adults}
                        value={
                          adults
                            ? adults.find(option => option.value === field.value)
                            : ''
                        }
                        onChange={option =>
                          form.setFieldValue(field.name, option.value)
                        }
                      />
                    )}
                  />
                </Form.Group>
              </Form.Row>
              <Button type='submit'>Search</Button>
            </Form>
          </Wrapper>
        )}
      </Formik>
    </MainColumn>
  )
}

export default withRouter(ReservationForm)
