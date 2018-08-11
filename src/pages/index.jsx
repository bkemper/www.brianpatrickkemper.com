import React from 'react';
import Actions from '../components/Actions';
import Headline from '../components/Headline';
import Link from '../components/Link';
import Page from '../components/Page';
import Subhead from '../components/Subhead';

// @see https://hackernoon.com/react-stateless-functional-components-nine-wins-you-might-have-overlooked-997b0d933dbc
const HomePage = (props) => (
  <Page title="Brian Patrick Kemper">
    <Headline>Brian Patrick Kemper</Headline>
    <Subhead>
      Software Engineer <Link color="orange" href="//twitter.com/SparkPost" text="@SparkPost" />
    </Subhead>
    <Actions>
      <Link href="//github.com/bkemper" icon="Github" />
      <Link href="//www.linkedin.com/in/brianpatrickkemper" icon="Linkedin" />
      <Link href="//twitter.com/aBrianKemper" icon="Twitter" />
    </Actions>
  </Page>
);

export default HomePage;
