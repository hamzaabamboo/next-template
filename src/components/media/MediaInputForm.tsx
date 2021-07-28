import {
  Button,
  Box,
  chakra,
  HStack,
  Input,
  Stack,
  Text,
  Image,
} from "@chakra-ui/react";
import React, { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useStore } from "~/hooks/state";
import MultiSelect, { CreatableSelect } from "~/lib/MultiSelect";
import { Media, MediaInput, Tag } from "~/types/media";

export const MediaInputForm = ({
  value,
  onChange,
  onSubmit,
}: {
  value: Partial<MediaInput>;
  onChange: (value: Partial<MediaInput>) => void;
  onSubmit: () => void;
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { tags } = useStore((s) => s.tag);

  const filePreview = useMemo(() => {
    if (!value.file) return;
    return URL.createObjectURL(value.file);
  }, [value.file]);
  return (
    <chakra.form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <Stack>
        <Text whiteSpace="nowrap">{t("add-media")}</Text>
        <HStack>
          <Text whiteSpace="nowrap">{t("title")}</Text>
          <Input
            type="text"
            value={value.title}
            onChange={(e) => {
              onChange({
                ...value,
                title: e.target.value,
              });
            }}
          />
        </HStack>
        <HStack>
          <Text whiteSpace="nowrap">{t("file")}</Text>
          <Input
            ref={fileInputRef}
            type="file"
            onChange={(f) => {
              const file = f.target.files?.item(0);
              if (!file) return;
              onChange({
                ...value,
                file,
              });
            }}
          />
        </HStack>
        <HStack>
          <Text whiteSpace="nowrap">{t("tag")}</Text>
          <Box flex={1}>
            <CreatableSelect
              isMulti
              value={
                value.tags?.map((id) => tags.find((t) => t.id === id)) ?? []
              }
              getOptionLabel={(t) => t.name}
              getOptionValue={(t) => t.id}
              onChange={(selected) => {
                onChange({ ...value, tags: selected.map((t) => t.id) });
              }}
              onCreateOption={(name: any) => {
                dispatch.tag.createTag({ name });
              }}
              options={tags}
            />
          </Box>
        </HStack>
        {filePreview && (
          <Box>
            <Image
              alt="preview"
              margin="0 auto"
              maxH="300px"
              w="auto"
              h="auto"
              src={filePreview}
            />
          </Box>
        )}
        <HStack>
          <Button type="submit">{t("add")}</Button>
        </HStack>
      </Stack>
    </chakra.form>
  );
};
