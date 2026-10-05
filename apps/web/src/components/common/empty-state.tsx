import type { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center rounded-lg border-2 border-dashed border-surface-200 bg-surface-50">
      {icon && <div className="text-surface-400 mb-4">{icon}</div>}
      <h3 className="text-lg font-medium text-surface-900 mb-1">{title}</h3>
      <p className="text-sm text-surface-500 max-w-sm mb-6">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}
