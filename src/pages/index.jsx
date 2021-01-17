import React from 'react';
import {
  Badge,
  Box,
  ChakraProvider,
  Container,
  extendTheme,
  Heading,
  Link,
  Stack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Helmet from 'react-helmet'

const theme = extendTheme({
  colors: {
    brand: {
      blue: '#1273e6',
      orange: '#fa6423',
    },
  },
});

const HomePage = () => {
  return (
    <ChakraProvider theme={theme}>
      <Helmet>
        <html lang="en" />
        <title>Brian Patrick Kemper</title>
      </Helmet>
      <main>
        <Container marginTop="96" maxWidth="5xl">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Stack spacing="2">
              <Heading as="h1" fontWeight="lighter" size="4xl">
                Brian Patrick Kemper
              </Heading>
              <Box>
                <Badge fontSize="md">
                  Software Engineering Manager{' '}
                  <Link color="brand.blue" href="//twitter.com/SparkPost">
                    @SparkPost
                  </Link>
                </Badge>
              </Box>
            </Stack>
          </motion.div>
        </Container>
      </main>
    </ChakraProvider>
  );
};

export default HomePage;
