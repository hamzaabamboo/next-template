import {
  Box,
  Button,
  chakra,
  HStack,
  Image,
  Input,
  List,
  ListItem,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useStore, useDispatch } from "~/hooks/state";

export const MediaList = () => {
  const media = useStore((s) => s.media.media);
  const dispatch = useDispatch();
  const [newCollection, setNewCollection] = useState("");
  const { t } = useTranslation("common");

  //TODO: Confirmatin Dialog
  const handleAddNewCollection = async () => {
    if (newCollection.length < 1) return;
    await dispatch.collection.createCollection({ name: newCollection });
    setNewCollection("");
  };

  //TODO: Confirmation Dialog
  const handleDeleteCollection = async (tagId: string) => {
    if (!tagId) return;
    await dispatch.collection.deleteCollection(tagId);
  };

  return (
    <Stack>
      <Text size="xl">{t("collection")}</Text>
      <List>
        {media.map((media) => (
          <ListItem key={media.id} py={2} px={1} borderBottom="1px solid">
            <HStack justifyContent="space-between">
              <HStack>
                <Image
                  width={120}
                  src={URL.createObjectURL(media.file)}
                  alt={media.title}
                />
                <Text>{media.title}</Text>
              </HStack>
              <HStack>
                <Button size="sm" colorScheme="yellow">
                  {t("edit")}
                </Button>
                <Button
                  size="sm"
                  colorScheme="red"
                  //   onClick={() => handleDeleteCollection(collection.id)}
                >
                  {t("delete")}
                </Button>
              </HStack>
            </HStack>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
};
