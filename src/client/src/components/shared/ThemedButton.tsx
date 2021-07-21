import React from 'react';
import { ButtonProps, Button } from '@chakra-ui/react';

const ThemedButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Button
      backgroundColor="primary"
      border="1px transparent solid"
      _hover={{
        backgroundColor: 'primaryDark',
      }}
      _active={{
        backgroundColor: 'primaryDark',
        border: '1px solid',
        borderColor: 'primaryLight',
      }}
      fontWeight="500"
      display="block"
      {...props}
    >
      {children}
    </Button>
  );
};

export default ThemedButton;
