"use client";
import Thumbnail from "@/app/_components/Thumbnail";
import paths from "@/app/paths";
import { type RouterOutputs } from "@/trpc/react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Link from "next/link";

type Post = RouterOutputs["posts"]["getById"];

export function PostCard({ data }: { data: Post }) {
  if (!data) return;

  return (
    <Card>
      <CardActionArea LinkComponent={Link} href={paths.post(data.id)}>
        <CardMedia className="relative aspect-4/3 w-full">
          <Thumbnail url={data.thumbnail} />
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
