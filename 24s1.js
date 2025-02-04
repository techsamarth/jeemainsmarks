/ Official Answer Key (75 questions)
const answerKey = {
  "7364751051": "7364753571",
  "7364751052": "7364753576",
  "7364751053": "7364753582",
  "7364751054": "7364753585",
  "7364751055": "7364753588",
  "7364751056": "7364753591",
  "7364751057": "7364753597",
  "7364751058": "7364753600",
  "7364751059": "7364753605",
  "7364751060": "7364753610",
  "7364751061": "7364753611",
  "7364751062": "7364753617",
  "7364751063": "7364753619",
  "7364751064": "7364753624",
  "7364751065": "7364753629",
  "7364751066": "7364753632",
  "7364751067": "7364753635",
  "7364751068": "7364753641",
  "7364751069": "7364753645",
  "7364751070": "7364753647",
  "7364751071": "5120",
  "7364751072": "44",
  "7364751073": "125",
  "7364751074": "14",
  "7364751075": "19",
  "7364751076": "7364753659",
  "7364751077": "7364753662",
  "7364751078": "7364753666",
  "7364751079": "7364753669",
  "7364751080": "7364753675",
  "7364751081": "7364753679",
  "7364751082": "7364753682",
  "7364751083": "7364753684",
  "7364751084": "7364753690",
  "7364751085": "7364753693",
  "7364751086": "7364753697",
  "7364751087": "7364753702",
  "7364751088": "7364753705",
  "7364751089": "7364753709",
  "7364751090": "7364753712",
  "7364751091": "7364753718",
  "7364751092": "7364753723",
  "7364751093": "7364753727",
  "7364751094": "7364753729",
  "7364751095": "7364753733",
  "7364751096": "35",
  "7364751097": "15",
  "7364751098": "2",
  "7364751099": "8",
  "7364751100": "48",
  "7364751101": "7364753743",
  "7364751102": "7364753745",
  "7364751103": "7364753750",
  "7364751104": "7364753756",
  "7364751105": "7364753759",
  "7364751106": "7364753763",
  "7364751107": "7364753765",
  "7364751108": "7364753769",
  "7364751109": "7364753775",
  "7364751110": "7364753779",
  "7364751111": "7364753784",
  "7364751112": "7364753788",
  "7364751113": "7364753791",
  "7364751114": "7364753794",
  "7364751115": "7364753798",
  "7364751116": "7364753801",
  "7364751117": "7364753805",
  "7364751118": "7364753810",
  "7364751119": "7364753814",
  "7364751120": "7364753817",
  "7364751121": "420",
  "7364751122": "700",
  "7364751123": "962",
  "7364751124": "61",
  "7364751125": "3"
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
