import React from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';

import MainColumn from './MainColumn';

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 10px;
`;

const Categories = () => (
  <MainColumn>
    <Flex>
      <Button>Kids</Button>
      <Button>Winter holiday</Button>
      <Button>Summer holiday</Button>
      <Button>Inspiration</Button>
    </Flex>
  </MainColumn>
);

export default Categories;