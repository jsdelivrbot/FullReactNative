import {
    ApiService
} from "./ApiService";
import {
    APIRESOURCE
} from "./ApiResouce";
import {
    Global
} from "../common/Global";

export const APIREQUEST = {
    listSystemMail() {
        let obj = {
            where: JSON.stringify({
                deleted: false
            }),
            skip: 0,
            limit: 12,
            order: null
        }

        let data = {
            filter: JSON.stringify(obj)
        };
        return ApiService.post(APIRESOURCE.LIST_SYSTEMMAIL, data);
    },
    listUser(skip, limit) {
        let data = {
            filter: JSON.stringify({
                "where": {
                    "parentuser": Global.userInfo.user.username,
                    "deleted": false
                },
                "skip": skip,
                "limit": limit,
                "order": null
            })
        }
        return ApiService.post(APIRESOURCE.LIST_USER, data);
    },
    listWarehouse(skip,limit) {
        let data = {
            obj: JSON.stringify({
                "skip": skip,
                "limit": limit,
                "order": null
            }),
            filter: JSON.stringify({
                "warehouse.parentuser = ": Global.userInfo.user.username
            })
        }
        return ApiService.post(APIRESOURCE.LIST_WAREHOUSE, data);
    },
    listOwners(skip,limit){
        let data = {
            filter: JSON.stringify({
                "where": {
                    "parentuser": Global.userInfo.user.username,
                    "deleted": false
                },
                "skip": skip,
                "limit": limit,
                "order": null
            })
        }
        return ApiService.post(APIRESOURCE.LIST_OWNERS, data);
    }
}