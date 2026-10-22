// Tiny server-side SVG charts. No JavaScript, so they work under the strict admin CSP. Hover any point for a tooltip.
export const esc = (s: unknown) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
export const num = (n: number) => Math.round(n).toLocaleString('en-IN');
export const C = { blue: '#2a78d6', orange: '#eb6834', aqua: '#1baf7a', violet: '#6250d6', gray: '#94a3b8', grid: '#e2e8f0', ink: '#64748b' };

const niceMax = (m: number) => {
  if (m <= 5) return 5;
  const p = Math.pow(10, Math.floor(Math.log10(m))), f = m / p;
  return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * p;
};
const short = (n: number) => (n >= 1e6 ? (n / 1e6).toFixed(1).replace(/\.0$/, '') + 'M' : n >= 1e3 ? (n / 1e3).toFixed(n >= 1e4 ? 0 : 1).replace(/\.0$/, '') + 'k' : String(Math.round(n)));

export type Series = { name: string; color: string; vals: number[]; dash?: boolean; fill?: boolean };

// Line / area chart. labels[i] is shown in the tooltip; ticks are thinned automatically.
export function lineChart(labels: string[], series: Series[], opts: { h?: number; tickLabel?: (i: number) => string } = {}) {
  const W = 900, H = opts.h ?? 280, L = 44, R = 14, T = 12, B = 28, n = labels.length;
  if (!n) return '<p class="muted">No data for this period.</p>';
  const max = niceMax(Math.max(1, ...series.flatMap((s) => s.vals)));
  const x = (i: number) => L + (n === 1 ? (W - L - R) / 2 : (i * (W - L - R)) / (n - 1)), y = (v: number) => T + (H - T - B) * (1 - v / max);
  const grid = [0, 0.25, 0.5, 0.75, 1].map((f) => `<line x1="${L}" x2="${W - R}" y1="${y(max * f)}" y2="${y(max * f)}" stroke="${C.grid}"/><text x="${L - 6}" y="${y(max * f) + 4}" text-anchor="end" font-size="11" fill="${C.ink}">${short(max * f)}</text>`).join('');
  const step = Math.max(1, Math.ceil(n / 7));
  const ticks = labels.map((l, i) => (i % step === 0 || i === n - 1 ? `<text x="${x(i)}" y="${H - 8}" text-anchor="middle" font-size="11" fill="${C.ink}">${esc(opts.tickLabel ? opts.tickLabel(i) : l)}</text>` : '')).join('');
  const lines = series.map((s) => {
    const pts = s.vals.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`);
    const area = s.fill ? `<polygon points="${x(0)},${y(0)} ${pts.join(' ')} ${x(n - 1)},${y(0)}" fill="${s.color}" opacity=".10"/>` : '';
    const dots = n <= 45 && !s.dash ? s.vals.map((v, i) => `<circle cx="${x(i).toFixed(1)}" cy="${y(v).toFixed(1)}" r="2.6" fill="${s.color}" stroke="#fff" stroke-width="1.5"/>`).join('') : '';
    return `${area}<polyline points="${pts.join(' ')}" fill="none" stroke="${s.color}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"${s.dash ? ' stroke-dasharray="5 4"' : ''}/>${dots}`;
  }).join('');
  const bw = (W - L - R) / Math.max(1, n - 1);
  const hover = labels.map((l, i) => `<rect x="${(x(i) - bw / 2).toFixed(1)}" y="${T}" width="${bw.toFixed(1)}" height="${H - T - B}" fill="transparent"><title>${esc(l)}\n${series.map((s) => `${s.name}: ${num(s.vals[i] ?? 0)}`).join('\n')}</title></rect>`).join('');
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="${esc(series.map((s) => s.name).join(', '))} over time" style="display:block;height:auto">${grid}${ticks}${lines}${hover}</svg>`;
}

export const legend = (items: [string, string, boolean?][]) =>
  `<div class="lg">${items.map(([n, c, d]) => `<span><i style="background:${d ? 'transparent' : c};border:2px ${d ? 'dashed' : 'solid'} ${c}"></i>${esc(n)}</span>`).join('')}</div>`;

// Vertical columns (hour of day, weekday)
export function columns(labels: string[], vals: number[], color = C.blue, h = 150) {
  const W = 900, L = 6, B = 22, T = 8, n = labels.length, max = Math.max(1, ...vals), cw = (W - L * 2) / n;
  return `<svg viewBox="0 0 ${W} ${h}" width="100%" role="img" style="display:block;height:auto">${labels.map((l, i) => {
    const bh = Math.max(vals[i] ? 2 : 0, ((h - T - B) * vals[i]) / max), bx = L + i * cw + 2;
    return `<rect x="${bx.toFixed(1)}" y="${(h - B - bh).toFixed(1)}" width="${Math.max(2, cw - 4).toFixed(1)}" height="${bh.toFixed(1)}" rx="3" fill="${color}"><title>${esc(l)}: ${num(vals[i])}</title></rect>
<text x="${(bx + (cw - 4) / 2).toFixed(1)}" y="${h - 7}" text-anchor="middle" font-size="10.5" fill="${C.ink}">${esc(l)}</text>`;
  }).join('')}</svg>`;
}

export function spark(vals: number[], color = C.blue, w = 96, h = 26) {
  if (vals.length < 2 || !vals.some(Boolean)) return `<svg width="${w}" height="${h}" aria-hidden="true"><line x1="0" x2="${w}" y1="${h - 2}" y2="${h - 2}" stroke="${C.grid}"/></svg>`;
  const max = Math.max(...vals, 1), p = vals.map((v, i) => `${((i * (w - 2)) / (vals.length - 1) + 1).toFixed(1)},${(h - 3 - ((h - 6) * v) / max).toFixed(1)}`).join(' ');
  return `<svg width="${w}" height="${h}" aria-hidden="true"><polyline points="${p}" fill="none" stroke="${color}" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"/></svg>`;
}

// Horizontal bar list: [label, value, optional right-hand note]
export function barList(rows: [string, number, string?][], color = C.blue, total?: number) {
  if (!rows.length) return '<p class="muted">No data yet.</p>';
  const max = Math.max(1, ...rows.map((r) => r[1])), sum = total ?? rows.reduce((a, r) => a + r[1], 0);
  return `<div class="bl">${rows.map(([l, v, note]) => `<div class="blr" title="${esc(l)}: ${num(v)}"><div class="bll">${l}</div><div class="blb"><i style="width:${Math.max(1, (v / max) * 100).toFixed(1)}%;background:${color}"></i></div><div class="blv">${num(v)}${sum ? ` <small>${((v / sum) * 100).toFixed(v / sum >= 0.1 ? 0 : 1)}%</small>` : ''}${note ? ` <small>${note}</small>` : ''}</div></div>`).join('')}</div>`;
}

export const delta = (cur: number, prev: number) => {
  if (!prev && !cur) return '<span class="dl z">-</span>';
  if (!prev) return '<span class="dl u">new</span>';
  const p = ((cur - prev) / prev) * 100;
  return `<span class="dl ${p > 0.5 ? 'u' : p < -0.5 ? 'd' : 'z'}">${p > 0.5 ? '&#9650;' : p < -0.5 ? '&#9660;' : '&#9644;'} ${Math.abs(p).toFixed(Math.abs(p) >= 100 ? 0 : 1)}%</span>`;
};

export const CSS = `<style>
.tabs{display:flex;gap:6px;flex-wrap:wrap;margin:0 0 16px;border-bottom:1px solid var(--line);padding-bottom:10px}
.tabs a{padding:8px 14px;border-radius:9px;font-weight:700;font-size:14px;text-decoration:none;color:#475569}.tabs a.on{background:#eef2ff;color:#3730a3}.tabs a:hover{background:#f1f5f9}
.rng{display:flex;gap:6px;flex-wrap:wrap;align-items:center;margin:0 0 16px}.rng a{padding:6px 12px;border:1px solid var(--line);border-radius:999px;font-size:13px;font-weight:650;text-decoration:none;color:#475569;background:#fff}
.rng a.on{background:#4f46e5;border-color:#4f46e5;color:#fff}.rng form{display:flex;gap:6px;align-items:center;margin:0}.rng input{width:auto;padding:5px 8px;font-size:13px}.rng button{margin:0;padding:6px 12px}
.kpi{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:14px;margin-bottom:18px}.kpi .card{margin:0;padding:16px 18px}.kpi .stat{font-size:28px;color:var(--text)}.kpi .lbl{font-size:12px;font-weight:800;letter-spacing:.05em;text-transform:uppercase;color:var(--muted)}
.dl{font-size:12.5px;font-weight:800;white-space:nowrap}.dl.u{color:#15803d}.dl.d{color:#b91c1c}.dl.z{color:#64748b}
.two{display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:18px}.two .card{margin:0}.card h3{margin:0 0 12px;font-size:16px}.card h3 small{font-weight:500;color:var(--muted);font-size:12.5px;margin-left:6px}
.lg{display:flex;gap:16px;flex-wrap:wrap;font-size:13px;color:#475569;margin:2px 0 8px}.lg i{display:inline-block;width:14px;height:0;border-radius:2px;margin-right:6px;vertical-align:middle;height:8px;width:14px}
.bl{display:flex;flex-direction:column;gap:7px}.blr{display:grid;grid-template-columns:minmax(90px,38%) 1fr auto;gap:10px;align-items:center;font-size:13.5px}.bll{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.blb{background:#f1f5f9;border-radius:6px;height:10px;overflow:hidden}.blb i{display:block;height:100%;border-radius:6px}.blv{font-variant-numeric:tabular-nums;font-weight:700;white-space:nowrap}.blv small{color:var(--muted);font-weight:500}
.tw{overflow:auto}.tw table td,.tw table th{padding:9px 10px}.num{text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap}.ttl{max-width:380px;overflow:hidden;text-overflow:ellipsis}.ttl small{display:block;color:var(--muted)}
.note{background:#eff6ff;border:1px solid #bfdbfe;color:#1e3a8a;padding:12px 15px;border-radius:11px;margin-bottom:16px;font-size:14px}.warn{background:#fffbeb;border:1px solid #fde68a;color:#92400e;padding:12px 15px;border-radius:11px;margin-bottom:16px;font-size:14px}
.pill{display:inline-block;padding:2px 9px;border-radius:999px;font-size:11.5px;font-weight:800;background:#f1f5f9;color:#475569}.pill.n{background:#ede9fe;color:#5b21b6}.pill.p{background:#dcfce7;color:#166534}.pill.g{background:#fef3c7;color:#92400e}.pill.h{background:#e0f2fe;color:#075985}
code.k{background:#f1f5f9;padding:2px 6px;border-radius:5px;font-size:12.5px}pre.k{background:#0f172a;color:#e2e8f0;padding:14px;border-radius:10px;overflow:auto;font-size:12.5px}
@media(max-width:760px){.blr{grid-template-columns:minmax(70px,34%) 1fr auto}.two{grid-template-columns:1fr}}
</style>`;
