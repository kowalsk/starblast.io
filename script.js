const data = {
    name: "Tier 0 Ship",
    children: [
        {
            name: "Tier 1 Ship 1",
            children: [
                {
                    name: "Tier 2 Ship 1",
                    children: [
                        { name: "Tier 3 Ship 1" },
                        { name: "Tier 3 Ship 2" }
                    ]
                },
                {
                    name: "Tier 2 Ship 2",
                    children: [
                        { name: "Tier 3 Ship 3" },
                        { name: "Tier 3 Ship 4" }
                    ]
                }
            ]
        },
        {
            name: "Tier 1 Ship 2",
            children: [
                {
                    name: "Tier 2 Ship 3",
                    children: [
                        { name: "Tier 3 Ship 5" },
                        { name: "Tier 3 Ship 6" }
                    ]
                },
                {
                    name: "Tier 2 Ship 4",
                    children: [
                        { name: "Tier 3 Ship 7" },
                        { name: "Tier 3 Ship 8" }
                    ]
                }
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

// Convert hierarchical data into a structure D3 can use
const root = d3.hierarchy(data);

// Compute positions for nodes and links
treeLayout(root);

// Reverse y-coordinates to make the root at the top
root.descendants().forEach(d => {
    d.y = height - d.y; // Flip the y-coordinate
});

// Draw links (lines connecting nodes)
svg.append("g")
    .selectAll("path")
    .data(root.links())
    .enter()
    .append("path")
    .attr("class", "link")
    .attr("d", d3.linkVertical()
        .x(d => d.x)
        .y(d => d.y));

// Draw nodes (circles)
const nodes = svg.append("g")
    .selectAll("g")
    .data(root.descendants())
    .enter()
    .append("g")
    .attr("transform", d => `translate(${d.x},${d.y})`)
    .attr("class", "node");

nodes.append("circle")
    .attr("r", 8);

nodes.append("text")
    .attr("dy", -15)
    .attr("class", "label")
    .text(d => d.data.name);
