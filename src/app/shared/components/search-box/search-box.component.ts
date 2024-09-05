import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
})
export class SearchBoxComponent {
  @Input()
  public placeholder: string = 'Realizar busqueda...';

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter();

  @ViewChild('txtSearchInput')
  private searchInputElement!: ElementRef<HTMLInputElement>;

  searchValue(): void {
    const searchTerm: string = this.searchInputElement.nativeElement.value;
    if (!searchTerm) return;

    this.onValue.emit(searchTerm);
  }
}
