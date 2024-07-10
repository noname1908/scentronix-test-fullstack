import { api, HydrateClient } from "@/trpc/server";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <Container maxWidth="lg" className="mt-14">
        <Box className="flex flex-col gap-4 lg:flex-row lg:items-start">
          <Typography component="p" className="mt-20 text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
            ipsam animi maiores id illo quaerat a adipisci est? Quos obcaecati
            consequatur aliquam tempora ea placeat reiciendis similique harum
            praesentium sunt? Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Sed ducimus, voluptas molestias vitae quam
            cupiditate aspernatur recusandae magnam consectetur, possimus ab
            obcaecati perspiciatis eos. Voluptatum facilis doloremque amet sit
            repellendus.
          </Typography>
        </Box>
      </Container>
    </HydrateClient>
  );
}
