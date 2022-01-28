const ffApi = require('espn-fantasy-football-api/node');
const ApiClient = ffApi.Client;

export const getEspnApiClient = (SWID, espnS2) => {
    const myClient = new ApiClient({ leagueId: 981557});
    myClient.setCookies({ SWID: SWID, espnS2: espnS2 });
    return myClient;
}
