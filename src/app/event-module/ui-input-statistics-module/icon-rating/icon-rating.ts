import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from "@angular/core"

@Component({
  selector: "app-icon-rating",
  templateUrl: "./icon-rating.html",
  styleUrls: ["./icon-rating.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class IconRatingComponent {
  @Input() label = ""
  @Input() max = 5
  @Input() value = 0
  @Input() iconName = "star"
  @Input() eventId: string = '';
  @Input() statId: string = '';


  @Output() valueChange = new EventEmitter<number>()

  get icons(): number[] {
    return Array.from({ length: this.max }, (_, i) => i + 1)
  }

  onIconClick(rating: number) {
    this.valueChange.emit(rating)
  }
}
