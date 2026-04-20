// 타로 덱 78장 — 메이저 아르카나 22 + 마이너 아르카나 56
// 이미지: Pamela Colman Smith (1909), 퍼블릭 도메인 / Wikimedia Commons
// 참고: tarothub.kr 가이드 (스프레드/메이저/역방향 프레임워크)

const SUIT_THEME = {
  wands:     { top: "#f8b96a", mid: "#c64a1a", bot: "#5a1a0a", accent: "#fff0c8" },
  cups:      { top: "#a9d4f0", mid: "#3a6a9a", bot: "#1a2a5a", accent: "#e8f4ff" },
  swords:    { top: "#c8d4dc", mid: "#5a6a7a", bot: "#1a2430", accent: "#f0f4f8" },
  pentacles: { top: "#b8d4a9", mid: "#4a7a3a", bot: "#1a3a1a", accent: "#f0e8c8" }
};

// 역방향 해석 5프레임워크
const REVERSED_FRAMES = {
  blocked:    { label: "차단 · 지연",   desc: "본래 에너지가 외부 장애물이나 내적 저항에 막혀 흐르지 못하는 상태",  color: "#d4a87a" },
  excessive:  { label: "과잉",         desc: "좋은 에너지가 지나치게 작용해 오히려 역효과를 내는 상태",              color: "#d47a7a" },
  internal:   { label: "내면화",       desc: "에너지가 외부로 드러나지 않고 내면에서 조용히 작용하는 상태",          color: "#7aa9d4" },
  shadow:     { label: "그림자",       desc: "인정하고 싶지 않거나 무의식에 숨겨둔 측면이 드러남 (융)",              color: "#8a7ad4" },
  unresolved: { label: "미해결 과거",  desc: "완결 짓지 못한 과거 에너지가 현재의 발목을 잡고 있음",                  color: "#a97a8a" }
};

