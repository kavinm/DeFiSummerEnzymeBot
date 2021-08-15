import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import numeral from "numeral";
import uuid from "react-uuid";

import { ReactComponent as InformationLogo } from "../../assets/logo/information.svg";
import { ReactComponent as Avatar } from "../../assets/logo/avatar.svg";
import { ThemedButton } from "../shared";

const assets = [
  {
    name: "Wrapped Ether",
    symbol: "WETH",
    from: 0.2,
    to: 0.25,
  },
  {
    name: "Uniswap",
    symbol: "UNI",
    from: 0.15,
    to: 0.55,
  },
  {
    name: "Compound",
    symbol: "COMP",
    from: 0.5,
    to: 0.2,
  },
];

const RebalanceConfirmationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  triggerSubmit: () => void;
}> = ({ isOpen, onClose, triggerSubmit }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backgroundColor="rgba(31, 41, 55, 0.75)" />
      <ModalContent backgroundColor="accentCards" minW="512px">
        <ModalHeader display="flex" alignItems="center" p="24px">
          <InformationLogo />
          <Text
            as="span"
            fontSize="lg"
            fontWeight="medium"
            color="gray.50"
            ml="1rem"
          >
            Confirm changes
          </Text>
        </ModalHeader>
        <ModalBody>
          {assets.map((a, i) => (
            <Flex
              justifyContent="space-between"
              alignItems="center"
              key={uuid()}
              {...(i < assets.length - 1 && { mb: "20px" })}
            >
              <Flex>
                <Box mr="8px">
                  <Avatar />
                </Box>
                <Box>
                  <Text
                    as="span"
                    display="block"
                    fontSize="sm"
                    fontWeight="medium"
                    color="white"
                  >
                    {a.name}
                  </Text>
                  <Text
                    as="span"
                    fontSize="sm"
                    fontWeight="400"
                    color="placeholders"
                  >
                    {a.symbol}
                  </Text>
                </Box>
              </Flex>
              <Flex>
                <Text
                  as="span"
                  display="block"
                  fontWeight="bold"
                  color="iconsActive"
                >
                  {numeral(a.from).format("0%")}
                </Text>
                <Text
                  as="span"
                  display="block"
                  fontWeight="bold"
                  color="accentOutlines"
                  mx="1rem"
                >
                  →
                </Text>
                <Text
                  as="span"
                  display="block"
                  fontWeight="bold"
                  color="iconsActive"
                >
                  {numeral(a.to).format("0%")}
                </Text>
              </Flex>
            </Flex>
          ))}
        </ModalBody>
        <ModalFooter>
          <Flex justifyContent="center" h="38px">
            <Button
              color="placeholders"
              border="1px transparent solid"
              backgroundColor="accentOutlines"
              _hover={{
                backgroundColor: "accentSurface",
              }}
              _active={{
                backgroundColor: "accentOutlines",
                border: "1px solid",
                borderColor: "primaryLight",
              }}
              variant="solid"
              px="1rem"
              h="100%"
              mr="12px"
              onClick={onClose}
              fontSize="sm"
            >
              Cancel
            </Button>
            <ThemedButton
              px="1rem"
              h="100%"
              onClick={() => {
                triggerSubmit();
                onClose();
              }}
              fontSize="sm"
            >
              Confirm
            </ThemedButton>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RebalanceConfirmationModal;
