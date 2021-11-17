export interface Message {
    hour: string;
    title: string;
    message: string;
    record: string;
    typeRecord: string;
}

export interface Record {
    hour: string;
    message: string;
    typeRecord?: string;
}