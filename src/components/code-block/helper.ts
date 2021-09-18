export function decodeSource(str: string) {
  return decodeURIComponent(str);
}

export function filterToc(str: string) {
  return decodeSource(str)
    .split(/^\s*-{3,}$/gm)
    .slice(3)
    .join('');
}
export function formatDateTime(timestamp: number) {
  const date = new Date(Number(timestamp));
  const y = date.getFullYear();
  const mon = date.getMonth() + 1;
  const day = date.getDate();
  const h = date.getHours();
  const m = date.getMinutes();
  // const s = date.getSeconds();

  function i(s: number, fillLength = 2) {
    let r = String(s);
    while (r.length < fillLength) {
      r = '0' + r;
    }
    return r;
  }

  return [y, i(mon), i(day)].join('-') + ' ' + [i(h), i(m)].join(':');
}
