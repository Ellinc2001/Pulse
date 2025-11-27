import {
  Injectable,
   ApplicationRef,
   ComponentRef,
  createComponent,
   EnvironmentInjector,
} from "@angular/core"
import { XpLightningComponent } from "../xp-lightning-component/xp-lightning-component"

export interface XpGainEvent {
  amount: number
  sourceElement?: HTMLElement
}

@Injectable({
  providedIn: "root",
})
export class XpAnimationService {
  private componentRef: ComponentRef<XpLightningComponent> | null = null

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector,
  ) {}

  triggerXpGain(event: XpGainEvent) {
    // Create component if it doesn't exist
    if (!this.componentRef) {
      this.componentRef = createComponent(XpLightningComponent, {
        environmentInjector: this.injector,
      })

      // Attach to application
      this.appRef.attachView(this.componentRef.hostView)

      // Add to DOM
      document.body.appendChild(this.componentRef.location.nativeElement)
    }

    // Trigger animation
    this.componentRef.instance.triggerAnimation(event)
  }

  destroy() {
    if (this.componentRef) {
      this.appRef.detachView(this.componentRef.hostView)
      this.componentRef.destroy()
      this.componentRef = null
    }
  }
}