// ========== 메이저 아르카나 (22장) ==========
const MAJOR_ARCANA = [
  { num: 0, roman: "0", name: "바보", nameEn: "The Fool", symbol: "🌅", image: "images/00-fool.jpg",
    theme: { top: "#a9d8f0", mid: "#f6e2a5", bot: "#d7b46a", accent: "#fff" }, yn: "yes", journey: 1,
    upright: { keywords: "새로운 시작 · 순수 · 모험", text: "두려움 없이 첫 발을 내딛을 시간입니다. 결과를 계산하지 말고 마음이 이끄는 방향으로 움직이세요. 무모해 보이는 선택이 가장 진실한 답일 수 있습니다." },
    reversed: { keywords: "무모함 · 망설임 · 준비 부족", text: "설렘에 휩쓸려 중요한 것을 놓치고 있지 않은지 돌아보세요. 한 걸음 물러서서 현실을 점검할 때입니다.", frame: "blocked" } },
  { num: 1, roman: "I", name: "마법사", nameEn: "The Magician", symbol: "🪄", image: "images/01-magician.jpg",
    theme: { top: "#f4d36a", mid: "#e85c5c", bot: "#7a1f1f", accent: "#fff4c2" }, yn: "yes", journey: 1,
    upright: { keywords: "의지 · 창조 · 실현", text: "당신에게는 원하는 것을 현실로 만들 모든 재료가 이미 있습니다. 집중과 의지를 한 방향으로 모으세요. 지금이 행동할 때입니다." },
    reversed: { keywords: "재능 낭비 · 속임수 · 자기 의심", text: "능력을 과시하거나 스스로를 과소평가하고 있을지 모릅니다. 진짜 목적이 무엇인지 다시 물어보세요.", frame: "shadow" } },
  { num: 2, roman: "II", name: "여사제", nameEn: "The High Priestess", symbol: "🌙", image: "images/02-high-priestess.jpg",
    theme: { top: "#2a3d7a", mid: "#4a5ea8", bot: "#1a1f4a", accent: "#e8e4ff" }, yn: "neutral", journey: 1,
    upright: { keywords: "직관 · 비밀 · 내면의 지혜", text: "말보다 침묵에 더 많은 답이 담겨 있습니다. 서두르지 말고 마음 깊은 곳의 목소리를 들어보세요. 답은 이미 당신 안에 있습니다." },
    reversed: { keywords: "혼란 · 직관 무시 · 숨겨진 감정", text: "외부의 소음이 당신의 진짜 마음을 가리고 있습니다. 조용히 혼자만의 시간을 가져보세요.", frame: "blocked" } },
  { num: 3, roman: "III", name: "여황제", nameEn: "The Empress", symbol: "🌸", image: "images/03-empress.jpg",
    theme: { top: "#f8b5d4", mid: "#d66a9e", bot: "#8a2e5c", accent: "#fff0d8" }, yn: "yes", journey: 1,
    upright: { keywords: "풍요 · 창조성 · 돌봄", text: "사랑과 창의성이 꽃피는 시기입니다. 관계, 일, 프로젝트 어떤 것이든 따뜻하게 자라고 있습니다. 스스로를 풍요롭게 가꾸세요." },
    reversed: { keywords: "의존 · 과잉보호 · 창조성 정체", text: "누군가에게 지나치게 의존하거나, 반대로 너무 많은 것을 떠안고 있을지 모릅니다. 균형이 필요합니다.", frame: "excessive" } },
  { num: 4, roman: "IV", name: "황제", nameEn: "The Emperor", symbol: "👑", image: "images/04-emperor.jpg",
    theme: { top: "#d45a3a", mid: "#9a2d1a", bot: "#4a1510", accent: "#f4d36a" }, yn: "yes", journey: 1,
    upright: { keywords: "권위 · 질서 · 안정", text: "구조를 세우고 주도권을 잡으세요. 원칙과 규율이 당신의 편이 됩니다. 흔들리지 않는 기반 위에서 결정을 내리세요." },
    reversed: { keywords: "독단 · 경직 · 통제 상실", text: "너무 엄격하거나, 반대로 중심을 잃고 흔들리고 있지 않나요? 권위와 유연함 사이의 균형을 찾으세요.", frame: "excessive" } },
  { num: 5, roman: "V", name: "교황", nameEn: "The Hierophant", symbol: "📜", image: "images/05-hierophant.jpg",
    theme: { top: "#d4b88a", mid: "#8a6a3a", bot: "#4a3a1a", accent: "#f4e2b5" }, yn: "yes", journey: 1,
    upright: { keywords: "전통 · 가르침 · 공동체", text: "검증된 길을 따르는 것이 지혜로운 때입니다. 멘토의 조언, 가족의 가치, 오래된 지혜가 당신에게 도움이 됩니다." },
    reversed: { keywords: "반항 · 관습 탈피 · 자기 길", text: "남들이 정해놓은 답이 당신에게 맞지 않습니다. 자신만의 방식을 찾아도 괜찮습니다.", frame: "internal" } },
  { num: 6, roman: "VI", name: "연인", nameEn: "The Lovers", symbol: "💞", image: "images/06-lovers.jpg",
    theme: { top: "#a9d8f0", mid: "#f4a8c0", bot: "#d45a6a", accent: "#fff4c2" }, yn: "yes", journey: 2,
    upright: { keywords: "사랑 · 선택 · 조화", text: "마음과 현실이 하나로 맞닿는 순간입니다. 중요한 선택 앞에서 진심을 따르세요. 조화로운 만남이 기다리고 있습니다." },
    reversed: { keywords: "갈등 · 잘못된 선택 · 불균형", text: "관계나 결정에서 작은 균열이 보입니다. 회피하지 말고 솔직한 대화를 시작하세요.", frame: "blocked" } },
  { num: 7, roman: "VII", name: "전차", nameEn: "The Chariot", symbol: "🏇", image: "images/07-chariot.jpg",
    theme: { top: "#5a7ad4", mid: "#2a3d7a", bot: "#1a1f4a", accent: "#f4d36a" }, yn: "yes", journey: 2,
    upright: { keywords: "의지 · 돌파 · 승리", text: "반대하는 힘이 있어도 당신은 목표를 향해 나아갈 수 있습니다. 감정과 이성을 같은 방향으로 모으면 승리합니다." },
    reversed: { keywords: "방향 상실 · 통제 부족 · 공격성", text: "속도를 내려놓고 방향을 먼저 점검하세요. 무작정 밀어붙이면 엉뚱한 곳에 도착합니다.", frame: "blocked" } },
  { num: 8, roman: "VIII", name: "힘", nameEn: "Strength", symbol: "🦁", image: "images/08-strength.jpg",
    theme: { top: "#f8d67a", mid: "#e89a3a", bot: "#8a4a1a", accent: "#fff4c2" }, yn: "yes", journey: 2,
    upright: { keywords: "용기 · 인내 · 부드러운 힘", text: "큰 소리로 이기려 하지 마세요. 부드러움이 가장 강한 무기입니다. 당신 안의 두려움을 따뜻하게 다스리세요." },
    reversed: { keywords: "자신감 부족 · 감정 폭발 · 소진", text: "스스로를 너무 몰아붙이고 있습니다. 쉬는 것도 용기입니다.", frame: "blocked" } },
  { num: 9, roman: "IX", name: "은둔자", nameEn: "The Hermit", symbol: "🕯️", image: "images/09-hermit.jpg",
    theme: { top: "#3a3a5a", mid: "#1a1a3a", bot: "#0a0a1a", accent: "#f4d36a" }, yn: "neutral", journey: 2,
    upright: { keywords: "성찰 · 고독 · 내면의 빛", text: "지금은 혼자 걷는 시간입니다. 외부에서 답을 찾기보다, 내면으로 깊이 들어가세요. 당신이 들고 있는 등불이 길을 비춥니다." },
    reversed: { keywords: "고립 · 외로움 · 회피", text: "혼자 있는 것이 도움이 아니라 도피가 되고 있지 않나요? 누군가에게 손을 내밀 때입니다.", frame: "shadow" } },
  { num: 10, roman: "X", name: "운명의 수레바퀴", nameEn: "Wheel of Fortune", symbol: "☸️", image: "images/10-wheel.jpg",
    theme: { top: "#4a7a5a", mid: "#1a4a3a", bot: "#0a2a1a", accent: "#f4d36a" }, yn: "neutral", journey: 2,
    upright: { keywords: "전환 · 운명 · 흐름", text: "상황이 바뀌고 있습니다. 통제하려 애쓰기보다 흐름을 읽으세요. 지금의 변화는 당신에게 유리한 방향입니다." },
    reversed: { keywords: "정체 · 불운 · 저항", text: "계속 같은 자리를 맴도는 느낌이라면, 놓아야 할 것이 무엇인지 돌아보세요.", frame: "blocked" } },
  { num: 11, roman: "XI", name: "정의", nameEn: "Justice", symbol: "⚖️", image: "images/11-justice.jpg",
    theme: { top: "#a93a3a", mid: "#6a1a1a", bot: "#3a0a0a", accent: "#f4d36a" }, yn: "neutral", journey: 3,
    upright: { keywords: "공정 · 진실 · 책임", text: "뿌린 대로 거두는 시기입니다. 진실을 마주하고 책임질 것은 책임지세요. 공정한 결과가 따라옵니다." },
    reversed: { keywords: "불공정 · 회피 · 편견", text: "누군가를 또는 스스로를 너무 엄격하게 판단하고 있을 수 있습니다. 한 번 더 사실을 확인하세요.", frame: "shadow" } },
  { num: 12, roman: "XII", name: "매달린 사람", nameEn: "The Hanged Man", symbol: "🙃", image: "images/12-hanged-man.jpg",
    theme: { top: "#4a6a3a", mid: "#2a4a1a", bot: "#1a2a0a", accent: "#f4d36a" }, yn: "neutral", journey: 3,
    upright: { keywords: "시선 전환 · 멈춤 · 내려놓음", text: "지금의 멈춤은 실패가 아니라 새로운 시각을 얻는 시간입니다. 반대 방향에서 문제를 바라보면 답이 보입니다." },
    reversed: { keywords: "정체 · 희생 · 저항", text: "필요 없는 희생을 붙잡고 있지 않은지 살펴보세요. 놓는 순간 움직일 수 있습니다.", frame: "blocked" } },
  { num: 13, roman: "XIII", name: "죽음", nameEn: "Death", symbol: "🦋", image: "images/13-death.jpg",
    theme: { top: "#2a2a3a", mid: "#0a0a1a", bot: "#000", accent: "#e8e8f4" }, yn: "no", journey: 3,
    upright: { keywords: "끝과 시작 · 변형 · 해방", text: "끝은 끝이 아니라 새로운 형태로의 변신입니다. 이미 지나간 것을 놓아주세요. 더 나은 당신이 나타날 준비가 됐습니다." },
    reversed: { keywords: "변화 거부 · 집착 · 정체", text: "끝났다는 것을 인정하기 싫은 마음이 당신을 붙잡고 있습니다. 애도하고 보내주세요.", frame: "unresolved" } },
  { num: 14, roman: "XIV", name: "절제", nameEn: "Temperance", symbol: "🕊️", image: "images/14-temperance.jpg",
    theme: { top: "#a9d8a9", mid: "#4a8a7a", bot: "#1a4a4a", accent: "#f4d36a" }, yn: "yes", journey: 3,
    upright: { keywords: "균형 · 조화 · 인내", text: "극단을 피하고 가운데 길을 걸으세요. 서로 다른 것을 섞는 당신의 지혜가 아름다운 결과를 만듭니다." },
    reversed: { keywords: "불균형 · 과잉 · 조급함", text: "한쪽으로 너무 치우쳐 있습니다. 잠시 속도를 늦추고 리듬을 되찾으세요.", frame: "excessive" } },
  { num: 15, roman: "XV", name: "악마", nameEn: "The Devil", symbol: "🖤", image: "images/15-devil.jpg",
    theme: { top: "#3a1a3a", mid: "#1a0a1a", bot: "#000", accent: "#d43a6a" }, yn: "no", journey: 3,
    upright: { keywords: "집착 · 유혹 · 속박", text: "당신을 묶고 있는 사슬이 사실은 스스로 채운 것임을 알아채세요. 진짜 자유는 인정에서 시작됩니다." },
    reversed: { keywords: "해방 · 각성 · 벗어남", text: "오래 붙잡고 있던 것에서 벗어날 힘이 당신에게 있습니다. 이제 스스로를 풀어주세요.", frame: "internal" } },
  { num: 16, roman: "XVI", name: "탑", nameEn: "The Tower", symbol: "⚡", image: "images/16-tower.jpg",
    theme: { top: "#1a1a2a", mid: "#3a1a1a", bot: "#0a0a0a", accent: "#f4d36a" }, yn: "no", journey: 3,
    upright: { keywords: "급변 · 충격 · 진실 드러남", text: "무너진다고 느껴져도 그것은 가짜 기반이었습니다. 충격 뒤에 진짜 토대를 세울 기회가 옵니다." },
    reversed: { keywords: "변화 지연 · 위기 회피 · 불안", text: "피할 수 없는 변화를 미루고 있습니다. 받아들이는 순간 고통이 줄어듭니다.", frame: "unresolved" } },
  { num: 17, roman: "XVII", name: "별", nameEn: "The Star", symbol: "⭐", image: "images/17-star.jpg",
    theme: { top: "#4a7aa9", mid: "#2a4a7a", bot: "#1a2a4a", accent: "#f4e8a9" }, yn: "yes", journey: 4,
    upright: { keywords: "희망 · 영감 · 치유", text: "어두운 밤을 지나왔다면, 이제 별이 뜹니다. 조용하지만 확실한 희망이 당신을 인도합니다. 꿈을 다시 꾸어도 괜찮습니다." },
    reversed: { keywords: "희망 상실 · 자기 불신 · 냉소", text: "스스로의 빛을 의심하지 마세요. 믿음을 회복하는 데 시간이 필요할 뿐입니다.", frame: "blocked" } },
  { num: 18, roman: "XVIII", name: "달", nameEn: "The Moon", symbol: "🌕", image: "images/18-moon.jpg",
    theme: { top: "#6a7ab8", mid: "#3a4a8a", bot: "#1a2a5a", accent: "#f4e2a9" }, yn: "neutral", journey: 4,
    upright: { keywords: "환상 · 무의식 · 직관", text: "보이는 것이 전부가 아닙니다. 불안과 직감이 섞여 있을 때입니다. 천천히, 감각을 열어두고 진실을 기다리세요." },
    reversed: { keywords: "환상 깨짐 · 진실 드러남 · 불안 해소", text: "안개가 걷히고 있습니다. 오해와 두려움이 풀리고 명확함이 돌아옵니다.", frame: "internal" } },
  { num: 19, roman: "XIX", name: "태양", nameEn: "The Sun", symbol: "☀️", image: "images/19-sun.jpg",
    theme: { top: "#f8d66a", mid: "#e89a3a", bot: "#a94a1a", accent: "#fff4c2" }, yn: "yes", journey: 4,
    upright: { keywords: "기쁨 · 성공 · 생명력", text: "빛나는 시기입니다. 숨기지 말고 드러내세요. 당신의 진심과 에너지가 주변을 환하게 만듭니다." },
    reversed: { keywords: "지연된 행복 · 자신감 저하 · 과잉 낙관", text: "기쁨이 있지만 온전히 누리지 못하고 있습니다. 자신에게 충분히 기뻐할 허락을 주세요.", frame: "blocked" } },
  { num: 20, roman: "XX", name: "심판", nameEn: "Judgement", symbol: "📯", image: "images/20-judgement.jpg",
    theme: { top: "#a9b8d4", mid: "#5a6aa9", bot: "#2a3a7a", accent: "#f4d36a" }, yn: "yes", journey: 4,
    upright: { keywords: "각성 · 결산 · 부름", text: "지나온 것들이 의미를 드러내는 순간입니다. 내면의 부름을 따라 다시 일어서세요. 용서와 재출발이 함께 옵니다." },
    reversed: { keywords: "자기 비판 · 부정 · 거부", text: "스스로를 용서하지 못하고 있습니다. 과거를 다시 쓰려 하지 말고, 그 자리에 두고 앞으로 나아가세요.", frame: "shadow" } },
  { num: 21, roman: "XXI", name: "세계", nameEn: "The World", symbol: "🌍", image: "images/21-world.jpg",
    theme: { top: "#4a8a6a", mid: "#2a5a4a", bot: "#1a3a2a", accent: "#f4d36a" }, yn: "yes", journey: 4,
    upright: { keywords: "완성 · 성취 · 통합", text: "한 장의 여정이 완결되는 순간입니다. 충분히 잘 해냈습니다. 이 완성을 축하하고, 다음 원을 그릴 준비를 하세요." },
    reversed: { keywords: "미완성 · 지연 · 마무리 부족", text: "거의 다 왔지만 마지막 한 걸음이 남았습니다. 서두르지 말고 끝을 단단히 맺으세요.", frame: "blocked" } }
];

