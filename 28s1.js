// Official Answer Key (75 questions)
const answerKey = {
  "7364751501": 7364755104,
  "7364751502": 7364755106,
  "7364751503": 7364755109,
  "7364751504": 7364755113,
  "7364751505": 7364755120,
  "7364751506": 7364755123,
  "7364751507": 7364755125,
  "7364751508": 7364755131,
  "7364751509": 7364755135,
  "7364751510": 7364755138,
  "7364751511": 7364755141,
  "7364751512": 7364755146,
  "7364751513": 7364755149,
  "7364751514": 7364755155,
  "7364751515": 7364755159,
  "7364751516": 7364755163,
  "7364751517": 7364755165,
  "7364751518": 7364755169,
  "7364751519": 7364755174,
  "7364751520": 7364755178,
  "7364751521": 1613,
  "7364751522": 5,
  "7364751523": 54,
  "7364751524": 6,
  "7364751525": 5,
  "7364751526": 7364755187,
  "7364751527": 7364755193,
  "7364751528": 7364755195,
  "7364751529": 7364755199,
  "7364751530": 7364755202,
  "7364751531": 7364755206,
  "7364751532": 7364755213,
  "7364751533": 7364755216,
  "7364751534": 7364755220,
  "7364751535": 7364755222,
  "7364751536": 7364755226,
  "7364751537": 7364755231,
  "7364751538": 7364755236,
  "7364751539": 7364755240,
  "7364751540": 7364755243,
  "7364751541": 7364755247,
  "7364751542": 7364755250,
  "7364751543": 7364755255,
  "7364751544": 7364755260,
  "7364751545": 7364755263,
  "7364751546": 4,
  "7364751547": 3,
  "7364751548": 16,
  "7364751549": 4,
  "7364751550": 11,
  "7364751551": 7364755271,
  "7364751552": 7364755277,
  "7364751553": 7364755281,
  "7364751554": 7364755285,
  "7364751555": 7364755290,
  "7364751556": 7364755293,
  "7364751557": 7364755297,
  "7364751558": 7364755301,
  "7364751559": 7364755305,
  "7364751560": 7364755307,
  "7364751561": 7364755313,
  "7364751562": 7364755315,
  "7364751563": 7364755319,
  "7364751564": 7364755323,
  "7364751565": 7364755327,
  "7364751566": 7364755334,
  "7364751567": 7364755335,
  "7364751568": 7364755342,
  "7364751569": 7364755346,
  "7364751570": 7364755347,
  "7364751571": 125,
  "7364751572": 466,
  "7364751573": 150,
  "7364751574": 1655,
  "7364751575": 93
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
