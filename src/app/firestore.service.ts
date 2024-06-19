import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  getDocs,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { addDoc, doc, deleteDoc } from 'firebase/firestore';
import { Exercise } from './training/exercise.model';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: Firestore) {}

  getExercises(): Observable<Exercise[]> {
    const exercisesCollection = collection(this.firestore, 'availableExercises');
    return collectionData(exercisesCollection) as Observable<Exercise[]>;
  }

  addExercise(exercise: Exercise) {
    const exercisesCollection = collection(this.firestore, 'availableExercises');
    return addDoc(exercisesCollection, exercise);
  }

  deleteExercise(id: string) {
    const exerciseDoc = doc(this.firestore, `availableExercises/${id}`);
    return deleteDoc(exerciseDoc);
  }
}
