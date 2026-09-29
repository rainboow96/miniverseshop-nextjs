//برای حالت لودینگ حرفه‌ای و بدون پرش
import Container from "@/components/ui/container";

export default function Loading() {
  return (
    <Container className="py-6 animate-pulse">
      <div className="h-6 w-48 rounded-md bg-muted mb-6" />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <aside className="lg:col-span-1">
          <div className="h-96 rounded-2xl bg-muted/60" />
        </aside>

        <section className="lg:col-span-3">
          <div className="h-8 w-40 rounded-md bg-muted mb-6" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-[380px] rounded-[22px] bg-muted/50 border border-border/50"
              />
            ))}
          </div>
        </section>
      </div>
    </Container>
  );
}
