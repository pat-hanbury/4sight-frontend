import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Area, Feed, Count } from './models'

import { HttpClient } from '@angular/common/http';

const BASE_API_URL = "http://0.0.0.0:5000"

// takes a f_id and gets a url to a feed
const FEED_BY_ID = (id: number) => BASE_API_URL + "/feed/" + id;
interface API_Feed {
  a_id: number;
  f_id: number;
  f_name: string;
  url: string;
}

// Get all the areas as a list
const GET_ALL_AREAS = BASE_API_URL + "/areas";  // {areas: [Area, Area, Area, ...]}
interface API_Area_From_Areas {
  a_id: number; 
  a_name: string;
  // img: string;  // might be a different type
}
interface API_Areas {
  areas: API_Area_From_Areas[];
}

// Get a specific area by id. includes a list of feeds and the counts
const GET_AREA_BY_ID = (id: number) => BASE_API_URL + "/area_feeds/" + id;
interface API_Area {
  a_id: number;
  a_name: string;
  count: number; 
  feeds: {
    f_id: number;
    f_name: string; 
    url: string
  }[]  // an Array of f_id, f_name, and url;
}


// Get the past counts as a list of lists (date, count)
const GET_PAST_COUNT_BY_ID = (id: number) => BASE_API_URL + "/counts/" + id;  
export interface API_Past_Count {
  a_id: number;
  a_name: string; 
  counts:[string, number][];
}


// Get the past counts as a list of lists (date, count)
const GET_PREDICTION_COUNT_BY_ID = (id: number) => BASE_API_URL + "/predictions/" + id;
export interface API_Prediction_Count {
  a_id: number;
  a_name: string; 
  prediction:[string, number][];
}  


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  getAreas(): Observable<API_Areas> {
    return this.httpClient.get<API_Areas>(GET_ALL_AREAS);
  }

  getArea(id: number): Observable<API_Area> {
    return this.httpClient.get<API_Area>(GET_AREA_BY_ID(id));
  }

  getPastCount(id: number): Observable<API_Past_Count> {
    return this.httpClient.get<API_Past_Count>(GET_PAST_COUNT_BY_ID(id));
  }

  getPredictionCount(id: number): Observable<API_Prediction_Count> {
    return this.httpClient.get<API_Prediction_Count>(GET_PREDICTION_COUNT_BY_ID(id));
  }

  getFeed(id: number): Observable<API_Feed> {
    return this.httpClient.get<API_Feed>(FEED_BY_ID(id));
  }


  // Functions used to convert api data types to model data types

  toFeed(api_feed: API_Feed) : Feed {
    return {
      id: api_feed.f_id,
      area_id: api_feed.a_id,
      name: api_feed.f_name,
      url: api_feed.url
    };
  }

  toArea(api_area: API_Area) : Area {
    var feeds: Feed[] = []
    for (var i = 0; i < api_area.feeds.length; i++) {
      feeds.push(this.toListFeed_(api_area.a_id, api_area.feeds[i]))
    }
    var rv =  {
      id: api_area.a_id,
      name: api_area.a_name,
      img: '',
      count: api_area.count,
      feeds: feeds
    };
    return rv;
  }

  toAreas(api_areas: API_Areas) : Area[] {
    var rv: Area[] = [];
    for (var i = 0; i < api_areas.areas.length; i++) {
      rv.push(this.toListArea_(api_areas.areas[i]))
    }
    return rv;
  }

  toCountsPast(api_past_count: API_Past_Count) : Count[] {
    console.log("toCountsPast");
    return this.toCountsFromArray_(api_past_count.counts);
  }

  toCountsPrediction(api_prediction_count: API_Prediction_Count) : Count[] {
    console.log("toCountsPrediction");
    return this.toCountsFromArray_(api_prediction_count.prediction);
  }


  // helper converters 

  private toListArea_(api_area_from_areas: API_Area_From_Areas) : Area {
    return {
      id: api_area_from_areas.a_id,
      name: api_area_from_areas.a_name,
      img: '', //api_area_from_areas.img,
      count: 0,
      feeds: []
    }
  }

  private toListFeed_(api_area_id: number, api_feed_from_feeds: {f_id: number,f_name: string, url: string}) : Feed {
    return {
      id: api_feed_from_feeds.f_id,
      area_id: api_area_id,
      name: api_feed_from_feeds.f_name,
      url: api_feed_from_feeds.url
    }
  }

  private toCountsFromArray_(arr: [string, number][]) : Count[] {
    var rv: Count[] = [];
    for (var i = 0; i < arr.length; i++) {
      rv.push({date: arr[0][0], count: arr[0][1]})
    }
    return rv;
  }
}
