import React, { useState } from 'react';
import {  Box, Switch, FormControl, FormLabel, Tooltip, HStack } from '@chakra-ui/react';
import ButtonHoverEffect from './SlideButton';

function ToggleBtn() {
  const [showButtons, setShowButtons] = useState(false);

  const handleToggle = () => {
    setShowButtons(!showButtons);
  };

  return (
    <Box justifyContent={"space-between"} w={"100%"} display={"flex"} p={1}>
      <Box>
        {showButtons && (
          <HStack>
            <ButtonHoverEffect title="Summary"/>
            <ButtonHoverEffect title="Inference"/>
            <ButtonHoverEffect title="Factual"/>
          </HStack>
          // <Tabs variant='unstyled' colorScheme='green'>
          //   <TabList fontSize={"14px"} p={0} m={0}>
          //     <Tab _selected={{ color: 'white', bgGradient: 'linear(to-r, blue.500, purple.500)', borderRadius: "10px" }} p={1} m={0}>Factual</Tab>
          //     <Tab _selected={{ color: 'white', bgGradient: 'linear(to-r, blue.500, purple.500)', borderRadius: "10px" }} p={1} m={0}>Inference</Tab>
          //     <Tab _selected={{ color: 'white', bgGradient: 'linear(to-r, blue.500, purple.500)', borderRadius: "10px" }} p={1} m={0}>Summary</Tab>
          //   </TabList>
          // </Tabs>
        )}
      </Box>
      <Box>
        <Tooltip label={!showButtons && "Click for advanced settings"} aria-label="A tooltip" bgGradient='linear(to-r, blue.500, purple.400)'>
          <FormControl display="flex" alignItems="center" >
            <FormLabel fontSize={"14px"} htmlFor="advanced-settings" mb="0">
              Advanced Settings
            </FormLabel>
            <Switch id="advanced-settings" onChange={handleToggle} isChecked={showButtons} />
          </FormControl>
        </Tooltip>
      </Box>
    </Box>
  );
}

export default ToggleBtn;
