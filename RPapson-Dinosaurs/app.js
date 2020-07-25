// Create Dino Constructor
function Dino(species, weight, height, diet, where, when, fact, image) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.where = where;
    this.when = when;
    this.fact = fact;
    this.image = image;
}


// Create Dino Objects
const triceratops = new Dino(
    'Triceratops',
    13000,
    118,
    'herbavore',
    'North America',
    'Late Cretaceous', [
        'First discovered in 1889 by Othniel Charles Marsh',
        'fact 2',
        'fact 3',
        'fact 4'
    ],
    'triceratops.png'
);

const tyrannosaurusRex = new Dino(
    'Tyrannosaurus Rex',
    11905,
    144,
    'carnivore',
    'North America',
    'Late Cretaceous', [
        'The largest known skull measures in at 5 feet long',
        'fact 2',
        'fact 3',
        'fact 4'
    ],
    'tyrannosaurus rex.png'
);

const anklyosaurus = new Dino(
    'Anklyosaurus',
    10500,
    55,
    'herbavore',
    'North America',
    'Late Cretaceous', [
        'Anklyosaurus survived for approximately 135 million years',
        'fact 2',
        'fact 3',
        'fact 4'
    ],
    'anklyosaurus.png'
);

const brachiosaurus = new Dino(
    'Brachiosaurus',
    70000,
    372,
    'herbavore',
    'North America',
    'Late Jurasic', [
        'An asteroid was named "Brachiosaurus" in 1991',
        'fact 2',
        'fact 3',
        'fact 4'
    ],
    'brachiosaurus.png'
);

const stegosaurus = new Dino(
    'Stegosaurus',
    13000,
    118,
    'herbavore',
    'North America, Europe, Asia',
    'Late Jurasic to Early Cretaceous', [
        'The Stegosaurus had between 17 and 22 seperate plates and flat spines',
        'fact 2',
        'fact 3',
        'fact 4'
    ],
    'stegosaurus.png'
);

const elasmosaurus = new Dino(
    'Elasmosaurus',
    16000,
    551,
    'carnivore',
    'North America',
    'Late Cretaceous', [
        'Elasmosaurus was a marine reptile first discovered in Kansas',
        'fact 2',
        'fact 3',
        'fact 4'
    ],
    'elasmosaurus.png'
);

const pteranodon = new Dino(
    'Pteranodon',
    44,
    20,
    'carnivore',
    'North America',
    'Late Cretaceous', [
        'Actually a flying reptile, the Pteranodon is not a dinosaur',
        'fact 2',
        'fact 3',
        'fact 4'
    ],
    'pteranodon.png'
);

const pigeon = new Dino(
    'Pigeon',
    0.5,
    9,
    'herbavore',
    'World Wide',
    'Holocene', [
        'All birds are living dinosaurs',
        'fact 2',
        'fact 3',
        'fact 4'
    ],
    'pigeon.png'
);


// Create Human Object
// Use IIFE to get human data from form
function humanData() {
    const human = (function() {
        let name = document.getElementById('name').value;
        let feet = document.getElementById('feet').value;
        let inches = document.getElementById('inches').value;
        let weight = document.getElementById('weight').value;
        let diet = document.getElementById('diet').value;
        let image = 'human.png';

        function getName() {
            return name;
        }

        function getHeight() {
            return parseFloat((feet) * 12) + parseFloat(inches);
        }

        function getWeight() {
            return parseFloat(weight);
        }

        function getDiet() {
            return diet;
        }

        function getImage() {
            return image;
        }

        return {
            name: getName(),
            height: getHeight(),
            weight: getWeight(),
            diet: getDiet(),
            image: getImage()
        };
    })();
    return human;
    //console.log(human);
}


// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches. 
Dino.prototype.compareHeight = function(humanHeight) {
    this.fact[1] = `This dinosaur was ${
          Math.floor(this.height / humanHeight)
        } times taller than you`;
};


// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareWeight = function(humanWeight) {
    this.fact[2] = `This dinosaur was ${
          Math.floor(this.weight / humanWeight)
        } times heavier than you`;
};


// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareDiet = function(humanDiet) {
    if (this.diet === humanDiet) {
        this.fact[3] = `This dinosaur was also a ${this.diet}!`;
    } else {
        this.fact[3] = `This dinosaur was a ${this.diet}`;
    }
};


// Generate Tiles for each Dino in Array
const dinos = [];
const human = humanData();

dinos.push(
    triceratops,
    tyrannosaurusRex,
    anklyosaurus,
    brachiosaurus,
    human,
    stegosaurus,
    elasmosaurus,
    pteranodon,
    pigeon
);


// Add tiles to DOM
function addTilesToDOM(humanName) {
    const grid = document.getElementById('grid');
    dinos.map(dino => {
        const tile = document.createElement('div');
        tile.className = 'grid-item';

        const title = document.createElement('h3');
        title.className = 'h3';
        if (dino.species) {
            title.innerHTML = dino.species;
        } else {
            title.innerHTML = humanName;
        }

        const fact = document.createElement('p');
        fact.className = 'p';
        const factsArray = dino.fact;
        let randomFact = '';

        if (factsArray) {
            randomFact = factsArray[Math.floor(Math.random() * factsArray.length)];
        }

        if (dino.species == 'Pigeon') {
            fact.innerHTML = dino.fact[0];
        } else {
            fact.innerHTML = randomFact;
        }

        const image = document.createElement('img');
        image.className = 'img';
        image.src = `./images/${dino.image}`;

        tile.appendChild(image);
        tile.appendChild(fact);
        tile.appendChild(title);
        grid.appendChild(tile);
    });
}


// Remove form from screen
function removeForm() {
    const form = document.getElementById('dino-compare');
    form.innerHTML = '';
}


// On button click, prepare and display infographic
const button = document.getElementById('btn');
button.addEventListener('click', function() {
    const human = humanData();
    dinos.map(dino => {
        if (dino.species) {
            dino.compareHeight(human.height);
            dino.compareWeight(human.weight);
            dino.compareDiet(human.diet);
        }
    });
    addTilesToDOM(human.name);
    removeForm();
});