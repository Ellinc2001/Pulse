import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { CommonModule } from "@angular/common";

/** IMPORT: usa i tuoi export reali */
// import {
//   STAT_META,
//   REGISTRY_COMPONENT_SELECTOR,
//   REGISTRY_INPUT_COMPONENT_SELECTOR,
// } from "../stat-visual-map";

/** Piccolo tipo di appoggio per il rendering */
type RenderEntry = {
  id: string;
  label: string;
  group: string;
  inputSelector: string; // es: 'app-range-slider'
  uiSelector: string;    // es: 'app-progress-metric-card' (se mai ti servisse per preview)
};

@Component({
  selector: "app-real-time-stats-notify",
  templateUrl: "./real-time-stats-notify.html",
  styleUrls: ["./real-time-stats-notify.scss"],
  standalone: false,
})
export class RealTimeStatsNotify {
openChat() {
throw new Error('Method not implemented.');
}
groupedEntries: any;
eventId: string = '1'
goBack() {
throw new Error('Method not implemented.');
}
  // /** Event id di esempio (passalo davvero quando navighi qui) */
  // eventId = "evt_12345_demo";

  // /** Esempio: id statistiche scelte dall’organizzatore (ordine intenzionale) */
  // chosenStatIds: string[] = [
  //   "capacity_utilization",
  //   "area_crowding_pct",
  //   "timeline_program",
  //   "food_stand_wait",
  //   "avg_basket_value",
  //   "sound_quality",
  //   "sentiment_share",
  //   "wifi_quality",
  //   "parking_occupancy",
  // ];

  // /** Mappa gruppo → entries, per sezioni ordinate */
  // groupedEntries: Array<{ group: string; items: RenderEntry[] }> = [];

  // constructor(private location: Location) {}

  // ngOnInit(): void {
  //   this.rebuildEntries();
  // }

  // /** Ricava dai chosenStatIds i componenti di input corretti e li raggruppa per 'group' */
  // private rebuildEntries(): void {
  //   const seenGroups: string[] = [];
  //   const byGroup = new Map<string, RenderEntry[]>();

  //   for (const id of this.chosenStatIds) {
  //     const meta = STAT_META[id];
  //     if (!meta) {
  //       console.warn(`[notify] stat id non trovato in STAT_META: ${id}`);
  //       continue;
  //     }
  //     const inputSelector = REGISTRY_INPUT_COMPONENT_SELECTOR[meta.inputComponent];
  //     const uiSelector = REGISTRY_COMPONENT_SELECTOR[meta.uiComponent];

  //     if (!inputSelector) {
  //       console.warn(`[notify] inputSelector non risolto per stat: ${id}`);
  //       continue;
  //     }

  //     const entry: RenderEntry = {
  //       id,
  //       label: meta.label,
  //       group: meta.group ?? "Altro",
  //       inputSelector,
  //       uiSelector,
  //     };

  //     if (!byGroup.has(entry.group)) {
  //       byGroup.set(entry.group, []);
  //       seenGroups.push(entry.group); // preserva l’ordine di comparsa
  //     }
  //     byGroup.get(entry.group)!.push(entry);
  //   }

  //   this.groupedEntries = seenGroups.map((g) => ({
  //     group: g,
  //     items: byGroup.get(g)!,
  //   }));
  // }

  // // NAV
  // goBack() {
  //   this.location.back();
  // }

  // openChat() {
  //   // hook verso la tua chat
  //   console.log("open chat");
  // }
}
