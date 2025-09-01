import { Component, Output, EventEmitter, Input, ViewChild, ElementRef } from "@angular/core"
import { CommonModule } from "@angular/common"

export interface FilterOption {
  id: string
  label: string
  icon: string
  color: string
  active: boolean
  hasSubcategories?: boolean
  subcategories?: SubFilterOption[]
}

export interface SubFilterOption {
  id: string
  label: string
  active: boolean
}

@Component({
  selector: "filter-bar",
  standalone: false,
  templateUrl: "./filter-bar.html",
  styleUrls: ["./filter-bar.scss"],
})
export class FilterBarComponent {
  @Input() filters: FilterOption[] = []
  @Output() filterChange = new EventEmitter<FilterOption>()
  @Output() subFilterChange = new EventEmitter<{filter: FilterOption, subFilter: SubFilterOption}>()
  
  @ViewChild('scrollContainer') scrollContainer!: ElementRef

  activeOverlayFilter: FilterOption | null = null
  public Math = Math;

  // Custom range values for distance/price filters
  customRangeStart = 0
  customRangeEnd = 2
  isDragging = false

  // Main filters - horizontal scrollable
  mainFilters: FilterOption[] = [
    {
      id: 'eventType',
      label: 'Event',
      icon: 'star',
      color: '#00E5CC',
      active: true, // Default active like in image
      hasSubcategories: true,
      subcategories: [
        { id: 'nightclub', label: 'Nightclub', active: false },
        { id: 'bar', label: 'Bar', active: false },
        { id: 'restaurant', label: 'Restaurant', active: false },
        { id: 'cafe', label: 'Cafe', active: false },
        { id: 'venue', label: 'Venue', active: false },
        { id: 'lounge', label: 'Lounge', active: false }
      ]
    },
    {
      id: 'time',
      label: 'Time',
      icon: 'clock',
      color: '#00BFFF',
      active: false,
      hasSubcategories: true,
      subcategories: [
        { id: 'now', label: 'Open Now', active: false },
        { id: 'evening', label: 'Evening (18-22)', active: false },
        { id: 'night', label: 'Night (22-02)', active: false },
        { id: 'latenight', label: 'Late Night (02-06)', active: false },
        { id: 'allday', label: 'All Day', active: false }
      ]
    },
    {
      id: 'distance',
      label: 'Distance',
      icon: 'navigation',
      color: '#8A2BE2',
      active: false,
      hasSubcategories: true,
      subcategories: [
        { id: '500m', label: 'Within 500m', active: false },
        { id: '1km', label: 'Within 1km', active: false },
        { id: '2km', label: 'Within 2km', active: false },
        { id: '5km', label: 'Within 5km', active: false },
        { id: '10km', label: 'Within 10km', active: false }
      ]
    },
    {
      id: 'price',
      label: 'Price',
      icon: 'dollar-sign',
      color: '#FF8A00',
      active: false,
      hasSubcategories: true,
      subcategories: [
        { id: 'free', label: 'Free Entry', active: false },
        { id: 'cheap', label: '€ (Under 10€)', active: false },
        { id: 'moderate', label: '€€ (10-25€)', active: false },
        { id: 'expensive', label: '€€€ (25-50€)', active: false },
        { id: 'luxury', label: '€€€€ (50€+)', active: false }
      ]
    },
    {
      id: 'rating',
      label: 'Rating',
      icon: 'star',
      color: '#00FF80',
      active: false,
      hasSubcategories: true,
      subcategories: [
        { id: '5star', label: '5 Stars', active: false },
        { id: '4plus', label: '4+ Stars', active: false },
        { id: '3plus', label: '3+ Stars', active: false },
        { id: '2plus', label: '2+ Stars', active: false }
      ]
    },
    {
      id: 'music',
      label: 'Music',
      icon: 'music',
      color: '#FF1493',
      active: false,
      hasSubcategories: true,
      subcategories: [
        { id: 'electronic', label: 'Electronic', active: false },
        { id: 'house', label: 'House', active: false },
        { id: 'techno', label: 'Techno', active: false },
        { id: 'jazz', label: 'Jazz', active: false },
        { id: 'rock', label: 'Rock', active: false },
        { id: 'pop', label: 'Pop', active: false },
        { id: 'latin', label: 'Latin', active: false }
      ]
    },
    {
      id: 'atmosphere',
      label: 'Atmosphere',
      icon: 'users',
      color: '#FFD700',
      active: false,
      hasSubcategories: true,
      subcategories: [
        { id: 'quiet', label: 'Quiet & Intimate', active: false },
        { id: 'moderate', label: 'Moderate Crowd', active: false },
        { id: 'lively', label: 'Lively & Social', active: false },
        { id: 'party', label: 'Party Atmosphere', active: false }
      ]
    },
    {
      id: 'amenities',
      label: 'Amenities',
      icon: 'check-square',
      color: '#00E5CC',
      active: false,
      hasSubcategories: true,
      subcategories: [
        { id: 'parking', label: 'Parking Available', active: false },
        { id: 'wifi', label: 'Free WiFi', active: false },
        { id: 'outdoor', label: 'Outdoor Seating', active: false },
        { id: 'food', label: 'Food Available', active: false },
        { id: 'cocktails', label: 'Craft Cocktails', active: false },
        { id: 'dancefloor', label: 'Dance Floor', active: false }
      ]
    }
  ]

  ngOnInit() {
    if (this.filters.length === 0) {
      this.filters = [...this.mainFilters]
    }
  }