// ========== 바보의 여정 서사 구조 ==========
const JOURNEY_STAGES = [
  { id: 1, title: "출발과 자아 형성", range: "0 – V", desc: "순수한 영혼이 세상에 발을 딛고, 의지·직관·풍요·질서·전통을 배우는 단계" },
  { id: 2, title: "선택과 시련",     range: "VI – X",  desc: "관계와 선택을 경험하고, 의지와 내면의 힘으로 시련을 극복하며, 삶의 순환을 깨닫는 단계" },
  { id: 3, title: "전환과 해체",     range: "XI – XVI", desc: "기존의 자아가 해체되고, 집착을 내려놓으며, 근본적인 변화를 겪는 심화 단계" },
  { id: 4, title: "깨달음과 통합",   range: "XVII – XXI", desc: "시련 후 희망을 되찾고, 무의식을 통합하며, 완전한 자기실현에 도달하는 단계" }
];

// ========== 숫자의 의미 (Numerology) ==========
const NUMEROLOGY = [
  { n: "에이스", meaning: "시작 · 잠재력 · 씨앗 · 순수한 에너지의 원천" },
  { n: "2",     meaning: "균형 · 이원성 · 선택 · 파트너십 · 대화" },
  { n: "3",     meaning: "창조 · 확장 · 표현 · 성장 · 협력의 결실" },
  { n: "4",     meaning: "안정 · 구조 · 기반 · 질서 · 때로 정체" },
  { n: "5",     meaning: "갈등 · 변화 · 불안정 · 도전 · 성장통" },
  { n: "6",     meaning: "조화 · 균형 회복 · 소통 · 치유 · 나눔" },
  { n: "7",     meaning: "성찰 · 내면 탐구 · 평가 · 전략 · 믿음" },
  { n: "8",     meaning: "움직임 · 힘 · 숙달 · 변환 · 재배열" },
  { n: "9",     meaning: "완성 직전 · 절정 · 지혜 · 고독 · 성취" },
  { n: "10",    meaning: "완성 · 순환의 끝 · 과잉 · 새로운 시작의 씨앗" },
  { n: "시종 (Page)",   meaning: "학습자 · 메신저 · 새로운 시작의 호기심" },
  { n: "기사 (Knight)", meaning: "행동가 · 추진력 · 극단적 에너지" },
  { n: "여왕 (Queen)",  meaning: "내면의 숙달 · 직관 · 수용적 힘" },
  { n: "왕 (King)",     meaning: "외적 숙달 · 권위 · 리더십" }
];

