import ampq from 'amqplib';
import amqplib from 'amqplib';
import NotificationController from '../controllers/notificationController.js';

async function criarNotificacao(chargeId) {
    const notificationController = new NotificationController();
    try {
        let notification = await notificationController.add(chargeId);
        if (notification) {
            await enviarParaFila(notification);
            await listarMensagensDaFila();
            console.log('Notification created successfully');
        }
        else {
            console.error('Error creating notification');
        }
    } catch (error) {
        console.error('Error creating notification:', error);
        throw error; // Propagar o erro para ser tratado por quem chamou
    }
}

async function enviarParaFila(notification) {
    try {
        const conn = await ampq.connect('amqp://localhost');
        const channel = await conn.createChannel();
        const queue = 'notificationsQueue';

        await channel.assertQueue(queue, { durable: true });

        const msg = JSON.stringify(notification);
        channel.sendToQueue(queue, Buffer.from(msg), { persistent: true });

        console.log('Notification sent to queue, ' + msg);

        await channel.close();
        await conn.close();
    }
    catch (error) {
        console.error('Error sending notification to queue:', error);
        throw error; // Propagar o erro para ser tratado por quem chamou
    }
}

async function listarMensagensDaFila() {
    try {
        const conn = await amqplib.connect('amqp://localhost');
        const channel = await conn.createChannel();
        const queue = 'notificationsQueue';

        await channel.assertQueue(queue, { durable: true });

        console.log(`Waiting for messages in ${queue}. To exit press CTRL+C`);

        channel.consume(queue, (msg) => {
            if (msg !== null) {
                console.log(`Received message: ${msg.content.toString()}`);
                // Aqui você pode decidir se quer ack (acknowledge) a mensagem ou não
                // channel.ack(msg);
            }
        }, { noAck: true }); // noAck: true significa que não vamos enviar um ack manualmente, o que automaticamente remove a mensagem da fila
    } catch (error) {
        console.error('Error listing messages from queue:', error);
    }
}

export { criarNotificacao };

