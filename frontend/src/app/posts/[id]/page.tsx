import ResponsiveAppBar from "@/app/_components/AppBar";
import { PostDetail } from "@/app/_components/post/Detail";
import { subMenus } from "@/app/constants";
import { api, HydrateClient } from "@/trpc/server";
import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import { notFound } from "next/navigation";

export default async function Home({ params }: { params: { id: string } }) {
  const post = await api.posts.getById({ id: params.id });

  if (!post) return notFound();

  return (
    <HydrateClient>
      <ResponsiveAppBar subMenus={subMenus} />
      <Container maxWidth="lg" className="mt-14">
        <Box className="w-full">
          <PostDetail data={post} />
        </Box>
      </Container>
    </HydrateClient>
  );
}
