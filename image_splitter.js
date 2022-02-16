const sharp = require("sharp");

/// Init value
// const originalUrl = "/Users/dilvika/Downloads/stickers/";
const originalUrl = "resource/";
const prefixName = 'ami_';
const totalPictures = 71;
const format = '.png';
const imageWidth = 130;


const handleSpriteSheet = function (processFileName, format) {
  const fullPathFileName = processFileName + format;
  const image = sharp(fullPathFileName);

  let countFrames;
  console.log('Init success' + fullPathFileName)
  image
    .metadata()
    .then(function (metadata) {
      console.log(`Image size: ${metadata.width}`);
      countFrames = metadata.width / imageWidth;
    })
    .then(function (data) {
      console.log(`Processing Data..`);
      for (let i = 0; i < countFrames; i++) {
        regenImage = sharp(fullPathFileName);
        console.log(`Handling frame [${i}]`);
        regenImage
          .extract({ left: i*imageWidth, top: 0, width: imageWidth, height: imageWidth })
          /// Modify Follow Telegram.
        //   .resize({width: 260, height: 260, fit: 'contain'})
        //   .extend({
        //     top: 126,
        //     bottom: 126,
        //     left: 126,
        //     right: 126,
        //     background: { r: 0, g: 0, b: 0, alpha: 0 }
        //   })
        //   .extract({ left: 0, top: 0, width: 260, height: 260 })
          ///
          .toFile(`${processFileName}/${i}.png`, function (err) {
            err !== null ? console.log(`Extract Error [${i}]: ${err}`) : '';
            // Save the top of the image to a file named "top.jpg"
          });
      }
      // data contains a WebP image half the width and height of the original JPEG
    });



}

const generateFileList = (prefix, start, last) => {
  console.log('Generating name list...');

  const array = []
  for (let i = start; i <= last; i++) {
    array.push(`${prefix}${i}`)
  }

  return array;
}

/// Start 
/// Generate List File Name
let fileNames = generateFileList(prefixName, 1, totalPictures);

/// Generate the File list and do the jobs.
for (let i = 0; i < totalPictures; i++) {
  console.log(`-----------Start converting.... ${fileNames[i]} ----------`);
  const processFileName = originalUrl + fileNames[i];
  console.log(processFileName);
  console.log(fileNames[i]);
  handleSpriteSheet(processFileName, format);
}

//for i in {1..71}; do /Users/dilvika/Downloads/output_stickers/ffmpeg -framerate 15 -i /Users/dilvika/Downloads/output_stickers/ami_${i}/%01d.png -vf scale=512:512 /Users/dilvika/Downloads/output_stickers/ami_${i}/output_${i}.webm ; done