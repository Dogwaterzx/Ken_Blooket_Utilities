(async () => {

    alert("Made by: Ken");
    const hwid = prompt('Please input the HWID');

    const GetAnswers = await fetch(`https://api.blooket.com/api/homeworks/byid?id=${hwid}`, {
        headers: {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/json;charset=UTF-8",
        },
        method: 'GET'
    });
    const Answers = await GetAnswers.json();

    Answers.questions.forEach(question => {
        console.log(`Q: ${question.text} A: ${question.correctAnswers.join(', ')}`); 
    });

})();
