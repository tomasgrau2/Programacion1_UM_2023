import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SuspensionService } from '../../services/suspension.service';

@Component({
  selector: 'app-suspension-message',
  templateUrl: './suspension-message.component.html',
  styleUrls: ['./suspension-message.component.css']
})
export class SuspensionMessageComponent implements OnInit {
  suspensionMessage: string = '';

  constructor(
    private suspensionService: SuspensionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.suspensionMessage = this.suspensionService.getSuspensionMessage();
  }

  goToLogin(): void {
    this.router.navigate(['/start']);
  }

  contactGym(): void {
    console.log('Contactar al gimnasio');
    alert('Para contactar al gimnasio, por favor llame al número de teléfono o visite nuestras instalaciones.');
  }
}
