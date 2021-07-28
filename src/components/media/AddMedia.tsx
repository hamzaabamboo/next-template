import React, { useState } from "react";
import { useDispatch } from "~/hooks/state";
import { MediaInput } from "~/types/media";
import { MediaInputForm } from "./MediaInputForm";

export const AddMedia = () => {
  const dispatch = useDispatch();
  const [mediaInput, setMediaInput] = useState<Partial<MediaInput>>({
    title: "",
    tags: [],
  });
  const handleAddMedia = () => {
    if (!mediaInput.title || !mediaInput.file) return;
    dispatch.media.createMedia({
      type: mediaInput.file?.type,
      tags: mediaInput.tags ?? [],
      file: mediaInput.file,
      title: mediaInput.title,
    });
    setMediaInput({
      title: "",
      tags: [],
    });
  };
  return (
    <MediaInputForm
      value={mediaInput}
      onChange={setMediaInput}
      onSubmit={handleAddMedia}
    />
  );
};
