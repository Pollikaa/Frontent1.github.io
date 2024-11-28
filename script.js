$(document).ready(function () {
  const words = {
    beginner: [
      { english: "dog", translation: "собака", emoji: "🐕" },
      { english: "cat", translation: "кішка", emoji: "🐈" },
      { english: "monkey", translation: "мавпа", emoji: "🐒" },
      { english: "cow", translation: "корова", emoji: "🐄" },
      { english: "hedgehog", translation: "їжак", emoji: "🦔" },
      { english: "rabbit", translation: "кролик", emoji: "🐇" },
      { english: "sheep", translation: "вівця", emoji: "🐑" },
      { english: "koala", translation: "коала", emoji: "🐨" },
      { english: "tiger", translation: "тигр", emoji: "🐅" },
      { english: "horse", translation: "кінь", emoji: "🐎" },
    ],
    intermediate: [
      { english: "friendship", translation: "дружба", emoji: "🤝" },
      { english: "library", translation: "бібліотека", emoji: "📚" },
      { english: "freedom", translation: "свобода", emoji: "🕊️" },
      { english: "mountain", translation: "гора", emoji: "🏔️" },
      { english: "village", translation: "село", emoji: "🏡" },
      { english: "river", translation: "ріка", emoji: "🌊" },
      { english: "adventure", translation: "пригоди", emoji: "🗺️" },
      { english: "happiness", translation: "щастя", emoji: "😊" },
      { english: "nature", translation: "природа", emoji: "🌳" },
      { english: "family", translation: "сім'я", emoji: "👨‍👩‍👧‍👦" },
    ],
    advanced: [
      { english: "perseverance", translation: "наполегливість", emoji: "💪" },
      { english: "sustainability", translation: "стійкість", emoji: "🌱" },
      { english: "contribution", translation: "внесок", emoji: "🎁" },
      { english: "phenomenon", translation: "явище", emoji: "🌠" },
      { english: "revolution", translation: "революція", emoji: "⚙️" },
      { english: "innovation", translation: "інновація", emoji: "💡" },
      { english: "collaboration", translation: "співпраця", emoji: "🤝" },
      { english: "perspective", translation: "перспектива", emoji: "🔭" },
      { english: "transformation", translation: "трансформація", emoji: "🔄" },
      { english: "motivation", translation: "мотивація", emoji: "🏆" },
    ],
  };

  let currentWords = [];
  let currentIndex = 0;
  let correctCount = 0;
  let wrongCount = 0;
  let answered = false;

  const mainContent = $(".container");

  function shuffleWords(wordsArray) {
    for (let i = wordsArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [wordsArray[i], wordsArray[j]] = [wordsArray[j], wordsArray[i]];
    }
    return wordsArray;
  }

  function startGame() {
    const selectedLevel = $("input[name='difficulty']:checked").val();
    currentWords = shuffleWords([...words[selectedLevel]]);
    currentIndex = 0;
    correctCount = 0;
    wrongCount = 0;
    $("#correct-count").text(correctCount);
    $("#wrong-count").text(wrongCount);
    updateCard();
  }

  function updateCard() {
    const word = currentWords[currentIndex];
    $("#word").text(word.english);
    $("#emoji").text("");
    $("#correct-translation").text("");
    $("#step").text(`${currentIndex + 1}/${currentWords.length}`);
    $("#translation").val("");
    $(".card").removeClass("flipped");
    answered = false;
  }

  function showModal() {
    $("#modal").fadeIn();
    mainContent.attr("inert", "true");
  }

  function hideModal() {
    $("#modal").fadeOut();
    mainContent.removeAttr("inert");
  }

  $("#check").click(function () {
    if (answered) {
      alert("Ви вже відповіли на цю картку. Перейдіть до наступної.");
      return;
    }

    const userInput = $("#translation").val().trim().toLowerCase();
    const currentWord = currentWords[currentIndex];

    if (userInput === currentWord.translation.toLowerCase()) {
      correctCount++;
      $("#correct-count").text(correctCount);
      alert("Правильно!");
    } else {
      wrongCount++;
      $("#wrong-count").text(wrongCount);
      alert(`Неправильно! Правильна відповідь: ${currentWord.translation}`);
    }

    answered = true;
    $(".card").addClass("flipped");
    $("#emoji").text(currentWord.emoji);
    $("#correct-translation").text(currentWord.translation);
  });

  $("#next").click(function () {
    if (currentIndex < currentWords.length - 1) {
      currentIndex++;
      updateCard();
    } else {
      const total = currentWords.length;
      const score = (correctCount / total) * 100;
      $("#knowledge-level").text(`Ваш рівень: ${score.toFixed(2)}%`);
      showModal();
    }
  });

  $("#close-modal, #restart-game").click(function () {
    hideModal();
    const total = currentWords.length;
    const score = (correctCount / total) * 100;
    alert(`Ваш рівень: ${score.toFixed(2)}%`); // Додати alert для показу рівня
    startGame();
  });

  $("input[name='difficulty']").change(startGame);

  startGame();
});



