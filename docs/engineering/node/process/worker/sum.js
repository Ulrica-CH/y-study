let sum = 0;
for (let i = 0; i < 10000; i++) {
  sum += i;
}
console.log('子进程console.log',sum);

process.stdout.write(sum+'');