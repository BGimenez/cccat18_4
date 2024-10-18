export default interface PaymentGateway {
    execute(input: Input): Promise<void>;
}

export class PaymentGatewayMemory implements PaymentGateway {
    
    async execute(input: Input): Promise<void> {
        console.log("Process payment: ", input);
    }

}

type Input = {
    rideId: String,
    creditCardToken: String,
    amount: number;
}