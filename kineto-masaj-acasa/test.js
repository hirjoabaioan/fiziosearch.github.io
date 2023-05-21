// //JS FileReader API

// function loadImage() {
//     const inputImage = document.getElementById('inputImage');
//     const reader = new FileReader();
//     reader.onload = function (event) {
//       const image = new Image();
//       image.src = event.target.result;
//       image.onload = function () {
//         editAndConvertImage(image);
//       };
//     };
//     reader.readAsDataURL(inputImage.files[0]);
//   }

// // cropperjs library

// function editAndConvertImage(image) {
//     const canvas = document.createElement('canvas');
//     const ctx = canvas.getContext('2d');
  
//     // Calculate the square dimensions
//     const size = Math.min(image.width, image.height);
//     canvas.width = size;
//     canvas.height = size;
  
//     // Draw the image on the canvas
//     const offsetX = (image.width - size) / 2;
//     const offsetY = (image.height - size) / 2;
//     ctx.drawImage(image, offsetX, offsetY, size, size, 0, 0, size, size);
  
//     // Convert the image to webp format with quality settings
//     const webpImage = canvas.toDataURL('image/webp', 0.8);
  
//     // Call the function to reduce the file size
//     reduceFileSize(webpImage);
//   }


// // Compress.js library
//   function reduceFileSize(webpImage) {
//     const compress = new Compress();
//     const files = [{ data: webpImage, type: 'image/webp' }];
//     compress
//       .compress(files, {
//         size: 0.8, // Compression ratio
//         quality: 0.75, // Quality of the image
//         maxWidth: 1920, // Maximum width of the output image
//         maxHeight: 1920, // Maximum height of the output image
//         resize: true,
//       })
//       .then((compressedImages) => {
//         const { photo } = compressedImages[0];
//         const compressedImage = `${photo.prefix},${photo.data}`;
//         // Do something with the compressed image (e.g., display or download)
//         console.log(compressedImage);
//       });
//   }


// const imageInput = document.getElementById('imageInput')
// const canvas = document.getElementById('canvas')
// const compressBtn = document.getElementById('compressBtn')
// const ctx = canvas.getContext('2d')

// let imageSrc = ''

// // Listen for file input change
// imageInput.addEventListener('change', () => {
//   const file = imageInput.files[0]

//   // Check if file is an image
//   if (file.type.startsWith('image/')) {
//     const reader = new FileReader()

//     // Load image on reader
//     reader.onload = () => {
//       imageSrc = reader.result
//       drawImage()
//     }
//     reader.readAsDataURL(file)
//   }
// })

// // Draw image on the canvas
// function drawImage() {
//   const img = new Image()

//   // Load image on image element
//   img.onload = () => {
//     // Find the smallest dimension to crop the image to a square
//     const size = Math.min(img.width, img.height)

//     // Set the canvas size to the cropped size
//     canvas.width = size
//     canvas.height = size

//     // Draw the cropped image on the canvas
//     ctx.drawImage(img, (img.width - size) / 2, (img.height - size) / 2, size, size, 0, 0, size, size)
//   }
//   img.src = imageSrc
// }

// // Compress image
// compressBtn.addEventListener('click', () => {
//   // Convert canvas to blob
//   canvas.toBlob((blob) => {
//     // Create a new File object with the compressed image
//     const compressedFile = new File([blob], 'compressed.jpg', { type: 'image/jpeg' })

//     // Check if file size is less than 100KB
//     if (compressedFile.size <100000) {
//       // Upload file or do something else with it
//       console.log(compressedFile)
//     } else {
//       // Compression not successful, try again or show error message
//       console.log('File size still greater than 100KB')
//     }
//   }, 'image/jpeg', 0.7)
// })

const fileInput = document.getElementById('file-input');
          const container = document.getElementById('container');
      
          fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
              const img = new Image();
              img.src = URL.createObjectURL(file);
              img.onload = () => {
                img.id = 'image';
                container.innerHTML = '';
                container.appendChild(img);
                makeImageDraggable(img);
              };
            }
          });
      
          function makeImageDraggable(img) {
            let isDragging = false;
            let startX, startY, imgX, imgY;
      
            img.addEventListener('mousedown', (e) => {
              startX = e.clientX;
              startY = e.clientY;
              imgX = parseInt(img.style.left || 0);
              imgY = parseInt(img.style.top || 0);
              isDragging = true;
            });
      
            document.addEventListener('mousemove', (e) => {
              if (!isDragging) return;
              const dx = e.clientX - startX;
              const dy = e.clientY - startY;
              img.style.left = imgX + dx + 'px';
              img.style.top = imgY + dy + 'px';
            });
      
            document.addEventListener('mouseup', () => {
              if (!isDragging) return;
              isDragging = false;
              compressImage(img, 100, (compressedImg) => {
                container.innerHTML = '';
                compressedImg.id = 'image';
                container.appendChild(compressedImg);
              });
            });
          }
      
          function compressImage(img, targetSizeKB, callback) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);
            let quality = 0.9;
            let imageData = canvas.toDataURL('image/jpeg', quality);
            while (dataURLtoBlob(imageData).size / 1024 > targetSizeKB) {
              quality -= 0.1;
              imageData = canvas.toDataURL('image/jpeg', quality);
            }
            const compressedImg = new Image();
            compressedImg.src = imageData;
            compressedImg.onload = () => callback(compressedImg);
          }
      
          function dataURLtoBlob(dataurl) {
            const arr = dataurl.split(',');
            const mime = arr[0].match(/:(.*?);/)[1];
            const bstr = atob(arr[1]);
            let n = bstr.length;
            const u8arr = new Uint8Array(n);
            while (n--) {
              u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], { type: mime });
          }