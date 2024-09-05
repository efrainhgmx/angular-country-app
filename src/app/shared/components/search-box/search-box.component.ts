import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
})
export class SearchBoxComponent {
  @Input()
  public placeholder: string = 'Realizar busqueda...';

  @Output()
  public onValue = new EventEmitter<string>();

  searchValue(searchTerm: string): void {
    if (!searchTerm.trim()) return;
    this.onValue.emit(searchTerm);
  }
}
