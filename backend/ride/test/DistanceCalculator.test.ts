import Position from "../src/domain/entity/Position";
import DistanceCalculator from "../src/domain/service/DistanceCalculator"
import Coord from "../src/domain/vo/Coord";

test("Deve calcular a distância entre duas coordenadas", function () {
	const from = new Coord(-27.584905257808835, -48.545022195325124);
	const to = new Coord(-27.496887588317275, -48.522234807851476);
	expect(DistanceCalculator.calculate(from, to)).toBe(10);
});

test("Deve calcular a distância total entre as coordenadas", function () {
	const positionFrom = new Position("", "", -27.584905257808835, -48.545022195325124, new Date);
	const positionTo = new Position("", "", -27.496887588317275, -48.522234807851476, new Date);
	const positions = [positionFrom, positionTo];
	expect(DistanceCalculator.calculateByPositions(positions)).toBe(10);
});
