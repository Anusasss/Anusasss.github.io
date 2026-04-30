// ==========================================
// 1. DATA STRUCTURE (Centralized & Scalable)
// ==========================================
const familyData = [
    // --- Lygis 0 ---
    { id: 1, name: "Aš", parentId: null, status: "alive", about: "Medžio šaknys.", level: 0 },
    // Elvyros atnaujinta istorija
    {
        id: 10, name: "Elvyra", parentId: 8, status: "migrated", level: 0, about: `Elvyros istorija: gyvenimas Britanijoje nepamirštant Lietuvos

Elvyros, Silvos dukros, kelias susiklostė kiek kitaip. Jos vaikystė ir paauglystė dar prabėgo Lietuvoje, bet vos tik ji baigė dvylika klasių ir sulaukė aštuoniolikos, susikrovė daiktus ir išvažiavo pas mamą į Didžiąją Britaniją. Ten ji pasiliko ir gyvena iki šiol.

Nors Elvyra visiškai prisitaikė prie gyvenimo užsienyje, mane labiausiai nustebino tai, kaip stipriai ji palaiko lietuvybę. Ji turi didžiulę šeimą – augina net septynis vaikus. Ir nors jie visi auga britiškoje aplinkoje, Elvyra deda visas pastangas, kad jie nepamirštų savo šaknų. Visi jos vaikai lanko lietuvių mokyklėlę, kur mokosi kalbos ir tradicijų.

Negana to, kiekvienas sekmadienis jų šeimoje turi aiškią tradiciją: jie važiuoja į vietinę, pačių lietuvių įkurtą bažnyčią. Tai nėra vien maldos namai, o tikras vietos lietuvių bendruomenės centras. Čia visi susitinka, bendrauja ir palaiko ryšius. Elvyros pavyzdys puikiai rodo, kad net ir išvykus iš Lietuvos, ją galima išsaugoti ir kurti savo namuose.` },
    { id: 11, name: "Tarvydas", parentId: 9, status: "migrated", level: 0, about: "Stefos sūnus." },

    // --- Lygis 1 ---
    { id: 2, name: "Gineta", parentId: 1, status: "alive", about: "Mano mama.", level: 1, spouseId: 3 },
    { id: 3, name: "Arūnas", parentId: 1, status: "alive", about: "Mano tėtis.", level: 1, spouseId: 2 },
    // Silvos atnaujinta istorija
    {
        id: 8, name: "Silva", parentId: 6, status: "migrated", level: 1, about: `Silvos kelias: sunkus sprendimas dėl šeimos

Silvos istorija prasideda Lietuvoje, kur ji praleido didžiąją dalį savo gyvenimo ir užaugino dukrą Elvyrą. Tačiau viską pakeitė 1990-ieji. Nors nepriklausomybės atkūrimas atnešė daug džiaugsmo, kasdienybė buvo visai kitokia. Pasikeitus sistemai, atsirado didžiulis trūkumas ir neapibrėžtumas, todėl pasidarė tiesiog nebeįmanoma patogiai gyventi ar normaliai užsidirbti. Matydama, kad greito ekonominio pagerėjimo nebus, Silva priėmė labai sunkų sprendimą – palikti Lietuvą ir išvykti į Didžiąją Britaniją.

Tai nebuvo kažkoks lengvas nuotykis. Silva išvažiavo į visišką nežinomybę vien tam, kad sukurtų tvirtesnį finansinį pagrindą ir užtikrintų, jog jos dukra neturėtų vargti. Galima sakyti, kad ji buvo pirmoji mūsų giminėje, pasiryžusi tokiam žingsniui ir sunkiu darbu nutiesusi kelią geresniam gyvenimui.` },
    { id: 9, name: "Stefa", parentId: 6, status: "migrated", level: 1, about: "Nijolės sesuo." },
    { id: 18, name: "Virginija", parentId: 17, status: "alive", level: 1, about: "Arūno sesuo." },

    // --- Lygis 2 ---
    { id: 4, name: "Nijolė", parentId: 2, status: "alive", about: "Ginetos mama.", level: 2, spouseId: 5 },
    { id: 5, name: "Klemensas", parentId: 2, status: "alive", about: "Ginetos tėtis.", level: 2, spouseId: 4 },
    { id: 16, name: "Antanina", parentId: 3, status: "dead", about: "Arūno mama.", level: 2, spouseId: 17 },
    { id: 17, name: "Feliksas", parentId: 3, status: "dead", about: "Arūno tėtis.", level: 2, spouseId: 16 },

    // --- Lygis 3 ---
    { id: 6, name: "Ona", parentId: 4, status: "dead", about: "Nijolės mama.", level: 3, spouseId: 7 },
    { id: 7, name: "Steponas", parentId: 4, status: "dead", about: "Nijolės tėtis.", level: 3, spouseId: 6 },
    { id: 19, name: "Magdeliana", parentId: 16, status: "dead", about: "Antaninos mama.", level: 3, spouseId: 20 },
    { id: 20, name: "Jonas", parentId: 16, status: "dead", about: "Antaninos tėtis.", level: 3, spouseId: 19 },
    { id: 21, name: "Ona", parentId: 17, status: "dead", about: "Felikso mama.", level: 3, spouseId: 22 },
    { id: 22, name: "Zigmas", parentId: 17, status: "dead", about: "Felikso tėtis.", level: 3, spouseId: 21 },

    // --- Lygis 4 ---
    { id: 12, name: "Antanas", parentId: 6, status: "dead", about: "Onos tėtis.", level: 4, spouseId: 13 },
    { id: 13, name: "Ona", parentId: 6, status: "dead", about: "Onos mama.", level: 4, spouseId: 12 },
    { id: 14, name: "Julė", parentId: 7, status: "dead", about: "Stepono mama.", level: 4, spouseId: 15 },
    { id: 15, name: "Aleksas", parentId: 7, status: "dead", about: "Stepono tėtis.", level: 4, spouseId: 14 }
];

