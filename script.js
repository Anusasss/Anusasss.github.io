document.addEventListener("DOMContentLoaded", function() {
    // Check if user is already logged in
    if (localStorage.getItem("isLoggedIn") === "true") {
        showMainContent();
    }

    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('remember').checked;
        const errorMessage = document.getElementById('error-message');

        // Check credentials
        if (username === 'Anusass' && password === 'Papanusas') {
            // If "Remember Login" is checked, store login status
            if (rememberMe) {
                localStorage.setItem("isLoggedIn", "true");
            }
            // Hide login and show the main content
            showMainContent();
        } else {
            // Display error message
            errorMessage.textContent = 'Invalid username or password.';
        }
    });

    // Load saved notes only after login
    document.getElementById("save-notes").addEventListener("click", function() {
        const notes = document.getElementById("notes").value;
        localStorage.setItem("notes", notes);
        alert("Notes saved!");
    });

    document.getElementById("clear-notes").addEventListener("click", function() {
        localStorage.removeItem("notes");
        document.getElementById("notes").value = "";
        alert("Notes cleared!");
    });

    // Forget Me functionality
    document.getElementById("forget-me").addEventListener("click", function() {
        localStorage.removeItem("isLoggedIn");
        alert("Your login information has been cleared.");
        // Optionally, reload the page to show the login form again
        location.reload();
    });
});

// Function to show the main content and hide login form
function showMainContent() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
    
    // Show notebook area and load saved notes
    const savedNotes = localStorage.getItem("notes");
    const notebookArea = document.getElementById("notebook-area");
    notebookArea.style.display = 'block'; // Show notebook area

    if (savedNotes) {
        document.getElementById("notes").value = savedNotes;
    }
}
