import {Component, OnInit} from '@angular/core';
import {Transaktionsservice} from "../services/transaktionsservice.service";
import {TransaktionenModel} from "../model/transaktionen.model";
import {KontoserviceService} from "../services/kontoservice.service";
import {FinanzserviceService} from "../services/finanzservice.service";
import {LoginService} from "../services/login.service";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: false

})
export class DashboardComponent implements OnInit{

  aktivitaeten: TransaktionenModel[] | undefined;
  kontostand : number | undefined;
  einnahmenSumme : number | undefined;
  ausgabenSumme : number | undefined;
  panelOpenState = false;


  constructor(private transaktionsservice : Transaktionsservice,
              private kontoService : KontoserviceService,
              private finanzService : FinanzserviceService,
              private login: LoginService
  ) {
  }

  ngOnInit(): void {

    console.log(localStorage.getItem('token'));

    this.transaktionsservice.getTransDesMonats().subscribe(data => {
      this.aktivitaeten = data
    });

    this.kontoService.getKontoStand().subscribe(data =>{
      this.kontostand = data
      });

    this.finanzService.getEinnahmenSumme().subscribe(data => {
      this.einnahmenSumme = data
    });

    this.finanzService.getAusgabenSumme().subscribe(data => {
      this.ausgabenSumme = data
    });
  }

}
