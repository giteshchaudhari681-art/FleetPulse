import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { App } from '../src/App';

// Mock fetch to prevent actual network requests during rendering test
global.fetch = vi.fn(() => 
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ status: 'ok', version: '1.0.0' }),
    status: 200,
  } as Response)
);

describe('App', () => {
  it('renders without crashing', async () => {
    render(<App />);
    
    // Check that the App Shell renders
    expect(screen.getAllByText('FleetPulse')[0]).toBeInTheDocument();
    
    // Check that the Home Page renders
    expect(screen.getByText('System Status')).toBeInTheDocument();
  });
});
