var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Version } from '@microsoft/sp-core-library';
import { PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import Service from './service';
import styles from './PageNavigationWebPart.module.scss';
import * as strings from 'PageNavigationWebPartStrings';
var PageNavigationWebPart = /** @class */ (function (_super) {
    __extends(PageNavigationWebPart, _super);
    function PageNavigationWebPart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._pageTitle = "";
        return _this;
    }
    PageNavigationWebPart.prototype.render = function () {
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
        var _this = this;
        //(this.context.pageContext.web.absoluteUrl);
        var CurrentPageId = this.context.pageContext.listItem.id;
        console.log("Current page Id: " + CurrentPageId);
        this.GetParentPageId1(CurrentPageId).then(function (Parent) {
            // Check if the page has Parent page
            if (Parent.ParentPage) {
                // When Parent page exist
                console.log("Parent page ID : " + Parent.ParentPage.ID);
                console.log(Parent.ParentPage.ID);
                _this._renderParentPlaceHolders(Parent.ParentPage.ID, CurrentPageId);
            }
            else {
                // When Parent page does NOT exist
                console.log("No Parent Page found.");
                _this._renderPlaceHolders(CurrentPageId);
            }
        });
    };
    PageNavigationWebPart.prototype.GetParentPageId1 = function (CurrnetPageId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // alert("1");
                        sp.setup({ spfxContext: this.context });
                        return [4 /*yield*/, sp.web.lists.getByTitle("Site Pages").items.getById(CurrnetPageId).select("Title, ParentPage/Title, ParentPage/ID").expand("ParentPage").get()];
                    case 1: 
                    //return await sp.web.lists.getByTitle("Site Pages").items.getById(CurrnetPageId).select("Title, ParentPage/Title, ParentPage/ID").expand("ParentPage").get();
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Object.defineProperty(PageNavigationWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse('1.0');
        },
        enumerable: false,
        configurable: true
    });
    PageNavigationWebPart.prototype.getPropertyPaneConfiguration = function () {
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
    };
    PageNavigationWebPart.prototype._renderPlaceHolders = function (pageId) {
        var _this = this;
        Service.GetCurrentPage(pageId).then(function (page) {
            console.log(page);
            _this._pageTitle = page.Title;
            _this._getChildPages(pageId);
        });
    };
    PageNavigationWebPart.prototype._renderParentPlaceHolders = function (ParentPageId, CurrentPageId) {
        var _this = this;
        Service.GetCurrentPage(ParentPageId).then(function (page) {
            console.log(page);
            _this._pageTitle = page.Title;
            _this._getSiblingPages(ParentPageId, CurrentPageId);
        });
    };
    PageNavigationWebPart.prototype._getChildPages = function (pageId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Getting Child Pages.....");
                        // if (document.location.href.indexOf("Mode=Edit") !== -1) {
                        //   return;
                        // }
                        return [4 /*yield*/, Service.GetChildPages(pageId).then(function (items) {
                                // Alphabetical order sorting
                                items.sort(function (a, b) { return a.Title.localeCompare(b.Title); });
                                console.log(items);
                                console.log(items.length);
                                if (items.length < 1) {
                                    // Checking existing Left Nav Div and Delete
                                    var LeftNavDiv = document.querySelector('div[id="SpfxCustLeftNav"]');
                                    if (LeftNavDiv) {
                                        document.querySelector('div[id="SpfxCustLeftNav"]').remove();
                                    }
                                }
                                else {
                                    // Checking existing Left Nav Div and Delete
                                    var LeftNavDiv = document.querySelector('div[id="SpfxCustLeftNav"]');
                                    if (LeftNavDiv) {
                                        document.querySelector('div[id="SpfxCustLeftNav"]').remove();
                                    }
                                    // Creating a new Left Nav Div
                                    var content = document.querySelector('div[data-automation-id="contentScrollRegion"]');
                                    var leftNav = document.createElement("div");
                                    leftNav.setAttribute("id", "SpfxCustLeftNav");
                                    var divItems = document.createElement("div");
                                    divItems.innerHTML = items.map(function (item) {
                                        return ("<div class=" + styles.row + " key=" + item.FieldValuesAsText.ID + ">\n            <div class=" + styles.column + ">\n              <a data-interception='off' href=\"" + (_this.context.pageContext.web.absoluteUrl + '/SitePages/' + item.FieldValuesAsText.FileLeafRef) + "\">" + item.Title + "</a>\n            </div>\n          </div>");
                                    }).join('');
                                    // console.log(divItems.innerHTML);
                                    var borderImageUrl = "";
                                    // let borderImageUrl = this.context.pageContext.web.absoluteUrl + "/Site%20Assets/LeftNavigation/border.png";
                                    leftNav.innerHTML = ("\n        <div class=" + styles.pageNavigation + ">\n          <div class=" + styles.mainContainer + ">\n            <div class=\"" + styles.leftNavHeader + " accordion " + styles.accordion + "\">\n                  " + _this._pageTitle + "\n            </div>\n            <div class=\"panel\" style=\"display:none;\">\n              " + divItems.innerHTML + "\n            </div>\n          </div>\n        </div>");
                                    content.setAttribute("style", "background:url('" + borderImageUrl + "') repeat-y 34px;");
                                    content.prepend(leftNav);
                                    _this._setAccordion();
                                }
                            })];
                    case 1:
                        // if (document.location.href.indexOf("Mode=Edit") !== -1) {
                        //   return;
                        // }
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PageNavigationWebPart.prototype._getSiblingPages = function (ParentPageId, CurrentPageId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Getting Sibling Pages.....");
                        return [4 /*yield*/, Service.GetChildPages(ParentPageId).then(function (items) {
                                console.log("Sibling Pages");
                                // Alphabetical order sorting
                                var sortedlist = items.sort(function (a, b) { return a.Title.localeCompare(b.Title); });
                                // console.log(items);
                                // console.log(divItems.innerHTML);
                                var borderImageUrl = "";
                                // let borderImageUrl = this.context.pageContext.web.absoluteUrl + "/Site%20Assets/LeftNavigation/border.png";
                                var ParentPageRelURL = "";
                                var siblingDivReady = false;
                                // Checking existing Left Nav Div and Delete
                                /* const LeftNavDiv = document.querySelector('div[id="SpfxCustLeftNav"]');
                                if (LeftNavDiv) {
                                  document.querySelector('div[id="SpfxCustLeftNav"]').remove();
                                } */
                                // Creating a new Left Nav Div
                                //const content = document.querySelector('div[data-automation-id="CanvasLayout"]');
                                var content = _this.domElement;
                                var leftNav = document.createElement("div");
                                leftNav.setAttribute("id", "SpfxCustLeftNavright");
                                var divItems = document.createElement("div");
                                var divArr = new Map();
                                sortedlist.map(function (item) {
                                    var PageNum = new Promise(function (resolve) {
                                        resolve(_this._getChildPageNum(item.ID));
                                    });
                                    PageNum.then(function (pagecount) {
                                        // Adding sibling / current page list
                                        // console.log("Sibling Page Count : " + n);
                                        var stylestr = "";
                                        var divstr = "";
                                        // Checking if the page has child pages and set accodion style
                                        if (pagecount > 0) {
                                            stylestr = styles.accordion;
                                        }
                                        else {
                                            stylestr = styles.emptyaccordion;
                                        }
                                        if (item.FieldValuesAsText.ID == CurrentPageId) {
                                            // Current page 
                                            // console.log(">> Adding sibling page (Current) : " + item.FieldValuesAsText.ID);
                                            divstr = "<div class=\"" + styles.currentitem + " " + stylestr + "\" key=" + item.FieldValuesAsText.ID + ">\n                     <a data-interception='off' href=\"" + (_this.context.pageContext.web.absoluteUrl + '/SitePages/' + item.FieldValuesAsText.FileLeafRef) + "\">" + item.Title + "</a>\n                 </div>\n                 <div class=\"panel\" style=\"display:none;\">\n                 </div>";
                                        }
                                        else {
                                            // Sibling page
                                            // console.log(">> Adding sibling page : " + item.FieldValuesAsText.ID);
                                            divstr = "<div class=\"" + stylestr + "\" key=" + item.FieldValuesAsText.ID + ">\n                   <a data-interception='off' href=\"" + (_this.context.pageContext.web.absoluteUrl + '/SitePages/' + item.FieldValuesAsText.FileLeafRef) + "\">" + item.Title + "</a>\n               </div>\n               <div class=\"panel\" style=\"display:none;\">\n               </div>";
                                        }
                                        // console.log(divstr);
                                        divArr.set(item.ID, divstr);
                                        // divItems.innerHTML += divstr;  
                                    });
                                    siblingDivReady = true;
                                });
                                // Set Div by iterating Array
                                var checkDivArrInterval = setInterval(function () {
                                    if (sortedlist.length == divArr.size) {
                                        clearInterval(checkDivArrInterval);
                                        sortedlist.map(function (item) {
                                            // console.log("Item Title (Stg-2): " + item.Title);
                                            // console.log(divArr.get(item.ID));
                                            divItems.innerHTML += divArr.get(item.ID);
                                        });
                                    }
                                }, 500);
                                var checkInterval = setInterval(function () {
                                    if (siblingDivReady) {
                                        clearInterval(checkInterval);
                                        // // Set the Parent Page Node
                                        Service.GetCurrentPage(ParentPageId).then(function (page) {
                                            // console.log("Parent Page URL: " + page.FieldValuesAsText.FileLeafRef);
                                            ParentPageRelURL = page.FieldValuesAsText.FileLeafRef;
                                            leftNav.innerHTML = ("\n            <div class=" + styles.pageNavigation + ">\n              <div class=" + styles.mainContainer + ">\n                <div class=\"" + styles.leftNavHeader + " " + styles.parentPageHeader + "\">\n                      <div class=" + styles.parentPageHeaderText + ">\n                        <a data-interception='off' href=\"" + (document.location.href.split("/SitePages")[0] + '/SitePages/' + ParentPageRelURL) + "\">" + _this._pageTitle + "</a>\n                      </div>\n                </div>\n                <div>\n                  " + divItems.innerHTML + "\n                </div>\n              </div>\n            </div>");
                                            content.setAttribute("style", "background:url('" + borderImageUrl + "') repeat-y 34px;");
                                            content.prepend(leftNav);
                                            _this._setAccordion();
                                        });
                                    }
                                }, 500);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PageNavigationWebPart.prototype._getChildPageNum = function (pageId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Service.GetChildPages(pageId).then(function (items) {
                            // console.log("Child Page Count : " + items.length);
                            return items.length;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PageNavigationWebPart.prototype._setAccordion = function () {
        var acc = document.getElementsByClassName(styles.accordion);
        var i;
        for (i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function () {
                this.classList.toggle(styles.active);
                var panel = this.nextElementSibling;
                console.log("Page Id selected : " + this.getAttribute("key"));
                var SelectedPageId = this.getAttribute("key");
                if (panel.innerHTML.length < 20) {
                    Service.GetChildPages(SelectedPageId).then(function (items) {
                        // Alphabetical order sorting
                        items.sort(function (a, b) { return a.Title.localeCompare(b.Title); });
                        var divItems = document.createElement("div");
                        divItems.innerHTML = items.map(function (item) {
                            return ("<div class=" + styles.row + " key=" + item.FieldValuesAsText.ID + ">\n                <div class=" + styles.column + ">\n                  <a data-interception='off' href=\"" + (document.location.href.split("/SitePages")[0] + '/SitePages/' + item.FieldValuesAsText.FileLeafRef) + "\">" + item.Title + "</a>\n                </div>\n              </div>");
                        }).join('');
                        panel.innerHTML = divItems.innerHTML;
                    });
                }
                // Show & Hide Panel
                if (panel.style.display == "none") {
                    panel.style.display = "block";
                }
                else {
                    panel.style.display = "none";
                }
            });
        }
    };
    return PageNavigationWebPart;
}(BaseClientSideWebPart));
export default PageNavigationWebPart;
//# sourceMappingURL=PageNavigationWebPart.js.map