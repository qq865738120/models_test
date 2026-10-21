import React from 'react'
export type IconName = 'grid' | 'box' | 'users' | 'chart' | 'settings' | 'search' | 'arrow' | 'chevron' | 'refresh' | 'close' | 'check' | 'clock' | 'truck' | 'menu' | 'info' | 'alert' | 'location' | 'file' | 'shield' | 'layers' | 'logout'
const paths: Record<IconName, React.ReactNode> = {
  grid: <><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></>,
  box: <><path d="m12 3 9 5v9l-9 5-9-5V8l9-5Z"/><path d="m3 8 9 5 9-5M12 13v9M7.5 5.5l9 5"/></>,
  users: <><circle cx="9" cy="8" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 5a3 3 0 0 1 0 6M18 15a5 5 0 0 1 3 5"/></>,
  chart: <><path d="M4 3v18h17M9 16v-5M14 16V6M19 16v-8"/></>,
  settings: <><path d="m9 3-.7 2.3-2 .9L4 5.8 2 9l1.7 1.8v2.4L2 15l2 3.2 2.3-.4 2 .9L9 21h6l.7-2.3 2-.9 2.3.4 2-3.2-1.7-1.8v-2.4L22 9l-2-3.2-2.3.4-2-.9L15 3H9Z"/><circle cx="12" cy="12" r="3"/></>,
  search: <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/></>,
  arrow: <><path d="M4 12h16m-6-6 6 6-6 6"/></>,
  chevron: <path d="m9 5 7 7-7 7"/>,
  refresh: <><path d="M20 8a8 8 0 0 0-13-4L3 8m0-5v5h5M4 16a8 8 0 0 0 13 4l4-4m0 5v-5h-5"/></>,
  close: <path d="m6 6 12 12M6 18 18 6"/>,
  check: <path d="m5 12 4 4L19 6"/>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  truck: <><path d="M2 5h12v12H2zM14 9h4l4 4v4h-8"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></>,
  menu: <path d="M4 6h16M4 12h16M4 18h16"/>,
  info: <><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7v.1"/></>,
  alert: <><path d="m12 3 10 18H2L12 3Z"/><path d="M12 9v5M12 17v.1"/></>,
  location: <><path d="M19 10c0 6-7 11-7 11S5 16 5 10a7 7 0 0 1 14 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
  file: <><path d="M13 2H5v20h14V8l-6-6Z"/><path d="M13 2v6h6M8 13h8M8 17h6"/></>,
  shield: <><path d="m12 2 9 4v6c0 6-9 10-9 10S3 18 3 12V6l9-4Z"/><path d="m8 12 3 3 5-6"/></>,
  layers: <><path d="m12 3 10 6-10 6L2 9l10-6ZM2 14l10 6 10-6"/></>,
  logout: <><path d="M9 3H3v18h6M8 12h13m-5-5 5 5-5 5"/></>
}
export function Icon({ name, size = 20, className = '' }: { name: IconName; size?: number; className?: string }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">{paths[name]}</svg>
}
export function Pelican({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M14 28c-1-6 2-14 9-14 4 0 6 3 6 6v5h13c-3 8-12 12-22 10-7-1-12-6-12-12 0-4 1-7 4-10-1 6 0 12 2 15Z" fill="currentColor"/><path d="M29 20h12l-12 6" fill="#78A9FF"/><circle cx="25" cy="19" r="1.5" fill="#17263D"/><path d="m18 34-2 6m10-5 2 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>
}
