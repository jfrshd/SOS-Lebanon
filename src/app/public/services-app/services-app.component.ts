import { Component, OnInit } from '@angular/core';
import { Category, ArrayResponse } from '../models';
import { CategoryService } from '../services/category/category.service';

@Component({
  selector: 'app-services-app',
  templateUrl: './services-app.component.html',
  styleUrls: ['./services-app.component.css']
})
export class ServicesAppComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.get()
      .subscribe(data => this.categories = new ArrayResponse<Category>(data).result.Items);
  }

  imageError(element, category: Category): void {
    const image = location.origin + '/assets/landing%20page/pictures/' + (category.image || '') + '.png';
    if (element.src && element.src === image) {
      element.src = './assets/landing page/pictures/not found.png';
    } else {
      element.src = image;
    }
  }
}
