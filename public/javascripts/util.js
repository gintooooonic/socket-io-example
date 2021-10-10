function fmtDate(date) {
  const dateObj = new Date(date);
  const h = dateObj.getHours();
  const hour = h < 12 ? (h == 0 ? 12 : h) : h - 12 == 0 ? 12 : h - 12;
  const m = dateObj.getMinutes();
  const min = m < 10 ? "0" + m : m;
  return `${h < 12 ? "오전" : "오후"} ${hour}:${min}`;
}
