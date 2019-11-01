import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ReservaService } from 'src/app/services/reserva.service';
import { Reserva } from 'src/app/models/reserva';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { ReservaDetailComponent } from '../reserva-detail/reserva-detail.component';

@Component({
  selector: 'app-reservas-list',
  templateUrl: './reservas-list.component.html',
  styleUrls: ['./reservas-list.component.css']
})
export class ReservasListComponent implements OnInit {
  columnasMostradas: string[] = [
    'fecha_turno',
    'fecha_reserva',
    'cliente',
    'acciones'
  ];
  public reserva: Reserva;
  public dataSource = new MatTableDataSource<Reserva>([]);
  public cantItems = 25;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @Input() idCancha: number;

  constructor(
    private reservaService: ReservaService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    if (this.idCancha) {
      this.getReservasFiltered(this.idCancha);
    } else {
      this.getReservas();
    }
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getReservas(): void {
    this.reservaService.getReservas().subscribe((reservas: any) => {
      const data = this.dataSource.data;
      reservas.results.forEach(reserva => {
        data.push(reserva);
      });
      this.dataSource.data = data;
    });
  }

  getReservasPageSize(): void {
    this.reservaService.getReservas(this.cantItems).subscribe((reservas: any) => {
      this.dataSource.data = reservas.results;
    });
  }

  getReservasFiltered(idCancha: number): void {
    this.reservaService.getReservasFiltered(idCancha).subscribe((reservas: any) => {
      const data = this.dataSource.data;
      reservas.results.forEach(reserva => {
        data.push(reserva);
      });
      this.dataSource.data = data;
    });
  }

  getReserva(id: number): void {
    this.reservaService.getReserva(id).subscribe(reserva => {
      this.reserva = reserva;
      this.openDialog();
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog() {
    const dialogRef = this.dialog.open(ReservaDetailComponent, {
      height: '45vh',
      minWidth: '50%',
      data: {reserva: this.reserva}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
