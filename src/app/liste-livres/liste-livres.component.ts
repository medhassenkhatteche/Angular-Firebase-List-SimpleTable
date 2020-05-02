import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {Livre} from '../models/Livre.model';
import {Subscription} from 'rxjs';
import {LivresService} from '../services/livres.service';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

/*const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];*/

@Component({
  selector: 'app-liste-livres',
  templateUrl: './liste-livres.component.html',
  styleUrls: ['./liste-livres.component.scss']
})

export class ListeLivresComponent implements OnInit, OnDestroy {

  livres: Livre[];
  LivresSubscription: Subscription;
  searchText: string = '';

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  //dataSource = ELEMENT_DATA;

  constructor(private livresService: LivresService, private router: Router) { }

  ngOnInit(): void {
    this.LivresSubscription = this.livresService.livresSubject.subscribe(
      (livres: Livre[]) => {
        this.livres = livres;
      }
    );
    this.livresService.getLivres();
    this.livresService.emitLivres();


  }


  onNewLivre(){
    this.router.navigate(['/livres', 'ajout']);
  }

  onDeleteLivre(livre: Livre){
    this.livresService.supprimerLivre(livre);
  }

  onEditLivre(compteur: number){
    this.router.navigate(['/livres', 'modif', compteur]);
  }

  onViewLivre(id: number){
    this.router.navigate(['/livres', 'detail', id]);
  }

  ngOnDestroy(): void {
    this.LivresSubscription.unsubscribe();
  }

  filterCondition(livre){
    return livre.titre.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
  }

}
