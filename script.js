// ==========================================
// 1. DATA STRUCTURE (Centralized & Scalable)
// ==========================================
// Important Rule: To make the tree grow UP, "Me" is the root (parentId: null).
// Your parents/ancestors are assigned "Me" as their parentId to branch outward and upward.
const familyData = [
    { id: 1, name: "Me", parentId: null, status: "alive", about: "The stem of the tree. I love building the future." },
    
    // Level 2 (Parents)
    { id: 2, name: "Mom", parentId: 1, status: "migrated", about: "Moved to Canada in 2010. Loves technology." },
    { id: 3, name: "Dad", parentId: 1, status: "alive", about: "Software engineer and sci-fi enthusiast." },
    
    // Level 3 (Grandparents - Mom's side branches from Mom, Dad's side branches from Dad)
    { id: 4, name: "Grandma (M)", parentId: 2, status: "dead", about: "A wise woman who loved gardening." },
    { id: 5, name: "Grandpa (M)", parentId: 2, status: "dead", about: "Built his own house from scratch." },
    { id: 6, name: "Grandma (D)", parentId: 3, status: "alive", about: "Famous for her secret cookie recipe." },
    { id: 7, name: "Grandpa (D)", parentId: 3, status: "migrated", about: "Traveled the world twice." }
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
    if(personData.status === 'alive') { badge.style.backgroundColor = 'var(--neon-green)'; badge.style.color = '#000'; }
    if(personData.status === 'migrated') { badge.style.backgroundColor = 'var(--neon-purple)'; badge.style.color = '#fff'; }
    if(personData.status === 'dead') { badge.style.backgroundColor = 'var(--neon-grey)'; badge.style.color = '#fff'; }

    // Trigger CSS transition
    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('info-modal').classList.remove('active');
}

// Close modal if user clicks outside the content box
window.onclick = function(event) {
    const modal = document.getElementById('info-modal');
    if (event.target === modal) closeModal();
}