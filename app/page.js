import { Suspense } from "react";
import Cards from "./Cards";

export default function Home() {
  return (
    <main>
      <Suspense fallback={<p>Loading...</p>}>
        <Cards />
      </Suspense>
    </main>
  );
}
