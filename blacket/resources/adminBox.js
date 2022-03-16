fetch('/worker/misc/getmaxid.php').then(function(response) {
    return response.text();
}).then(function(data) {
    maxID = data
    for (let i = 1; i <= maxID; i++) {
        $('<code>', {
            id: `box${i}`
        }).appendTo('#boxAdder');
    }
});


function showBoxes() {
    for (let i = 1; i <= window.maxID; i++) {
        fetch(`/worker/misc/getbox.php?id=${i}`)
            .then(function(response) {
                return response.text();
            }).then(function(data) {
                dataSplit = data.split('|')
                var boxName = dataSplit[0];
                var boxPrice = dataSplit[1];
                var boxColor = dataSplit[2];
                var boxChances = dataSplit[3];
                var boxImage = dataSplit[4];
                document.getElementById(`box${i}`).innerHTML = `<div class="styles__box___2pZ5d-camelCase" role="button" onclick="openOptions('${boxName}')" tabindex="0"><div class="styles__boxHeader___UoHkq-camelCase">${boxName} Box</div><div class="styles__middleBoxContainer___e-Gwl-camelCase"><div class="styles__miniBlookContainer___1Y4oH-camelCase"><div class="styles__blookContainer___GKC0D-camelCase styles__miniBlook___3eAjl-camelCase"><img src="${boxImage}" alt="" draggable="false" class="styles__blook___2Yq1S-camelCase" /></div><div class="styles__blookContainer___GKC0D-camelCase styles__miniBlook___3eAjl-camelCase"><img src="${boxImage}" alt="" draggable="false" class="styles__blook___2Yq1S-camelCase" /></div><div class="styles__blookContainer___GKC0D-camelCase styles__miniBlook___3eAjl-camelCase"><img src="${boxImage}" alt="" draggable="false" class="styles__blook___2Yq1S-camelCase" /></div><div class="styles__blookContainer___GKC0D-camelCase styles__miniBlook___3eAjl-camelCase"><img src="${boxImage}" alt="" draggable="false" class="styles__blook___2Yq1S-camelCase" /></div></div><div class="styles__mysteryBoxIcon___18nWF-camelCase" style="background-color:${boxColor};">${i}</div> </div> <div class="styles__boxTokenContainer___1clGF-camelCase"> <div class="styles__boxTokenText___NdiWk-camelCase">${boxPrice}</div>
<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMy4yMjkgMTMuMjI5IiBoZWlnaHQ9IjUwIiB3aWR0aD0iNTAiPjxkZWZzPjxzdHlsZT5AZm9udC1mYWNle2ZvbnQtZmFtaWx5OiJQZXJtYW5lbnQgTWFya2VyIjtzcmM6dXJsKGRhdGE6YXBwbGljYXRpb24vZm9udC13b2ZmO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGQwOUdSZ0FCQUFBQUFBWklBQTBBQUFBQUNZUUFBUUJDQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFCUFV5OHlBQUFCTUFBQUFFOEFBQUJnWWJiaSttTnRZWEFBQUFHQUFBQUFOd0FBQVVJQURRTEtZM1owSUFBQUFiZ0FBQUFDQUFBQUFnQVZBQUJtY0dkdEFBQUJ2QUFBQVBjQUFBRmhra0hhK21kc2VXWUFBQUswQUFBQk5nQUFBWlFVcTE5eWFHVmhaQUFBQSt3QUFBQTJBQUFBTnYvWVd3NW9hR1ZoQUFBRUpBQUFBQ0FBQUFBa0J1b0FkMmh0ZEhnQUFBUkVBQUFBQ0FBQUFBZ0RkQUFmYkc5allRQUFCRXdBQUFBR0FBQUFCZ0RLQUFCdFlYaHdBQUFFVkFBQUFCd0FBQUFnQWc0QjZtNWhiV1VBQUFSd0FBQUJ1d0FBQTFSUVc4TTljRzl6ZEFBQUJpd0FBQUFVQUFBQUlQKzJBRFZ3Y21Wd0FBQUdRQUFBQUFjQUFBQUhhQWFNaFhpY1kyQmgvTWs0Z1lHVmdZRnBEMU1YQXdOREQ0Um12TXRnekFqa01qSEFRQU1EZzdvQUF3SzRlUG9GTVRnd3FEQ29NT1g5UDh4Z3kxTEE2QW9VQm1saVlDcGsrZ2FrRkJnWUFKR3pET29BZUp4allHQmdab0JnR1FaR0JoQ3dBZklZd1h3V0JnVWd6UUtFSUw3Sy8vOFE4djlkcUVvR1JqWUdvZ0FqY2NxR0pBQUFYTWtHMWdBQUZRQUFlSnhka0QxT3hEQVFoV01TRm5JREpBdkpJMnNwVnJib3FWSTRrVkNhc0tId05QeEl1eExaT3lDbG9YSEJXZDUyS1hNeEJONEVWa0RqOFh1aitmUm1rSmdhZWVQM1FyenpJRDdmNEM3M2VmcjRZQ0dNVW1YbklKNHNUZ3pFaWl4U295cWt5MnJ0TmF1Z3d1MG1xRXE5UEcrUUxhY2FHOXZBMXdwSjY3djQzbnRDd2ZMNDNUTGZXR1FIVERaaEFrZkE3aHV3bXdCeC9zUGkxTlFLNlZYajd6eDZKMUU0bGtTcXhOaDRqRTRTczhYaW1ESFcxKzVpVG50bXNGaFpuTStFMXFPUVNEaUVXV2xDSDRJTWNZTWZQZjdWZzBqK0c4VnZJMTZnSEVUZlRKMWVrendZbWpURmhPd3NjbE8zdm93UmllMFg1V0JyWEFCNG5DVlAwVTdETUF5c25UaDJtcXhadXk3ZENveHBRUGVDaWpSWUN3Z21YdmcyL29MdjQ0MVBnQlNrazNYeW5jOTJCdG5senhjKzRYZjJrV1d3QVM0bU5JWGloQjcyUFl3OVRHVDNzQjk2SEljZWhqR2VjRHpCT0hUSEpKaHUvK2ViVEtkL3FFbE5kUVBOSVRZYjFmem5kb2E3QXZlSm1jaXBlOWdneHlHSjhJbEt3a3VIR2x5dVVVc3htN3U2bVR1bGJTWEdvZFlHdEFhTnFOMzI4YjZQdENhd1ozM0l5Mkw3Zko0bXlCT2lVUnI1L09wbTNyNXVPZFR0b20xbGVkc281eTFZcDJ5Vlg3MWYyR2E5ZHZZc0FDRXRGa0hObGpNR3hhUWlISmE3OG5xbzArczJ4bWkxOXpseWtIQmRBZ0I1RVJCRXBVeTFLRW01ZW1WRENBYkp6NFRTZG5Ga2dMM2tCYnZDVlczbHlGZDJkYnpiMGNYYkxiRWt0MGdaakNmUktHQVltYVlyREdteHZxeVpGYmttK3dYVFhCNThBQUFBQVFBQUFBRUFRczlpaDBSZkR6ejFBQXNFQUFBQUFBREpOVW9nQUFBQUFOVXJ6TmNBSC8vb0Fqa0M3d0FBQUFrQUFnQUFBQUFBQUhpY1kyQmtZR0FwK0xlYlFaN3hKNFA4L3dOTWxneEFFUlRBQkFDSjR3VmtBWHNBQUFINUFCOEFBQUFBQU1vQUFIaWNZMkJrWUdCZ1l1aGdBTkVNVUpJTEpNU1lDR0lDQUJCT0FQeDRuSlZSeldyYlFCRCsxbkZTQ3EzcHJhV25vYWVreFByeDBUb0Yyd0hSeEJpbjVLNG9peXlpU0dLbDJQalNKOGdMNUMzNkREMzBJZm9ZZllKK1hpL0JtSlJTTGJ2N3pjdzMzK3lNQUx6RFR5aHN2NGg3aXhYOWtjTWR2TUlYaHcvd0NYT0h1L2lBMXVGRHZNV2p3MGQ0anllSGUvaU03OHhTM2RlMGx2amxzSUtvbWNNZDlGVHQ4QUhHNnB2RFhRVHFoOE9IK0toK08zd0VyL1BHNFI2K2RvYWpxbDZiUEZ1MGNweWV5Q0FJQTdsWnkzbFZ0akxPUzIxT0pTNVRUODZLUWl5dEVhTWJiWmI2MXB0cGM1K1Vtc3pMeE54cE05ZlpRNUdZMEF1Q01CckgwM24wek5nUytvNnhueWpPZjYxTmsxZWxXSVcvNUM3YXRoNzYvbXExOHBJNlNSZmFxMHptRjNtcXkwWTMva1U4bWt5dkp2MkJGMkNFQ2pYV01NaVJZY0Y1QzQ2UjRvVDNBQUZDYnNFTkdZSnpja3ZMR0pOZFFqUHJsRlpNbk1Jak9rUEJKVHRxamJVMDd3MTd5Zk9XekptMTdwRllsYTNtSlMyRE94dVo4OHp3UUsyTkwyUkdZTjhTc1hLTUtlUFJDeHE3Q3YwOWpYOVZsRDMrdGZVMjdHUFRzK3k4NGYvcWJtYlFjc0pEK0Z3cnV6eEdhdTZVVVUycklpOWp0R0MxMUdvMmRtSStMdGp0Q0JOMmZNV3p6ei9DVi93QjNLaWtHd0I0bkdOZ1pnQ0QvNXNaakJrd0FSTUFMS3NCNjdnQi80V3dCSTBBKSBmb3JtYXQoIndvZmYiKTsgZm9udC13ZWlnaHQ6bm9ybWFsO2ZvbnQtc3R5bGU6bm9ybWFsO30gQGZvbnQtZmFjZXtmb250LWZhbWlseToiVGl0YW4gT25lIjtzcmM6dXJsKGRhdGE6YXBwbGljYXRpb24vZm9udC13b2ZmO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGQwOUdSZ0FCQUFBQUFBU2dBQXdBQUFBQUJ3QUFBUUJDQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFCUFV5OHlBQUFCSEFBQUFFd0FBQUJnaGlhT2hXTnRZWEFBQUFGb0FBQUFOd0FBQVVJQURRTEtaMkZ6Y0FBQUFhQUFBQUFJQUFBQUNBQUFBQkJuYkhsbUFBQUJxQUFBQUo4QUFBQ292Sm5SaFdobFlXUUFBQUpJQUFBQU13QUFBRGI0RVZlRGFHaGxZUUFBQW53QUFBQWdBQUFBSkFaa0FncG9iWFI0QUFBQ25BQUFBQWdBQUFBSUE4UUFIbXh2WTJFQUFBS2tBQUFBQmdBQUFBWUFWQUFBYldGNGNBQUFBcXdBQUFBZEFBQUFJQUJGQUVkdVlXMWxBQUFDekFBQUFiVUFBQU1xN1ZqQWlIQnZjM1FBQUFTRUFBQUFGQUFBQUNEL3VBQTBjSEpsY0FBQUJKZ0FBQUFIQUFBQUIyZ0dqSVY0bkdOZ1lackJPSUdCbFlHQmFROVRGd01EUXcrRVpyekxZTVR3Q3lqS2dBU1VCWkE0QlpWRnhRd09EQ29NS3N5bi9nY3lNRENmWWxnUEZHWUV5VEc1TUIwRFVnb01UQUN3WGcyMGVKeGpZR0JnWm9CZ0dRWkdCaEN3QWZJWXdYd1dCZ1VnelFLRUlMN0svLzhROHY5ZHFFb0dSallHb2dBamNjcUdKQUFBWE1rRzFnQUFBUUFCLy84QUQzaWNZMkJra1B1L2k2bUttWWZCaG9GQjJNVE0yRWhjVEpaUlRGeE1WSVJOV1VsZFRZbE5SSTVGaEkrSkhjcTNaVlJUVnpNRnFSTXpNalBSWXpFMU1YL3RZMmZBeDFXb0kyUW96aUxtRkM2djQranJwQ09nN204T0ZuYzBpRkVRWTVrWElLSGpCQlRleG5SR1hGT0VqMGNPQ0xsTktqaGxCUlNGZU9XMGdzTXNiUFM1QlNCU2JMeVNzaGFWWm9JSzRueHlHbjRtTytRWkdCZ0E1bEFibWdCNG5HTmdaR0JnWUdSd21oRXlvU2llMytZckF6ZnpDNkFJdzJsZHp0TndXdTcvTHFZcVpoNGdsNE9CQ1NRS0FFRnFDc3dBZUp4allHUmdZRDcxUDVDQmdXa0dneHlESEZNVkExQUVCVEFCQUYycEEzUUJMQUFBQXBnQUhnQUFBQUFBVkFBQWVKeGpZR1JnWUdCaXNHVUEwU0FXQTVBRllqc3dzSU1FQUFpZUFJMEFBQUI0bkcxU3NXN2JNQlE4S1k3YkREV0NqSm1JVERZUXlGS1FTVk9BRko2Q0dEQ0M3S3JGU0VKcFVTRHBCTWxYZE9qYXBXT25vdDlRZE1ybjVBTjZrZ2c3U0N5QzVMM2ozZVBUQXdFYzRoOEM5TjhYemg0SE9HRFU0eEFmOE5YalBaekFlRHlnNXJ2SCsvaUVIeDRQOFJHL1BCN2hHSC9vQ2dZSGpQN2kyZU1BUjhFM2owT01ncDhlNytGejhOdmpBVFV2SHUvak9CeDZQTVJoS0R3ZTRUeU1MM1h6YUtxaWRHSzhuSWl6T0VuRVF1ZGt0Sml0WmYyVXFTclB4TGlVU3VrTGM3ZWhvcVZlVFU3RlErVktzWkJXbW51Wmk1bXVuYmpPVmxLYzNGUXVxOFc4bGx1MGtNVmFaY2FuMzJaUHhVYVNkaFZzd2x0cGJLVnJrVVJ4M0xNa1MrZWFkRHExUzFNMXprYTJVcEUyeFhRK3U4SWxOQm84c3NzVkNwUndFQmhqaVFuM004UklPQVFXVk9WZW94blBzSVpFalNka1VHUno3cTJ2SktzNE5DNm92dHVoaXBoYlk4WDhwM1E4a0hWMHRUZElXRTZEZTY1NWQ0ZW10NjNubXI0VldjSFhjTk01TXA0SXpMbktuVnlicmVEdGlxeDVVLzJ1MmxNNjMyZEpYL1hnL2VsdFY2MGxyenMyNGIvRm5YcXI3WlZ0VngyN25HTEtZZG1CdHBhR25LV256YUM0YTdJRnorZXM4T28vSFdLYUJ3QUFBSGljWTJCbUFJUC9XeG1NR0RBQkV3QXN4QUhzdUFIL2hiQUVqUUE9KSBmb3JtYXQoIndvZmYiKTsgZm9udC13ZWlnaHQ6bm9ybWFsO2ZvbnQtc3R5bGU6bm9ybWFsO308L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNMCAwaDEzLjIzdjEzLjIzSDB6IiBmaWxsPSIjZmZkYTAwIi8+PHRleHQgeT0iMjk0LjE0MiIgeD0iMy4xIiB4bWw6c3BhY2U9InByZXNlcnZlIiBsZXR0ZXItc3BhY2luZz0iMCIgd29yZC1zcGFjaW5nPSIwIiBmb250LXNpemU9IjEwLjU4MyIgZm9udC1mYW1pbHk9IlBlcm1hbmVudCBNYXJrZXIiPjx0c3BhbiB5PSIxMC4zNzEiIHg9IjMuMSIgZm9udC1mYW1pbHk9IlRpdGFuIE9uZSIgZmlsbD0iI2ZmZiI+JDwvdHNwYW4+PC90ZXh0Pjwvc3ZnPg==" alt="Token" class="styles__boxTokenIcon___1PttE-camelCase "draggable="false"/></div></div>`
                document.getElementById("loaderScreen").style.display = "none";
            }).catch(function() {
                console.log("FATAL ERROR OCCURRED. CONTACT THE OWNER OF THE SERVER.");
            });
    }
}

