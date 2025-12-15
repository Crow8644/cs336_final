import { computed, inject, Injectable, signal, Signal } from '@angular/core';
import { addDoc, collection, collectionData, doc, docData, documentId, Firestore, getDocs, orderBy, query, Timestamp, where } from '@angular/fire/firestore';
import { DomSanitizer } from '@angular/platform-browser';
import { async, map, Observable } from 'rxjs';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { deleteDoc, setDoc, updateDoc } from '@firebase/firestore';
import { toSignal } from '@angular/core/rxjs-interop';

const default_icon = "Flag";

export interface Pin {
  id: string,
  // Even in a real pin, these can be undefined, meaning there was no start or no end time
  startTime?: number,
  endTime?: number,
  x: number,
  y: number,
  icon: string,
  name: string,
  description: string,

  timestamp?: Timestamp,
}

const default_pin: Pin = {
  x: 0.5,
  y: 0.5,
  name: "blank",
  icon: default_icon,
  description: "",
  id: "",
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
  private current_map_name = "default-map";

  public safe_map_url = computed(() => this.sani.bypassSecurityTrustResourceUrl(encodeURI(this.map_url())))
  
  constructor() { 
    this.load_map("default-map")
  }

  public async load_map(map_name: string) {
    this.current_map_name = map_name;
    let map_image_id = "";
    const map_collection = collection(this.firestore, 'mapping-application');

    // Also this: https://javascript.plainenglish.io/querying-firestore-for-documents-with-an-array-of-ids-c76d3081c5ef
    const q = query(map_collection, where(documentId(), "==", map_name));

    // Helpful tutorial: https://www.youtube.com/watch?v=zX_d2jat8ng
    const records = await getDocs(q);
    const mapData = records.docs.map(record => {
      const x = record.data();
      return {  // Converting record to full FirestoreRec
          map: x['map'] || "",
          pins: collection(this.firestore, record.ref.path, 'pins'),
        }
    })

    map_image_id = mapData[0].map;

    // The timestamp field in the database is used to order records by creation time, but is not included in the Pin data itself
    const q2 = query(mapData[0].pins, orderBy('timestamp'))
    const pin_data = collectionData<Partial<Pin>>(q2, {idField: 'id'})
    
    // Turns and an observable into a signal for outside use
    pin_data.subscribe(data => this.pins.set(data.map(record => {
      return {
          x: record.x ?? 0.5,
          y: record.y ?? 0.5,
          icon: record.icon ?? default_icon,
          name: record.name ?? "blank",
          description: record.description ?? "",
          id: record.id || "",
          
          startTime: record.startTime,
          endTime: record.endTime,
          timestamp: record.timestamp,
        }})
    ))

    // A post that helped me figure out what to do here: https://stackoverflow.com/questions/76571331/using-async-await-in-angular-computed-signal
    this.map_url.set( await getDownloadURL(ref(this.storage, encodeURI(map_image_id))) )
  }

  // Good site: https://www.bezkoder.com/angular-17-firestore-crud/

  public async addPin(pin: Partial<Pin>) {
    const collection_ref = collection(this.firestore, ('mapping-application/' + encodeURIComponent(this.current_map_name) + '/pins'));

    const ref = await addDoc(collection_ref, {
      x: pin.x ?? 0.5,
      y: pin.y ?? 0.5,
      icon: pin.icon ?? default_icon,
      name: pin.name ?? "blank",
      description: pin.description ?? "",
      timestamp: Timestamp.now(),
      
      // Interesting note, Firebase does not support undefined
      startTime: pin.startTime ?? 0,
      endTime: pin.endTime ?? Number.MAX_VALUE,
    })

    return ref;
  }

  public async updatePin(pin: Partial<Pin>) {
    const doc_ref = doc(this.firestore, ('mapping-application/' + encodeURIComponent(this.current_map_name) + '/pins/' + encodeURIComponent(pin.id ?? "")));
    delete pin.id; // A built-in js feature to remove a field from an object

    await updateDoc(doc_ref, pin);
  }

  public deletePin(pinID: string) {
    const collection_ref = collection(this.firestore, ('mapping-application' + encodeURIComponent(this.current_map_name) + 'pins'));

    const pin_ref = doc(collection_ref, pinID); // Selector for the specific pin with that the passed id

    deleteDoc(pin_ref);
  }

  //TODO, determine type of file
  public async makeMap(file: any, filename: string, mapName: string) {
    // Adding the image to the storage
    const storage_ref = ref(this.storage, filename);
    await uploadBytes(storage_ref, file);

    // Creating the general doc. Using setDoc instead of addDoc so we can chose the id
    const mapping_doc = doc(this.firestore, 'mapping-application', encodeURIComponent(mapName));
    await setDoc(mapping_doc, {map: filename});
    
    // Adding the pin
    const pins_ref = collection(mapping_doc, 'pins');
    addDoc(pins_ref, default_pin);
  }
}
