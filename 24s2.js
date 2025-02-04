// Official Answer Key (75 questions)
const answerKey = {
  "656445451": "6564451531",
  "656445452": "6564451538",
  "656445453": "6564451541",
  "656445454": "6564451544",
  "656445455": "6564451549",
  "656445456": "6564451551",
  "656445457": "6564451557",
  "656445458": "6564451559",
  "656445459": "6564451565",
  "656445460": "6564451569",
  "656445461": "6564451572",
  "656445462": "6564451578",
  "656445463": "6564451582",
  "656445464": "6564451586",
  "656445465": "6564451588",
  "656445466": "6564451592",
  "656445467": "6564451597",
  "656445468": "6564451601",
  "656445469": "6564451605",
  "656445470": "6564451607",
  "656445471": "392",
  "656445472": "957",
  "656445473": "16",
  "656445474": "1",
  "656445475": "55",
  "656445476": "6564451618",
  "656445477": "6564451621",
  "656445478": "6564451625",
  "656445479": "6564451628",
  "656445480": "6564451632",
  "656445481": "6564451639",
  "656445482": "6564451641",
  "656445483": "6564451647",
  "656445484": "6564451648",
  "656445485": "6564451652",
  "656445486": "6564451657",
  "656445487": "6564451661",
  "656445488": "6564451665",
  "656445489": "6564451671",
  "656445490": "6564451675",
  "656445491": "6564451678",
  "656445492": "6564451683",
  "656445493": "6564451687",
  "656445494": "6564451688",
  "656445495": "6564451694",
  "656445496": "36",
  "656445497": "9",
  "656445498": "43",
  "656445499": "250",
  "656445500": "5",
  "656445501": "6564451701",
  "656445502": "6564451707",
  "656445503": "6564451712",
  "656445504": "6564451713",
  "656445505": "6564451718",
  "656445506": "6564451721",
  "656445507": "6564451727",
  "656445508": "6564451731",
  "656445509": "6564451734",
  "656445510": "6564451737",
  "656445511": "6564451741",
  "656445512": "6564451747",
  "656445513": "6564451751",
  "656445514": "6564451753",
  "656445515": "6564451757",
  "656445516": "6564451762",
  "656445517": "6564451766",
  "656445518": "6564451769",
  "656445519": "6564451774",
  "656445520": "6564451778",
  "656445521": "75",
  "656445522": "20",
  "656445523": "255",
  "656445524": "3",
  "656445525": "4"
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
