import {
  Box,
  Stack,
  Flex,
  Text,
  Button,
  Input,
  HStack,
} from "@chakra-ui/react";
import { useStore } from "hooks/useStore";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Dispatch, store } from "state/index";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { createGetStaticProps } from "src/utils/createGetStaticProps";

export const getStaticProps = createGetStaticProps(["common"]);

export default function Home() {
  const message = useStore((store) => store.test.message);
  const dispatch = useDispatch<Dispatch>();

  const { t, i18n } = useTranslation("common");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    // console.log(i18n);
    i18n?.changeLanguage("jp");
  }, [i18n]);
  return (
    <Flex minH="full" w="full" justifyContent="center">
      <Stack w={["100%", "70%"]} mt={[4, 12]}>
        <Text>
          {t("message")}: {message}
        </Text>
        <Button onClick={() => dispatch.test.hello()}>Hello</Button>
        <HStack>
          <Input
            type="text"
            value={msg}
            onChange={(e) => {
              setMsg(e.target.value);
            }}
          />
          <Button
            onClick={() => {
              dispatch.test.setMessage(msg);
              setMsg("");
            }}
          >
            {t("set-message")}
          </Button>
        </HStack>
        <HStack>
          <Button onClick={() => i18n.changeLanguage("en")}>English</Button>
          <Button onClick={() => i18n.changeLanguage("jp")}>日本語</Button>
        </HStack>
      </Stack>
    </Flex>
  );
}
