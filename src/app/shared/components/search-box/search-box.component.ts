import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
})
export class SearchBoxComponent implements OnInit {

  private debouncer: Subject<string> = new Subject<string>();

  @Input()
  public placeholder: string = 'Realizar busqueda...';

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncer
    .pipe(
      debounceTime(1200)
    )
    .subscribe( value => this.onDebounce.emit(value))
  }


  emitValue( value: string ):void  {
    this.onValue.emit(value);
  }

  onKeyPress( searchTerm: string ) :void {
    this.debouncer.next(searchTerm);
  }

}
