fetch('/worker/misc/getmaxblooks.php').then(function(response) {
    return response.text();
}).then(function(data) {
    window.maxID = data
});

function addBlooks() {
    for (let i = 1; i <= maxID; i++) {
        $('<code>', {
            id: `blook${i}`
        }).appendTo('#blookAdder');
    }
}

function setBlookInfo(blookName) {
    fetch(`/worker/admin/getblook.php?blook=${blookName}`)
        .then(function(response) {
            return response.text();
        }).then(function(data) {
            dataSplit = data.split('|')
            var blookRarity = dataSplit[1];
            var blookImage = dataSplit[2];
            var blookPrice = dataSplit[3];
            var blookChance = dataSplit[4];
            document.getElementById("blookImage").src = blookImage;
            document.getElementById("blookName").innerHTML = blookName;
            document.getElementById("blookPrice").innerHTML = `Sell Price: ${blookPrice} Tokens`;
            document.getElementById("blookRarity").innerHTML = `${blookRarity}`;
            document.getElementById("blookChance").innerHTML = `Chance: ${blookChance}%`;
            document.getElementById("blookImageURL").innerHTML = `Image URL: ${blookImage}`;
            document.getElementById("editRarity").value = `${blookRarity}`;
            document.getElementById("editChance").value = `${blookChance}`;
            document.getElementById("editImage").value = `${blookImage}`;
            document.getElementById("editPrice").value = `${blookPrice}`;
            if (blookRarity === "Uncommon") {
                document.getElementById("blookRarity").style.color = `#4bc22e`;
            } else if (blookRarity === "Rare") {
                document.getElementById("blookRarity").style.color = `#0a14fa`;
            } else if (blookRarity === "Epic") {
                document.getElementById("blookRarity").style.color = `#be0000`;
            } else if (blookRarity === "Legendary") {
                document.getElementById("blookRarity").style.color = `#ff910f`;
            } else if (blookRarity === "Chroma") {
                document.getElementById("blookRarity").style.color = `#00ccff`;
            } else if (blookRarity === "Mystical") {
                document.getElementById("blookRarity").style.color = `#a335ee`;
            }
        });
    var blookNameURL = blookName.replace(/\s/g, '');
    fetch(`/worker/admin/getuserblook.php?blook=${blookNameURL}`)
        .then(function(response) {
            return response.text();
        }).then(function(data) {
            window.maxSellAmount = data;
        });
}

function showBlooks() {
    for (let i = 1; i <= window.maxID; i++) {
        fetch(`/worker/misc/getblook.php?id=${i}`)
            .then(function(response) {
                return response.text();
            }).then(function(data) {
                dataSplit = data.split('|')
                var blookName = dataSplit[0];
                var blookRarity = dataSplit[1];
                var blookImage = dataSplit[2];
                var blookPrice = dataSplit[3];
                var blookChance = dataSplit[4];
                document.getElementById(`blook${i}`).innerHTML = `<div role="button" onclick="setBlookInfo('${blookName}')" tabindex="0" style="font-size: 0px; outline: currentcolor none medium; user-select: none; margin: 10px 1vw; position: relative;"><div class="styles__blookContainer___GKC0D-camelCase" style="z-index: 1; margin: 0px auto; width: 5vw; height: 5.75vw; cursor: pointer; position: relative; outline: currentcolor none medium;"><img src="${blookImage}" alt="" draggable="false" class="styles__blook___2Yq1S-camelCase"></div></div>`
                document.getElementById("loaderScreen").style.display = "none";
            });
    }
}

function redirect(url) {
    window.location.href = `${url}`;
}

function closeDeleteMenu() {
    document.getElementById("deletePopup").style.display = "none";
}

function openDeleteMenu() {
    var blookName = document.getElementById("blookName").innerHTML;
    document.getElementById("deletePopup").style.display = "block";
    document.getElementById("deleteText").innerHTML = `Delete blook "${blookName}" from the database?`;
}

function closeEditMenu() {
    document.getElementById("editPopup").style.display = "none";
}

function openEditMenu() {
    var blookName = document.getElementById("blookName").innerHTML;
    document.getElementById("editPopup").style.display = "block";
    document.getElementById("editText").innerHTML = `${blookName}`;
}

function closeCreateMenu() {
    document.getElementById("createPopup").style.display = "none";
}

function openCreateMenu() {
    document.getElementById("createPopup").style.display = "block";
}

function deleteBlook() {
    document.getElementById("deletePopup").style.display = "none";
    document.getElementById("loaderScreen").style.display = "block";
    var blookName = document.getElementById("blookName").innerHTML
    var postData = 'name=' + blookName;
    $.post('/worker/admin/deleteblook.php', postData, function(data) {
        redirect('/admin_blooks.php');
    });
}

function editBlook() {
    document.getElementById("editPopup").style.display = "none";
    document.getElementById("loaderScreen").style.display = "block";
    var blookName = document.getElementById("blookName").innerHTML
    var blookRarity = document.getElementById("editRarity").value
    var blookPrice = document.getElementById("editPrice").value
    var blookChance = document.getElementById("editChance").value
    var blookImage = document.getElementById("editImage").value
    var postData = `name=${blookName}&rarity=${blookRarity}&price=${blookPrice}&chance=${blookChance}&image=${blookImage}`;
    $.post('/worker/admin/editblook.php', postData, function(data) {
        document.getElementById("loaderScreen").style.display = "none";
        setBlookInfo(blookName);
    });
}

function createBlook() {
    document.getElementById("createPopup").style.display = "none";
    document.getElementById("loaderScreen").style.display = "block";
    var blookName = document.getElementById("createName").value
    var blookRarity = document.getElementById("createRarity").value
    var blookPrice = document.getElementById("createPrice").value
    var blookChance = document.getElementById("createChance").value
    var blookImage = document.getElementById("createImage").value
    var postData = `name=${blookName}&rarity=${blookRarity}&price=${blookPrice}&chance=${blookChance}&image=${blookImage}`;
    $.post('/worker/admin/createblook.php', postData, function(data) {
        document.getElementById("loaderScreen").style.display = "none";
        redirect('/admin_blooks.php');
    });
}

setTimeout(() => addBlooks(), 1000);
setTimeout(() => showBlooks(), 1500);
