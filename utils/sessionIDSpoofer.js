let cookie = prompt('Enter the PHP session ID.');
document.cookie = `PHPSESSID=${cookie}`;
alert(`Your PHP session ID has been set to ${cookie}!`);
