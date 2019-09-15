import React from 'react'
import styled from 'styled-components'
import Spinner from 'react-bootstrap/Spinner'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'

import Card from 'react-bootstrap/Card'

import MainColumn from '../components/MainColumn'
import TabPane, { Tab } from '../components/TabPane'

const CardStyled = styled(Card)`
  padding: 15px;
  margin-top: 20px;
`

const LinkStyled = styled(Link)`
  color: #000;
  &:hover {
    text-decoration: none;
    background-color: ${({ theme }) => theme.color.primary};
    opacity: 0.7;
  }
`

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

const Landing = () => {
  const { loading, data: adverts } = useQuery(GET_ADVERTS)
  let ads

  let categories = []

  let categoriesUnique
  if (!loading) {
    ads = adverts.cities.filter(ad => ad.name !== '' && ad.category !== null)
    ads.forEach(ad => categories.push(ad.category))
    const categoriesSet = new Set(categories)
    categoriesUnique = [...categoriesSet]
    categoriesUnique.push('All')
  }

  if (loading) return <Spinner animation='grow' />

  return (
    <MainColumn>
      <TabPane>
        {categoriesUnique.map(category => (
          <Tab key={category} title={category}>
            {ads
              .filter(ad => ad.category === category || category === 'All')
              .map(ad => (
                <LinkStyled to={`reservation/?destination=${ad.code}`}>
                  <CardStyled key={ad.id}>
                    <Card.Img variant='down' src={`${ad.imagesBig[0]}`} />
                    <Card.Title style={{ marginTop: 10 }}>{ad.name}</Card.Title>
                    <Card.Text>{ad.description}</Card.Text>
                  </CardStyled>
                </LinkStyled>
              ))}
          </Tab>
        ))}
      </TabPane>
    </MainColumn>
  )
}

export default Landing
