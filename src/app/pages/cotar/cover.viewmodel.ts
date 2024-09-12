import { Cover, CoverApi } from "./cover.model";

export class CoverViewModel {
    static fromCoverApi(api: CoverApi[]): Cover[] {
        return api.map(
            (cover) => (
                {
                    id: cover.coverId,
                    name: cover.description
                }
            ))
    }
}