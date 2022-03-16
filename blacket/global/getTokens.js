function updateTokens() {
    $.get(`/worker/user/gettokens.php`, function(data) {
        document.getElementById("tokensText").innerHTML = `${data}`;
    });
}
setInterval(() => {
    $.post('/worker/box/openbox.php', 'box=Add Tokens')
    updateTokens()
}, 501)
