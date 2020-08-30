import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "tabs",
    component: TabsPage,
    children: [
      {
        path: "products/",
        loadChildren: () =>
          import("../products/products.module").then(
            (m) => m.ProductsPageModule
          ),
      },
      {
        path: "products/:searchKey/:searchValue",
        loadChildren: () =>
          import("../products/products.module").then(
            (m) => m.ProductsPageModule
          ),
      },
      {
        path: "product-details/:id",
        loadChildren: () =>
          import("../product-details/product-details.module").then(
            (m) => m.ProductDetailsPageModule
          ),
      },
      {
        path: "about",
        loadChildren: () =>
          import("../about/about.module").then((m) => m.AboutPageModule),
      },
      {
        path: "contact",
        loadChildren: () =>
          import("../contact/contact.module").then((m) => m.ContactPageModule),
      },
      {
        path: "cart",
        loadChildren: () =>
          import("../cart/cart.module").then((m) => m.CartPageModule),
      },
      {
        path: "",
        redirectTo: "products",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "",
    redirectTo: "/tabs/products/",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
