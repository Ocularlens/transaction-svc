import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "transaction-group" });

async function transactionConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: "transaction-topic", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      console.log(message);
    },
  });
}

export default transactionConsumer;
