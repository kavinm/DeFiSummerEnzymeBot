import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import uuid from "react-uuid";

import { ReactComponent as EnzymeLogo } from "../../assets/logo/enzyme.svg";
import { ReactComponent as Avatar } from "../../assets/logo/avatar.svg";

const links = [
  { id: uuid(), label: "Automated Strategy", url: "/automated-strategy" },
  { id: uuid(), label: "Liquidate", url: "/liquidate" },
  { id: uuid(), label: "Rebalance Portfolio", url: "/rebalance-portfolio" },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <Box width="230px" position="relative" backgroundColor="accentCards">
      <Box m="1rem">
        <EnzymeLogo />
        <Box as="ul" mt="2rem">
          {links.map((link) => (
            <Link key={link.id} to={link.url}>
              <Box
                as="li"
                listStyleType="none"
                padding="8px 12px"
                fontWeight="medium"
                height="40px"
                borderRadius="6px"
                mb="0.25rem"
                color="gray.300"
                {...(location.pathname === link.url && {
                  backgroundColor: "accentSurface",
                  color: "white",
                })}
              >
                {link.label}
              </Box>
            </Link>
          ))}
        </Box>
      </Box>
      <Box h="calc(100vh - 100px)" />
      <Flex
        alignItems="center"
        justifyContent="space-around"
        px="0.75rem"
        height="72px"
        borderTop="1px solid"
        borderColor="accentOutlines"
        w="228px"
      >
        <Box w="40px" h="40px">
          <Avatar />
        </Box>
        <Box>
          <Text
            as="span"
            display="block"
            fontSize="sm"
            fontWeight="semibold"
            color="white"
          >
            Tom Cook
          </Text>
          <Text
            as="span"
            display="block"
            fontSize="sm"
            fontWeight="medium"
            color="gray.500"
          >
            0x86fb84e92c1ee...
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Sidebar;
