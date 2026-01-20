'use client';

import { ReactNode } from 'react';

interface SectionProps {
  id: string;
  title: string;
  number: string;
  children: ReactNode;
}

export function Section({ id, title, number, children }: SectionProps) {
  return (
    <section id={id} className="section scroll-mt-20">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-3">
        <span className="text-cyan">[{number}]</span>
        <span className="text-green glow-green">{title}</span>
      </h2>
      {children}
    </section>
  );
}
