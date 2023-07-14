import { Component, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { IconLookup, IconProp } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-change-icon',
  templateUrl: './change-icon.component.html',
  styleUrls: ['./change-icon.component.scss']
})
export class ChangeIconComponent implements OnInit {
  public randomIcon?: IconLookup;

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }

  ngOnInit() {
  }

  getIcon() {
    setTimeout(() => {
      const fasIcons = this.extractIcons(fas);
    const farIcons = this.extractIcons(far);
    const iconsArray = [...fasIcons, ...farIcons];
    this.randomIcon = iconsArray[Math.floor(Math.random() * iconsArray.length)];
    }, 3000);

  }

  private extractIcons(object: object): IconLookup[] {
    return Object.values(solidIcons.fas).map(({ prefix, iconName }) => ({ prefix, iconName }))
  }
}
