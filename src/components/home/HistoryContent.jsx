import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

export default function HistoryContent() {
  const HISTORY_KEY = "health_upload_history_v1";
  const [filter, setFilter] = useState("all"); // all | food | activity
  const [query, setQuery] = useState("");

  const items = useMemo(() => {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((it) => {
      if (!it || !it.type) return false;
      if (filter !== "all" && it.type !== filter) return false;
      if (!q) return true;
      const itemParts = Array.isArray(it.foodItems) ? it.foodItems.flatMap((f) => [f?.name, f?.detail]) : [];
      const haystack = [
        it.type === "food" ? "makanan" : "olahraga",
        it.foodName,
        it.activityType,
        it.workoutSummary,
        it.nutritionNotes,
        ...itemParts,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [items, filter, query]);

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-emerald-50/80 dark:bg-zinc-950/80 backdrop-blur-xl no-border shadow-none max-w-[375px] mx-auto">
        <Link to="/home" className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-emerald-100/50 transition-colors active:scale-95 duration-150">
          <span className="material-symbols-outlined text-emerald-700">arrow_back</span>
        </Link>
        <span className="text-2xl font-black tracking-tighter text-emerald-800 dark:text-emerald-400">History</span>
        <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-emerald-100/50 transition-colors active:scale-95 duration-150">
          <span className="material-symbols-outlined text-emerald-700">notifications</span>
        </button>
      </header>

      <main className="pt-24 pb-32 px-6 space-y-8">
        <section>
          <div className="relative flex items-center">
            <span className="absolute left-4 material-symbols-outlined text-on-surface-variant" data-icon="search">
              search
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-surface-container-highest border-none rounded-2xl focus:ring-2 focus:ring-primary/40 focus:bg-surface-container-lowest transition-all text-on-surface placeholder:text-on-surface-variant/60"
              placeholder="Cari history (makanan / olahraga)..."
              type="text"
            />
          </div>
        </section>

        <section className="overflow-x-auto no-scrollbar -mx-6">
          <div className="flex gap-3 px-6">
            <button
              onClick={() => setFilter("all")}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full font-semibold text-sm shadow-lg transition-colors ${
                filter === "all"
                  ? "bg-primary-container text-on-primary-container shadow-primary/10"
                  : "bg-surface-container-high text-on-surface-variant font-medium hover:bg-surface-container-highest"
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setFilter("food")}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm shadow-lg transition-colors ${
                filter === "food"
                  ? "bg-primary-container text-on-primary-container shadow-primary/10 font-semibold"
                  : "bg-surface-container-high text-on-surface-variant font-medium hover:bg-surface-container-highest"
              }`}
            >
              Makanan
            </button>
            <button
              onClick={() => setFilter("activity")}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm shadow-lg transition-colors ${
                filter === "activity"
                  ? "bg-primary-container text-on-primary-container shadow-primary/10 font-semibold"
                  : "bg-surface-container-high text-on-surface-variant font-medium hover:bg-surface-container-highest"
              }`}
            >
              Aktivitas
            </button>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex justify-between items-end">
            <h2 className="text-2xl font-extrabold tracking-tight">History Upload</h2>
            <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">{filtered.length} item</span>
          </div>

          {filtered.length === 0 ? (
            <div className="p-6 rounded-[2rem] bg-surface-container-lowest border border-outline-variant/10 text-center">
              <p className="text-on-surface font-bold">Belum ada history</p>
              <p className="text-on-surface-variant text-sm mt-1">Upload foto makanan/olahraga dari halaman Home, nanti muncul di sini.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((it) => (
                <Link
                  to={`/history/${it.id}`}
                  key={it.id}
                  className="group flex gap-4 p-4 rounded-[1.5rem] bg-white border border-slate-100 shadow-[0_10px_24px_rgba(15,23,42,0.06)] hover:shadow-[0_14px_28px_rgba(15,23,42,0.1)] active:scale-[0.99] transition-all"
                >
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                    <img src={it.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${
                          it.type === "food" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {it.type === "food" ? "Makanan" : "Olahraga"}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {new Date(it.createdAt).toLocaleString("id-ID")}
                      </span>
                    </div>
                    <p className="text-slate-900 font-bold mt-2 leading-tight">
                      {it.type === "food"
                        ? it.foodName || "Upload makanan"
                        : it.activityType || it.foodName || "Upload olahraga"}
                    </p>
                    <p className="text-slate-500 text-sm mt-1 line-clamp-2">
                      {it.type === "food"
                        ? it.nutritionNotes || "Foto konsumsi makanan untuk tracking nutrisi."
                        : it.workoutSummary || it.nutritionNotes || "Screenshot ringkasan workout (AI)."}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">Lihat detail</span>
                      <span className="text-xs font-bold text-primary">
                        {it.calories != null && it.calories !== "" ? `${it.calories} kkal` : "—"}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

      </main>

      {/* <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-t-3xl shadow-[0_-8px_24px_rgba(23,29,25,0.06)]">
        <div className="flex flex-col items-center justify-center bg-emerald-100/60 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 rounded-2xl px-5 py-2.5 transition-all active:scale-90 duration-200 ease-out">
          <span className="material-symbols-outlined" data-icon="home_max" style={{ fontVariationSettings: "'FILL' 1" }}>
            home_max
          </span>
          <span className="font-['Inter'] font-medium text-[11px] tracking-wide mt-1">Home</span>
        </div>
        <div className="flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-500 px-5 py-2.5 hover:text-emerald-500 transition-all active:scale-90 duration-200 ease-out">
          <span className="material-symbols-outlined" data-icon="restaurant_menu">
            restaurant_menu
          </span>
          <span className="font-['Inter'] font-medium text-[11px] tracking-wide mt-1">Menu</span>
        </div>
        <div className="flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-500 px-5 py-2.5 hover:text-emerald-500 transition-all active:scale-90 duration-200 ease-out">
          <div className="relative">
            <span className="material-symbols-outlined" data-icon="shopping_bag">
              shopping_bag
            </span>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-tertiary rounded-full" />
          </div>
          <span className="font-['Inter'] font-medium text-[11px] tracking-wide mt-1">Cart</span>
        </div>
        <div className="flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-500 px-5 py-2.5 hover:text-emerald-500 transition-all active:scale-90 duration-200 ease-out">
          <span className="material-symbols-outlined" data-icon="person">
            person
          </span>
          <span className="font-['Inter'] font-medium text-[11px] tracking-wide mt-1">Profile</span>
        </div>
      </nav> */}
         <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-100 px-6 py-3 flex justify-between items-center z-20">
          <Link className="flex flex-col items-center gap-1 text-primary" to="/home">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              grid_view
            </span>
            <span className="text-[10px] font-bold">Dashboard</span>
          </Link>
          <Link className="flex flex-col items-center gap-1 text-slate-400" to="/nutrition/insight">
            <span className="material-symbols-outlined">restaurant</span>
            <span className="text-[10px] font-medium">Makanan</span>
          </Link>
          <div className="relative -top-8">
            <Link to="/activity/capture" className="size-14 bg-primary rounded-full text-white shadow-xl shadow-primary/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">add</span>
            </Link>
          </div>
          <Link className="flex flex-col items-center gap-1 text-slate-400" to="/workout/insight">
            <span className="material-symbols-outlined">exercise</span>
            <span className="text-[10px] font-medium">Workout</span>
          </Link>
          <Link className="flex flex-col items-center gap-1 text-slate-400" to="/profile">
            <span className="material-symbols-outlined">person</span>
            <span className="text-[10px] font-medium">Profil</span>
          </Link>
        </nav>
    </div>
  );
}