// ========== 4원소 / 수트 가이드 ==========
const SUIT_GUIDE = [
  { key: "wands",     name: "완드 (Wands)",      symbol: "🔥", element: "불",    season: "봄",   direction: "남쪽", astro: "양·사자·사수", theme: "열정 · 창조력 · 의지 · 행동 · 야망 · 영감" },
  { key: "cups",      name: "컵 (Cups)",          symbol: "💧", element: "물",    season: "여름", direction: "서쪽", astro: "게·전갈·물고기",  theme: "감정 · 사랑 · 관계 · 직관 · 무의식 · 영성" },
  { key: "swords",    name: "소드 (Swords)",     symbol: "🌬", element: "공기",  season: "가을", direction: "동쪽", astro: "쌍둥이·천칭·물병", theme: "지성 · 논리 · 소통 · 갈등 · 진실 · 결단" },
  { key: "pentacles", name: "펜타클 (Pentacles)", symbol: "🌱", element: "흙",    season: "겨울", direction: "북쪽", astro: "황소·처녀·염소",  theme: "물질 · 재정 · 건강 · 실용성 · 노동 · 안정" }
];

// ========== 마이너 아르카나 (56장) ==========
const RANK_INFO = [
  { i:  1, roman: "I",    name: "에이스", nameEn: "Ace" },
  { i:  2, roman: "II",   name: "2",     nameEn: "Two" },
  { i:  3, roman: "III",  name: "3",     nameEn: "Three" },
  { i:  4, roman: "IV",   name: "4",     nameEn: "Four" },
  { i:  5, roman: "V",    name: "5",     nameEn: "Five" },
  { i:  6, roman: "VI",   name: "6",     nameEn: "Six" },
  { i:  7, roman: "VII",  name: "7",     nameEn: "Seven" },
  { i:  8, roman: "VIII", name: "8",     nameEn: "Eight" },
  { i:  9, roman: "IX",   name: "9",     nameEn: "Nine" },
  { i: 10, roman: "X",    name: "10",    nameEn: "Ten" },
  { i: 11, roman: "XI",   name: "시종",   nameEn: "Page" },
  { i: 12, roman: "XII",  name: "기사",   nameEn: "Knight" },
  { i: 13, roman: "XIII", name: "여왕",   nameEn: "Queen" },
  { i: 14, roman: "XIV",  name: "왕",     nameEn: "King" }
];

const SUITS = [
  { key: "wands",     ko: "완드",   en: "Wands",     prefix: "wands",     symbol: "🔥" },
  { key: "cups",      ko: "컵",     en: "Cups",      prefix: "cups",      symbol: "💧" },
  { key: "swords",    ko: "소드",   en: "Swords",    prefix: "swords",    symbol: "🌬" },
  { key: "pentacles", ko: "펜타클", en: "Pentacles", prefix: "pentacles", symbol: "🌱" }
];

