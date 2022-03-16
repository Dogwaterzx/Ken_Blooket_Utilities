function error() {
    if (confirm("an error has ocured, would you like to report this on github?")) {
        window.open("https://github.com/Dogwaterzx/Ken_Blooket_Utilities/issues")
    }
    console.error("an error has occured")
}
