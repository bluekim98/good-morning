import { EdgeDto } from '.';

export class ServiceStatus<T = any> {
    status: boolean;
    statusCode?: number;
    data?: T | T[];
    edge?: EdgeDto;
    error?: any;
}