// 마이너 아르카나 해석 + yn + 역방향 프레임
// 구조: MINOR_MEANINGS[suit][rank] = { yn, frame, u:{k,t}, r:{k,t} }
const MINOR_MEANINGS = {
  wands: {
    1:  { yn: "yes",     frame: "blocked",    u: { k: "새 열정 · 영감 · 시작의 불씨", t: "가슴이 뜨거워지는 일이 시작됩니다. 이 에너지를 따라가면 새로운 길이 열립니다. 망설이지 말고 불을 피우세요." }, r: { k: "지연 · 동기 부족 · 막힘", t: "시작하고 싶은 마음은 있지만 발이 떨어지지 않습니다. 진짜 원하는지 먼저 묻고 움직이세요." } },
    2:  { yn: "neutral", frame: "blocked",    u: { k: "계획 · 선택 · 시야 넓히기", t: "두 개의 가능성 앞에 서 있습니다. 더 멀리 내다보고 결정하세요. 용기 있는 선택이 성장을 부릅니다." }, r: { k: "두려움 · 자기 제한 · 머뭇거림", t: "익숙한 자리를 벗어나기 두려워 기회를 놓치고 있습니다. 작게라도 첫 발을 내딛으세요." } },
    3:  { yn: "yes",     frame: "blocked",    u: { k: "확장 · 전진 · 협력", t: "준비한 것들이 세상으로 퍼져나갑니다. 멀리 보이는 배를 기다리세요. 협력의 손을 잡을 때입니다." }, r: { k: "지연 · 계획 차질 · 좌절", t: "기대한 만큼 돌아오지 않아도 실망하지 마세요. 시야를 조금 더 넓혀 방향을 재조정할 때입니다." } },
    4:  { yn: "yes",     frame: "blocked",    u: { k: "축하 · 안정 · 귀환", t: "노력이 결실을 맺어 기뻐할 시간입니다. 가까운 사람들과 축하를 나누세요. 잠시 쉬어도 괜찮습니다." }, r: { k: "불안정 · 축하 지연 · 공동체 갈등", t: "함께하고 싶지만 어딘가 어긋난 분위기가 있습니다. 관계를 다시 다듬을 시간입니다." } },
    5:  { yn: "no",      frame: "excessive",  u: { k: "경쟁 · 갈등 · 긴장", t: "작은 마찰과 경쟁이 있는 시기입니다. 맞부딪치는 것을 두려워하지 마세요. 건강한 긴장이 당신을 날카롭게 만듭니다." }, r: { k: "갈등 해소 · 타협 · 내부 갈등", t: "싸움을 내려놓고 협력으로 전환할 때입니다. 또는 속으로 참고 있는 분노를 꺼내 정리하세요." } },
    6:  { yn: "yes",     frame: "excessive",  u: { k: "승리 · 인정 · 자신감", t: "노력이 결실로 돌아와 박수를 받는 시기입니다. 자신감을 가져도 됩니다. 성취를 당당히 누리세요." }, r: { k: "지연된 성공 · 자만 · 평가 저하", t: "이긴 것 같지만 뒷맛이 개운하지 않을 수 있습니다. 겸손을 유지하고 다음을 준비하세요." } },
    7:  { yn: "neutral", frame: "excessive",  u: { k: "방어 · 소신 · 위치 지키기", t: "도전받는 상황에서도 당신의 입장을 지킬 수 있습니다. 높은 자리에서 아래를 내려다보며 침착하게 대응하세요." }, r: { k: "압도당함 · 방어 약화 · 포기 직전", t: "혼자 다 감당하려다 지쳤습니다. 도움을 요청하거나 싸움을 선택적으로 고르세요." } },
    8:  { yn: "yes",     frame: "blocked",    u: { k: "신속 · 진행 · 메시지", t: "일이 빠르게 움직입니다. 기다리던 소식이나 변화가 곧 도착합니다. 흐름에 올라타세요." }, r: { k: "지연 · 혼선 · 오해", t: "속도가 느려지거나 신호가 엇갈리고 있습니다. 성급함을 잠시 내려놓으세요." } },
    9:  { yn: "neutral", frame: "excessive",  u: { k: "경계 · 끈기 · 마지막 고비", t: "상처가 있어도 당신은 끝까지 서 있을 수 있습니다. 경계심을 놓치지 말되, 이번 한 번만 더 버티세요. 거의 다 왔습니다." }, r: { k: "소진 · 의심 · 방어 피로", t: "지나친 경계가 스스로를 가두고 있습니다. 안전 속에서도 마음을 조금 열어도 됩니다." } },
    10: { yn: "no",      frame: "internal",   u: { k: "과부하 · 책임 · 감당", t: "짐이 너무 많습니다. 목적지는 가깝지만 이대로 가면 쓰러집니다. 내려놓을 것을 구분하세요." }, r: { k: "해방 · 떠넘김 · 포기", t: "짐을 내려놓을 때가 왔습니다. 모든 것을 혼자 감당하려 하지 마세요." } },
    11: { yn: "yes",     frame: "shadow",     u: { k: "호기심 · 새 소식 · 가능성", t: "열정 넘치는 젊은 에너지가 소식을 전합니다. 작은 불씨에 호기심을 가져보세요." }, r: { k: "미성숙 · 변덕 · 헛된 기대", t: "가볍게 시작했다가 금방 식는 패턴이 보입니다. 꾸준함을 시험해 보세요." } },
    12: { yn: "yes",     frame: "excessive",  u: { k: "모험 · 돌진 · 카리스마", t: "빠르게 움직이고 과감하게 뛰어들 때입니다. 뜨거운 열정이 길을 만듭니다." }, r: { k: "충동 · 성급함 · 좌절", t: "너무 빠른 속도가 오히려 당신을 넘어뜨립니다. 잠시 속도를 늦추세요." } },
    13: { yn: "yes",     frame: "shadow",     u: { k: "자신감 · 리더십 · 온기", t: "따뜻하면서도 강한 리더십을 발휘할 때입니다. 스스로의 매력을 신뢰하세요." }, r: { k: "질투 · 과시 · 불안정", t: "인정받고 싶은 마음이 과해지면 역효과가 납니다. 안에서부터 자신을 채우세요." } },
    14: { yn: "yes",     frame: "excessive",  u: { k: "비전 · 용기 · 행동하는 권위", t: "명확한 비전과 실행력을 가진 리더의 자리입니다. 대담하게 사람들을 이끄세요." }, r: { k: "독재 · 조급함 · 독단적 결정", t: "자기 뜻대로 밀어붙이면 주변이 멀어집니다. 듣는 시간을 늘리세요." } }
  },
  cups: {
    1:  { yn: "yes",     frame: "blocked",    u: { k: "새로운 감정 · 사랑의 시작 · 영적 선물", t: "마음이 가득 차오르는 시간입니다. 사랑, 창조성, 영감이 샘솟습니다. 마음을 열어 받아들이세요." }, r: { k: "감정 억눌림 · 공허함 · 자기 사랑 부족", t: "가슴이 조금 닫혀 있습니다. 스스로에게 먼저 사랑을 건네세요." } },
    2:  { yn: "yes",     frame: "blocked",    u: { k: "파트너십 · 교감 · 상호 존중", t: "깊은 유대가 형성되는 시기입니다. 마음이 통하는 관계를 소중히 가꾸세요." }, r: { k: "불화 · 오해 · 균형 깨짐", t: "소통의 균형이 어긋나 있습니다. 솔직한 대화로 다시 맞추세요." } },
    3:  { yn: "yes",     frame: "shadow",     u: { k: "우정 · 축하 · 공동체", t: "친구들과의 기쁨이 있습니다. 함께하는 시간이 치유가 됩니다. 축하할 일을 찾으세요." }, r: { k: "가십 · 과소비 · 겉도는 관계", t: "겉은 즐거워 보이지만 속은 허전할 수 있습니다. 진짜 친밀한 관계를 점검하세요." } },
    4:  { yn: "no",      frame: "internal",   u: { k: "권태 · 숙고 · 재평가", t: "눈앞의 기회를 지나치고 있지는 않나요? 익숙함이 둔감함이 되어가고 있습니다." }, r: { k: "각성 · 새 관심 · 변화 수용", t: "정체되어 있던 마음이 움직이기 시작합니다. 새로 들어오는 기회에 눈을 뜨세요." } },
    5:  { yn: "no",      frame: "internal",   u: { k: "상실 · 후회 · 슬픔", t: "잃은 것에 마음이 묶여 있습니다. 그러나 아직 당신 옆에 두 잔이 서 있음을 잊지 마세요." }, r: { k: "회복 · 수용 · 앞으로 나아감", t: "애도의 시간을 충분히 가졌다면, 이제 뒤돌아 앞을 보세요. 남은 것에 감사할 수 있습니다." } },
    6:  { yn: "yes",     frame: "unresolved", u: { k: "추억 · 순수함 · 재회", t: "과거로부터 따뜻한 선물이 도착합니다. 어릴 적 순수함이 지금의 당신을 치유합니다." }, r: { k: "과거 집착 · 향수 · 성장 거부", t: "과거를 놓지 못해 현재가 흐려집니다. 좋은 기억은 품되 발은 오늘에 두세요." } },
    7:  { yn: "neutral", frame: "internal",   u: { k: "환상 · 선택의 혼란 · 꿈", t: "너무 많은 가능성이 동시에 어른거립니다. 무엇이 진짜이고 무엇이 환상인지 구분하세요." }, r: { k: "명확성 · 결단 · 현실 인식", t: "안개가 걷히고 우선순위가 보입니다. 이제 실행의 시간입니다." } },
    8:  { yn: "neutral", frame: "blocked",    u: { k: "떠남 · 더 깊은 의미 찾기 · 내려놓음", t: "채워져도 만족스럽지 않다면, 더 깊은 것을 찾아 떠날 때입니다. 그 길이 외로워도 옳은 방향입니다." }, r: { k: "떠나지 못함 · 집착 · 두려움", t: "익숙한 것을 놓기 두려워 고여 있습니다. 두려움의 반대편에 진짜 원하는 것이 있습니다." } },
    9:  { yn: "yes",     frame: "shadow",     u: { k: "만족 · 소원 성취 · 감사", t: "바라던 것이 충족되는 시기입니다. 축하하고 감사하세요. 당신은 이 기쁨을 누릴 자격이 있습니다." }, r: { k: "물질적 만족과 공허함 · 과욕", t: "가졌는데도 비어 있는 느낌이라면, 진짜 원했던 것이 무엇인지 다시 묻세요." } },
    10: { yn: "yes",     frame: "shadow",     u: { k: "가족 · 조화 · 정서적 완성", t: "사랑하는 이들과의 깊은 조화가 이루어집니다. 이 순간의 충만함을 마음에 새기세요." }, r: { k: "가족 갈등 · 겉만의 행복 · 단절", t: "보이는 것과 다른 감정이 안에 흐르고 있습니다. 진짜 마음을 꺼내 나누세요." } },
    11: { yn: "yes",     frame: "excessive",  u: { k: "감수성 · 영감 · 메시지", t: "감정의 새로운 물결이 당신에게 메시지를 전합니다. 직관을 신뢰하세요." }, r: { k: "감정 기복 · 과민함 · 환상", t: "감정이 너무 크게 출렁이고 있습니다. 땅에 발을 붙이세요." } },
    12: { yn: "yes",     frame: "shadow",     u: { k: "로맨스 · 제안 · 이상주의", t: "마음을 건네거나 받는 시간입니다. 낭만적 기회를 놓치지 마세요." }, r: { k: "질투 · 거짓 약속 · 도피", t: "환상과 실제를 구분할 때입니다. 달콤한 말 뒤의 진심을 보세요." } },
    13: { yn: "yes",     frame: "excessive",  u: { k: "공감 · 치유 · 직관적 돌봄", t: "사랑과 직관이 깊어지는 시기입니다. 스스로와 타인을 부드럽게 돌보세요." }, r: { k: "감정 과잉 · 의존 · 상처받기 쉬움", t: "감정에 휩쓸려 자신을 잃고 있지 않은지 보세요. 경계선을 되찾으세요." } },
    14: { yn: "yes",     frame: "shadow",     u: { k: "감정 성숙 · 외교 · 따뜻한 권위", t: "감정을 다스리는 성숙한 리더의 자리입니다. 깊이 듣고 침착하게 인도하세요." }, r: { k: "감정 억압 · 조작 · 변덕", t: "속과 겉이 다른 상태가 위험합니다. 진심을 솔직하게 드러내세요." } }
  },
  swords: {
    1:  { yn: "yes",     frame: "blocked",    u: { k: "명료함 · 진실 · 돌파", t: "안개가 걷히고 진실이 드러납니다. 새 아이디어의 칼날이 당신의 손에 쥐어졌습니다." }, r: { k: "혼란 · 잘못된 판단 · 오해", t: "결정이 흐려져 있습니다. 한 발 물러서 다시 사실을 확인하세요." } },
    2:  { yn: "neutral", frame: "internal",   u: { k: "교착 · 균형 · 결정 회피", t: "두 가지 사이에서 눈을 감고 있습니다. 진실을 마주할 용기가 필요합니다." }, r: { k: "결정의 순간 · 진실 직면", t: "더 이상 피할 수 없습니다. 눈을 뜨고 선택하세요." } },
    3:  { yn: "no",      frame: "internal",   u: { k: "상처 · 이별 · 배신의 고통", t: "마음이 찢기는 시간입니다. 피하지 말고 슬픔을 있는 그대로 받아들이세요. 이 고통은 치유의 시작입니다." }, r: { k: "회복 · 용서 · 상처 놓아주기", t: "긴 아픔의 끝이 보입니다. 용서의 대상은 결국 자신입니다." } },
    4:  { yn: "neutral", frame: "blocked",    u: { k: "휴식 · 회복 · 성찰", t: "지금은 물러서서 쉬는 시간입니다. 몸과 마음을 회복하지 않으면 다음 전투를 치를 수 없습니다." }, r: { k: "회복 지연 · 다시 움직일 때 · 소진", t: "쉬기를 거부하거나, 반대로 너무 오래 머물고 있습니다. 리듬을 다시 잡으세요." } },
    5:  { yn: "no",      frame: "unresolved", u: { k: "갈등 · 이기주의 · 상처뿐인 승리", t: "이겼지만 뒷맛이 씁쓸합니다. 싸움의 대가가 적절한지 돌아보세요." }, r: { k: "화해 · 후회 · 교훈", t: "지나간 갈등을 정리하고 화해할 기회가 있습니다. 자존심보다 관계를 선택하세요." } },
    6:  { yn: "yes",     frame: "blocked",    u: { k: "이동 · 전환 · 회복의 길", t: "힘든 지점을 떠나 더 고요한 물가로 건너가는 중입니다. 천천히, 그러나 확실히 나아지고 있습니다." }, r: { k: "떠나지 못함 · 과거 집착", t: "옮겨야 한다는 걸 알면서도 발이 떨어지지 않습니다. 무엇이 당신을 붙잡는지 보세요." } },
    7:  { yn: "neutral", frame: "internal",   u: { k: "전략 · 교활 · 피하기", t: "정면 승부를 피하고 머리를 쓰는 시기입니다. 다만 누군가를 속이는 쪽은 아닌지 조심하세요." }, r: { k: "진실 드러남 · 양심 · 자기 기만 중단", t: "숨겨온 것이 드러나거나, 자신에게 솔직해질 시간입니다." } },
    8:  { yn: "no",      frame: "internal",   u: { k: "속박 · 자기 제한 · 두려움", t: "당신을 묶고 있는 것은 사실 스스로의 생각입니다. 눈가리개를 풀면 길이 보입니다." }, r: { k: "해방 · 각성 · 자유", t: "스스로 만든 감옥에서 걸어나올 힘이 회복됩니다. 한 발만 움직여도 됩니다." } },
    9:  { yn: "no",      frame: "internal",   u: { k: "불안 · 악몽 · 과도한 걱정", t: "밤에 잠 못 이루게 하는 생각들이 있습니다. 그러나 대부분은 일어나지 않을 일입니다. 빛을 켜세요." }, r: { k: "걱정 해소 · 회복 시작 · 도움 받기", t: "긴 불안의 터널에서 빠져나오고 있습니다. 도움을 청해도 괜찮습니다." } },
    10: { yn: "no",      frame: "internal",   u: { k: "끝 · 바닥 · 새 새벽", t: "가장 어두운 순간을 통과하고 있습니다. 그러나 이것이 바닥이니, 이제는 위로 향할 일만 남았습니다." }, r: { k: "회복 · 재기 · 교훈", t: "끝났다고 여겼던 것의 끝. 서서히 일어설 수 있습니다." } },
    11: { yn: "neutral", frame: "shadow",     u: { k: "호기심 · 관찰 · 소식", t: "날카로운 눈으로 상황을 관찰할 때입니다. 새로운 아이디어를 시험해 보세요." }, r: { k: "뒷담화 · 가십 · 성급한 비판", t: "말이 칼이 되는 순간입니다. 입을 열기 전 한 번 더 생각하세요." } },
    12: { yn: "neutral", frame: "excessive",  u: { k: "돌진 · 대담함 · 진실 추구", t: "타협 없이 진실을 향해 달려가는 때입니다. 용기가 필요합니다." }, r: { k: "성급함 · 독단 · 충돌", t: "속도가 지나쳐 주변을 다치게 합니다. 한 호흡 쉬고 다시 달리세요." } },
    13: { yn: "neutral", frame: "excessive",  u: { k: "명료한 판단 · 독립 · 경계", t: "감정에 휘둘리지 않고 논리적으로 결정할 때입니다. 단호한 선을 그으세요." }, r: { k: "냉정함 · 고립 · 가혹함", t: "너무 차가운 판단이 관계를 멀어지게 합니다. 공감을 더하세요." } },
    14: { yn: "neutral", frame: "excessive",  u: { k: "지적 권위 · 공정 · 원칙", t: "원칙과 진실을 기반으로 판단할 때입니다. 감정과 논리의 균형을 잡으세요." }, r: { k: "독재 · 가혹한 비판 · 권력 남용", t: "칼을 지나치게 휘두르고 있습니다. 권위의 무게를 다시 점검하세요." } }
  },
  pentacles: {
    1:  { yn: "yes",     frame: "blocked",    u: { k: "새 기회 · 물질적 시작 · 번영의 씨앗", t: "현실적인 기회의 문이 열립니다. 돈, 일, 건강 중 하나에서 단단한 시작이 가능합니다." }, r: { k: "기회 놓침 · 지연 · 부실한 기반", t: "좋은 기회가 왔지만 준비가 부족합니다. 토대를 먼저 다지세요." } },
    2:  { yn: "neutral", frame: "excessive",  u: { k: "저글링 · 균형 · 적응력", t: "여러 일을 동시에 굴리고 있습니다. 유연하게 리듬을 유지하면 해낼 수 있습니다." }, r: { k: "과부하 · 균형 상실 · 우선순위 혼란", t: "너무 많은 것을 한꺼번에 잡으려 하고 있습니다. 하나씩 내려놓으세요." } },
    3:  { yn: "yes",     frame: "blocked",    u: { k: "협력 · 장인 정신 · 실력 인정", t: "함께 일하며 실력을 인정받는 시기입니다. 팀워크가 성과를 키웁니다." }, r: { k: "협력 부재 · 수준 미달 · 의사소통 문제", t: "팀 내 역할과 기대가 어긋나 있습니다. 솔직한 조정이 필요합니다." } },
    4:  { yn: "neutral", frame: "excessive",  u: { k: "소유 · 안정 · 보수적 태도", t: "쌓아온 것을 지키려는 시기입니다. 다만 너무 꽉 쥐면 흐름이 멈춥니다." }, r: { k: "집착 · 탐욕 · 놓아주기", t: "물질이나 관계를 지나치게 붙들고 있습니다. 손을 조금 펴보세요." } },
    5:  { yn: "no",      frame: "internal",   u: { k: "결핍 · 어려움 · 고립감", t: "추운 시기입니다. 하지만 따뜻한 창문은 바로 옆에 있습니다. 도움을 받는 것을 부끄러워하지 마세요." }, r: { k: "회복 · 재기 · 희망의 빛", t: "힘든 시기가 끝나갑니다. 물질적으로도, 마음으로도 다시 따뜻해집니다." } },
    6:  { yn: "yes",     frame: "shadow",     u: { k: "나눔 · 자선 · 흐름", t: "주고받음의 균형이 이루어지는 시기입니다. 베풀 수 있을 때 베풀고, 받을 수 있을 때 받으세요." }, r: { k: "불공정한 거래 · 의존 · 조건부 선의", t: "주고받음의 저울이 기울어져 있습니다. 관계의 공정함을 점검하세요." } },
    7:  { yn: "neutral", frame: "blocked",    u: { k: "인내 · 평가 · 결실을 기다림", t: "심어둔 것들의 성장이 보입니다. 아직은 수확할 때가 아니니 조급해하지 마세요." }, r: { k: "성과 부족 · 낭비 · 방향 전환 필요", t: "들인 노력에 비해 결과가 적다면 방법을 재고할 때입니다." } },
    8:  { yn: "yes",     frame: "blocked",    u: { k: "장인 · 몰입 · 숙련", t: "한 가지에 몰두하며 실력이 쌓입니다. 반복의 힘을 믿으세요." }, r: { k: "대충함 · 권태 · 질 저하", t: "열정이 식어 형식만 남았습니다. 본래의 의미를 다시 찾으세요." } },
    9:  { yn: "yes",     frame: "shadow",     u: { k: "독립 · 자급 · 세련된 풍요", t: "스스로의 힘으로 일구어낸 풍요를 누릴 때입니다. 고요한 자부심을 가지세요." }, r: { k: "외로움 · 과시 · 자립 위태", t: "풍요롭지만 마음이 허전할 수 있습니다. 연결을 회복하세요." } },
    10: { yn: "yes",     frame: "blocked",    u: { k: "유산 · 가문 · 장기적 안정", t: "오래 쌓아온 기반이 결실을 맺습니다. 세대에 이어지는 안정이 찾아옵니다." }, r: { k: "재정 불안 · 가족 갈등 · 기반 흔들림", t: "물질적 안정의 기반에 균열이 있습니다. 장기적 관점에서 점검하세요." } },
    11: { yn: "yes",     frame: "blocked",    u: { k: "배움 · 새 계획 · 착실함", t: "차분히 배우고 계획하는 시기입니다. 작게 시작해도 꾸준함이 쌓입니다." }, r: { k: "게으름 · 비현실적 목표 · 지연", t: "계획만 있고 실행이 없습니다. 한 걸음을 먼저 떼세요." } },
    12: { yn: "yes",     frame: "blocked",    u: { k: "신중 · 꾸준함 · 헌신", t: "화려하지 않지만 확실한 진전이 있습니다. 느려도 꾸준함이 가장 빠른 길입니다." }, r: { k: "정체 · 지루함 · 지나친 완고함", t: "너무 같은 방식만 반복하면 성장이 멈춥니다. 변화를 받아들이세요." } },
    13: { yn: "yes",     frame: "shadow",     u: { k: "풍요 · 돌봄 · 실용적 지혜", t: "삶의 풍요를 누리며 주변을 따뜻하게 돌보는 시기입니다. 자기 자신도 충분히 가꾸세요." }, r: { k: "물질 집착 · 자기 돌봄 부족 · 불균형", t: "겉은 풍요롭지만 안은 비어 있지 않은지 보세요." } },
    14: { yn: "yes",     frame: "blocked",    u: { k: "번영 · 안정된 권위 · 실행력", t: "현실적 성과와 안정을 이루는 자리입니다. 쌓아온 것에 걸맞은 책임을 지세요." }, r: { k: "보수성 · 탐욕 · 정체", t: "이룬 것에 안주해 새 시도를 두려워합니다. 움직임을 잃지 마세요." } }
  }
};

