import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import Service from './service';

import styles from './PageNavigationWebPart.module.scss';

import * as strings from 'PageNavigationWebPartStrings';

export interface IPageNavigationWebPartProps {
  description: string;
}

export default class PageNavigationWebPart extends BaseClientSideWebPart<IPageNavigationWebPartProps> {

  private _pageTitle: string = "";



  public render(): void {
  /*   this.domElement.innerHTML = `
      <div class="${ styles.pageNavigation }">
        <div class="${ styles.mainContainer }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
              <span class="${ styles.title }">Welcome to SharePoint!</span>
              <p class="${ styles.subTitle }">Customize SharePoint experiences using Web Parts.</p>
              <p class="${ styles.description }">${escape(this.properties.description)}</p>
              <a href="https://aka.ms/spfx" class="${ styles.title }">
                <span class="${ styles.title }">Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>`; */

      //(this.context.pageContext.web.absoluteUrl);

      let CurrentPageId = this.context.pageContext.listItem.id;
      console.log("Current page Id: " + CurrentPageId);

           
     this.GetParentPageId1(CurrentPageId).then(Parent => {

        // Check if the page has Parent page
        if (Parent.ParentPage){
          // When Parent page exist
          console.log("Parent page ID : " + Parent.ParentPage.ID);
          console.log(Parent.ParentPage.ID);
          this._renderParentPlaceHolders(Parent.ParentPage.ID, CurrentPageId);
        } else {
          // When Parent page does NOT exist
          console.log("No Parent Page found.");
          this._renderPlaceHolders(CurrentPageId);
        }
      });
  }

