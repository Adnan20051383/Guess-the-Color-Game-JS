const question = document.querySelector("#question h1");
const colorBoxes = Array.from(document.getElementsByClassName("color-box"));
const questionCounter = document.getElementById("question-number");
const numOfCorrectsWrongs = document.getElementById("corrects-wrongs");
const tempResult = document.getElementById("temp-result");
const result = document.getElementById("result");
const numberOfQ = 10;
let numberOfAnswered = 0;
let rightAnswer = 0;
let index = 0;
let wrongAnswers = 0;


function generateRandomColor() {
    let num1 = Math.floor(Math.random() * (255 - 10)) + 10;
    let num2 = Math.floor(Math.random() * (255 - 10)) + 10;
    let num3 = Math.floor(Math.random() * (255 - 10)) + 10;
    return `rgb(${num1}, ${num2}, ${num3})`;
}

function generateValue() {
    return Math.floor(Math.random() * 6);
}

function nextQuestion() {
    if (numberOfAnswered === numberOfQ) {
        result.textContent = `${numberOfQ - wrongAnswers} out of ${numberOfQ}.Your Score is ${(numberOfQ - wrongAnswers) / numberOfQ * 100}%`;
        result.classList.add("show");
    }
    else {
        const questionString = generateRandomColor();
        const rightAnswer = generateValue();
        question.textContent = questionString;
        colorBoxes[rightAnswer].style.backgroundColor = questionString;
        questionCounter.textContent = `${numberOfAnswered +1}/${numberOfQ}`;
        colorBoxes.forEach(box => {
            if(box !== colorBoxes[rightAnswer]) {
                box.style.backgroundColor = generateRandomColor();
            }
        });
        return rightAnswer;
    }
}

rightAnswer = nextQuestion();

function choose(choice) {
    if (numberOfAnswered !== numberOfQ && index === 0) {
        if (choice === rightAnswer) {
            tempResult.textContent = "yay!";
            tempResult.style.color = "rgb(44, 142, 44)";
        }
        else {
            tempResult.textContent = "nay!";
            colorBoxes[choice].classList.add("add-border-red");
            tempResult.style.color = "tomato";
            wrongAnswers++;
        }
        colorBoxes[rightAnswer].classList.add("add-border-green");
        numberOfAnswered++;
        index++;
        setTimeout(() => {
            index = 0;
            tempResult.textContent = "";
            colorBoxes[choice].classList.remove("add-border-green");
            colorBoxes[choice].classList.remove("add-border-red");
            colorBoxes[rightAnswer].classList.remove("add-border-green");
            rightAnswer = nextQuestion();
        }       , 3000);
    }
}

