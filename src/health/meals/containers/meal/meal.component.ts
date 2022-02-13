import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  Meal,
  MealsService,
} from 'src/health/shared/services/meals/meals.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss'],
})
export class MealComponent implements OnInit {
  constructor(private mealsService: MealsService, private router: Router) {}

  ngOnInit(): void {}

  async addMeal(event: Meal) {
    try {
      await this.mealsService.addMeal(event);
      this.backToMeals();
    } catch (error) {
      this.router.navigate(['auth/login']);
    }
  }

  backToMeals() {
    this.router.navigate(['meals']);
  }
}
