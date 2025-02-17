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
        benin: {
            title: "Union Islamique du Bénin",
            file: "cooccurrence_Union_Islamique_du_Bénin.json"
        },
        cni: {
            title: "Conseil National Islamique",
            file: "cooccurrence_Conseil_National_Islamique.json"
        },
        cosim: {
            title: "Conseil Supérieur des Imams, des Mosquées et des Affaires islamiques",
            file: "cooccurrence_Conseil_Supérieur_des_Imams,_des_Mosquées_et_des_Affaires_islamiques.json"
        },
        csi: {
            title: "Conseil Supérieur Islamique",
            file: "cooccurrence_Conseil_Supérieur_Islamique.json"
        },
        faib: {
            title: "Fédération des Associations Islamiques du Burkina",
            file: "cooccurrence_Fédération_des_Associations_Islamiques_du_Burkina.json"
        },
        umt: {
            title: "Union Musulmane du Togo",
            file: "cooccurrence_Union_Musulmane_du_Togo.json"
        }
    },
    defaultDataset: "benin",
    transition: {
        duration: Number(getComputedStyle(document.documentElement).getPropertyValue('--duration-normal').replace('ms', '')),
        ease: getComputedStyle(document.documentElement).getPropertyValue('--ease-default').trim()
    }
}; 