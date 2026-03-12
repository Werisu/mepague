import { Component } from '@angular/core';
import { DataExportService } from '@mepague/data-export';

/**
 * Componente para exportar e importar dados do MePague
 */
@Component({
  selector: 'app-data-export',
  standalone: true,
  templateUrl: './data-export.component.html',
  styleUrl: './data-export.component.scss',
})
export class DataExportComponent {
  importing = false;
  importSuccess = false;
  importError = false;

  constructor(private dataExportService: DataExportService) {}

  export(): void {
    this.dataExportService.export();
  }

  async onFileSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.importing = true;
    this.importSuccess = false;
    this.importError = false;

    const success = await this.dataExportService.import(file);
    this.importing = false;
    this.importSuccess = success;
    this.importError = !success;

    input.value = '';
  }
}
