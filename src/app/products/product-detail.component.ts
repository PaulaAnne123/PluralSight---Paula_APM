import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  pageTitle: string = 'Product Detail';
  product: IProduct | undefined;
  imageWidth: number = 50;
  imageMargin: number = 2;
  cardWidth: number = 600;
  cardHeight: number = 50;
  errorMessage: string = '';
  sub!: Subscription;
  products: IProduct[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) { }
  
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pageTitle += `: ${id}`;

    this.sub = this.productService.getProducts().subscribe({
      next: products => {
          this.products = products;
          this.product = this.getProducts(id)[0];
      },      
      error: err => this.errorMessage = err
  });
}

getProducts(id: number): any{
  return this.products.filter(x => x.productId == id)
}

  onBack(): void {
    this.router.navigate(['/products']);
  }
}
