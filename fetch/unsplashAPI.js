const buttonGet = document.getElementById('get');
buttonGet.addEventListener('click', sendReqest);
const imgField = document.getElementById("image-received");
const articleField = document.getElementById('articles');

function sendReqest(){
	const searchedForText = document.getElementById('input-text').value;
	let urlImg = `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`;
	const unsplashHeader = new Headers();
	unsplashHeader.append('Authorization',
		'Client-ID f2a1f815f0b96c22d6e284850e4a5d833b66d129e8dc83093ea5fe5dc4d16b9e');
	fetch(urlImg, {headers: unsplashHeader}).then(function(response){
		return response.json();
	}).then(addImageHandler);


	let urlArticle = `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=
	${searchedForText}&api-key=37bf624c5a0f4d20b289f682205aa9c8`;
	fetch(urlArticle).then(function(response){
		return response.json();
	}).then(addArticleHandler);
}

function addImageHandler(data){
	const firstImg = data.results[0];
	let firstImgUrl = firstImg.urls.regular;
	imgField.innerHTML = "<img src="+firstImgUrl + ">";
}

function errorHandler(){
	imgField.innerHTML = "<h2>An error occurred</h2>";
	console.log( 'An error occurred \uD83D\uDE1E' );
}

function addArticleHandler(data){
	data.response.docs.forEach((article)=>{
		articleField.innerHTML += `<li class='article'><h2><a href = "${article.web_url}">${article.headline.main}</a></h2></li>
		<p>${article.snippet}</p>`});
};

function errorArticleHandler(){
	articleField.innerHTML="<h2>An error occurred</h2>";
	console.log( 'An error occurred \uD83D\uDE1E' );
}


