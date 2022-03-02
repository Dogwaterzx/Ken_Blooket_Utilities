(async () => {
    const gameID = prompt('Please enter the game set ID you are playing: ');

    const GetAnswers = await fetch(`https://api.blooket.com/api/games?gameId=${gameID}`, {
        headers: {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/json;charset=UTF-8",
        },
        method: 'GET'
    });
    const Answers = await GetAnswers.json();

    Answers.questions.forEach(question => {
        console.log(`Q: ${question.question} A: ${question.correctAnswers.join(', ')}`); 
    });
})();
