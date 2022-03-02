(async () => {

    alert("Made by: glizzz_y#0777");
    const id = prompt('Please input the game id');
    const name = prompt('Please input a bot name');

    if (!name) return console.log('Please provide a name, (Restart your whole process).')

    const JoinGame = await fetch("https://api.blooket.com/api/firebase/join", {
        headers: {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({
            id: id.toString(),
            name: name.toString()
        }),
        method: 'PUT'
    });
    const GameData = await JoinGame.json();

    if (!GameData.host) return console.log(`Couldn't find game with id ${id}`);

    const RemovePlayer = await fetch(`https://api.blooket.com/api/firebase/client?id=${id}&name=${name}`, {
        headers: {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/json;charset=UTF-8",
            "referer": "https://www.blooket.com/",
        },
        method: 'DELETE'
    });

    const GetAnswers = await fetch("https://api.blooket.com/api/games?gameId=" + GameData.host.set, {
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
