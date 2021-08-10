import React from "react";
import { Grid, Text, Box, BoxProps } from "@chakra-ui/react";
import numeral from "numeral";
import { StopLimitActions } from "../../enums";

interface TableProps extends BoxProps {
  rows: { id: string; [x: string]: any }[];
  shownAs: "stopLimitTable" | "vaultHoldingsTable";
}

const Table: React.FC<TableProps> = ({ rows, shownAs, ...props }) => {
  return (
    <Box display="block" {...props}>
      {shownAs === "stopLimitTable" &&
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
              {numeral(row.balance).format("0,0.00% ")}
            </Text>
            <Text display="block" as="span" fontSize="sm" fontWeight="semibold">
              {numeral(row.allocation).format("0,0.0000")}
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
