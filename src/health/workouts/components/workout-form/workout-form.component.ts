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

import { Workout } from 'src/health/shared/services/workouts/workouts.service';

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkoutFormComponent implements OnInit, OnChanges {
  @Input() workout: {} | Workout | null = null;
  @Output() create = new EventEmitter<Workout>();
  @Output() update = new EventEmitter<Workout>();
  @Output() delete = new EventEmitter<Workout>();

  form = this.formBuilder.group({
    name: ['', Validators.required],
    type: 'strength',
    strength: this.formBuilder.group({
      reps: 0,
      sets: 0,
      weight: 0,
    }),
    endurance: this.formBuilder.group({
      distance: 0,
      duration: 0,
    }),
  });

  toggled: boolean = false;
  exists: boolean = false;

  constructor(private formBuilder: FormBuilder) {}
  get placeholder() {
    return `e.g. ${
      this.form.get('type')?.value === 'strength' ? 'Benchpress' : 'Treadmill'
    }`;
  }
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
    if (changes.workout.currentValue.name) {
      this.exists = true;
      const value = this.workout;
      this.form.patchValue(value as { [key: string]: any });
    }
  }

  toggle() {
    this.toggled = !this.toggled;
  }

  createWorkout() {
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }

  updateWorkout() {
    if (this.form.valid) {
      this.update.emit(this.form.value);
    }
  }

  removeWorkout() {
    this.delete.emit(this.form.value);
  }
}
