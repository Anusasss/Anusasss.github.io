function fetchTopSongs() {
    const year = document.getElementById("year").value;
    const month = document.getElementById("month").value;

    // Make a request to the backend to fetch top songs for the selected year and month
    // You can use Fetch API or XMLHttpRequest for this purpose
    // Example:
    fetch(`/top-songs?year=${year}&month=${month}`)
        .then(response => response.json())
        .then(data => {
            displayTopSongs(data);
        })
        .catch(error => console.error('Error:', error));
}

function displayTopSongs(data) {
    const topSongsDiv = document.getElementById("topSongs");
    topSongsDiv.innerHTML = ""; // Clear previous content

    const topSongsList = document.createElement("ol");
    data.forEach(song => {
        const listItem = document.createElement("li");
        listItem.textContent = `${song.rank}. ${song.title} - ${song.artist}`;
        topSongsList.appendChild(listItem);
    });
    topSongsDiv.appendChild(topSongsList);
}