import { Tag } from "@chakra-ui/react";
import { Tag as TagType } from "~/types/media";

export const TagDisplay = ({ tag }: { tag: TagType }) => {
  return <Tag>{tag.name}</Tag>;
};
