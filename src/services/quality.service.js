import httpService from "./http.service";

const qualitiesEndpoint = "quality/";

const QualityService = {
    get: async () => {
        const { data } = await httpService.get(qualitiesEndpoint);
        return data;
    }
};

export default QualityService;
