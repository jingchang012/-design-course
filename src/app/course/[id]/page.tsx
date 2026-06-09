import { notFound } from "next/navigation";
import Link from "next/link";
import { SITE_CONTENT } from "@/constants/content";
import CourseHero from "@/components/sales/CourseHero";
import CurriculumList from "@/components/sales/CurriculumList";
import TestimonialSection from "@/components/sales/TestimonialSection";
import Navbar from "@/components/Navbar";
import { ShoppingCart } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function CourseSalesPage({ params }: Props) {
  const { id } = await params;
  const course = SITE_CONTENT.courses.find((c) => c.id === id);

  if (!course) notFound();

  const coverImage = course.coverImage.includes("{{")
    ? SITE_CONTENT.placeholders.courseCoverDefault
    : course.coverImage;

  return (
    <main className="min-h-screen bg-[var(--color-luxury-midnight)] text-[var(--color-luxury-cream)]">
      <Navbar />

      {/* Hero + Sticky Pricing */}
      <CourseHero
        title={course.title}
        description={course.description}
        coverImage={coverImage}
      />

      {/* 課程章節大綱 */}
      <CurriculumList />

      {/* 學員評價 & 信任感 */}
      <TestimonialSection />

      {/* 底部最終 CTA */}
      <section className="py-20 px-4 text-center bg-gradient-to-t from-black/40 to-transparent border-t border-white/5">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--color-luxury-cream)] mb-4">
          準備好開始你的大師之旅了嗎？
        </h2>
        <p className="text-gray-400 font-light mb-10 max-w-xl mx-auto">
          現在加入，即享早鳥優惠。名額有限，把握這個改變的機會。
        </p>
        <Link
          href="/login"
          className="inline-flex items-center px-10 py-4 bg-[var(--color-luxury-gold)] text-[var(--color-luxury-midnight)] font-bold text-lg rounded-sm hover:bg-opacity-90 transition-all shadow-[0_0_30px_rgba(197,168,128,0.4)] hover:shadow-[0_0_50px_rgba(197,168,128,0.6)]"
        >
          <ShoppingCart className="w-5 h-5 mr-3" />
          立即加入，開始蛻變
        </Link>
        <p className="text-gray-600 text-xs mt-4 font-light">30 天無條件退款保證</p>
      </section>

      <footer className="py-8 text-center border-t border-white/5">
        <p className="text-gray-600 text-sm font-light">
          © {new Date().getFullYear()} 刻度設計/ Scale Studio. All rights reserved.
        </p>
      </footer>
    </main>
  );
}

export async function generateStaticParams() {
  return SITE_CONTENT.courses.map((c) => ({ id: c.id }));
}