function buildMinorArcana() {
  const cards = [];
  SUITS.forEach((suit) => {
    RANK_INFO.forEach((rank) => {
      const m = MINOR_MEANINGS[suit.key][rank.i];
      cards.push({
        num: rank.i,
        roman: rank.roman,
        name: `${suit.ko} ${rank.name}`,
        nameEn: `${rank.nameEn} of ${suit.en}`,
        symbol: suit.symbol,
        image: `images/${suit.prefix}-${String(rank.i).padStart(2, "0")}.jpg`,
        theme: SUIT_THEME[suit.key],
        yn: m.yn,
        suitKey: suit.key,
        upright: { keywords: m.u.k, text: m.u.t },
        reversed: { keywords: m.r.k, text: m.r.t, frame: m.frame }
      });
    });
  });
  return cards;
}

const TAROT_DECK = [...MAJOR_ARCANA, ...buildMinorArcana()];

// ========== 스프레드 정의 ==========
// tarothub.kr 표준 반영: 켈틱 크로스 포지션 수정 + 쓰리카드 변형 추가
const SPREADS = [
  {
    id: "yesno",
    title: "✦ 예/아니오 ✦",
    subtitle: "빠른 답이 필요할 때",
    icon: "✓",
    count: 1,
    positions: ["답"],
    layout: "row",
    kind: "yesno",
    category: "빠른 답"
  },
  {
    id: "daily",
    title: "✦ 오늘의 한 장 ✦",
    subtitle: "지금 이 순간의 메시지",
    icon: "☀",
    count: 1,
    positions: ["오늘의 메시지"],
    layout: "row",
    kind: "standard",
    category: "빠른 답"
  },
  {
    id: "three-ppf",
    title: "✦ 쓰리카드 · 과거/현재/미래 ✦",
    subtitle: "시간의 흐름을 읽기",
    icon: "◆",
    count: 3,
    positions: ["과거", "현재", "미래"],
    layout: "row",
    kind: "standard",
    category: "쓰리카드"
  },
  {
    id: "three-mbs",
    title: "✦ 쓰리카드 · 마음/몸/영혼 ✦",
    subtitle: "지금의 나를 입체적으로",
    icon: "◆",
    count: 3,
    positions: ["마음", "몸", "영혼"],
    layout: "row",
    kind: "standard",
    category: "쓰리카드"
  },
  {
    id: "three-sca",
    title: "✦ 쓰리카드 · 상황/도전/조언 ✦",
    subtitle: "당면 과제에 대한 안내",
    icon: "◆",
    count: 3,
    positions: ["상황", "도전", "조언"],
    layout: "row",
    kind: "standard",
    category: "쓰리카드"
  },
  {
    id: "three-nor",
    title: "✦ 쓰리카드 · 나/상대/관계 ✦",
    subtitle: "관계의 삼각 구도",
    icon: "◆",
    count: 3,
    positions: ["나", "상대", "관계"],
    layout: "row",
    kind: "standard",
    category: "쓰리카드"
  },
  {
    id: "five",
    title: "✦ 파이브 카드 ✦",
    subtitle: "십자 모양 · 의식과 무의식",
    icon: "✦",
    count: 5,
    positions: ["과거", "현재", "미래", "의식적 인지", "무의식적 영향"],
    layout: "row",
    kind: "standard",
    category: "중급"
  },
  {
    id: "relationship",
    title: "✦ 관계 스프레드 ✦",
    subtitle: "두 사람 사이의 흐름",
    icon: "♥",
    count: 5,
    positions: ["나의 현재", "상대의 현재", "관계의 기반", "관계의 역학", "관계의 방향"],
    layout: "row",
    kind: "standard",
    category: "중급"
  },
  {
    id: "horseshoe",
    title: "✦ 말발굽 스프레드 ✦",
    subtitle: "상황을 7각도로 분석",
    icon: "∪",
    count: 7,
    positions: ["과거", "현재", "가까운 미래", "최선의 접근법", "주변 환경의 영향", "장애물", "최종 결과"],
    layout: "row",
    kind: "standard",
    category: "중급"
  },
  {
    id: "celtic",
    title: "✦ 켈틱 크로스 ✦",
    subtitle: "가장 종합적인 10장 리딩",
    icon: "✚",
    count: 10,
    positions: [
      "현재 상황의 핵심",   // 1
      "가로지르는 도전",    // 2
      "의식적 목표",        // 3
      "무의식적 기반",      // 4
      "가까운 과거",        // 5
      "가까운 미래",        // 6
      "자신의 태도",        // 7
      "주변 환경",          // 8
      "희망과 두려움",      // 9
      "최종 결과"           // 10
    ],
    layout: "celtic",
    kind: "standard",
    category: "고급"
  }
];

