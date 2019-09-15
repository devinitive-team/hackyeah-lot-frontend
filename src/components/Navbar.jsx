import React from 'react';
import styled from 'styled-components';

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import Logo from './Logo';

const Nav = styled.nav`
  background: ${({theme}) => theme.color.background};
  display: flex;
  flex-direction: row;
  width: 100vw;
  align-items: center;
  height: 100px;
  border-bottom: ${({theme}) => theme.border};
`;

const Wrapper = styled.div`
  width: 100vw;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const InputGroupStyled = styled(InputGroup)`

  margin-bottom: 0 !important;
  margin-left: 40px;
  width: 400px;
`;

const Navbar = () => (
  <Nav>
    <Wrapper>
      <Logo />
        <InputGroupStyled className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1"><span role="img" aria-label=''>🔍</span></InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="Search for places"
            aria-label="Search for places"
            aria-describedby="basic-addon1"
          />
        </InputGroupStyled>
    </Wrapper>
  </Nav>
);

export default Navbar;