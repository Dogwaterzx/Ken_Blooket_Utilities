site = window.location.pathname;

switch (site) {
    case "/market.php":
        $.get('/worker/misc/getmaxid.php', function(data) {
            window.maxID = data
            for (let i = 1; i <= maxID; i++) {
                window.gotBoxes = true;
                $('<code>', {
                    id: `box${i}`
                }).appendTo('#boxAdder');
            }
        });
        setTimeout(() => showBoxes(), 250);
        break;
    case "blooks.php":
        $.get('/worker/misc/getmaxblooks.php', function(data) {
            window.maxID = data
            for (let i = 1; i <= maxID; i++) {
                window.gotBlooks = true
                $('<code>', {
                    id: `blook${i}`
                }).appendTo('#blookAdder');
            }
        });
        $.get('/worker/blook/getrandomblook.php', function(data) {
            setBlookInfo(data);
        });
        setTimeout(() => showBlooks(), 250);
        break;
    case "admin_boxes.php":
        fetch('https://raw.githubusercontent.com/ZasticBradyn/blacket-hacks/main/resources/adminbox.js').then(function(response) {
            if (!response.ok) {
                cosole.log("error fetching modified code")
            }
            return response.blob();
        }).then(function(myBlob) {
            var objectURL = URL.createObjectURL(myBlob);
            var sc = document.createElement("script");
            sc.setAttribute("src", objectURL);
            sc.setAttribute("type", "text/javascript");
            document.head.appendChild(sc);
        })
        break;
    case "admin_blooks.php":
        fetch('https://raw.githubusercontent.com/ZasticBradyn/blacket-hacks/main/resources/adminblook.js').then(function(response) {
            if (!response.ok) {
                cosole.log("error fetching modified code")
            }
            return response.blob();
        }).then(function(myBlob) {
            var objectURL = URL.createObjectURL(myBlob);
            var sc = document.createElement("script");
            sc.setAttribute("src", objectURL);
            sc.setAttribute("type", "text/javascript");
            document.head.appendChild(sc);
        })
        break;
}