  onMainFilterClick(filter: FilterOption) {
    if (filter.hasSubcategories) {
      this.activeOverlayFilter = filter
      // Reset custom range when opening distance/price filters
      if (filter.id === 'distance' || filter.id === 'price') {
        this.customRangeStart = 0
        this.customRangeEnd = filter.id === 'distance' ? 2 : 25
      }
    } else {
      // Toggle simple filter
      filter.active = !filter.active
      this.filterChange.emit(filter)
    }
  }

  onPresetClick(preset: SubFilterOption) {
    // Clear all other presets first
    if (this.activeOverlayFilter?.subcategories) {
      this.activeOverlayFilter.subcategories.forEach(sub => {
        sub.active = false
      })
    }
    
    // Activate clicked preset
    preset.active = true
    
    if (this.activeOverlayFilter) {
      this.activeOverlayFilter.active = true
      this.subFilterChange.emit({ 
        filter: this.activeOverlayFilter, 
        subFilter: preset 
      })
    }
  }

  onSubFilterClick(subFilter: SubFilterOption) {
    subFilter.active = !subFilter.active
    
    if (this.activeOverlayFilter) {
      // Update main filter active state
      const hasActiveSubFilters = this.activeOverlayFilter.subcategories?.some(sub => sub.active) || false
      this.activeOverlayFilter.active = hasActiveSubFilters
      
      this.subFilterChange.emit({ 
        filter: this.activeOverlayFilter, 
        subFilter 
      })
    }
  }

  startSliderDrag(event: MouseEvent | TouchEvent) {
    this.isDragging = true
    event.preventDefault()
    
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!this.isDragging) return
      
      const slider = (event.target as HTMLElement).parentElement
      if (!slider) return
      
      const rect = slider.getBoundingClientRect()
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      const percentage = Math.max(0, Math.min(100, ((clientX - rect.left - 16) / (rect.width - 32)) * 100))
      
      if (this.activeOverlayFilter?.id === 'distance') {
        this.customRangeEnd = Math.round((percentage / 100) * 20)
      } else if (this.activeOverlayFilter?.id === 'price') {
        this.customRangeEnd = Math.round((percentage / 100) * 100)
      }
    }
    
    const handleEnd = () => {
      this.isDragging = false
      document.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseup', handleEnd)
      document.removeEventListener('touchmove', handleMove)
      document.removeEventListener('touchend', handleEnd)
    }
    
    document.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseup', handleEnd)
    document.addEventListener('touchmove', handleMove)
    document.addEventListener('touchend', handleEnd)
  }

  // Aggiungi questi metodi helper
  onSliderClick(event: MouseEvent) {
    const slider = event.currentTarget as HTMLElement
    const rect = slider.getBoundingClientRect()
    const percentage = Math.max(0, Math.min(100, ((event.clientX - rect.left - 16) / (rect.width - 32)) * 100))
    
    if (this.activeOverlayFilter?.id === 'distance') {
      this.customRangeEnd = Math.round((percentage / 100) * 20)
    } else if (this.activeOverlayFilter?.id === 'price') {
      this.customRangeEnd = Math.round((percentage / 100) * 100)
    }
  }

  getSliderValue(): number {
    return this.customRangeEnd
  }

  getSliderMax(): number {
    return this.activeOverlayFilter?.id === 'distance' ? 20 : 100
  }

  clearAllSubFilters() {
    if (this.activeOverlayFilter?.subcategories) {
      this.activeOverlayFilter.subcategories.forEach(sub => {
        sub.active = false
      })
      this.activeOverlayFilter.active = false
    }
    
    // Reset solo customRangeEnd
    this.customRangeEnd = this.activeOverlayFilter?.id === 'distance' ? 2 : 25
  }

  applyFilters() {
    if (this.activeOverlayFilter) {
      this.filterChange.emit(this.activeOverlayFilter)
    }
    this.closeOverlay()
  }

  closeOverlay() {
    this.activeOverlayFilter = null
  }

  getActiveSubFiltersCount(): number {
    return this.activeOverlayFilter?.subcategories?.filter(sub => sub.active).length || 0
  }

  // Helper methods for distance/price filters
  getPresetLabel(label: string): string {
    // Simplify labels for presets
    if (label.includes('Within')) {
      return label.replace('Within ', '')
    }
    if (label.includes('€')) {
      return label.split(' ')[0] // Just get the € symbols
    }
    return label
  }

  getRangeUnit(): string {
    return this.activeOverlayFilter?.id === 'distance' ? 'km' : '€'
  }

  getSliderStartPercent(): number {
    const max = this.getSliderMax()
    return (this.customRangeStart / max) * 100
  }

  getSliderEndPercent(): number {
    const max = this.getSliderMax()
    return (this.customRangeEnd / max) * 100
  }

  getSliderWidthPercent(): number {
    const max = this.getSliderMax()
    return ((this.customRangeEnd - this.customRangeStart) / max) * 100
  }

  getFilterIcon(iconName: string): string {
    const icons: { [key: string]: string } = {
      'star': `<polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>`,
      'clock': `<circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/>`,
      'navigation': `<polygon points="3,11 22,2 13,21 11,13 3,11"/>`,
      'dollar-sign': `<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>`,
      'music': `<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>`,
      'users': `<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>`,
      'check-square': `<polyline points="9,11 12,14 22,4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>`,
      'filter': `<path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/>`,
      'map-pin': `<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>`
    }
    return icons[iconName] || icons['star']
  }
}
