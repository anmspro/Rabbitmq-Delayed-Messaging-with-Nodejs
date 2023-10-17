const amqp = require("amqplib");

async function produceDelayedMessage() {
  const connection = await amqp.connect("amqp://root:root@localhost");
  const channel = await connection.createChannel();

  const queueName = "queue";
  const exchange = queueName + "Exchange";
  const routingKey = queueName + "RoutingKey";
  const delayedQueue = "delayed_queue";
  const delayedExchange = "delayed_exchange";

  const message = "This is a delayed message";

  await channel.assertExchange(exchange, "direct", { durable: true });
  await channel.assertQueue(delayedQueue, { durable: true });

  await channel.assertExchange(delayedExchange, "x-delayed-message", {
    durable: true,
    arguments: { "x-delayed-type": "direct" },
  });

  await channel.bindQueue(delayedQueue, delayedExchange, routingKey);

  // setTimeout(async () => {
  await channel.publish(delayedExchange, routingKey, Buffer.from(message), {
    headers: { "x-delay": 10000 }, // milliseconds
  });
  console.log("Message sent for delayed delivery.");
  // }, 5000);
}

produceDelayedMessage();
