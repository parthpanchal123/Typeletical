

const wordsDiv = document.getElementById("wordsDiv")
const textInput = document.getElementById("textInput")
const scoreDiv = document.getElementById("scoreDiv")
let score_para = document.createElement("p")

let words;

let currentIndex = 0;

let isFetchingWords = false;

const fetchIntialWords = async () => {
  try {
    isFetchingWords = true
    toggleLoading()
    const response = await fetch("https://random-word-api.herokuapp.com/word?number=10")
    words = await response.json()
    renderWordsToDom()
    isFetchingWords = false
    toggleLoading()
  } catch (error) {
    isFetchingWords = false
    toggleLoading()
    throw new Error("Error fetching words")
  }
}

const toggleLoading = () => {
  if (isFetchingWords) {
    document.getElementsByClassName("lds-roller")[0].style.display = "block"
  } else {
    document.getElementsByClassName("lds-roller")[0].style.display = "none"
  }
}

(async () => {
  try {
    await fetchIntialWords()
  }
  catch (error) {
    console.log(error)
  }
})();

const renderWordsToDom = () => {

  // Initialize the score 
  updateScore()

  // Display the words
  words.forEach(word => {
    const wordElement = document.createElement("p")
    wordElement.classList.add("wordStyles")
    wordElement.innerText = word
    wordElement.id = word
    wordsDiv.appendChild(wordElement)
  })
}

const updateScore = () => {
  score_para.innerText = `${currentIndex} / ${words.length} completed`
  scoreDiv.appendChild(score_para)
}

textInput.addEventListener('input', async (event) => {
  const enteredWords = event.target.value.split(" ").filter(word => word.length > 0)

  if (enteredWords[enteredWords.length - 1] === words[words.length - 1]) {
    wordsDiv.innerHTML = ""
    currentIndex = 0
    textInput.value = ""
    await fetchIntialWords()

  }

  if (enteredWords.length >= 1) {
    if (enteredWords[currentIndex] === words[currentIndex]) {
      document.getElementById(enteredWords[currentIndex]).classList.toggle("active")
      currentIndex++
      updateScore()
    }
  }

})

window.addEventListener('selectstart', function(e) { e.preventDefault(); });
