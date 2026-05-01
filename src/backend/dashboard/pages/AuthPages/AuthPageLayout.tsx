import React from "react";
import GridShape from "../../components/common/GridShape";
import { Link } from "react-router-dom";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-950 dark:bg-gray-950">
      {/* ── Form Side ── */}
      <div className="flex flex-col flex-1 lg:w-1/2 px-6 py-8 sm:px-10 justify-center">
        <div className="w-full max-w-md mx-auto">
          {children}
        </div>
      </div>

      {/* ── Branding Side (desktop only) ── */}
      <div className="hidden lg:flex lg:w-1/2 bg-brand-950 dark:bg-white/5 items-center justify-center relative">
        <GridShape />
        <div className="relative z-10 flex flex-col items-center max-w-xs text-center px-8">
          <Link to="/" className="block mb-6">
            <img
              width={180}
              height={48}
              src="/logo-white.png"
              alt="3NT Studio"
            />
          </Link>
          <p className="text-gray-400 dark:text-white/60 text-sm leading-relaxed">
            Platform manajemen konten terpadu untuk pengalaman digital yang lebih baik
          </p>
        </div>
      </div>
    </div>
  );
}
