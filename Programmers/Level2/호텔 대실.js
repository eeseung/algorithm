function solution(book_time) {
  const rooms = [];

  function HHMMtoMinute(string) {
    const [HH, MM] = string.split(':').map(Number);
    return HH * 60 + MM;
  }

  for (const [start, end] of book_time.sort()) {
    const startTime = HHMMtoMinute(start);
    const endTime = HHMMtoMinute(end) + 10;
    const idx = rooms.findIndex((v) => v <= startTime);

    if (idx === -1) rooms.push(endTime);
    else rooms[idx] = endTime;
  }

  return rooms.length;
}
