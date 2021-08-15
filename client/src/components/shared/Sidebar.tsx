import React from "react";
import { Box } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import uuid from "react-uuid";

import { ReactComponent as EnzymeLogo } from "../../assets/logo/enzyme.svg";

const links = [
  { id: uuid(), label: "Buy-Sell Limit", url: "/buy-sell-limit" },
  { id: uuid(), label: "Liquidate", url: "/liquidate" },
  { id: uuid(), label: "Rebalance Holdings", url: "/rebalance-holdings" },
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
    </Box>
  );
};

export default Sidebar;
