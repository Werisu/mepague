import { Component } from '@angular/core';
import { DataExportComponent } from '../data-export/data-export.component';

/**
 * Página para exportar e importar dados
 */
@Component({
  selector: 'app-dados',
  standalone: true,
  imports: [DataExportComponent],
  templateUrl: './dados.component.html',
  styleUrl: './dados.component.scss',
})
export class DadosComponent {}
