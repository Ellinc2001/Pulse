import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from "@angular/core"
import { CommonModule } from "@angular/common"
import { EventData } from "../event-card/event-card" 
import { FilterOption, SubFilterOption } from "../filter-bar/filter-bar"

// Leaflet types
declare var L: any

@Component({
  selector: "app-event-search-real",
  standalone: false,
  templateUrl: "./event-search.html",
  styleUrls: ["./event-search.scss"],
})
export class EventSearchComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('mapContainer') mapContainer!: ElementRef

  private map: any
  private userMarker: any
  private eventMarkers: any[] = []
  private userLocation: { lat: number, lng: number } | null = null
  private leafletLoaded = false
  private mapInitialized = false
  private clickAnimationLayer: any

  // Stati di caricamento
  isLoadingLocation = false
  isLoadingMap = true
  locationError = false
  mapError = false

  // Filtri
  filters: FilterOption[] = []

  // Coordinate reali di Avellino con STATUS DINAMICI
  eventLocations: EventData[] = [
    {
      id: '1',
      name: 'Fralù Cafè',
      address: 'Via F.lli Urciuoli 14/16, 83100 Avellino AV',
      type: 'cafe',
      status: 'popular',
      distance: 0.3,
      activity: 'Aperitivo & Coffee',
      lat: 40.9146,
      lng: 14.7903,
      color: 'cyan'
    },
    {
      id: '2',
      name: 'Bar Cappuccini',
      address: 'Via Francesco Scandone, 3, 83100 Avellino AV',
      type: 'bar',
      status: 'busy',
      distance: 0.5,
      activity: 'Cocktails & Music',
      lat: 40.9167,
      lng: 14.7889,
      color: 'purple'
    },
    {
      id: '3',
      name: '8 Mile',
      address: 'Viale Italia, 83100 Avellino AV',
      type: 'bar',
      status: 'very busy',
      distance: 0.8,
      activity: 'Live Music & DJ',
      lat: 40.9134,
      lng: 14.7856,
      color: 'orange'
    },
    {
      id: '4',
      name: 'Osteria del Borgo',
      address: 'Via Circumvallazione, 83100 Avellino AV',
      type: 'restaurant',
      status: 'quiet',
      distance: 1.2,
      activity: 'Cena & Wine',
      lat: 40.9178,
      lng: 14.7912,
      color: 'pink'
    },
    {
      id: '5',
      name: 'Club Centrale',
      address: 'Corso Vittorio Emanuele, 83100 Avellino AV',
      type: 'nightclub',
      status: 'popular',
      distance: 0.7,
      activity: 'DJ Set & Dance',
      lat: 40.9156,
      lng: 14.7878,
      color: 'green'
    },
    {
      id: '6',
      name: 'Lounge 83',
      address: 'Via Roma, 83100 Avellino AV',
      type: 'bar',
      status: 'busy',
      distance: 0.9,
      activity: 'Cocktails & Lounge',
      lat: 40.9142,
      lng: 14.7895,
      color: 'blue'
    }
  ]

  selectedLocation: EventData | null = null
  filteredLocations: EventData[] = []

  // Palette di colori neon diversi per ogni card
  private neonColorPalette: ('red' | 'yellow' | 'cyan' | 'green' | 'purple' | 'orange' | 'pink' | 'blue')[] = [
    'cyan', 'purple', 'orange', 'pink', 'green', 'blue', 'red', 'yellow'
  ];

  ngOnInit() {
    console.log('🚀 Inizializzazione componente...')
    this.updateColorsBasedOnStatus()
    this.filteredLocations = [...this.eventLocations]
    this.loadLeaflet()
  }

  ngAfterViewInit() {
    console.log('📍 View inizializzata, aspetto Leaflet...')
    this.waitForLeafletAndInitialize()
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove()
    }
  }

  // Filter handlers
  onFilterChange(filter: FilterOption) {
    console.log('Filter changed:', filter)
    this.applyFilters()
  }

  onSubFilterChange(event: {filter: FilterOption, subFilter: SubFilterOption}) {
    console.log('Sub-filter changed:', event)
    this.applyFilters()
  }

  private applyFilters() {
    let filtered = [...this.eventLocations]

    // Applica filtri attivi
    this.filters.forEach(filter => {
      if (filter.active && filter.subcategories) {
        const activeSubFilters = filter.subcategories.filter((sub: { active: any }) => sub.active)
        
        if (activeSubFilters.length > 0) {
          filtered = filtered.filter(location => {
            return this.matchesFilter(location, filter, activeSubFilters)
          })
        }
      }
    })

    this.filteredLocations = filtered
    console.log('Filtered locations:', this.filteredLocations.length)
  }

  private matchesFilter(location: EventData, filter: FilterOption, activeSubFilters: SubFilterOption[]): boolean {
    switch (filter.id) {
      case 'eventType':
        return activeSubFilters.some(sub => sub.id === location.type)
      
      case 'distance':
        return activeSubFilters.some(sub => {
          const maxDistance = parseFloat(sub.id.replace(/[^\d.]/g, ''))
          return location.distance <= maxDistance
        })
      
      case 'time':
        // Logica per orari (esempio semplificato)
        return activeSubFilters.some(sub => sub.id === 'now') // Tutti aperti ora per semplicità
      
      case 'guests':
        return activeSubFilters.some(sub => {
          switch (sub.id) {
            case 'quiet': return location.status === 'quiet'
            case 'moderate': return location.status === 'popular'
            case 'busy': return location.status === 'busy'
            case 'packed': return location.status === 'very busy'
            default: return true
          }
        })
      
      default:
        return true
    }
  }

  // Event Card handlers
  onEventCardClick(event: EventData) {
    this.selectedLocation = event
    console.log('Event card clicked:', event)
    
    if (this.map) {
      this.map.setView([event.lat, event.lng], 16)
    }
  }

  onEventDetailsClick(event: EventData) {
    console.log('Event details clicked:', event)
    // Implementa logica per mostrare dettagli
  }

  onEventVenueClick(event: EventData) {
    console.log('Event venue clicked:', event)
    // Implementa logica per navigare al locale
  }

  // AGGIORNA COLORI CON PALETTE DIVERSA per ogni card
  private updateColorsBasedOnStatus() {
    this.eventLocations.forEach((location, index) => {
      // Assegna colori in modo ciclico dalla palette
      location.color = this.neonColorPalette[index % this.neonColorPalette.length];
    });
  }

  // MAPPA COLORE → HEX per gli stili
  private getColorHex(color: string): string {
    const colorMap = {
      'red': '#FF4757',
      'yellow': '#FFA502', 
      'cyan': '#00FFFF',
      'green': '#2ED573',
      'purple': '#8A2BE2',
      'orange': '#FF8A00',
      'pink': '#FF1493',
      'blue': '#00BFFF'
    };
    return colorMap[color as keyof typeof colorMap] || '#00FFFF';
  }

  // MAPPA STATUS → COLORE
  private getColorByStatus(status: string): 'red' | 'yellow' | 'cyan' | 'green' {
    switch (status) {
      case 'very busy': return 'red'
      case 'busy': return 'yellow'
      case 'popular': return 'cyan'
      case 'quiet': return 'green'
      default: return 'cyan'
    }
  }

  private async loadLeaflet() {
    try {
      console.log('📦 Caricamento Leaflet...')
      
      // Carica CSS di Leaflet
      if (!document.querySelector('link[href*="leaflet.css"]')) {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
        link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY='
        link.crossOrigin = ''
        document.head.appendChild(link)
        console.log('✅ CSS Leaflet caricato')
      }

      // Carica JS di Leaflet
      if (!document.querySelector('script[src*="leaflet.js"]')) {
        const script = document.createElement('script')
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
        script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo='
        script.crossOrigin = ''
        
        script.onload = () => {
          console.log('✅ JS Leaflet caricato')
          this.leafletLoaded = true
        }
        
        script.onerror = () => {
          console.error('❌ Errore caricamento Leaflet')
          this.mapError = true
          this.isLoadingMap = false
        }
        
        document.head.appendChild(script)
      } else {
        this.leafletLoaded = true
      }
    } catch (error) {
      console.error('❌ Errore nel caricamento Leaflet:', error)
      this.mapError = true
      this.isLoadingMap = false
    }
  }

  private waitForLeafletAndInitialize() {
    const checkLeaflet = () => {
      if (typeof L !== 'undefined' && this.leafletLoaded && !this.mapInitialized) {
        console.log('🗺️ Leaflet pronto, inizializzo mappa...')
        this.initializeMap()
      } else if (!this.mapError) {
        console.log('⏳ Aspetto Leaflet...')
        setTimeout(checkLeaflet, 100)
      }
    }
    checkLeaflet()
  }

  private initializeMap() {
    try {
      if (!this.mapContainer?.nativeElement) {
        console.error('❌ Container mappa non trovato')
        return
      }

      console.log('🗺️ Inizializzazione mappa...')
      
      // Inizializza mappa centrata su Avellino
      this.map = L.map(this.mapContainer.nativeElement, {
        zoomControl: false,
        attributionControl: false,
        preferCanvas: true
      }).setView([40.9146, 14.7903], 14)

      console.log('✅ Mappa creata')

      // MAPPA CHIARA - OpenStreetMap standard
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map)

      console.log('✅ Tile layer CHIARO aggiunto')

      // Applica stili base senza filtri scuri
      this.applyLightMapStyles()

      // Crea layer per animazioni click
      this.clickAnimationLayer = L.layerGroup().addTo(this.map)

      // Aggiungi markers degli eventi
      this.addEventMarkers()

      this.mapInitialized = true
      this.isLoadingMap = false

      console.log('✅ Mappa inizializzata, ottengo posizione utente...')

      // Ottieni posizione utente con FALLBACK ROBUSTO
      this.getUserLocationWithFallback()

    } catch (error) {
      console.error('❌ Errore inizializzazione mappa:', error)
      this.mapError = true
      this.isLoadingMap = false
    }
  }

  private applyLightMapStyles() {
    try {
      const mapElement = this.mapContainer.nativeElement
      
      // Stili base senza filtri scuri
      mapElement.style.borderRadius = '20px'
      mapElement.style.overflow = 'hidden'
      mapElement.style.boxShadow = '0 0 30px rgba(0, 229, 204, 0.2)'
      
      console.log('✅ Stili CHIARI applicati')
    } catch (error) {
      console.error('❌ Errore applicazione stili:', error)
    }
  }

  // GEOLOCALIZZAZIONE CON FALLBACK ROBUSTO
  private getUserLocationWithFallback() {
    const isSecureContext = window.isSecureContext || location.hostname === 'localhost'
    
    if (!navigator.geolocation) {
      console.log('❌ Geolocalizzazione non supportata')
      this.fallbackToAvellino()
      return
    }

    if (!isSecureContext) {
      console.log('⚠️ Contesto non sicuro, uso fallback')
      this.fallbackToAvellino()
      return
    }

    console.log('📍 Richiesta posizione utente...')

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('✅ Posizione ottenuta:', position.coords)
        this.userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        this.addUserMarker()
        this.map.setView([this.userLocation.lat, this.userLocation.lng], 15)
        this.updateDistances()
      },
      (error) => {
        console.log('❌ Errore geolocalizzazione:', error.message)
        this.fallbackToAvellino()
      },
      {
        enableHighAccuracy: false,
        timeout: 8000,
        maximumAge: 600000
      }
    )
  }

  private fallbackToAvellino() {
    console.log('🏙️ Fallback su Avellino centro')
    this.userLocation = { lat: 40.9146, lng: 14.7903 }
    this.addUserMarker()
    this.updateDistances()
  }

  private addUserMarker() {
    if (!this.userLocation || !this.map) return

    console.log('👤 Aggiunta marker utente')

    const userIcon = L.divIcon({
      className: 'user-marker',
      html: `
        <div class="user-marker-container">
          <div class="user-pulse"></div>
          <div class="user-dot"></div>
          <div class="radar-ring radar-1"></div>
          <div class="radar-ring radar-2"></div>
          <div class="radar-ring radar-3"></div>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 20]
    })

    this.userMarker = L.marker([this.userLocation.lat, this.userLocation.lng], {
      icon: userIcon,
      zIndexOffset: 1000
    }).addTo(this.map)

    console.log('✅ Marker utente aggiunto')
  }

  private addEventMarkers() {
    if (!this.map) return

    console.log('📍 Aggiunta markers eventi con ANIMAZIONI CLICK')

    this.eventLocations.forEach((location, index) => {
      const eventIcon = L.divIcon({
        className: 'event-marker',
        html: `
        <div class="event-marker-container" data-status="${location.status}" data-color="${location.color}">
          <div class="event-pulse ${location.color}"></div>
          <div class="event-dot ${location.color}"></div>
          <div class="event-ring ${location.color}"></div>
          <div class="status-indicator ${location.status}"></div>
        </div>
      `,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      })

      const marker = L.marker([location.lat, location.lng], {
        icon: eventIcon
      }).addTo(this.map)

      const popupContent = `
      <div class="custom-popup">
        <h3>${location.name}</h3>
        <p class="address">${location.address}</p>
        <p class="status ${location.status}" style="color: ${this.getStatusColor(location.status)}">
          <span class="status-dot ${location.color}"></span>
          ${location.status.toUpperCase()}
        </p>
        <p class="activity">${location.activity}</p>
        <p class="distance">${location.distance} km</p>
      </div>
    `

      marker.bindPopup(popupContent, {
        className: 'custom-popup-container'
      })

      // ANIMAZIONE CERCHI PULSANTI AL CLICK
      marker.on('click', (e: { latlng: any }) => {
        this.onLocationClick(location)
        this.triggerClickAnimation(e.latlng, location.color)
      })

      this.eventMarkers.push(marker)
    })

    console.log('✅ Markers eventi con CLICK ANIMATIONS aggiunti')
  }

  // ANIMAZIONE CERCHI PULSANTI AL CLICK - PALETTE ESTESA
  private triggerClickAnimation(latlng: any, color: string) {
    console.log('💥 Trigger click animation:', color)
    
    // Rimuovi animazioni precedenti
    this.clickAnimationLayer.clearLayers()
    
    // Colori per animazione - PALETTE ESTESA
    const colorMap = {
      'red': '#FF4757',
      'yellow': '#FFA502', 
      'cyan': '#00FFFF',
      'green': '#2ED573',
      'purple': '#8A2BE2',
      'orange': '#FF8A00',
      'pink': '#FF1493',
      'blue': '#00BFFF'
    }
    
    const animationColor = colorMap[color as keyof typeof colorMap] || '#00FFFF'
    
    // Crea 3 cerchi concentrici che si espandono
    for (let i = 1; i <= 3; i++) {
      setTimeout(() => {
        const circle = L.circle(latlng, {
          radius: 0,
          fillColor: animationColor,
          fillOpacity: 0.3,
          color: animationColor,
          weight: 3,
          opacity: 0.8
        }).addTo(this.clickAnimationLayer)
        
        // Animazione espansione
        let currentRadius = 0
        let currentOpacity = 0.8
        const maxRadius = 100 * i // Cerchi sempre più grandi
        const animationDuration = 1000 // 1 secondo
        const steps = 60 // 60 FPS
        const radiusStep = maxRadius / steps
        const opacityStep = currentOpacity / steps
        
        const animate = () => {
          currentRadius += radiusStep
          currentOpacity -= opacityStep
          
          if (currentRadius < maxRadius && currentOpacity > 0) {
            circle.setRadius(currentRadius)
            circle.setStyle({
              fillOpacity: currentOpacity * 0.3,
              opacity: currentOpacity
            })
            requestAnimationFrame(animate)
          } else {
            // Rimuovi cerchio alla fine dell'animazione
            this.clickAnimationLayer.removeLayer(circle)
          }
        }
        
        requestAnimationFrame(animate)
      }, i * 200) // Delay tra i cerchi
    }
  }

  private updateDistances() {
    if (!this.userLocation) return

    this.eventLocations.forEach(location => {
      const distance = this.calculateDistance(
        this.userLocation!.lat,
        this.userLocation!.lng,
        location.lat,
        location.lng
      )
      location.distance = Math.round(distance * 10) / 10
    })

    this.eventLocations.sort((a, b) => a.distance - b.distance)
    this.filteredLocations = [...this.eventLocations]
    console.log('✅ Distanze aggiornate')
  }

  private calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371
    const dLat = this.deg2rad(lat2 - lat1)
    const dLng = this.deg2rad(lng2 - lng1)
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLng/2) * Math.sin(dLng/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI/180)
  }

  onLocationClick(location: EventData) {
    this.selectedLocation = location
    console.log('Selected location:', location)
    
    if (this.map) {
      this.map.setView([location.lat, location.lng], 16)
    }
  }

  onSearchClick() {
    console.log('Search clicked')
    if (this.userLocation && this.map) {
      this.map.setView([this.userLocation.lat, this.userLocation.lng], 15)
    }
  }

  retryLocation() {
    this.locationError = false
    this.getUserLocationWithFallback()
  }

  retryMap() {
    this.mapError = false
    this.isLoadingMap = true
    this.loadLeaflet()
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'very busy': return '#FF4757'
      case 'busy': return '#FFA502'
      case 'popular': return '#00E5CC'
      case 'quiet': return '#2ED573'
      default: return '#8B9DC3'
    }
  }
}
