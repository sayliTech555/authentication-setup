import React from 'react';
import FileUploadMain from './FileUploadMain';
import ObjectiveForm from './ObjectiveForm';
import { Flex, Box } from '@chakra-ui/react';

function TemplateObjective() {
  return (
    <Flex
      
      direction={{ base: 'column', md: 'row' }}  
      w="100%"
      maxW="100%"
      mx="auto"
      justifyContent="space-between"
      align="flex-start"  
    >
      <Box flex="1" mb={{ base: 4, md: 0 }}>  
        <FileUploadMain />
      </Box>
      <Box flex="1">
        <ObjectiveForm />
      </Box>
    </Flex>
  );
}

export default TemplateObjective;
