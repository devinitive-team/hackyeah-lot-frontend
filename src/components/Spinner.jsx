import React from 'react'
import styled from 'styled-components'
import Spinner from 'react-bootstrap/Spinner';

const Wrapper = styled.div`
  height: calc(100vh - 100px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default () => (
  <Wrapper>
    <Spinner animation='grow' variant='primary'/>
  </Wrapper>
)

