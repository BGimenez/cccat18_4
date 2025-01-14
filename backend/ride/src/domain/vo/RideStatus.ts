import Ride from "../entity/Ride";

export default interface RideStatus {
	value: string;
	request (): void;
	accept (): void;
	start (): void;
	finish(): void;
}

export class RequestedStatus implements RideStatus {
	value: string;

	constructor (readonly ride: Ride) {
		this.value = "requested";
	}

	request(): void {
		throw new Error("Invalid status");
	}

	accept(): void {
		this.ride.setStatus(new AcceptedStatus(this.ride));
	}

	start(): void {
		throw new Error("Invalid status");
	}
	
	finish(): void {
		throw new Error("Invalid status");
	}

}

export class AcceptedStatus implements RideStatus {
	value: string;

	constructor (readonly ride: Ride) {
		this.value = "accepted";
	}

	request(): void {
		throw new Error("Invalid status");
	}

	accept(): void {
		throw new Error("Invalid status");
	}

	start(): void {
		this.ride.setStatus(new InProgressStatus(this.ride));
	}

	finish(): void {
		throw new Error("Invalid status");
	}

}

export class InProgressStatus implements RideStatus {
	value: string;

	constructor (readonly ride: Ride) {
		this.value = "in_progress";
	}

	request(): void {
		throw new Error("Invalid status");
	}

	accept(): void {
		throw new Error("Invalid status");
	}

	start(): void {
		throw new Error("Invalid status");
	}

	finish(): void {
		this.ride.setStatus(new FinishStatus(this.ride))
	}

}

export class FinishStatus implements RideStatus {
	value: string;

	constructor (readonly ride: Ride) {
		this.value = "completed";
	}

	request(): void {
		throw new Error("Method not implemented.");
	}
	accept(): void {
		throw new Error("Method not implemented.");
	}
	start(): void {
		throw new Error("Method not implemented.");
	}
	finish(): void {
		throw new Error("Method not implemented.");
	}

}

export class RideStatusFactory {
	static create (status: string, ride: Ride) {
		if (status === "requested") return new RequestedStatus(ride);
		if (status === "accepted") return new AcceptedStatus(ride);
		if (status === "in_progress") return new InProgressStatus(ride);
		if (status === "completed") return new FinishStatus(ride);
		throw new Error("Invalid status");
	}
}
