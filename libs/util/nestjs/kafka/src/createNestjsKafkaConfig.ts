import { KafkaOptions, Transport } from "@nestjs/microservices";
import { ConsumerConfig } from "@nestjs/microservices/external/kafka.interface";
import { KafkaEnvironmentVariables } from "@amplication/util/kafka";
import { randomUUID } from "crypto";

export function createNestjsKafkaConfig(envSuffix = ""): KafkaOptions {
  const kafkaEnv = new KafkaEnvironmentVariables(envSuffix);
  const groupId = kafkaEnv.getGroupId();
  let consumer: ConsumerConfig | undefined;
  if (groupId) {
    consumer = { groupId };
  }

  return {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: kafkaEnv.getBrokers(),
        clientId: kafkaEnv.getClientId() + `-${randomUUID()}`,
      },
      consumer,
    },
  };
}
