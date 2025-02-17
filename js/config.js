export const config = {
    margin: {
        top: Number(getComputedStyle(document.documentElement).getPropertyValue('--matrix-margin-top').replace('px', '')) || 100,
        right: Number(getComputedStyle(document.documentElement).getPropertyValue('--matrix-margin-right').replace('px', '')) || 20,
        bottom: Number(getComputedStyle(document.documentElement).getPropertyValue('--matrix-margin-bottom').replace('px', '')) || 10,
        left: Number(getComputedStyle(document.documentElement).getPropertyValue('--matrix-margin-left').replace('px', '')) || 120
    },
    cellSize: Number(getComputedStyle(document.documentElement).getPropertyValue('--matrix-cell-size').replace('px', '')),
    cellPadding: Number(getComputedStyle(document.documentElement).getPropertyValue('--matrix-cell-padding').replace('px', '')),
    maxOpacity: Number(getComputedStyle(document.documentElement).getPropertyValue('--opacity-full')) || 1.0,
    minOpacity: Number(getComputedStyle(document.documentElement).getPropertyValue('--opacity-light')) || 0.3,
    colors: {
        empty: getComputedStyle(document.documentElement).getPropertyValue('--color-cell-empty').trim(),
        filled: d3.interpolateBlues,
        highlight: getComputedStyle(document.documentElement).getPropertyValue('--color-highlight').trim(),
        dimmed: getComputedStyle(document.documentElement).getPropertyValue('--color-dimmed').trim()
    },
    datasets: {
        article: {
            sourceType: "newspaper articles",
            title: "intégrisme",
            file: "data/cooccurrence.json"
        },
        benin: {
            sourceType: "newspaper articles",
            title: "Union Islamique du Bénin",
            file: "data/cooccurrence_Union_Islamique_du_Bénin.json"
        }
    },
    defaultDataset: "article",
    transition: {
        duration: Number(getComputedStyle(document.documentElement).getPropertyValue('--duration-normal').replace('ms', '')),
        ease: getComputedStyle(document.documentElement).getPropertyValue('--ease-default').trim()
    }
}; 