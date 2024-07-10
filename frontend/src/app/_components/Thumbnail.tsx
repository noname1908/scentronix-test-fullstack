"use client";
import Box from "@mui/material/Box";
import Image from "next/image";

export default function Thumbnail({ url }: { url: string }) {
  return (
    <Box className="relative aspect-4/3 w-full">
      <Image loader={() => url} src={url} fill alt="image" />
    </Box>
  );
}
