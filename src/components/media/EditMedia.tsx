import React, { useEffect, useState } from "react";
import { useDispatch } from "~/hooks/state";
import { Media, MediaInput } from "~/types/media";
import { MediaInputForm } from "./MediaInputForm";

export const EditMedia = ({ media }: { media: Media }) => {
  const dispatch = useDispatch();
  const [mediaInput, setMediaInput] = useState<Partial<MediaInput>>(media);

  useEffect(() => {
    setMediaInput(media);
  }, [media]);

  const handleEditMedia = () => {
    if (!mediaInput.title || !mediaInput.file) return;
    dispatch.media.editMedia({
      id: media.id,
      input: {
        ...media,
        ...mediaInput,
      },
    });
  };

  return (
    <MediaInputForm
      value={mediaInput}
      onChange={setMediaInput}
      onSubmit={handleEditMedia}
    />
  );
};
