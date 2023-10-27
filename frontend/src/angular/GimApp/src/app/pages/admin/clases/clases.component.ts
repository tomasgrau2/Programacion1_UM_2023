import { Component } from '@angular/core';
import { ClasesService } from 'src/app/services/clases.service';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrls: ['./clases.component.css']
})
export class ClasesComponent {
  clases: any[] = [];
  arrayClases: any;
  currentPage:any = 1;
  totalPaginas: number = 0;
  pages: number[] = [];

  constructor(private clasesService: ClasesService) {}

  ngOnInit() {
    this.loadClases(this.currentPage);
  }

  get rol() {
    return localStorage.getItem('rol');
  }

  loadClases(page: any) {
    this.clasesService.getClases(page).subscribe((data: any) => {
      this.arrayClases = data.clases;
      this.currentPage = data.page;
      this.totalPaginas = data.pages;
      console.log('Pagina actual:', this.currentPage);
      console.log('JSON data:', this.arrayClases);
      console.log('Total de paginas:', this.totalPaginas);

      this.pages = Array.from({length: this.totalPaginas}, (_, i) => i + 1);
    });
  }
}