// 예/아니오 판정 로직
function resolveYesNo(card, isReversed) {
  if (card.yn === "neutral") return "maybe";
  if (card.yn === "yes")  return isReversed ? "maybe" : "yes";
  if (card.yn === "no")   return isReversed ? "maybe" : "no";
  return "maybe";
}

const YESNO_LABELS = {
  yes:   { big: "예",     sub: "카드가 긍정의 신호를 보냅니다.", tone: "positive" },
  no:    { big: "아니오", sub: "카드가 부정 또는 주의의 신호를 보냅니다.", tone: "negative" },
  maybe: { big: "보류",   sub: "지금은 답이 명확하지 않습니다. 한 번 더 들여다보세요.", tone: "neutral" }
};

// 질문 팁 (입력 안내)
const QUESTION_TIPS = [
  "'그 사람이 날 좋아해?'보다 '이 관계에서 내가 주목해야 할 것은?'이 더 깊은 답을 이끌어냅니다.",
  "'성공할까?'보다 '성공을 위해 지금 필요한 에너지는?'처럼 열린 질문이 좋습니다.",
  "단답형 질문보다 '무엇을', '어떻게', '왜'로 시작하는 질문이 더 풍부한 리딩을 만듭니다.",
  "같은 질문을 여러 번 반복하지 마세요. 첫 번째 답의 메시지가 흐려집니다.",
  "감정이 격앙된 상태에서는 잠시 호흡을 가다듬고 질문하세요."
];
