const allCompanies = require("./csvjson.json");
const R = require("ramda");
const fs = require("fs");

const turnStringIntoArray = string =>
  R.isEmpty(string) ? "" : R.split(", ", string);
const doTheThing = company => {
  const companyWithoutId = R.pick(
    ["impact", "transparency", "impactType", "founders"],
    company
  );
  const stringsAsArrays = R.map(x => turnStringIntoArray(x), companyWithoutId);
  const modifiedCompany = R.mergeRight(company, stringsAsArrays);
  return modifiedCompany;
};

const fileContent = R.map(doTheThing, allCompanies);
fs.writeFile("companies.json", JSON.stringify(fileContent), () => {
  console.log("done");
});
