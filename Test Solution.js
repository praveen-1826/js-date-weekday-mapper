function solution(D) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const result = {};

  for (let day of days) result[day] = null;

  for (let date in D) {
    const dayIndex = (new Date(date).getDay() + 6) % 7; // convert Sunday=0 to Sunday=6
    const dayName = days[dayIndex];
    result[dayName] = (result[dayName] || 0) + D[date];
  }

  for (let i = 0; i < days.length; i++) {
    if (result[days[i]] === null) {
      let prev = i - 1;
      let next = i + 1;

      while (prev >= 0 && result[days[prev]] === null) prev--;
      while (next < days.length && result[days[next]] === null) next++;

      if (prev >= 0 && next < days.length) {
        result[days[i]] = Math.round((result[days[prev]] + result[days[next]]) / 2);
      } else if (prev >= 0) {
        result[days[i]] = result[days[prev]];
      } else if (next < days.length) {
        result[days[i]] = result[days[next]];
      }
    }
  }

  return result;
}

// TESTING 

console.log(solution({
  '2020-01-01': 4,
  '2020-01-02': 4,
  '2020-01-03': 6,
  '2020-01-04': 8,
  '2020-01-05': 2,
  '2020-01-06': -6,
  '2020-01-07': 2,
  '2020-01-08': -2
}));

console.log(solution({
  '2020-01-01': 6,
  '2020-01-04': 12,
  '2020-01-05': 14,
  '2020-01-06': 2,
  '2020-01-07': 4
}));
