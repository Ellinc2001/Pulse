import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from "@angular/core"

@Component({
  selector: "app-rating-circle",
  templateUrl: "./rating-circle.html",
  styleUrls: ["./rating-circle.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class RatingCirclesComponent {
  @Input() label = ""
  @Input() max = 5
  @Input() value = 0
  @Input() eventId: string = '';
  @Input() statId: string = '';


  @Output() valueChange = new EventEmitter<number>()

  get circles(): number[] {
    return Array.from({ length: this.max }, (_, i) => i + 1)
  }

  onCircleClick(rating: number) {
    this.valueChange.emit(rating)
  }
}
