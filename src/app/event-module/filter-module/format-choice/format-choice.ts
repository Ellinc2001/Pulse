import { Component, type OnInit } from "@angular/core"
import { ModalController } from "@ionic/angular"

interface EventFormat {
  id: string
  name: string
  icon: string
  description: string
  enabled: boolean
}

@Component({
  selector: "app-format-choice",
  templateUrl: "./format-choice.html",
  styleUrls: ["./format-choice.scss"],
  standalone: false
})
export class FormatChoiceComponent implements OnInit {
  searchQuery = ""
  selectedFormat = "club"

  formats: EventFormat[] = [
    {
      id: "club",
      name: "Club/Disco",
      icon: "nightlife",
      description: "Eventi notturni con DJ set e musica elettronica.",
      enabled: true,
    },
    {
      id: "rooftop",
      name: "Rooftop",
      icon: "roofing",
      description: "Party esclusivi con vista panoramica sulla città.",
      enabled: false,
    },
    {
      id: "festival",
      name: "Festival",
      icon: "confirmation_number",
      description: "Grandi eventi musicali con più artisti e palchi.",
      enabled: false,
    },
    {
      id: "concert",
      name: "Concerto",
      icon: "music_note",
      description: "Esibizioni dal vivo di band e artisti solisti.",
      enabled: false,
    },
  ]

  filteredFormats: EventFormat[] = []

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.filteredFormats = this.formats
  }

  onSearchChange() {
    const query = this.searchQuery.toLowerCase().trim()
    if (query === "") {
      this.filteredFormats = this.formats
    } else {
      this.filteredFormats = this.formats.filter(
        (format) => format.name.toLowerCase().includes(query) || format.description.toLowerCase().includes(query),
      )
    }
  }

  selectFormat(format: EventFormat) {
    if (format.enabled) {
      this.selectedFormat = format.id
    }
  }

  close() {
    this.modalController.dismiss()
  }

  continue() {
    if (this.selectedFormat) {
      this.modalController.dismiss({
        format: this.selectedFormat,
      })
    }
  }
}
