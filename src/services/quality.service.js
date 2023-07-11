import httpService from "./http.service";

const qualitiesEndpoint = "quality/";

const QualityService = {
    fetchAll: async () => {
        const { data } = await httpService.get(qualitiesEndpoint);
        return data;
    }
};

export default QualityService;
