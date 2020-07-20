
ipcRenderer.on("arr:inputRegisters", (e, inputRegisters) => {
 
    var tbody = document.getElementById("inputRegisters").getElementsByTagName('tbody')[0];
    tbody.innerHTML = "";

    var tableRef = document.getElementById('inputRegisters').getElementsByTagName('tbody')[0];

    for (var i = 0; i < inputRegisters.length; i++) {

        var newRow = tableRef.insertRow();

        var newCell = newRow.insertCell(0);
        var newText = document.createTextNode(inputRegisters[i].addr);

        newCell.appendChild(newText);

        var newCell2 = newRow.insertCell(1);

        var newText2 = document.createTextNode(inputRegisters[i].value);
        newCell2.appendChild(newText2);
    }

})

ipcRenderer.on("arr:holdingRegisters", (e, holdingRegisters) => { 
 
    var tbody = document.getElementById("holdingRegisters").getElementsByTagName('tbody')[0];
    tbody.innerHTML = "";

    var tableRef = document.getElementById('holdingRegisters').getElementsByTagName('tbody')[0];

    for (var i = 0; i < holdingRegisters.length; i++) {

        var newRow = tableRef.insertRow();

        var newCell = newRow.insertCell(0);
        var newText = document.createTextNode(holdingRegisters[i].addr);

        newCell.appendChild(newText);

        var newCell2 = newRow.insertCell(1);

        var newText2 = document.createTextNode(holdingRegisters[i].value);
        newCell2.appendChild(newText2);
    }
})




