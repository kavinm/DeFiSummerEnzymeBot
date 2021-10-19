import { Box, Radio, RadioGroup, Text } from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { EnzymeBot } from "enzyme-autotrader-bot";
import { useAtom } from "jotai";

import { Navbar, ThemedButton, ThemedInput } from "../components/shared";
import useAuthentication from "../utils/useAuthentication";
import { Networks } from "../config/api";
import { reloadBuySellLimitHoldingsAtom } from "../atoms";

type FormData = {
  vaultAddress: string;
  privateKey: string;
  network: string;
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
    .matches(/^[a-fA-F0-9]{64}$/, {
      message: "Please provide a valid private key format.",
    }),
  network: yup.string(),
});

const Connect: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      network: Networks.Kovan,
    },
  });

  const history = useHistory();
  const [, setAuthentication] = useAuthentication();
  const [, setReload] = useAtom(reloadBuySellLimitHoldingsAtom);

  const onSubmit = async ({ vaultAddress, privateKey, network }: FormData) => {
    try {
      let bot;

      // For testing, remove after verifying MetaMask  and uncomment below lines
      bot = EnzymeBot.staticCreateKovan();

      // if (network === Networks.Kovan) {
      //   bot = await EnzymeBot.createFromInput(vaultAddress, privateKey);
      // } else {
      //   bot = await EnzymeBot.createFromInputMainnet(vaultAddress, privateKey);
      // }

      if (bot) {
        setAuthentication({ vaultAddress, privateKey, network });
        setReload(true);
        history.push("/buy-sell-limit");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box backgroundColor="accentCards" minHeight="100vh" pb="2rem">
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
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
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
            isInvalid={!!errors.vaultAddress?.message}
          />
          <Text
            as="span"
            color="red.400"
            display="block"
            h="1.25rem"
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
            isInvalid={!!errors.privateKey?.message}
            type="password"
          />
          <Text
            as="span"
            color="red.400"
            display="block"
            h="1.25rem"
            fontSize="sm"
          >
            {errors.privateKey?.message}
          </Text>
          <Text
            as="label"
            htmlFor="privateKey"
            fontSize="sm"
            fontWeight="medium"
            color="gray.300"
            lineHeight="1.25rem"
          >
            Network
          </Text>
          <Controller
            control={control}
            name="network"
            render={({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { invalid, isTouched, isDirty, error },
              formState,
            }) => (
              <RadioGroup
                onBlur={onBlur}
                onChange={onChange}
                checked={value}
                ref={ref}
                color="gray.300"
                defaultValue={Networks.Kovan}
              >
                <Radio value={Networks.Kovan} mr="1rem">
                  Kovan
                </Radio>
                <Radio value={Networks.Mainnet}>Mainnet</Radio>
              </RadioGroup>
            )}
          />
          <ThemedButton
            color="white"
            type="submit"
            mt="3rem"
            mx="auto"
            display="block"
            isLoading={isSubmitting}
          >
            Connect Wallet
          </ThemedButton>
        </form>
      </Box>
    </Box>
  );
};

export default Connect;
