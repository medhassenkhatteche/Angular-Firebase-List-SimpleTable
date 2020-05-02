import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LivresService} from '../../services/livres.service';
import {Router} from '@angular/router';
import {Livre} from '../../models/Livre.model';

@Component({
  selector: 'app-formulaire-livre',
  templateUrl: './formulaire-livre.component.html',
  styleUrls: ['./formulaire-livre.component.scss']
})
export class FormulaireLivreComponent implements OnInit {

  livreForm: FormGroup;

  fileIsUploading = false;
  fileUploaded = false;
  fileUrl: string;

  constructor(private formBuilder: FormBuilder,
              private livresService: LivresService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.livreForm = this.formBuilder.group({
      titre: ['', Validators.required],
      auteur: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      editeur: ['', Validators.required],
      dateParution: ['', Validators.required],
      prix: ['', Validators.required],
      disponibilite: ['', Validators.required]
    });
  }

  onSaveLivre(){
    const titre = this.livreForm.get('titre').value;
    const auteur = this.livreForm.get('auteur').value;
    const type = this.livreForm.get('type').value;
    const description = this.livreForm.get('description').value;
    const editeur = this.livreForm.get('editeur').value;
    const dateParution = this.livreForm.get('dateParution').value;
    const prix = this.livreForm.get('prix').value;
    const disponibilite = this.livreForm.get('disponibilite').value;

    const nouveauLivre = new Livre(titre, auteur, type, description, editeur, dateParution, prix, disponibilite);
    if (this.fileUrl && this.fileUrl !== ''){
      nouveauLivre.photo = this.fileUrl;
    }
    this.livresService.ajouterNouveauLivre(nouveauLivre);
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

  detectFiles(event){
    this.onUploadedFile(event.target.files[0]);
  }

}
