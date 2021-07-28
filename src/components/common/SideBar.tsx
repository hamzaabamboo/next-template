import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Button,
  Collapse,
  HStack,
  Slide,
  Stack,
  Text,
  Box,
  Fade,
} from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { CollectionList } from "../CollectionList";
import { TagList } from "../tag/TagList";

export const SideBar = ({
  isOpen = false,
  onClose,
  onOpen,
}: {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}) => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <Slide
        direction="left"
        in={isOpen}
        style={{ width: "400px", zIndex: 10 }}
      >
        <Box
          p={4}
          color="white"
          bg="teal.500"
          rounded="md"
          shadow="md"
          height="100vh"
          position="relative"
        >
          <Stack>
            <Text fontSize="xl">{t("app-title", { version: "v1.0" })}</Text>
            <HStack>
              <Button onClick={() => i18n.changeLanguage("en")}>English</Button>
              <Button onClick={() => i18n.changeLanguage("jp")}>日本語</Button>
            </HStack>
            <TagList />
            <CollectionList />
          </Stack>
        </Box>
      </Slide>
      <Fade in={isOpen}>
        {isOpen && (
          <Box
            onClick={() => {
              onClose();
              console.log("fuck");
            }}
            position="fixed"
            bgColor="#000000AA"
            w="100vw"
            h="100vh"
            zIndex="2"
            top="0"
            left="0"
          ></Box>
        )}
      </Fade>
      <Box
        position="fixed"
        left="0"
        w="60px"
        h="60px"
        top="20px"
        bg="teal.700"
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderTopRightRadius="md"
        borderBottomRightRadius="md"
        onClick={() => {
          isOpen ? onClose() : onOpen();
        }}
      >
        {isOpen ? (
          <ChevronLeftIcon w="12" h="12" />
        ) : (
          <ChevronRightIcon w="12" h="12" />
        )}
      </Box>
    </>
  );
};
