const amqp = require("amqplib");

async function consumeDelayedMessage() {
  const connection = await amqp.connect("amqp://root:root@localhost");
  const channel = await connection.createChannel();

  const queueName = "queue";
  const exchange = "delayed_exchange";
  const queue = "delayed_queue";
  const routingKey = "delayed_messages";

  await channel.assertExchange(exchange, "x-delayed-message", {
    arguments: { "x-delayed-type": "direct" },
  });
  await channel.assertQueue(queue);
  await channel.bindQueue(queue, exchange, routingKey);

  console.log("Waiting for delayed messages...");

  channel.consume(queue, (msg) => {
    console.log(`Received: ${msg.content.toString()}`);
    channel.ack(msg);
  });

  // await channel.assertQueue(queueName, { durable: true });

  // channel.consume(queueName, (msg) => {
  //   if (msg.content) {
  //     try {
  //       const messageContent = JSON.parse(msg.content.toString());
  //       console.log(`Received: ${JSON.stringify(messageContent)}`);
  //     } catch (error) {
  //       console.error("Error parsing message:", error);
  //     }
  //     channel.ack(msg);
  //   }
  // });
}

consumeDelayedMessage();
