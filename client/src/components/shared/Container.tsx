import styled from '@emotion/styled';
import { Box } from '@chakra-ui/react';

const Container = styled(Box)`
  max-width: calc(1200px + 2rem);
  width: 100%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  color: white;

  @media (min-width: 768px) {
    max-width: calc(1200px + 4rem);
    padding-left: 2rem;
    padding-right: 2rem;
  }

  @media (min-width: 1024px) {
    max-width: calc(1200px + 8rem);
    padding-left: 4rem;
    padding-right: 4rem;
  }
`;

export default Container;
