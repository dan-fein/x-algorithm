'use client';

import { ReactNode } from 'react';

interface TerminalWindowProps {
  title?: string;
  children: ReactNode;
}

export function TerminalWindow({ title = "terminal", children }: TerminalWindowProps) {
  return (
    <div className="terminal-window">
      <div className="terminal-header">{title}</div>
      <div className="p-4">{children}</div>
    </div>
  );
}
