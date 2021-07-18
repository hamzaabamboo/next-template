import { Button, chakra, HStack, Input, Stack, Text } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "~/hooks/state";
import { MediaInput } from "~/types/media";

export const MediaInputForm = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [mediaInput, setMediaInput] = useState<Partial<MediaInput>>({
    title: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddMedia = () => {
    if (!mediaInput.title || !mediaInput.file) return;
    dispatch.media.createMedia({
      type: "gif",
      tags: [],
      file: mediaInput.file,
      title: mediaInput.title,
    });
  };

  return (
    <chakra.form
      onSubmit={(e) => {
        e.preventDefault();
        handleAddMedia();
      }}
    >
      <Stack>
        <Text whiteSpace="nowrap">{t("add-media")}</Text>
        <HStack>
          <Text whiteSpace="nowrap">{t("title")}</Text>
          <Input
            type="text"
            value={mediaInput.title}
            onChange={(e) => {
              setMediaInput((m) => ({
                ...m,
                title: e.target.value,
              }));
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
              setMediaInput((m) => ({
                ...m,
                file,
              }));
            }}
          />
        </HStack>
        <HStack>
          <Button type="submit">{t("add")}</Button>
        </HStack>
      </Stack>
    </chakra.form>
  );
};
