const { mkdirSync, existsSync, writeFileSync } = require("node:fs");

const LOL_CHAMPIONS_URL =
  "https://www.leagueoflegends.com/page-data/pt-br/champions/page-data.json";
const LOL_CHAMPION_INFO_URL =
  "https://www.leagueoflegends.com/page-data/pt-br{CHAMPION_URL}page-data.json";

const API_FOLDER_NAME = "api";
const API_CHAMPIONS_FOLDER_NAME = "api/champions";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

(async function () {
  const heroesResponse = await fetch(LOL_CHAMPIONS_URL);
  const json = await heroesResponse.json();

  const {
    result: {
      data: {
        allChampions: { edges: champions },
      },
    },
  } = json;

  if (!existsSync(API_FOLDER_NAME)) {
    mkdirSync(API_FOLDER_NAME);
  }

  if (!existsSync(API_CHAMPIONS_FOLDER_NAME)) {
    mkdirSync(API_CHAMPIONS_FOLDER_NAME);
  }

  writeFileSync(
    API_FOLDER_NAME + "/champions.json",
    JSON.stringify(champions, null, 4)
  );

  //   champions.forEach(async ({ node: championNode }) => {
  for (const { node: championNode } of champions) {
    console.log(championNode);
    const championJsonUrl = LOL_CHAMPION_INFO_URL.replace(
      "{CHAMPION_URL}",
      championNode.url
    );

    console.log(`Baixando dados do heroi ${championNode.url} ...`);
    const championResponse = await fetch(championJsonUrl);
    if (!championResponse.ok) {
      console.log(championResponse);
      return;
    }
    const championRawJson = await championResponse.json();

    const championJson = championRawJson.result.data.all.nodes[0];

    writeFileSync(
      API_CHAMPIONS_FOLDER_NAME + `/${championJson.data_dragon_id}.json`,
      JSON.stringify(championJson, null, 4)
    );
    console.log(`Escrevendo dados do heroi ${championNode.url} ...`);
    await sleep(1000);
  }
})();