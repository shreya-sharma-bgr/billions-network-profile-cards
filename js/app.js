// ==========================
//  QUESTIONS + OPTIONS
// ==========================

const questions = [
    {
        q: "What is your name?",
        type: "input",
        key: "name"
    },
    {
        q: "How many hours you're active daily?",
        options: ["1hr", "2hr", "4hr", "6+hrs"],
        key: "hours"
    },
    {
        q: "Your biggest role in Billions Network?",
        options: ["24/7 helper", "OG", "Super OG", "Mod or Admin"],
        key: "role"
    },
    {
        q: "How long have you been contributing?",
        options: ["Less than 2 weeks", "1 month", "3 months", "6 months+"],
        key: "contribution"
    },
    {
        q: "How much do you love Javi?",
        options: ["Who is Javi?", "Javi is good person", "My community leader", "Stans forever"],
        key: "javi"
    },
    {
        q: "How many PowerPoints do you have?",
        options: ["Less than 1k", "5000", "10000", "15000+"],
        key: "power"
    },
    {
        q: "How many messages have you sent?",
        options: ["Less than 3k", "5000", "8000", "15000+"],
        key: "messages"
    }
];

let step = 0;
let answers = {};
let selectedOption = null;
let uploadedImageURL = "";  // 🔥 Profile picture storage

// ==========================
//  SCREEN ELEMENTS
// ==========================
const welcomeScreen = document.getElementById("welcome-screen");
const questionScreen = document.getElementById("question-screen");
const resultScreen = document.getElementById("result-screen");

const questionText = document.getElementById("question-text");
const optionsBox = document.getElementById("options-box");
const nextBtn = document.getElementById("nextBtn");

// Upload section
const uploadSection = document.getElementById("uploadSection");

// ==========================
//  START QUIZ
// ==========================
document.getElementById("startQuiz").onclick = () => {
    welcomeScreen.classList.remove("active");
    questionScreen.classList.add("active");
    loadQuestion();
};

// ==========================
//  LOAD QUESTION
// ==========================
function loadQuestion() {
    const q = questions[step];

    questionText.textContent = q.q;
    optionsBox.innerHTML = "";
    selectedOption = null;

    // Hide upload section until last step
    uploadSection.style.display = "none";

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

    // ⭐ Show upload section ONLY on last question
    if (step === questions.length - 1) {
        uploadSection.style.display = "block";
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

    if (step >= questions.length) {
        showResult();
    } else {
        loadQuestion();
    }
};

// ==========================
//  PROFILE UPLOAD PREVIEW
// ==========================
document.getElementById("profileUpload").addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (event) {
        uploadedImageURL = event.target.result;
        document.getElementById("profilePicPreview").src = uploadedImageURL;
    };

    reader.readAsDataURL(file);
});

// ==========================
//  SCORING SYSTEM
// ==========================

function calculateScore() {
    let score = 0;

    // Hours
    if (answers.hours === "6+hrs") score += 4;
    else if (answers.hours === "4hr") score += 3;
    else if (answers.hours === "2hr") score += 2;
    else score += 1;

    // Role
    if (answers.role === "Mod or Admin") score += 5;
    else if (answers.role === "Super OG") score += 3;
    else if (answers.role === "OG") score += 1;
    else if (answers.role === "24/7 helper") score += 4;

    // Contribution
    if (answers.contribution === "6 months+") score += 4;
    else if (answers.contribution === "3 months") score += 3;
    else if (answers.contribution === "1 month") score += 2;
    else score += 1;

    // Javi love
    if (answers.javi === "Stans forever") score += 4;
    else if (answers.javi === "My community leader") score += 3;
    else if (answers.javi === "Javi is good person") score += 2;

    // PowerPoints
    if (answers.power === "15000+") score += 4;
    else if (answers.power === "10000") score += 3;
    else if (answers.power === "5000") score += 2;

    // Messages
    if (answers.messages === "15000+") score += 4;
    else if (answers.messages === "8000") score += 3;
    else if (answers.messages === "5000") score += 2;

    return score;
}

// QUOTES
const quotes = {
    normie: [
        "Touch some crypto, brother.",
        "You're still loading…",
        "Normie detected. No worries."
    ],
    real: [
        "Steady effort, steady gains.",
        "You're cooking… slow flame.",
        "Certified real human."
    ],
    active: [
        "Active and alive!",
        "Your grind is showing.",
        "You are warming up the server."
    ],
    celestial: [
        "Bro… take fresh air.",
        "Your phone battery fears you.",
        "You exist on another layer."
    ],
    god: [
        "Are you even real?",
        "Your keyboard must be burning.",
        "This is divine-level grinding."
    ]
};

// ==========================
//  SHOW RESULT
// ==========================
function showResult() {
    questionScreen.classList.remove("active");
    resultScreen.classList.add("active");

    let score = calculateScore();

    let rating = "";
    let quote = "";

    if (score <= 6) {
        rating = "NORMIE";
        quote = quotes.normie[Math.floor(Math.random() * quotes.normie.length)];
    } else if (score <= 10) {
        rating = "REAL HUMAN";
        quote = quotes.real[Math.floor(Math.random() * quotes.real.length)];
    } else if (score <= 14) {
        rating = "ACTIVE HUMAN";
        quote = quotes.active[Math.floor(Math.random() * quotes.active.length)];
    } else if (score <= 18) {
        rating = "CELESTIAL BEING";
        quote = quotes.celestial[Math.floor(Math.random() * quotes.celestial.length)];
    } else {
        rating = "GOD TIER";
        quote = quotes.god[Math.floor(Math.random() * quotes.god.length)];
    }

    // Fill results into card
    document.getElementById("result-name").textContent = answers.name;

    document.getElementById("r1").textContent = "Time active: " + answers.hours;
    document.getElementById("r2").textContent = "Role: " + answers.role;
    document.getElementById("r3").textContent = "Contributor for: " + answers.contribution;
    document.getElementById("r4").textContent = "Javi fan rating: " + answers.javi;
    document.getElementById("r5").textContent = "PowerPoints: " + answers.power;
    document.getElementById("r6").textContent = "Messages sent: " + answers.messages;

    document.getElementById("final-rating").textContent = "Rating: " + rating;
    document.getElementById("rating-quote").textContent = '"' + quote + '"';

    // ⭐ Add profile image OR fallback logo
    document.getElementById("profilePicPreview").src =
        uploadedImageURL || "assets/logo.png";
}

// ==========================
//  FIXED DOWNLOAD CARD
// ==========================
document.getElementById("downloadCard").onclick = async function () {
    const card = document.getElementById("result-card");

    if (typeof html2canvas !== "function") {
        alert("Error: html2canvas not loaded");
        return;
    }

    const originalBG = card.style.background;
    card.style.background = "#005cff"; // Solid bg for PNG

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
        console.error(e);
        alert("Download failed.");
    }

    card.style.background = originalBG;
};

// ==========================
//  SHARE ON X
// ==========================
document.getElementById("shareX").onclick = () => {
    const text = encodeURIComponent(
        "Check out my Billions Network card! Made by @shreyalives for @billions_ntwk and @jgonzalezferrer"
    );
    
    const url = "https://twitter.com/intent/tweet?text=" + text;
    window.open(url, "_blank");
};

// ==========================
//  RESTART
// ==========================
document.getElementById("restart").onclick = () => {
    step = 0;
    answers = {};
    uploadedImageURL = "";
    resultScreen.classList.remove("active");
    welcomeScreen.classList.add("active");
};