"use client";
import BreadCrumbs from "@/app/_components/Breadcrumbs";
import Thumbnail from "@/app/_components/Thumbnail";
import { type RouterOutputs } from "@/trpc/react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddIcon from "@mui/icons-material/Add";
import PrintIcon from "@mui/icons-material/Print";
import SettingsInputSvideoIcon from "@mui/icons-material/SettingsInputSvideo";
import { Box, Button, Typography } from "@mui/material";

type Post = RouterOutputs["posts"]["getById"];

export function PostDetail({ data }: { data: Post }) {
  if (!data) return;

  return (
    <Box className="flex flex-col gap-4 lg:flex-row lg:items-start">
      <Box className="flex-1">
        <BreadCrumbs />

        <Typography
          component="h2"
          className="mt-4 text-4xl font-semibold leading-10"
        >
          {data.title}
        </Typography>

        <Typography
          component="p"
          className="mt-20 content-end text-muted-foreground lg:min-h-48"
        >
          {data.description}
        </Typography>

        <Box className="flex flex-row gap-1 py-4">
          <AccessTimeIcon className="h-12 w-12 text-muted-foreground" />
          <Box className="flex flex-row gap-4">
            <Box className="flex flex-col">
              <Typography
                component="span"
                className="text-lg font-semibold text-muted-foreground"
              >
                Prep
              </Typography>
              <Typography
                component="span"
                className="text-lg font-semibold text-muted-foreground"
              >
                {data.prep}
              </Typography>
            </Box>
            <Box className="flex flex-col">
              <Typography
                component="span"
                className="text-lg font-semibold text-muted-foreground"
              >
                Bake
              </Typography>
              <Typography
                component="span"
                className="text-lg font-semibold text-muted-foreground"
              >
                {data.bake}
              </Typography>
            </Box>
            <Box className="flex flex-col">
              <Typography
                component="span"
                className="text-lg font-semibold text-muted-foreground"
              >
                Total
              </Typography>
              <Typography
                component="span"
                className="text-lg font-semibold text-muted-foreground"
              >
                {data.total}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          className="flex w-full flex-row gap-1 border-t border-muted py-4"
          sx={{ borderTop: 1 }}
        >
          <SettingsInputSvideoIcon className="h-12 w-12 text-muted-foreground" />
          <Box className="flex flex-1 flex-row justify-between gap-4">
            <Box className="flex flex-col">
              <Typography
                component="span"
                className="text-lg font-semibold text-muted-foreground"
              >
                Yield
              </Typography>
              <Typography
                component="p"
                className="max-w-40 text-lg font-semibold text-muted-foreground"
              >
                {data.yield}
              </Typography>
            </Box>
            <Box className="flex flex-row items-start justify-end gap-4">
              <Button
                className="flex items-center gap-2 whitespace-nowrap !border border-border text-sm text-muted-foreground"
                sx={{ border: 1 }}
              >
                <AddIcon className="text-muted-foreground" />
                Save recipes
              </Button>
              <Button
                className="flex items-center gap-2 whitespace-nowrap !border border-border text-sm text-muted-foreground"
                sx={{ border: 1 }}
              >
                <PrintIcon className="text-muted-foreground" />
                Print
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className="flex-1">
        <Thumbnail url={data.thumbnail} />
      </Box>
    </Box>
  );
}
