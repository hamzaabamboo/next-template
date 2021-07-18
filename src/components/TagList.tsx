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

export const TagList = () => {
  const tags = useStore((s) => s.tag.tags);
  const dispatch = useDispatch();
  const [newTag, setNewTag] = useState("");
  const { t } = useTranslation("common");

  //TODO: Confirmatin Dialog
  const handleAddNewTag = async () => {
    if (newTag.length < 1) return;
    await dispatch.tag.createTag({ name: newTag });
    setNewTag("");
  };

  //TODO: Confirmation Dialog
  const handleDeleteTag = async (tagId: string) => {
    if (!tagId) return;
    await dispatch.tag.deleteTag(tagId);
  };

  return (
    <Stack>
      <Text size="xl">{t("tag")}</Text>
      <chakra.form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddNewTag();
        }}
      >
        <HStack>
          <Input
            value={newTag}
            onChange={(t) => setNewTag(t.currentTarget.value)}
          />
          <Button type="submit">{t("add-tag")}</Button>
        </HStack>
      </chakra.form>
      <List>
        {tags.map((tag) => (
          <ListItem key={tag.id} py={2} px={1} borderBottom="1px solid">
            <HStack justifyContent="space-between">
              <Text>{tag.name}</Text>
              <HStack>
                <Button size="sm" colorScheme="yellow">
                  {t("edit")}
                </Button>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleDeleteTag(tag.id)}
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
