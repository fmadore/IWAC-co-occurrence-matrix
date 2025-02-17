import { config } from './config.js';

export const dataProcessor = {
    createAdjacencyMatrix(nodes, links) {
        const matrix = Array(nodes.length).fill().map(() => Array(nodes.length).fill(0));
        links.forEach(link => {
            matrix[link.source][link.target] = link.value;
        });
        return matrix;
    },

    calculateScales(links) {
        const maxValue = d3.max(links, d => d.value);
        const nonZeroValues = links.map(d => d.value).filter(v => v > 0);
        const quartiles = {
            q1: d3.quantile(nonZeroValues, 0.25),
            q2: d3.quantile(nonZeroValues, 0.5),
            q3: d3.quantile(nonZeroValues, 0.75)
        };

        // Use our color system's opacity levels for better visual consistency
        const colorScale = d3.scaleQuantile()
            .domain([0, quartiles.q1, quartiles.q2, quartiles.q3, maxValue])
            .range([
                config.colors.filled(Number(getComputedStyle(document.documentElement).getPropertyValue('--opacity-faint'))),
                config.colors.filled(Number(getComputedStyle(document.documentElement).getPropertyValue('--opacity-light'))),
                config.colors.filled(Number(getComputedStyle(document.documentElement).getPropertyValue('--opacity-medium'))),
                config.colors.filled(Number(getComputedStyle(document.documentElement).getPropertyValue('--opacity-default'))),
                config.colors.filled(Number(getComputedStyle(document.documentElement).getPropertyValue('--opacity-full')))
            ]);

        return { maxValue, colorScale };
    }
}; 