function openOptions(boxName) {
    document.getElementById("optionsMenu").style.display = "block";
    document.getElementById("optionsText").innerHTML = `What would you like to do to the ${boxName} Box?`;
    window.boxName2 = boxName;
}

function closeOptions() {
    document.getElementById("optionsMenu").style.display = "none";
}

function openCreateMenu() {
    document.getElementById("createMenu").style.display = "block";
}

function closeCreateMenu() {
    document.getElementById("createMenu").style.display = "none";
}

function openEditMenu() {
    document.getElementById("loaderScreen").style.display = "block";
    document.getElementById("editMenu").style.display = "block";
    document.getElementById("optionsMenu").style.display = "none";
    document.getElementById("editTitle").innerHTML = `${window.boxName2} Box`;
    fetch(`/worker/admin/getbox.php?box=${window.boxName2}`)
        .then(function(response) {
            return response.text();
        }).then(function(data) {
            dataSplit = data.split('~')
            var boxPrice = dataSplit[0];
            var boxColor = dataSplit[1];
            var boxBlooks = dataSplit[2];
            var boxImage = dataSplit[3];
            document.getElementById("editPrice").value = `${boxPrice}`;
            document.getElementById("editColor").value = `${boxColor}`;
            document.getElementById("editBlooks").value = `${boxBlooks}`;
            document.getElementById("editImage").value = `${boxImage}`;
            document.getElementById("loaderScreen").style.display = "none";
        })
}

