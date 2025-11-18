// ==========================
//  QUESTIONS + OPTIONS
// ==========================

const questions = [
    { q: "What is your name?", type: "input", key: "name" },
    { q: "How many hours you're active daily?", options: ["1hr", "2hr", "4hr", "6+hrs"], key: "hours" },

    // UPDATED ROLE
    { q: "Your biggest role in Billions Network?", options: ["24/7 helper", "OG", "Super OG", "Scouter"], key: "role" },

    // UPDATED CONTRIBUTION
    { q: "How long have you been contributing?", options: ["Less than 2 weeks", "1-2 months", "3-5 months", "6 months+"], key: "contribution" },

    { q: "How much do you love Javi?", options: ["Who is Javi?", "Javi is good person", "My community leader", "Stans forever"], key: "javi" },

    // UPDATED POWERPOINT RANGES
    { q: "How many PowerPoints do you have?", options: ["1k-4k", "5k-9k", "10-14k", "15k+"], key: "power" },

    // UPDATED MESSAGES
    { q: "How many messages have you sent?", options: ["Less than 3k", "5-9k", "10-14k", "15k+"], key: "messages" }
];

let step = 0;
let answers = {};
let selectedOption = null;
let uploadedImageURL = "";

// ==========================
//  SCREEN ELEMENTS
// ==========================
const welcomeScreen = document.getElementById("welcome-screen");
const questionScreen = document.getElementById("question-screen");
const uploadScreen = document.getElementById("upload-screen");
const resultScreen = document.getElementById("result-screen");

const questionText = document.getElementById("question-text");
const optionsBox = document.getElementById("options-box");
const nextBtn = document.getElementById("nextBtn");
const profileUpload = document.getElementById("profileUpload");


// ==========================
//  START QUIZ
// ==========================
document.getElementById("startQuiz").onclick = () => {
    welcomeScreen.classList.remove("active");
    questionScreen.classList.add("active");
    loadQuestion();
};


// ==========================
//  LOAD QUESTION + ANIMATION
// ==========================
function loadQuestion() {

    questionScreen.classList.add("fadeSlide");
    setTimeout(() => questionScreen.classList.remove("fadeSlide"), 450);

    const q = questions[step];

    questionText.textContent = q.q;
    optionsBox.innerHTML = "";
    selectedOption = null;

    if (q.type === "input") {
        optionsBox.innerHTML = `
            <input id="nameInput" type="text"
            placeholder="Enter your name"
            class="option"
            style="text-align:center;">
        `;
    } else {
        q.options.forEach(opt => {
            let div = document.createElement("div");
            div.classList.add("option");
            div.textContent = opt;

            div.onclick = () => {
                document.querySelectorAll(".option").forEach(o => o.classList.remove("selected"));
                div.classList.add("selected");
                selectedOption = opt;
            };

            optionsBox.appendChild(div);
        });
    }
}


// ==========================
//  NEXT BUTTON
// ==========================
nextBtn.onclick = () => {

    const q = questions[step];

    if (q.type === "input") {
        let nameValue = document.getElementById("nameInput").value.trim();
        if (nameValue === "") return alert("Enter your name!");
        answers[q.key] = nameValue;

    } else {
        if (!selectedOption) return alert("Select an option!");
        answers[q.key] = selectedOption;
    }

    step++;

    // Go to upload screen
    if (step >= questions.length) {

        questionScreen.classList.remove("active");
        uploadScreen.classList.add("active");

        uploadScreen.classList.add("fadeSlide");
        setTimeout(() => uploadScreen.classList.remove("fadeSlide"), 450);

        return;
    }

    loadQuestion();
};


// ==========================
//  PROFILE UPLOAD PREVIEW
// ==========================
profileUpload.addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = event => uploadedImageURL = event.target.result;
    reader.readAsDataURL(file);
});


// ==========================
//  FINISH UPLOAD + SHOW RESULT
//  (FIXED BUTTON ID → goToResult)
// ==========================
document.getElementById("goToResult").onclick = () => {

    if (!uploadedImageURL) {
        if (!confirm("No profile picture selected. Continue without photo?")) return;
    }

    uploadScreen.classList.remove("active");
    resultScreen.classList.add("active");

    resultScreen.classList.add("fadeSlide");
    setTimeout(() => resultScreen.classList.remove("fadeSlide"), 450);

    showResult();
};


