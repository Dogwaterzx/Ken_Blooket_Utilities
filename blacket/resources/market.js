window.onload = function() {
    $.get('/worker/misc/getmaxid.php', function(data) {
        window.maxID = data
        for (let i = 1; i <= maxID; i++) {
            window.gotBoxes = true;
            $('<code>', {
                id: `box${i}`
            }).appendTo('#boxAdder');
        }
    });
    setTimeout(()=>showBoxes(), 250);
}
;
function openBox(boxName) {
    var currentTokens = document.getElementById("tokensText").innerHTML
    var currentTokens = currentTokens.replace(',', '');
    var currentTokens = currentTokens - window.currentBoxPrice;
    document.getElementById("tokensText").innerHTML = currentTokens.toLocaleString();
    document.getElementById("buyMenu").style.display = "none";
    document.getElementById("loaderScreen").style.display = "block";
    var postData = 'box=' + boxName;
    $.post('/worker/box/openbox.php', postData, function(data) {
        console.log(`${data}`);
        if (data === "NO TOKENS") {
            document.getElementById("loaderScreen").style.display = "none";
            return
        }
        dataSplit = data.split('|')
        window.blookUnlocked = dataSplit[0];
        window.blookRarity = dataSplit[1];
        window.blookImage = dataSplit[2];
        var blookUnlockedUser = window.blookUnlocked.replace(' ', '');
        $.get(`/worker/blook/getuserblook.php?blook=${blookUnlockedUser}`, function(data) {
            if (data - 1 < 1) {
                document.getElementById("newBlookText").innerHTML = "NEW BLOOK";
            } else {
                document.getElementById("newBlookText").innerHTML = "";
            }
        });
        document.getElementById("loaderScreen").style.display = "none";
        resetBoxOpen();
        openMysteryMenu();
        updateTokens();
    });
}
function showBuy(boxName, boxPrice, boxColor) {
    window.currentTokens = document.getElementById("tokensText").innerHTML
    var currentTokensNoComma = window.currentTokens.replace(',', '');
    window.currentBoxPrice = boxPrice
    if (parseInt(currentTokensNoComma, 10) < parseInt(boxPrice, 10)) {
        document.getElementById("yesButton").style.display = "none";
        document.getElementById("noButton").style.display = "none";
        document.getElementById("notEnoughTokensButton").style.display = "block";
    } else {
        document.getElementById("yesButton").style.display = "block";
        document.getElementById("noButton").style.display = "block";
        document.getElementById("notEnoughTokensButton").style.display = "none";
    }
    var boxPriceComma = boxPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    $.get(`/worker/box/getchances.php?box=${boxName}`, function(data) {
        document.getElementById("boxRates").innerHTML = `${data}`
    });
    document.getElementById("mysteryBoxMenu").onclick = function() {}
    document.getElementById("buyMenu").style.display = "block";
    document.getElementById("boxRates").style.display = "none";
    document.getElementById("yesButton").onclick = function() {
        openBox(boxName);
        setBoxColor(boxColor);
        removeYesFunction()
    }
    document.getElementById("purchaseTheBox").innerHTML = `Purchase the ${boxName} Box`
    document.getElementById("forTokens").innerHTML = `for ${boxPriceComma} tokens?`
}
function hideBuy() {
    document.getElementById("buyMenu").style.display = "none";
}
function removeYesFunction() {
    document.getElementById("yesButton").onclick = function() {}
}
function showRates() {
    var element = document.getElementById("boxRates");
    if (element.style.display === "none") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}
