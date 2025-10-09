import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

@Component({
  selector: "app-progress-metric-card",
  standalone: false,
  templateUrl: "./progress-metric-card.html",
  styleUrls: ["./progress-metric-card.scss"],
})
export class ProgressMetricCardComponent {
  /** Identificatore evento (verrà usato dal data-layer/WebSocket) */
  @Input() eventId!: string;

  /** Identificatore statistica (es. 'capacity_utilization', 'avg_basket_value', …) */
  @Input() statId!: string;

  /** API di presentazione (restano override manuali finché non colleghi i dati reali) */
  title = "Capienza";
  icon = "speedometer-outline"; // icona Ionicons a piacere
  value = 85;                   // valore attuale
  unit = "%";                   // unità
  maxValue = 100;               // valore massimo per la barra
  showGradient = true;          // stile
  
  get progressPercentage(): number {
    const max = this.maxValue || 100;
    const pct = (this.value / max) * 100;
    return Math.max(0, Math.min(pct, 100));
  }
}
