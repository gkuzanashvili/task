import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-validator',
  templateUrl: './validator.component.html',
  styleUrls: ['./validator.component.css']
})
export class ValidatorComponent implements OnInit {
  @Input() checkValidity: boolean;
  @Input() errors: any;

  constructor() { }

  ngOnInit(): void {
  }

}
