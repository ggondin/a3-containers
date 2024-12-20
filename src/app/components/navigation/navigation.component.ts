import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  constructor(private router: Router, private location: Location) {}

  ngOnInit() {}

  entrada() {
    this.router.navigate(['cadastro']);
  }

  saida() {
    this.router.navigate(['saida']);
  }

  back() {
    this.location.back();
  }
}
