const quizArea = document.getElementById('quiz-area');
const resultArea = document.getElementById('result-area');
const finalScoreEl = document.getElementById('final-score');
const restartBtn = document.getElementById('restart');

const questions = [
  {
    q: 'งาน "วันวิสาขบูชา" ของไทยมีความสำคัญเกี่ยวกับอะไร',
    choices: ['การเฉลิมฉลองปีใหม่', 'การรำลึกถึงพระพุทธเจ้า', 'งานเก็บเกี่ยวข้าว', 'เทศกาลน้ำเพื่อความสนุก'],
    correct: 1,
    explain: 'วันวิสาขบูชาเป็นวันที่รำลึกถึงพระพุทธเจ้า (ประสูติ ตรัสรู้ และปรินิพพาน) ซึ่งเป็นวันสำคัญของพุทธศาสนิกชน.'
  },
  {
    q: 'อาหารไทยที่มีรสเผ็ด เปรี้ยว หวาน เค็ม มักใช้รสไหนเป็นหลักในการปรุง',
    choices: ['เค็ม', 'เปรี้ยว', 'สมดุลของหลายรส', 'หวานอย่างเดียว'],
    correct: 2,
    explain: 'อาหารไทยขึ้นชื่อเรื่องความสมดุลของหลายรสชาติ ทั้งเผ็ด เปรี้ยว หวาน และเค็ม เพื่อให้ได้รสที่กลมกล่อม.'
  },
  {
    q: 'ในพิธีแห่เทียนเข้าพรรษา มีการทำอะไรเป็นพิเศษ',
    choices: ['จุดพลุ', 'ถวายเทียนและผ้าอาบน้ำฝนแก่พระสงฆ์', 'แข่งเรือ', 'ปล่อยโคมลอย'],
    correct: 1,
    explain: 'งานแห่เทียนเข้าพรรษามีประเพณีถวายเทียนและผ้าอาบน้ำฝนแก่พระสงฆ์เพื่อใช้ในช่วงเข้าพรรษา.'
  },
  {
    q: 'การไหว้แบบไทยที่นิยมทำเมื่อพบผู้ใหญ่หรือขอพรเรียกว่าอะไร',
    choices: ['คุกเข่า', 'ไหว้', 'โบกมือ', 'จับมือ'],
    correct: 1,
    explain: 'การไหว้เป็นท่าทางเคารพแบบไทยโดยใช้สองมือประกบกันและค้อมศีรษะเมื่อพบหรือขอพรจากผู้ใหญ่.'
  },
  {
    q: 'ศิลปะการต่อสู้แบบดั้งเดิมของไทยที่มีชื่อเสียงคืออะไร',
    choices: ['มวยปล้ำ', 'มวยไทย', 'คาราเต้', 'เทควันโด'],
    correct: 1,
    explain: 'มวยไทยเป็นศิลปะการต่อสู้ประจำชาติที่มีท่าทางและเทคนิคเฉพาะตัว เช่น ศอก เข่า และเตะ.'
  }
];

let index = 0;
let score = 0;

function getEmoji(choiceText) {
  const t = choiceText.toLowerCase();
  if (t.includes('พระ') || t.includes('พุทธ') || t.includes('พระพุทธ')) return '🛕';
  if (t.includes('ปีใหม่') || t.includes('เฉลิมฉลอง')) return '🎉';
  if (t.includes('ข้าว') || t.includes('เก็บเกี่ยว')) return '🌾';
  if (t.includes('น้ำ') || t.includes('โคม') || t.includes('ปล่อย')) return '💦';
  if (t.includes('เผ็ด') || t.includes('พริก')) return '🌶️';
  if (t.includes('เปรี้ยว') || t.includes('มะนาว')) return '🍋';
  if (t.includes('หวาน')) return '🍯';
  if (t.includes('เค็ม')) return '🧂';
  if (t.includes('เทียน') || t.includes('ถวาย')) return '🕯️';
  if (t.includes('ผ้า') || t.includes('ผ้าอาบ')) return '🧵';
  if (t.includes('ไหว้') || t.includes('ค้อม')) return '🙏';
  if (t.includes('มวย')) return '🥊';
  if (t.includes('คาราเต้') || t.includes('เทควันโด')) return '🥋';
  return '🔹';
}

function renderQuestion() {
  const q = questions[index];
  quizArea.innerHTML = '';

  const card = document.createElement('div');
  card.className = 'card';

  const h2 = document.createElement('h2');
  h2.textContent = `ข้อที่ ${index + 1} / ${questions.length}`;
  card.appendChild(h2);

  const p = document.createElement('p');
  p.textContent = q.q;
  card.appendChild(p);

  const choices = document.createElement('div');
  choices.className = 'choices';

  q.choices.forEach((c, i) => {
    const btn = document.createElement('button');
    btn.className = 'choice';
    const emoji = getEmoji(c);
    btn.textContent = `${emoji} ${c}`;
    btn.addEventListener('click', () => selectAnswer(i, btn));
    choices.appendChild(btn);
  });

  card.appendChild(choices);

  const feedback = document.createElement('div');
  feedback.className = 'feedback hidden';
  feedback.id = 'feedback';
  card.appendChild(feedback);

  const actions = document.createElement('div');
  actions.className = 'actions';

  const nextBtn = document.createElement('button');
  nextBtn.textContent = index < questions.length - 1 ? 'ข้อต่อไป' : 'ดูคะแนน';
  nextBtn.className = 'secondary';
  nextBtn.disabled = true;
  nextBtn.addEventListener('click', () => {
    index++;
    if (index < questions.length) {
      renderQuestion();
    } else {
      showResult();
    }
  });

  actions.appendChild(nextBtn);
  card.appendChild(actions);

  quizArea.appendChild(card);
}

function selectAnswer(choiceIndex, btn) {
  const q = questions[index];
  const feedback = document.getElementById('feedback');
  const buttons = document.querySelectorAll('.choice');

  // Prevent double selection
  if (!feedback.classList.contains('hidden')) return;

  buttons.forEach(b => b.classList.add('disabled'));

  if (choiceIndex === q.correct) {
    btn.classList.add('correct');
    feedback.textContent = 'ถูกต้อง! ' + q.explain;
    score++;
  } else {
    btn.classList.add('wrong');
    // Highlight correct
    const correctBtn = Array.from(buttons)[q.correct];
    if (correctBtn) correctBtn.classList.add('correct');
    feedback.textContent = 'ผิด! เฉลย: ' + q.explain;
  }

  feedback.classList.remove('hidden');

  // enable next button
  const nextBtn = document.querySelector('.actions button');
  if (nextBtn) nextBtn.disabled = false;
}

function showResult() {
  quizArea.classList.add('hidden');
  resultArea.classList.remove('hidden');
  finalScoreEl.textContent = `คุณได้คะแนน ${score} / ${questions.length}`;
}

restartBtn.addEventListener('click', () => {
  index = 0;
  score = 0;
  quizArea.classList.remove('hidden');
  resultArea.classList.add('hidden');
  renderQuestion();
});

// initial render
renderQuestion();
