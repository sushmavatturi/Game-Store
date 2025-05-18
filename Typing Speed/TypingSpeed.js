const sentences = [
    "Once upon a time, in a small village nestled between towering mountains and dense forests, lived a curious young boy named Leo.",
    "Leo loved exploring every hidden corner of the village and often spent his days wandering through the woods.",
    "One bright morning, while following a trail he had never seen before, he stumbled upon an old, overgrown archway.",
    "Curiosity sparked, and Leo ventured through, finding himself in a mystical land where trees glowed softly and animals spoke in gentle whispers.",
    "As he walked deeper into this enchanted forest, he realized he was in a place of forgotten magic, where adventures awaited at every turn."
];

let currentSentenceIndex = 0;
let startTime;

function displayNextSentence() {
    if (currentSentenceIndex < sentences.length) {
        document.getElementById("originalSentence").textContent = sentences[currentSentenceIndex];
        document.getElementById("userSentence").value = "";
        startTime = Date.now();
    } else {
        showFinalResults();
    }
}

function calculateTypingSpeed() {
    const userSentence = document.getElementById("userSentence").value.trim();
    const sentence = sentences[currentSentenceIndex].trim();

    if (userSentence === sentence) {
        const endTime = Date.now();
        const totalTime = (endTime - startTime) / 1000; // Time in seconds
        const words = sentence.split(" ").length;
        const wpm = (words / totalTime) * 60;

        document.getElementById("wpm").innerText = `Your words per minute for this sentence: ${wpm.toFixed(2)}`;
        document.getElementById("time").innerText = `Your time for this sentence: ${totalTime.toFixed(2)} Sec`;
        calculateAccuracy(sentence, userSentence);

        currentSentenceIndex++;
        displayNextSentence();
    } else {
        alert("Please type the sentence exactly as it appears.");
    }
}

function calculateAccuracy(sentence, userSentence) {
    let correctCount = 0;
    const totalChars = sentence.length;

    for (let i = 0; i < sentence.length && i < userSentence.length; i++) {
        if (sentence[i] === userSentence[i]) {
            correctCount++;
        }
    }

    const accuracy = (correctCount / totalChars) * 100;
    document.getElementById("accuracy").innerText = `Your accuracy for this sentence: ${accuracy.toFixed(2)}%`;
}

function startTypingTest() {
    currentSentenceIndex = 0;
    document.getElementById("wpm").innerText = "";
    document.getElementById("time").innerText = "";
    document.getElementById("accuracy").innerText = "";
    displayNextSentence();
}

function showFinalResults() {
    document.getElementById("originalSentence").textContent = "Congratulations! You've completed all sentences.";
    document.getElementById("userSentence").style.display = "none";
    document.getElementById("wpm").innerText = "Final results are above for each sentence.";
}
window.onload=startTypingTest;