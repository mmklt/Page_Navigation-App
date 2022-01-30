import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/fields";
import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions, AadHttpClient, MSGraphClient } from '@microsoft/sp-http';
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export default class Service {

    private static context: WebPartContext;
    
    public static Init(){
        sp.setup({spfxContext: this.context});
        //sp.setup({ sp: { baseUrl: this.context.pageContext.web.absoluteUrl } });
    }

    public static async GetListItems() : Promise<any> {
        return await sp.web.lists.getByTitle("TestList").items.select("Title, Id, Department, StartDate").get();
    }

    public static async GetCurrentPage(pageId : number) : Promise<any> {
        return await sp.web.lists.getByTitle("Site Pages").items.getById(pageId).select("Title, ContentType/Name, FieldValuesAsText").expand("FieldValuesAsText, ContentType").get();
    }

    public static async GetParentPageId(CurrnetPageId : number) : Promise<any> {

        
        //return await sp.web.lists.getByTitle("Site Pages").items.getById(CurrnetPageId).select("Title, ParentPage/Title, ParentPage/ID").expand("ParentPage").get();
        return await sp.web.lists.getByTitle("Site Pages").items.getById(CurrnetPageId).select("Title, ParentPage/Title, ParentPage/ID").expand("ParentPage").get();
    }

    public static async GetParentSiblings(pageId : number) : Promise<any> {
        return await sp.web.lists.getByTitle("Site Pages").items.select("Title, Id, FieldValuesAsText").filter("ParentPageId eq "+ pageId +"").expand("FieldValuesAsText").get();
    }
    public static async GetChildPages(pageId : number) : Promise<any> {
        return await sp.web.lists.getByTitle("Site Pages").items.select("Title, Id, FieldValuesAsText").filter("ParentPageId eq "+ pageId +"").expand("FieldValuesAsText").get();
    }

    public static async GetWebTitle() : Promise<any> {
        return (await sp.web()).Title;
    }
}