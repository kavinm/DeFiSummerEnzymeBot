import React from "react";
import { Flex, Text, Button } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

type TopbarProps = {
  name: string;
};

const Topbar: React.FC<TopbarProps> = ({ name }) => {
  const history = useHistory();

  const logout = () => {
    history.push("/");
  };

  return (
    <Flex
      height={{ base: "", md: "4rem" }}
      border="1px solid"
      borderBottomColor="accentOutlines"
      px="20px"
      alignItems="center"
      justifyContent="space-between"
    >
      <Text
        as="span"
        display="block"
        color="headers"
        fontSize="2xl"
        fontWeight="bold"
        my="auto"
      >
        {name}
      </Text>
      <Button
        backgroundColor="accentOutlines"
        _hover={{
          backgroundColor: "accentCards",
        }}
        _active={{
          backgroundColor: "accentCards",
        }}
        fontSize="sm"
        color="white"
        onClick={logout}
      >
        Log out
      </Button>
    </Flex>
  );
};

export default Topbar;
