export class Livre {
  photo: string;
  constructor(public titre: string,
              public auteur: string,
              public type: string,
              public description: string,
              public editeur: string,
              public dateParution: string,
              public prix: string,
              public disponibilite: string) {
  }
}
