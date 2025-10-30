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
  @ViewChild("modalVideoEl") modalVideoEl!: ElementRef<HTMLVideoElement>

  isPlaying = false
  isModalPlaying = false
  isMuted = true
  isFullscreen = false
  currentVolume = 80
  showVideoControls = true
  isModalOpen = false
  modalProgress = 0
  modalCurrentTime = "0:00"
  modalDuration = "0:00"
  private controlsTimeout?: any
  private progressUpdateInterval?: any

  ngOnInit() {
    /* no-op */
  }

  ngAfterViewInit() {
    const v = this.videoEl.nativeElement
    v.loop = true
    this.isPlaying = false
    this.showVideoControls = true

    v.addEventListener("pause", () => (this.isPlaying = false))
    v.addEventListener("play", () => (this.isPlaying = true))
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
    this.openModal()
  }

  toggleModalPlay() {
    if (!this.modalVideoEl) return
    const modalVideo = this.modalVideoEl.nativeElement

    if (this.isModalPlaying) {
      modalVideo.pause()
      this.isModalPlaying = false
    } else {
      modalVideo.play()
      this.isModalPlaying = true
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted
    if (this.modalVideoEl) {
      this.modalVideoEl.nativeElement.muted = this.isMuted
    }
    this.showControlsTemporarily()
  }

  changeVolume(event: any) {
    this.currentVolume = +event.target.value
    if (this.modalVideoEl) {
      const v = this.modalVideoEl.nativeElement
      v.volume = Math.min(1, Math.max(0, this.currentVolume / 100))
      this.isMuted = v.volume === 0
      v.muted = this.isMuted
    }
    this.showControlsTemporarily()
  }

  onVideoClick() {
    this.showControlsTemporarily()
  }

  openModal() {
    this.isModalOpen = true
    document.body.style.overflow = "hidden"

    // Aspetta che la modale sia renderizzata
    setTimeout(() => {
      if (this.modalVideoEl) {
        const modalVideo = this.modalVideoEl.nativeElement
        modalVideo.addEventListener("timeupdate", () => this.updateProgress())
        modalVideo.addEventListener("loadedmetadata", () => this.updateDuration())
        modalVideo.addEventListener("pause", () => (this.isModalPlaying = false))
        modalVideo.addEventListener("play", () => (this.isModalPlaying = true))

        modalVideo.play()
        this.isModalPlaying = true
      }
    }, 100)
  }

  closeModal() {
    this.isModalOpen = false
    document.body.style.overflow = "auto"

    if (this.modalVideoEl) {
      const modalVideo = this.modalVideoEl.nativeElement
      modalVideo.pause()
      this.isModalPlaying = false
    }
  }

  private updateProgress() {
    if (!this.modalVideoEl) return
    const v = this.modalVideoEl.nativeElement
    if (v.duration) {
      this.modalProgress = (v.currentTime / v.duration) * 100
      this.modalCurrentTime = this.formatTime(v.currentTime)
    }
  }

  private updateDuration() {
    if (!this.modalVideoEl) return
    const v = this.modalVideoEl.nativeElement
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
    if (!this.modalVideoEl) return
    const progressBar = event.currentTarget as HTMLElement
    const rect = progressBar.getBoundingClientRect()
    const clickX = event.clientX - rect.left
    const percentage = clickX / rect.width
    const v = this.modalVideoEl.nativeElement
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
