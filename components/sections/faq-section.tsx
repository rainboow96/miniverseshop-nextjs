import Link from "next/link";
import { faqItems } from "@/components/data/faq";
import Container from "../ui/container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  HelpCircle,
  MessageCircleQuestion,
  Headphones,

} from "lucide-react";
import { Button } from "../ui/button";

interface FaqSectionProps {
  readonly title?: string;
  readonly description?: string;
  readonly className?: string;
}

export default function FaqSection({
  title = "سوالات متداول",
  description = "پاسخ سریع به تمام پرسش‌هایی که ممکن است داشته باشید.",
  className = "",
}: FaqSectionProps) {
  return (
    <Container size="xl">
      <section
        aria-labelledby="faq-title"
        className={`relative my-12 overflow-hidden py-6 ${className}`}
      >

        <div className="pointer-events-none absolute -top-12 right-1/4 -z-10 h-72 w-72 rounded-full bg-main/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 left-1/4 -z-10 h-72 w-72 rounded-full bg-secondary/15 blur-3xl" />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <div className="space-y-3">

              <h2
                id="faq-title"
                className="text-2xl font-extrabold text-stone-900 sm:text-3xl md:text-4xl leading-tight"
              >
                {title}
              </h2>

              <p className="text-sm font-medium leading-relaxed text-stone-500 sm:text-base">
                {description}
              </p>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-stone-200/80 bg-gradient-to-br from-white to-stone-50/80 p-6 shadow-sm backdrop-blur-md">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary/15 text-secondary">
                  <Headphones className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-stone-800">
                    جواب سوالت رو پیدا نکردی؟
                  </h3>
                  <p className="text-xs leading-relaxed text-stone-500">
                    تیم پشتیبانی مینی‌ورس همیشه اینجاست تا راهنماییت کنه.
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2.5">
                <Button asChild variant="primary" className="flex-1 rounded-xl shadow-sm">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold"
                  >
                    <MessageCircleQuestion className="h-4 w-4" />
                    <span>ارتباط با پشتیبانی</span>
                  </Link>
                </Button>

              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <Accordion type="single" collapsible defaultValue="item-1" className="space-y-3.5">
              {faqItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={`item-${item.id}`}
                  className="group rounded-2xl border border-stone-200/80 bg-white/80 p-1.5 shadow-xs transition-all duration-200 hover:border-main/50 hover:shadow-md data-[state=open]:border-main data-[state=open]:bg-white data-[state=open]:shadow-md"
                >
                  <AccordionTrigger className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-right text-sm font-bold text-stone-800 transition-colors hover:text-main hover:no-underline md:text-base">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-stone-100 text-stone-500 transition-colors group-hover:bg-main/10 group-hover:text-main group-data-[state=open]:bg-main group-data-[state=open]:text-white">
                        <HelpCircle className="h-4 w-4" />
                      </span>
                      <span>{item.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-4 pt-1 text-right text-xs leading-relaxed text-stone-600 md:text-sm md:leading-7">
                    <div className="border-t border-stone-100 pt-3">
                      {item.answer}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

        </div>
      </section>
    </Container>
  );
}
