// getting all body elements except script
const bdy = document.querySelectorAll('body *:not(script)');

  //creating the button here
    const SearchButton = document.createElement("div")
    SearchButton.id = "mySearchButton"
    SearchButton.style.width = "50px";
    SearchButton.style.height = "50px";
    SearchButton.style.backgroundColor = "#f0f0f0";
    SearchButton.style.position = "fixed";
    SearchButton.style.bottom = "20px";
    SearchButton.style.right = "20px";
    SearchButton.style.zIndex = 999;
    SearchButton.style.borderRadius = "50%";
    SearchButton.style.display = "flex";
    SearchButton.style.alignItems = "center";
    SearchButton.style.justifyContent = "center";
    SearchButton.innerHTML = '<svg style="height:30px; width:30px; vertical-align:center" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#4285f4" d="m12 15c1.66 0 3-1.31 3-2.97v-7.02c0-1.66-1.34-3.01-3-3.01s-3 1.34-3 3.01v7.02c0 1.66 1.34 2.97 3 2.97z"></path><path fill="#34a853" d="m11 18.08h2v3.92h-2z"></path><path fill="#fbbc04" d="m7.05 16.87c-1.27-1.33-2.05-2.83-2.05-4.87h2c0 1.45 0.56 2.42 1.47 3.38v0.32l-1.15 1.18z"></path><path fill="#ea4335" d="m12 16.93a4.97 5.25 0 0 1 -3.54 -1.55l-1.41 1.49c1.26 1.34 3.02 2.13 4.95 2.13 3.87 0 6.99-2.92 6.99-7h-1.99c0 2.92-2.24 4.93-5 4.93z"></path></svg>';

    const body = document.getElementsByTagName('body')[0];
    body.prepend(SearchButton);
    const mybtn = document.getElementById('mySearchButton');
    
    mybtn.addEventListener('mouseover', ()=>{
        mybtn.style.cursor = 'pointer';
    });

    // adding style to head
        const boom = document.getElementsByTagName('head')[0];
        const style = document.createElement('style');
        style.innerHTML = `
        mark{
            background-color:yellow;
            color:black;
            font-weight:bold;
            padding:0px;
        }
        `;
        boom.appendChild(style);
            

        //getting start button
        const startButton = document.getElementById('mySearchButton');
        
        //speech recognition
        const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
        recognition.lang = 'en-US';


        // will start speech recognition
        startButton.addEventListener('click', () => { 
            recognition.start();
            startButton.style.backgroundColor = '#86fa5f';
        });

        recognition.addEventListener('result', (event) => {
            startButton.style.backgroundColor = '#f0f0f0';
            const transcript = event.results[0][0].transcript;
            var voicetext = transcript.replace('.','');
			//var voicetext = voicetext.toLowerCase()
            console.log(voicetext);

            bdy.forEach(function(tag){
                // creating new RegExp
                const re = new RegExp(voicetext, 'ig');
                var ob = new Mark(tag);
    
                // First unmark the highlighted word or letter
                ob.unmark();
    
                // Highlight letter or word
                ob.markRegExp(
                    re
                );
            })
            
        });

        recognition.addEventListener('end', () => {
            startButton.style.backgroundColor = '#fefefe';
        });

        recognition.addEventListener('error', (event) => {
            console.error('Speech recognition error:', event.error);
            alert('An error occured !\nTry Again');
        });
    