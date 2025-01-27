function dateDifferenceInMinutesAndSeconds(date1, date2) {
    // Parse the dates and get the difference in milliseconds
    const diffInMs = Math.abs(new Date(date2) - new Date(date1));
    
    // Convert milliseconds to total seconds
    const totalSeconds = Math.floor(diffInMs / 1000);

    // Calculate minutes and seconds
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    // Format the result as MM:SS
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}
function goToScoreBoard(){
    let endTime = new Date();
    let diff = dateDifferenceInMinutesAndSeconds(localStorage.getItem("studentTime"),endTime);
    let updatedScoreboard = JSON.parse(localStorage.getItem("scoreboard")) || [];
    console.log(updatedScoreboard);
    updatedScoreboard.push({name: localStorage.getItem("studentName"), score: localStorage.getItem("studentScore"), time: diff });
    localStorage.setItem("scoreboard",JSON.stringify(updatedScoreboard));
    window.location.href ='../../index.html';
}

document.addEventListener("DOMContentLoaded", () => {
    const dragItems = document.querySelectorAll(".drag-item");
    const dropZones = document.querySelectorAll(".drop-zone");
    const feedback = document.getElementById("feedback");

    dragItems.forEach(item => {
        item.addEventListener("dragstart", dragStart);
    });

    dropZones.forEach(zone => {
        zone.addEventListener("dragover", dragOver);
        zone.addEventListener("drop", dropItem);
    });

    function dragStart(event) {
        event.dataTransfer.setData("text", event.target.dataset.term);
    }

    function dragOver(event) {
        event.preventDefault();
    }

    function dropItem(event) {
        event.preventDefault();
        const droppedTerm = event.dataTransfer.getData("text");
        const correctTerm = event.target.dataset.match;

        if (droppedTerm === correctTerm) {
            event.target.innerText = droppedTerm;
            event.target.style.backgroundColor = "#d4edda";
            event.target.style.borderColor = "#28a745";
            checkCompletion();
        } else {
            feedback.innerText = "ההתאמה שגויה, נסה שוב!";
            feedback.style.color = "red";
        }
    }

    function checkCompletion() {
        const filledZones = [...dropZones].filter(zone => zone.innerText !== "");
        if (filledZones.length === dropZones.length) {
            feedback.innerText = "כל הכבוד! השלמת את כל ההתאמות בהצלחה!";
            feedback.style.color = "green";
            localStorage.setItem("studentScore", parseInt(localStorage.getItem("studentScore")) + 10);
        }
    }
});
