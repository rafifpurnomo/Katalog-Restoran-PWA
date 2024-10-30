import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';

(async () => {
  const files = await imagemin(['src/public/images/heros/*.{jpg,png}'], {
    destination: 'src/public/images/compressIMG-mobile',
    plugins: [
      imageminMozjpeg({ quality: 60 }), 
      imageminPngquant({
        quality: [0.5, 0.7], 
      }),
    ],
  });

  console.log('Images optimized:', files.map(file => file.sourcePath));
})();
