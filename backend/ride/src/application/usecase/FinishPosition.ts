import Position from "../../domain/entity/Position";
import { inject } from "../../infra/di/DI";
import PaymentGateway from "../../infra/gateway/PaymentGateway";
import PositionRepository from "../../infra/repository/PositionRepository";
import RideRepository from "../../infra/repository/RideRepository";

export default class FinishPosition {
	@inject("rideRepository")
	rideRepository?: RideRepository;
	@inject("positionRepository")
	positionRepository?: PositionRepository;
	@inject("paymentGateway")
	paymentGateway?: PaymentGateway;

	async execute (input: Input): Promise<void> {
		const ride = await this.rideRepository?.getRideById(input.rideId);
		if (!ride) throw new Error();
		const positions = await this.positionRepository?.getPositionsByRideId(input.rideId);
		ride.finish(positions || []);
		await this.rideRepository?.updateRide(ride);
		const paymentInput = {
			rideId: ride.getRideId(),
			creditCardToken: input.creditCardToken,
			amount: ride.getFare(),
		}
		await this.paymentGateway?.execute(paymentInput);
	}
}

type Input = {
	rideId: string,
	creditCardToken: string,
}
