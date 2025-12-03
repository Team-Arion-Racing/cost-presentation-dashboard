import BRSystem from "./components/br/BRSystem";
import LVSystem from "./components/lv/LVSystem";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-10">
      <main className="mx-auto w-full max-w-5xl space-y-12 px-6">
        {/* header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              className="dark:invert"
              src="/next.svg"
              alt="Next.js logo"
              width={100}
              height={20}
              priority
            />
            <h1 className="text-xl font-semibold text-black dark:text-zinc-50">
              Cost Presentation Dashboard — BR & LV
            </h1>
          </div>
        </header>

        {/* BR system */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-[#0b0b0b]">
          <BRSystem />
        </section>

        {/* LV system */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-[#0b0b0b]">
          <LVSystem />
        </section>

        {/* footer / small help text */}
        <footer className="text-sm text-zinc-500 dark:text-zinc-400">
          Dashboard reads data from <code>/public/data/cbom.csv</code>. If you
          change the CSV, refresh the page (dev server will reload).
        </footer>
      </main>
    </div>
  );
}
