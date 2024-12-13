const data = {
    name: "Fly",
    image: "images/Fly.png",
    children: [
        {
            name: "Delta-Fighter",
            image: "images/Delta-Fighter.png",
            children: [
                { name: "Pulse-Fighter", image: "images/Pulse-Fighter.png" },
                { name: "Side-Fighter", image: "images/Side-Fighter.png" }
            ]
        },
        {
            name: "Trident",
            image: "images/Trident.png",
            children: [
                { name: "Shadow X-1", image: "images/Shadow X-1.png" },
                { name: "Y-Defender", image: "images/Y-Defender.png" }
            ]
        }
    ]
};

// Select SVG container and set dimensions
const svg = d3.select("svg");
const width = +svg.attr("width");
const height = +svg.attr("height");

// Create tree layout and define dimensions
const treeLayout = d3.tree().size([width, height - 100]);
const root = d3.hierarchy(data);

// Compute positions for nodes and links
treeLayout(root);

// Reverse y-coordinates to make the root at the top
root.descendants().forEach(d => {
    d.y = height - d.y; // Flip the y-coordinate
});

// Draw links
svg.append("g")
    .selectAll("path")
    .data(root.links())
    .enter()
    .append("path")
    .attr("class", "link")
    .attr("d", d3.linkVertical()
        .x(d => d.x)
        .y(d => d.y));

// Draw nodes with images
const nodes = svg.append("g")
    .selectAll("g")
    .data(root.descendants())
    .enter()
    .append("g")
    .attr("transform", d => `translate(${d.x},${d.y})`)
    .attr("class", "node");

nodes.append("image")
    .attr("xlink:href", d => d.data.image) // Use image path from data
    .attr("width", 40)
    .attr("height", 40)
    .attr("x", -20)
    .attr("y", -20);

nodes.append("text")
    .attr("dy", 50)
    .attr("class", "label")
    .text(d => d.data.name);
