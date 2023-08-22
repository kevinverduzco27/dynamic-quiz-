const highScoresList = document.getElementById("high-scores-list");

// Retrieve high scores from local storage
const storedScores = JSON.parse(localStorage.getItem("quizScores")) || [];

// Sort scores in descending order
const sortedScores = storedScores.sort((a, b) => b.score - a.score);

// Display top scores
const topScores = sortedScores.slice(0, 10);
if (topScores.length > 0) {
  topScores.forEach((scoreItem) => {
    const listItem = document.createElement("li");
    listItem.innerText = `${scoreItem.score} - ${scoreItem.time}s`;
    highScoresList.appendChild(listItem);
  });
} else {
  highScoresList.innerHTML = "<li>No scores available</li>";
}
