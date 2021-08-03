import { useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom";
import * as yup from "yup";

import { greetUser } from "enzyme-autotrader-bot";

import { Navbar, ThemedButton, ThemedInput } from "../components/shared";
import { EnzymeBot } from "../../../enzyme-autotrader-bot/build/EnzymeBot";

type FormData = {
    vaultAddress: string;
};

const schema = yup.object().shape({
    vaultAddress: yup.string().required("Required."),
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

    const onSubmit = async (data: FormData) => {
        history.push("/automated-strategy");
        const currentBot = EnzymeBot.createFromInput("KOVAN");
        const currentBot2 = EnzymeBot.create("KOVAN");
    };

    useEffect(() => {
        alert(greetUser("Stradford"));
    }, []);

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
                mt={{ base: "4rem", xl: "6rem" }}
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
                    To interact with the Enzyme protocol, please connect to your
                    wallet.
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
                    <Text as="span" color="error" display="block" h="2rem">
                        {errors.vaultAddress?.message}
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
