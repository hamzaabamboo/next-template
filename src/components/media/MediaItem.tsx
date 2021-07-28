import {
  HStack,
  Button,
  Image,
  Text,
  Box,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useStore } from "~/hooks/state";
import { Media, Tag } from "~/types/media";
import { TagDisplay } from "../tag/Tag";

export const MediaItem = ({
  media,
  isCard,
}: {
  media: Media;
  isCard: boolean;
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const tags = useStore((state) =>
    media.tags.map((id) => state.tag.tags.find((t) => t.id === id))
  );
  const bgColor = useColorModeValue("gray.200", "gray.700");
  const url = useMemo(() => {
    return URL.createObjectURL(media.file);
  }, [media.file]);
  return (
    <Box p={1} width={isCard ? ["50%", null, "33.3333%", "25%"] : "full"}>
      <Box p={2} rounded="md" bgColor={bgColor} w="full" h="full">
        <Stack
          justifyContent="space-between"
          direction={isCard ? "column" : "row"}
          alignItems="stretch"
        >
          <Stack
            alignItems="center"
            direction={isCard ? "column" : "row"}
            justifyContent="center"
          >
            <Stack height="120px" width={isCard ? "full" : "120px"}>
              <Image
                maxHeight="100%"
                maxWidth="100%"
                margin="auto"
                width="auto"
                height="auto"
                src={url}
                alt={media.title}
              />
            </Stack>
            <Stack
              justifyContent="flex-start"
              alignItems="start"
              h="full"
              w="full"
              dir={isCard ? "column" : "row"}
            >
              <Text fontWeight={"bold"} py={2} fontSize="lg">
                {media.title}
              </Text>
              {tags.length > 0 && (
                <HStack>
                  {tags
                    .filter((t): t is Tag => !!t)
                    .map((t) => (
                      <TagDisplay key={t.id} tag={t} />
                    ))}
                </HStack>
              )}
            </Stack>
          </Stack>
          {false && (
            <Stack>
              <Button size="sm" colorScheme="yellow">
                {t("edit")}
              </Button>
              <Button
                size="sm"
                colorScheme="red"
                onClick={() => dispatch.media.deleteMedia(media.id)}
              >
                {t("delete")}
              </Button>
            </Stack>
          )}
        </Stack>
      </Box>
    </Box>
  );
};
