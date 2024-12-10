const API_KEY = '47244089-f0d91e2c2d4f91793aba417c2'; // Replace with your Pixabay API key
const BASE_URL = 'https://pixabay.com/api/';

document.getElementById('search_bar').addEventListener('submit', function (e) {
    e.preventDefault();
    const query = document.getElementById('search_text').value.trim();
    if (query) {
        page = 1; // Reset the page number for a new search
        document.getElementById('image_result').innerHTML = ''; // Clear previous results
        searchImages(query);
    }
});

let page = 1;

async function searchImages(query) {
    const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&per_page=10&page=${page}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.hits.length > 0) {
            displayImages(data.hits);
            document.getElementById('load_more').style.display = 'block';
        } else {
            document.getElementById('image_result').innerHTML = '<p>No results found.</p>';
            document.getElementById('load_more').style.display = 'none';
        }
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

function displayImages(images) {
    const imageResult = document.getElementById('image_result');
    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.webformatURL;
        imgElement.alt = image.tags;
        imgElement.classList.add('image');
        imageResult.appendChild(imgElement);
    });
}

document.getElementById('load_more').addEventListener('click', function () {
    const query = document.getElementById('search_text').value.trim();
    if (query) {
        page++;
        searchImages(query);
    }
});
