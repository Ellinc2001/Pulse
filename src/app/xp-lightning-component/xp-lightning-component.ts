import { Component, type OnInit } from "@angular/core"
import { XpGainEvent } from "../services/xp-lightning.service"

interface Lightning {
  id: string
  startX: number
  startY: number
  endX: number
  endY: number
  delay: number
  hue: number
  pathData: string
}

@Component({
  selector: "app-xp-lightning",
  templateUrl: "./xp-lightning-component.html",
  styleUrls: ["./xp-lightning-component.scss"],
  standalone: false
})
export class XpLightningComponent implements OnInit {
  lightnings: Lightning[] = []

  ngOnInit() {}

  triggerAnimation(event: XpGainEvent) {
    const sourceElement =
      event.sourceElement ||
      document.getElementById("xp-badge") ||
      document.querySelector(".level-badge") ||
      document.querySelector(".xp-badge") ||
      document.querySelector(".badges-row")

    const targetElement =
      document.querySelector('ion-tab-button[routerlink="/my-vibes"]') || document.querySelector("ion-tab-button")

    console.log("[v0] XP animation - sourceElement:", sourceElement)
    console.log("[v0] XP animation - targetElement:", targetElement)

    if (!sourceElement || !targetElement) {
      console.warn("[v0] XP animation: source or target element not found")
      return
    }

    const sourceRect = sourceElement.getBoundingClientRect()
    const targetRect = targetElement.getBoundingClientRect()

    console.log("[v0] XP animation - sourceRect:", sourceRect)
    console.log("[v0] XP animation - targetRect:", targetRect)

    // Calculate positions
    const startX = sourceRect.left + sourceRect.width / 2
    const startY = sourceRect.top + sourceRect.height / 2
    const endX = targetRect.left + targetRect.width / 2
    const endY = targetRect.top + targetRect.height / 2

    // Generate 6-8 lightnings with random delays and colors
    const count = 6 + Math.floor(Math.random() * 3) // 6-8
    const newLightnings: Lightning[] = []

    for (let i = 0; i < count; i++) {
      // Vary the start position slightly for natural effect
      const offsetX = (Math.random() - 0.5) * 50
      const offsetY = (Math.random() - 0.5) * 50

      // Hue varies between blue (210) and purple (270)
      const hue = 210 + Math.random() * 60

      const pathData = this.generateRealisticLightningPath()

      newLightnings.push({
        id: `lightning-${Date.now()}-${i}`,
        startX: startX + offsetX,
        startY: startY + offsetY,
        endX,
        endY,
        delay: i * 80, // Stagger slightly
        hue,
        pathData,
      })
    }

    this.lightnings = [...this.lightnings, ...newLightnings]

    console.log("[v0] XP animation - created lightnings:", newLightnings.length)

    setTimeout(() => {
      this.lightnings = this.lightnings.filter((l) => !newLightnings.find((nl) => nl.id === l.id))
    }, 1700)
  }

  private generateRealisticLightningPath(): string {
    const patterns = [
      // Classic lightning bolt with multiple sharp zigzags
      "M20 0 L18 12 L22 12 L17 24 L21 24 L15 40 L17 26 L13 26 L16 16 L12 16 L16 4 L20 0",

      // Asymmetric lightning with random branches
      "M18 0 L16 10 L20 10 L14 22 L19 22 L12 38 L16 24 L11 24 L15 14 L13 14 L18 0",

      // Longer jagged path with sharp turns
      "M19 0 L17 8 L21 8 L16 18 L20 18 L14 28 L18 28 L13 40 L15 30 L12 30 L17 20 L14 20 L19 0",

      // Lightning with secondary small branches
      "M20 0 L18 14 L22 14 L15 26 L19 26 L14 40 M18 14 L16 18 M19 26 L21 30",

      // Thin jagged lightning with varied angles
      "M19 0 L17 11 L21 11 L16 21 L20 21 L15 32 L19 32 L13 40 L16 28 L12 28 L18 18 L15 18 L19 0",

      // Sharp angular lightning
      "M20 0 L17 13 L23 13 L16 25 L22 25 L14 40 L18 27 L13 27 L19 15 L15 15 L20 0",
    ]

    return patterns[Math.floor(Math.random() * patterns.length)]
  }
}
