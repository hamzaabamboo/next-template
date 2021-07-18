import {
  Box,
  Stack,
  Flex,
  Text,
  Button,
  Input,
  HStack,
} from "@chakra-ui/react";
import { useStore } from "~/hooks/state";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Dispatch, store } from "state/index";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { createGetStaticProps } from "src/utils/createGetStaticProps";
import { TagList } from "~/components/TagList";
import { CollectionList } from "~/components/CollectionList";
import { MediaInputForm } from "~/components/MediaInputForm";
import { MediaList } from "~/components/MediaList";

export const getStaticProps = createGetStaticProps(["common"]);

export default function Home() {
  const { t, i18n } = useTranslation("common");

  useEffect(() => {
    // console.log(i18n);
    i18n?.changeLanguage("jp");
  }, [i18n]);

  return (
    <Flex minH="full" w="full" justifyContent="center">
      <Stack w={["100%", "70%"]} mt={[4, 12]}>
        <MediaInputForm />
        <MediaList />
        <TagList />
        <CollectionList />
        <HStack>
          <Button onClick={() => i18n.changeLanguage("en")}>English</Button>
          <Button onClick={() => i18n.changeLanguage("jp")}>日本語</Button>
        </HStack>
      </Stack>
    </Flex>
  );
}
