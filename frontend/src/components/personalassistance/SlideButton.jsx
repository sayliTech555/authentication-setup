import React from 'react';
import { Box } from '@chakra-ui/react';

const SlideButton = ({ title }) => {
  return (
    <Box  className="container" textAlign="center" pt="2px" mx="auto">
      <Box
        as="a"
        href="#"
        display="inline-block"
        p="0.2rem 0.5rem"
        borderRadius="full"
        color="#fff"
        textTransform="uppercase"
        fontSize="xs" 
        transition="all 0.3s"
        position="relative"
        overflow="hidden"
        zIndex="1"
        _after={{
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'blue.300',
          borderRadius: 'full',
          zIndex: -2,
        }}
        _before={{
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '0%',
          height: '100%',
          // backgroundColor: 'purple.400',
          bgGradient:'linear(to-r, blue.400,blue.600,purple.600)',
          transition: 'all 0.3s',
          borderRadius: 'full',
          zIndex: -1,
        }}
        _hover={{
          color: '#fff',
          _before: {
            width: '100%',
          },
        }}
      >
        {title}
      </Box>
    </Box>
  );
};

export default SlideButton;
