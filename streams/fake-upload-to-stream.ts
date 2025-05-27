import { Readable } from "node:stream";

class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 5) {
        this.push(null);
      } else {
        const buf = Buffer.from(i.toString());

        this.push(buf);
      }
    }, 1000);
  }
}

const response = await fetch("http://localhost:3335", {
  method: "POST",
  body: new OneToHundredStream(),
  duplex: "half",
});

const data = await response.text();

console.log(data);
