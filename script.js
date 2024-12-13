const data = {
    name: "Root",
    children: [
        { name: "Child 1" },
        { name: "Child 2", children: [{ name: "Grandchild" }] }
    ]
};

const svg = d3.select("svg");
const width = +svg.attr("width");
const height = +svg.attr("height");

const treeLayout = d3.tree().size([width - 40, height - 40]);
const root = d3.hierarchy(data);

treeLayout(root);

const links = svg.append("g")
    .selectAll("line")
    .data(root.links())
    .enter()
    .append("line")
    .style("stroke", "#aaa")
    .attr("x1", d => d.source.x)
    .attr("y1", d => d.source.y)
    .attr("x2", d => d.target.x)
    .attr("y2", d => d.target.y);

const nodes = svg.append("g")
    .selectAll("circle")
    .data(root.descendants())
    .enter()
    .append("circle")
    .style("fill", "#69b3a2")
    .attr("r", 5)
    .attr("cx", d => d.x)
    .attr("cy", d => d.y);
