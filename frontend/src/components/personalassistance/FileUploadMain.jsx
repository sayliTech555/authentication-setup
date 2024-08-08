import { Box, Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from '@chakra-ui/react'
import React from 'react'
import FileUpload from './FileUpload'

function FileUploadMain() {
  return (
    <Box >
        <VStack>
        <Tabs border={"1px solid lightgray"}>
        <TabList justifyContent={"space-between"}>
        <Tab sx={{ fontSize: '14px', padding: '2', margin: '0' }}>Upload File</Tab>
        <Tab sx={{ fontSize: '14px', padding: '2', margin: '0' }}>Cloud Search</Tab>
        <Tab sx={{ fontSize: '14px', padding: '2', margin: '0' }}>Other Data Sources</Tab>
        <Tab sx={{ fontSize: '14px', padding: '2', margin: '0' }}>Partner Integration</Tab>
      </TabList>

  <TabPanels>
    <TabPanel>
      <FileUpload/>
    </TabPanel>
    <TabPanel>
        <Box p={4}
        h={"300px"}
        w={"500px"}>
      <p >Cloud Search</p>

        </Box>
    </TabPanel>
    <TabPanel>
    <Box p={4}
        h={"300px"}
        w={"500px"}>
      <p >Other Data Sources</p>

        </Box>
     
    </TabPanel>
    <TabPanel>
    <Box p={4}
        h={"300px"}
        w={"500px"}>
      <p >Partner Integration</p>

        </Box>
    </TabPanel>
  </TabPanels>
</Tabs>
        </VStack>
    </Box>
  )
}

export default FileUploadMain