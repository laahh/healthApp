const navItems = [
  { key: "home", icon: "home_max", label: "Home" },
  { key: "menu", icon: "restaurant_menu", label: "Menu" },
  { key: "cart", icon: "shopping_bag", label: "Cart" },
  { key: "profile", icon: "person", label: "Profile" },
];

export default function BottomNavBar({ active = "cart" }) {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-t-3xl border-t border-zinc-100/10 shadow-[0_-8px_24px_rgba(23,29,25,0.06)]">
      {navItems.map((item) => {
        const isActive = active === item.key;
        return (
          <a
            key={item.key}
            className={`flex flex-col items-center justify-center px-5 py-2.5 transition-all active:scale-90 duration-200 ease-out ${
              isActive
                ? "bg-emerald-100/60 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 rounded-2xl"
                : "text-zinc-400 dark:text-zinc-500 hover:text-emerald-500 dark:hover:text-emerald-300"
            }`}
            href="#"
          >
            <span
              className="material-symbols-outlined"
              style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              {item.icon}
            </span>
            <span className="font-['Inter'] font-medium text-[11px] tracking-wide">
              {item.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
