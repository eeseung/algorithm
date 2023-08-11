// 마법사 상어와 파이어볼
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");
const [N, _, K] = input[0].split(" ").map(Number);
const arr = input.slice(1).map((v) => v.split(" ").map(Number));

function solution(N, K, arr) {
  let grid = Array.from({ length: N + 1 }, () =>
    Array.from({ length: N + 1 }, () => [])
  );
  let answer = 0;

  const directions = [
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
  ];

  for (const [r, c, m, s, d] of arr) {
    grid[r][c].push({ mass: m, speed: s, direction: d });
  }

  function move() {
    const nextGrid = Array.from({ length: N + 1 }, () =>
      Array.from({ length: N + 1 }, () => [])
    );

    // 파이어볼 이동
    for (let r = 1; r <= N; r++) {
      for (let c = 1; c <= N; c++) {
        for (const fireball of grid[r][c]) {
          const { mass, speed, direction } = fireball;
          let nextR = r;
          let nextC = c;

          for (let i = 0; i < speed; i++) {
            nextR += directions[direction][0];
            nextC += directions[direction][1];

            if (nextR < 1 || nextR > N) {
              nextR = Math.abs(N - nextR);
            }
            if (nextC < 1 || nextC > N) {
              nextC = Math.abs(N - nextC);
            }
          }

          nextGrid[nextR][nextC].push({ mass, speed, direction });
        }
      }
    }

    // 2개 이상의 파이어볼이 있는 칸
    for (let r = 1; r <= N; r++) {
      for (let c = 1; c <= N; c++) {
        const count = nextGrid[r][c].length;
        let massSum = 0;
        let speedSum = 0;

        if (count > 1) {
          for (const fireball of nextGrid[r][c]) {
            massSum += fireball.mass;
            speedSum += fireball.speed;
          }

          const nextMass = Math.floor(massSum / 5);
          const nextSpeed = Math.floor(speedSum / count);
          const nextFireball = [];

          if (
            nextGrid[r][c].every((v) => v.direction % 2 === 0) ||
            nextGrid[r][c].every((v) => v.direction % 2 === 1)
          ) {
            for (let i = 0; i <= 6; i += 2) {
              nextFireball.push({
                mass: nextMass,
                speed: nextSpeed,
                direction: i,
              });
            }
          } else {
            for (let i = 1; i <= 7; i += 2) {
              nextFireball.push({
                mass: nextMass,
                speed: nextSpeed,
                direction: i,
              });
            }
          }

          if (nextMass > 0) {
            nextGrid[r][c] = nextFireball;
          } else {
            nextGrid[r][c] = [];
          }
        }
      }
    }

    grid = nextGrid;
  }

  for (let i = 0; i < K; i++) {
    move();
  }

  for (let r = 1; r <= N; r++) {
    for (let c = 1; c <= N; c++) {
      for (const fireball of grid[r][c]) {
        answer += fireball.mass ?? 0;
      }
    }
  }

  return answer;
}

console.log(solution(N, K, arr));
