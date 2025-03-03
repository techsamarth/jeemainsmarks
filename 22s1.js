// Official Answer Key (75 questions)
const answerKey = {
  "65644576": 656445257,
  "65644577": 656445261,
  "65644578": 656445267,
  "65644579": 656445269,
  "65644580": 656445274,
  "65644581": 656445278,
  "65644582": 656445283,
  "65644583": 656445285,
  "65644584": 656445291,
  "65644585": 656445294,
  "65644586": 656445299,
  "65644587": 656445302,
  "65644588": 656445305,
  "65644589": 656445309,
  "65644590": 656445315,
  "65644591": 656445317,
  "65644592": 656445322,
  "65644593": 656445326,
  "65644594": 656445331,
  "65644595": 656445333,
  "65644596": 34,
  "65644597": 2035,
  "65644598": 16,
  "65644599": 216,
  "656445100": 34,
  "656445101": 656445344,
  "656445102": 656445347,
  "656445103": 656445350,
  "656445104": 656445353,
  "656445105": 656445358,
  "656445106": 656445364,
  "656445107": 656445365,
  "656445108": 656445372,
  "656445109": 656445373,
  "656445110": 656445380,
  "656445111": 656445383,
  "656445112": 656445387,
  "656445113": 656445392,
  "656445114": 656445395,
  "656445115": 656445397,
  "656445116": 656445402,
  "656445117": 656445406,
  "656445118": 656445409,
  "656445119": 656445414,
  "656445120": 656445419,
  "656445121": 90,
  "656445122": 5,
  "656445123": 4,
  "656445124": 40,
  "656445125": 8,
  "656445126": 656445429,
  "656445127": 656445430,
  "656445128": 656445437,
  "656445129": 656445438,
  "656445130": 656445445,
  "656445131": 656445447,
  "656445132": 656445453,
  "656445133": 656445455,
  "656445134": 656445458,
  "656445135": 656445462,
  "656445136": 656445467,
  "656445137": 656445471,
  "656445138": 656445477,
  "656445139": 656445478,
  "656445140": 656445485,
  "656445141": 656445488,
  "656445142": 656445490,
  "656445143": 656445495,
  "656445144": 656445499,
  "656445145": 656445502,
  "656445146": 45,
  "656445147": 6,
  "656445148": 69,
  "656445149": 20,
  "656445150": 154
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
