import React from 'react';
import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import Helmet from 'react-helmet';
import Cookie from '../components/Cookie';
import Link from '../components/Link';
import OptionalText from '../components/OptionalText';
import useCookieConsent from '../hooks/useCookieConsent';

// yuck!
import '@fontsource/raleway/100.css';
import '@fontsource/raleway/100-italic.css';
import '@fontsource/raleway/200.css';
import '@fontsource/raleway/200-italic.css';
import '@fontsource/raleway/300.css';
import '@fontsource/raleway/300-italic.css';
import '@fontsource/raleway/400.css';
import '@fontsource/raleway/400-italic.css';
import '@fontsource/raleway/500.css';
import '@fontsource/raleway/500-italic.css';
import '@fontsource/raleway/600.css';
import '@fontsource/raleway/600-italic.css';
import '@fontsource/raleway/700.css';
import '@fontsource/raleway/700-italic.css';
import '@fontsource/raleway/800.css';
import '@fontsource/raleway/800-italic.css';
import '@fontsource/raleway/900.css';
import '@fontsource/raleway/900-italic.css';

const HomePage = () => {
  const { consent, hasConsent } = useCookieConsent('bpk-cookie-consent');

  return (
    <React.Fragment>
      <Helmet>
        <html lang="en" />
        <title>Brian Patrick Kemper</title>
      </Helmet>
      <Grid gap={0} minHeight="100vh" templateColumns="repeat(16, 1fr)">
        <GridItem
          borderColor="color-gray-300"
          borderLeftWidth="1px"
          borderRightWidth="1px"
          borderStyle="dashed"
          colStart={2}
          colSpan={10}
        >
          <Flex direction="column" minHeight="100vh" padding="4">
            <Flex as="main" alignItems="center" flexGrow="2">
              <Stack marginBottom="8">
                <Heading as="h1" fontWeight="hairline" size="4xl">
                  Brian <OptionalText>Patrick</OptionalText> Kemper
                </Heading>
                <Box>
                  <Badge
                    fontSize={['xs', 'xs', 'xs', 'sm']}
                    fontWeight="light"
                    transition=".5s"
                  >
                    <OptionalText>Software Engineering</OptionalText>
                    Manager{' '}
                    <Link href="//twitter.com/SparkPost">@SparkPost</Link>
                  </Badge>
                </Box>
              </Stack>
            </Flex>
            <Box as="footer">
              <Text color="color-gray-600">
                Built with{' '}
                <Link href="//chakra-ui.com/">
                  {'<'}Chakra {'/>'}
                </Link>{' '}
                and{' '}
                <Link href="//design.sparkpost.com/">
                  {'{'} Matchbox {'}'}
                </Link>
                . Uses <Cookie /> for Google Analytics.{' '}
                {!hasConsent && (
                  <Button
                    size="xs"
                    onClick={() => {
                      consent();
                    }}
                  >
                    COOL?
                  </Button>
                )}
              </Text>
            </Box>
          </Flex>
        </GridItem>
        <GridItem colSpan={5}>{/* space for fun */}</GridItem>
      </Grid>
    </React.Fragment>
  );
};

export default HomePage;
