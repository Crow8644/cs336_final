import { inject, Injectable } from '@angular/core';
import { collection, collectionData, doc, documentId, Firestore, getDoc, query } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';

interface Pin {
  // Even in a real pin, these can be undefined, meaning there was no start or no end time
  startTime?: number,
  endTime?: number,
  x: number,
  y: number,
  icon: string,
  name: string,
  description: string,
}
@Injectable({
  providedIn: 'root'
})
export class PinsService {
  firestore: Firestore = inject(Firestore);

  public pins$: Observable<Pin[]> = new Observable<Pin[]>();
  public map_url$: Observable<string> = new Observable<string>();
  
  constructor() { 

  }

  load_map(map_name: string) {
    // The encoding prevents injection attacks
    const map_ref = doc(this.firestore, 'mapping_application/' + encodeURIComponent(map_name));

    const pin_collection = collection(map_ref, "pins");

    const q = query(pin_collection); // Note: If we want to order it a certain way, add that here
    const data = collectionData<Partial<Pin>>(q);
    
    // Here we use pipe to change one oberserval to another with default values
    this.pins$ = data.pipe(map(val => {  // Confusingly, this map gets the whole list
      return val.map(record => { // The function here recieve each incoming record
        return {  // Converting record to full FirestoreRec
          x: record.x ?? 0,
          y: record. y ?? 0,
          icon: record.icon ?? "defaultIconURI",
          name: record.name ?? "default",
          description: record.description ?? "",
          ... record
        }
      })
    }));
  }
}
