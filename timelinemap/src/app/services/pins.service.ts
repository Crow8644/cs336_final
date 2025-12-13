import { computed, inject, Injectable, signal, Signal } from '@angular/core';
import { addDoc, collection, collectionData, doc, docData, documentId, Firestore, getDocs, orderBy, query, Timestamp, where } from '@angular/fire/firestore';
import { DomSanitizer } from '@angular/platform-browser';
import { async, map, Observable } from 'rxjs';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { deleteDoc } from '@firebase/firestore';

const default_icon = "default";

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

const default_pin: Pin = {
  x: 20,
  y: 20,
  name: "blank",
  icon: default_icon,
  description: "",
}

@Injectable({
  providedIn: 'root'
})
export class PinsService {
  firestore: Firestore = inject(Firestore);
  sani = inject(DomSanitizer);
  storage = getStorage();

  // public pins$: Observable<Pin[]> = new Observable();
  // public map_url$: Observable<MapEntry[]> = new Observable();

  public pins = signal<Pin[]>([]);
  private map_url = signal<string>("");

  public safe_map_url = computed(() => this.sani.bypassSecurityTrustResourceUrl(encodeURI(this.map_url())))
  
  constructor() { 
    this.load_map("default-map")
  }

  public async load_map(map_name: string) {
    let map_id = "";
    const map_collection = collection(this.firestore, 'mapping-application');

    // Also this: https://javascript.plainenglish.io/querying-firestore-for-documents-with-an-array-of-ids-c76d3081c5ef
    const q = query(map_collection, where(documentId(), "==", map_name));

    // Helpful tutorial: https://www.youtube.com/watch?v=zX_d2jat8ng
    const records = await getDocs(q);
    const testData = records.docs.map(record => {
      const x = record.data();
      return {  // Converting record to full FirestoreRec
          map: x['map'] || "",
          pins: x['pins'] || [],
        }
    })

    console.log(testData);

    map_id = testData[0].map;
    this.pins.set(testData[0].pins);

    // A post that helped me figure out what to do here: https://stackoverflow.com/questions/76571331/using-async-await-in-angular-computed-signal
    this.map_url.set( await getDownloadURL(ref(this.storage, encodeURI(map_id))) )
  }

  // Good site: https://www.bezkoder.com/angular-17-firestore-crud/

  public addPin(map_name: string, pin: Partial<Pin>) {
    const collection_ref = collection(this.firestore, ('mapping-application' + encodeURIComponent(map_name) + 'pins'));

    addDoc(collection_ref, {
      x: pin.x ?? 20,
      y: pin.y ?? 20,
      icon: pin.icon ?? default_icon,
      name: pin.name ?? "blank",
      description: pin.description ?? "",
      
      startTime: pin.startTime,
      endTime: pin.endTime,
    })
  }

  public deletePin(map_name: string, pinID: string) {
    const collection_ref = collection(this.firestore, ('mapping-application' + encodeURIComponent(map_name) + 'pins'));

    const pin_ref = doc(collection_ref, pinID); // Selector for the specific pin with that the passed id

    deleteDoc(pin_ref);
  }

  //TODO, determine type of file
  public async makeMap(file: any, filename: string, mapName: string) {
    const storage_ref = ref(this.storage, filename);

    await uploadBytes(storage_ref, file);

    const map_collection = collection(this.firestore, 'mapping-application');

    const doc_ref = await addDoc(map_collection, {map: filename});
    
    const pins_ref = collection(doc_ref, 'pins');

    addDoc(pins_ref, default_pin);
  }
}
