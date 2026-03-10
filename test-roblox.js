const placeIds = [2753915549, 177052655, 920587237, 132455540, 66654135, 1];

async function test() {
    for (const placeId of placeIds) {
        try {
            const res = await fetch(`https://apis.roblox.com/universes/v1/places/${placeId}/universe`);
            const data = await res.json();
            console.log(`Place ${placeId} -> Universe:`, data);
        } catch (e) {
            console.error(`Place ${placeId} error:`, e.message);
        }
    }
}
test();
