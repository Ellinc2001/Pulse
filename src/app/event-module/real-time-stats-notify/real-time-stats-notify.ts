import { Component, ChangeDetectionStrategy, type OnInit, Input } from "@angular/core"
import { FormControl } from "@angular/forms"
import { ModalController, ToastController } from "@ionic/angular"
import { Location } from "@angular/common"
import { BehaviorSubject, combineLatest } from "rxjs"
import { map, startWith, debounceTime, distinctUntilChanged, shareReplay } from "rxjs/operators"
import { ItemReorderEventDetail } from "@ionic/core"

//
// ====== Tipi base ======
//
export type StatDataType = "number" | "percent" | "rating" | "boolean" | "enum"
export type StatSource = "user_feedback" | "device_metric" | "integration" | "organizer_input" | "derived"
export type StatViz = "gauge" | "meter" | "sparkline" | "bar" | "pie" | "chip" | "badge" | "kpi"

export interface StatParameterDef {
  key: string
  label: string
  type: "string" | "number" | "enum"
  enumChoices?: string[]
}

export interface StatDefinition {
  id: string
  label: string
  description: string
  dataType: StatDataType
  unit?: string
  enumChoices?: string[]
  source: StatSource
  visualization: StatViz
  aggregation: "avg" | "median" | "p95" | "mode" | "count" | "sum" | "custom"
  min?: number
  max?: number
  rateLimitSec?: number
  tags: string[]
  requires?: string[]
  incompatibleWith?: string[]
  parameters?: StatParameterDef[]
  popularityScore?: number
}

export interface EventStatConfig {
  eventId: string
  statId: string
  params?: Record<string, any>
  order?: number
  isRequired?: boolean
  windowSec?: number
}

export interface PresetItem {
  statId: string
  defaultParams?: Record<string, any>
  weight?: number
  windowSec?: number
}

export interface Preset {
  id?: string
  eventType: string
  label: string
  tags: string[]
  recommended: PresetItem[]
}

export interface EventMeta {
  id: string
  name: string
  type: string
  indoor?: boolean
  music?: boolean
  food?: boolean
  wifiExpected?: boolean
  capacity?: number
}

export interface GroupedCategory {
  key: string
  items: StatDefinition[]
}

export type TemplateType = "club" | "concert" | "festival" | "conference" | "sport"

export interface DjSlot {
  time: string
  name: string
  genre: string
  isLive?: boolean
}

export interface CameraFeed {
  name: string
  enabled: boolean
}

