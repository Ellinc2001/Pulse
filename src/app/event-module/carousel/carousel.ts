import {
  Component,
  Input,
  Type,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core'
import { UiComponentKey } from '../ui-reflection-map'

export interface CarouselConfig { 
  slidesPerView?: number; 
  spaceBetween?: number;
  autoplay?: boolean; 
  autoplayDelay?: number;
  showNavigation?: boolean;
  showPagination?: boolean
}

@Component({
  selector: 'app-component-carousel',
  templateUrl: './carousel.html',
  styleUrls: ['./carousel.scss'],
  standalone: false,
})
export class CarouselComponent implements AfterViewInit, OnDestroy {
  @Input() title?: string
  @Input() subtitle?: string
  @Input() componentType!: Type<any>
  @Input() componentKey!: UiComponentKey
  @Input() dataList: Array<Record<string, any>> = []
  @Input() config: CarouselConfig = {}

  @ViewChild('scrollContainer') scrollContainer?: ElementRef<HTMLDivElement>
  currentIndex = 0

  constructor() {}

  ngOnInit() {
    console.log('[Carousel] Loaded with data:', this.dataList)
  }

  // ─────────────────────────────
  // Config con fallback
  // ─────────────────────────────
  get carouselConfig(): CarouselConfig {
    return {
      slidesPerView: 1.2,
      spaceBetween: 16,
      autoplay: false,
      autoplayDelay: 3000,
      showNavigation: true,
      showPagination: true,
      ...this.config,
    }
  }

  get slideWidth(): number {
    return 100 / (this.carouselConfig.slidesPerView || 1)
  }

  get canGoPrev(): boolean {
    return this.currentIndex > 0
  }

  get canGoNext(): boolean {
    return this.currentIndex < this.dataList.length - 1
  }

  get paginationDots(): number[] {
    return Array.from({ length: this.dataList.length }, (_, i) => i)
  }

  // ─────────────────────────────
  // Scroll handling
  // ─────────────────────────────
  ngAfterViewInit() {
    console.log('[Carousel] Initialized:', this.title)
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.addEventListener(
        'scroll',
        this.onScroll.bind(this)
      )
    }
  }

  ngOnDestroy() {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.removeEventListener(
        'scroll',
        this.onScroll.bind(this)
      )
    }
  }

  private onScroll() {
    if (!this.scrollContainer) return

    const container = this.scrollContainer.nativeElement
    const itemWidth = 320 + 20 // card width + gap
    const scrollLeft = container.scrollLeft
    const centerOffset = container.clientWidth / 2

    const newIndex = Math.round(
      (scrollLeft + centerOffset - itemWidth / 2) / itemWidth
    )

    if (
      newIndex !== this.currentIndex &&
      newIndex >= 0 &&
      newIndex < this.dataList.length
    ) {
      this.currentIndex = newIndex
      this.updateActiveItem()
    }
  }

  private updateActiveItem() {
    if (!this.scrollContainer) return

    const items = this.scrollContainer.nativeElement.querySelectorAll(
      '.carousel-item'
    )
    items.forEach((item, index) => {
      const el = item as HTMLElement
      if (index === this.currentIndex) {
        el.style.transform = 'scale(1)'
        el.style.opacity = '1'
        el.style.filter = 'blur(0)'
      } else {
        el.style.transform = 'scale(0.85)'
        el.style.opacity = '0.5'
        el.style.filter = 'blur(2px)'
      }
    })
  }

  scrollToIndex(index: number) {
    if (!this.scrollContainer || index < 0 || index >= this.dataList.length)
      return

    const container = this.scrollContainer.nativeElement
    const itemWidth = 320 + 20
    const scrollLeft = index * itemWidth

    container.scrollTo({
      left: scrollLeft,
      behavior: 'smooth',
    })
  }

  trackByIndex = (index: number) => index
}
