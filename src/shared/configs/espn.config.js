const ffApi = require('espn-fantasy-football-api/node');
const ApiClient = ffApi.Client;

export const getEspnApiClient = () => {
    const myClient = new ApiClient({ leagueId: 981557});
    myClient.setCookies({ SWID: 'F9FD0903-D31E-43F8-BD09-03D31E93F82B', espnS2: 'AECP5pJZ3Ftgd4j2zJiOm9z3vyP/HTpxbZlZ1rk+VQRqjB8npH5d5kljGPOOpCxZU1QBINSfhup88dn4P549ZvcXrW4mNm38vBZiNbN8dx2p5U171bytog57ryeJIgCHuPwAdwXdBDARTEFVlkV+mxs7hJkQovdbbthh25fzub4xvEbXhC+S8Mm2QYImulJQr5DQKSn79EHKzlWPcZG9RNBLkCb2eTVyLBdp6BG/J4pMv/XjCSRonmHR31mkz+jR8TquNDiKLm5F9hsnMvWa8n9OysAM0owmd1OnFzhrysVDag==' });
    return myClient;
}
