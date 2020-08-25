export class Category {
  constructor(name) {
    this.name = name;
    this.enabled = true;
    this.visible = true;
    this.types = [];
    this.iconSize = [25, 25];
    this.popupAnchor = [0, -10];
  }
}

export class Type {
  constructor(name) {
    this.name = name;
    this.enabled = true;
  }

  valueOf() {
    return this.name;
  }
}
