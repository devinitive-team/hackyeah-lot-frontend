import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Formik, Field } from 'formik';
import Select from 'react-select';
import * as yup from 'yup';
import queryString from 'query-string';

import renameProp from '../utils/renameProp';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';

import MainColumn from '../components/MainColumn';

import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const schema = yup.object({
  origin: yup.string().required(),
  destination: yup.string(),
  departureDate: yup.string().required(),
  returnDate: yup.string().required(),  


  // firstName: yup.string().required(),
  // lastName: yup.string().required(),
  // username: yup.string().required(),
  // city: yup.string().required(),
  // state: yup.string().required(),
  // zip: yup.string().required(),
  // terms: yup.bool().required(),
});

const GET_AIRPORTS = gql`
  {
    cities {
      name
      code
    }
  }
`;

const tripType = [
  { value: 'R', label: 'Round-trip flight' },
  { value: 'O', label: 'One-way flight' },
]

const cabinClass = [
  { value: 'E', label: 'Economy' },
  { value: 'B', label: 'Business' },
  { value: 'F', label: 'First' },
]

const dates = [
  { value: '15092019', label: '15 September 2019' },
  { value: '16092019', label: '16 September 2019' },
  { value: '17092019', label: '17 September 2019' },
  { value: '18092019', label: '18 September 2019' },
  { value: '19092019', label: '19 September 2019' },
  { value: '20092019', label: '20 September 2019' },
  { value: '21092019', label: '21 September 2019' },
  { value: '22092019', label: '22 September 2019' },
  { value: '23092019', label: '23 September 2019' },
  { value: '25092019', label: '25 September 2019' },
  { value: '26092019', label: '26 September 2019' },
  { value: '27092019', label: '27 September 2019' },
  { value: '28092019', label: '28 September 2019' },
  { value: '29092019', label: '29 September 2019' },
  { value: '30092019', label: '30 September 2019' },
]

const ReservationForm = ({location}) => {
  const { loading, error, data: airports_data } = useQuery(GET_AIRPORTS);
  let airports;
  if (!loading) {
    const renameLabel = airports_data.cities.filter(airport => airport.name !== "");
    const renameValue = renameLabel.map(airport => renameProp('name', 'label', airport));
    airports = renameValue.map(airport => renameProp('code', 'value', airport))
  }

  const defaultOrigin = queryString.parse(location.search).origin || 'WAW';

  return (
    <MainColumn>
      <Formik
        validationSchema={schema}
        onSubmit={(values) => {
          console.log(values);
        }}
        initialValues={{
          origin: defaultOrigin,
          destination: '',
          departureDate: '',
          returnDate: '',
          tripType: 'R',
          cabinClass: 'E',
        }}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          touched,
          isValid,
          setFieldValue,
          errors,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} md="8" controlId="validationFormikFlightOrigin">
                <Form.Label>From</Form.Label>
                <Field
                  name='origin'
                  render={({form, field}) => (
                  <Select
                    options={airports}
                    value={airports ? airports.find(option => option.value === field.value) : ''}
                    onChange={(option) => form.setFieldValue(field.name, option.value)}
                  />)}
                />
              </Form.Group>
              <Form.Group as={Col} md="8" controlId="validationFormikFlightDestination">
                <Form.Label>To</Form.Label>
                <Field
                  name='destination'
                  render={({form, field}) => (
                  <Select
                    options={airports}
                    value={airports ? airports.find(option => option.value === field.value) : ''}
                    onChange={(option) => form.setFieldValue(field.name, option.value)}
                  />)}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md="2" controlId="validationFormikDepartureDate">
                <Form.Label>Departure date</Form.Label>
                <Field
                  name='departureDate'
                  render={({form, field}) => (
                  <Select
                    options={dates}
                    value={dates ? dates.find(option => option.value === field.value) : ''}
                    onChange={(option) => form.setFieldValue(field.name, option.value)}
                  />)}
                />
              </Form.Group>
              <Form.Group as={Col} md="2" controlId="validationFormik">
                <Form.Label>Return date</Form.Label>
                <Field
                  name='returnDate'
                  render={({form, field}) => (
                  <Select
                    options={dates}
                    value={dates ? dates.find(option => option.value === field.value) : ''}
                    onChange={(option) => form.setFieldValue(field.name, option.value)}
                  />)}
                />
              </Form.Group>
              <Form.Group as={Col} md="2" controlId="validationFormikDepartureDate">
                <Form.Label>Trip type</Form.Label>
                <Field
                  name='tripType'
                  render={({form, field}) => (
                  <Select
                    options={tripType}
                    value={tripType ? tripType.find(option => option.value === field.value) : ''}
                    onChange={(option) => form.setFieldValue(field.name, option.value)}
                  />)}
                />
              </Form.Group>
              <Form.Group as={Col} md="2" controlId="validationFormikDepartureDate">
                <Form.Label>Cabin class</Form.Label>
                <Field
                  name='cabinClass'
                  render={({form, field}) => (
                  <Select
                    options={cabinClass}
                    value={cabinClass ? cabinClass.find(option => option.value === field.value) : ''}
                    onChange={(option) => form.setFieldValue(field.name, option.value)}
                  />)}
                />
              </Form.Group>
            </Form.Row>
            {/* <Form.Row>
              <Form.Group as={Col} md="4" controlId="validationFormik01">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  isValid={touched.firstName && !errors.firstName}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationFormik02">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  isValid={touched.lastName && !errors.lastName}
                />

                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationFormikUsername">
                <Form.Label>Username</Form.Label>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    aria-describedby="inputGroupPrepend"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    isInvalid={!!errors.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md="6" controlId="validationFormik03">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="City"
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  isInvalid={!!errors.city}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.city}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationFormik04">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="State"
                  name="state"
                  value={values.state}
                  onChange={handleChange}
                  isInvalid={!!errors.state}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.state}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationFormik05">
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Zip"
                  name="zip"
                  value={values.zip}
                  onChange={handleChange}
                  isInvalid={!!errors.zip}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.zip}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Group>
              <Form.Check
                required
                name="terms"
                label="Agree to terms and conditions"
                onChange={handleChange}
                isInvalid={!!errors.terms}
                feedback={errors.terms}
                id="validationFormik0"
              />
            </Form.Group> */}
            <Button type="submit">Search</Button>
          </Form>
        )}
      </Formik>
    </MainColumn>
  );
}

export default ReservationForm;

