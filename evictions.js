const w = 960;
const h = 960;

const svg = d3.select(".viz")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

d3.csv("Eviction_Notices.csv").then(function (evictionsData) {
    d3.json("sf-neighborhoods.json").then(function (sfJson) {

        const projection = d3.geoConicEqualArea()
            .parallels([34, 40.5])
            .rotate([120, 0])
            .fitSize([w, h], sfJson);

        const path = d3.geoPath()
            .projection(projection);

        const evictions = evictionsData.map(function (eviction) {
            let coords;
            try {
                coords = projection([eviction.longitude, eviction.latitude])
            } catch (err) {
                coords = [-1, -1]
            }
            eviction.x = coords[0];
            eviction.y = coords[1];
            return eviction
        });

        console.log(evictions);

        svg.selectAll("path")
            .data(sfJson.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("stroke", "black")
            .style("fill", "none");

        svg.selectAll("circle")
            .data(evictions)
            .enter()
            .append("circle")
            .attr("cx", d => d.x)
            .attr("cy", d => d.y)
            .attr("r", 2);
    });
});
