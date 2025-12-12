import { computed, inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, docData, Firestore, getDocs, orderBy, query, Timestamp } from '@angular/fire/firestore';
import { async, map, Observable } from 'rxjs';

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

interface MapEntry {
  map: string,
  pins: Pin[],
}
@Injectable({
  providedIn: 'root'
})
export class PinsService {
  firestore: Firestore = inject(Firestore);

  public pins$: Observable<Pin[]> = new Observable();
  public map_url$: Observable<MapEntry[]> = new Observable();
  
  constructor() { 
    this.load_map("default-map")
  }

  public async load_map(map_name: string) {
    const map_collection = collection(this.firestore, 'mapping-application');

    const q = query(map_collection);
    const data = collectionData<Partial<MapEntry>>(q);

    // Note: https://www.youtube.com/watch?v=zX_d2jat8ng
    const records = await getDocs(q);
    const testData = records.docs.map(record => {
      const x = record.data();
      return {  // Converting record to full FirestoreRec
          map: x['map'] || "",
          pins: x['pins'] || [],
        }
    })

    console.log(testData)

    // this.map_url$ = data.pipe(map(val => {  // Confusingly, this map gets the whole list
    //   return val.map(record => { // The function here recieve each incoming record
    //     return {  // Converting record to full FirestoreRec
    //       map: record.map || "",
    //       pins: record.pins || [],
    //     }
    //   })
    // }));

    // const thisDoc = doc(this.firestore, 'mapping_application/' + encodeURIComponent(map_name))
    // const thisDocData = docData(thisDoc);

    // console.log(thisDocData);

    // this.map_url$ = thisDocData.pipe(map(val => {
    //   return (val) ? val['map'] || '' : '';
    // }))    

    // The encoding prevents injection attacks
    // const map_ref = doc(this.firestore, 'mapping_application/' + encodeURIComponent(map_name));

    // const pin_collection = collection(map_ref, "pins");

    // const q = query(pin_collection); // Note: If we want to order it a certain way, add that here
    // const data = collectionData<Partial<Pin>>(q);
    
    // // Here we use pipe to change one oberserval to another with default values
    // this.pins$ = data.pipe(map(val => {  // Confusingly, this map gets the whole list
    //   return val.map(record => { // The function here recieve each incoming record
    //     return {  // Converting record to full FirestoreRec
    //       x: record.x ?? 0,
    //       y: record. y ?? 0,
    //       icon: record.icon ?? "defaultIconURI",
    //       name: record.name ?? "default",
    //       description: record.description ?? "",
    //       ... record
    //     }
    //   })
    // }));
  }
}
