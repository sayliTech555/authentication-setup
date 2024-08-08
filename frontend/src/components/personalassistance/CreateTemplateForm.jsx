import React, { useState } from 'react';
import { Box, Button, Input, FormControl, FormLabel, Text, Textarea, Stack, HStack, Checkbox, Select } from '@chakra-ui/react';
import ToggleBtn from './ToggleBtn';

const CreateTemplateForm = ({ formdata, setFormdata }) => {



  const handlechange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setFormdata({
      ...formdata,
      [name]: value
    })
  }

  return (
    <Box p={2} w={"100%"} shadow="md" borderWidth="1px">

      <FormControl>
        <FormLabel fontSize={"14px"} >Objective</FormLabel>
        <Input
          placeholder="Eg: Provide list of events in the doc"
          name="objective"
          value={formdata.objective}
          onChange={handlechange}
          isRequired
          fontSize="sm"
        />
        <Text fontSize={"12px"} color="red.500">Mandatory text</Text>
      </FormControl>
      <FormControl mt={4}>
        <FormLabel fontSize={"14px"}>Details</FormLabel>
        <Input
          fontSize="sm"
          placeholder="Eg: List of events by location, time, or person"
          value={formdata.details}
          name="details"
          onChange={handlechange}
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel fontSize={"14px"}>Suggestions</FormLabel>
        <Input
          placeholder="Eg: Provide output in Polish"
          value={formdata.suggestions}
          name="suggestions"
         fontSize="sm"
          onChange={handlechange}
        />
      </FormControl>
      <Box>
        <Stack direction="column" >
          <HStack spacing={2} fontSize="sm">
            <Checkbox > <Box ><Text fontSize="sm">AI Websearch</Text></Box></Checkbox>
            <Checkbox ><Box fontSize="sm">Tabular</Box></Checkbox>
            <Select w={"150px"} p={0} placeholder='Select language'fontSize="sm" >
              <option value='en'>English</option>
              <option value='es'>Polish</option>
              <option value='fr'>French</option>
            </Select>
          </HStack>
        </Stack>


      </Box>
    <ToggleBtn/>
    </Box>
  );
};

export default CreateTemplateForm;
