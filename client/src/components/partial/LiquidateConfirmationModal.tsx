import {
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
import { ReactComponent as InformationLogo } from "../../assets/logo/information.svg";
import { ThemedButton } from "../shared";

const LiquidateConfirmationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  triggerSubmit: () => void;
}> = ({ isOpen, onClose, triggerSubmit }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backgroundColor="rgba(31, 41, 55, 0.75)" />
      <ModalContent backgroundColor="accentCards" minW="512px">
        <ModalHeader display="flex" alignItems="center" pt="24px" pb="8px">
          <InformationLogo />
          <Text
            as="span"
            fontSize="lg"
            fontWeight="medium"
            color="gray.50"
            ml="1rem"
          >
            Confirm Liquidate
          </Text>
        </ModalHeader>
        <ModalBody>
          <Text as="span" color="#D1D5DB" fontSize="sm" fontWeight="400">
            Are you sure you want to proceed? This action cannot be undone.
          </Text>
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
              fontSize="sm"
              onClick={onClose}
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
              Liquidate
            </ThemedButton>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LiquidateConfirmationModal;
