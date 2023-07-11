import httpService from "./http.service";

const professionEndpoint = "profession/";

const ProfessionService = {
    fetchAll: async () => {
        const { data } = await httpService.get(professionEndpoint);
        return data;
    }
};

export default ProfessionService;
