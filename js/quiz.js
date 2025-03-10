export function startQuiz() {
    let score = 0;
    let q1 = prompt("What should you do during an earthquake? (a) Run, (b) Drop, Cover, Hold");
    if (q1.toLowerCase() === "b") score++;

    alert(`Your score: ${score}/1. Stay prepared!`);
}
