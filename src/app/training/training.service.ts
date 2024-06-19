import { BehaviorSubject, Subject } from 'rxjs';
import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';
import { FirestoreService } from '../firestore.service';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  exerciseChanged = new Subject<Exercise | null>();
  availableExercisesChanged = new BehaviorSubject<Exercise[]>([]);

  private _availableExercises: Exercise[] = [];
  private runningExercise: Exercise | undefined | null;
  private exercises: Exercise[] = [];

  constructor(private firestoreService: FirestoreService) {
    this.fetchAvailableExercises();
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  public get availableExercises(): Exercise[] {
    return this._availableExercises.slice();
  }
  public set availableExercises(value: Exercise[]) {
    this._availableExercises = value;
    this.availableExercisesChanged.next([...this._availableExercises]);
  }

  fetchAvailableExercises() {
    this.firestoreService.getExercises().subscribe((exercises: Exercise[]) => {
      this.availableExercises = exercises;
    });
  }

  startExercise(exerciseName: string) {
    const selectedExercise = this.availableExercises.find(
      (element) => element.name === exerciseName
    );

    if (selectedExercise) {
      this.runningExercise = selectedExercise;
      this.exerciseChanged.next({ ...this.runningExercise });
    }
  }

  completeExercise() {
    if (this.runningExercise) {
      this.exercises.push({
        ...this.runningExercise,
        date: new Date(),
        state: 'completed',
      });
      this.runningExercise = null;
      this.exerciseChanged.next(null);
    }
  }

  cancelExercise(progress: number) {
    if (this.runningExercise) {
      this.exercises.push({
        ...this.runningExercise,
        duration: this.runningExercise.duration * (progress / 100),
        calories: this.runningExercise.calories * (progress / 100),
        date: new Date(),
        state: 'cancelled',
      });
      this.runningExercise = null;
      this.exerciseChanged.next(null);
    }
  }

  getCompletedOrCancelledExercises() {
    return this.exercises.slice();
  }
}
