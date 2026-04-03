import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/intro";
import { GigList } from "@/app/components/giglist";

export default function Index() {
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
