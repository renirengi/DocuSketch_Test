import { Component, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { IconLookup, IconPack} from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-change-icon',
  templateUrl: './change-icon.component.html',
  styleUrls: ['./change-icon.component.scss']
})
export class ChangeIconComponent implements OnInit {
  public progressCounter = 100;
  public randomIcon?: IconLookup;
  private iconsArray: IconLookup[] = [];

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }

  ngOnInit() {
    const fasIcons = this.extractIcons(fas);
    const farIcons = this.extractIcons(far);
    this.iconsArray = [...fasIcons, ...farIcons];
  }

  getIcon() {
    this.progressCounter = 0;
    const interval = setInterval(() => {
      this.progressCounter += 5;

      if (this.progressCounter === 100) {
        clearInterval(interval);
        this.randomIcon = this.getNewIcon(this.iconsArray, this.randomIcon);
      }
    }, 150);

  }

  private extractIcons(icons: IconPack): IconLookup[] {
    return Object.values(icons).map(({ prefix, iconName }) => ({ prefix, iconName }));
  }

  private getNewIcon(icons: IconLookup[], previousIcon?: IconLookup): IconLookup {
    let nextIcon: IconLookup;

    do {
      nextIcon = icons[Math.floor(Math.random() * icons.length)];
    } while (nextIcon.prefix === previousIcon?.prefix && nextIcon.iconName === previousIcon.iconName);

    return nextIcon;
  }
}
