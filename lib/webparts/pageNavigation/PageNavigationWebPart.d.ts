import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
export interface IPageNavigationWebPartProps {
    description: string;
}
export default class PageNavigationWebPart extends BaseClientSideWebPart<IPageNavigationWebPartProps> {
    private _pageTitle;
    render(): void;
    protected GetParentPageId1(CurrnetPageId: number): Promise<any>;
    protected get dataVersion(): Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
    private _renderPlaceHolders;
    private _renderParentPlaceHolders;
    private _getChildPages;
    private _getSiblingPages;
    private _getChildPageNum;
    private _setAccordion;
}
//# sourceMappingURL=PageNavigationWebPart.d.ts.map