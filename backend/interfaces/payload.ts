import { UserPosition } from './user-position';

export interface Payload {
    roomId?: string;
    record?: string;
    message?: string;
    answer?: boolean;
    typeOfAlert?: string;
    typeOfRecord?: string;
    userPosition?: UserPosition;
}