import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'flex',
  template: '<ng-content></ng-content>',
})
export class FlexComponent {
  @Input() justify: string = 'flex-start';
  @Input() alignItems: string = 'stretch';
  @Input() direction: string = 'row';
  @Input() wrap: string = 'nowrap';
  @Input() gap: string = '0';
  @Input() flex?: string;
  @Input() padding?: string;
  @Input() margin?: string;
  @Input() width?: string;
  @Input() height?: string;
  @Input() backgroundColor?: string;
  @Input() boxShadow?: string;
  @Input() class?: string;
  @Input() cursor?: string;
  @Input() bl?: string;
  @Input() br?: string;
  @Input() bb?: string;
  @Input() overflow?: string;
  @Input() borderRadius?: string;
  @Input() bg?: string;
  @Input() color?: string;
  @Input() position?: string;
  @Input() top?: string;
  @Input() right?: string;
  @Input() bottom?: string;
  @Input() left?: string;
  @Input() maxHeight?: string;
  @Input() maxWidth?: string;
  @Input() zindex?: string;
  @Input() textAlign?: string;
  @Input() border?: string;

  @HostBinding('style.display') display = 'flex';
  @HostBinding('style.justify-content') get justifyContent() {
    return this.justify;
  }
  @HostBinding('style.align-items') get flexAlignItems() {
    return this.alignItems;
  }
  @HostBinding('style.flex-direction') get flexDirection() {
    return this.direction;
  }
  @HostBinding('style.flex-wrap') get flexWrap() {
    return this.wrap;
  }
  @HostBinding('style.gap') get flexGap() {
    return this.gap;
  }
  @HostBinding('style.flex') get flexGrow() {
    return this.flex;
  }
  @HostBinding('style.padding') get flexPadding() {
    return this.padding;
  }
  @HostBinding('style.margin') get flexMargin() {
    return this.margin;
  }
  @HostBinding('style.background-color') get flexBackgroundColor() {
    return this.backgroundColor;
  }
  @HostBinding('style.box-shadow') get flexBoxShadow() {
    return this.boxShadow;
  }
  @HostBinding('class') get flexClass() {
    return this.class;
  }
  @HostBinding('style.width') get flexWidth() {
    return this.width;
  }
  @HostBinding('style.max-width') get flexMaxWidth() {
    return this.maxWidth;
  }
  @HostBinding('style.height') get flexHeight() {
    return this.height;
  }
  @HostBinding('style.max-height') get flexMaxHeight() {
    return this.maxHeight;
  }
  @HostBinding('style.cursor') get flexCursor() {
    return this.cursor;
  }
  @HostBinding('style.border-left') get flexBorderLeft() {
    return this.bl;
  }
  @HostBinding('style.border-right') get flexBorderRight() {
    return this.br;
  }
  @HostBinding('style.border-bottom') get flexBorderBottom() {
    return this.bb;
  }
  @HostBinding('style.overflow') get flexOverFlow() {
    return this.overflow;
  }
  @HostBinding('style.border-radius') get flexBorderRadius() {
    return this.borderRadius;
  }
  @HostBinding('style.background') get flexBackground() {
    return this.bg;
  }
  @HostBinding('style.color') get flexColor() {
    return this.color;
  }
  @HostBinding('style.position') get flexPosition() {
    return this.position;
  }
  @HostBinding('style.top') get flexTop() {
    return this.top;
  }
  @HostBinding('style.right') get flexRight() {
    return this.right;
  }
  @HostBinding('style.bottom') get flexBottom() {
    return this.bottom;
  }
  @HostBinding('style.left') get flexLeft() {
    return this.left;
  }
  @HostBinding('style.z-index') get flexZindex() {
    return this.zindex;
  }
  @HostBinding('style.text-align') get flexTextAlign() {
    return this.textAlign;
  }
  @HostBinding('style.border') get flexBorder() {
    return this.border;
  }
}
