document.addEventListener('DOMContentLoaded', () => {
    // Function to initialize dummy data
    function initializeDummyData() {
        const dummyData = [
            
        ];
        localStorage.setItem('scoreboard', JSON.stringify(dummyData));
    }

    function loadScoreboard() {
        const scoreboardData = JSON.parse(localStorage.getItem('scoreboard')) || [];
        const tbody = document.querySelector('#scoreboard tbody');
        tbody.innerHTML = '';
    
        // Sort the scoreboard: First by score descending, then by time ascending
        scoreboardData.sort((a, b) => {
            if (b.score === a.score) {
                // Convert time strings to seconds for comparison
                const timeA = a.time.split(':').reduce((mins, secs) => parseInt(mins) * 60 + parseInt(secs));
                const timeB = b.time.split(':').reduce((mins, secs) => parseInt(mins) * 60 + parseInt(secs));
                return timeA - timeB; // Lower time comes first
            }
            return b.score - a.score; // Higher score comes first
        });
    
        // Populate the table with sorted data
        scoreboardData.forEach(({ name, score, time }) => {
            const row = `<tr>
                            <td>${name}</td>
                            <td>${score}</td>
                            <td>${time}</td>
                         </tr>`;
            tbody.innerHTML += row;
        });
    }
    
    

    // Initialize dummy data if not already present
    if (!localStorage.getItem('scoreboard')) {
        initializeDummyData();
    }

    // Load the scoreboard with either dummy or real data
    loadScoreboard();

    // Event listener setup (as described earlier)
    document.querySelector('input[name="mode"][value="pairs"]').addEventListener('change', () => {
        document.getElementById('student2').style.display = 'inline';
    });

    document.querySelector('input[name="mode"][value="solo"]').addEventListener('change', () => {
        document.getElementById('student2').style.display = 'none';
    });

    document.getElementById('start-button').addEventListener('click', () => {
        const name1 = document.getElementById('student1').value.trim();
        const name2 = document.getElementById('student2').value.trim();
        const mode = document.querySelector('input[name="mode"]:checked').value;

        if (name1 && (mode === 'solo' || name2)) {
            console.log('Starting session with:', name1, name2);
            localStorage.setItem("studentName",name1);
            localStorage.setItem("studentScore",100);
            localStorage.setItem("studentTime",new Date());
            
            goToMainConcepts();
        } else {
            alert('Please enter the required names.');
        }
    });
});

function goToMainConcepts() {
    window.location.href = '../mainConcepts/mainConcept.html';
}
