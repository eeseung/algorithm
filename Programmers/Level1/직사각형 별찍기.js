process.stdin.setEncoding('utf8');
process.stdin.on('data', data => {
  const [n, m] = data.split(' ').map(Number);

  console.log(('*'.repeat(n) + '\n').repeat(m));
});
