document.querySelector(".schedule-form").addEventListener("submit", function(event) {
    event.preventDefault(); 


    const date = document.getElementById("date").value;
    const timeStart = document.getElementById("time-start").value;
    const timeEnd = document.getElementById("time-end").value;
    const name = document.getElementById("name").value;
    const activity = document.getElementById("activity").value;
    const place = document.getElementById("place").value;
    const type = document.getElementById("type").value;
    const notes = document.getElementById("notes").value;
    const flag = document.getElementById("flag").value;
    const availability = document.getElementById("free-busy").checked ? "Busy" : "Free";


    const table = document.getElementById("scheduleTable").getElementsByTagName("tbody")[0];
    const newRow = table.insertRow();

 
    newRow.insertCell(0).textContent = date;
    newRow.insertCell(1).textContent = timeStart;
    newRow.insertCell(2).textContent = timeEnd;
    newRow.insertCell(3).textContent = name;
    newRow.insertCell(4).textContent = activity;
    newRow.insertCell(5).textContent = place;
    newRow.insertCell(6).textContent = type;
    newRow.insertCell(7).textContent = notes;


    const flagCell = newRow.insertCell(8);
    flagCell.style.backgroundColor = flag;


    newRow.insertCell(9).textContent = availability;

 
    document.querySelector(".schedule-form").reset();
});