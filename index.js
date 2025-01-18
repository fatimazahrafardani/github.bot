const FILE_PATH = "./data.json";
const simpleGit = require("simple-git");
const jsonfile = require("jsonfile");
const moment = require("moment");

(async () => {
  const randomInt = await import("random-int").then((module) => module.default);

  const git = simpleGit("C:/Users/DELL/github.bot");

  const makeCommit = (n) => {
    if (n === 0) {
      git.push(["-u", "origin", "master"], (err, result) => {
        if (err) {
          console.error("Error pushing to remote:", err);
        } else {
          console.log("Pushed changes to remote repository");
        }
      });
      return;
    }

    const x = randomInt(0, 54);
    const y = randomInt(0, 6);
    const DATE = moment()
      .subtract(0, "y")
      .add(1, "d")
      .add(x, "w")
      .add(y, "d")
      .format();

    const data = { date: DATE };
    console.log(DATE);

    jsonfile.writeFile(FILE_PATH, data, () => {
      git
        .add([FILE_PATH])
        .commit(DATE, { "--date": DATE })
        .push(["-u", "origin", "origin"], (err, result) => {
          if (err) {
            console.error("Error pushing to remote:", err);
          } else {
            console.log("Pushed changes to remote repository");
            makeCommit(--n);
          }
        });
    });
  };

  makeCommit(120);
})();
