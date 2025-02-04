// Official Answer Key (75 questions)
const answerKey = {
  "736475976": "7364753316",
  "736475977": "7364753320",
  "736475978": "7364753325",
  "736475979": "7364753331",
  "736475980": "7364753334",
  "736475981": "7364753336",
  "736475982": "7364753342",
  "736475983": "7364753345",
  "736475984": "7364753351",
  "736475985": "7364753354",
  "736475986": "7364753357",
  "736475987": "7364753362",
  "736475988": "7364753366",
  "736475989": "7364753369",
  "736475990": "7364753375",
  "736475991": "7364753378",
  "736475992": "7364753381",
  "736475993": "7364753386",
  "736475994": "7364753388",
  "736475995": "7364753393",
  "736475996": "117",
  "736475997": "77",
  "736475998": "612",
  "736475999": "19",
  "7364751000": "30",
  "7364751001": "7364753403",
  "7364751002": "7364753408",
  "7364751003": "7364753409",
  "7364751004": "7364753416",
  "7364751005": "7364753418",
  "7364751006": "7364753423",
  "7364751007": "7364753426",
  "7364751008": "7364753430",
  "7364751009": "7364753436",
  "7364751010": "7364753440",
  "7364751011": "7364753443",
  "7364751012": "7364753448",
  "7364751013": "7364753452",
  "7364751014": "7364753455",
  "7364751015": "7364753460",
  "7364751016": "7364753464",
  "7364751017": "7364753465",
  "7364751018": "7364753471",
  "7364751019": "7364753474",
  "7364751020": "7364753480",
  "7364751021": "3",
  "7364751022": "152",
  "7364751023": "273",
  "7364751024": "3",
  "7364751025": "D",
  "7364751026": "7364753489",
  "7364751027": "7364753490",
  "7364751028": "7364753497",
  "7364751029": "7364753501",
  "7364751030": "7364753503",
  "7364751031": "7364753506",
  "7364751032": "7364753511",
  "7364751033": "7364753516",
  "7364751034": "7364753521",
  "7364751035": "7364753523",
  "7364751036": "7364753526",
  "7364751037": "7364753532",
  "7364751038": "7364753534",
  "7364751039": "7364753540",
  "7364751040": "7364753544",
  "7364751041": "7364753548",
  "7364751042": "7364753550",
  "7364751043": "7364753554",
  "7364751044": "7364753558",
  "7364751045": "7364753564",
  "7364751046": "2850",
  "7364751047": "7",
  "7364751048": "897",
  "7364751049": "171",
  "7364751050": "40"
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
