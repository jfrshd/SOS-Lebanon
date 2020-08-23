import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Case, ArrayResponse, Category, Location } from '../models';
import { CaseService } from '../services/case/case.service';
import { CategoryService } from '../services/category/category.service';
import { Subscription } from 'rxjs';
import { UserLoginService } from 'src/app/service/user-login.service';
import { LocationService } from '../services/location/location.service';

@Component({
    selector: 'app-list-cases',
    templateUrl: './list-cases.component.html',
    styleUrls: ['./list-cases.component.css'],
})
export class ListCasesComponent implements OnInit, OnDestroy {
    keyword: string;
    selectedCategory: string;
    categories: Category[] = [];
    locationsKvp: any = {};
    sub: Subscription;
    data: ArrayResponse<Case> = new ArrayResponse<Case>();
    public count = 10;
    isSecure = false;

    constructor(
        private route: ActivatedRoute,
        private caseService: CaseService,
        private categoryService: CategoryService,
        private locationService: LocationService,
        private auth: UserLoginService
    ) { }

    refresh(loadMore: boolean): void {
        const selectedCategory = this.categories.find(c => c.name === this.selectedCategory) || new Category();
        this.caseService.get(selectedCategory.id, this.keyword, this.count, this.data.result.LastEvaluatedKey)
            .subscribe(data => {
                if (loadMore) {
                    this.data.result.ScannedCount += data.result.ScannedCount;
                    this.data.result.Items = [
                        ...this.data.result.Items,
                        ...data.result.Items
                    ];
                    this.data.result.LastEvaluatedKey = data.result.LastEvaluatedKey;
                } else {
                    this.data = new ArrayResponse<Case>(data);
                }
            });
    }

    ngOnInit(): void {
        this.sub = this.route.queryParams
            .subscribe(params => this.selectedCategory = params.category);
        this.categoryService.get()
            .subscribe(data => this.categories = new ArrayResponse<Category>(data).result.Items);
        this.locationService.get()
            .subscribe(data => {
                const locations = new ArrayResponse<Location>(data).result.Items;
                this.locationsKvp = {};
                locations.forEach(location => this.locationsKvp[location.id] = location.name);
            });
        this.auth.isLoggedIn$.subscribe((isLoggedIn: boolean) => this.isSecure = isLoggedIn);
        this.refresh(false);
    }

    loadMore(): void {
        this.refresh(true);
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
