import {Component, OnInit} from '@angular/core';
import {Transaktionsservice} from "../services/transaktionsservice.service";
import {TransaktionenModel} from "../model/transaktionen.model";
import {KontoserviceService} from "../services/kontoservice.service";
import {FinanzserviceService} from "../services/finanzservice.service";
import {LoginService} from "../services/login.service";
import {EinnahmenService} from "../services/einnahmen.service";
import {AusgabenService} from "../services/ausgaben.service";
import {TokenService} from "../services/token.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: false

})
export class DashboardComponent implements OnInit {

  aktivitaeten: TransaktionenModel[] | undefined;
  kontostand: number | undefined;
  einnahmenSumme: number | undefined;
  ausgabenSumme: number | undefined;
  panelOpenState = false;
  kontoId: string | null = null;
  token: string | null = null;

  constructor(
    private transaktionsservice: Transaktionsservice,
    private kontoService: KontoserviceService,
    private einnahmenService: EinnahmenService,
    private ausgabenService: AusgabenService,
    private tokenService: TokenService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.kontoId = this.kontoService.getKontoId();
    this.token = this.tokenService.getToken();
    if (!this.kontoId || !this.token) {
      console.error('No user ID or token found');
      this.router.navigate(['/login']); // Redirect to login if no kontoId or token
    } else {
      console.log('KontoId:', this.kontoId);
      console.log('Token:', this.token);

      this.transaktionsservice.getTransDesMonats().subscribe(data => {
        this.aktivitaeten = data;
      });

      this.kontoService.getKontoStand().subscribe(data => {
        this.kontostand = data;
      });

      this.einnahmenService.getEinnahmenSumme().subscribe(data => {
        this.einnahmenSumme = data;
      });

      this.ausgabenService.getAusgabenSumme().subscribe(data => {
        this.ausgabenSumme = data;
      });
    }
  }
}
