import { Box, Flex, Heading, Icon } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { Card } from "../components/Card";
import { ChartLoader } from "../components/chartLoader/chartLoader";
import { FullPortfolio } from "../components/fullPortfolio";
import { PageLayout } from "../components/PageLayout";
import { ICONS_TO_CLASSES } from "../constants/icons";
import { useMeQuery } from "../generated/graphql";

const Index = () => {
  const { data, loading } = useMeQuery();
  const router = useRouter();
  let body;

  if (loading) {
    body = <ChartLoader></ChartLoader>;
  } else if (
    // No portfolios
    !data?.me?.user?.portfolio?.crypto.length &&
    !data?.me?.user?.portfolio?.stocks.length &&
    !loading
  ) {
    body = (
      <Flex flexDirection="column" alignItems="center" width="100%" p={8}>
        <Heading color="textDark" marginTop={10} marginBottom={10}>
          Lets Get Started
        </Heading>
        <Flex width="70%" justifyContent="space-around" alignItems="center">
          <Card
            pointer
            hover
            width="30%"
            color="bgDark3"
            height="360px"
            onClick={() => {
              data?.me?.user
                ? router.push("/crypto/add")
                : router.push("/login");
            }}
          >
            <Flex
              flexDirection="column"
              height="180px"
              alignItems="center"
              justifyContent="center"
            >
              <Icon
                as={ICONS_TO_CLASSES["crypto"]}
                color="#f1db4c"
                fontSize="4xl"
              ></Icon>
              <Heading color="textDark">Crypto</Heading>
            </Flex>
          </Card>
          <Card
            pointer
            color="bgDark3"
            hover
            width="30%"
            height="360px"
            onClick={() => {
              data?.me?.user
                ? router.push("/stocks/add")
                : router.push("/login");
            }}
          >
            <Flex
              flexDirection="column"
              height="180px"
              alignItems="center"
              justifyContent="center"
            >
              <Icon
                as={ICONS_TO_CLASSES["stocks"]}
                color="#55f360"
                fontSize="4xl"
              ></Icon>
              <Heading color="textDark">Stocks</Heading>
            </Flex>
          </Card>
        </Flex>
      </Flex>
    );
  } else if (
    // User have portfolio
    data.me?.user?.portfolio?.stocks.length ||
    data.me?.user?.portfolio?.crypto.length
  ) {
    body = <FullPortfolio data={data} loading={loading}></FullPortfolio>;
  }

  return (
    <Flex flexDirection="column">
      <PageLayout>{body}</PageLayout>
    </Flex>
  );
};

export default Index;
