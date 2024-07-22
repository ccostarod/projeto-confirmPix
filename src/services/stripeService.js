import Stripe from 'stripe';


const config = {
    secrect_key: process.env.STRIPE_SECRET_KEY,
    publish_key: process.env.STRIPE_PUBLISH_KEY
}

const stripe = new Stripe(config.secrect_key);

const stripeToken = new Stripe(config.publish_key);

const realizarCobrancaCartao = async(number, exp_month, exp_year, cvc, amount) => {
    try {
        const method = await stripeToken.paymentMethods.create({
            type: 'card',
            card: {
                number: number,
                exp_month: exp_month,
                exp_year: exp_year,
                cvc: cvc
            },
        });

        const intent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100),
            currency: 'brl',
            payment_method: method.id,
            confirm: true,
            payment_method_types: ['card']
        });

        return { success: true, intent };
    }
    catch (error) {
        return { success: false, error };
    }
}

export { realizarCobrancaCartao };