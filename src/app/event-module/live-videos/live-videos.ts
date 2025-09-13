import {
  Component,
  Input,
  type OnInit,
  type OnDestroy,
  type AfterViewInit,
  ViewChild,
  type ElementRef,
} from "@angular/core"

export interface VideoStream {
  id: string
  title: string
  url: string
  thumbnail: string
  isLive: boolean
  viewers: number
  quality: "HD" | "FHD" | "4K"
  angle?: string
}

export interface VideoQuality {
  label: string
  value: string
  resolution: string
}

@Component({
  selector: "app-live-videos",
  templateUrl: "./live-videos.html",
  styleUrls: ["./live-videos.scss"],
  standalone: false,
})
export class LiveVideosComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() videoStream!: VideoStream
  @Input() showControls = true

  @ViewChild("videoEl") videoEl!: ElementRef<HTMLVideoElement>

  isPlaying = true
  isMuted = true // autoplay mobile richiede muted
  isFullscreen = false
  currentVolume = 80
  showVideoControls = true // <-- questo governa l’overlay
  isModalOpen = false
  modalProgress = 0
  modalCurrentTime = "0:00"
  modalDuration = "0:00"
  private controlsTimeout?: any
  private progressUpdateInterval?: any

  // ...qualityOptions, ecc.

  ngOnInit() {
    /* no-op */
  }

  ngAfterViewInit() {
    // prova ad avviare l’autoplay in modo robusto
    const v = this.videoEl.nativeElement
    v.loop = true
    v.play()
      .then(() => {
        this.isPlaying = true
      })
      .catch(() => {
        // se il browser blocca l’autoplay, mostra il bottone
        this.isPlaying = false
        this.showVideoControls = true
      })

    if (this.showControls) this.startControlsTimer()

    // sincronizza lo stato con gli eventi nativi
    v.addEventListener("pause", () => (this.isPlaying = false))
    v.addEventListener("play", () => (this.isPlaying = true))
    v.addEventListener("timeupdate", () => this.updateProgress())
    v.addEventListener("loadedmetadata", () => this.updateDuration())
  }

  ngOnDestroy() {
    if (this.controlsTimeout) clearTimeout(this.controlsTimeout)
    if (this.progressUpdateInterval) clearInterval(this.progressUpdateInterval)
  }

  private startControlsTimer() {
    if (this.controlsTimeout) clearTimeout(this.controlsTimeout)
    this.controlsTimeout = setTimeout(() => (this.showVideoControls = false), 3000)
  }
  private showControlsTemporarily() {
    if (!this.showControls) return
    this.showVideoControls = true
    this.startControlsTimer()
  }

  togglePlay() {
    const v = this.videoEl.nativeElement
    if (v.paused) {
      v.play()
      this.isPlaying = true
    } else {
      v.pause()
      this.isPlaying = false
    }
    this.showControlsTemporarily()
  }

  toggleMute() {
    this.isMuted = !this.isMuted
    this.videoEl.nativeElement.muted = this.isMuted
    this.showControlsTemporarily()
  }

  changeVolume(event: any) {
    this.currentVolume = +event.target.value
    const v = this.videoEl.nativeElement
    v.volume = Math.min(1, Math.max(0, this.currentVolume / 100))
    this.isMuted = v.volume === 0
    v.muted = this.isMuted
    this.showControlsTemporarily()
  }

  onVideoClick() {
    this.openModal()
  }

  openModal() {
    this.isModalOpen = true
    document.body.style.overflow = "hidden"
    this.updateProgress()
    this.updateDuration()
  }

  closeModal() {
    this.isModalOpen = false
    document.body.style.overflow = "auto"
  }

  private updateProgress() {
    if (!this.videoEl) return
    const v = this.videoEl.nativeElement
    if (v.duration) {
      this.modalProgress = (v.currentTime / v.duration) * 100
      this.modalCurrentTime = this.formatTime(v.currentTime)
    }
  }

  private updateDuration() {
    if (!this.videoEl) return
    const v = this.videoEl.nativeElement
    if (v.duration) {
      this.modalDuration = this.formatTime(v.duration)
    }
  }

  private formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  onProgressClick(event: MouseEvent) {
    if (!this.videoEl) return
    const progressBar = event.currentTarget as HTMLElement
    const rect = progressBar.getBoundingClientRect()
    const clickX = event.clientX - rect.left
    const percentage = clickX / rect.width
    const v = this.videoEl.nativeElement
    v.currentTime = percentage * v.duration
    this.updateProgress()
  }

  onMouseMove(): void {
    this.showControlsTemporarily()
  }

  onTouchStart(): void {
    this.showControlsTemporarily()
  }
}
