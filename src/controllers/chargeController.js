import { realizarCobrancaCartao } from '../services/stripeService.js';
import Charge from '../models/Charge.js';
import { criarNotificacao } from '../services/notificationService.js';

class ChargeController {
    async add(req, res) {
        const { number, exp_month, exp_year, cvc, amount } = req.body;
        try {
            const response = await realizarCobrancaCartao(number, exp_month, exp_year, cvc, amount);
            if (response.success) {
                let charge = await Charge.create({
                    amount: amount,
                    currency: 'brl',
                    status: 'paid'
                });
                criarNotificacao(charge.id);
                return res.status(201).json(charge);
            } else {
                let charge = await Charge.create({
                    amount: amount,
                    currency: 'brl',
                    status: 'failed'
                });
                criarNotificacao(charge.id);
                return res.status(400).json({ message: 'Payment failed', error: response.error });
            }
            
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    async getAll(req, res) {
        try {
            const charges = await Charge.findAll();
            return res.status(200).json(charges);
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }
}

export default ChargeController;