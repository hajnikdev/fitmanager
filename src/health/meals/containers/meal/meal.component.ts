import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import {
  Meal,
  MealsService,
} from 'src/health/shared/services/meals/meals.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss'],
})
export class MealComponent implements OnInit, OnDestroy {
  meal$?: Observable<Meal | {} | undefined>;
  subscrition?: Subscription;

  constructor(
    private mealsService: MealsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscrition = this.mealsService.meals$?.subscribe();
    this.meal$ = this.route.params.pipe(
      switchMap((param) => {
        return this.mealsService.getMeal(param.id);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscrition?.unsubscribe();
  }

  async addMeal(event: Meal) {
    try {
      await this.mealsService.addMeal(event);
      this.backToMeals();
    } catch (error) {
      this.router.navigate(['auth/login']);
    }
  }

  async updateMeal(event: Meal) {
    const key = this.route.snapshot.params.id;
    await this.mealsService.updateMeal(key, event);
    this.backToMeals();
  }

  async deleteMeal(event: Meal) {
    const key = this.route.snapshot.params.id;
    await this.mealsService.removeMeal(key);
    this.backToMeals();
  }

  backToMeals() {
    this.router.navigate(['meals']);
  }
}
