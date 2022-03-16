let name = prompt("Which box would you like to open (Example: Color)");
let amt = null;
let i = 1;
if (confirm("Would you like to select the amount of boxes?\nOk - Yes\nCancel - No")) {
    amt = Number(prompt("How many boxes would you like to open."));
} else {
    amt = 99999999999999999999999;
}

function buyBox() {
    var postData = 'box=' + name;
    $.post('/worker/box/openbox.php', postData, function(data) {
        var myArray = data.split("|");
        var word = myArray[0];
        console.log(word);
        if (data === "You're being rate limited.") {
            i--;
        }
    });
}
var check = setInterval(() => {
    if (i <= amt) {
        buyBox();
        i++;
    } else {
        clearInterval(check);
        alert("Dony buying boxes");
    }
}, 751);
