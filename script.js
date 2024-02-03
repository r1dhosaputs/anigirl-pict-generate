const imageEl = document.getElementById('result-image');
imageEl.classList.remove('active-src')

document.getElementById('sfw-list').classList.remove('hidden');

document.getElementById('nsfw-button').addEventListener('click', function () {
    toggleList('nsfw-list', 'sfw-list');
});

document.getElementById('sfw-button').addEventListener('click', function () {
    toggleList('sfw-list', 'nsfw-list');
});

function toggleList(showListId, hideListId) {
    const showList = document.getElementById(showListId);
    const hideList = document.getElementById(hideListId);

    showList.classList.remove('hidden');
    hideList.classList.add('hidden');
}

sfwSubmitBtn = document.getElementById('sfw-submit');
sfwSubmitBtn.addEventListener('click', function () {
    const selectedValue = document.getElementById('sfw').value;
    if (selectedValue) {
        // Call your fetch API function with the selected value
        fetchAPI('sfw', selectedValue);
    } else {
        alert('Please select an option before generating.');
    }
    console.log('sfw')
});

nsfwSubmitBtn = document.getElementById('nsfw-submit');
nsfwSubmitBtn.addEventListener('click', function () {
    const selectedValue = document.getElementById('nsfw').value;

    if (selectedValue) {
        // Call your fetch API function with the selected value
        fetchAPI('nsfw', selectedValue);
    } else {
        alert('Please select an option before generating.');
    }
});


function downloadImage() {
    const resultImage = document.getElementById('result-image');
    const imageUrl = resultImage.src;

    if (!imageEl.classList.contains('active-src')) {
        alert('No images available for download.');
        return;
    }

    fetch(imageUrl)
        .then(response => response.blob())
        .then(blob => {
            // Create an object URL from the blob
            const url = URL.createObjectURL(blob);

            // Create a temporary anchor element
            const downloadLink = document.createElement('a');
            downloadLink.href = url;
            downloadLink.download = `Images-${imageUrl}`;

            // Trigger a click event on the anchor element
            document.body.appendChild(downloadLink);
            downloadLink.click();

            // Remove the temporary anchor element from the document
            document.body.removeChild(downloadLink);
        })
        .catch(error => {
            console.error('An error occurred:', error.message);
        });
}


function fetchAPI(type, selectedValue) {
    const apiUrl = 'https://api.waifu.pics/' + type + '/' + selectedValue;

    fetch(apiUrl)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Request failed with status code: ' + response.status);
            }
        })
        .then(data => {
            // Process the response data as needed
            console.log(data);
            // You can update your UI or do something with the data here
            imageEl.src = data.url;
            imageEl.classList.add('active-src');
        })
        .catch(error => {
            console.error('An error occurred:', error.message);
        });
}


// let sfwSubmit = document.getElementById('sfw-submit');
// sfwSubmit.addEventListener('click', () => {
//     // console.log('aye')
//     alert('yes')
// })

// if (document.getElementById('sfw-download')) {
//     document.getElementById('sfw-download').addEventListener('click', function () {
//         console.log('Download button clicked');
//         downloadImage();
//     });
// }

// function downloadImage() {
//     const imageElement = document.getElementById('sfw-result-image');
//     const imageUrl = imageElement.src;

//     console.log('Image URL:', imageUrl);

//     if (imageUrl) {
//         fetch(imageUrl)
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Image download failed with status: ' + response.status);
//                 }
//                 return response.blob();
//             })
//             .then(blob => {
//                 // Create a temporary link element
//                 const link = document.createElement('a');
//                 link.href = window.URL.createObjectURL(blob);
//                 link.download = 'downloaded_image.jpg';

//                 // Simulate a click on the link to trigger the download
//                 document.body.appendChild(link);
//                 link.click();

//                 // Remove the link element from the document
//                 document.body.removeChild(link);
//             })
//             .catch(error => console.error('An error occurred:', error));
//     } else {
//         console.log('No image to download.');
//     }
// }


