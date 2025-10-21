// input-context-carousel.component.ts
import {
  Component, Input, Type, ViewChild, ElementRef,
  AfterViewInit, OnDestroy
} from '@angular/core';
import { InputComponentKey, REGISTRY_INPUT_COMPONENT_TYPE } from '../ui-reflection-map';

export interface InputCarouselConfig {
  slidesPerView?: number;
  spaceBetween?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  showNavigation?: boolean;
  showPagination?: boolean;
}

/** OGNI slide può opzionalmente passare inputs al componente instanziato */
export type InputSlide =
  | InputComponentKey
  | { key: InputComponentKey; inputs?: Record<string, any> };

@Component({
  selector: 'app-input-context-carousel',
  templateUrl: './input-context-carousel.html',
  styleUrls: ['./input-context-carousel.scss'],
  standalone: false,
})
export class InputContextCarousel implements AfterViewInit, OnDestroy {
  @Input() title?: string;
  @Input() subtitle?: string;

  /** Ora items può essere solo la key o un oggetto { key, inputs } */
  @Input() items: InputSlide[] = [];

  @Input() config: InputCarouselConfig = {};

  @ViewChild('scrollContainer') scrollContainer?: ElementRef<HTMLDivElement>;
  currentIndex = 0;

  get carouselConfig(): InputCarouselConfig {
    return {
      slidesPerView: 1.2,
      spaceBetween: 16,
      autoplay: false,
      autoplayDelay: 3000,
      showNavigation: true,
      showPagination: true,
      ...this.config,
    };
  }
  get paginationDots(): number[] {
    return Array.from({ length: this.items.length }, (_, i) => i);
  }

  asObj(it: InputSlide): { key: InputComponentKey; inputs?: Record<string, any> } {
    return typeof it === 'string' ? { key: it } : it;
  }

  getComponentType(key: InputComponentKey): Type<any> | null {
    return REGISTRY_INPUT_COMPONENT_TYPE[key] ?? null;
  }

  ngAfterViewInit() {
    this.scrollContainer?.nativeElement.addEventListener('scroll', this.onScroll);
  }
  ngOnDestroy() {
    this.scrollContainer?.nativeElement.removeEventListener('scroll', this.onScroll);
  }
  onScroll = () => {
    if (!this.scrollContainer) return;
    const c = this.scrollContainer.nativeElement;
    const itemWidth = 320 + 20;
    const newIndex = Math.round((c.scrollLeft + c.clientWidth / 2 - itemWidth / 2) / itemWidth);
    if (newIndex !== this.currentIndex && newIndex >= 0 && newIndex < this.items.length) {
      this.currentIndex = newIndex;
      this.updateActiveItem();
    }
  };
  updateActiveItem() {
    if (!this.scrollContainer) return;
    const els = this.scrollContainer.nativeElement.querySelectorAll('.carousel-item');
    els.forEach((el, i) => {
      const node = el as HTMLElement;
      if (i === this.currentIndex) {
        node.style.transform = 'scale(1)';
        node.style.opacity = '1';
        node.style.filter = 'blur(0)';
      } else {
        node.style.transform = 'scale(0.85)';
        node.style.opacity = '0.5';
        node.style.filter = 'blur(2px)';
      }
    });
  }
  scrollToIndex(index: number) {
    if (!this.scrollContainer || index < 0 || index >= this.items.length) return;
    const itemWidth = 320 + 20;
    this.scrollContainer.nativeElement.scrollTo({ left: index * itemWidth, behavior: 'smooth' });
  }
  trackByIndex = (i: number) => i;
}
