import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormArray,
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

import { Meal } from 'src/health/shared/services/meals/meals.service';

@Component({
  selector: 'app-meal-form',
  templateUrl: './meal-form.component.html',
  styleUrls: ['./meal-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MealFormComponent implements OnInit, OnChanges {
  @Input() meal: {} | Meal | null = null;
  @Output() create = new EventEmitter<Meal>();
  @Output() update = new EventEmitter<Meal>();
  @Output() delete = new EventEmitter<Meal>();

  form = this.formBuilder.group({
    name: ['', Validators.required],
    ingredients: this.formBuilder.array(['']),
  });

  toggled: boolean = false;
  exists: boolean = false;

  constructor(private formBuilder: FormBuilder) {}
  get required() {
    return (
      this.form.get('name')?.hasError('required') &&
      this.form.get('name')?.touched
    );
  }

  get ingredients() {
    return this.form.get('ingredients') as FormArray;
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.meal.currentValue.name) {
      this.exists = true;

      const value = this.meal;
      this.form.patchValue(value as { [key: string]: any });

      this.emptyIngredients();

      if (
        value &&
        value?.hasOwnProperty('ingredients') &&
        (value as Meal)?.ingredients
      ) {
        for (const item of (value as Meal)?.ingredients) {
          this.ingredients.push(new FormControl(item));
        }
      }
    }
  }

  emptyIngredients() {
    while (this.ingredients.controls.length) {
      this.ingredients.removeAt(0);
    }
  }

  toggle() {
    this.toggled = !this.toggled;
  }

  createMeal() {
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }

  updateMeal() {
    if (this.form.valid) {
      this.update.emit(this.form.value);
    }
  }

  removeMeal() {
    this.delete.emit(this.form.value);
  }

  addIngredient() {
    this.ingredients.push(new FormControl(''));
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }
}
