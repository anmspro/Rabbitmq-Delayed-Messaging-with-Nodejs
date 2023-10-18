FROM rabbitmq:3.8

COPY rabbitmq_delayed_message_exchange-3.12.0.ez /plugins/

# RUN rabbitmq-plugins enable rabbitmq_delayed_message_exchange

# Expose necessary ports (5672 for AMQP, 15672 for the management UI)
# EXPOSE 5672 15672

# docker cp rabbitmq_delayed_message_exchange-3.12.0.ez node-rabbitmq_rabbitmq_1:/plugins/
# run command: docker build -t rabbitmq .