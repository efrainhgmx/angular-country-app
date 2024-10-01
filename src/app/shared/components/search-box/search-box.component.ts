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

  emitValue( value: string ):void  {
    this.onValue.emit(value);
  }

  onKeyPress( searchTerm: string ) :void {
    console.log({searchTerm})
  }
}
