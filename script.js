const typingText = document.querySelector('.typing-text p')
const input = document.querySelector('.wrapper .input-field')
const time = document.querySelector('.time span b')
const mistakes = document.querySelector('.mistake span')
const wpm = document.querySelector('.wpm span')
const cpm = document.querySelector('.cpm span')
const btn = document.querySelector('button')

//set value
let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;


function loadParagraph(){
const paragraph = [
    "The sun rose slowly, casting a warm glow over the sleepy village. Birds chirped cheerfully as they greeted the new day, and the gentle rustle of leaves filled the air. It was a peaceful morning, perfect for a leisurely stroll through the countryside.",
    "In the bustling city, cars honked impatiently as they navigated the crowded streets. Pedestrians hurried past, lost in their own thoughts, while street vendors called out to attract customers. The city never slept, always alive with activity and energy.",
    "High in the mountains, the air was crisp and clean. Snow-capped peaks stretched as far as the eye could see, while icy streams cascaded down rocky slopes. It was a place of rugged beauty, untouched by the chaos of the world below.",
    "Deep in the forest, ancient trees loomed overhead, their branches reaching towards the sky. Shafts of sunlight filtered through the dense foliage, illuminating the forest floor in patches of golden light. It was a place of mystery and wonder, where anything seemed possible.",
    "On the vast savannah, herds of animals roamed freely, grazing on the lush grasslands. Lions prowled in the distance, their golden coats blending seamlessly with the tall grass. It was a place of raw beauty, where the circle of life played out in all its glory.",
    "Underneath the ocean's surface, coral reefs teemed with life. Brightly colored fish darted among the coral, while graceful sea turtles glided effortlessly through the water. It was a world unto itself, hidden from view but brimming with beauty.",
    "In the heart of the desert, sand dunes stretched endlessly towards the horizon. The heat was oppressive, shimmering waves rising from the desert floor. It was a harsh and unforgiving landscape, yet strangely beautiful in its own way.",
    "At the edge of the Arctic, icebergs towered over the icy waters. Polar bears prowled along the shoreline, their powerful forms perfectly adapted to the harsh environment. It was a place of stark beauty, where the elements ruled supreme.",
    "In the depths of the jungle, exotic plants and animals thrived in abundance. Monkeys swung from vine to vine, their calls echoing through the dense foliage. It was a place of untamed wilderness, where danger lurked around every corner.",
    "In the heart of the city, skyscrapers reached towards the sky, their glass facades reflecting the hustle and bustle below. People hurried along the sidewalks, lost in the rhythm of urban life. It was a place of endless opportunity, where dreams could be made or broken in an instant.",
    "As night fell, the stars emerged one by one, painting the sky with their soft glow. The moon rose slowly, casting a silvery light over the landscape below. It was a time of quiet reflection, when the world seemed to stand still.",
    "In the heat of battle, warriors clashed with ferocious intensity. Swords flashed in the sunlight, shields ringing as they deflected blows. It was a scene of chaos and violence, yet amidst the turmoil, bonds of camaraderie were forged that would last a lifetime.",
    "In the halls of power, politicians debated the fate of nations. Voices rose and fell, arguments flying back and forth as each side fought to make their case. It was a world of intrigue and manipulation, where nothing was ever as it seemed.",
    "In the depths of space, distant galaxies shimmered like jewels against the velvet darkness. Nebulas swirled and danced, their colors shifting and changing with the passage of time. It was a place of infinite possibility, where the mysteries of the universe lay waiting to be discovered.",
    "In the studio, artists worked tirelessly to bring their visions to life. Brushes danced across canvases, colors blending and merging in a symphony of creativity. It was a place of passion and inspiration, where every stroke brought them one step closer to perfection.",
    "In the classroom, students listened attentively as their teacher imparted knowledge and wisdom. Pencils scratched against paper as they took notes, eager to absorb as much information as possible. It was a place of learning and growth, where the seeds of future success were planted.",
    "On the stage, actors performed with passion and intensity, bringing their characters to life in vivid detail. Lights flickered overhead, casting dramatic shadows across the set. It was a world of make-believe, where anything was possible.",
    "In the laboratory, scientists worked tirelessly to unlock the secrets of the universe. Test tubes bubbled and hissed as experiments were conducted, data flashing across computer screens in a flurry of activity. It was a place of innovation and discovery, where the boundaries of human knowledge were constantly being pushed.",
    "In the hospital, doctors and nurses worked tirelessly to save lives. Machines beeped and whirred, monitors displaying vital signs in a constant stream of information. It was a place of healing and hope, where miracles happened every day.",
];
    const randomIndex = Math.floor(Math.random()*paragraph.length);
    typingText.innerHTML='';
    for( const char of paragraph[randomIndex]){
        // console.log(char);
        typingText.innerHTML+= `<span>${char}</span>`;
    }
    typingText.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener('keydown',()=>input.focus());
    typingText.addEventListener("click",()=>{
        input.focus()
    })
}


// handling user Input
function initTyping(){

const char = typingText.querySelectorAll('span');
const typedChar = input.value.charAt(charIndex);
if(charIndex < char.length && timeLeft > 0){

    if(!isTyping){
        timer = setInterval(initTime , 1000);
        isTyping = true;
    }

    if(char[charIndex].innerText === typedChar){
        char[charIndex].classList.add('correct');
        console.log('correct');
    } else{
        mistake++;
        char[charIndex].classList.add('incorrect');
        console.log('incorrect');
    }
    charIndex++;
    char[charIndex].classList.add('active');
       
    mistakes.innerText = mistake;
    cpm.innerText = charIndex - mistake;
}
    else{
    clearInterval(timer);
    input.value='';
    }
}

function initTime(){
    if(timeLeft > 0){
        timeLeft--;
        time.innerText = timeLeft;
        let wpmVal = Math.round(((charIndex-mistake)/5)/(maxTime-timeLeft)*60);
        wpm.innerText= wpmVal;
    }
    else{
        clearInterval(timer);
    }
}

function reset (){
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    time.innerText = timeLeft;
    input.value = '';
    charIndex = 0;
    mistake = 0;
    isTyping = false;
    wpm.innerText = 0;
    cpm.innerText = 0;
    mistake.innerText = 0;
}

input.addEventListener("input",initTyping)
btn.addEventListener("click",reset);
loadParagraph();