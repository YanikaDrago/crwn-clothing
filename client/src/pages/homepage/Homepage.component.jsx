import React, { Profiler } from 'react';

import Directory from '../../components/directory/Directory.component';

import { HomePageContainer } from './homepage.styles';

const HomePage = () => (
  <Profiler 
    id='Directory'
    onRender={(id, phase, actualDuration) => {
        console.log({
            id,
            phase,
            actualDuration
        });
    }}
  >
    <HomePageContainer>
      <Directory />
    </HomePageContainer>
  </Profiler>
);

export default HomePage;
