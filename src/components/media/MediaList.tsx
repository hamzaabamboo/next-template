import { List, ListItem, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useStore } from "~/hooks/state";
import { MediaItem } from "./MediaItem";

export const MediaList = () => {
  const media = useStore((s) => s.media.media);
  const { t } = useTranslation("common");

  const isCard = true;
  return (
    <Stack>
      <Text size="xl">{t("collection")}</Text>
      <Stack
        direction={isCard ? "row" : "column"}
        wrap={isCard ? "wrap" : "nowrap"}
        spacing="0"
      >
        {media.map((media) => (
          <MediaItem key={media.id} isCard={isCard} media={media} />
        ))}
      </Stack>
    </Stack>
  );
};
