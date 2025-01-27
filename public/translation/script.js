
function goToSummary() {
    window.location.href = '../finalPage/summary.html';
}

function checkTranslation() {
    // קבלת הקלטים מהמשתמש
    const rnaSequence = document.getElementById("rnaInput").value.replace(/\s+/g, "").trim().toUpperCase();
    const proteinSequence = document.getElementById("proteinInput").value;
    const resultMessage = document.getElementById("resultMessage");

    // טבלת קודונים מלאה
    const codonTable = {
        // קודוני התחלה וסיום
        AUG: "Met", UAA: "Stop", UAG: "Stop", UGA: "Stop",
        // קודונים והחומצות האמיניות שלהם
        UUU: "Phe", UUC: "Phe", UUA: "Leu", UUG: "Leu",
        CUU: "Leu", CUC: "Leu", CUA: "Leu", CUG: "Leu",
        AUU: "Ile", AUC: "Ile", AUA: "Ile", GUU: "Val",
        GUC: "Val", GUA: "Val", GUG: "Val", UCU: "Ser",
        UCC: "Ser", UCA: "Ser", UCG: "Ser", CCU: "Pro",
        CCC: "Pro", CCA: "Pro", CCG: "Pro", ACU: "Thr",
        ACC: "Thr", ACA: "Thr", ACG: "Thr", GCU: "Ala",
        GCC: "Ala", GCA: "Ala", GCG: "Ala", UAU: "Tyr",
        UAC: "Tyr", CAU: "His", CAC: "His", CAA: "Gln",
        CAG: "Gln", AAU: "Asn", AAC: "Asn", AAA: "Lys",
        AAG: "Lys", GAU: "Asp", GAC: "Asp", GAA: "Glu",
        GAG: "Glu", UGU: "Cys", UGC: "Cys", UGG: "Trp",
        CGU: "Arg", CGC: "Arg", CGA: "Arg", CGG: "Arg",
        AGU: "Ser", AGC: "Ser", AGA: "Arg", AGG: "Arg",
        GGU: "Gly", GGC: "Gly", GGA: "Gly", GGG: "Gly"
    };

    // פיצול רצף ה-mRNA לקודונים בני 3 בסיסים
    const codons = rnaSequence.match(/.{1,3}/g);
    if (!codons) {
        resultMessage.innerText = "רצף ה-mRNA שהוזן אינו חוקי!";
        resultMessage.style.color = "red";
        return;
    }

    // תרגום הקודונים לחלבון
    let translatedProtein = [];
    let translationStarted = false;

    for (const codon of codons) {
        console.log(codon);
        if (!translationStarted) {
            if (codon === "AUG") {
                translationStarted = true; // התחלת התרגום בקודון התחלה
            } else {
                continue; // מתעלם מקודונים עד שמגיעים ל-AUG
            }
        }

        const aminoAcid = codonTable[codon] || "?"; // אם הקודון לא נמצא בטבלה
        if (aminoAcid === "Stop") break; // עצירה אם מגיעים לקודון סיום
        translatedProtein.push(aminoAcid);
    }

    // אם לא נמצא קודון התחלה
    if (!translationStarted) {
        resultMessage.innerText = "הרצף לא מכיל קודון התחלה (AUG), ולכן לא בוצע תרגום.";
        resultMessage.style.color = "red";
        return;
    }

    // המרת רשימת חומצות האמינו למחרוזת
    const expectedProtein = translatedProtein.join(" - ");

    // בדיקה האם התשובה נכונה
    if (proteinSequence === expectedProtein) {
        resultMessage.innerText = "תשובה נכונה! כל הכבוד!";
        resultMessage.style.color = "green";
        document.getElementById("rnaInput").disabled = true;
        document.getElementById("proteinInput").disabled = true;
    } else {
        resultMessage.innerText = `תשובה שגויה. רצף חומצות האמינו הצפוי הוא: ${expectedProtein}`;
        resultMessage.style.color = "red";
        document.getElementById("rnaInput").disabled = true;
        document.getElementById("proteinInput").disabled = true;
        localStorage.setItem("studentScore", localStorage.getItem("studentScore") - 5);
    }
}
