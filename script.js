let numQuestions = 0;
let correctAnswers = 0;
const totalQuestions = 10;
const operations = ['+', '-', '*', '/'];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateQuestion() {
    const num1 = getRandomInt(1, 99);
    const num2 = getRandomInt(1, 99);
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let question = `${num1} ${operation} ${num2}`;
    let answer;

    switch (operation) {
        case '+':
            answer = num1 + num2;
            break;
        case '-':
            answer = num1 - num2;
            break;
        case '*':
            answer = num1 * num2;
            break;
        case '/':
            answer = (num1 / num2).toFixed(2);
            break;
    }
    return { question, answer };
}

let currentQuestion = generateQuestion();
document.getElementById('question').innerText = currentQuestion.question;

function checkAnswer() {
    const userAnswer = document.getElementById('answer').value;
    const resultsDiv = document.getElementById('results');
    let resultText;

    if(userAnswer === "") {
        return;
    }
    
    if (userAnswer == currentQuestion.answer) {
        correctAnswers++;
        resultText = `<div class="correct">${numQuestions + 1}. ${currentQuestion.question} = ${currentQuestion.answer} (Twoja odpowiedź: ${userAnswer})</div>`;
    } else {
        resultText = `<div class="incorrect">${numQuestions + 1}. ${currentQuestion.question} = ${currentQuestion.answer} (Twoja odpowiedź: ${userAnswer})</div>`;
    }
    resultsDiv.innerHTML += resultText;
    numQuestions++;
    if (numQuestions < totalQuestions) {
        currentQuestion = generateQuestion();
        document.getElementById('question').innerText = currentQuestion.question;
        document.getElementById('answer').value = '';
    } else {
        displayFinalResult();
    }
}

function displayFinalResult() {
    const finalResultDiv = document.getElementById('final-result');
    const score = (correctAnswers / totalQuestions) * 100;
    let colorClass;
    if (score > 70) {
        colorClass = 'green';
    } else if (score >= 40 && score <= 69) {
        colorClass = 'yellow';
    } else {
        colorClass = 'red';
    }
    finalResultDiv.innerHTML = `<div class="${colorClass}">Otrzymałeś ${correctAnswers}/${totalQuestions} pkt co stanowi ${score.toFixed(2)}%</div>`;
}
