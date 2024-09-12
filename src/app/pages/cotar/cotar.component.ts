import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CotarService } from './cotar.service';
import { Cover } from './cover.model';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-cotar',
  templateUrl: './cotar.component.html',
  styleUrls: ['./cotar.component.scss']
})
export class CotarComponent implements OnInit {

  private fb = inject(FormBuilder);
  private cotarService = inject(CotarService);
  covers: Cover[] = [];
  formCoverStepOne!: FormGroup;
  dateInitVigencia = '';
  dateEndVigencia = '';

  ngOnInit(): void {
    const covers$ = this.cotarService.getCovers();
    this.dateInitVigencia = this.getDate(new Date);
    this.dateEndVigencia = this.getDate(this.addOneYear(new Date));

    covers$.subscribe({
      next: (data) => {
        this.covers = data;
        this.createForm();
      }
    })    
  }

  private createForm(): void {

    this.formCoverStepOne = this.fb.group({
      docSegurado: new FormControl('', [Validators.required]),
      nomeSegurado: new FormControl('', [Validators.required]),
      initVigencia: new FormControl(this.dateInitVigencia, [Validators.required]),
      endVigencia: new FormControl({value: this.dateEndVigencia, disabled: true}, [Validators.required]),
      coBrokerage: this.createBrokerage(),
      covers: this.createCovers()
    })
  }

  private createCovers(): FormArray {
    let formArray = new FormArray<FormGroup>([]);
    this.covers.map((cover) => {
      let checked = false;
      if (cover.id == 501) {
        checked = true;
      }
      const group = this.createGroupCover(checked, cover.id, cover.name);
      formArray.push(group);
    })
    return formArray;
  }

  private createGroupCover(
    checked: boolean = false,
    id: number = -1,
    name: string = '',
    type: number = 1,
    minCompLimit: string = '',
    maxCompLimit: string = '',
    percentage: string = '',
    typeContract: number = 1): FormGroup {
    return new FormGroup({
      checked: new FormControl(checked),
      coverId: new FormControl(id),
      name: new FormControl(name),
      type: new FormControl(type, [Validators.required]),
      minCompLimit: new FormControl(minCompLimit, [Validators.required]),
      maxCompLimit: new FormControl(maxCompLimit, [Validators.required]),
      percentage: new FormControl(percentage, [Validators.required]),
      typeContract: new FormControl(typeContract, [Validators.required]),
    })
  }

  private createBrokerage(): FormArray {
    let formArray = new FormArray<FormGroup>([]);
    formArray.push(this.loadingGroupBrokerage());
    return formArray;
  }

  get arrCovers(): FormArray {
    return this.formCoverStepOne.get('covers') as FormArray;
  }

  get formArrayBrokerage(): FormArray {
    return this.formCoverStepOne.get('coBrokerage') as FormArray;
  }

  private getDate = (rawDate: Date): string => {return formatDate(rawDate, 'dd/MM/yyyy', 'pt-BR')};

  onAddBrokerage(): void {
    const brokerageObj = this.formCoverStepOne.get('coBrokerage') as FormArray;
    brokerageObj.push(new FormGroup({
      mediatorCode: new FormControl('', [Validators.required]),
      brokerName: new FormControl(''),
      participation: new FormControl('', [Validators.required])
    }))
  }

  onRemoveRowBrokerage(index: number): void {
    const brokerageObj = this.formCoverStepOne.get('coBrokerage') as FormArray;
    brokerageObj.removeAt(index);
  }

  private loadingGroupBrokerage(): FormGroup {
    return new FormGroup({
      mediatorCode: new FormControl('4009289', [Validators.required]),
      brokerName: new FormControl('Consetec - Acessoria e Corretagem de Seguros'),
      participation: new FormControl('70%', [Validators.required])
    })
  }

  /**
   * Calculando data fim da vigência
   */
  private addOneYear(date: Date): Date {
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();
    const currentDay = date.getDate();

    const newYear = currentYear + 1;
    const newDay = (currentMonth === 1 && currentDay === 29 && !this.isLeapYear(newYear)) ? 28 : currentDay;

    return new Date(newYear, currentMonth, newDay);
  }

  private isLeapYear(year: number): Boolean {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }
}
