import { Component, computed, effect, input } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TableSchema } from '@interfaces/table.interface';

@Component({
  selector: 'app-table',
  imports: [MatTableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent<TItem> {
  schema = input.required<TableSchema<TItem>>();
  columns = computed(() => this.schema().columnsLabels);
  labels = computed(() => this.schema().displayedColumns);
  type = computed(() => this.schema().type);

  dataSource = new MatTableDataSource<TItem>();

  constructor() {
    effect(() => {
      const tableData = this.schema().dataTable;
      const { type } = this.schema();

      if (type === 'BriefTable') {
        this.dataSource.data = tableData;
      }
    });
  }
}
