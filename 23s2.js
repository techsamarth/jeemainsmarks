// Official Answer Key (75 questions)
const answerKey = {
    "656445376": "6564451279",
    "656445377": "6564451282",
    "656445378": "6564451286",
    "656445379": "6564451288",
    "656445380": "6564451294",
    "656445381": "6564451297",
    "656445382": "6564451303",
    "656445383": "6564451306",
    "656445384": "6564451311",
    "656445385": "6564451314",
    "656445386": "6564451319",
    "656445387": "6564451320",
    "656445388": "6564451325",
    "656445389": "6564451329",
    "656445390": "6564451334",
    "656445391": "6564451336",
    "656445392": "6564451340",
    "656445393": "6564451347",
    "656445394": "6564451349",
    "656445395": "6564451354",
    "656445396": "474",
    "656445397": "31",
    "656445398": "17280",
    "656445399": "8788",
    "656445400": "15",
    "656445401": "6564451361",
    "656445402": "6564451365",
    "656445403": "6564451372",
    "656445404": "6564451374",
    "656445405": "6564451380",
    "656445406": "6564451382",
    "656445407": "6564451386",
    "656445408": "6564451392",
    "656445409": "6564451393",
    "656445410": "6564451398",
    "656445411": "6564451402",
    "656445412": "6564451405",
    "656445413": "6564451411",
    "656445414": "6564451415",
    "656445415": "6564451419",
    "656445416": "6564451422",
    "656445417": "6564451427",
    "656445418": "6564451430",
    "656445419": "6564451435",
    "656445420": "6564451438",
    "656445421": "3",
    "656445422": "2190",
    "656445423": "100",
    "656445424": "2",
    "656445425": "16",
    "656445426": "6564451446",
    "656445427": "6564451452",
    "656445428": "6564451457",
    "656445429": "6564451459",
    "656445430": "6564451463",
    "656445431": "6564451467",
    "656445432": "6564451473",
    "656445433": "6564451475",
    "656445434": "6564451479",
    "656445435": "6564451485",
    "656445436": "6564451488",
    "656445437": "6564451491",
    "656445438": "6564451494",
    "656445439": "6564451501",
    "656445440": "6564451502",
    "656445441": "6564451509",
    "656445442": "6564451513",
    "656445443": "6564451517",
    "656445444": "6564451518",
    "656445445": "6564451523",
    "656445446": "153",
    "656445447": "200",
    "656445448": "100",
    "656445449": "27",
    "656445450": "4"
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
