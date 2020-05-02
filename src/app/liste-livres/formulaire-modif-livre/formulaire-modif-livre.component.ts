import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LivresService} from '../../services/livres.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Livre} from '../../models/Livre.model';

@Component({
  selector: 'app-formulaire-modif-livre',
  templateUrl: './formulaire-modif-livre.component.html',
  styleUrls: ['./formulaire-modif-livre.component.scss']
})
export class FormulaireModifLivreComponent implements OnInit {

  livres: Livre[];

  fileIsUploading = false;
  fileUploaded = false;
  fileUrl: string;

  livre: Livre;

  constructor(private route: ActivatedRoute, private livresService: LivresService, private router: Router) { }

  ngOnInit(): void {

    this.livre = new Livre('', '', '', '', '', '', '', '');
    const id = this.route.snapshot.params['id'];
    this.livresService.getDetailLivre(+id).then(
      (livre: Livre) => {
        this.livre = livre;
      }
    );

  }

  updateLivre(livre: Livre){
    this.livresService.updateLivre(livre);
    this.router.navigate(['/livres']);
  }

  onUploadedFile(file: File){
    this.fileIsUploading = true;
    this.livresService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }

  detectChangeFiles(event){
    this.onUploadedFile(event.target.files[0]);
  }

  onModifImage(){
    console.log('Modification de la photo!');
  }

}
