import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Case, ArrayResponse, Category, Initiative, Location } from '../models';
import { CaseService } from '../services/case/case.service';
import { CategoryService } from '../services/category/category.service';
import { Subscription } from 'rxjs';
import { InitiativeService } from '../services/initiative/initiative.service';
import { UserLoginService } from '../../service/user-login.service';
import { LocationService } from '../services/location/location.service';

@Component({
    selector: 'app-list-initiatives',
    templateUrl: './list-initiatives.component.html',
    styleUrls: ['./list-initiatives.component.css'],
})
export class ListInitiativesComponent implements OnInit, OnDestroy {
    keyword: string;
    selectedCategory: string;
    categories: Category[] = [];
    locations: Location[] = [];
    sub: Subscription;
    data: ArrayResponse<Initiative> = new ArrayResponse<Initiative>();
    public count = 10;
    isSecure = false;

    constructor(
        private route: ActivatedRoute,
        private initiativeService: InitiativeService,
        private categoryService: CategoryService,
        private locationService: LocationService,
        private auth: UserLoginService
    ) { }

    refresh(loadMore: boolean): void {
        this.initiativeService.get(this.keyword, this.count, this.data.result.LastEvaluatedKey)
            .subscribe(data => {
                if (loadMore) {
                    this.data.result.ScannedCount += data.result.ScannedCount;
                    this.data.result.Items = [
                        ...this.data.result.Items,
                        ...data.result.Items
                    ];
                    this.data.result.LastEvaluatedKey = data.result.LastEvaluatedKey;
                } else {
                    this.data = new ArrayResponse<Initiative>(data);
                }
            });
    }

    ngOnInit(): void {
        this.sub = this.route.queryParams
            .subscribe(params => this.selectedCategory = params.category);
        this.auth.isLoggedIn$.subscribe((isLoggedIn: boolean) => this.isSecure = isLoggedIn);
        this.categoryService.get()
            .subscribe(data => this.categories = new ArrayResponse(data).result.Items.map(c => new Category(c)));
        this.locationService.get()
            .subscribe(data => this.locations = new ArrayResponse(data).result.Items.map(c => new Location(c)));
        this.refresh(false);
    }

    loadMore(): void {
        this.refresh(true);
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
