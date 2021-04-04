export function decodeSource(str: string) {
  return decodeURIComponent(str);
}

export function filterToc(str: string) {
  return decodeSource(str).split(/^\s*-{3,}$/gm)
    .slice(3)
    .join('');
}
