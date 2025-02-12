import { Queue, Worker } from "bullmq";
import redisConnection from "../redis";
import EmailUtils from "../../../infra/utils/emailUtils";

interface IQueueProps {
  queues: {
    [key: string]: Queue;
  };
  workers: {
    [key: string]: Worker;
  };
}

const mailQueue = new Queue("mail-queue", { connection: redisConnection });
const mailWorker = new Worker(
  "mail-queue",
  async (job) => {
    EmailUtils.sendSimpleMail(job.data.to, job.data.title, job.data.message);
  },
  { connection: redisConnection }
);

const queueProps: IQueueProps = {
  queues: {
    ["mail-queue"]: mailQueue,
  },
  workers: {
    ["mail-worker"]: mailWorker,
  },
};

export default queueProps;
