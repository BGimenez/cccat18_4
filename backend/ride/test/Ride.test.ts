import Position from "../src/domain/entity/Position";
import Ride from "../src/domain/entity/Ride";

test("Deve calcular a distância e fare de uma corrida", function () {
	const ride = new Ride("","",-27.584905257808835, -48.545022195325124,-27.496887588317275, -48.522234807851476,'in_progress',new Date);
	const positionFrom = new Position("", "", -27.584905257808835, -48.545022195325124, new Date);
	const positionTo = new Position("", "", -27.496887588317275, -48.522234807851476, new Date);
	ride.finish([positionFrom, positionTo]);
	expect(ride.getDistance()).toBe(10);
	expect(ride.getFare()).toBe(21);
});