function showBoxOpen() {
    document.getElementById("blookParticles").src = "";
    document.getElementById("mysteryBoxButton").className = "styles__mysteryBoxContainerOpen___39AUK-camelCase";
    document.getElementById("blookName").innerHTML = window.blookUnlocked;
    document.getElementById("blookImage").src = `${window.blookImage}`;
    document.getElementById("blookRarity").innerHTML = `${window.blookRarity}`;
    setTimeout(()=>showParticles(), 2100);
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
    } else if (blookRarity === undefined) {
        document.getElementById("blookRarity").style.color = `#FFFFFF`;
        document.getElementById("blookName").innerHTML = "You're opening boxes too fast...";
        document.getElementById("blookRarity").innerHTML = "Please open boxes slower.";
        document.getElementById("blookImage").src = "/images/blacketImage.png";
        document.getElementById("newBlookText").innerHTML = "ERROR";
    }
    if (blookRarity === "Uncommon") {
        document.getElementById("blookParticles").src = "/images/uncommonParticles.gif";
    } else if (blookRarity === "Rare") {
        document.getElementById("blookParticles").src = "/images/rareParticles.gif";
    } else if (blookRarity === "Epic") {
        document.getElementById("blookParticles").src = "/images/epicParticles.gif";
    } else if (blookRarity === "Legendary") {
        document.getElementById("blookParticles").src = "/images/legendaryParticles.gif";
    } else if (blookRarity === "Chroma") {
        document.getElementById("blookParticles").src = "/images/chromaParticles.gif";
    } else if (blookRarity === "Mystical") {
        document.getElementById("blookParticles").src = "/images/mysticalParticles.gif";
    } else if (blookRarity === undefined) {
        document.getElementById("blookParticles").src = "/images/errorParticles.gif";
    }
    document.getElementById("blookMenu").style.display = "block";
    setTimeout(()=>hideParticles(), 4100);
}
function showParticles() {
    document.getElementById("blookParticles").style.display = "block";
}
function hideParticles() {
    document.getElementById("blookParticles").style.display = "none";
}
function setBoxColor(boxColor) {
    var element = document.getElementById("mysteryBoxButton").style.backgroundColor = `${boxColor}`;
}
function resetBoxOpen() {
    document.getElementById("mysteryBoxButton").className = "styles__mysteryBoxContainerBefore___1FhvC-camelCase";
    document.getElementById("blookMenu").style.display = "none";
}
function updateTokens() {
    $.get(`/worker/user/gettokens.php`, function(data) {
        var dataComma = data.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        document.getElementById("tokensText").innerHTML = `${dataComma}`;
    });
}
function showBoxes() {
    while (window.gotBoxes = false) {}
    for (let i = 1; i <= window.maxID; i++) {
        $.get(`/worker/misc/getbox.php?id=${i}`, function(data) {
            dataSplit = data.split('|')
            var boxName = dataSplit[0];
            var boxPrice = dataSplit[1];
            var boxColor = dataSplit[2];
            var boxImage = dataSplit[3];
            var boxPriceComma = boxPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            document.getElementById(`box${i}`).innerHTML = `<div class="styles__box___2pZ5d-camelCase" role="button" onclick="showBuy('${boxName}', '${boxPrice}', '${boxColor}')" tabindex="0"><div class="styles__boxHeader___UoHkq-camelCase">${boxName} Box</div><div class="styles__middleBoxContainer___e-Gwl-camelCase"><div class="styles__miniBlookContainer___1Y4oH-camelCase"><div class="styles__blookContainer___GKC0D-camelCase styles__miniBlook___3eAjl-camelCase"><img src="${boxImage}" alt="" draggable="false" class="styles__blook___2Yq1S-camelCase" /></div><div class="styles__blookContainer___GKC0D-camelCase styles__miniBlook___3eAjl-camelCase"><img src="${boxImage}" alt="" draggable="false" class="styles__blook___2Yq1S-camelCase" /></div><div class="styles__blookContainer___GKC0D-camelCase styles__miniBlook___3eAjl-camelCase"><img src="${boxImage}" alt="" draggable="false" class="styles__blook___2Yq1S-camelCase" /></div><div class="styles__blookContainer___GKC0D-camelCase styles__miniBlook___3eAjl-camelCase"><img src="${boxImage}" alt="" draggable="false" class="styles__blook___2Yq1S-camelCase" /></div></div><div class="styles__mysteryBoxIcon___18nWF-camelCase" style="background-color:${boxColor};">?</div> </div> <div class="styles__boxTokenContainer___1clGF-camelCase"> <div class="styles__boxTokenText___NdiWk-camelCase">${boxPriceComma}</div>
<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMy4yMjkgMTMuMjI5IiBoZWlnaHQ9IjUwIiB3aWR0aD0iNTAiPjxkZWZzPjxzdHlsZT5AZm9udC1mYWNle2ZvbnQtZmFtaWx5OiJQZXJtYW5lbnQgTWFya2VyIjtzcmM6dXJsKGRhdGE6YXBwbGljYXRpb24vZm9udC13b2ZmO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGQwOUdSZ0FCQUFBQUFBWklBQTBBQUFBQUNZUUFBUUJDQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFCUFV5OHlBQUFCTUFBQUFFOEFBQUJnWWJiaSttTnRZWEFBQUFHQUFBQUFOd0FBQVVJQURRTEtZM1owSUFBQUFiZ0FBQUFDQUFBQUFnQVZBQUJtY0dkdEFBQUJ2QUFBQVBjQUFBRmhra0hhK21kc2VXWUFBQUswQUFBQk5nQUFBWlFVcTE5eWFHVmhaQUFBQSt3QUFBQTJBQUFBTnYvWVd3NW9hR1ZoQUFBRUpBQUFBQ0FBQUFBa0J1b0FkMmh0ZEhnQUFBUkVBQUFBQ0FBQUFBZ0RkQUFmYkc5allRQUFCRXdBQUFBR0FBQUFCZ0RLQUFCdFlYaHdBQUFFVkFBQUFCd0FBQUFnQWc0QjZtNWhiV1VBQUFSd0FBQUJ1d0FBQTFSUVc4TTljRzl6ZEFBQUJpd0FBQUFVQUFBQUlQKzJBRFZ3Y21Wd0FBQUdRQUFBQUFjQUFBQUhhQWFNaFhpY1kyQmgvTWs0Z1lHVmdZRnBEMU1YQXdOREQ0Um12TXRnekFqa01qSEFRQU1EZzdvQUF3SzRlUG9GTVRnd3FEQ29NT1g5UDh4Z3kxTEE2QW9VQm1saVlDcGsrZ2FrRkJnWUFKR3pET29BZUp4allHQmdab0JnR1FaR0JoQ3dBZklZd1h3V0JnVWd6UUtFSUw3Sy8vOFE4djlkcUVvR1JqWUdvZ0FqY2NxR0pBQUFYTWtHMWdBQUZRQUFlSnhka0QxT3hEQVFoV01TRm5JREpBdkpJMnNwVnJib3FWSTRrVkNhc0tId05QeEl1eExaT3lDbG9YSEJXZDUyS1hNeEJONEVWa0RqOFh1aitmUm1rSmdhZWVQM1FyenpJRDdmNEM3M2VmcjRZQ0dNVW1YbklKNHNUZ3pFaWl4U295cWt5MnJ0TmF1Z3d1MG1xRXE5UEcrUUxhY2FHOXZBMXdwSjY3djQzbnRDd2ZMNDNUTGZXR1FIVERaaEFrZkE3aHV3bXdCeC9zUGkxTlFLNlZYajd6eDZKMUU0bGtTcXhOaDRqRTRTczhYaW1ESFcxKzVpVG50bXNGaFpuTStFMXFPUVNEaUVXV2xDSDRJTWNZTWZQZjdWZzBqK0c4VnZJMTZnSEVUZlRKMWVrendZbWpURmhPd3NjbE8zdm93UmllMFg1V0JyWEFCNG5DVlAwVTdETUF5c25UaDJtcXhadXk3ZENveHBRUGVDaWpSWUN3Z21YdmcyL29MdjQ0MVBnQlNrazNYeW5jOTJCdG5senhjKzRYZjJrV1d3QVM0bU5JWGloQjcyUFl3OVRHVDNzQjk2SEljZWhqR2VjRHpCT0hUSEpKaHUvK2ViVEtkL3FFbE5kUVBOSVRZYjFmem5kb2E3QXZlSm1jaXBlOWdneHlHSjhJbEt3a3VIR2x5dVVVc3htN3U2bVR1bGJTWEdvZFlHdEFhTnFOMzI4YjZQdENhd1ozM0l5Mkw3Zko0bXlCT2lVUnI1L09wbTNyNXVPZFR0b20xbGVkc281eTFZcDJ5Vlg3MWYyR2E5ZHZZc0FDRXRGa0hObGpNR3hhUWlISmE3OG5xbzArczJ4bWkxOXpseWtIQmRBZ0I1RVJCRXBVeTFLRW01ZW1WRENBYkp6NFRTZG5Ga2dMM2tCYnZDVlczbHlGZDJkYnpiMGNYYkxiRWt0MGdaakNmUktHQVltYVlyREdteHZxeVpGYmttK3dYVFhCNThBQUFBQVFBQUFBRUFRczlpaDBSZkR6ejFBQXNFQUFBQUFBREpOVW9nQUFBQUFOVXJ6TmNBSC8vb0Fqa0M3d0FBQUFrQUFnQUFBQUFBQUhpY1kyQmtZR0FwK0xlYlFaN3hKNFA4L3dOTWxneEFFUlRBQkFDSjR3VmtBWHNBQUFINUFCOEFBQUFBQU1vQUFIaWNZMkJrWUdCZ1l1aGdBTkVNVUpJTEpNU1lDR0lDQUJCT0FQeDRuSlZSeldyYlFCRCsxbkZTQ3EzcHJhV25vYWVreFByeDBUb0Yyd0hSeEJpbjVLNG9peXlpU0dLbDJQalNKOGdMNUMzNkREMzBJZm9ZZllKK1hpL0JtSlJTTGJ2N3pjdzMzK3lNQUx6RFR5aHN2NGg3aXhYOWtjTWR2TUlYaHcvd0NYT0h1L2lBMXVGRHZNV2p3MGQ0anllSGUvaU03OHhTM2RlMGx2amxzSUtvbWNNZDlGVHQ4QUhHNnB2RFhRVHFoOE9IK0toK08zd0VyL1BHNFI2K2RvYWpxbDZiUEZ1MGNweWV5Q0FJQTdsWnkzbFZ0akxPUzIxT0pTNVRUODZLUWl5dEVhTWJiWmI2MXB0cGM1K1Vtc3pMeE54cE05ZlpRNUdZMEF1Q01CckgwM24wek5nUytvNnhueWpPZjYxTmsxZWxXSVcvNUM3YXRoNzYvbXExOHBJNlNSZmFxMHptRjNtcXkwWTMva1U4bWt5dkp2MkJGMkNFQ2pYV01NaVJZY0Y1QzQ2UjRvVDNBQUZDYnNFTkdZSnpja3ZMR0pOZFFqUHJsRlpNbk1Jak9rUEJKVHRxamJVMDd3MTd5Zk9XekptMTdwRllsYTNtSlMyRE94dVo4OHp3UUsyTkwyUkdZTjhTc1hLTUtlUFJDeHE3Q3YwOWpYOVZsRDMrdGZVMjdHUFRzK3k4NGYvcWJtYlFjc0pEK0Z3cnV6eEdhdTZVVVUycklpOWp0R0MxMUdvMmRtSStMdGp0Q0JOMmZNV3p6ei9DVi93QjNLaWtHd0I0bkdOZ1pnQ0QvNXNaakJrd0FSTUFMS3NCNjdnQi80V3dCSTBBKSBmb3JtYXQoIndvZmYiKTsgZm9udC13ZWlnaHQ6bm9ybWFsO2ZvbnQtc3R5bGU6bm9ybWFsO30gQGZvbnQtZmFjZXtmb250LWZhbWlseToiVGl0YW4gT25lIjtzcmM6dXJsKGRhdGE6YXBwbGljYXRpb24vZm9udC13b2ZmO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGQwOUdSZ0FCQUFBQUFBU2dBQXdBQUFBQUJ3QUFBUUJDQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFCUFV5OHlBQUFCSEFBQUFFd0FBQUJnaGlhT2hXTnRZWEFBQUFGb0FBQUFOd0FBQVVJQURRTEtaMkZ6Y0FBQUFhQUFBQUFJQUFBQUNBQUFBQkJuYkhsbUFBQUJxQUFBQUo4QUFBQ292Sm5SaFdobFlXUUFBQUpJQUFBQU13QUFBRGI0RVZlRGFHaGxZUUFBQW53QUFBQWdBQUFBSkFaa0FncG9iWFI0QUFBQ25BQUFBQWdBQUFBSUE4UUFIbXh2WTJFQUFBS2tBQUFBQmdBQUFBWUFWQUFBYldGNGNBQUFBcXdBQUFBZEFBQUFJQUJGQUVkdVlXMWxBQUFDekFBQUFiVUFBQU1xN1ZqQWlIQnZjM1FBQUFTRUFBQUFGQUFBQUNEL3VBQTBjSEpsY0FBQUJKZ0FBQUFIQUFBQUIyZ0dqSVY0bkdOZ1lackJPSUdCbFlHQmFROVRGd01EUXcrRVpyekxZTVR3Q3lqS2dBU1VCWkE0QlpWRnhRd09EQ29NS3N5bi9nY3lNRENmWWxnUEZHWUV5VEc1TUIwRFVnb01UQUN3WGcyMGVKeGpZR0JnWm9CZ0dRWkdCaEN3QWZJWXdYd1dCZ1VnelFLRUlMN0svLzhROHY5ZHFFb0dSallHb2dBamNjcUdKQUFBWE1rRzFnQUFBUUFCLy84QUQzaWNZMkJra1B1L2k2bUttWWZCaG9GQjJNVE0yRWhjVEpaUlRGeE1WSVJOV1VsZFRZbE5SSTVGaEkrSkhjcTNaVlJUVnpNRnFSTXpNalBSWXpFMU1YL3RZMmZBeDFXb0kyUW96aUxtRkM2djQranJwQ09nN204T0ZuYzBpRkVRWTVrWElLSGpCQlRleG5SR1hGT0VqMGNPQ0xsTktqaGxCUlNGZU9XMGdzTXNiUFM1QlNCU2JMeVNzaGFWWm9JSzRueHlHbjRtTytRWkdCZ0E1bEFibWdCNG5HTmdaR0JnWUdSd21oRXlvU2llMytZckF6ZnpDNkFJdzJsZHp0TndXdTcvTHFZcVpoNGdsNE9CQ1NRS0FFRnFDc3dBZUp4allHUmdZRDcxUDVDQmdXa0dneHlESEZNVkExQUVCVEFCQUYycEEzUUJMQUFBQXBnQUhnQUFBQUFBVkFBQWVKeGpZR1JnWUdCaXNHVUEwU0FXQTVBRllqc3dzSU1FQUFpZUFJMEFBQUI0bkcxU3NXN2JNQlE4S1k3YkREV0NqSm1JVERZUXlGS1FTVk9BRko2Q0dEQ0M3S3JGU0VKcFVTRHBCTWxYZE9qYXBXT25vdDlRZE1ybjVBTjZrZ2c3U0N5QzVMM2ozZVBUQXdFYzRoOEM5TjhYemg0SE9HRFU0eEFmOE5YalBaekFlRHlnNXJ2SCsvaUVIeDRQOFJHL1BCN2hHSC9vQ2dZSGpQN2kyZU1BUjhFM2owT01ncDhlNytGejhOdmpBVFV2SHUvak9CeDZQTVJoS0R3ZTRUeU1MM1h6YUtxaWRHSzhuSWl6T0VuRVF1ZGt0Sml0WmYyVXFTclB4TGlVU3VrTGM3ZWhvcVZlVFU3RlErVktzWkJXbW51Wmk1bXVuYmpPVmxLYzNGUXVxOFc4bGx1MGtNVmFaY2FuMzJaUHhVYVNkaFZzd2x0cGJLVnJrVVJ4M0xNa1MrZWFkRHExUzFNMXprYTJVcEUyeFhRK3U4SWxOQm84c3NzVkNwUndFQmhqaVFuM004UklPQVFXVk9WZW94blBzSVpFalNka1VHUno3cTJ2SktzNE5DNm92dHVoaXBoYlk4WDhwM1E4a0hWMHRUZElXRTZEZTY1NWQ0ZW10NjNubXI0VldjSFhjTk01TXA0SXpMbktuVnlicmVEdGlxeDVVLzJ1MmxNNjMyZEpYL1hnL2VsdFY2MGxyenMyNGIvRm5YcXI3WlZ0VngyN25HTEtZZG1CdHBhR25LV256YUM0YTdJRnorZXM4T28vSFdLYUJ3QUFBSGljWTJCbUFJUC9XeG1NR0RBQkV3QXN4QUhzdUFIL2hiQUVqUUE9KSBmb3JtYXQoIndvZmYiKTsgZm9udC13ZWlnaHQ6bm9ybWFsO2ZvbnQtc3R5bGU6bm9ybWFsO308L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNMCAwaDEzLjIzdjEzLjIzSDB6IiBmaWxsPSIjZmZkYTAwIi8+PHRleHQgeT0iMjk0LjE0MiIgeD0iMy4xIiB4bWw6c3BhY2U9InByZXNlcnZlIiBsZXR0ZXItc3BhY2luZz0iMCIgd29yZC1zcGFjaW5nPSIwIiBmb250LXNpemU9IjEwLjU4MyIgZm9udC1mYW1pbHk9IlBlcm1hbmVudCBNYXJrZXIiPjx0c3BhbiB5PSIxMC4zNzEiIHg9IjMuMSIgZm9udC1mYW1pbHk9IlRpdGFuIE9uZSIgZmlsbD0iI2ZmZiI+JDwvdHNwYW4+PC90ZXh0Pjwvc3ZnPg==" alt="Token" class="styles__boxTokenIcon___1PttE-camelCase "draggable="false"/></div></div>`
            document.getElementById("loaderScreen").style.display = "none";
        });
    }
}
function allowClosing() {
    setTimeout(()=>document.getElementById("mysteryBoxMenu").onclick = function() {
        closeMysteryMenu();
        resetBoxOpen()
    }
    , 3250);
}
function closeMysteryMenu() {
    document.getElementById("mysteryBoxMenu").style.display = "none";
    document.getElementById("blookParticles").src = "";
}
function openMysteryMenu() {
    document.getElementById("mysteryBoxMenu").style.display = "block";
}
updateTokens();
