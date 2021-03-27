import React from 'react';
import { Link as ChakraLink } from '@chakra-ui/react';
import { ArrowUpIcon } from '@chakra-ui/icons';

const Link = ({ _focus, _hover, children, href, ...props }) => {
  const isExternal = /^(http|\/\/)/.test(href);

  return (
    <ChakraLink
      {...props}
      color="color-blue-600"
      fontWeight="medium"
      href={href}
      rel={isExternal ? 'noopener' : undefined}
      target={isExternal ? '_blank' : '_self'}
      transition=".5s ease-in-out"
      whiteSpace="nowrap"
      _focus={{
        ..._focus,
        color: 'color-blue-800',
        textDecoration: 'none',
      }}
      _hover={{
        ..._hover,
        color: 'color-blue-800',
        textDecoration: 'none',
      }}
    >
      {children} {isExternal && <ArrowUpIcon transform="rotate(45deg)" />}
    </ChakraLink>
  );
};

export default Link;
