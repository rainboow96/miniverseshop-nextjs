import type { Metadata } from "next";
import Container from "../../components/ui/container";
import Breadcrumb, { BreadcrumbItem } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "درباره ما | مینی‌ورس",
  description:
    "داستان شکل‌گیری مینی‌ورس؛ دنیایی کوچک از هنرهای دست‌ساز و طراحی‌های اختصاصی برای علاقه‌مندان به جزئیات.",
};

const breadcrumbItems: BreadcrumbItem[] = [
  { label: "خانه", to: "/" },
  { label: "درباره ما" },
];

const sections = [
  {
    id: "story",
    title: "داستان شکل‌گیریِ مینی‌ورس",
    body: "مینی‌ورس (MiniVerse) از یک علاقه‌ی قلبی شروع شد؛ اشتیاق به جزئیات خیلی کوچک، ظریف و البته خاص. ما همیشه معتقد بودیم چیزهایی که شاید در نگاه اول خیلی بزرگ و پرزرق‌وبرق به نظر نیایند، اگر با دقت کافی ساخته شوند، می‌توانند بیشترین شخصیت و زیبایی را به فضا ببخشند. مینی‌ورس برای همین متولد شد: خلق آثاری که فراتر از یک وسیله‌ی تزئینیِ ساده، نشانه‌ای از سلیقه، دقت و هنر باشند.",
    variant: "plain" as const,
  },
  {
    id: "handmade-art",
    title: "هنرِ دست، روح دارد",
    body: "ما در مینی‌ورس به این باورِ عمیق رسیده‌ایم که «هنرِ دست» روح دارد. وقتی یک محصول با دست ساخته می‌شود، فقط یک شیءِ بی‌جان شکل نمی‌گیرد؛ بخشی از زمان، حوصله، تمرکز و احساسِ سازنده در تاروپودِ آن جاری می‌شود. همین است که یک کار دست‌ساز، تفاوتی اساسی با محصولاتِ ماشینی و تولید انبوه دارد. در کارهای ما، هر میلی‌متر معنا دارد؛ هر برش، هر ترکیبِ رنگ و هر پرداخت، نتیجه‌ی ساعت‌ها وسواس و عشق است. به همین دلیل، هیچ دو اثرِ مینی‌ورس دقیقاً شبیه هم نیستند. هر کدام هویتِ خودش را دارد و به مثابه یک اثرِ هنریِ یکتا، قصه‌ی خودش را روایت می‌کند.",
    variant: "highlighted" as const,
  },
  {
    id: "beauty",
    title: "زیبایی برای لحظه‌های تأمل",
    body: "در کنار جنبه‌ی دکوراتیو و زیباییِ بصری، این قطعاتِ ریز و ظریف، کارکردِ دلنشینِ دیگری هم دارند. وقتی این آثار را در چیدمانِ قفسه‌ها یا میزِ کارتان قرار می‌دهید، آن‌ها به بخشی از دنیایِ شما تبدیل می‌شوند. در هیاهویِ بی‌پایانِ روزمرگی‌ها و دغدغه‌های بزرگِ زندگی، وجودِ این قطعاتِ کوچک و زیبا، فرصتی برای یک «توقفِ کوتاه» ایجاد می‌کند. نگاه کردن به ظرافتِ آن‌ها، ناخودآگاه ذهنتان را برای چند لحظه از شلوغی‌های بیرون جدا می‌کند و فضایی از سکون و رهایی برایتان می‌سازد. این محصولات، یک دعوتیِ کوچک برای این هستند که کمی به جزئیات اطرافتان بیشتر دقت کنید و در دنیایِ بزرگتان، فضایی برایِ لحظه‌هایِ آرامش‌بخش باز کنید.",
    variant: "plain" as const,
  },
  {
    id: "signature",
    title: "امضای اختصاصی مینی‌ورس",
    body: "ما در مینی‌ورس به دنبالِ چیزی هستیم که حسِ «اصالت» بدهد. هدفِ ما تولید انبوه نیست، بلکه خلقِ قطعاتی است که امضایِ مخصوصِ خودشان را داشته باشند. وقتی کسی یکی از کارهای مینی‌ورس را روی میز یا کتابخانه‌اش می‌بیند، باید بفهمد که با یک وسیله‌ی دکوریِ معمولیِ بازاری طرف نیست؛ بلکه با اثری طرف است که برای ساخته شدنش زمان، سلیقه و هنرمندی خرج شده است. ما روی طراحی‌های اختصاصی و کیفیتِ اجرایِ کارها خیلی حساسیم؛ چون باور داریم چیزی که با دست و وسواس ساخته می‌شود، ارزشش فقط به ظاهرش نیست، بلکه به آن «احساسی» است که به محیط اضافه می‌کند.",
    variant: "plain" as const,
    footer:
      "مینی‌ورس یعنی همین؛ دنیایی کوچک از هنرهای دست‌ساز و طراحی‌های اختصاصی برای کسانی که به جزئیات و سبک شخصیِ خود اهمیت می‌دهند.",
  },
];

export default function AboutUsPage() {
  return (
    <main className="bg-stone-50 pb-16">
      <Container>
        <Breadcrumb items={breadcrumbItems} className="mt-10" />

        <article className="mx-auto mt-10 max-w-4xl space-y-16">
          <header className="text-center">
            <h1 className="text-2xl font-medium text-black md:text-3xl">
              داستان شکل‌گیریِ مینی‌ورس
            </h1>
          </header>

          {sections.map((section, index) => {
            const isLast = index === sections.length - 1;
            const isHighlighted = section.variant === "highlighted";

            return (
              <section
                key={section.id}
                aria-labelledby={`section-${section.id}`}
                className={
                  isHighlighted
                    ? "rounded-2xl border-r-4 border-main bg-primary p-8 shadow-sm md:p-12"
                    : isLast
                      ? "space-y-6 border-t border-stone-200 pt-12"
                      : "space-y-6"
                }
              >
                {isHighlighted ? (
                  <h2
                    id={`section-${section.id}`}
                    className="mb-6 text-2xl font-semibold text-main md:text-3xl"
                  >
                    {section.title}
                  </h2>
                ) : (
                  <h2
                    id={`section-${section.id}`}
                    className="text-2xl font-semibold text-main"
                  >
                    {section.title}
                  </h2>
                )}

                <p className="text-lg leading-loose text-stone-700 md:text-xl">
                  {section.body}
                </p>

                {section.footer && (
                  <p className="pt-4 text-lg font-medium text-stone-900">
                    {section.footer}
                  </p>
                )}
              </section>
            );
          })}
        </article>
      </Container>
    </main>
  );
}