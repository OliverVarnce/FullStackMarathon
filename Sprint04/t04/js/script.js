'use srict'

let films = {
    johnWick: {
        id: 1,
        filmTitle: "John Wick",
        filmDate: "December 11, 2014",
        filmActors: [
            "Keanu Reeves",
            "Lance Reddick",
            "Ian McShane",
            "Bridget Moynahan",
            "Derek Kolstad",
        ],
        filmDescription: `With the untimely death of his beloved wife still bitter in his mouth, John Wick, the expert former assassin, receives one final gift from her--a precious keepsake to help John find a new meaning in life now that she is gone. But when the arrogant Russian mob prince, Iosef Tarasov, and his men pay Wick a rather unwelcome visit to rob him of his prized 1969 Mustang and his wife's present, the legendary hitman will be forced to unearth his meticulously concealed identity. Blind with revenge, John will immediately unleash a carefully orchestrated maelstrom of destruction against the sophisticated kingpin, Viggo Tarasov, and his family, who are fully aware of his lethal capacity. Now, only blood can quench the boogeyman's thirst for retribution.`,
        filmPosterSrc: "assets/images/johnwick.jpg",
    },
    avengers: {
        id: 2,
        filmTitle: "Avengers: Endgame",
        filmDate: "April 22, 2019",
        filmActors: [
            "Robert Downey Jr.",
            "Ian McShane",
            "Chris Evans",
            "Chris Hemsworth",
            "Scarlett Johansson",
        ],
        filmDescription: `After half of all life is snapped away by Thanos, the Avengers are
    left scattered and divided. Now with a way to reverse the damage,
    the Avengers and their allies must assemble once more and learn to
    put differences aside in order to work together and set things
    right. Along the way, the Avengers realize that sacrifices must be
    made as they prepare for the ultimate final showdown with Thanos,
    which will result in the heroes fighting the biggest battle they
    have ever faced.`,
        filmPosterSrc: "assets/images/avengers.jpg",
    },
    inception: {
        id: 3,
        filmTitle: "Inception",
        filmDate: "July 22, 2010",
        filmActors: [
            "Leonardo DiCaprio",
            "Joseph Gordon-Levitt",
            "Tom Hardy",
            "Cillian Murphy",
            "Marion Cotillard",
        ],
        filmDescription: `Dominic Cobb is an spy who instead of breaking into a person's home, office, or even computer, gets the information he needs by getting into the person's mind through their dreams. Cobb is also a fugitive who misses his children. Someone approaches Cobb and wants to hire him but instead of getting information out, the man wants Cobb to implant something, a process called "inception", which is not easy to do. Cobb is hesitant to do it, but when the man offers to help Cobb go back to his children, Cobb agrees. So he assembles his team but when they begin, there are things Cobb didn't tell his team that could jeopardize the job, and when they occur, they're not sure if they should continue.`,
        filmPosterSrc: "assets/images/inception.jpg",
    },
};

let $filmName = document.getElementsByClassName("film__name");
let $filmDescContainer = document.getElementsByClassName(
    "film__desc__container"
)[0];

for (let name of $filmName) {
    name.addEventListener("click", () => {
        for (let attribute of $filmName) {
            attribute.removeAttribute("id");
        }
        name.setAttribute("id", "active");

        let dataId = name.getAttribute("data-id");

        for (let film in films) {
            let filmId = films[film].id;

            if (filmId == dataId) {
                $filmDescContainer.innerHTML = `
          <div class="text__container">
            <div class="film__title">${films[film].filmTitle}</div>
            <div class="film__date">${films[film].filmDate}</div>
            <div class="actors__container">
            <div class="actors__container">
            <div class="actor">${films[film].filmActors[0]}</div>
            <div class="actor">${films[film].filmActors[1]}</div>
            <div class="actor">${films[film].filmActors[2]}</div>
            <div class="actor">${films[film].filmActors[3]}</div>
            <div class="actor">${films[film].filmActors[4]}</div>
          </div>
            </div>
            <div class="description">${films[film].filmDescription}
            </div>
          </div>
          <img src="${films[film].filmPosterSrc}" 
          alt="poster" class="film__poster" />
          `;
            }
        }
    });
}