import { Component, Input, type OnInit, type OnDestroy } from "@angular/core"

export interface Person {
  id: string
  name: string
  avatar: string
}

export interface BriefStats {
  vibe: string
  availability: string
  arrivalTime: string
  eventHeat: number // 1-3 scale
}

export interface Ratings {
  average: number
  favorites: number
}

export interface EventInfo {
  entrance: string
  price: string
}

export interface LiveProgram {
  current: {
    name: string
    stage: string
    endTime: string
  }
  next: {
    name: string
    stage: string
    startTime: string
  }
}

@Component({
  selector: "app-real-time-stats",
  templateUrl: "./real-time-stats.html",
  styleUrls: ["./real-time-stats.scss"],
  standalone: false,
})
export class RealTimeStatsComponent implements OnInit, OnDestroy {
  @Input() eventId!: string
  @Input() eventTitle = "Milano Summer Fest"

  private updateInterval: any

  peopleOnSite: Person[] = [
    {
      id: "1",
      name: "Marco",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAJefmSM--lVYS55fxbhgt336-eRPgu6PqRdjyg9n2qFKhYA2q7l49KnZ0ru9zmYtqESFRXPn6RaJyExdhxMeygeChvIrQyopkNAOa1cgpMw_GcsYKkzlIfPeR6He-4dZCotsGgQGaRAyQvpxKjiErvcYSsKzIV-lcQsOVGkRJPEunlthihMxwyDC9ZtzI4DkP_lsDFScqIQ8ea-ApVqyFmL09UTq8Pn3oj6g9nFcvlpZOBF4yXGf5dly5rAqncuUerO3f63srQ-aYL",
    },
    {
      id: "2",
      name: "Sofia",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAF8yj0ShbCfResFMjpROODDaXhdNf921b71WVbw675oGr8G2d3_AEZLpLy7q7b4vezIS9Umi47UQKgWaWcyfZUmg1GN1QShiXsZiHy5wQEdEE9RSBAi-AKmTR8YPRQDebL5LlFR7i0Y_sHxo9EZcS5EohLAycaIl29SeYTZzW_IjcI6W9Ap2MF9wu3EasMaR5nPZ3GW1aAflB9u_MKUugkxyGGsjVX95PUBVScUk2NwGgo7QNVUq5sK5TjtBOqUkDSag0gbz5Q9yYP",
    },
    {
      id: "3",
      name: "Luca",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDL075E4hQpc0pr5xlGirlPCfK0iHz4XJD2xdGaQpjqo7kvARv5WNsToE1KOIHP-9peJccFSEKWZIxOBQxb-w3t5CwgNEdTRWtSPtUQOAZYe6L--1whGHQ5829wDwXzSm66hQFAZD-ywV6haleD0Ug6l09VvHZ3xjSWrc7XTPBnzWiG9Wya4B0yyRdXmZ3z2LfS2QyBnowWnyptn2dmUVAzI6QcDflMDxBm-L6BdzRDvLKNyfal6dzLbJo380vBr9Vaif-ZaV-5E64T",
    },
    {
      id: "4",
      name: "Anna",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCvPanbxBDr0Gx43SOhCwwYUGZcuYB3-im518rQJploIwT3cDQJUEEvzskTLKpH4kTZXbEbUlGuKejdN5TdN4zEaF1D59usxwoeCxCkDOCBTftWT_fFlJeNUoVkPGbLDNnLQUTzXf9BxlEn4S-KqhU2rxjyDrKlOMz1gLAplFWhn3cbLLHzConJHVe1j14YQaR_8oilAhjEwTswZ7QDm0oe_-3ouG3rZyBfYqVBydWYITcGrl0OMfhOTDrK5TgTVcWN-gQG4LAFMTxn",
    },
    {
      id: "5",
      name: "Giulia",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBleAJpKSO3obIZ5WXHwVMjH07xoLttA4ozEC0kUH8S535SkC4kC_q4KKMAYJklIRxwhq-qIUPAR1_aT8HuYbcx2Ve9rfSmKGcxK_ErQ7qfPLLeV_adWKhcM8qBq2cLtKraL-3zd-tCs33eCIsByx_jOnzBd0dNIiGm4NugDxNPt5qPPwzq64XV-LvZUN_KciJLmYEqOrxYZdE6NK44xUasrEUKflz_ajnDnOKqxZpBvnDKxKhxji0rPUXgycfeSak0KA013MqRCf0c",
    },
    // Additional people to show +18 counter
    ...Array.from({ length: 18 }, (_, i) => ({
      id: `extra-${i}`,
      name: `Person ${i + 6}`,
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAJefmSM--lVYS55fxbhgt336-eRPgu6PqRdjyg9n2qFKhYA2q7l49KnZ0ru9zmYtqESFRXPn6RaJyExdhxMeygeChvIrQyopkNAOa1cgpMw_GcsYKkzlIfPeR6He-4dZCotsGgQGaRAyQvpxKjiErvcYSsKzIV-lcQsOVGkRJPEunlthihMxwyDC9ZtzI4DkP_lsDFScqIQ8ea-ApVqyFmL09UTq8Pn3oj6g9nFcvlpZOBF4yXGf5dly5rAqncuUerO3f63srQ-aYL",
    })),
  ]

