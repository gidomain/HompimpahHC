export type Track = {
  id: string;
  title: string;
  src: string;
};

export const TRACKS: Track[] = [
  {
    id: 'hari-ini',
    title: 'HARI INI',
    src: '/audio/hari-ini-hompimpah.mp4',
  },
  // Tambahin lagu lain di sini:
  // { id: 'lagu-2', title: 'JUDUL LAGU 2', src: '/audio/nama-file-2.mp4' },
];

// Helper kalau nanti playlist-nya udah banyak
export const HAS_PLAYLIST = TRACKS.length > 1;