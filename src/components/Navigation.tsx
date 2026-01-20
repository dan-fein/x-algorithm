'use client';

import { useState, useEffect } from 'react';

const sections = [
  { id: 'summary', label: '00_tldr' },
  { id: 'engagement', label: '01_engagement' },
  { id: 'scoring', label: '02_scoring' },
  { id: 'network', label: '03_network' },
  { id: 'diversity', label: '04_diversity' },
  { id: 'time', label: '05_time' },
  { id: 'filters', label: '06_filters' },
  { id: 'penalties', label: '07_penalties' },
  { id: 'pipeline', label: '08_pipeline' },
  { id: 'success', label: '09_success' },
  { id: 'failure', label: '10_failure' },
  { id: 'sources', label: '11_sources' },
];

export function Navigation() {
  const [activeSection, setActiveSection] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-[#161b22] border border-[#30363d] rounded-md"
        aria-label="Toggle navigation"
      >
        <span className="text-cyan">{isOpen ? '[-]' : '[+]'}</span>
      </button>

      {/* Navigation */}
      <nav className={`
        fixed top-0 right-0 h-screen w-64 bg-[#0d1117] border-l border-[#30363d] p-6 pt-16
        transform transition-transform duration-300 z-40
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="text-dim text-xs mb-4 font-semibold tracking-wider">
          // NAVIGATION
        </div>
        <ul className="space-y-2">
          {sections.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={() => setIsOpen(false)}
                className={`nav-link block py-1 text-sm ${
                  activeSection === id ? 'active' : ''
                }`}
              >
                {activeSection === id && <span className="text-green mr-1">&gt;</span>}
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-8 pt-4 border-t border-[#30363d]">
          <div className="text-dim text-xs mb-2">
            <span className="text-green">$</span> cat project.txt
          </div>
          <a
            href="https://github.com/dan-fein/x-algorithm"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan text-xs hover:underline block"
          >
            dan-fein/x-algorithm
          </a>
          <div className="text-dim text-xs mt-4 mb-2">
            <span className="text-green">$</span> cat source.txt
          </div>
          <a
            href="https://github.com/xai-org/x-algorithm"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan text-xs hover:underline block"
          >
            xai-org/x-algorithm
          </a>
        </div>
      </nav>
    </>
  );
}
