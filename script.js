// ==========================================
// 1. DATA STRUCTURE (Centralized & Scalable)
// ==========================================
// ==========================================
// 1. DATA STRUCTURE (Centralized & Scalable)
// ==========================================
const familyData = [
    // --- Lygis 0: Tu ir pusbroliai/pusseserės ---
    { id: 1, name: "Aš", parentId: null, status: "alive", about: "Medžio šaknys.", level: 0 },
    { id: 10, name: "Elvyra", parentId: 8, status: "migrated", about: "Silvos dukra.", level: 0 },
    { id: 11, name: "Tarvydas", parentId: 9, status: "migrated", about: "Stefos sūnus.", level: 0 },

    // --- Lygis 1: Tėvai, tetos ir dėdės ---
    { id: 2, name: "Gineta", parentId: 1, status: "alive", about: "Mano mama.", level: 1 },
    { id: 3, name: "Arūnas", parentId: 1, status: "alive", about: "Mano tėtis.", level: 1 },
    { id: 8, name: "Silva", parentId: 6, status: "migrated", about: "Nijolės sesuo.", level: 1 },
    { id: 9, name: "Stefa", parentId: 6, status: "migrated", about: "Nijolės sesuo.", level: 1 },
    { id: 18, name: "Virginija", parentId: 16, status: "alive", about: "Arūno sesuo.", level: 1 },

    // --- Lygis 2: Seneliai ---
    { id: 4, name: "Nijolė", parentId: 2, status: "alive", about: "Ginetos mama.", level: 2 },
    { id: 5, name: "Klemensas", parentId: 2, status: "alive", about: "Ginetos tėtis.", level: 2 },
    { id: 16, name: "Antanina", parentId: 3, status: "dead", about: "Arūno mama.", level: 2 },
    { id: 17, name: "Feliksas", parentId: 3, status: "dead", about: "Arūno tėtis.", level: 2 },

    // --- Lygis 3: Proseneliai ---
    { id: 6, name: "Ona", parentId: 4, status: "dead", about: "Nijolės mama.", level: 3 },
    { id: 7, name: "Steponas", parentId: 4, status: "dead", about: "Nijolės tėtis.", level: 3 },
    { id: 19, name: "Magdeliana", parentId: 16, status: "dead", about: "Antaninos mama.", level: 3 },
    { id: 20, name: "Jonas", parentId: 16, status: "dead", about: "Antaninos tėtis.", level: 3 },
    { id: 21, name: "Ona", parentId: 17, status: "dead", about: "Felikso mama.", level: 3 },
    { id: 22, name: "Zigmas", parentId: 17, status: "dead", about: "Felikso tėtis.", level: 3 },

    // --- Lygis 4: Proproseneliai ---
    { id: 12, name: "Antanas", parentId: 6, status: "dead", about: "Onos tėtis.", level: 4 },
    { id: 13, name: "Ona", parentId: 6, status: "dead", about: "Onos mama.", level: 4 },
    { id: 14, name: "Julė", parentId: 7, status: "dead", about: "Stepono mama.", level: 4 },
    { id: 15, name: "Aleksas", parentId: 7, status: "dead", about: "Stepono tėtis.", level: 4 }
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
    const xOffset = 100;
    const bottomYOffset = height - 100;
    const ySpacing = 130; // Vertical distance between generations

    // Draw Links (The connecting lines)
    svg.selectAll(".link")
        .data(root.links())
        .enter()
        .append("path")
        .attr("class", "link")
        .attr("d", d => {
            // FORCE vertical positioning based on our strict 'level' property
            const sourceY = bottomYOffset - (d.source.data.level * ySpacing);
            const targetY = bottomYOffset - (d.target.data.level * ySpacing);
            const sourceX = d.source.x + xOffset;
            const targetX = d.target.x + xOffset;

            // Draw a smooth bezier curve. It will naturally loop downward 
            // for descendants like aunts/cousins branching off ancestors!
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
        .attr("data-status", d => d.data.status)
        .style("left", d => `${d.x + xOffset}px`)
        // FORCE the blob's Y position to match the exact generation level
        .style("top", d => `${bottomYOffset - (d.data.level * ySpacing)}px`)
        .on("click", (event, d) => openModal(d.data));

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