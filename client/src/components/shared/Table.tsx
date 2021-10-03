import React from "react";
import { Grid, Text, Box, BoxProps, Skeleton } from "@chakra-ui/react";
import numeral from "numeral";
import uuid from "react-uuid";

import { StopLimitActions } from "../../enums";

interface TableProps extends BoxProps {
  rows: { id: string; [x: string]: any }[];
  tempBasisRows?: { id: string; [x: string]: any }[];
  shownAs: "stopLimitTable" | "vaultHoldingsTable";
}

const Table: React.FC<TableProps> = ({
  rows,
  shownAs,
  tempBasisRows,
  ...props
}) => {
  return (
    <Box
      display="block"
      {...(shownAs === "stopLimitTable" && { opacity: 0.5 })}
      {...props}
    >
      {(!rows.length ||
        (!tempBasisRows?.length && shownAs === "stopLimitTable")) &&
        Array.from({ length: 2 }).map((_, i) => (
          <Grid
            key={uuid()}
            rowGap="16px"
            padding="20px"
            border="1px solid"
            borderColor="accentOutlines"
            backgroundColor="accentCards"
            height="96px"
            width="270px"
            color="white"
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(2, 1fr)"
            {...(i === 0 && {
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
            })}
            {...(i === 1 && {
              borderBottomLeftRadius: "8px",
              borderBottomRightRadius: "8px",
            })}
            {...(i > 0 && { borderTop: "none" })}
          >
            <Text display="block" as="span" fontSize="sm" fontWeight="semibold">
              <Skeleton height="18px" width="32px" />
            </Text>
            <Text
              display="flex"
              as="span"
              fontSize="sm"
              fontWeight="semibold"
              alignItems="end"
            >
              <Skeleton height="18px" width="64px" ml="auto" />
            </Text>
            <Text display="block" as="span" fontSize="sm" fontWeight="semibold">
              <Skeleton height="18px" width="104px" />
            </Text>
            <Text
              display="block"
              as="span"
              fontSize="sm"
              fontWeight="semibold"
              textAlign="right"
            >
              <Skeleton height="18px" width="32px" ml="auto" />
            </Text>
          </Grid>
        ))}
      {shownAs === "stopLimitTable" &&
        tempBasisRows?.length &&
        rows.map((row, i) => (
          <Grid
            key={row.id}
            rowGap="16px"
            padding="20px"
            border="1px solid"
            borderColor="accentOutlines"
            backgroundColor="accentCards"
            height="96px"
            width="270px"
            color="white"
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(2, 1fr)"
            {...(i === 0 && {
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
            })}
            {...(i === rows.length - 1 && {
              borderBottomLeftRadius: "8px",
              borderBottomRightRadius: "8px",
            })}
            {...(i > 0 && { borderTop: "none" })}
          >
            <Text display="block" as="span" fontSize="sm" fontWeight="semibold">
              {row.asset}
            </Text>
            <Text
              display="block"
              as="span"
              fontSize="sm"
              fontWeight="semibold"
              textAlign="right"
            >
              {row.date}
            </Text>
            <Text
              display="block"
              as="span"
              fontSize="sm"
              fontWeight="semibold"
              {...(row.type === StopLimitActions.BUY
                ? { color: "success" }
                : { color: "error" })}
            >
              {row.type}
            </Text>
            <Text
              display="block"
              as="span"
              fontSize="sm"
              fontWeight="semibold"
              textAlign="right"
              {...(row.type === StopLimitActions.BUY
                ? { color: "success" }
                : { color: "error" })}
            >
              {`${row.type === StopLimitActions.BUY ? "+" : "-"} ${numeral(
                row.amount
              ).format("$0,0.00")}`}
            </Text>
          </Grid>
        ))}
      {shownAs === "vaultHoldingsTable" &&
        rows.map((row, i) => (
          <Grid
            key={row.id}
            rowGap="16px"
            padding="20px"
            border="1px solid"
            borderColor="accentOutlines"
            backgroundColor="accentCards"
            height="96px"
            width="270px"
            color="white"
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(2, 1fr)"
            {...(i === 0 && {
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
            })}
            {...(i === rows.length - 1 && {
              borderBottomLeftRadius: "8px",
              borderBottomRightRadius: "8px",
            })}
            {...(i > 0 && { borderTop: "none" })}
          >
            <Text display="block" as="span" fontSize="sm" fontWeight="semibold">
              {row.asset}
            </Text>
            <Text
              display="block"
              as="span"
              fontSize="sm"
              fontWeight="semibold"
              textAlign="right"
            >
              {numeral(row.allocation).format("0,0.00% ")}
            </Text>
            <Text display="block" as="span" fontSize="sm" fontWeight="semibold">
              {numeral(row.balance).format("0,0.0000")}
            </Text>
            <Text
              display="block"
              as="span"
              fontSize="sm"
              fontWeight="semibold"
              textAlign="right"
            >
              {numeral(row.price).format("$0,0.00")}
            </Text>
          </Grid>
        ))}
    </Box>
  );
};

export default Table;
