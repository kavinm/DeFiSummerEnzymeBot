import React from 'react';
import { Input, InputProps } from '@chakra-ui/react';

const ThemedInput: React.FC<InputProps> = ({ children, ...props }) => {
  return (
    <Input color="white" {...props}>
      {children}
    </Input>
  );
};

export default ThemedInput;
