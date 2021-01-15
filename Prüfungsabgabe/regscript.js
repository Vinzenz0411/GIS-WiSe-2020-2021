"use strict";
var Pruefungsabgabe;
(function (Pruefungsabgabe) {
    let checkformresponse = document.getElementById("checkformresponse");
    let savereserve = document.getElementById("savereservieren");
    let form = document.getElementById("form");
    let formstring = new URLSearchParams(sessionStorage.getItem("data"));
    savereserve.addEventListener("click", function callcheck() { checkForm(2, formstring); });
    function checkForm(_formSize, _formstring) {
        let formfilled = 0;
        let formvalues = new FormData(form);
        for (let entry of formvalues.values()) {
            if (entry != "") {
                formfilled++;
            }
        }
        if (formfilled < _formSize) {
            checkformresponse.innerText = "Bitte füllen Sie das Formular vollständig aus";
        } //Form ausgefüllt?
        else {
            send(_formstring);
        }
        async function send(_data) {
            let formdata = new FormData(form);
            let formstring = new URLSearchParams(formdata);
            formstring.append("_id", "user");
            for (let entry of _data.values()) {
                formstring.append("_id", entry);
            }
            //Senden und fetchen der Antwort
            let response = await fetch("https://pruefungsabgabe.herokuapp.com/", {
                method: "POST",
                body: formstring
            });
            let data = await response.text();
            if (data == "Erfolg") {
                refreshData();
            }
        }
    }
    function refreshData() {
        sessionStorage.clear();
        window.open("/Prüfungsabgabe/AStA_Verleih.html", "_self");
    }
})(Pruefungsabgabe || (Pruefungsabgabe = {}));
//# sourceMappingURL=regscript.js.map