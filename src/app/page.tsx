import Container from "@/app/_components/container";
import { HeroPost } from "@/app/_components/hero-post";
import { Intro } from "@/app/_components/intro";
import { MoreStories } from "@/app/_components/more-stories";
import { GigList } from "@/app/components/giglist";
import { getAllPosts } from "@/lib/api";

export default function Index() {
  // const allPosts = getAllPosts();

  // const heroPost = allPosts[0];

  // const morePosts = allPosts.slice(1);

  return (
    <main>
      <Container>
        <Intro />

        <div className="mb-32">
          <GigList />
        </div>

      </Container>
    </main>
  );
}
