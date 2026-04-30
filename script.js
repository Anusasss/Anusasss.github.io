// ==========================================
// 1. DATA STRUCTURE (Centralized & Scalable)
// ==========================================
const familyData = [
    // --- Lygis 1: Tu ---
    { id: 1, name: "Aš", parentId: null, status: "alive", about: "Medžio šaknys." },

    // --- Lygis 2: Tėvai ---
    { id: 2, name: "Gineta", parentId: 1, status: "alive", about: "Mano mama." },
    { id: 3, name: "Arūnas", parentId: 1, status: "alive", about: "Mano tėtis." },

    // ==========================================
    // --- GINETOS PUSĖ ---
    // ==========================================

    // Ginetos tėvai
    { id: 4, name: "Nijolė", parentId: 2, status: "alive", about: "Ginetos mama." },
    { id: 5, name: "Klemensas", parentId: 2, status: "alive", about: "Ginetos tėtis." },

    // Nijolės tėvai
    { id: 6, name: "Ona", parentId: 4, status: "dead", about: "Nijolės mama." },
    { id: 7, name: "Steponas", parentId: 4, status: "dead", about: "Nijolės tėtis." },

    // Nijolės seserys (Branching from their mom, Ona)
    { id: 8, name: "Silva", parentId: 6, status: "migrated", about: "Nijolės sesuo." },
    { id: 9, name: "Stefa", parentId: 6, status: "migrated", about: "Nijolės sesuo." },

    // Silvos ir Stefos vaikai (Cousins)
    { id: 10, name: "Elvyra", parentId: 8, status: "migrated", about: "Silvos dukra." },
    { id: 11, name: "Tarvydas", parentId: 9, status: "migrated", about: "Stefos sūnus." },

    // Onos (Nijolės mamos) tėvai
    { id: 12, name: "Antanas", parentId: 6, status: "dead", about: "Onos tėtis." },
    { id: 13, name: "Ona", parentId: 6, status: "dead", about: "Onos mama." },

    // Stepono (Nijolės tėčio) tėvai
    { id: 14, name: "Julė", parentId: 7, status: "dead", about: "Stepono mama." },
    { id: 15, name: "Aleksas", parentId: 7, status: "dead", about: "Stepono tėtis." },

    // ==========================================
    // --- ARŪNO PUSĖ ---
    // ==========================================

    // Arūno tėvai
    { id: 16, name: "Antanina", parentId: 3, status: "dead", about: "Arūno mama." },
    { id: 17, name: "Feliksas", parentId: 3, status: "dead", about: "Arūno tėtis." },

    // Arūno sesuo (Branching from her mom, Antanina)
    { id: 18, name: "Virginija", parentId: 16, status: "alive", about: "Arūno sesuo." },

    // Antaninos tėvai
    { id: 19, name: "Magdeliana", parentId: 16, status: "dead", about: "Antaninos mama." },
    { id: 20, name: "Jonas", parentId: 16, status: "dead", about: "Antaninos tėtis." },

    // Felikso tėvai
    { id: 21, name: "Ona", parentId: 17, status: "dead", about: "Felikso mama." },
    { id: 22, name: "Zigmas", parentId: 17, status: "dead", about: "Felikso tėtis." }
];

// ==========================================
// 2. TREE RENDERING LOGIC
// ==========================================
const container = document.getElementById('tree-container');
const width = window.innerWidth;
const height = window.innerHeight;

// Create SVG for lines
const svg = d3.select("#tree-container").append("svg");

// D3 Stratify converts our flat array into a hierarchical tree format
const root = d3.stratify()
    .id(d => d.id)
    .parentId(d => d.parentId)
    (familyData);

// Set up the D3 Tree Layout
// We leave margins so nodes don't clip off the edges of the screen
const treeLayout = d3.tree().size([width - 200, height - 200]);
treeLayout(root);

// Function to draw the tree
function drawTree() {
    // Math to center the tree vertically and horizontally
    const xOffset = 100; // Left margin
    // Invert the Y axis so the root (Me) is at the bottom!
    const bottomYOffset = height - 100;

    // Draw Links (The connecting lines)
    svg.selectAll(".link")
        .data(root.links())
        .enter()
        .append("path")
        .attr("class", "link")
        .attr("d", d => {
            // Calculate inverted Y coordinates
            const sourceY = bottomYOffset - d.source.y;
            const targetY = bottomYOffset - d.target.y;
            const sourceX = d.source.x + xOffset;
            const targetX = d.target.x + xOffset;

            // Draw a smooth cubic bezier curve between nodes
            return `M ${sourceX},${sourceY} 
                    C ${sourceX},${(sourceY + targetY) / 2} 
                      ${targetX},${(sourceY + targetY) / 2} 
                      ${targetX},${targetY}`;
        });

    // Draw Nodes (The glowing HTML blobs)
    const nodes = d3.select("#tree-container")
        .selectAll(".blob")
        .data(root.descendants())
        .enter()
        .append("div")
        .attr("class", "blob")
        .attr("data-status", d => d.data.status) // Injects the status for CSS styling
        .style("left", d => `${d.x + xOffset}px`)
        .style("top", d => `${bottomYOffset - d.y}px`)
        .on("click", (event, d) => openModal(d.data)); // Add click listener

    // Add Name Labels
    nodes.append("div")
        .attr("class", "blob-label")
        .text(d => d.data.name);
}

// Initialize tree drawing
drawTree();

// ==========================================
// 3. INTERACTIVITY (Modal Logic)
// ==========================================
function openModal(personData) {
    const modal = document.getElementById('info-modal');
    const badge = document.getElementById('modal-status-badge');

    // Populate text
    document.getElementById('modal-name').innerText = personData.name;
    document.getElementById('modal-about').innerText = personData.about;
    badge.innerText = personData.status;

    // Dynamically color the badge based on status
    if (personData.status === 'alive') { badge.style.backgroundColor = 'var(--neon-green)'; badge.style.color = '#000'; }
    if (personData.status === 'migrated') { badge.style.backgroundColor = 'var(--neon-purple)'; badge.style.color = '#fff'; }
    if (personData.status === 'dead') { badge.style.backgroundColor = 'var(--neon-grey)'; badge.style.color = '#fff'; }

    // Trigger CSS transition
    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('info-modal').classList.remove('active');
}

// Close modal if user clicks outside the content box
window.onclick = function (event) {
    const modal = document.getElementById('info-modal');
    if (event.target === modal) closeModal();
}