  peopleArriving: Person[] = [
    {
      id: "a1",
      name: "Federico",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCBhEzvJuQ1uaAI-Qw2mBj-APnsiyfkydRaNIyaJveXQSavPiNVAjn1Ytgy9Awp1rQF0TKJEmWaeG3Pf6LnK8fmn_SFouch3k97DlqFNE6t61N0ad2keV_Tqj1PFxjayOA-mHOW-mUmFjQVHaZ23_dV4kSZjL-emjBJfAbjmM7qJWLA0GaQTQoTUlAhCxqbql9l9xmbhsvqv5-asnHpvSrisXI4P7kKqETPxtXkZVV8k5bqhggKUyCBPYrgvTrkGZC389LeOnSY249e",
    },
    {
      id: "a2",
      name: "Chiara",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC9X61uTKk8KOAQqU246IbQat8qGcgpjWVJr0RMh9G1RtMCpmTzVLykdajX6per6eRPuMEwbQDqa30z8LrweqPUGDA-GOWNb1Bn3-mFl8fDitERbaUaRksbYpxnm2yKp1Lp6YnRHKY1Lch3rblSJyfD_1XFLSY4ateaDR0_weIRMmCSKJnb15TmZLDDw3izFkxnwQ8KloLAWSPLR0xXUYjbtDyOhGTUPC-w09hJ5coP940kmnW6H8aBzaAqc8_CVZ5TBvTcVcrFCMn0",
    },
    {
      id: "a3",
      name: "Matteo",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCApapFrsz_80H7lJPgoBNpQeULr5WojTKeoZe3Vy0OgRy0owC_cPBqsmqgkunm0Zw-u2zquLNkAkm-ByOlO_ssm_CNc5kCye88R9HhB9-FpQf57UL_XnhZFCpJjngJNs_YzpCFgOiEI93RwzWLIyOyUyaGqTCZvB0Omx6A-deyvz6kuOFwlr0-qAXdw9eRoqyadYXfraja1Fd4emS46Iq6lIlF8rBSWuSPkTTIUbJRMIs-wDgqqbZKaYs6v5QxQO4V7v4xMZJulpJA",
    },
    // Additional people to show +4 counter
    ...Array.from({ length: 4 }, (_, i) => ({
      id: `arriving-${i}`,
      name: `Arriving ${i + 4}`,
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCBhEzvJuQ1uaAI-Qw2mBj-APnsiyfkydRaNIyaJveXQSavPiNVAjn1Ytgy9Awp1rQF0TKJEmWaeG3Pf6LnK8fmn_SFouch3k97DlqFNE6t61N0ad2keV_Tqj1PFxjayOA-mHOW-mUmFjQVHaZ23_dV4kSZjL-emjBJfAbjmM7qJWLA0GaQTQoTUlAhCxqbql9l9xmbhsvqv5-asnHpvSrisXI4P7kKqETPxtXkZVV8k5bqhggKUyCBPYrgvTrkGZC389LeOnSY249e",
    })),
  ]

  briefStats: BriefStats = {
    vibe: "Si scalda",
    availability: "Quasi Finito",
    arrivalTime: "~25 min",
    eventHeat: 2,
  }

  ratings: Ratings = {
    average: 4.2,
    favorites: 4.8,
  }

  eventInfo: EventInfo = {
    entrance: "A pagamento",
    price: "€€",
  }

  liveProgram: LiveProgram = {
    current: {
      name: "Artista Principale",
      stage: "Main Stage",
      endTime: "Fino alle 23:00",
    },
    next: {
      name: "DJ Set Closing",
      stage: "Main Stage",
      startTime: "Inizia tra 45 min",
    },
  }

  lastUpdate = "1 min"

  constructor() {}

  ngOnInit() {
    this.startRealTimeUpdates()
  }

  ngOnDestroy() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval)
    }
  }

  private startRealTimeUpdates() {
    // Simulate real-time updates every 30 seconds
    this.updateInterval = setInterval(() => {
      this.updateLiveStats()
    }, 30000)
  }

  private updateLiveStats() {
    // Update people counts
    const randomChange = Math.floor(Math.random() * 5) - 2
    if (randomChange > 0) {
      // Add people
      for (let i = 0; i < randomChange; i++) {
        this.peopleOnSite.push({
          id: `new-${Date.now()}-${i}`,
          name: `New Person ${i}`,
          avatar:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAJefmSM--lVYS55fxbhgt336-eRPgu6PqRdjyg9n2qFKhYA2q7l49KnZ0ru9zmYtqESFRXPn6RaJyExdhxMeygeChvIrQyopkNAOa1cgpMw_GcsYKkzlIfPeR6He-4dZCotsGgQGaRAyQvpxKjiErvcYSsKzIV-lcQsOVGkRJPEunlthihMxwyDC9ZtzI4DkP_lsDFScqIQ8ea-ApVqyFmL09UTq8Pn3oj6g9nFcvlpZOBF4yXGf5dly5rAqncuUerO3f63srQ-aYL",
        })
      }
    }

    // Update ratings slightly
    this.ratings.average = Math.min(5, Math.max(1, this.ratings.average + (Math.random() - 0.5) * 0.2))
    this.ratings.favorites = Math.min(5, Math.max(1, this.ratings.favorites + (Math.random() - 0.5) * 0.1))

    // Update event heat randomly
    this.briefStats.eventHeat = Math.floor(Math.random() * 3) + 1

    this.lastUpdate = "appena"
    setTimeout(() => {
      this.lastUpdate = "1 min"
    }, 60000)
  }
}
