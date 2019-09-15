import React from 'react';
import styled from 'styled-components';
import Spinner from 'react-bootstrap/Spinner';
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Card from 'react-bootstrap/Card';

import MainColumn from '../components/MainColumn';
import TabPane, { Tab } from '../components/TabPane';

const GET_ADVERTS = gql`
  {
    cities {
      id
      name
      category
      description
    }
  }
`;

const Landing = () => {
  const { loading, error, data: adverts } = useQuery(GET_ADVERTS);
  let ads, categories = [], categoriesUnique;
  if (!loading) {
    ads = adverts.cities.filter(ad => ad.name !== "" && ad.category !== null);
    ads.forEach(ad => categories.push(ad.category));
    const categoriesSet = new Set(categories);
    categoriesUnique = [...categoriesSet];
  }

  if (loading) return <Spinner animation="grow" />;

  return (
    <MainColumn>
      <TabPane>
        {categoriesUnique.map(category => (
          <Tab key={category} title={category}> 
            {ads.filter(ad => ad.category === category).map(ad => (
                <Card key={ad.id}>
                  <Card.Title>{ad.name}</Card.Title>
                  <Card.Text>{ad.description}</Card.Text>
                </Card>
              )
            )}
          </Tab>
        ))}
        {/* <Tab title="All">
          {ads.map(ad => (
            <Card key={ad.id}>
              <Card.Title>{ad.name}</Card.Title>
              <Card.Text>{ad.description}</Card.Text>
            </Card>
            )
          )}
        </Tab> */}
      </TabPane>
    </MainColumn>
  );
}

export default Landing;
