export function differenceBetweenNumbers(a, b) {
  return (((Number(b) - Number(a)) / Number(a)) * 100).toFixed(2);
}

export function calculatePercDiff(a, b) {
  const diff = differenceBetweenNumbers(a, b);

  return (
    <span style={{ color: diff > 0 ? "green" : "red" }}>{` (${diff}%)`}</span>
  );
}
