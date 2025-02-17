import { config } from './config.js';

export const sortingUtils = {
    byName(nodes) {
        // Use Intl.Collator for better internationalization and performance
        const collator = new Intl.Collator(undefined, {
            numeric: true,
            sensitivity: 'base'
        });
        return nodes.slice().sort((a, b) => collator.compare(a.name, b.name));
    },

    byFrequency(nodes, links) {
        // Pre-calculate frequencies using a more efficient approach
        const frequencies = new Map();
        
        // Initialize frequencies
        nodes.forEach(node => frequencies.set(node.id, 0));
        
        // Calculate frequencies in a single pass
        links.forEach(link => {
            frequencies.set(link.source, frequencies.get(link.source) + link.value);
            frequencies.set(link.target, frequencies.get(link.target) + link.value);
        });

        // Use Intl.Collator for consistent string comparison
        const collator = new Intl.Collator(undefined, {
            numeric: true,
            sensitivity: 'base'
        });

        // Sort nodes by frequency (descending) and then by name for ties
        return nodes.slice().sort((a, b) => {
            const freqDiff = frequencies.get(b.id) - frequencies.get(a.id);
            return freqDiff !== 0 ? freqDiff : collator.compare(a.name, b.name);
        });
    },

    getOrderedMatrix(nodes, links, orderType) {
        // Create a map of old index to new index
        const orderedNodes = orderType === 'frequency' 
            ? this.byFrequency(nodes, links)
            : this.byName(nodes);
            
        // Use Map for O(1) lookups
        const indexMap = new Map(
            orderedNodes.map((node, index) => [node.id, index])
        );

        // Reorder links according to new indices
        // Use more efficient array allocation
        const orderedLinks = new Array(links.length);
        links.forEach((link, i) => {
            orderedLinks[i] = {
                source: indexMap.get(link.source),
                target: indexMap.get(link.target),
                value: link.value
            };
        });

        return { orderedNodes, orderedLinks };
    }
}; 