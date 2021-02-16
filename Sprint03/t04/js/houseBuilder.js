
function HouseBuilder(address, description, owner, size, roomCount) {
    this.address = address;
    this.description = description;
    this.date = new Date();
    this.owner = owner;
    this.size = size;
    this.roomCount = roomCount;
    this._averageBuildSpeed = 0.5;
    this.getDaysToBuild = function () {
        return house.size / house._averageBuildSpeed;
    }
}

const house = new HouseBuilder('88 Crescent Avenue',
    'Spacious town house with wood flooring, 2-car garage, and a back patio.',
    'J. Smith',
    110,
    5);

