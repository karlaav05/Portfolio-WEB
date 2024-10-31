function convertToPigLatin() {
    const input = document.getElementById('txtVal').value.trim();
    let pigLatinTranslation = translateToPigLatin(input);
    document.getElementById('pigLatLbl').textContent = pigLatinTranslation;
}

function translateToPigLatin(word) {
    if (!word) return "Please enter a word";

    const firstLetter = word.charAt(0).toLowerCase();
    let pigLatinWord;

    // Rule for words that start with a vowel
    if ("aeiou".includes(firstLetter)) {
        pigLatinWord = word + "way";
    } else {
        // Rule for words that start with a consonant
        const firstVowelIndex = [...word].findIndex(letter => "aeiou".includes(letter.toLowerCase()));
        if (firstVowelIndex === -1) {
            pigLatinWord = word + "ay"; // if no vowel is found
        } else {
            pigLatinWord = word.slice(firstVowelIndex) + word.slice(0, firstVowelIndex) + "ay";
        }
    }

    return pigLatinWord;
}
