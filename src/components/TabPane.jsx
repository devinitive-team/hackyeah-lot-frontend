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
  height: 35px;
  line-height: 19px;
  text-align: center;
  background: ${({ active, theme }) => (active ? theme.color.primary : '#fff')};
  transition: all 250ms ease-in;
  border: none;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  user-select: none;
  margin: 20px 8px 0px 8px;
  border-radius: 5px;
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
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