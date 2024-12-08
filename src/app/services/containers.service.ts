import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ContainerResponse,
  ContainerSaidaBody,
  ValidatorTag,
} from '../interface/default.interface';

@Injectable({
  providedIn: 'root',
})
export class ContainersService {
  constructor(private httpClient: HttpClient) {}

  access(DEPOT: string): Observable<any> {
    const payload = { DEPOT };
    return this.httpClient.post('/api/integra/access/get', payload);
  }

  create(body: ContainerResponse): Observable<any> {
    return this.httpClient.post('url', body);
  }

  exit(body: ContainerSaidaBody): Observable<any> {
    return this.httpClient.post('saida', body);
  }

  liberationTag(body: ValidatorTag): Observable<any> {
    return this.httpClient.post('validate', body);
  }
}
