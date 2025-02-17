export const config = {
    margin: { 
        top: 220,    // Space for rotated labels
        right: 20,
        bottom: 10,
        left: 120 
    },
    cellSize: 16,
    cellPadding: 3,
    maxOpacity: getComputedStyle(document.documentElement).getPropertyValue('--opacity-full').trim() || 1.0,
    minOpacity: getComputedStyle(document.documentElement).getPropertyValue('--opacity-light').trim() || 0.3,
    colors: {
        empty: getComputedStyle(document.documentElement).getPropertyValue('--color-cell-empty').trim(),
        filled: d3.interpolateBlues,
        highlight: getComputedStyle(document.documentElement).getPropertyValue('--color-highlight').trim(),
        dimmed: getComputedStyle(document.documentElement).getPropertyValue('--color-dimmed').trim()
    },
    dataUrl: './data/cooccurrence.json',
    transition: {
        duration: Number(getComputedStyle(document.documentElement).getPropertyValue('--duration-normal').replace('ms', '')),
        ease: getComputedStyle(document.documentElement).getPropertyValue('--ease-default').trim()
    }
}; 