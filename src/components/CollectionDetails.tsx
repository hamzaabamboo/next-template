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
import { Redirect, useParams } from "react-router-dom";

export const CollectionDetails = () => {
  const collections = useStore((s) => s.collection.collections);
  const dispatch = useDispatch();
  const [newCollection, setNewCollection] = useState("");
  const { t } = useTranslation("common");
  const params = useParams<{ id: string }>();

  if (!params.id || !collections.find((c) => c.id === params.id)) {
    return <Redirect to="/collection" />;
  }

  return (
    <Stack>
      <Text size="xl">{t("collection")}</Text>
      <Text>{params.id}</Text>
    </Stack>
  );
};
