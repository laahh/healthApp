import { Link, useSearchParams } from "react-router-dom";

const ACTIVITY_PRESETS = {
  lari: {
    title: "Lari Pagi",
    image:
      "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=900&auto=format&fit=crop&q=80",
    imageAlt: "Pelari di jalur lari pagi",
    metaLine: "Kemarin • 10.2 km",
    calories: 540,
    caloriesLabel: "540 kkal",
    badge: "Kardio",
    duration: "~55 menit",
    description:
      "Sesi lari pagi dengan ritme stabil di area sekitar. Jarak tempuh sekitar 10,2 km—cocok untuk membakar kalori, melatih daya tahan kardiovaskular, dan memulai hari dengan energi positif. Pastikan pemanasan dan pendinginan cukup.",
  },
  yoga: {
    title: "Yoga Meditasi",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=900&auto=format&fit=crop&q=80",
    imageAlt: "Sesi yoga dan meditasi",
    metaLine: "Selasa • 30 menit",
    calories: 120,
    caloriesLabel: "120 kkal",
    badge: "Fleksibilitas",
    duration: "30 menit",
    description:
      "Gabungan pose yoga ringan dan meditasi napas untuk menurunkan stres, meningkatkan fleksibilitas, dan fokus mental. Intensitas rendah–sedang; ideal di pagi atau sore hari sebelum aktivitas berat.",
  },
  sarapan: {
    title: "Sarapan Oatmeal & Buah",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAlcDH2JIlz1DzvKwKNdeO5W-zpytrntZ-6qwOvCtsDxwnG1KCnwsO0PAcTiI1cOfMUpZYIaibXGkOXmS-CClXdo-eqjL8019GSl9M9cHyrCdPcikKys8xekMAA84TyZxsBfCv-DkITTPwKpvoKnwsBpz4Bt2jriGbrC9sA89Wlnv3pOXXvXwWpFMSA5u8JHWnrfMDmVFnP4O8EzMgFemKsBlQ2S0JuDVG_lFuTx03jWk49EJVC9mcEAFAnEgYbMEMeG_gbotxNi3Y",
    imageAlt: "Bowl sehat dengan oatmeal dan buah",
    metaLine: "Hari ini • 07:30",
    calories: 320,
    caloriesLabel: "320 kkal",
    badge: "Sarapan",
    duration: "Sekitar 15 menit",
    description:
      "Oatmeal dengan potongan buah segar—kombinasi karbohidrat kompleks, serat, dan vitamin. Cocok sebagai sarapan seimbang sebelum aktivitas; estimasi kalori untuk satu porsi standar.",
  },
};

export default function ActivityRunDetailContent() {
  const [searchParams] = useSearchParams();
  const presetKey = searchParams.get("preset") || "lari";
  const preset = ACTIVITY_PRESETS[presetKey] || ACTIVITY_PRESETS.lari;

  return (
    <div className="bg-surface text-on-surface antialiased max-w-[375px] mx-auto min-h-screen relative pb-32">
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-emerald-50/80 dark:bg-zinc-950/80 backdrop-blur-xl no-border shadow-none max-w-[375px] mx-auto">
        <Link to="/home" className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-emerald-100/50 transition-colors active:scale-95 duration-150">
          <span className="material-symbols-outlined text-emerald-700">arrow_back</span>
        </Link>
        <span className="text-2xl font-black tracking-tighter text-emerald-800 dark:text-emerald-400">Detail</span>
        <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-emerald-100/50 transition-colors active:scale-95 duration-150">
          <span className="material-symbols-outlined text-emerald-700">notifications</span>
        </button>
      </header>

      <main className="pt-20">
        <div className="relative w-full h-[320px] overflow-hidden">
          <img alt={preset.imageAlt} className="w-full h-full object-cover" src={preset.image} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute top-4 right-4 w-10 h-10 bg-surface-container-lowest/90 backdrop-blur-md rounded-full border border-white/60 shadow-[0_6px_18px_rgba(23,29,25,0.12)] flex items-center justify-center">
            <span className="material-symbols-outlined text-tertiary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              favorite
            </span>
          </div>
        </div>

        <section className="px-6 -mt-8 relative z-10 bg-surface rounded-t-[32px] pt-8">
          <div className="flex justify-between items-start mb-2">
            <h1 className="text-2xl font-extrabold text-on-surface tracking-tight leading-tight max-w-[70%]">{preset.title}</h1>
            <p className="text-xl font-bold text-primary">{preset.caloriesLabel}</p>
          </div>
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <div className="flex items-center gap-1 bg-surface-container-low px-3 py-1 rounded-full">
              <span className="material-symbols-outlined text-amber-500 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
              <span className="text-sm font-bold text-on-surface">{preset.badge}</span>
            </div>
            <div className="flex items-center gap-1 text-on-surface-variant">
              <span className="material-symbols-outlined text-sm">schedule</span>
              <span className="text-sm font-medium">{preset.duration}</span>
            </div>
          </div>
          <p className="text-sm text-on-surface-variant mb-4">
            <span className="font-semibold text-on-surface">{preset.metaLine}</span>
          </p>
          <p className="text-on-surface-variant body-md leading-relaxed mb-8">{preset.description}</p>

          <div className="space-y-8 pb-12">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-on-surface">Ringkasan</h2>
                <span className="bg-secondary-container text-on-secondary-container px-3 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-widest">Default</span>
              </div>
              <div className="rounded-2xl bg-surface-container-low p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">Estimasi energi</span>
                  <span className="font-bold text-on-surface">{preset.caloriesLabel}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">Konteks</span>
                  <span className="font-semibold text-on-surface text-right max-w-[60%]">{preset.metaLine}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="fixed bottom-0 left-0 w-full z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl px-6 pb-8 pt-4 border-t border-zinc-100/10 max-w-[375px] mx-auto">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-xs text-on-surface-variant font-medium">Total kalori</span>
            <span className="text-xl font-black text-on-surface">{preset.caloriesLabel}</span>
          </div>
          <Link
            to="/home"
            className="flex-1 h-14 rounded-full bg-gradient-to-br from-primary-container to-primary text-white font-bold text-lg flex items-center justify-center gap-2 shadow-[0_8px_24px_rgba(0,106,63,0.3)] active:scale-95 duration-150"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              home
            </span>
            Kembali
          </Link>
        </div>
      </footer>
    </div>
  );
}
