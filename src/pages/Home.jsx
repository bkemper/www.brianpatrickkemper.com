import React from 'react';
import Actions from '../components/Actions';
import Headline from '../components/Headline';
import Link from '../components/Link';
import Page from '../components/Page';
import Subhead from '../components/Subhead';

// @see https://hackernoon.com/react-stateless-functional-components-nine-wins-you-might-have-overlooked-997b0d933dbc
const Home = () => (
  <Page title="Brian Patrick Kemper">
    <Headline>Brian Patrick Kemper</Headline>
    <Subhead>
      Software Engineer <Link color="orange" href="https://twitter.com/SparkPost" text="@SparkPost" />
    </Subhead>
    <Actions>
      <Link href="https://github.com/bkemper" icon="Github" />
      <Link href="https://www.linkedin.com/in/brianpatrickkemper" icon="Linkedin" />
      <Link href="https://twitter.com/aBrianKemper" icon="Twitter" />
    </Actions>
  </Page>
);

export default Home;
