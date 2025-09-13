import { Component, ElementRef, Input, ViewChild } from '@angular/core';

export interface ChatMessage {
  id: string
  userId: string
  username: string
  avatar: string
  message: string
  timestamp: Date
  reactions: ChatReaction[]
  isModerated?: boolean
  isModerator?: boolean
}

export interface ChatReaction {
  emoji: string
  count: number
  users: string[]
}

export interface OnlineUser {
  id: string
  username: string
  avatar: string
  isTyping: boolean
  isModerator: boolean
}


@Component({
  selector: 'app-event-chat',
  standalone: false,
  templateUrl: './event-chat.html',
  styleUrl: './event-chat.scss'
})
export class EventChat {

  @Input() eventId?: string;
  @ViewChild("messagesContainer") messagesContainer!: ElementRef

  newMessage = ""
  isTyping = false
  typingTimeout: any
  updateInterval: any

  currentUser = {
    id: "user123",
    username: "You",
    avatar: "/assets/avatars/user.jpg",
    isModerator: false,
  }

  messages: ChatMessage[] = [
    {
      id: "1",
      userId: "user456",
      username: "MusicLover92",
      avatar: "/assets/avatars/user1.jpg",
      message: "This event is absolutely amazing! 🎵",
      timestamp: new Date(Date.now() - 300000),
      reactions: [
        { emoji: "🔥", count: 12, users: ["user123", "user789"] },
        { emoji: "❤️", count: 8, users: ["user456"] },
      ],
      isModerator: false,
    },
    {
      id: "2",
      userId: "mod001",
      username: "EventModerator",
      avatar: "/assets/avatars/mod.jpg",
      message: "Welcome everyone! Please keep the chat respectful and enjoy the show! 🎉",
      timestamp: new Date(Date.now() - 240000),
      reactions: [{ emoji: "👍", count: 25, users: ["user123", "user456", "user789"] }],
      isModerator: true,
    },
    {
      id: "3",
      userId: "user789",
      username: "ConcertFan",
      avatar: "/assets/avatars/user2.jpg",
      message: "The sound quality is incredible! Can't wait for the next song 🎸",
      timestamp: new Date(Date.now() - 180000),
      reactions: [{ emoji: "🎸", count: 6, users: ["user123"] }],
      isModerator: false,
    },
  ]

  onlineUsers: OnlineUser[] = [
    {
      id: "user456",
      username: "MusicLover92",
      avatar: "/assets/avatars/user1.jpg",
      isTyping: false,
      isModerator: false,
    },
    {
      id: "user789",
      username: "ConcertFan",
      avatar: "/assets/avatars/user2.jpg",
      isTyping: true,
      isModerator: false,
    },
    {
      id: "mod001",
      username: "EventModerator",
      avatar: "/assets/avatars/mod.jpg",
      isTyping: false,
      isModerator: true,
    },
  ]

  availableReactions = ["❤️", "🔥", "👍", "😍", "🎵", "🎸", "🎉", "👏"]

  constructor() {}

  ngOnInit() {
    this.scrollToBottom()
    this.startRealTimeUpdates()
  }

  ngOnDestroy() {
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout)
    }
    if (this.updateInterval) {
      clearInterval(this.updateInterval)
    }
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        userId: this.currentUser.id,
        username: this.currentUser.username,
        avatar: this.currentUser.avatar,
        message: this.newMessage.trim(),
        timestamp: new Date(),
        reactions: [],
        isModerator: this.currentUser.isModerator,
      }

      this.messages.push(message)
      this.newMessage = ""
      this.stopTyping()
      setTimeout(() => this.scrollToBottom(), 100)
    }
  }

  onTyping() {
    if (!this.isTyping) {
      this.isTyping = true
      // Simulate sending typing indicator to other users
    }

    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout)
    }

    this.typingTimeout = setTimeout(() => {
      this.stopTyping()
    }, 2000)
  }

  stopTyping() {
    this.isTyping = false
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout)
    }
  }

  addReaction(messageId: string, emoji: string) {
    const message = this.messages.find((m) => m.id === messageId)
    if (message) {
      const existingReaction = message.reactions.find((r) => r.emoji === emoji)

      if (existingReaction) {
        if (existingReaction.users.includes(this.currentUser.id)) {
          // Remove reaction
          existingReaction.count--
          existingReaction.users = existingReaction.users.filter((u) => u !== this.currentUser.id)
          if (existingReaction.count === 0) {
            message.reactions = message.reactions.filter((r) => r.emoji !== emoji)
          }
        } else {
          // Add reaction
          existingReaction.count++
          existingReaction.users.push(this.currentUser.id)
        }
      } else {
        // Create new reaction
        message.reactions.push({
          emoji,
          count: 1,
          users: [this.currentUser.id],
        })
      }
    }
  }

  hasUserReacted(message: ChatMessage, emoji: string): boolean {
    const reaction = message.reactions.find((r) => r.emoji === emoji)
    return reaction ? reaction.users.includes(this.currentUser.id) : false
  }

  formatTime(timestamp: Date): string {
    return timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  private scrollToBottom() {
    if (this.messagesContainer) {
      const element = this.messagesContainer.nativeElement
      element.scrollTop = element.scrollHeight
    }
  }

  private startRealTimeUpdates() {
    // Simulate receiving new messages
    this.updateInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        this.simulateNewMessage()
      }
      this.updateTypingUsers()
    }, 3000)
  }

  private simulateNewMessage() {
    const randomUsers = [
      { id: "user999", username: "EventFan", avatar: "/assets/avatars/user3.jpg" },
      { id: "user888", username: "LiveMusicLover", avatar: "/assets/avatars/user4.jpg" },
      { id: "user777", username: "ConcertGoer", avatar: "/assets/avatars/user5.jpg" },
    ]

    const randomMessages = [
      "This is incredible! 🎵",
      "Best event ever! 🔥",
      "Amazing performance! 👏",
      "Love this song! ❤️",
      "The energy is unreal! ⚡",
    ]

    const randomUser = randomUsers[Math.floor(Math.random() * randomUsers.length)]
    const randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)]

    const message: ChatMessage = {
      id: Date.now().toString(),
      userId: randomUser.id,
      username: randomUser.username,
      avatar: randomUser.avatar,
      message: randomMessage,
      timestamp: new Date(),
      reactions: [],
      isModerator: false,
    }

    this.messages.push(message)
    setTimeout(() => this.scrollToBottom(), 100)
  }

  private updateTypingUsers() {
    // Randomly update typing status
    this.onlineUsers.forEach((user) => {
      if (Math.random() > 0.8) {
        user.isTyping = !user.isTyping
      }
    })
  }

  getTypingUsers(): OnlineUser[] {
    return this.onlineUsers.filter((user) => user.isTyping)
  }

  onEnter(event: KeyboardEvent) {
  if (!event.shiftKey) {
    event.preventDefault();   // blocca l’andata a capo
    this.sendMessage();       // invia
  }
}


}
