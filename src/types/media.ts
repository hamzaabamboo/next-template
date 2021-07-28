import { Tag } from "@chakra-ui/react";

export type MediaType = string;

export interface Media {
  id: string;
  title: string;
  type: MediaType;
  file: File;
  tags: string[];
  createdDate: Date;
  updatedDate: Date;
}

export interface MediaDBEntry {
  id: string;
  title: string;
  type: MediaType;
  filename: string;
  blob: Blob;
  tags: Tag[];
  createdDate: Date;
  updatedDate: Date;
}

export interface Tag {
  id: string;
  name: string;
}

export interface Collection {
  id: string;
  name: string;
  media: Media[];
}

export type TagInput = Omit<Tag, "id">;
export type MediaInput = Omit<Media, "id" | "createdDate" | "updatedDate">;
export type CollectionInput = Omit<Collection, "id" | "media">;
