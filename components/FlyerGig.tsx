export function FlyerGig({
  date, city, venue, status, rotate = -3,
}: {
  date: string;
  city: string;
  venue: string;
  status: 'OPEN' | 'FAST' | 'SOLD';
  rotate?: number;
}) {
  const statusMap = {
    OPEN: { label: 'TIKET TERSEDIA', color: '#f0ece0' },
    FAST: { label: 'HAMPIR HABIS', color: '#3a3a3a' },
    SOLD: { label: 'SOLD OUT', color: '#7a7a7a' },
  };
  const s = statusMap[status];

  return (
    <div
      className="hc-tape hc-rip-bottom relative bg-[#f0ece0] text-[#000000] p-5 md:p-6 pt-7"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="flex items-baseline justify-between gap-3 mb-3">
        <span className="hc-tag">{date}</span>
        <span className="hc-tag" style={{ color: s.color === '#f0ece0' ? '#000000' : s.color }}>
          {s.label}
        </span>
      </div>
      <h3 className="hc-display text-3xl md:text-4xl leading-none mb-2">
        {city}
      </h3>
      <p className="font-bold text-xs tracking-widest uppercase mb-4">{venue}</p>
      <button
        disabled={status === 'SOLD'}
        className="w-full py-3 bg-[#000000] text-[#f0ece0] font-bold text-xs tracking-[0.3em] uppercase disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#3a3a3a] transition-colors"
      >
        {status === 'SOLD' ? 'HABIS' : 'BELI TIKET'}
      </button>
    </div>
  );
}