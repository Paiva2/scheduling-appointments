export interface IQueueRepository {
  publish(queueName: string, data: any): Promise<void>;
}
