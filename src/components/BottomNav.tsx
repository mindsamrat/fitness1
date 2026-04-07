'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Dashboard', icon: '📊' },
  { href: '/food-log', label: 'Food', icon: '🍽️' },
  { href: '/exercise-log', label: 'Exercise', icon: '💪' },
  { href: '/photo-analyzer', label: 'Camera', icon: '📷' },
  { href: '/profile', label: 'Profile', icon: '👤' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[var(--card)] border-t border-[var(--border)] z-50">
      <div className="max-w-lg mx-auto flex justify-around">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-2 px-3 text-xs transition-colors ${
                active
                  ? 'text-[var(--primary)] font-semibold'
                  : 'text-[var(--muted)] hover:text-[var(--foreground)]'
              }`}
            >
              <span className="text-xl mb-0.5">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
