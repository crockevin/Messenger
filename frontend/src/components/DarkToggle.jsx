import { useState } from 'react';
import { DarkModeToggle } from '@anatoliygatt/dark-mode-toggle';

export function DarkToggle() {
  const [mode, setMode] = useState('dark');
  return (
    <DarkModeToggle
      mode={mode}
      size="sm"
      inactiveTrackColor="#e4ebf2"
      inactiveTrackColorOnHover="#BBDDF2"
      inactiveTrackColorOnActive="#cbd5e1"
      activeTrackColor="#242526"
      activeTrackColorOnHover="#013440"
      activeTrackColorOnActive="#0f172a"
      inactiveThumbColor="#1e293b"
      activeThumbColor="#BBDDF2"
      onChange={(mode) => {
        setMode(mode);
      }}
    />
  );
}