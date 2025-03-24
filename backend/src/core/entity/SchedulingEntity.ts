import UserEntity from "./UserEntity";

export default class SchedulingEntity {
  private id: string | null;
  private user: UserEntity | null;
  private userDoctor: UserEntity | null;
  private informations: string | null;
  private active: boolean;
  private scheduledAt: Date;
  private finishedAt: Date | null;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    id: string | null,
    user: UserEntity | null,
    userDoctor: UserEntity | null,
    informations: string | null,
    active: boolean,
    scheduledAt: Date,
    finishedAt: Date | null,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.user = user;
    this.userDoctor = userDoctor;
    this.informations = informations;
    this.active = active;
    this.scheduledAt = scheduledAt;
    this.finishedAt = finishedAt;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  getId(): string | null {
    return this.id;
  }

  setId(id: string | null): void {
    this.id = id;
  }

  getUser(): UserEntity | null {
    return this.user;
  }

  setUser(user: UserEntity | null): void {
    this.user = user;
  }

  getUserDoctor(): UserEntity | null {
    return this.userDoctor;
  }

  setUserDoctor(userDoctor: UserEntity | null): void {
    this.userDoctor = userDoctor;
  }

  getInformations(): string | null {
    return this.informations;
  }

  setInformations(informations: string | null): void {
    this.informations = informations;
  }

  isActive(): boolean {
    return this.active;
  }

  setActive(active: boolean): void {
    this.active = active;
  }

  getScheduledAt(): Date {
    return this.scheduledAt;
  }

  setScheduledAt(scheduledAt: Date): void {
    this.scheduledAt = scheduledAt;
  }

  getFinishedAt(): Date | null {
    return this.finishedAt;
  }

  setFinishedAt(finishedAt: Date | null): void {
    this.finishedAt = finishedAt;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }
}
