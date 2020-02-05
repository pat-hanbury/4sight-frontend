import { Injectable } from '@angular/core';
import { Area, Feed } from './models';
import { AREAS } from './mock-areas';
import { Observable, of } from 'rxjs';

const BASE_API_URL = "http://0.0.0.0:5000/"
const FEED_API_URL = (id: number) => BASE_API_URL + "video_feed?vid=" + id;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  getAreas(): Observable<Area[]> {
    return of(AREAS);
  }

  getArea(id: number): Observable<Area> {
    return of(AREAS.find(area => area.id === id));
  }

  getFeed(feed_id: number): Observable<Feed> {
    var temp: Feed = {id: feed_id,
                      name: "A feed",
                      count: 10,
                      url: FEED_API_URL(feed_id),
                    };
    return of(temp);
  }
}
