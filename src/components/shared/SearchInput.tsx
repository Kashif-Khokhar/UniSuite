"use client";

import { Search } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTransition, useState, useEffect } from "react";

export default function SearchInput({ placeholder = "Search..." }: { placeholder?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentQ = searchParams.get("q") || "";
      if (currentQ === query) return;

      startTransition(() => {
        const params = new URLSearchParams(searchParams.toString());
        if (query) {
          params.set("q", query);
        } else {
          params.delete("q");
        }
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      });
    }, 300);

    return () => clearTimeout(timeout);
  }, [query, pathname, router, searchParams]);

  return (
    <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm focus-within:border-brand-400 focus-within:ring-1 focus-within:ring-brand-400">
      <Search size={18} className="text-slate-400" />
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={`w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 ${
          isPending ? "opacity-70" : ""
        }`}
      />
    </div>
  );
}
