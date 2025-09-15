import { Component, type OnInit } from "@angular/core"
import { Router, ActivatedRoute } from "@angular/router"

export interface EventData {
  id: string
  title: string
  // …aggiungi ciò che usi altrove
}

export interface StatsData {
  attendees: { onSite: number; arriving: number }
  vibe: string
  availability: "Alta" | "Media" | "Bassa"
  travelTime: string
  eventHeat: number // 0..3
  ratings: { average: number; favorites: number } // 0..5
  pricing: string
  currentArtist: string
  nextArtist: string
  nextArtistTime: string
}

@Component({
  selector: "app-real-time-stats",
  templateUrl: "./real-time-stats.html",
  styleUrls: ["./real-time-stats.scss"],
  standalone: false,
})
export class RealTimeStatsComponent implements OnInit {
  event: EventData | null = null

  statsData: StatsData = {
    attendees: { onSite: 23, arriving: 7 },
    vibe: "Tranquilla e rilassata",
    availability: "Alta",
    travelTime: "~15 min",
    eventHeat: 1,
    ratings: { average: 4.2, favorites: 4.8 },
    pricing: "€",
    currentArtist: "Artista Principale",
    nextArtist: "DJ Set Closing",
    nextArtistTime: "45 min",
  }

  onSiteAvatars = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAJefmSM--lVYS55fxbhgt336-eRPgu6PqRdjyg9n2qFKhYA2q7l49KnZ0ru9zmYtqESFRXPn6RaJyExdhxMeygeChvIrQyopkNAOa1cgpMw_GcsYKkzlIfPeR6He-4dZCotsGgQGaRAyQvpxKjiErvcYSsKzIV-lcQsOVGkRJPEunlthihMxwyDC9ZtzI4DkP_lsDFScqIQ8ea-ApVqyFmL09UTq8Pn3oj6g9nFcvlpZOBF4yXGf5dly5rAqncuUerO3f63srQ-aYL",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAF8yj0ShbCfResFMjpROODDaXhdNf921b71WVbw675oGr8G2d3_AEZLpLy7q7b4vezIS9Umi47UQKgWaWcyfZUmg1GN1QShiXsZiHy5wQEdEE9RSBAi-AKmTR8YPRQDebL5LlFR7i0Y_sHxo9EZcS5EohLAycaIl29SeYTZzW_IjcI6W9Ap2MF9wu3EasMaR5nPZ3GW1aAflB9u_MKUugkxyGGsjVX95PUBVScUk2NwGgo7QNVUq5sK5TjtBOqUkDSag0gbz5Q9yYP",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDL075E4hQpc0pr5xlGirlPCfK0iHz4XJD2xdGaQpjqo7kvARv5WNsToE1KOIHP-9peJccFSEKWZIxOBQxb-w3t5CwgNEdTRWtSPtUQOAZYe6L--1whGHQ5829wDwXzSm66hQFAZD-ywV6haleD0Ug6l09VvHZ3xjSWrc7XTPBnzWiG9Wya4B0yyRdXmZ3z2LfS2QyBnowWnyptn2dmUVAzI6QcDflMDxBm-L6BdzRDvLKNyfal6dzLbJo380vBr9Vaif-ZaV-5E64T",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCvPanbxBDr0Gx43SOhCwwYUGZcuYB3-im518rQJploIwT3cDQJUEEvzskTLKpH4kTZXbEbUlGuKejdN5TdN4zEaF1D59usxwoeCxCkDOCBTftWT_fFlJeNUoVkPGbLDNnLQUTzXf9BxlEn4S-KqhU2rxjyDrKlOMz1gLAplFWhn3cbLLHzConJHVe1j14YQaR_8oilAhjEwTswZ7QDm0oe_-3ouG3rZyBfYqVBydWYITcGrl0OMfhOTDrK5TgTVcWN-gQG4LAFMTxn",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBleAJpKSO3obIZ5WXHwVMjH07xoLttA4ozEC0kUH8S535SkC4kC_q4KKMAYJklIRxwhq-qIUPAR1_aT8HuYbcx2Ve9rfSmKGcxK_ErQ7qfPLLeV_adWKhcM8qBq2cLtKraL-3zd-tCs33eCIsByx_jOnzBd0dNIiGm4NugDxNPt5qPPwzq64XV-LvZUN_KciJLmYEqOrxYZdE6NK44xUasrEUKflz_ajnDnOKqxZpBvnDKxKhxji0rPUXgycfeSak0KA013MqRCf0c",
  ]

  arrivingAvatars = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCBhEzvJuQ1uaAI-Qw2mBj-APnsiyfkydRaNIyaJveXQSavPiNVAjn1Ytgy9Awp1rQF0TKJEmWaeG3Pf6LnK8fmn_SFouch3k97DlqFNE6t61N0ad2keV_Tqj1PFxjayOA-mHOW-mUmFjQVHaZ23_dV4kSZjL-emjBJfAbjmM7qJWLA0GaQTQoTUlAhCxqbql9l9xmbhsvqv5-asnHpvSrisXI4P7kKqETPxtXkZVV8k5bqhggKUyCBPYrgvTrkGZC389LeOnSY249e",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC9X61uTKk8KOAQqU246IbQat8qGcgpjWVJr0RMh9G1RtMCpmTzVLykdajX6per6eRPuMEwbQDqa30z8LrweqPUGDA-GOWNb1Bn3-mFl8fDitERbaUaRksbYpxnm2yKp1Lp6YnRHKY1Lch3rblSJyfD_1XFLSY4ateaDR0_weIRMmCSKJnb15TmZLDDw3izFkxnwQ8KloLAWSPLR0xXUYjbtDyOhGTUPC-w09hJ5coP940kmnW6H8aBzaAqc8_CVZ5TBvTcVcrFCMn0",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCApapFrsz_80H7lJPgoBNpQeULr5WojTKeoZe3Vy0OgRy0owC_cPBqsmqgkunm0Zw-u2zquLNkAkm-ByOlO_ssm_CNc5kCye88R9HhB9-FpQf57UL_XnhZFCpJjngJNs_YzpCFgOiEI93RwzWLIyOyUyaGqTCZvB0Omx6A-deyvz6kuOFwlr0-qAXdw9eRoqyadYXfraja1Fd4emS46Iq6lIlF8rBSWuSPkTTIUbJRMIs-wDgqqbZKaYs6v5QxQO4V7v4xMZJulpJA",
  ]

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const nav = this.router.getCurrentNavigation()
    this.event = (nav?.extras?.state as any)?.event ?? history.state?.event ?? null
  }

  back() {
    this.router.navigate(["/event-detail", this.event?.id])
  }

  close() {
    this.router.navigate(["/events"])
  }

  getHeatArray(): number[] {
    return [0, 1, 2].map((i) => (i < this.statsData.eventHeat ? 1 : 0))
  }

  getRatingSegments(rating: number): boolean[] {
    const filled = Math.floor(rating)
    return Array.from({ length: 5 }, (_, i) => i < filled)
  }
}