  protected async GetParentPageId1(CurrnetPageId : number) : Promise<any> {
   // alert("1");
    sp.setup({spfxContext:this.context})
    //return await sp.web.lists.getByTitle("Site Pages").items.getById(CurrnetPageId).select("Title, ParentPage/Title, ParentPage/ID").expand("ParentPage").get();
    return await sp.web.lists.getByTitle("Site Pages").items.getById(CurrnetPageId).select("Title, ParentPage/Title, ParentPage/ID").expand("ParentPage").get();
    
}

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }

  private _renderPlaceHolders(pageId): void {

    Service.GetCurrentPage(pageId).then(page => {
      console.log(page);
      this._pageTitle = page.Title;
      this._getChildPages(pageId);
    });
  }

  private _renderParentPlaceHolders(ParentPageId, CurrentPageId): void {

    Service.GetCurrentPage(ParentPageId).then(page => {
      console.log(page);
      this._pageTitle = page.Title;
      this._getSiblingPages(ParentPageId, CurrentPageId);
    });
  }

  private async _getChildPages(pageId) {
    console.log("Getting Child Pages.....");
    // if (document.location.href.indexOf("Mode=Edit") !== -1) {
    //   return;
    // }

    await Service.GetChildPages(pageId).then(items => {
      // Alphabetical order sorting
      items.sort((a, b) => a.Title.localeCompare(b.Title));

      console.log(items);
      console.log(items.length);

      if (items.length < 1) {
        // Checking existing Left Nav Div and Delete
        const LeftNavDiv = document.querySelector('div[id="SpfxCustLeftNav"]');
        if (LeftNavDiv) {
          document.querySelector('div[id="SpfxCustLeftNav"]').remove();
        }
      } else {
        // Checking existing Left Nav Div and Delete
        const LeftNavDiv = document.querySelector('div[id="SpfxCustLeftNav"]');
        if (LeftNavDiv) {
          document.querySelector('div[id="SpfxCustLeftNav"]').remove();
        }

        // Creating a new Left Nav Div
        const content = document.querySelector('div[data-automation-id="contentScrollRegion"]');
        let leftNav: HTMLDivElement = document.createElement("div");
        leftNav.setAttribute("id", "SpfxCustLeftNav");
        
        let divItems: HTMLDivElement = document.createElement("div");
        divItems.innerHTML = items.map((item) =>
          (`<div class=${styles.row} key=${item.FieldValuesAsText.ID}>
            <div class=${styles.column}>
              <a data-interception='off' href="${this.context.pageContext.web.absoluteUrl + '/SitePages/' + item.FieldValuesAsText.FileLeafRef}">${item.Title}</a>
            </div>
          </div>`)
        ).join('');

        // console.log(divItems.innerHTML);
        let borderImageUrl = "";
        // let borderImageUrl = this.context.pageContext.web.absoluteUrl + "/Site%20Assets/LeftNavigation/border.png";

        leftNav.innerHTML = (`
        <div class=${styles.pageNavigation}>
          <div class=${styles.mainContainer}>
            <div class="${styles.leftNavHeader} accordion ${styles.accordion}">
                  ${this._pageTitle}
            </div>
            <div class="panel" style="display:none;">
              ${divItems.innerHTML}
            </div>
          </div>
        </div>`
        );
        content.setAttribute("style", "background:url('" + borderImageUrl + "') repeat-y 34px;");

        content.prepend(leftNav);
        this._setAccordion();

      }
    });
  }

  private async _getSiblingPages(ParentPageId, CurrentPageId) {
    console.log("Getting Sibling Pages.....");

    await Service.GetChildPages(ParentPageId).then(items => {
      console.log("Sibling Pages");

      // Alphabetical order sorting
      const sortedlist = items.sort((a, b) => a.Title.localeCompare(b.Title));

      // console.log(items);

      // console.log(divItems.innerHTML);
      let borderImageUrl = "";
      // let borderImageUrl = this.context.pageContext.web.absoluteUrl + "/Site%20Assets/LeftNavigation/border.png";
      let ParentPageRelURL = "";
      let siblingDivReady = false;
      // Checking existing Left Nav Div and Delete
      /* const LeftNavDiv = document.querySelector('div[id="SpfxCustLeftNav"]');
      if (LeftNavDiv) {
        document.querySelector('div[id="SpfxCustLeftNav"]').remove();
      } */

      // Creating a new Left Nav Div
      //const content = document.querySelector('div[data-automation-id="CanvasLayout"]');
      const content = this.domElement;
      let leftNav: HTMLDivElement = document.createElement("div");
      leftNav.setAttribute("id", "SpfxCustLeftNavright");
      
      let divItems: HTMLDivElement = document.createElement("div");
      let divArr = new Map();

      sortedlist.map((item) => {

        const PageNum = new Promise(resolve => {
          resolve(this._getChildPageNum(item.ID));
        });

        PageNum.then(pagecount => {
          
           // Adding sibling / current page list

           // console.log("Sibling Page Count : " + n);
           let stylestr = "";  
           let divstr = "";

           // Checking if the page has child pages and set accodion style
           if (pagecount > 0) {
             stylestr = styles.accordion;
           } else {
             stylestr = styles.emptyaccordion;
           }

           if (item.FieldValuesAsText.ID == CurrentPageId){
               // Current page 
               // console.log(">> Adding sibling page (Current) : " + item.FieldValuesAsText.ID);
               divstr = `<div class="${styles.currentitem} ${stylestr}" key=${item.FieldValuesAsText.ID}>
                     <a data-interception='off' href="${this.context.pageContext.web.absoluteUrl + '/SitePages/' + item.FieldValuesAsText.FileLeafRef}">${item.Title}</a>
                 </div>
                 <div class="panel" style="display:none;">
                 </div>`;
             } else {
               // Sibling page
               // console.log(">> Adding sibling page : " + item.FieldValuesAsText.ID);
               divstr = `<div class="${stylestr}" key=${item.FieldValuesAsText.ID}>
                   <a data-interception='off' href="${this.context.pageContext.web.absoluteUrl + '/SitePages/' + item.FieldValuesAsText.FileLeafRef}">${item.Title}</a>
               </div>
               <div class="panel" style="display:none;">
               </div>`;
             }
             // console.log(divstr);
             

             divArr.set(item.ID, divstr);
             
             // divItems.innerHTML += divstr;  
        });
        siblingDivReady = true;
      });

      // Set Div by iterating Array
      var checkDivArrInterval = setInterval(() => {

        if(sortedlist.length == divArr.size){
          clearInterval(checkDivArrInterval);
          
          sortedlist.map((item) => {
            // console.log("Item Title (Stg-2): " + item.Title);
            // console.log(divArr.get(item.ID));
            divItems.innerHTML += divArr.get(item.ID);
          });

        }

      }, 500); 

      var checkInterval = setInterval(() => {
        if (siblingDivReady) {
          clearInterval(checkInterval);

          // // Set the Parent Page Node
          Service.GetCurrentPage(ParentPageId).then(page => {
            // console.log("Parent Page URL: " + page.FieldValuesAsText.FileLeafRef);
            ParentPageRelURL = page.FieldValuesAsText.FileLeafRef;

            leftNav.innerHTML = (`
            <div class=${styles.pageNavigation}>
              <div class=${styles.mainContainer}>
                <div class="${styles.leftNavHeader} ${styles.parentPageHeader}">
                      <div class=${styles.parentPageHeaderText}>
                        <a data-interception='off' href="${document.location.href.split("/SitePages")[0] + '/SitePages/' + ParentPageRelURL}">${this._pageTitle}</a>
                      </div>
                </div>
                <div>
                  ${divItems.innerHTML}
                </div>
              </div>
            </div>`
            );
            content.setAttribute("style", "background:url('" + borderImageUrl + "') repeat-y 34px;");

            content.prepend(leftNav);
            this._setAccordion();
          });
        }
      }, 500);      
    });
  }

  private async _getChildPageNum(pageId) {
    return await Service.GetChildPages(pageId).then(items => {
      // console.log("Child Page Count : " + items.length);
      return items.length;
    });
  }

  private _setAccordion(): void {
    let acc = document.getElementsByClassName(styles.accordion);
    let i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function() {
        this.classList.toggle(styles.active);
        let panel = this.nextElementSibling;

        console.log("Page Id selected : " + this.getAttribute("key"));
        const SelectedPageId = this.getAttribute("key");
        
        if (panel.innerHTML.length < 20) {
          Service.GetChildPages(SelectedPageId).then(items => {
            
            // Alphabetical order sorting
            items.sort((a, b) => a.Title.localeCompare(b.Title));

            let divItems: HTMLDivElement = document.createElement("div");
            divItems.innerHTML = items.map((item) =>
              (`<div class=${styles.row} key=${item.FieldValuesAsText.ID}>
                <div class=${styles.column}>
                  <a data-interception='off' href="${document.location.href.split("/SitePages")[0] + '/SitePages/' + item.FieldValuesAsText.FileLeafRef}">${item.Title}</a>
                </div>
              </div>`)
            ).join(''); 
            panel.innerHTML = divItems.innerHTML;
          });
        }
        
        // Show & Hide Panel
        if (panel.style.display == "none") {
          panel.style.display = "block";

        } else {
          panel.style.display = "none";
        } 

      });
    }
  }

}