// ==========================================
// 2. ADVANCED SVG RENDERING & ZOOM LOGIC
// ==========================================
const width = window.innerWidth;
const height = window.innerHeight;

// Create standard D3 hierarchy
const root = d3.stratify()
    .id(d => d.id)
    .parentId(d => d.parentId)
    (familyData);

root.sort((a, b) => b.data.id - a.data.id);

const treeLayout = d3.tree().size([width * 2, height]); // Give it wide horizontal space
treeLayout(root);

// Setup SVG with Zoom & Pan capabilities
const svg = d3.select("#tree-container")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%");

// This group holds everything and reacts to the zoom/drag
const zoomGroup = svg.append("g");

// Initialize D3 Zoom
const zoom = d3.zoom()
    .scaleExtent([0.2, 3]) // Users can zoom out to 20% or in to 300%
    .on("zoom", (event) => {
        zoomGroup.attr("transform", event.transform);
    });

svg.call(zoom);

function drawTree() {
    // Math to center the tree initially
    const xOffset = (width / 2) - root.x;
    const bottomYOffset = height - 150;
    const ySpacing = 160;

    const getSpouse = (node) => {
        if (!node.data.spouseId) return null;
        return root.descendants().find(n => n.data.id === node.data.spouseId);
    };

    // 1. Draw Marriage Lines
    const couples = [];
    const processedSpouses = new Set();

    root.descendants().forEach(node => {
        if (node.data.spouseId && !processedSpouses.has(node.data.id)) {
            const spouse = getSpouse(node);
            if (spouse) {
                couples.push({ a: node, b: spouse });
                processedSpouses.add(node.data.id);
                processedSpouses.add(spouse.data.id);
            }
        }
    });

    zoomGroup.selectAll(".marriage-link")
        .data(couples).enter().append("path")
        .attr("class", "link marriage-link")
        .attr("d", d => {
            const y = bottomYOffset - (d.a.data.level * ySpacing);
            return `M ${d.a.x},${y} L ${d.b.x},${y}`;
        })
        .attr("transform", `translate(${xOffset}, 0)`);

    // 2. Draw Bloodline Lines
    zoomGroup.selectAll(".blood-link")
        .data(root.links()).enter().append("path")
        .attr("class", "link blood-link")
        .attr("d", d => {
            let startX = d.source.x;
            let startY = bottomYOffset - (d.source.data.level * ySpacing);
            let endX = d.target.x;
            let endY = bottomYOffset - (d.target.data.level * ySpacing);

            if (d.source.data.level > d.target.data.level) {
                const spouse = getSpouse(d.source);
                if (spouse) startX = (startX + spouse.x) / 2;
            } else if (d.source.data.level < d.target.data.level) {
                const spouse = getSpouse(d.target);
                if (spouse) endX = (endX + spouse.x) / 2;
            }

            return `M ${startX},${startY} C ${startX},${(startY + endY) / 2} ${endX},${(startY + endY) / 2} ${endX},${endY}`;
        })
        .attr("transform", `translate(${xOffset}, 0)`)
        // Line Drawing Animation
        .attr("stroke-dasharray", function () { return this.getTotalLength(); })
        .attr("stroke-dashoffset", function () { return this.getTotalLength(); })
        .transition().duration(1500).ease(d3.easeCubicOut)
        .attr("stroke-dashoffset", 0);

    // 3. Draw Nodes (SVG Groups containing Circle + Text)
    const nodes = zoomGroup.selectAll(".node-group")
        .data(root.descendants()).enter().append("g")
        .attr("class", "node-group")
        .attr("transform", d => `translate(${d.x + xOffset}, ${bottomYOffset - (d.data.level * ySpacing)})`)
        .on("click", (event, d) => openModal(d.data));

    // Add SVG Circles
    nodes.append("circle")
        .attr("class", "node-circle")
        .attr("r", 22)
        .attr("fill", d => {
            if (d.data.status === 'alive') return 'var(--neon-green)';
            if (d.data.status === 'migrated') return 'var(--neon-purple)';
            return 'var(--neon-grey)';
        })
        .style("filter", d => {
            if (d.data.status === 'alive') return 'drop-shadow(0 0 12px var(--neon-green))';
            if (d.data.status === 'migrated') return 'drop-shadow(0 0 12px var(--neon-purple))';
            return 'drop-shadow(0 0 8px var(--neon-grey))';
        })
        // Pop-in Animation staggered by level
        .attr("transform", "scale(0)")
        .transition().duration(600).ease(d3.easeBackOut.overshoot(1.7))
        .delay(d => d.data.level * 200) // Delay based on generation level
        .attr("transform", "scale(1)");

    // Add Name Labels
    nodes.append("text")
        .attr("class", "node-text")
        .attr("y", 45)
        .text(d => d.data.name)
        // Fade-in animation
        .attr("opacity", 0)
        .transition().duration(800)
        .delay(d => (d.data.level * 200) + 200)
        .attr("opacity", 1);
}

