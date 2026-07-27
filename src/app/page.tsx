import Hero from "@/components/home/Hero";

function Page() {
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6">
          <Hero />
      </div>
    </section>
  );
}

export default Page;
