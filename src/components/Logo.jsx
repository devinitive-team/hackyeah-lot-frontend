import React from 'react';
import styled from 'styled-components';
import logo from '../assets/logo_lot_en.svg';

const Img = styled.img`
  height: 60px;
`;

const Logo = () => <Img src={logo} />

export default Logo;
