class Hello {
  constructor(text){
    this.text = text;
  }

  hi(callback){
    callback(this.text);
  }

  ola(callback){
    this.hi(callback);
  }

}

let h = new Hello("Hello World");

h.ola((text) => {
  console.log(text);
});
