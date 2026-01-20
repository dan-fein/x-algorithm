'use client';

import { ReactNode } from 'react';

interface TerminalWindowProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function TerminalWindow({ title = "terminal", children, className = "" }: TerminalWindowProps) {
  return (
    <div className={`terminal-window ${className}`}>
      <div className="terminal-header">
        <div className="terminal-dot red" />
        <div className="terminal-dot yellow" />
        <div className="terminal-dot green" />
        <span className="ml-3 text-dim text-sm">{title}</span>
      </div>
      <div className="p-4 sm:p-6">
        {children}
      </div>
    </div>
  );
}