// ==========================
//  UPDATED SCORING SYSTEM
// ==========================
function calculateScore() {
    let score = 0;

    // HOURS
    if (answers.hours === "6+hrs") score += 4;
    else if (answers.hours === "4hr") score += 3;
    else if (answers.hours === "2hr") score += 2;
    else score += 1;

    // ROLE
    if (answers.role === "24/7 helper") score += 5;
    else if (answers.role === "Scouter") score += 4;
    else if (answers.role === "Super OG") score += 3;
    else if (answers.role === "OG") score += 1;

    // CONTRIBUTION
    if (answers.contribution === "6 months+") score += 4;
    else if (answers.contribution === "3-5 months") score += 3;
    else if (answers.contribution === "1-2 months") score += 2;
    else score += 1;

    // JAVI
    if (answers.javi === "Stans forever") score += 4;
    else if (answers.javi === "My community leader") score += 3;
    else if (answers.javi === "Javi is good person") score += 2;

    // POWERPOINTS
    if (answers.power === "15k+") score += 4;
    else if (answers.power === "10-14k") score += 3;
    else if (answers.power === "5k-9k") score += 2;

    // MESSAGES
    if (answers.messages === "15k+") score += 4;
    else if (answers.messages === "10-14k") score += 3;
    else if (answers.messages === "5-9k") score += 2;

    return score;
}


// ==========================
//  SHOW RESULT
// ==========================
function showResult() {

    let score = calculateScore();

    const quotes = {
        normie: ["Touch some crypto, brother.", "You're still loading…", "Normie detected. No worries."],
        real: ["Steady effort, steady gains.", "You're cooking… slow flame.", "Certified real human."],
        active: ["Active and alive!", "Your grind is showing.", "You are warming up the server."],
        celestial: ["Bro… take fresh air.", "Your phone battery fears you.", "You exist on another layer."],
        god: ["Are you even real?", "Your keyboard must be burning.", "This is divine-level grinding."]
    };

    let rating = "";
    let quote = "";

    if (score <= 6) {
        rating = "NORMIE";
        quote = quotes.normie[Math.floor(Math.random()*quotes.normie.length)];
    }
    else if (score <= 10) {
        rating = "REAL HUMAN";
        quote = quotes.real[Math.floor(Math.random()*quotes.real.length)];
    }
    else if (score <= 14) {
        rating = "ACTIVE HUMAN";
        quote = quotes.active[Math.floor(Math.random()*quotes.active.length)];
    }
    else if (score <= 18) {
        rating = "CELESTIAL BEING";
        quote = quotes.celestial[Math.floor(Math.random()*quotes.celestial.length)];
    }
    else {
        rating = "GOD TIER";
        quote = quotes.god[Math.floor(Math.random()*quotes.god.length)];
    }

    document.getElementById("result-name").textContent = answers.name;
    document.getElementById("r1").textContent = "Time active: " + answers.hours;
    document.getElementById("r2").textContent = "Role: " + answers.role;
    document.getElementById("r3").textContent = "Contributor for: " + answers.contribution;
    document.getElementById("r4").textContent = "Javi fan rating: " + answers.javi;
    document.getElementById("r5").textContent = "PowerPoints: " + answers.power;
    document.getElementById("r6").textContent = "Messages sent: " + answers.messages;

    document.getElementById("final-rating").textContent = "Rating: " + rating;
    document.getElementById("rating-quote").textContent = `"${quote}"`;

    document.getElementById("profilePicPreview").src =
        uploadedImageURL || "assets/logo.png";
}


// ==========================
//  DOWNLOAD CARD
// ==========================
document.getElementById("downloadCard").onclick = async function () {

    const card = document.getElementById("result-card");
    const originalBG = card.style.background;

    card.style.background = "#005cff";

    try {
        const canvas = await html2canvas(card, {
            backgroundColor: "#005cff",
            scale: 3,
            useCORS: true
        });

        canvas.toBlob(blob => {
            const link = document.createElement("a");
            link.download = "billions-card.png";
            link.href = URL.createObjectURL(blob);
            link.click();
            setTimeout(() => URL.revokeObjectURL(link.href), 1000);
        });

    } catch (e) {
        alert("Download failed.");
    }

    card.style.background = originalBG;
};


// ==========================
//  SHARE ON X
// ==========================
document.getElementById("shareX").onclick = () => {
    const text = encodeURIComponent(
        "Check out my Billions Network card!\nMade by @shreyalives for @billions_ntwk & @jgonzalezferrer"
    );
    window.open("https://twitter.com/intent/tweet?text=" + text, "_blank");
};


// ==========================
//  RESTART
// ==========================
document.getElementById("restart").onclick = () => {
    step = 0;
    answers = {};
    uploadedImageURL = "";

    resultScreen.classList.remove("active");
    uploadScreen.classList.remove("active");
    welcomeScreen.classList.add("active");
};
