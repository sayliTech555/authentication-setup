import { Box, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import CreateTemplateBtn from './CreateTempBtn'

export default function CreateTemplate() {
  return (
    <Box w={"95%"} >
        <HStack w={"full"} justifyContent={"space-between"}>
            <Box>
                <Text>File Upload</Text>
            </Box>
            <Box>
                <CreateTemplateBtn/>
            </Box>
        </HStack>
    </Box>
  )
}
