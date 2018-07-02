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
                    "parentuser": Global.userInfo.token.uid,
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
                "warehouse.parentuser = ": Global.userInfo.token.uid
            })
        }
        return ApiService.post(APIRESOURCE.LIST_WAREHOUSE, data);
    },
    listOwners(skip,limit){
        let data = {
            filter: JSON.stringify({
                "where": {
                    "parentuser": Global.userInfo.token.uid,
                    "deleted": false
                },
                "skip": skip,
                "limit": limit,
                "order": null
            })
        }
        return ApiService.post(APIRESOURCE.LIST_OWNERS, data);
    },
    totalByCompany(){
        let data = {
            obj: JSON.stringify({
                deleted:false,
                parentuser:Global.userInfo.token.uid,
            })
        }
        if(Global.userInfo.isAdmin) {
            return ApiService.post(APIRESOURCE.TOTAL_BY_COMPANY_ADMIN, data);
        }
        return ApiService.post(APIRESOURCE.TOTAL_BY_COMPANY, data);
    },
    trackDelete(){
        let data = {
            obj: JSON.stringify({
                deleted:true,
            })
        }
        if(Global.userInfo.isAdmin) {
            return ApiService.post(APIRESOURCE.TOTAL_BY_COMPANY_ADMIN, data);
        }
        return ApiService.post(APIRESOURCE.TOTAL_BY_COMPANY, data)
    },
    findDomains(skip,limit){
        let data = {
            filter: JSON.stringify({
                "where": {
                    "deleted": false
                },
                "skip": skip,
                "limit": limit,
                "order": null
            })
        }
        return ApiService.post(APIRESOURCE.FIND_DOMAINS,data);
    },
    totalpickdetail() {
        let data = {
            fromDate: "2018/01/01 00:00:00",
            toDate: "2018/07/03 00:00:00",
            whseids: "'wmwhse1','Huyen','PUU'"
        }
        return ApiService.postHostUser(APIRESOURCE.TOTAL_PICK_DETAIL,data);
    },
}