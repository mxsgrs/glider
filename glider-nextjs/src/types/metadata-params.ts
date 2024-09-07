import { Languages } from "next/dist/lib/metadata/types/alternative-urls-types"

export interface MetadataParams {
    params: {
        locale: string,
        page: string,
        path: string,
    }
}