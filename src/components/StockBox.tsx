import {
  AccordionItem,
  AccordionButton,
  Box,
  AccordionPanel,
  Icon,
  Text,
  Flex,
  Button,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { ICONS_TO_CLASSES } from "../constants/icons";
import { StocksContext } from "../context/StocksContext";

import { InputFormField } from "./InputFormField";

interface StockBoxProps {
  symbol: string;
  fullName: string;
  bgColor: string;
}

export const StockBox: React.FC<StockBoxProps> = (props) => {
  const { addedStocks, addToAddedStocks } = useContext(StocksContext);
  const toast = useToast();
  const priceName = "price" + `${props.symbol}`;
  const sharesName = "shares" + `${props.symbol}`;
  const [error, setError] = useState(false);
  const isInitialMount = useRef(true);
  const reg = /^\d+$/;

  //validation toasts
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (!error) {
        toast({
          title: `${props.symbol} was added to your portfolio.`,
          description: `Don't forget to save.`,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Something went wrong.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    }
  }, [error]);

  return (
    <AccordionItem backgroundColor={props.bgColor} borderColor="borderDark2">
      <AccordionButton>
        <Flex alignItems="center" p={2} width="100%">
          <Icon
            as={ICONS_TO_CLASSES["plus"]}
            color="mainDark"
            marginRight={3}
          ></Icon>
          <Text color="accentDark">{props.symbol}</Text>
          <Text color="textDark">{`\xa0-\xa0` + props.fullName}</Text>
        </Flex>
      </AccordionButton>
      <AccordionPanel pb={4} color="textDark">
        <Formik
          initialValues={{ [sharesName]: 0, [priceName]: 0 }}
          onSubmit={(values, { setErrors }) => {
            if (!String(values[sharesName]).match(reg) || !values[sharesName]) {
              setError(true);
              setErrors({
                [sharesName]: "Invalid input.",
              });
            } else if (
              !String(values[priceName]).match(reg) ||
              !values[priceName]
            ) {
              setError(true);
              setErrors({
                [priceName]: "Invalid input.",
              });
            } else {
              setError(false);
              console.log("values: ", values);

              addToAddedStocks(
                props.symbol,
                values[sharesName],
                values[priceName]
              );
            }
          }}
        >
          {() => (
            <Form>
              <Flex
                alignItems="stretch"
                justifyContent="space-between"
                width="100%"
              >
                <Flex
                  alignItems="flex-start"
                  justifyContent="space-between"
                  width="85%"
                >
                  <InputFormField
                    name={sharesName}
                    placeholder="E.g. 5"
                    label="Shares"
                    type="number"
                  ></InputFormField>
                  <InputFormField
                    name={priceName}
                    placeholder="E.g. 63.75"
                    label="Price"
                    type="number"
                  ></InputFormField>
                </Flex>
                <Flex justifyContent="center" width="15%" alignItems="center">
                  <Button
                    bgColor="accentDark"
                    type="submit"
                    color="textDark"
                    width="60%"
                  >
                    Add
                  </Button>
                </Flex>
              </Flex>
            </Form>
          )}
        </Formik>
      </AccordionPanel>
    </AccordionItem>
  );
};