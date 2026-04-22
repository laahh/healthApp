export default function TopAppBar({ title = "Kupa" }) {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-emerald-50/80 dark:bg-zinc-950/80 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <button className="hover:bg-emerald-100/50 dark:hover:bg-zinc-800/50 transition-colors p-2 rounded-full active:scale-95 duration-150 text-emerald-700 dark:text-emerald-400">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="font-headline font-bold text-lg text-emerald-700 dark:text-emerald-400">
          {title}
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <button className="hover:bg-emerald-100/50 dark:hover:bg-zinc-800/50 transition-colors p-2 rounded-full active:scale-95 duration-150 text-emerald-700 dark:text-emerald-400">
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </div>
    </header>
  );
}
