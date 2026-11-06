export function cn(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

export function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export function daysAgo(d: string, now = new Date()) {
  const diff = Math.max(0, Math.floor((now.getTime() - new Date(d).getTime()) / 86400000));
  if (diff === 0) return "Today";
  if (diff === 1) return "1 day ago";
  if (diff < 7) return `${diff} days ago`;
  if (diff < 60) {
    const w = Math.floor(diff / 7);
    return w === 1 ? "1 week ago" : `${w} weeks ago`;
  }
  const m = Math.floor(diff / 30);
  return `${m} months ago`;
}
