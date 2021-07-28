import { Flex, Spinner, Text } from "@chakra-ui/react";
import React from "react";

import { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SideBarProvider } from "~/contexts/SideBarContext";
import { useDispatch } from "~/hooks/state";
import { initDexie } from "~/storage";

export const AppWrapper: React.FunctionComponent<{}> = ({ children }) => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const { t } = useTranslation();

  const initialize = async () => {
    await initDexie();
    await dispatch.tag.fetchTags();
    await dispatch.collection.fetchCollections();
    await dispatch.media.fetchMedia();
    setIsLoaded(true);
  };

  useEffect(() => {
    initialize();
  }, []);

  if (!isLoaded)
    return (
      <Flex
        w="100vw"
        h="100vh"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner size="xl" />
        <Text size="md">{t("loading")}</Text>
      </Flex>
    );

  return <SideBarProvider>{children}</SideBarProvider>;
};