function closeEditMenu() {
    document.getElementById("editMenu").style.display = "none";
}

function redirect(url) {
    window.location.href = `${url}`;
}

function createBox() {
    document.getElementById("loaderScreen").style.display = "block";
    document.getElementById("createMenu").style.display = "none";
    var boxName = document.getElementById("createName").value
    var boxPrice = document.getElementById("createPrice").value
    var boxColor = document.getElementById("createColor").value
    var boxBlooks = document.getElementById("createBlooks").value
    var boxImage = document.getElementById("createImage").value
    var postData = `name=${boxName}&color=${boxColor}&price=${boxPrice}&blooks=${boxBlooks}&image=${boxImage}`;
    $.post('/worker/admin/createbox.php', postData, function(data) {
        redirect('/admin_boxes.php');
    });
}

function editBox() {
    document.getElementById("loaderScreen").style.display = "block";
    document.getElementById("editMenu").style.display = "none";
    var boxPrice = document.getElementById("editPrice").value
    var boxColor = document.getElementById("editColor").value
    var boxBlooks = document.getElementById("editBlooks").value
    var boxImage = document.getElementById("editImage").value
    var postData = `name=${window.boxName2}&color=${boxColor}&price=${boxPrice}&blooks=${boxBlooks}&image=${boxImage}`;
    $.post('/worker/admin/editbox.php', postData, function(data) {
        redirect('/admin_boxes.php');
    });
}

function deleteBox() {
    document.getElementById("loaderScreen").style.display = "block";
    document.getElementById("optionsMenu").style.display = "none";
    var postData = `name=${window.boxName2}`;
    $.post('/worker/admin/deletebox.php', postData, function(data) {
        redirect('/admin_boxes.php');
    });
}

function setBoxChanceGlobal(boxChances) {
    if (boxChances === "") {
        return
    }
    window.boxChances = boxChances;
    console.log(window.boxChances);
}

setTimeout(() => showBoxes(), 1000);
