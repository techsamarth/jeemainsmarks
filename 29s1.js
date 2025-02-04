// Official Answer Key (75 questions)
const answerKey = {
  "656445526": "6564451789",
  "656445527": "6564451792",
  "656445528": "6564451797",
  "656445529": "6564451798",
  "656445530": "6564451802",
  "656445531": "6564451807",
  "656445532": "6564451811",
  "656445533": "6564451815",
  "656445534": "6564451818",
  "656445535": "6564451825",
  "656445536": "6564451827",
  "656445537": "6564451831",
  "656445538": "6564451836",
  "656445539": "6564451841",
  "656445540": "6564451843",
  "656445541": "6564451848",
  "656445542": "6564451852",
  "656445543": "6564451856",
  "656445544": "6564451858",
  "656445545": "6564451863",
  "656445546": "2",
  "656445547": "1405",
  "656445548": "5",
  "656445549": "24",
  "656445550": "112",
  "656445551": "6564451872",
  "656445552": "6564451877",
  "656445553": "6564451881",
  "656445554": "6564451884",
  "656445555": "6564451888",
  "656445556": "6564451892",
  "656445557": "6564451897",
  "656445558": "6564451899",
  "656445559": "6564451903",
  "656445560": "6564451908",
  "656445561": "6564451912",
  "656445562": "6564451915",
  "656445563": "6564451920",
  "656445564": "6564451924",
  "656445565": "6564451930",
  "656445566": "6564451934",
  "656445567": "6564451936",
  "656445568": "6564451942",
  "656445569": "6564451944",
  "656445570": "6564451948",
  "656445571": "2",
  "656445572": "2000",
  "656445573": "5",
  "656445574": "327",
  "656445575": "6",
  "656445576": "6564451958",
  "656445577": "6564451960",
  "656445578": "6564451964",
  "656445579": "6564451970",
  "656445580": "6564451973",
  "656445581": "6564451977",
  "656445582": "6564451980",
  "656445583": "6564451987",
  "656445584": "6564451990",
  "656445585": "6564451992",
  "656445586": "6564451997",
  "656445587": "6564452001",
  "656445588": "6564452004",
  "656445589": "6564452010",
  "656445590": "6564452013",
  "656445591": "6564452017",
  "656445592": "6564452021",
  "656445593": "6564452024",
  "656445594": "6564452029",
  "656445595": "6564452033",
  "656445596": "16",
  "656445597": "160",
  "656445598": "13",
  "656445599": "15",
  "656445600": "341"
}
;

// Subject and Score Initialization
const subjects = ["Mathematics", "Physics", "Chemistry"];
let totalScore = 0;
let subjectScores = { Mathematics: 0, Physics: 0, Chemistry: 0 };
let correct = 0, incorrect = 0, unattempted = 0;
const maxMarks = 300;

// Initialize detailed analysis
let analysis = {
  Mathematics: { correct: 0, incorrect: 0, unattempted: 0, negativeScore: 0 },
  Physics: { correct: 0, incorrect: 0, unattempted: 0, negativeScore: 0 },
  Chemistry: { correct: 0, incorrect: 0, unattempted: 0, negativeScore: 0 },
};

// Determine subject of a question (based on index)
function getSubject(index) {
  if (index < 25) return "Mathematics";
  if (index < 50) return "Physics";
  return "Chemistry";
}

// Determine question type (MCQ or Integer)
function getQuestionType(index) {
  return (index % 25) < 20 ? "MCQ" : "Integer";
}

// Fetching Student Responses from Webpage
const tables = document.querySelectorAll(".menu-tbl");
const studentResponses = {};

tables.forEach((table, i) => {
  const qnType = table.querySelectorAll("tr td.bold")[0].innerText.trim();
  const qnID = table.querySelectorAll("tr td.bold")[1].innerText.trim();

  if (qnType === "MCQ") {
    let hasAnswered = false;
    const status2 = table.querySelectorAll("tr td.bold")[7].innerText.trim();

    if (status2 !== "--") {
      hasAnswered = true;
    }

    if (hasAnswered) {
      let options = [0, 0, 0, 0];
      for (let j = 0; j < 4; j++) {
        options[j] = Number(table.querySelectorAll("tr td.bold")[2 + j].innerText);
      }
      const ownAnswerIndex = Number(status2) - 1;
      const ownAnswer = options[ownAnswerIndex];
      studentResponses[qnID] = { qnType, hasAnswered, options, ownAnswer };
    } else {
      studentResponses[qnID] = { qnType, hasAnswered };
    }
  } else if (qnType === "SA") {
    let hasAnswered = false;
    const ownAnswer = document.querySelectorAll(".questionRowTbl")[i].querySelector("tr:nth-of-type(5) td.bold").innerText.trim();
    
    if (ownAnswer !== "--") {
      hasAnswered = true;
    }

    studentResponses[qnID] = hasAnswered ? { qnType, hasAnswered, ownAnswer } : { qnType, hasAnswered };
  }
});

// Calculate Score
Object.keys(answerKey).forEach((qID, index) => {
  const correctAns = answerKey[qID];
  const response = studentResponses[qID] || { hasAnswered: false };
  const subject = getSubject(index);
  const qType = getQuestionType(index);
  let marks = 0;

  if (!response.hasAnswered) {
    unattempted++;
    analysis[subject].unattempted++;
  } else if (qType === "MCQ") {
    if (response.ownAnswer == correctAns) {
      marks = 4;
      correct++;
      analysis[subject].correct++;
    } else {
      marks = -1;
      incorrect++;
      analysis[subject].incorrect++;
      analysis[subject].negativeScore += 1;
    }
    totalScore += marks;
    subjectScores[subject] += marks;
  } else if (qType === "Integer") {
    if (response.ownAnswer == correctAns) {
      marks = 4;
      correct++;
      analysis[subject].correct++;
    } else {
      marks = 0;  // No negative marking
      incorrect++;
      analysis[subject].incorrect++;
    }
    totalScore += marks;
    subjectScores[subject] += marks;
  }
});

// Display Result in Console
console.log("\n🔹 JEE Mains 2025 Score Calculation 🔹");
console.log(`📌 Total Score: ${totalScore} / ${maxMarks}`);
subjects.forEach((subject) => {
  console.log(`\n🔸 ${subject} Analysis:`);
  console.log(`✔ Correct Questions: ${analysis[subject].correct}`);
  console.log(`❌ Incorrect Questions: ${analysis[subject].incorrect}`);
  console.log(`❓ Unattempted Questions: ${analysis[subject].unattempted}`);
  console.log(`🔻 Total Negative Score: -${analysis[subject].negativeScore}`);
  console.log(`📌 Total Score in ${subject}: ${subjectScores[subject]}`);
});
console.log(`\n✔ Correct Answers: ${correct}`);
console.log(`❌ Incorrect Answers: ${incorrect}`);
console.log(`❓ Unattempted Questions: ${unattempted}`);
