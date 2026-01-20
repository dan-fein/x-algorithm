'use client';

import { useState } from 'react';

const sections = [
  { id: 'tldr', label: 'how it works' },
  { id: 'engagement', label: '19 signals' },
  { id: 'scoring', label: 'scoring' },
  { id: 'network', label: 'in-network' },
  { id: 'diversity', label: 'diversity' },
  { id: 'filters', label: 'filters' },
  { id: 'pipeline', label: 'pipeline' },
  { id: 'sources', label: 'sources' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 px-2 py-1 border border-[#222] bg-black text-dim text-sm hover:text-[#a0a0a0]"
      >
        {isOpen ? '[x]' : '[=]'}
      </button>

      {isOpen && (
        <nav className="fixed top-12 right-4 z-40 p-4 border border-[#222] bg-black text-sm">
          <ul className="space-y-1">
            {sections.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => setIsOpen(false)}
                  className="nav-link block py-1 hover:text-[#a0a0a0]"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-[#222] text-dim text-xs">
            <a
              href="https://github.com/xai-org/x-algorithm"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[#a0a0a0]"
            >
              source
            </a>
          </div>
        </nav>
      )}
    </>
  );
}
