function submitAnswers() {
    // מקבל את הערכים שהוזנו
    const dnaInput = document.getElementById("dnaInput").value.toUpperCase();
    const mrnaInput = document.getElementById("mrnaInput").value.toUpperCase();
    document.getElementById("dnaInput").disabled = true;
    document.getElementById("mrnaInput").disabled = true;
    
    // מבצע את תהליך השעתוק
    const transcriptionMap = {
        A: "U",
        T: "A",
        G: "C",
        C: "G"
    };

    let expectedMRNA = "";
    for (let i = 0; i < dnaInput.length; i++) {
        const dnaBase = dnaInput[i];
        if (transcriptionMap[dnaBase]) {
            expectedMRNA += transcriptionMap[dnaBase];
        } else {
            document.getElementById("result").innerText = "הוזן רצף DNA לא תקין.";
            document.getElementById("dnaInput").disabled = false;
            document.getElementById("mrnaInput").disabled = false ;
            return;
        }
    }

    // בדיקת התאמה בין התוצאה הצפויה למה שהוזן
    if (expectedMRNA === mrnaInput) {
        document.getElementById("result").innerText = "מצוין! השעתוק שביצעת נכון.";
        document.getElementById("result").style.color = "green";
    } else {
        document.getElementById("result").innerText = `השעתוק שגוי. הרצף הצפוי: ${expectedMRNA}`;
        document.getElementById("result").style.color = "red";
        localStorage.setItem("studentScore",localStorage.getItem("studentScore")-5);
    }
}

function goToTranslation() {
    window.location.href = '../translation/translation.html';
}



