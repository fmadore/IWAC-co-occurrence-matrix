export const sortingUtils = {
    byName(nodes) {
        return nodes.slice().sort((a, b) => a.name.localeCompare(b.name));
    },

    byFrequency(nodes, links) {
        // Calculate total frequency for each node
        const frequencies = new Map();
        nodes.forEach(node => {
            const totalFrequency = links.reduce((sum, link) => {
                if (link.source === node.id) {
                    return sum + link.value;
                }
                if (link.target === node.id) {
                    return sum + link.value;
                }
                return sum;
            }, 0);
            frequencies.set(node.id, totalFrequency);
        });

        // Sort nodes by frequency (descending) and then by name for ties
        return nodes.slice().sort((a, b) => {
            const freqDiff = frequencies.get(b.id) - frequencies.get(a.id);
            return freqDiff !== 0 ? freqDiff : a.name.localeCompare(b.name);
        });
    },

    getOrderedMatrix(nodes, links, orderType) {
        // Create a map of old index to new index
        const orderedNodes = orderType === 'frequency' 
            ? this.byFrequency(nodes, links)
            : this.byName(nodes);
            
        const indexMap = new Map(
            orderedNodes.map((node, index) => [node.id, index])
        );

        // Reorder links according to new indices
        const orderedLinks = links.map(link => ({
            source: indexMap.get(link.source),
            target: indexMap.get(link.target),
            value: link.value
        }));

        return { orderedNodes, orderedLinks };
    }
}; 