drawTree();

// Center the camera on "Aš" (Level 0) on load
const initialTransform = d3.zoomIdentity.translate(0, 50).scale(1);
svg.call(zoom.transform, initialTransform);

// ==========================================
// 3. INTERACTIVITY (Modal Logic)
// ==========================================
function openModal(personData) {
    const modal = document.getElementById('info-modal');
    const badge = document.getElementById('modal-status-badge');

    // Populate text
    document.getElementById('modal-name').innerText = personData.name;

    // Fallback text just in case someone doesn't have an 'about' section written yet
    document.getElementById('modal-about').innerText = personData.about || "Informacija ruošiama...";

    // Translate the status for the badge display
    if (personData.status === 'alive') badge.innerText = "Gyvas";
    if (personData.status === 'migrated') badge.innerText = "Emigravęs";
    if (personData.status === 'dead') badge.innerText = "Miręs";

    // Dynamically color the badge with minimalist pastel colors
    if (personData.status === 'alive') {
        badge.style.backgroundColor = 'rgba(52, 211, 153, 0.15)';
        badge.style.color = 'var(--accent-alive)';
        badge.style.border = '1px solid var(--accent-alive)';
    }
    if (personData.status === 'migrated') {
        badge.style.backgroundColor = 'rgba(129, 140, 248, 0.15)';
        badge.style.color = 'var(--accent-migrated)';
        badge.style.border = '1px solid var(--accent-migrated)';
    }
    if (personData.status === 'dead') {
        badge.style.backgroundColor = 'rgba(100, 116, 139, 0.15)';
        badge.style.color = 'var(--accent-dead)';
        badge.style.border = '1px solid var(--accent-dead)';
    }

    // Trigger the CSS fade-in transition
    modal.classList.add('active');
}

// ==========================================
// 4. MODAL CLOSING & INTRO LOGIC
// ==========================================

// Closes the individual person's info window
function closeModal() {
    document.getElementById('info-modal').classList.remove('active');
}

// Opens the main Giminės Istorija window
function openIntroModal() {
    document.getElementById('intro-modal').classList.add('active');
}

// Closes the main Giminės Istorija window
function closeIntroModal() {
    document.getElementById('intro-modal').classList.remove('active');
}

// Closes windows if the user clicks on the blurred background outside the box
window.onclick = function (event) {
    const infoModal = document.getElementById('info-modal');
    const introModal = document.getElementById('intro-modal');

    if (event.target === infoModal) {
        closeModal();
    }
    if (event.target === introModal) {
        closeIntroModal();
    }
}

// Automatically open the Intro Modal when the website loads
window.onload = function () {
    // 1.2 second delay allows the tree animation to play first
    setTimeout(() => {
        openIntroModal();
    }, 1200);
};