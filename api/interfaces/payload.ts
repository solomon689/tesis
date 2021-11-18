import { UserPosition } from './user-position';

export interface Payload {
    hour?: string;
    roomId?: string;
    record?: string;
    message?: string;
    answer?: boolean;
    typeOfAlert?: string;
    typeOfRecord?: string;
    userPosition?: UserPosition;
}