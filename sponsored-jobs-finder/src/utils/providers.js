export const providers = {
    osm: (x, y, z) => {
        const s = String.fromCharCode(97 + (x + y + z) % 3);
        return `https://${s}.tile.openstreetmap.org/${z}/${x}/${y}.png`
    }
};
