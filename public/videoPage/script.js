function submitAnswers() {
    const radioButtons = document.querySelectorAll('input[type="radio"]');

    // Disable each radio button
    radioButtons.forEach((radio) => {
        radio.disabled = true;
    });
    const answers = document.querySelectorAll('.answer');
    answers.forEach(a => {
        a.parentElement.style.color = "green";
        a.parentElement.style.fontWeight = "bold";
    });

    document.getElementById("next").style.display = "block";
    const questions = document.querySelectorAll('.question');
    let score = 0;

    questions.forEach((question, index) => {
        const selectedOption = question.querySelector('input[type="radio"]:checked');
        const correctAnswer = question.querySelector('input.answer');

        let feedback = question.querySelector('.feedback'); // Check if feedback already exists

        // If feedback already exists, clear it
        if (!feedback) {
            feedback = document.createElement('div'); // Create feedback if not exists
            feedback.className = 'feedback'; // Add feedback class for styling
            question.appendChild(feedback); // Append feedback to the question
        }

        // Update feedback and styles
        if (selectedOption) {
            if (selectedOption === correctAnswer) {
                score++; // Increment score
                feedback.textContent = "תשובה נכונה!"; // Correct answer feedback
                feedback.style.color = "green";
                question.style.border = "2px solid green"; // Green border for correct
            } else {
                feedback.textContent = "תשובה לא נכונה."; // Incorrect answer feedback
                feedback.style.color = "red";
                question.style.border = "2px solid red"; // Red border for incorrect
            }
        } else {
            feedback.textContent = "לא בחרת תשובה."; // No answer feedback
            feedback.style.color = "orange";
            question.style.border = "2px solid orange"; // Orange border for no answer
        }
    });

    // Display final score
    document.getElementById('feedback').innerText = `ענית.ה נכון על: ${score}/${questions.length}`;
    document.getElementById('feedback').style.fontWeight = "bold";
    document.getElementById('feedback').style.marginTop = "15px";
    localStorage.setItem("studentScore", localStorage.getItem("studentScore") - (4-score) * 5);
}

function goToTranscription() {
    window.location.href = '../transcription/transcription.html';
}