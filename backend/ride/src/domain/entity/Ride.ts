import Position from "./Position";
import DistanceCalculator from "../service/DistanceCalculator";
import Coord from "../vo/Coord";
import RideStatus, { RideStatusFactory } from "../vo/RideStatus";
import UUID from "../vo/UUID";

// Entity
export default class Ride {
	private rideId: UUID;
	private passengerId: UUID;
	private driverId?: UUID;
	private from: Coord;
	private to: Coord;
	private status: RideStatus;
	private date: Date;
	private distance: number;
	private fare: number

	constructor (rideId: string, passengerId: string, fromLat: number, fromLong: number, toLat: number, toLong: number, status: string, date: Date, driverId: string = "", distance: number = 0, fare: number = 0) {
		this.rideId = new UUID(rideId);
		this.passengerId = new UUID(passengerId);
		if (driverId) this.driverId = new UUID(driverId);
		this.from = new Coord(fromLat, fromLong);
		this.to = new Coord(toLat, toLong);
		this.status = RideStatusFactory.create(status, this);
		this.date = date;
		this.distance = distance;
		this.fare = fare;
	}

	static create (passengerId: string, fromLat: number, fromLong: number, toLat: number, toLong: number) {
		const uuid = UUID.create();
		const status = "requested";
		const date = new Date();
		const distance = 0;
		const fare = 0;
		return new Ride(uuid.getValue(), passengerId, fromLat, fromLong, toLat, toLong, status, date, "", distance, fare);
	}

	getRideId () {
		return this.rideId.getValue();
	}

	getPassengerId () {
		return this.passengerId.getValue();
	}

	getDriverId () {
		return this.driverId?.getValue();
	}

	getFrom () {
		return this.from;
	}

	getTo () {
		return this.to;
	}

	getStatus () {
		return this.status.value;
	}

	setStatus (status: RideStatus) {
		this.status = status;
	}

	accept (driverId: string) {
		this.status.accept();
		this.driverId = new UUID(driverId);
	}

	start () {
		this.status.start();
	}

	finish (positions: Position[]) {
		this.distance = DistanceCalculator.calculateByPositions(positions);
		this.fare = this.distance * 2.1;
		this.status.finish();
	}

	getDistance () {
		return this.distance
	}

	getFare () {
		return this.fare;
	}

	getDate () {
		return this.date;
	}

}
