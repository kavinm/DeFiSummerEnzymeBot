import React from 'react';
import {
  Text,
  Button,
  useColorModeValue,
  VisuallyHidden,
  Flex,
  ButtonProps
} from '@chakra-ui/react';
import { FaDribbble, FaFacebook, FaGithub, FaInstagram, FaTwitter, } from 'react-icons/fa';



interface SocialButtonProps extends ButtonProps {
  label: string
  href: string
}

const SocialButton:React.FC<SocialButtonProps> = ({
  children,
  label,
  href,
  ...props
} ) => {
  return (
    <Button
      bg={useColorModeValue('accentSurface','accentSurface')}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{background:"transparent",
      }}
      _active={{background:"transparent"}}
      p="0px"
      {...props}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </Button>
  );
};

const Footer: React.FC = () => {
  return (
    <Flex
      color="gray.400"
      justifyContent="space-between"
      position="absolute"
      bottom="0px"
      w="100%"
      p="20px"
      h="64px"
    >
      <Text color="gray.400" as="span"  > &copy; 2021 App.Enzyme. All rights reserved</Text>
      <Flex justifyContent="space-around"  direction={'row'}  >
           <SocialButton label={'Facebook'} href={'#'} mr="28px">
           <FaFacebook fontSize="20px"/>
          </SocialButton> 
          
          <SocialButton label={'Instagram'} href={'#'} mr="28px">
          <FaInstagram fontSize="20px"  />
          </SocialButton>
          
          <SocialButton label={'Twitter'} href={'#'} mr="28px">
          <FaTwitter fontSize="20px" />  
          </SocialButton>
          
           <SocialButton label={'Github'} href={'#'} mr="28px">
           <FaGithub fontSize="20px" />
           </SocialButton>
           <SocialButton label={'Dribbble'} href={'#'}>
           <FaDribbble fontSize="20px" />
          </SocialButton> 
          
        </Flex>
    </Flex>
  );
}

export default Footer;

