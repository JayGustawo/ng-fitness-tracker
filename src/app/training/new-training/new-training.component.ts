import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FlexModule } from '@angular/flex-layout';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-training',
  standalone: true,
  imports: [MaterialModule, FlexModule],
  templateUrl: './new-training.component.html',
  styleUrl: './new-training.component.scss',
})
export class NewTrainingComponent implements OnInit {
  exercises!: Observable<Exercise[]>;

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.exercises = this.trainingService.availableExercisesChanged;
    // *** Alternative ***
    // this.trainingService.availableExercisesChanged.subscribe(
    //   (exercises: Exercise[]) => {
    //     this.exercises = exercises;
    //   }
    // );
  }

  onStartTraining(form: NgForm) {
    console.log(form.value);

    this.trainingService.startExercise(form.value.exerciseName);
  }
}
