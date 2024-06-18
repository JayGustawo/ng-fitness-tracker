import { Subject } from 'rxjs';
import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  exerciseChanged = new Subject<Exercise | null>();
  private _availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 5, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 10, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 12, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 8, calories: 8 },
  ];

  private runningExercise: Exercise | undefined | null;
  private exercises: Exercise[] = [];

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  public get availableExercises(): Exercise[] {
    return this._availableExercises.slice();
  }
  public set availableExercises(value: Exercise[]) {
    this._availableExercises = value;
  }

  startExercise(selectedId: string) {
    const selectedExercise = this.availableExercises.find(
      (element) => element.id === selectedId
    );
    console.log(selectedExercise);

    if (selectedExercise) {
      this.runningExercise = selectedExercise;
      this.exerciseChanged.next({ ...this.runningExercise });
      console.log(this.runningExercise);
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
