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
        className="fixed top-4 right-4 z-50 px-3 py-1.5 border border-[--ds-border] bg-[--ds-gray-1000] text-[--ds-gray-400] text-sm hover:text-[--ds-gray-200] hover:border-[--ds-gray-600] transition-colors"
      >
        {isOpen ? '[x]' : '[=]'}
      </button>

      {isOpen && (
        <nav className="fixed top-14 right-4 z-40 p-4 border border-[--ds-border] bg-[--ds-gray-1000] text-sm rounded-md">
          <ul className="space-y-1">
            {sections.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => setIsOpen(false)}
                  className="nav-link block py-1.5 hover:text-[--ds-gray-100]"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-[--ds-border] text-[--ds-gray-500] text-xs">
            <a
              href="https://github.com/xai-org/x-algorithm"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[--ds-gray-200]"
            >
              source
            </a>
          </div>
        </nav>
      )}
    </>
  );
}
