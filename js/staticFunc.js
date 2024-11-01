class Chameleon {
  static colorChange(newColor) {
    this.newColor = newColor;
    console.log('this', this);
    return this.newColor;
  }

  constructor({ newColor = "green" } = {}) {
    console.log('that', this);
    this.newColor = newColor;
  }
}

const freddie = new Chameleon({ newColor: "purple" });

console.log(Chameleon.colorChange('orange'));