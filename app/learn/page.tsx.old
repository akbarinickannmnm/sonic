import Link from "next/link";
import { notFound } from "next/navigation";
import { diseases } from "../../../data/diseases";

type Props = {
  params: Promise<{ disease: string }>;
};

export default async function DiseaseLearnPage({ params }: Props) {
  const { disease: encodedDisease } = await params;
  const diseaseId = decodeURIComponent(encodedDisease);
  const disease = diseases.find((item) => item.id === diseaseId);

  if (!disease) notFound();

  return (
    <main dir="rtl" className="min-h-screen bg-[#fbfaf8] px-5 py-10 text-[#10213f]">
      <div className="mx-auto w-full max-w-[1000px]">
        <div className="mb-10 flex justify-start" dir="ltr">
          <Link
            href="/"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium shadow-sm transition hover:bg-slate-50"
          >
            Home ←
          </Link>
        </div>

        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_8px_28px_rgba(15,23,42,0.04)] sm:p-12">
          <p className="text-sm font-medium text-slate-500">مرور و یادگیری</p>
          <h1 className="mt-3 text-4xl font-semibold text-[#102b4d]">{disease.name}</h1>
          <p className="mt-5 max-w-2xl text-slate-600">
            صفحه‌ی یادگیری این تشخیص. Review Questions، نکات بالینی، تصاویر و یافته‌های Investigation در این بخش قرار می‌گیرند.
          </p>
        </section>
      </div>
    </main>
  );
}
