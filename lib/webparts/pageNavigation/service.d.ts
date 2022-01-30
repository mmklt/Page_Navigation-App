import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/fields";
export default class Service {
    private static context;
    static Init(): void;
    static GetListItems(): Promise<any>;
    static GetCurrentPage(pageId: number): Promise<any>;
    static GetParentPageId(CurrnetPageId: number): Promise<any>;
    static GetParentSiblings(pageId: number): Promise<any>;
    static GetChildPages(pageId: number): Promise<any>;
    static GetWebTitle(): Promise<any>;
}
//# sourceMappingURL=service.d.ts.map