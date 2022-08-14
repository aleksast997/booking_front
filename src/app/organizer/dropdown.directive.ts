import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";

@Directive({
  selector: '[appDropdown]'
})

export class DropdownDirectictive {

  private isOpen = false;

  constructor(private elRef: ElementRef, private renderer: Renderer2){}


  @HostListener('click') toggleOpen(){
    const dropDownMenu = this.elRef.nativeElement.nextElementSibling;
    if(this.isOpen){
      this.renderer.removeClass(dropDownMenu, 'show');
    }else{
      this.renderer.addClass(dropDownMenu, 'show');
    }
    this.isOpen = !this.isOpen;
  }
}
