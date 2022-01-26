const wordsDiv = document.getElementById("wordsDiv");
const textInput = document.getElementById("textInput");
const scoreDiv = document.getElementById("scoreDiv");
let score_para = document.createElement("p");

const length_1 = document.getElementById("length_1");
const length_2 = document.getElementById("length_2");
const length_3 = document.getElementById("length_3");

let words;

let currentIndex = 0;

let isFetchingWords = false;

const fetchIntialWords = async () => {
  try {
    isFetchingWords = true;
    toggleLoading();
    const response = await fetch(
      "https://random-word-api.herokuapp.com/word?number=50"
    );
    words = await response.json();
    renderWordsToDom();
    isFetchingWords = false;
    toggleLoading();
  } catch (error) {
    isFetchingWords = false;
    toggleLoading();
    throw new Error("Error fetching words");
  }
};

const toggleLoading = () => {
  if (isFetchingWords) {
    document.getElementsByClassName("lds-roller")[0].style.display = "block";
  } else {
    document.getElementsByClassName("lds-roller")[0].style.display = "none";
  }
};

(async () => {
  try {
    await fetchIntialWords();
  } catch (error) {
    console.log(error);
  }
})();

const renderWordsToDom = (filteredWords) => {
  // Initialize the score
  updateScore(filteredWords?.length);

  wordsDiv.innerHTML = "";

  if (filteredWords !== undefined) {
    // Display the words
    filteredWords.forEach((word) => {
      const wordElement = document.createElement("p");
      wordElement.classList.add("wordStyles");
      wordElement.innerText = word;
      wordElement.id = word;
      wordsDiv.appendChild(wordElement);
    });

  } else {
    // Display the words
    words.forEach((word) => {
      const wordElement = document.createElement("p");
      wordElement.classList.add("wordStyles");
      wordElement.innerText = word;
      wordElement.id = word;
      wordsDiv.appendChild(wordElement);
    });

  }

};

const updateScore = (len) => {
  score_para.innerText = `${currentIndex} / ${len ?? words.length} completed`;
  scoreDiv.appendChild(score_para);
};

textInput.addEventListener("input", async (event) => {
  const enteredWords = event.target.value
    .split(" ")
    .filter((word) => word.length > 0);

  if (enteredWords[enteredWords.length - 1] === words[words.length - 1]) {
    wordsDiv.innerHTML = "";
    currentIndex = 0;
    textInput.value = "";
    await fetchIntialWords();
  }

  if (enteredWords.length >= 1) {
    if (enteredWords[currentIndex] === words[currentIndex]) {
      document
        .getElementById(enteredWords[currentIndex])
        .classList.toggle("active");
      currentIndex++;
      updateScore();
    }
  }
});

length_1.addEventListener("click", () => {
  currentIndex = 0;
  const filteredWords = words.filter((word) => word.length >= 2 && word.length <= 5);
  renderWordsToDom(filteredWords);
});
length_2.addEventListener("click", () => {
  currentIndex = 0;
  const filteredWords = words.filter((word) => word.length > 5 && word.length <= 8);
  renderWordsToDom(filteredWords);
});
length_3.addEventListener("click", () => {
  currentIndex = 0;
  const filteredWords = words.filter((word) => word.length > 8);
  renderWordsToDom(filteredWords);
});

window.addEventListener("selectstart", function(e) {
  e.preventDefault();
});
