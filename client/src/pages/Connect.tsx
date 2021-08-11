import { Box, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";

import { Navbar, ThemedButton, ThemedInput } from "../components/shared";
import useAuthentication from "../utils/useAuthentication";
import { useHistory } from "react-router-dom";

type FormData = {
  vaultAddress: string;
  privateKey: string;
};

const schema = yup.object().shape({
  vaultAddress: yup
    .string()
    .required("Required.")
    .matches(/^0x[a-fA-F0-9]{40}$/, {
      message: "Please provide a valid vault address format.",
    }),
  privateKey: yup
    .string()
    .required("Required.")
    .matches(/^0x[a-fA-F0-9]{40}$/, {
      message: "Please provide a valid private key format.",
    }),
});

const Connect: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const history = useHistory();
  const [, setAuthenticated] = useAuthentication();

  const onSubmit = (data: FormData) => {
    setAuthenticated(data.vaultAddress);
    history.push("/automated-strategy");
  };

  return (
    <Box backgroundColor="accentCards" minHeight="100vh">
      <Navbar />
      <Box
        backgroundColor="accentSurface"
        border="1px solid"
        borderColor="accentOutlines"
        padding="30px"
        borderRadius="8px"
        maxW="460px"
        mt={{ base: "2rem", xl: "2.5rem" }}
        mx={{ base: "1rem", sm: "auto" }}
      >
        <Text
          as="span"
          fontSize="3xl"
          fontWeight="bold"
          color="headers"
          lineHeight="36px"
        >
          Connect to your wallet.
        </Text>
        <Text
          as="p"
          fontWeight="medium"
          color="subHeaders"
          mt="1.5rem"
          mb="2.5rem"
        >
          To interact with the Enzyme protocol, please connect to your wallet.
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Text
            as="label"
            htmlFor="vaultAddress"
            fontSize="sm"
            fontWeight="medium"
            color="gray.300"
            lineHeight="1.25rem"
          >
            Vault address
          </Text>
          <ThemedInput
            {...register("vaultAddress")}
            mt="0.25rem"
            id="vaultAddress"
            placeholder="Enter vault address"
          />
          <Text
            as="span"
            color="red.400"
            display="block"
            h="1.75rem"
            fontSize="sm"
          >
            {errors.vaultAddress?.message}
          </Text>
          <Text
            as="label"
            htmlFor="privateKey"
            fontSize="sm"
            fontWeight="medium"
            color="gray.300"
            lineHeight="1.25rem"
          >
            Private key
          </Text>
          <ThemedInput
            {...register("privateKey")}
            mt="0.25rem"
            id="privateKey"
            placeholder="Enter private key"
          />
          <Text
            as="span"
            color="red.400"
            display="block"
            h="2rem"
            fontSize="sm"
          >
            {errors.privateKey?.message}
          </Text>
          <ThemedButton
            color="white"
            type="submit"
            mt="2rem"
            mx="auto"
            display="block"
          >
            Connect Wallet
          </ThemedButton>
        </form>
      </Box>
    </Box>
  );
};

export default Connect;
