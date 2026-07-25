const sounds = ['applause', 'gasp', 'wrong', 'tada', 'victory', 'boo']

sounds.forEach(sound => {
    const btn = document.createElement('button')
    btn.classList.add("btn")
    btn.innerText = sound

    btn.addEventListener('click', () => {
        stopSongs()
        document.getElementById(sound).play()
    })

    document.getElementById("buttons").appendChild(btn)
})

function stopSongs(){
    sounds.forEach(sound => {
        const song = document.getElementById(sound)
        song.pause()
        song.currentTime = 0
    })
}

const volumeSlider = document.querySelector('.volumeSlider');
const line = document.querySelector('.line');
const volumeIcon = document.querySelector('.volumeSlider i');
let isExpanded = false;

// Click on the volume icon to toggle the line
volumeIcon.addEventListener('click', function(e) {
  e.stopPropagation();
  toggleVolumeSlider();
});

// Click on the circle to toggle the line
document.querySelector('.circle').addEventListener('click', function(e) {
  e.stopPropagation();
  toggleVolumeSlider();
});

function toggleVolumeSlider() {
  isExpanded = !isExpanded;
  
  if (isExpanded) {
    line.classList.remove('hidden');
    volumeIcon.className = 'fa-solid fa-volume-xmark';
  } else {
    line.classList.add('hidden');
    volumeIcon.className = 'fa-solid fa-volume-high';
  }
}

// Optional: Click on the line itself to toggle (clicking the black line)
line.addEventListener('click', function(e) {
  // Don't toggle if clicking the circle
  if (!e.target.closest('.circle')) {
    toggleVolumeSlider();
  }
});

// Optional: Drag the circle along the line (like a real volume slider)
let isDragging = false;

document.querySelector('.circle').addEventListener('mousedown', function(e) {
  isDragging = true;
  e.stopPropagation();
});

document.addEventListener('mousemove', function(e) {
  if (isDragging && !line.classList.contains('hidden')) {
    const rect = line.getBoundingClientRect();
    let x = e.clientX - rect.left;
    x = Math.max(0, Math.min(x, rect.width));
    const percentage = x / rect.width;
    
    // Move the circle
    const circle = document.querySelector('.circle');
    circle.style.right = (rect.width - x) + 'px';
    
    // Set volume for all audio elements
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
      audio.volume = percentage;
    });
    
    // Update icon based on volume
    const icon = document.querySelector('.volumeSlider i');
    if (percentage === 0) {
      icon.className = 'fa-solid fa-volume-xmark';
    } else if (percentage < 0.5) {
      icon.className = 'fa-solid fa-volume-low';
    } else {
      icon.className = 'fa-solid fa-volume-high';
    }
  }
});

document.addEventListener('mouseup', function() {
  isDragging = false;
});