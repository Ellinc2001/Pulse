import {
  Component,
  Input,
  type Type,
  ViewChild,
  type ElementRef,
  type AfterViewInit,
  type OnDestroy,
} from "@angular/core"
import {
  pickInputsForComponent,
  UiComponentKey,
  type BaseComponentInputs,   // 👈 aggiungi questo
} from "../stat-visual-map"

export interface CarouselConfig {
  slidesPerView?: number
  spaceBetween?: number
  autoplay?: boolean
  autoplayDelay?: number
  showNavigation?: boolean
  showPagination?: boolean
}

@Component({
  selector: "app-component-carousel", // Fixed selector to match usage in template
  templateUrl: "./carousel.html",
  styleUrls: ["./carousel.scss"],
  standalone: false,
})
export class CarouselComponent implements AfterViewInit, OnDestroy {
  @Input() title?: string
  @Input() subtitle?: string
  @Input() componentType!: Type<any>
  @Input() componentKey!: UiComponentKey              
  @Input() dataList: Array<BaseComponentInputs & Record<string, any>> = []
  @Input() config: CarouselConfig = { /* … */ }

  @ViewChild("scrollContainer") scrollContainer?: ElementRef<HTMLDivElement>
  currentIndex = 0

  constructor(){

  }

  public ngOnInit(){
    console.log('DATA: ', this.dataList)
  }


  toInputs = (data: Partial<BaseComponentInputs> & Record<string, any>) => {
    const withBase: BaseComponentInputs & Record<string, any> = {
      eventId: data.eventId!, // oppure prendi da contesto
      statId:  data.statId!,
      ...data,
    }
    return pickInputsForComponent(this.componentKey, withBase)
  }
  
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

  ngAfterViewInit() {
    console.log("[v0] ComponentCarouselComponent initialized")
    console.log("[v0] Title:", this.title)
    console.log("[v0] ComponentType:", this.componentType?.name)
    console.log("[v0] DataList length:", this.dataList?.length)
    console.log("[v0] DataList:", this.dataList)

    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.addEventListener("scroll", this.onScroll.bind(this))
    }
  }

  ngOnDestroy() {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.removeEventListener("scroll", this.onScroll.bind(this))
    }
  }

  private onScroll() {
    if (!this.scrollContainer) return

    const container = this.scrollContainer.nativeElement
    const itemWidth = 320 + 20 // item width + gap
    const scrollLeft = container.scrollLeft
    const centerOffset = container.clientWidth / 2

    // Calculate which item is in the center
    const newIndex = Math.round((scrollLeft + centerOffset - itemWidth / 2) / itemWidth)

    if (newIndex !== this.currentIndex && newIndex >= 0 && newIndex < this.dataList.length) {
      this.currentIndex = newIndex
      this.updateActiveItem()
    }
  }

  private updateActiveItem() {
    if (!this.scrollContainer) return

    const items = this.scrollContainer.nativeElement.querySelectorAll(".carousel-item")
    items.forEach((item, index) => {
      if (index === this.currentIndex) {
        ;(item as HTMLElement).style.transform = "scale(1)"
        ;(item as HTMLElement).style.opacity = "1"
        ;(item as HTMLElement).style.filter = "blur(0)"
      } else {
        ;(item as HTMLElement).style.transform = "scale(0.85)"
        ;(item as HTMLElement).style.opacity = "0.5"
        ;(item as HTMLElement).style.filter = "blur(2px)"
      }
    })
  }

  scrollToIndex(index: number) {
    if (!this.scrollContainer || index < 0 || index >= this.dataList.length) return

    const container = this.scrollContainer.nativeElement
    const itemWidth = 320 + 20 // item width + gap
    const scrollLeft = index * itemWidth

    container.scrollTo({
      left: scrollLeft,
      behavior: "smooth",
    })
  }

  trackByIndex = (index: number) => index
}
