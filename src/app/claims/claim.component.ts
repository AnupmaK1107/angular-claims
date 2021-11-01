import { Component, OnInit } from '@angular/core';
import { Claims } from '../models/claims';
import { ClaimTypes } from '../models/claimTypes';
import { ClaimService } from './claim.service';
import * as $ from 'jquery';
import { FormControl, Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
    selector: 'app-claim',
    templateUrl: './claim.component.html',
    styleUrls: ['./claim.component.css'],
    providers: [ClaimService]
  })

  export class ClaimComponent implements OnInit {
    claimsList: Claims[];
    claimTypesList: ClaimTypes[];
    submitted: any;
    submitForm: any;
    name:any;
    damageCost:any;
    year:any;
    type:any;
    claimToAdd:any;
    constructor(private claimService: ClaimService, private formBuilder: FormBuilder ) {    
        this.claimsList = [];
        this.claimTypesList = [];
        this.submitted = false;
        this.submitForm = FormGroup;
        this.name = new FormControl('', [Validators.required]);
        this.damageCost = new FormControl('', Validators.required);
        this.year = new FormControl('', Validators.required);
        this.type = new FormControl('', Validators.required);
        this.claimToAdd = new Claims();
    } 

      ngOnInit() {
        this.getClaimTypes();
        this.getClaimsList();
        this.createValidation();
      }

      createValidation() {
        this.submitForm = this.formBuilder.group({
          name: this.name,
          damageCost: this.damageCost,
          year: this.year,
          type: this.type
        });
      }

      get f() {
        return this.submitForm.controls;
      }

      getClaimTypes() {
        this.claimService.getClaimTypes().subscribe(res => {          
          this.claimTypesList = res;
        });        
      }

      getClaimsList() {
        this.claimService.getAllClaims().subscribe(res => {
          this.claimsList = res;
          if (this.claimsList.length === 0) {
            this.showNoClaim();
          } else {
            this.showClaim();
          }
        });        
      }

      deleteClaim(claimId:string) {
        this.claimService.deleteClaim(claimId).subscribe(res => {  
          if(res != undefined)
          {        
          this.getClaimsList();
          }
        });        
      }

      onSubmit() {
        this.submitted = true;
        if (this.submitForm.invalid) {
          return;
        }
        this.claimToAdd = this.submitForm.value;
        this.claimToAdd.type = this.type.value;
        this.sendClaimToService();
      }

      sendClaimToService() {
        this.claimService.addClaim(this.claimToAdd).subscribe(res => {
            if(res != undefined)
            {
                this.getClaimsList(); 
            }
        });
      }

      showNoClaim() {
        $('#listSection').css("visibility", "hidden");
      }
    
      showClaim() {    
        $('#listSection').css("visibility", "visible");
      }
  }