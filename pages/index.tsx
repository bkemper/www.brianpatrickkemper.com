import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Stack,
  Tag,
  Text,
} from '@chakra-ui/react';
import TagManager from 'react-gtm-module';
import Cookie from '../components/Cookie';
import Link from '../components/Link';
import OptionalText from '../components/OptionalText';
import TextLink from '../components/TextLink';
import useCookieConsent from '../hooks/useCookieConsent';
import fadeIn from '../keyframes/fadeIn';
import logo from '../public/logo.png';

const Home: NextPage = () => {
  const { consent, hasConsent } = useCookieConsent('bpk-cookie-consent');

  React.useEffect(() => {
    const gtmId = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID;

    if (hasConsent === 'yes' && gtmId) {
      TagManager.initialize({ gtmId });
    }
  }, [hasConsent]);

  return (
    <>
      <Head>
        <title>Brian Patrick Kemper</title>
        <meta
          name="description"
          content="Welcome to www.BrianPatrickKemper.com"
        />
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="minimum-scale=1, width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Grid gap={0} minHeight="100vh" templateColumns="repeat(16, 1fr)">
        <GridItem colSpan={1}>
          <Box padding="25%">
            <Image
              alt="Brian Patrick Kemper"
              height="75%"
              src={logo}
              width="75%"
            />
          </Box>
        </GridItem>
        <GridItem
          borderColor="color-gray-300"
          borderLeftWidth="1px"
          borderRightWidth="1px"
          borderStyle="dashed"
          colSpan={11}
        >
          <Flex direction="column" minHeight="100vh" padding="4">
            <Flex as="main" alignItems="center" grow={1}>
              <Stack marginBottom="8">
                <Heading as="h1" fontWeight="hairline" size="4xl">
                  Brian <OptionalText>Patrick</OptionalText> Kemper
                </Heading>
                <Box>
                  <Tag fontSize={['sm', 'sm', 'sm', 'md']} transition=".5s">
                    <Link href="//www.linkedin.com/in/brianpatrickkemper/">
                      <OptionalText>Staff Front End</OptionalText>
                      Engineer at Facet
                    </Link>
                  </Tag>
                </Box>
              </Stack>
            </Flex>
            <Box as="footer">
              <Text color="color-gray-600">
                Built with <TextLink href="//chakra-ui.com/">Chakra</TextLink>{' '}
                and <TextLink href="//design.sparkpost.com/">Matchbox</TextLink>
                . Uses <Cookie /> for Google Analytics.{' '}
                {hasConsent === 'no' && (
                  <Button
                    animation={`${fadeIn} 1s`} // Fade is a block element
                    size="xs"
                    onClick={() => {
                      consent();
                    }}
                  >
                    Cool?
                  </Button>
                )}
              </Text>
            </Box>
          </Flex>
        </GridItem>
        <GridItem colSpan={3}>{/* space for fun */}</GridItem>
      </Grid>
    </>
  );
};

export default Home;
