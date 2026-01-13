// // أذكار الصباح والمساء الكاملة من حصن المسلم
// Complete Morning and Evening Adhkar from Hisn Al-Muslim

export const morningAdhkar = [
  {
    text: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَـهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    count: 1,
    virtue: "رواه مسلم",
    category: "morning"
  },
  {
    text: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ",
    count: 1,
    virtue: "رواه الترمذي",
    category: "morning"
  },
  {
    text: "سُبْحَانَ اللهِ وَبِحَمْدِهِ",
    count: 100,
    virtue: "من قالها مائة مرة لم يأت أحد يوم القيامة بأفضل مما جاء به - رواه مسلم",
    category: "morning"
  }
];

export const eveningAdhkar = [
  {
    text: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ",
    count: 1,
    virtue: "رواه مسلم",
    category: "evening"
  },
  {
    text: "اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ",
    count: 1,
    virtue: "رواه الترمذي",
    category: "evening"
  }
];

export const completeAdhkar = [...morningAdhkar, ...eveningAdhkar];