@Component({
  selector: "app-real-time-stats-notify",
  templateUrl: "./real-time-stats-notify.html",
  styleUrls: ["./real-time-stats-notify.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class RealTimeStatsNotify implements OnInit {
  @Input() templateType: TemplateType = "club"
  @Input() eventName = "Galaxy Disco Club"

  readonly recommendedMax = 8
  readonly eventId = "EVENT_ID_HERE"

  // Participants
  currentParticipants = 326
  maxCapacity = 500

  // Wait times
  mainEntryWait = 15
  barServiceWait = 7

  // Experience quality
  audioQuality = "4.9 - Perfect"
  djSetQuality = "4.8 - High Energy"
  drinksQuality = "4.7 - Premium"
  energyLevel = "92% - Optimal"

  audioOptions = ["4.9 - Perfect", "4.5 - Good", "3.0 - Medium"]
  djSetOptions = ["4.8 - High Energy", "4.0 - Solid"]
  drinksOptions = ["4.7 - Premium", "3.5 - Standard"]
  energyOptions = ["92% - Optimal", "60% - Chilled"]

  // Vibe & Mood
  vibeLevel = 82
  selectedMoods: Set<string> = new Set(["hype"])
  moods = ["Hype", "Deep", "Euphoric", "Chill"]

  // Temperature
  temperature = 24
  comfortLevelOn = true

  // Night Timeline
  djSlots: DjSlot[] = [
    { time: "23:00", name: "DJ Alex", genre: "House" },
    { time: "01:00", name: "Mark V", genre: "Techno", isLive: true },
    { time: "03:00", name: "Sarah J", genre: "Hardstyle" },
  ]

  // Camera Feeds
  cameraFeeds: CameraFeed[] = [
    { name: "Dancefloor", enabled: true },
    { name: "Bar Area", enabled: false },
  ]

  // Mock data - in real app these would come from services
  private statDefs$ = new BehaviorSubject<StatDefinition[]>([
    {
      id: "queue_wait_time",
      label: "Tempo di attesa in coda",
      description: "Tempo medio di attesa per entrare",
      dataType: "number",
      unit: "minuti",
      source: "user_feedback",
      visualization: "gauge",
      aggregation: "avg",
      tags: ["queue", "flow"],
      popularityScore: 9,
    },
    {
      id: "audio_volume",
      label: "Volume audio",
      description: "Livello percepito del volume musicale",
      dataType: "rating",
      source: "user_feedback",
      visualization: "meter",
      aggregation: "avg",
      min: 1,
      max: 5,
      tags: ["audio"],
      popularityScore: 8,
    },
    {
      id: "crowd_density",
      label: "Densità della folla",
      description: "Quanto è affollato lo spazio",
      dataType: "rating",
      source: "user_feedback",
      visualization: "gauge",
      aggregation: "avg",
      min: 1,
      max: 5,
      tags: ["crowd", "safety"],
      popularityScore: 7,
    },
    {
      id: "food_quality",
      label: "Qualità del cibo",
      description: "Valutazione della qualità gastronomica",
      dataType: "rating",
      source: "user_feedback",
      visualization: "kpi",
      aggregation: "avg",
      min: 1,
      max: 5,
      tags: ["food"],
      parameters: [
        { key: "stand", label: "Stand", type: "string" },
        { key: "category", label: "Categoria", type: "enum", enumChoices: ["Primi", "Secondi", "Dolci", "Bevande"] },
      ],
      popularityScore: 6,
    },
    {
      id: "wifi_quality",
      label: "Qualità Wi-Fi",
      description: "Velocità e stabilità della connessione",
      dataType: "rating",
      source: "device_metric",
      visualization: "meter",
      aggregation: "avg",
      min: 1,
      max: 5,
      tags: ["wifi", "facilities"],
      popularityScore: 5,
    },
    {
      id: "bathroom_cleanliness",
      label: "Pulizia bagni",
      description: "Stato di pulizia delle strutture igieniche",
      dataType: "rating",
      source: "user_feedback",
      visualization: "kpi",
      aggregation: "avg",
      min: 1,
      max: 5,
      tags: ["facilities"],
      popularityScore: 4,
    },
  ])

  private presets$ = new BehaviorSubject<Preset[]>([
    {
      id: "food_festival",
      eventType: "Food Festival",
      label: "Food Festival (Consigliato)",
      tags: ["food", "outdoor"],
      recommended: [
        { statId: "queue_wait_time", weight: 9 },
        { statId: "food_quality", weight: 8 },
        { statId: "crowd_density", weight: 7 },
        { statId: "wifi_quality", weight: 5 },
      ],
    },
  ])

  private meta$ = new BehaviorSubject<EventMeta>({
    id: "EVENT_ID_HERE",
    name: "Festival del Gusto 2024",
    type: "Food Festival",
    indoor: false,
    music: true,
    food: true,
    wifiExpected: true,
    capacity: 5000,
  })

  private initialCfgs$ = new BehaviorSubject<EventStatConfig[]>([])

  // Form controls
  presetKeyCtrl = new FormControl<string | null>("food_festival")
  searchCtrl = new FormControl<string>("", { nonNullable: true })
  showSelectedOnlyCtrl = new FormControl<boolean>(false, { nonNullable: true })
  sortByCtrl = new FormControl<"recommended" | "popularity" | "az">("recommended", { nonNullable: true })

  // Filters
  private sourceFilter$ = new BehaviorSubject<Set<StatSource>>(new Set())
  private dataTypeFilter$ = new BehaviorSubject<Set<StatDataType>>(new Set())
  private tagFilter$ = new BehaviorSubject<Set<string>>(new Set())

  // Selection state
  private selectedMap$ = new BehaviorSubject<Map<string, EventStatConfig>>(new Map())
  private editOpenFor$ = new BehaviorSubject<string | null>(null)
  private paramDrafts = new Map<string, Record<string, any>>()
  private selectedOrder$ = new BehaviorSubject<string[]>([])

  // Derived observables
  activePreset$ = combineLatest([
    this.presets$,
    this.meta$,
    this.presetKeyCtrl.valueChanges.pipe(startWith(this.presetKeyCtrl.value)),
  ]).pipe(
    map(([presets, meta, presetKey]) => {
      const byKey = presetKey ? presets.find((p) => p.id === presetKey || p.eventType === presetKey) : undefined
      const byType = !byKey && meta ? presets.find((p) => p.eventType === meta.type) : undefined
      return byKey ?? byType ?? null
    }),
    shareReplay({ bufferSize: 1, refCount: true }),
  )

  recommendedMap$ = this.activePreset$.pipe(
    map((p) => {
      const mapWeights = new Map<string, number>()
      ;(p?.recommended ?? []).forEach((item) => {
        mapWeights.set(item.statId, item.weight ?? 5)
      })
      return mapWeights
    }),
    shareReplay({ bufferSize: 1, refCount: true }),
  )

  selectedList$ = combineLatest([this.selectedMap$, this.selectedOrder$]).pipe(
    map(([mapSel, order]) => {
      const arr = Array.from(mapSel.values())
      if (order.length) {
        const byId = new Map(arr.map((a) => [a.statId, a]))
        return order.map((id) => byId.get(id)).filter(Boolean) as EventStatConfig[]
      }
      return arr.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    }),
    shareReplay({ bufferSize: 1, refCount: true }),
  )

  selectedCount$ = this.selectedList$.pipe(map((list) => list.length))
  overRecommended$ = this.selectedCount$.pipe(map((n) => n > this.recommendedMax))

  filteredRecommended$ = combineLatest([
    this.statDefs$,
    this.recommendedMap$,
    this.searchCtrl.valueChanges.pipe(startWith(this.searchCtrl.value), debounceTime(120), distinctUntilChanged()),
    this.sourceFilter$,
    this.dataTypeFilter$,
    this.tagFilter$,
    this.showSelectedOnlyCtrl.valueChanges.pipe(startWith(this.showSelectedOnlyCtrl.value)),
    this.selectedMap$,
  ]).pipe(
    map(([defs, recMap, q, sSet, dSet, tSet, onlySel, selMap]) => {
      const recIds = new Set(recMap.keys())
      const filt = this.filterDefs(defs, { q, sources: sSet, dataTypes: dSet, tags: tSet }, selMap, onlySel)
      const rec = filt.filter((d) => recIds.has(d.id))
      return this.sortDefs(rec, "recommended", recMap)
    }),
    shareReplay({ bufferSize: 1, refCount: true }),
  )

  filteredLibraryGrouped$ = combineLatest([
    this.statDefs$,
    this.recommendedMap$,
    this.searchCtrl.valueChanges.pipe(startWith(this.searchCtrl.value), debounceTime(120), distinctUntilChanged()),
    this.sourceFilter$,
    this.dataTypeFilter$,
    this.tagFilter$,
    this.showSelectedOnlyCtrl.valueChanges.pipe(startWith(this.showSelectedOnlyCtrl.value)),
    this.selectedMap$,
    this.sortByCtrl.valueChanges.pipe(startWith(this.sortByCtrl.value)),
  ]).pipe(
    map(([defs, recMap, q, sSet, dSet, tSet, onlySel, selMap, sortBy]) => {
      const recIds = new Set(recMap.keys())
      const pool = this.filterDefs(defs, { q, sources: sSet, dataTypes: dSet, tags: tSet }, selMap, onlySel).filter(
        (d) => !recIds.has(d.id),
      )
      const sorted = this.sortDefs(pool, sortBy ?? "recommended", recMap)
      return this.groupByCategory(sorted)
    }),
    shareReplay({ bufferSize: 1, refCount: true }),
  )

  editOpenForId$ = this.editOpenFor$.asObservable()

  areas = ["Dancefloor", "Bar Area", "Entrance", "VIP Zone"]
  selectedArea = "Dancefloor"

  constructor(
    private location: Location,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
  ) {}

  ngOnInit() {
    // In a real app, load from services
    // For now, mock data is already set in BehaviorSubjects
  }

  back() {
    this.location.back()
  }

  get capacityPercentage(): number {
    return Math.round((this.currentParticipants / this.maxCapacity) * 100)
  }

  get mainEntryDisplay(): string {
    const min = Math.max(0, this.mainEntryWait - 3)
    const max = this.mainEntryWait + 3
    return `${min}-${max} min`
  }

  get barServiceDisplay(): string {
    const min = Math.max(0, this.barServiceWait - 2)
    const max = this.barServiceWait + 2
    return `${min}-${max} min`
  }

  updateParticipants(delta: number) {
    this.currentParticipants = Math.max(0, Math.min(this.maxCapacity, this.currentParticipants + delta))
  }

  updateCapacity(delta: number) {
    this.maxCapacity = Math.max(this.currentParticipants, this.maxCapacity + delta)
  }

  toggleMood(mood: string) {
    const lowerMood = mood.toLowerCase()
    if (this.selectedMoods.has(lowerMood)) {
      this.selectedMoods.delete(lowerMood)
    } else {
      this.selectedMoods.add(lowerMood)
    }
  }

  isMoodActive(mood: string): boolean {
    return this.selectedMoods.has(mood.toLowerCase())
  }

  toggleComfortLevel() {
    this.comfortLevelOn = !this.comfortLevelOn
  }

  toggleCameraFeed(index: number) {
    this.cameraFeeds[index].enabled = !this.cameraFeeds[index].enabled
  }

  addDjSlot() {
    this.djSlots.push({ time: "04:00", name: "New DJ", genre: "TBD" })
  }

  openChat() {
    // Implement chat functionality
  }

  // Filter chip toggles
  toggleSourceChip(src: StatSource) {
    const next = new Set(this.sourceFilter$.value)
    next.has(src) ? next.delete(src) : next.add(src)
    this.sourceFilter$.next(next)
  }

  toggleDataTypeChip(dt: StatDataType) {
    const next = new Set(this.dataTypeFilter$.value)
    next.has(dt) ? next.delete(dt) : next.add(dt)
    this.dataTypeFilter$.next(next)
  }

  toggleTagChip(tag: string) {
    const next = new Set(this.tagFilter$.value)
    next.has(tag) ? next.delete(tag) : next.add(tag)
    this.tagFilter$.next(next)
  }

  // Selection
  async onToggleSelect(def: StatDefinition) {
    const sel = new Map(this.selectedMap$.value)

    if (sel.has(def.id)) {
      sel.delete(def.id)
      this.selectedMap$.next(sel)
      this.selectedOrder$.next(this.selectedOrder$.value.filter((id) => id !== def.id))
      return
    }

    const baseCfg: EventStatConfig = {
      eventId: this.eventId,
      statId: def.id,
      params: this.paramDrafts.get(def.id) ?? {},
      order: (this.selectedOrder$.value.length ? this.selectedOrder$.value.length : 0) + 1,
    }
    sel.set(def.id, baseCfg)

    const requires = (def.requires ?? []).filter((rid) => !sel.has(rid))
    for (const rid of requires) {
      sel.set(rid, { eventId: this.eventId, statId: rid, params: {}, order: (baseCfg.order ?? 0) + 1 })
    }

    this.selectedMap$.next(sel)
    const newOrder = [...this.selectedOrder$.value, def.id, ...requires]
    this.selectedOrder$.next(Array.from(new Set(newOrder)))

    if (requires.length) {
      await this.presentToast(`Aggiunta anche: ${requires.join(", ")}`, "medium")
    }
  }

  // Parameter editor
  openEditor(def: StatDefinition) {
    this.editOpenFor$.next(def.id)
    const current = this.selectedMap$.value.get(def.id)?.params ?? {}
    this.paramDrafts.set(def.id, { ...current })
  }

  closeEditor() {
    this.editOpenFor$.next(null)
  }

  applyParams(def: StatDefinition, params: Record<string, any>) {
    this.paramDrafts.set(def.id, { ...params })
    const sel = new Map(this.selectedMap$.value)
    if (sel.has(def.id)) {
      sel.set(def.id, { ...sel.get(def.id)!, params: { ...params } })
      this.selectedMap$.next(sel)
    }
    this.editOpenFor$.next(null)
  }

  // Reorder
  onReorderSelected(ev: CustomEvent<ItemReorderEventDetail>) {
    const from = ev.detail.from
    const to = ev.detail.to
    const order = [...this.selectedOrder$.value]
    const [moved] = order.splice(from, 1)
    order.splice(to, 0, moved)
    this.selectedOrder$.next(order)
    ev.detail.complete()

    const sel = new Map(this.selectedMap$.value)
    order.forEach((id, idx) => {
      const cfg = sel.get(id)
      if (cfg) sel.set(id, { ...cfg, order: idx + 1 })
    })
    this.selectedMap$.next(sel)
  }

  // Actions
  async onSaveAsPreset() {
    const name = prompt("Nome del preset?")
    if (!name) return
    this.presentToast("Preset salvato", "success")
  }

  async onContinue() {
    const order = this.selectedOrder$.value
    const finalCfgs = order
      .map((id, idx) => this.selectedMap$.value.get(id))
      .filter(Boolean)
      .map((cfg, idx) => ({ ...cfg!, order: idx + 1 })) as EventStatConfig[]

    console.log("Saving configs:", finalCfgs)
    this.presentToast("Configurazione salvata", "success")
  }

  // Utilities
  isSelected(statId: string): boolean {
    return this.selectedMap$.value.has(statId)
  }

  trackByStatId = (_: number, d: StatDefinition) => d.id
  trackByGroup = (_: number, g: GroupedCategory) => g.key

  selectArea(area: string) {
    this.selectedArea = area
  }

  uploadVideo() {
    // Implementare funzionalità upload video/camera
    console.log("Opening camera/gallery for area:", this.selectedArea)
  }

  private async presentToast(message: string, color: "success" | "warning" | "danger" | "medium" = "medium") {
    const t = await this.toastCtrl.create({ message, duration: 2000, color })
    await t.present()
  }

  // Helper methods
  private filterDefs(
    defs: StatDefinition[],
    f: { q?: string; sources: Set<StatSource>; dataTypes: Set<StatDataType>; tags: Set<string> },
    selected: Map<string, EventStatConfig>,
    onlySelected: boolean,
  ): StatDefinition[] {
    const q = (f.q ?? "").trim().toLowerCase()
    return defs.filter((d) => {
      if (onlySelected && !selected.has(d.id)) return false
      if (q) {
        const hay = (d.label + " " + d.description + " " + d.tags.join(" ")).toLowerCase()
        if (!hay.includes(q)) return false
      }
      if (f.sources.size && !f.sources.has(d.source)) return false
      if (f.dataTypes.size && !f.dataTypes.has(d.dataType)) return false
      if (f.tags.size && !d.tags.some((t) => f.tags.has(t))) return false
      return true
    })
  }

  private sortDefs(
    defs: StatDefinition[],
    sortBy: "recommended" | "popularity" | "az",
    recMap: Map<string, number>,
  ): StatDefinition[] {
    const arr = [...defs]
    if (sortBy === "az") {
      return arr.sort((a, b) => a.label.localeCompare(b.label))
    }
    if (sortBy === "popularity") {
      return arr.sort((a, b) => (b.popularityScore ?? 0) - (a.popularityScore ?? 0))
    }
    return arr.sort((a, b) => (recMap.get(b.id) ?? 0) - (recMap.get(a.id) ?? 0) || a.label.localeCompare(b.label))
  }

  private groupByCategory(defs: StatDefinition[]): GroupedCategory[] {
    const CATEGORY_MAP: Record<string, string> = {
      queue: "Queue & Flow",
      flow: "Queue & Flow",
      audio: "Audio/Video",
      video: "Audio/Video",
      food: "Food & Beverage",
      crowd: "Crowd & Safety",
      safety: "Crowd & Safety",
      facilities: "Facilities",
      wifi: "Wi-Fi & Network",
      program: "Program & Timing",
      ops: "Operations",
      integration: "Integrations",
    }

    const groups = new Map<string, StatDefinition[]>()
    for (const d of defs) {
      const catKey = this.pickCategoryKey(d.tags, CATEGORY_MAP) ?? "Other"
      const list = groups.get(catKey) ?? []
      list.push(d)
      groups.set(catKey, list)
    }
    return Array.from(groups.entries()).map(([key, items]) => ({
      key,
      items: items.sort((a, b) => a.label.localeCompare(b.label)),
    }))
  }

  private pickCategoryKey(tags: string[], categoryMap: Record<string, string>): string | null {
    for (const t of tags) {
      const key = categoryMap[t.toLowerCase()]
      if (key) return key
    }
    return null
  }
}
