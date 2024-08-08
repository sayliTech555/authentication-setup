import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Text, VStack, Button, Image, List, ListItem } from '@chakra-ui/react';
import uploadicon from "../../assets/upload.png";

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*', // You can customize the accepted file types
    onDrop: (acceptedFiles) => {
      // Handle file upload here
      setFiles(acceptedFiles);
      console.log(acceptedFiles);
    },
  });

  return (
    <VStack spacing={2} align="center">
      <Box
        {...getRootProps()}
        borderWidth={2}
        borderStyle="dashed"
        borderColor={isDragActive ? 'blue.500' : 'gray.300'}
        p={4}
        h={"60vh"}
        w={"100%"}
        borderRadius="md"
        textAlign="center"
      >
        <input {...getInputProps()} />
        <Button onClick={() => console.log('Upload button clicked')}>
          <Image src={uploadicon} />
        </Button>
        <Text textAlign={"center"} lineHeight="1">
          {isDragActive ? 'Drop the files here...' : <>Drag & drop files here, <br /> or <br /> click here to upload</>}
        </Text>
        <Box w={"500px"}>
        {files.length > 0 && (
          <List  spacing={3}>
            {files.map((file, index) => (
              <ListItem key={index}>
                {file.name}
              </ListItem>
            ))}
          </List>
        )}
      </Box>
      </Box>
      
    </VStack>
  );
};

export default FileUpload;
