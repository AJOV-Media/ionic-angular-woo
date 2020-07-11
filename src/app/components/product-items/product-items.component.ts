import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-product-items",
  templateUrl: "./product-items.component.html",
  styleUrls: ["./product-items.component.scss"],
})
export class ProductItemsComponent implements OnInit {
  @Input() productItems: any[];

  constructor() {}

  ngOnInit() {}
}
