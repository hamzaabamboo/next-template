import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  chakra,
  HStack,
  IconButton,
  Input,
  List,
  ListItem,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useStore, useDispatch } from "~/hooks/state";
import { AppModal } from "../common/AppModal";

export const TagList = ({ showActions = true }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const tags = useStore((s) => s.tag.tags);
  const dispatch = useDispatch();
  const [newTag, setNewTag] = useState("");
  const { t } = useTranslation("common");

  //TODO: Confirmatin Dialog
  const handleAddNewTag = async () => {
    if (newTag.length < 1) return;
    await dispatch.tag.createTag({ name: newTag });
    setNewTag("");
    onClose();
  };

  //TODO: Confirmation Dialog
  const handleDeleteTag = async (tagId: string) => {
    if (!tagId) return;
    await dispatch.tag.deleteTag(tagId);
  };

  return (
    <>
      <Stack>
        <HStack justifyContent="space-between">
          <Text size="xl" fontWeight="bold">
            {t("tags")}
          </Text>
          <IconButton
            icon={<AddIcon />}
            onClick={onOpen}
            aria-label="add-tag"
          />
        </HStack>
        <List>
          {tags.map((tag) => (
            <ListItem key={tag.id} py={2} px={1} borderBottom="1px solid">
              <HStack justifyContent="space-between">
                <Text>{tag.name}</Text>
                {showActions && (
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
                )}
              </HStack>
            </ListItem>
          ))}
        </List>
      </Stack>
      <AppModal
        isOpen={isOpen}
        onClose={onClose}
        title={t("add-tag")}
        footer={null}
      >
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
            <Button type="submit">{t("add")}</Button>
          </HStack>
        </chakra.form>
      </AppModal>
    </>
  );
};
