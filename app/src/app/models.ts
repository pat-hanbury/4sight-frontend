// This is a file with types that are returned from the API
// it is just helpful for typing each variable

export interface Feed {
    id: number;
    area_id: number;
    name: string;
    url: string;
}

export interface Area {
    id: number;
    name: string;
    img: string;  // TODO: this should be a type ...
    count: number;
    feeds: Feed[];
}

export interface Count {
    date: string;
    count: number;
}
