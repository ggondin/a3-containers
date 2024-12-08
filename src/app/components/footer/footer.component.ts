import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  abrirLinkedin() {
    window.open('https://www.linkedin.com/in/gabriel-gondin/', '_blank');
  }
}
