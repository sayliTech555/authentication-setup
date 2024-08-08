import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Input, FormControl, FormLabel, Text, Textarea, Stack } from '@chakra-ui/react';
import ToggleBtn from './ToggleBtn';
import { FormDataContext } from '../../Context/FormContext';

const ObjectiveForm = () => {
  const { formdataStore, setformdataStore} = useContext(FormDataContext);
  const [objectForm,setObjectForm]=useState({
    objective:"",
    details:"",
    suggestions:""
  })
 

  useEffect(()=>{
    setObjectForm(formdataStore)
  },[formdataStore])

  return (
    <Box w={"100%"} p={2} shadow="md" borderWidth="1px">
      <FormControl>
        <FormLabel>Objective :</FormLabel>
        <Input
          placeholder="Eg: Provide list of events in the doc"
          value={objectForm.objective}
          fontSize={"14px"}
          isRequired
        />
        <Text fontSize={"sm"} color="red.500">Mandatory text</Text>
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Details :</FormLabel>
        <Input
          placeholder="Eg: List of events by location, time, or person"
          fontSize={"14px"}
          value={objectForm.details}
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Suggestions :</FormLabel>
        <Input
          placeholder="Eg: Provide output in Polish"
          fontSize={"14px"}
          value={objectForm.suggestions}
        />
      </FormControl>
      <Stack direction="column" mt={4}>
        <ToggleBtn/>
      </Stack>
      <Box display="flex" justifyContent="center" mt={4}>
        <Button bgGradient='linear(to-r, blue.600, purple.500)'>Submit</Button>
      </Box>
    </Box>
  );
};

export default ObjectiveForm;
