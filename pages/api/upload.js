import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function formParser(req) {
  const form = formidable({ multiples: true });
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      }
      resolve({ fields, files });
    });
  });
}

export default async function handler(req, res) {
  const form = await formParser(req);
  //   const form = new formidable.IncomingForm({ multiples: true });
  //   form
  //     .on("field", (field, value) => {
  //       console.log(field, value);
  //     })
  //     .on("file", (field, file) => {
  //       console.log(field, file);
  //     });
  console.log(form);
  res.status(200).json({ message: "Successful" });
}
