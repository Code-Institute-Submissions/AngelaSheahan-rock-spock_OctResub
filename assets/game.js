const choices = ["Rock", "Paper", "Scissors", "Lizard", "Spock"];
const awardMessage = ["You Rock", "You're Sharp as Paper", "You Cut the Computer to Shreds"];
const awardType = ["Bronze", "Silver", "Gold"];
const gameScore = [2, 3, 5];

function onLoad() {
    // add button listeners
    let controls = document.getElementsByClassName("controls");
    for (let control of controls) {
        control.addEventListener("click", function () {
            let playerChoice = this.getAttribute("data-choice");
            playGame(playerChoice);
        });
    }

    // hide game area initially
    document.getElementById("game-area").style.display = "none";
    // hide game over message area
}


/** Creates cookie to store player name. If player name not added and PLAY buttonn clicked, Alert msg appears */

// set player name
function setPlayerName() {
    if (document.myform.player.value === "") {
        document.getElementById("no-name-modal").style.display = "block";
        // Closes the "Enter Your Name" modal when player clicks on <span> (x)
        const span = document.getElementById("no-name-close");
        span.onclick = function () {
            document.getElementById("no-name-modal").style.display = "none";
        }
    } else {
        // Cookies are saved in name-value pairs
        setCookie("player", document.myform.player.value, 1);
        // show game area
        document.getElementById("game-area").style.display = "block";
        // hide login area
        document.getElementById("login-area").style.display = "none";
    }
}

// get player name
function getPlayerName() {
    let player = getCookie("player");
    return player;
}

// copied setCookie from w3schools
//adds a name/value pair to the cookie string
function setCookie(name, value, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// copied getCookie from w3schools
//finds a specific name in the cookie strring and returns its value
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function playGame(playerChoice) {
    let computerChoice = Math.floor(Math.random() * 5);

    let playerImage = document.getElementById("player-image");
    playerImage.src = `assets/images/${choices[playerChoice]}.jpg`;
    playerImage.alt = choices[playerChoice];

    let computerImage = document.getElementById("computer-image");
    computerImage.src = `assets/images/${choices[computerChoice]}.jpg`;
    computerImage.alt = choices[computerChoice];

    if (choices[playerChoice] == choices[computerChoice]) {
        // alert("try again");
        // return;
    }

    let winner = getWinner(choices[playerChoice],
        choices[computerChoice]);

    updateScore(winner);

    checkDisplayAward(winner);

    checkGameOver(winner);
}

// See who the winners is.
function getWinner(playerChoice, computerChoice) {
    console.log("player choice: ", playerChoice, " computer choice: ", computerChoice);
    if (playerChoice === "Scissors" && (computerChoice == "Paper" || computerChoice == "Lizard")) {
        return "player";
    }
    if (playerChoice === "Paper" && (computerChoice === "Rock" || computerChoice === "Spock")) {
        return "player";
    }
    if (playerChoice === "Rock" && (computerChoice === "Lizard" || computerChoice === "Scissors")) {
        return "player";
    }
    if (playerChoice === "Lizard" && (computerChoice === "Spock" || computerChoice === "Paper")) {
        return "player";
    }
    if (playerChoice === "Spock" && (computerChoice === "Scissors" || computerChoice === "Rock")) {
        return "player";
    }
    return "computer";
}

// Update the winners score.
function updateScore(winner) {
    console.log("winner : ", winner)
    document.getElementById("messages").textContent = ((winner === "computer") ? "computer" : getPlayerName()) + " wins";
    let score = parseInt(document.getElementById(winner + "-score").textContent);
    document.getElementById(winner + "-score").textContent = score + 1;
}



function checkGameOver(winner) {
    let playerScore = parseInt(document.getElementById("player-score").textContent);
    let computerScore = parseInt(document.getElementById("computer-score").textContent);
    if (playerScore + computerScore === 5) {
        // show game over modal
        document.getElementById("game-over-modal").style.display = "block";
    }

}

function newGame() {
    // retain player name??
    console.log("player selected new game");
    document.getElementById("game-over-modal").style.display = "none";
    document.getElementById("playerScore").reset();
    // document.getElementById("computerScore").reset();
}

function exitGame() {
    document.getElementById("game-over-modal").modal.close();
    document.getElementById("game-area").style.display = "none";
    document.getElementById("myForm").reset();
}

function checkDisplayAward(winner) {
    console.log("Check award for " + winner);
    let score = parseInt(document.getElementById(winner + "-score").textContent);
    let awardImageElement = document.getElementById("trophy");
    if (winner === "player" && score == 2) {
        displayAward(0, awardImageElement);
    } else if (winner === "player" && score == 3) {
        displayAward(1, awardImageElement);
    } else if (winner === "player" && score == 5) {
        displayAward(2, awardImageElement);
    }
}

function displayAward(awardIndex, awardImage) {
    document.getElementById("award-modal").style.display = "block";
    document.getElementById("award-statement").innerHTML = awardType[awardIndex];
    document.getElementById("award-message").innerHTML = awardMessage[awardIndex];
    awardImage.src = `assets/images/${awardType[awardIndex]}.jpg`;
    const span = document.getElementById("award-close");
    span.onclick = function () {
        document.getElementById("award-modal").style.display = "none";
    };
}