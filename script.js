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

        // Export notes functionality
        document.getElementById("export-notes").addEventListener("click", function() {
            const notes = localStorage.getItem("notes") || ""; // Get notes from localStorage
            const blob = new Blob([notes], { type: 'text/plain' }); // Create a Blob
            const url = URL.createObjectURL(blob); // Create a URL for the Blob
            const a = document.createElement('a'); // Create an anchor element
            a.href = url;
            a.download = 'notes.txt'; // Specify the file name
            document.body.appendChild(a); // Append anchor to the body
            a.click(); // Trigger download
            document.body.removeChild(a); // Remove the anchor from the document
            URL.revokeObjectURL(url); // Free up memory
        });
    
        // Import notes functionality
        document.getElementById("import-notes-btn").addEventListener("click", function() {
            document.getElementById("import-notes").click(); // Trigger file input click
        });
    
        document.getElementById("import-notes").addEventListener("change", function(event) {
            const file = event.target.files[0]; // Get the selected file
            if (file) {
                const reader = new FileReader(); // Create a FileReader
                reader.onload = function(e) {
                    const notes = e.target.result; // Get the file content
                    localStorage.setItem("notes", notes); // Save it to localStorage
                    document.getElementById("notes").value = notes; // Update textarea
                    alert("Notes imported!");
                };
                reader.readAsText(file); // Read the file as text
            }
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
