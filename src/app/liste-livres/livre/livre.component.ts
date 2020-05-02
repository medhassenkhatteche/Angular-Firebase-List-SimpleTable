import { Component, OnInit } from '@angular/core';
import {Livre} from '../../models/Livre.model';
import {ActivatedRoute, Router} from '@angular/router';
import {LivresService} from '../../services/livres.service';

@Component({
  selector: 'app-livre',
  templateUrl: './livre.component.html',
  styleUrls: ['./livre.component.scss']
})
export class LivreComponent implements OnInit {

  livre: Livre;

  constructor(private route: ActivatedRoute,
              private livresService: LivresService,
              private router: Router) { }

  ngOnInit(): void {
    this.livre = new Livre('', '', '', '', '', '', '', '');
    const id = this.route.snapshot.params['id'];
    this.livresService.getDetailLivre(+id).then(
      (livre: Livre) => {
        this.livre = livre;
      }
    );
  }

  onBack(){
    this.router.navigate(['/livres']);
  }

}
