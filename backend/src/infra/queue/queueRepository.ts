import queueProps from "../../application/config/bullmq";
import { IQueueRepository } from "../../core/interfaces/adapter/IQueueRepository";

export default class QueueRepository implements IQueueRepository {
  constructor() {}

  public async publish(queueName: string, data: any): Promise<void> {
    const queue = queueProps.queues[queueName as keyof typeof queueProps.queues];

    await queue.add("mail-sending-job", data, {
      attempts: 2,
      removeOnComplete: true,
      removeOnFail: false,
    });
  }
}
