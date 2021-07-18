import {
  Box,
  Button,
  chakra,
  HStack,
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

export const CollectionList = () => {
  const collections = useStore((s) => s.collection.collections);
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
      <Text size="xl" >{t("collection")}</Text>
      <chakra.form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddNewCollection();
        }}
      >
        <HStack>
          <Input
            value={newCollection}
            onChange={(t) => setNewCollection(t.currentTarget.value)}
          />
          <Button type="submit">{t("add-collection")}</Button>
        </HStack>
      </chakra.form>
      <List>
        {collections.map((collection) => (
          <ListItem key={collection.id} py={2} px={1} borderBottom="1px solid">
            <HStack justifyContent="space-between">
              <Text>{collection.name}</Text>
              <HStack>
                <Button size="sm" colorScheme="yellow">
                  {t("edit")}
                </Button>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleDeleteCollection(collection.id)}
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
