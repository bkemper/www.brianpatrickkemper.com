import { extendTheme } from '@chakra-ui/react';
import { meta } from '@sparkpost/design-tokens';

// group tokens by type
const tokens = meta.reduce(
  (acc, { name, type, value }) => ({
    ...acc,
    [type]: {
      ...acc[type],
      [name]: value,
    },
  }),
  {}
);

const theme = extendTheme({
  colors: tokens.color,
  components: {},
});

export default theme;
