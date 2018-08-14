import { Component, EventEmitter, HostListener, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ApiService } from '../../services/api.service';
import { TableColumnData } from './table-column.interface';
import { TableResponse } from './table-response.interface';

@Component({
  selector: 'kiwi-datatable',
  templateUrl: 'kiwi-datatable.component.html',
})
export class KiwiDatatableComponent implements OnInit {

  @Input() tableTitle = null;
  @Input() apiUrl = null;

  @Output() updatedData = new EventEmitter<any>();

  @Input('columns') set columnsTemp(columns: Array<any>) {
    for (const column of columns) {
      column.headerClass = column.headerClass || '';
      column.cellClass = column.cellClass || '';
      if (column.type) {
        delete column.type;
      }
      if (column.align) {
        column.headerClass += ' text-' + column.align;
        column.cellClass += ' text-' + column.align;
        delete column.align;
      }
    }
    this.hostColumns = columns;
    this.calculateColumns();
  }

  @Input() limit = 10;

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('collapseColumnTemplate') collapseColumnTemplate: TemplateRef<any>;

  data: TableResponse<any> = null;
  hostColumns: Array<TableColumnData<any>> = [];
  tableColumns: Array<TableColumnData<any>> = [];
  detailColumns: Array<TableColumnData<any>> = [];
  filterValue = '';
  loading = false;
  pageNumber = 0;

  private orderBy: string = null;
  private orderDirection: string = null;

  private inputTimeout = null;

  private minSizes = {
    xs: 576,
    sm: 768,
    md: 992,
    lg: 1200,
    always: 20000,
  };

  @HostListener('window:resize', ['$event']) onResize(event) {
    this.calculateColumns();
  }

  constructor(protected api: ApiService) {
  }

  ngOnInit() {
    if (this.apiUrl) {
      this.updateElements();
    }
  }

  private calculateColumns() {
    const windowWidth = window.innerWidth;
    const tableColumns = [];
    const detailColumns = [];
    for (const column of this.hostColumns) {
      if (column.moveToDetailBelow) {
        const belowWidth = this.minSizes[column.moveToDetailBelow];
        if (windowWidth > belowWidth) {
          tableColumns.push(column);
        } else {
          detailColumns.push(column);
        }
      } else {
        tableColumns.push(column);
      }
    }
    this.tableColumns = tableColumns;
    this.detailColumns = detailColumns;
  }

  private ceil(value: number) {
    return Math.ceil(value);
  }

  private parseParams(data) {
    return Object.keys(data).map(key => `${key}=${encodeURIComponent(data[key])}`).join('&');
  }

  updateElements() {
    const params: any = {
      offset: this.pageNumber * this.limit,
      limit: this.limit,
    };

    if (this.orderBy && this.orderDirection) {
      params.orderBy = this.orderBy;
      params.orderDirection = this.orderDirection;
    }

    if (this.filterValue && this.filterValue !== '') {
      params.search = this.filterValue;
    }

    this.loading = true;
    return this.api.get(this.apiUrl + '?' + this.parseParams(params)).then((data: any) => {
      this.loading = false;

      // TODO: Update
      this.data = {
        count: 1000,
        limit: 1000,
        offset: 0,
        search: '',
        orderBy: 'id',
        orderDirection: 'DESC',
        result: data,
      };
      this.updatedData.emit(this.data);

      // this.data = data;
    });
  }

  setPage(pageInfo) {
    this.pageNumber = pageInfo.offset;
    this.updateElements();
  }

  onSort(event) {
    this.pageNumber = 0;
    this.orderBy = event.sorts[0].prop;
    this.orderDirection = event.sorts[0].dir;
    this.updateElements();
  }

  applyFilter() {
    if (this.inputTimeout) {
      clearTimeout(this.inputTimeout);
    }
    this.inputTimeout = setTimeout(() => {
      this.pageNumber = 0;
      this.updateElements();
    }, 500);
  }

  private gotToFirstPage() {
    if (this.table) {
      this.table.offset = 0;
    }
  }

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }
}
