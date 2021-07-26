import React from 'react';
import { Input, InputProps } from '@chakra-ui/react';

const ThemedInput: React.FC<InputProps> = React.forwardRef(
  ({ onChange, onBlur, name, children, ...props }, ref: any) => (
    <Input color="white" onBlur={onBlur} onChange={onChange} name={name} ref={ref} {...props}>
      {children}
    </Input>
  )
);

export default ThemedInput;
