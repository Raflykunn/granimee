"use client";

export const VideoPlayer = ({
  src,
  subtitle_src,
}: {
  src: string;
  subtitle_src: string;
}) => {
  return (
    <video width="100%" height="100%" controls>
      <source src={src} type="video/m3u8" />
      <track
        kind="subtitles"
        default
        src={subtitle_src}
        label="English"
        srcLang="en"
      />
    </video>
  );
};
