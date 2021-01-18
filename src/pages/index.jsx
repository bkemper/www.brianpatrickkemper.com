import React from 'react';
// import {
//   Badge,
//   Box,
//   Container,
//   Heading,
//   Link,
//   Stack,
// } from '@chakra-ui/react';
// import { motion } from 'framer-motion';
import Helmet from 'react-helmet'

const HomePage = () => {
  return (
    <React.Fragment>
      <Helmet>
        <html lang="en" />
        <title>Brian Patrick Kemper</title>
      </Helmet>
      <main>
        Hi
        {/* <Container marginTop="96" maxWidth="5xl">
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
        </Container> */}
      </main>
    </React.Fragment>
  );
};

export default HomePage;
