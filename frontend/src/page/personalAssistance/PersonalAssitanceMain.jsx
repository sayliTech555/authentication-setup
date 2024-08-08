import { Box, VStack } from '@chakra-ui/react'
import React from 'react'
import CreateTemplate from '../../components/personalassistance/CreateTemplate'
import TemplateObjective from '../../components/personalassistance/TemplateObjective'

function PersonalAssitanceMain() {
  return (
    <Box >
        <VStack>
            <CreateTemplate/>
            <TemplateObjective/>
        </VStack>
    </Box>
  )
}

export default PersonalAssitanceMain