import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import {
  Workout,
  WorkoutsService,
} from 'src/health/shared/services/workouts/workouts.service';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss'],
})
export class WorkoutComponent implements OnInit, OnDestroy {
  workout$?: Observable<Workout | {} | undefined>;
  subscrition?: Subscription;

  constructor(
    private workoutsService: WorkoutsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscrition = this.workoutsService.workouts$?.subscribe();
    this.workout$ = this.route.params.pipe(
      switchMap((param) => {
        return this.workoutsService.getWorkout(param.id);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscrition?.unsubscribe();
  }

  async addWorkout(event: Workout) {
    try {
      await this.workoutsService.addWorkout(event);
      this.backToWorkouts();
    } catch (error) {
      this.router.navigate(['auth/login']);
    }
  }

  async updateWorkout(event: Workout) {
    const key = this.route.snapshot.params.id;
    await this.workoutsService.updateWorkout(key, event);
    this.backToWorkouts();
  }

  async deleteWorkout(event: Workout) {
    const key = this.route.snapshot.params.id;
    await this.workoutsService.removeWorkout(key);
    this.backToWorkouts();
  }

  backToWorkouts() {
    this.router.navigate(['workouts']);
  }
}
