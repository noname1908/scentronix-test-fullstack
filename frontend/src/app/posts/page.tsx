import ResponsiveAppBar from "@/app/_components/AppBar";
import { PostCard } from "@/app/_components/post/Card";
import { api, HydrateClient } from "@/trpc/server";
import { Box } from "@mui/material";
import Container from "@mui/material/Container";

export default async function Home() {
  const posts = await api.posts.getList();

  return (
    <HydrateClient>
      <ResponsiveAppBar />
      <Container maxWidth="lg" className="mt-14">
        <Box className="grid grid-flow-row grid-cols-1 grid-rows-none gap-x-8 gap-y-4 md:grid-cols-2 lg:grid-flow-row lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} data={post} />
          ))}
        </Box>
      </Container>
    </HydrateClient>
  );
}
