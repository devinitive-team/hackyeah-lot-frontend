import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;
const TabLabel = styled.div`
  padding: 8px 10px;
  color: ${({ active, theme }) => (active ? '#fff' : theme.color.primary)};
  min-width: 60px;
  height: 50px;
  line-height: 33px;
  text-align: center;
  background: ${({ active, theme }) => (active ? theme.color.primary : '#fff')};
  transition: all 250ms ease-in;
  border-top: ${({theme}) => theme.border};
  border-bottom: ${({theme}) => theme.border};
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  user-select: none;
  
  &:first-child {
    border-left: ${({theme}) => theme.border};
    border-radius: 5px 0 0 5px;
    padding-left: 16px;
  }
  &:last-child {
    border-right: ${({theme}) => theme.border};
    border-radius: 0 5px 5px 0;
    padding-right: 16px;
  }
`;

export const Tab = styled.div``;

const TabPane = ({ defaultTab = 0, children }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const initialTabState = children.map(child => ({
    title: child.props.title,
    body: child.props.children
  }));

  return (
    <>
      <Wrapper>
        {initialTabState.map((tab, index) => (
          <TabLabel
            key={tab.title}
            active={index === activeTab}
            onClick={() => setActiveTab(index)}
          >
            {tab.title}
          </TabLabel>
        ))}
      </Wrapper>
      {initialTabState[activeTab].body}
    </>
  );
};

export default TabPane;