window.onload = function() {
    $.get('/worker/misc/getmaxblooks.php', function(data) {
        window.maxID = data
        for (let i = 1; i <= maxID; i++) {
            window.gotBlooks = true
            $('<code>', {
                id: `blook${i}`
            }).appendTo('#blookAdder');
        }
    });
    setTimeout(()=>showBlooks(), 250);
    $.get('/worker/blook/getrandomblook.php', function(data) {
        setBlookInfo(data);
    });
}
function setBlookInfo(blookName) {
    $.get(`/worker/blook/getblook.php?blook=${blookName}`, function(data) {
        dataSplit = data.split('|')
        var blookRarity = dataSplit[0];
        var blookImage = dataSplit[1];
        var blookPrice = dataSplit[2];
        var blookPriceComma = blookPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        document.getElementById("blookImage").src = blookImage;
        document.getElementById("blookName").innerHTML = blookName;
        document.getElementById("blookPrice").innerHTML = `Sell Price: ${blookPriceComma}`;
        document.getElementById("sellImage").style.display = "block";
        document.getElementById("blookRarity").innerHTML = `${blookRarity}`;
        document.getElementById("sellText").innerHTML = `Sell ${blookName} Blook(s) for ${blookPriceComma} tokens each:`;
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
    $.get(`/worker/blook/getuserblook.php?blook=${blookNameURL}`, function(data) {
        window.maxSellAmount = data;
        document.getElementById("blookQuantity").innerHTML = `Quantity: ${data}`;
        document.getElementById("sellOutOf").innerHTML = `/ ${data}`;
        if (data > 0) {
            document.getElementById("sellButton").style.display = "block";
        } else {
            document.getElementById("sellButton").style.display = "none";
        }
    });
}
function closeSellMenu() {
    document.getElementById("sellPopup").style.display = "none";
}
function openSellMenu() {
    document.getElementById("sellPopup").style.display = "block";
    document.getElementById("sellAmount").value = ``;
    document.getElementById("sellAmount").focus();
}
function showBlooks() {
    while (window.gotBlooks = false) {}
    for (let i = 1; i <= window.maxID; i++) {
        $.get(`/worker/misc/getblook.php?id=${i}`, function(data) {
            dataSplit = data.split('|')
            var blookName = dataSplit[0];
            var blookRarity = dataSplit[1];
            var blookImage = dataSplit[2];
            document.getElementById(`blook${i}`).innerHTML = `<div role="button" onclick="setBlookInfo('${blookName}')" tabindex="0" style="font-size: 0px; outline: currentcolor none medium; user-select: none; margin: 10px 1vw; position: relative;"><div class="styles__blookContainer___GKC0D-camelCase" style="z-index: 1; margin: 0px auto; width: 5vw; height: 5.75vw; cursor: pointer; position: relative; outline: currentcolor none medium;"><img src="${blookImage}" alt="" draggable="false" class="styles__blook___2Yq1S-camelCase"></div></div>`
        });
    }
    document.getElementById("loaderScreen").style.display = "none";
}
function sellBlook() {
    var sellAmount = document.getElementById("sellAmount").value
    if (parseInt(window.maxSellAmount, 10) <= parseInt(sellAmount, 10)) {
        if (parseInt(window.maxSellAmount, 10) != parseInt(sellAmount, 10)) {
            return
        }
    }
    if (0 >= parseInt(sellAmount, 10)) {
        return
    }
    document.getElementById("sellPopup").style.display = "none";
    document.getElementById("loaderScreen").style.display = "block";
    var blookName = document.getElementById("blookName").innerHTML
    console.log(blookName);
    var amount = document.getElementById("sellAmount").value
    var postData = 'blook=' + blookName + '&amount=' + amount;
    $.post('/worker/blook/sellblook.php', postData, function(data) {
        var previousValue = document.getElementById("blookQuantity").innerHTML;
        var previousValueNoText = previousValue.replace(/\D/g, '');
        var newValue = previousValueNoText - amount;
        document.getElementById("blookQuantity").innerHTML = `Quantity: ${newValue}`;
        document.getElementById("loaderScreen").style.display = "none";
        setBlookInfo(blookName);
    });
}
function checkInput(sellAmount) {
    if (parseInt(window.maxSellAmount, 10) <= parseInt(sellAmount, 10)) {
        document.getElementById("sellAmount").value = `${window.maxSellAmount}`;
    }
    if (/[a-z]/.test(sellAmount)) {
        document.getElementById("sellAmount").value = ``;
    }
    if (/[A-Z]/.test(sellAmount)) {
        document.getElementById("sellAmount").value = ``;
    }
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>`~\/?]+/.test(sellAmount)) {
        document.getElementById("sellAmount").value = ``;
    }
    if (/[\s]/.test(sellAmount)) {
        document.getElementById("sellAmount").value = ``;
    }
}
