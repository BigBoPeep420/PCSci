function fibs(targetLength = 0, results = []) {
  if (targetLength === 0) return [0];
  let currentResults = results;
  if (currentResults.length === 0) currentResults.push(0);
  else {
    const a = currentResults.at(-2) || 0;
    const b = currentResults.at(-1) || 1;
    currentResults.push(a + b);
  }
  if (currentResults.length === targetLength) return currentResults;
  else return fibs(targetLength, currentResults);
}

function mergeSort(array) {
  if (array.length <= 1) return array;
  else {
    const splitPoint = Math.floor(array.length / 2);
    const a = mergeSort(array.slice(0, splitPoint));
    const b = mergeSort(array.slice(splitPoint));
    return join(a, b);
  }

  function join(a, b) {
    const joined = [];
    let i = 0;
    let j = 0;

    while (i < a.length && j < b.length) {
      if (a[i] < b[j]) {
        joined.push(a[i]);
        i++;
      } else {
        joined.push(b[j]);
        j++;
      }
    }

    return [...joined, ...a.slice(i), ...b.slice(j)];
  }
}

export { fibs, mergeSort };
