import { Td, Tr } from "@chakra-ui/react";
import React from "react";
import { FetchedStock } from "../types/FetchedStock";

interface AssetsListBoxProps {
  stock?: FetchedStock;
  value: number;
}

export const AssetsListBox: React.FC<AssetsListBoxProps> = ({
  stock,
  value,
}) => {
  return (
    <Tr color="textDark">
      <Td borderBottomColor="borderDark2">{stock?.symbol}</Td>
      <Td borderBottomColor="borderDark2">${(stock?.price * 1).toFixed(2)}</Td>
      <Td borderBottomColor="borderDark2">{(stock?.change * 1).toFixed(2)}%</Td>
      <Td borderBottomColor="borderDark2">{stock?.shares}</Td>
      <Td borderBottomColor="borderDark2">${(stock?.balance).toFixed(2)}</Td>
      <Td isNumeric borderBottomColor="borderDark2">
        {((stock.balance / value) * 100).toFixed(2)}%
      </Td>
    </Tr>
  );
};
