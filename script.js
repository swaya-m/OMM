function searchWord() {
    let word = document.getElementById("searchWord").value.trim();
    let wordElement = document.getElementById("word");
    let definitionElement = document.getElementById("definition");
    let resultBox = document.querySelector(".result");
    let audioSection = document.getElementById("audioSection");
    let playButton = document.getElementById("playAudio");

    if (word === "") {
        alert("Please enter a word!");
        return;
    }

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(response => response.json())
        .then(data => {
            if (data.title) {
                wordElement.innerText = "Word not found!";
                definitionElement.innerText = "";
                audioSection.style.display = "none";
            } else {
                wordElement.innerText = data[0].word;
                definitionElement.innerText = data[0].meanings[0].definitions[0].definition;

                // Audio pronunciation
                let audioSrc = data[0].phonetics.find(p => p.audio)?.audio;
                if (audioSrc) {
                    audioSection.style.display = "flex";
                    playButton.onclick = () => {
                        let audio = new Audio(audioSrc);
                        audio.play();
                    };
                } else {
                    audioSection.style.display = "none";
                }
            }
            resultBox.classList.add("show");
        })
        .catch(() => {
            wordElement.innerText = "Error fetching data!";
            definitionElement.innerText = "";
            audioSection.style.display = "none";
        });
}
