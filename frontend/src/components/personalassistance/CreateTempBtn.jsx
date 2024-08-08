import { ChevronDownIcon } from '@chakra-ui/icons'
import { Button, Menu, MenuButton, MenuItem, MenuList, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, useDisclosure, ModalFooter, Text } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import CreateTemplateForm from './CreateTemplateForm'
import { FormDataContext } from '../../Context/FormContext'

function CreateTemplateBtn() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { formdataStore, setformdataStore} = useContext(FormDataContext);
  const [formdata,setFormdata]=useState({
    objective:"",
    details:"",
    suggestions:""
  })

  const createdTemplateHnadle=()=>{
    console.log("formdata123",formdata)
    setformdataStore(formdata)
  }
 
  return (
    <div>
      <Menu h={"2vh"} w={"100%"}>
        {({ isOpen: menuIsOpen }) => (
          <>
            <MenuButton 
              bgGradient='linear(to-r, blue.500, purple.500)'
              isActive={menuIsOpen} 
              as={Button} 
              rightIcon={<ChevronDownIcon />}
            >
              Create Template
            </MenuButton>
            <MenuList>
              <MenuItem onClick={onOpen} >Create New Template</MenuItem>
              <MenuItem onClick={() => alert('Existing Template')}>Existing Template</MenuItem>
            </MenuList>
          </>
        )}
      </Menu>

      {/* Modal */}
      <Modal w={"80%"} p={0} isOpen={isOpen} onClose={onClose} size="lg">
  <ModalOverlay />
  <ModalContent >
    <ModalHeader m={0} p={1}>Create Template
        
    </ModalHeader>
    <Text pl={2} fontSize="md">
        Create a business template which then gets automatically saved in existing templates
      </Text>
    <ModalCloseButton />
    <ModalBody m={0} p={2}>
      <CreateTemplateForm formdata={formdata} setFormdata={setFormdata}/>
    </ModalBody>

    <ModalFooter>
      <Button  mr={3} onClick={onClose}>
        Cancel
      </Button>
      <Button onClick={createdTemplateHnadle} bgGradient='linear(to-r, blue.500, purple.500)'  variant="ghost">Save</Button>
    </ModalFooter>
  </ModalContent>
</Modal>

    </div>
  )
}

export default CreateTemplateBtn
