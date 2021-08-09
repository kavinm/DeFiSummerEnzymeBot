import React from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
} from "@chakra-ui/react";

const RebalancePortfolio: React.FC = () => {
    return (
        <DefaultLayout name="Rebalance Portfolio">
            <Table variant="unstyled" colorScheme="facebook">
                <TableCaption></TableCaption>
                <Thead>
                    <Tr>
                        <Th color="#D1D5DB" backgroundColor="accentOutlines">
                            Token
                        </Th>
                        <Th
                            color="#D1D5DB"
                            backgroundColor="accentOutlines"
                            isNumeric
                        >
                            Price
                        </Th>
                        <Th
                            color="#D1D5DB"
                            backgroundColor="accentOutlines"
                            isNumeric
                        >
                            Current Balance
                        </Th>
                        <Th
                            color="#D1D5DB"
                            backgroundColor="accentOutlines"
                            isNumeric
                        >
                            Current Value
                        </Th>
                        <Th
                            color="#D1D5DB"
                            backgroundColor="accentOutlines"
                            isNumeric
                        >
                            Desired Weight
                        </Th>
                        <Th
                            color="#D1D5DB"
                            backgroundColor="accentOutlines"
                            isNumeric
                        ></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr
                        border="1px"
                        borderColor="gray.500"
                        borderRadius="0.125rem"
                    >
                        <Td color="#D1D5DB" backgroundColor="accentSurface">
                            Total
                        </Td>
                        <Td
                            color="#D1D5DB"
                            backgroundColor="accentSurface"
                        ></Td>
                        <Td
                            color="#D1D5DB"
                            backgroundColor="accentSurface"
                        ></Td>
                        <Td
                            color="#D1D5DB"
                            isNumeric
                            backgroundColor="accentSurface"
                        >
                            999999
                        </Td>
                        <Td
                            color="#D1D5DB"
                            isNumeric
                            backgroundColor="accentSurface"
                        >
                            100.0
                        </Td>
                    </Tr>
                    <Tr border="1px" borderColor="#4B5563">
                        <Td color="#F9FAFB">Token1</Td>
                        <Td color="#F9FAFB" isNumeric>
                            $9999999
                        </Td>
                        <Td color="#F9FAFB" isNumeric>
                            30.48
                        </Td>
                        <Td color="#F9FAFB" isNumeric>
                            99999
                        </Td>
                        <Td color="#F9FAFB" isNumeric>
                            <Td color="#F9FAFB" isNumeric>
                                <Input
                                    placeholder="0"
                                    _focus={{
                                        border: "1px solid ",
                                    }}
                                    borderColor="#4B5563"
                                    color="white"
                                    type="number"
                                    pattern="^\(\d{1,3}(\,\d{3})*|(\d+))(\.\d{2})?$"
                                />
                            </Td>
                        </Td>
                        <Td color="#4B5563" isNumeric>
                            99999
                        </Td>
                    </Tr>

                    <Tr border="1px" borderColor="#4B5563">
                        <Td color="#F9FAFB">Token2</Td>
                        <Td color="#F9FAFB" isNumeric>
                            $9999999
                        </Td>
                        <Td color="#F9FAFB" isNumeric>
                            30.48
                        </Td>
                        <Td color="#F9FAFB" isNumeric>
                            99999
                        </Td>
                        <Td color="#F9FAFB" isNumeric>
                            <Td color="#F9FAFB" isNumeric>
                                <Input
                                    placeholder="0"
                                    _focus={{
                                        border: "1px solid ",
                                    }}
                                    borderColor="#4B5563"
                                    color="white"
                                    type="number"
                                    pattern="^\(\d{1,3}(\,\d{3})*|(\d+))(\.\d{2})?$"
                                />
                            </Td>
                        </Td>
                        <Td color="#4B5563" isNumeric>
                            99999
                        </Td>
                    </Tr>
                    <Tr border="1px" borderColor="#4B5563">
                        <Td color="#F9FAFB">Token 3</Td>
                        <Td color="#F9FAFB" isNumeric>
                            $9999999
                        </Td>
                        <Td color="#F9FAFB" isNumeric>
                            30.48
                        </Td>
                        <Td color="#F9FAFB" isNumeric>
                            99999
                        </Td>
                        <Td color="#F9FAFB" isNumeric>
                            <Td color="#F9FAFB" isNumeric>
                                <Input
                                    placeholder="0"
                                    _focus={{
                                        border: "1px solid ",
                                    }}
                                    borderColor="#4B5563"
                                    color="white"
                                    type="number"
                                    pattern="^\(\d{1,3}(\,\d{3})*|(\d+))(\.\d{2})?$"
                                />
                            </Td>
                        </Td>
                        <Td color="#4B5563" isNumeric>
                            99999
                        </Td>
                    </Tr>
                </Tbody>
                <Tfoot>
                    <Tr>
                        <Th>To convert</Th>
                        <Th>into</Th>
                        <Th isNumeric>multiply by</Th>
                    </Tr>
                </Tfoot>
            </Table>
            ;
        </DefaultLayout>
    );
};

export default RebalancePortfolio;
