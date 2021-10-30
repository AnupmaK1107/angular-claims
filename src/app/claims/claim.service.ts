import { Claims } from './../models/claims';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpRouteGetter } from 'src/helpers/httpRouteGetter';
import { ClaimTypes } from '../models/claimTypes';


@Injectable({
  providedIn: 'root'
})
export class ClaimService {

  constructor(
    private httpClient: HttpClient
  ) { }

  httpRouteGetter: HttpRouteGetter = new HttpRouteGetter();

  getAllClaims() : Observable<Claims[]>  {
    const route = this.httpRouteGetter.httpRoute + 'claims/getClaimsList';
    return this.httpClient.get<Claims[]>(route).pipe(catchError(this.handleError));
  }

  getClaimTypes() : Observable<ClaimTypes[]>  {
    const route = this.httpRouteGetter.httpRoute + 'claims/getClaimTypes';
    return this.httpClient.get<ClaimTypes[]>(route).pipe(catchError(this.handleError));
  }

  addClaim(claim: any) : Observable<string>  {     
    const route = this.httpRouteGetter.httpRoute + 'claims/addClaim';    
    return this.httpClient.post<string>(route, claim ).pipe(catchError(this.handleError));
  }

  deleteClaim(claimId: number) : Observable<string>  {     
    const route = this.httpRouteGetter.httpRoute + 'claims/deleteClaim/' + claimId;    
    return this.httpClient.delete<string>(route).pipe(catchError(this.handleError));
  }

  handleError(error:any) {
    let errorMessage:string = ''; 
    if (error.error instanceof ErrorEvent) { 
      // client-side error 
      errorMessage = error.error.message; 
    } else { 
      // server-side error 
      errorMessage = "Server error in getting Response"; 
    } 
    window.alert(errorMessage); 
    return throwError(errorMessage); 
  }
}