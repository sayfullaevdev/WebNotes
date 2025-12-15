
"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Header() {
  const { data: session } = useSession();

  return (
    // Убираем жесткий bg-card, делаем полностью прозрачным
    <header className="p-4 lg:px-8 z-20">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
            {/* Можно добавить логотип-иконку */}
            <div className="w-3 h-3 rounded-full bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.5)]"></div>
            <h1 className="text-xl font-bold tracking-tight text-slate-700">
              My<span className="text-purple-600">Notes</span>
            </h1>
        </div>

        {session?.user && (
          <div className="flex items-center gap-3 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/40 shadow-sm transition-transform hover:scale-105">
            {session.user.image && (
              <Image
                src={session.user.image}
                alt="User avatar"
                width={28}
                height={28}
                className="rounded-full ring-2 ring-white"
              />
            )}
            <span className="text-sm font-medium text-slate-600 hidden sm:inline">
              {session.user.email?.split('@')[0]}
            </span>
          </div>
        )}
      </div>
    </header>
  );
}