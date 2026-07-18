// Deterministic placeholder portrait per roll number (same student always
// gets the same face) using randomuser.me's male portrait set — this demo's
// only seeded student is male; a real multi-student app would derive gender
// from student data instead of hardcoding the "men" set.
export function getAvatarUrl(rollNumber: string) {
  let hash = 0;
  for (let i = 0; i < rollNumber.length; i++) {
    hash = (hash * 31 + rollNumber.charCodeAt(i)) >>> 0;
  }
  const index = hash % 100;
  return `https://randomuser.me/api/portraits/men/${index}.jpg`;
}
