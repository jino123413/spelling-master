// =============================================================================
// Quiz Data Module for 맞춤법 달인 (Korean Spelling Quiz)
// =============================================================================

// --- Types ---

export type LevelId = 'beginner' | 'intermediate' | 'advanced' | 'expert' | 'master';
export type Category = 'spelling' | 'spacing' | 'grammar';
export type Grade = 'S' | 'A' | 'B' | 'C' | 'D';

export interface Question {
  id: string;
  type: string;
  category: Category;
  question: string;
  context: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Level {
  id: LevelId;
  label: string;
  icon: string;
  description: string;
  color: string;
  questions: Question[];
}

export interface GradeInfo {
  label: string;
  title: string;
  minPercent: number;
  description: string;
  color: string;
}

// --- Grade Data ---

export const GRADES: Record<Grade, GradeInfo> = {
  S: {
    label: 'S등급',
    title: '맞춤법 달인',
    minPercent: 90,
    description: '당신은 진정한 맞춤법 달인입니다!',
    color: '#8B5CF6',
  },
  A: {
    label: 'A등급',
    title: '맞춤법 고수',
    minPercent: 80,
    description: '거의 완벽해요! 조금만 더 연습하면 달인!',
    color: '#3B82F6',
  },
  B: {
    label: 'B등급',
    title: '맞춤법 중수',
    minPercent: 70,
    description: '꽤 잘하고 있어요. 헷갈리는 부분만 정리하면 됩니다.',
    color: '#10B981',
  },
  C: {
    label: 'C등급',
    title: '맞춤법 초보',
    minPercent: 60,
    description: '기본은 알고 있지만, 더 공부가 필요해요.',
    color: '#F59E0B',
  },
  D: {
    label: 'D등급',
    title: '맞춤법 입문자',
    minPercent: 0,
    description: '맞춤법 공부를 시작해 볼까요? 꾸준히 하면 늘어요!',
    color: '#EF4444',
  },
};

// --- Level Data ---

export const LEVELS: Level[] = [
  {
    id: 'beginner',
    label: '초급',
    icon: 'ri-seedling-line',
    description: '한국인이 가장 많이 틀리는 기본 맞춤법',
    color: '#84CC16',
    questions: [
      { id: 'b01', type: '맞는 표현 고르기', category: 'spelling', question: '다음 중 맞는 표현은?', context: '"나는 집에 가도 ___?"', options: ['되', '돼'], correctIndex: 1, explanation: "'돼'는 '되어'의 준말입니다. '되어'로 바꿔서 자연스러우면 '돼'가 맞습니다. '나는 집에 가도 되어?' \u2192 자연스러우므로 '돼'가 정답입니다. 반면 '이렇게 하면 될까?'처럼 뒤에 다른 글자가 붙으면 '되'를 씁니다." },
      { id: 'b02', type: '맞는 표현 고르기', category: 'spelling', question: '다음 중 맞는 표현은?', context: '"그건 그렇게 하면 ___ 돼."', options: ['안', '않'], correctIndex: 0, explanation: "'안'은 부사로 용언 앞에 놓여 부정의 뜻을 나타냅니다. '않'은 '아니하다'의 준말로 '-지 않다' 형태로만 쓰입니다. '안 돼' = '아니 돼'이므로 '안'이 맞습니다." },
      { id: 'b03', type: '맞는 표현 고르기', category: 'spelling', question: '다음 중 맞는 표현은?', context: '"학생으로___ 할 도리를 다해야 한다."', options: ['로써', '로서'], correctIndex: 1, explanation: "'로서'는 자격이나 신분을 나타내고, '로써'는 수단이나 도구를 나타냅니다. 학생이라는 '자격'을 말하고 있으므로 '로서'가 맞습니다." },
      { id: 'b04', type: '맞는 표현 고르기', category: 'spelling', question: '다음 중 맞는 표현은?', context: '"이 문제를 대화로___ 해결했다."', options: ['로서', '로써'], correctIndex: 1, explanation: "'로써'는 수단이나 도구를 나타냅니다. 대화라는 '수단'을 사용했으므로 '로써'가 맞습니다. 자격/신분이면 '로서', 수단/도구이면 '로써'입니다." },
      { id: 'b05', type: '맞는 표현 고르기', category: 'spelling', question: '다음 빈칸에 알맞은 것은?', context: '"이 음식 정말 맛있___"', options: ['데요', '대요'], correctIndex: 0, explanation: "'데요'는 자신의 경험이나 느낌을 전달할 때 씁니다 (-ㄴ데요/-는데요). '대요'는 남의 말을 전할 때 씁니다 (-다고 해요의 준말). 직접 맛본 경험을 말하고 있으므로 '데요'가 맞습니다." },
      { id: 'b06', type: '맞는 표현 고르기', category: 'spelling', question: '다음 중 맞는 표현은?', context: '"선생님이 내일 시험이___"', options: ['래요', '레요'], correctIndex: 0, explanation: "'래요'는 '-라고 해요'의 준말로, 남의 말을 전할 때 씁니다. '레요'라는 어미는 표준어에 존재하지 않습니다. '래요'가 맞습니다." },
      { id: 'b07', type: '맞는 표현 고르기', category: 'spelling', question: '다음 중 맞는 표현은?', context: '"밥을 빨리 ___"', options: ['먹으러 가자', '먹을러 가자'], correctIndex: 0, explanation: "목적을 나타내는 연결어미는 '-으러'입니다. '-을러'는 잘못된 표현입니다. '먹으러 가자'가 올바릅니다." },
      { id: 'b08', type: '맞춤법 찾기', category: 'grammar', question: '다음 문장에서 맞춤법이 틀린 부분은?', context: '"어제 본 영화가 정말 재밌었데."', options: ['어제', '재밌었데', '영화가', '틀린 곳 없음'], correctIndex: 1, explanation: "자신의 경험을 감탄하여 말할 때는 '-더라, -던데'를 씁니다. '재밌었데'는 잘못된 표현입니다. '재밌었어' 또는 '재밌더라'가 맞습니다. '-대'는 남의 말을 전달할 때만 씁니다 (재밌었대 = 재밌었다고 해)." },
      { id: 'b09', type: '띄어쓰기', category: 'spacing', question: '다음 중 띄어쓰기가 올바른 것은?', context: '', options: ['그 동안 감사했습니다', '그동안 감사했습니다'], correctIndex: 1, explanation: "'그동안'은 하나의 명사이므로 붙여 씁니다. '그 동안'으로 띄어 쓰지 않습니다." },
      { id: 'b10', type: '띄어쓰기', category: 'spacing', question: '다음 중 띄어쓰기가 올바른 것은?', context: '', options: ['할 수 있다', '할수있다', '할 수있다'], correctIndex: 0, explanation: "'수'는 의존명사이므로 앞말과 띄어 써야 합니다. 의존명사는 반드시 앞뒤 단어와 띄어 씁니다. '할 수 있다'가 맞습니다." },
      { id: 'b11', type: '맞는 표현 고르기', category: 'spelling', question: '다음 중 맞는 표현은?', context: '"아직 도착을 ___"', options: ['못 했어요', '못했어요', '둘 다 가능'], correctIndex: 2, explanation: "'못하다'가 하나의 동사로 쓰일 때('실력이 못하다')는 붙여 쓰고, 부사 '못' + 동사 구성일 때('못 먹다')는 띄어 씁니다. '도착을 못 했어요'와 '도착을 못했어요' 모두 허용됩니다." },
    ],
  },
  {
    id: 'intermediate',
    label: '중급',
    icon: 'ri-leaf-line',
    description: '자주 헷갈리는 중급 맞춤법',
    color: '#22C55E',
    questions: [
      { id: 'm01', type: '맞는 표현 고르기', category: 'spelling', question: '다음 중 맞는 표현은?', context: '"___ 일이야?"', options: ['웬', '왠'], correctIndex: 0, explanation: "'웬'은 '어찌 된, 어떠한'의 뜻을 가진 관형사입니다. '왠'은 오직 '왠지(왜인지의 준말)' 형태로만 쓰입니다. '어찌 된 일이야?'라는 뜻이므로 '웬'이 맞습니다." },
      { id: 'm02', type: '맞는 표현 고르기', category: 'spelling', question: '다음 중 맞는 표현은?', context: '"___ 모르게 눈물이 났다."', options: ['웬지', '왠지'], correctIndex: 1, explanation: "'왠지'는 '왜인지'의 준말입니다. '웬지'라는 단어는 존재하지 않습니다. 기억법: '왠' = 오직 '왠지'에서만, 나머지는 모두 '웬'입니다." },
      { id: 'm03', type: '맞는 표현 고르기', category: 'spelling', question: '다음 중 맞는 표현은?', context: '"시험 잘 보기를 ___"', options: ['바래', '바라'], correctIndex: 1, explanation: "희망을 뜻할 때는 '바라다'가 맞습니다 (바라, 바랍니다). '바래다'는 '색이 바래다(탈색)' 또는 '배웅하다'의 뜻입니다. '바라다'의 활용: 바라 / 바랍니다 / 바라요." },
      { id: 'm04', type: '맞는 표현 고르기', category: 'spelling', question: '다음 중 맞는 표현은?', context: '"퀴즈의 정답을 ___"', options: ['맞추다', '맞히다'], correctIndex: 1, explanation: "'맞히다'는 '정답을 알아내다, 적중시키다'입니다. '맞추다'는 '비교하다, 조립하다, 주문하다'입니다. 정답을 알아내는 것이므로 '맞히다'가 맞습니다. 기억법: 시험 문제를 '맞히다', 퍼즐 조각을 '맞추다'." },
      { id: 'm05', type: '맞는 표현 고르기', category: 'spelling', question: '다음 중 맞는 표현은?', context: '"내가 내일 ___"', options: ['할게', '할께'], correctIndex: 0, explanation: "'-ㄹ게'가 올바른 표기입니다. 된소리로 발음되더라도 어미는 예사소리로 적습니다 (한글 맞춤법 제53항). '-ㄹ께'는 존재하지 않는 어미입니다." },
      { id: 'm06', type: '맞는 표현 고르기', category: 'spelling', question: '다음 중 맞는 표현은?', context: '"___에 다시 만나자."', options: ['이따', '있다'], correctIndex: 0, explanation: "'이따'는 '조금 뒤에'라는 뜻의 부사입니다 (이따가). '있다'는 '존재하다'의 동사입니다. 시간적으로 '나중에'를 의미하므로 '이따'가 맞습니다." },
      { id: 'm07', type: '맞는 표현 고르기', category: 'spelling', question: '다음 중 맞는 표현은?', context: '"너의 생각이 틀린 게 아니라 나와 ___"', options: ['다른 거야', '틀린 거야'], correctIndex: 0, explanation: "'다르다'는 '같지 않다, 차이가 있다'입니다. '틀리다'는 '맞지 않다, 오류가 있다'입니다. 의견이 서로 같지 않을 뿐 오류는 아니므로 '다른'이 맞습니다." },
      { id: 'm08', type: '띄어쓰기', category: 'spacing', question: '다음 중 띄어쓰기가 올바른 것은?', context: '"___ 더 해보자" (횟수의 의미)', options: ['한 번만', '한번만'], correctIndex: 0, explanation: "횟수를 나타낼 때 '한 번'은 띄어 씁니다 (수관형사 + 의존명사). '한번'(붙여 쓰기)은 '시험 삼아, 어떤 기회에'라는 뜻의 부사일 때 씁니다. 횟수이므로 '한 번만'이 맞습니다." },
      { id: 'm09', type: '띄어쓰기', category: 'spacing', question: '다음 중 띄어쓰기가 올바른 것은?', context: '', options: ['노력한만큼 결과가 나온다', '노력한 만큼 결과가 나온다'], correctIndex: 1, explanation: "'만큼'이 의존명사로 쓰일 때(관형어 뒤)는 띄어 씁니다: '노력한 만큼'. '만큼'이 조사로 쓰일 때(체언 뒤)는 붙여 씁니다: '너만큼'." },
      { id: 'm10', type: '맞춤법 찾기', category: 'grammar', question: '다음 문장에서 맞춤법이 틀린 부분은?', context: '"그는 일부러 모르는 척 했다."', options: ['일부러', '모르는 척', '척 했다', '틀린 곳 없음'], correctIndex: 2, explanation: "'척하다'는 보조용언이므로 '척'과 '하다'를 붙여 써야 합니다. '모르는 척했다'가 올바른 표현입니다. '-ㄴ 척하다, -는 척하다'에서 '척하다'는 한 단어입니다." },
      { id: 'm11', type: '맞는 표현 고르기', category: 'grammar', question: '다음 중 맞는 표현은?', context: '"이 일은 제가 ___"', options: ['하겠슴니다', '하겠습니다'], correctIndex: 1, explanation: "'-습니다'가 올바른 종결어미입니다. '-슴니다'는 잘못된 표기입니다. 'ㅂ'을 사용하여 '-습니다, -ㅂ니다'로 적어야 합니다." },
    ],
  },
  {
    id: 'advanced',
    label: '고급',
    icon: 'ri-tree-line',
    description: '은근히 어려운 고급 맞춤법과 띄어쓰기',
    color: '#0EA5E9',
    questions: [
      { id: 'a01', type: '맞는 표현 고르기', category: 'spelling', question: '다음 중 맞는 표현은?', context: '"설날이 ___이야?"', options: ['몇일', '며칠'], correctIndex: 1, explanation: "'며칠'이 올바른 표현입니다. '몇일'은 잘못된 표기입니다. '며칠'은 '몇+일'의 합성이 아니라 독립된 단어입니다. 발음도 [며칠]이지 [몃일]이 아닙니다." },
      { id: 'a02', type: '맞는 표현 고르기', category: 'spelling', question: '다음 중 맞는 표현은?', context: '"선생님이 학생들을 ___"', options: ['가르치다', '가리키다'], correctIndex: 0, explanation: "'가르치다'는 '교육하다, 알려주다'입니다. '가리키다'는 '손가락 등으로 방향이나 대상을 지시하다'입니다. 학생을 교육하는 것이므로 '가르치다'가 맞습니다." },
      { id: 'a03', type: '맞는 표현 고르기', category: 'spelling', question: '다음 중 맞는 표현은?', context: '"두 차가 서로 ___"', options: ['부딪치다', '부딪히다'], correctIndex: 0, explanation: "'부딪치다'는 서로 맞부딪치는 것(능동/강세)이고, '부딪히다'는 부딪음을 당하는 것(피동)입니다. 두 차가 '서로' 충돌했으므로 능동/강세의 '부딪치다'가 맞습니다." },
      { id: 'a04', type: '맞는 표현 고르기', category: 'spelling', question: '다음 중 맞는 표현은?', context: '"지금 ___ 이 상황을 해결하지?"', options: ['어떻게', '어떡해'], correctIndex: 0, explanation: "'어떻게'는 '어떠하게'의 준말로 방법/수단을 묻는 부사입니다. '어떡해'는 '어떻게 해'의 준말로 단독 감탄에 씁니다. 뒤에 동사 '해결하다'가 이어지므로 부사 '어떻게'가 맞습니다." },
      { id: 'a05', type: '맞는 표현 고르기', category: 'spelling', question: '다음 중 맞는 표현은?', context: '"큰일 났어, ___!"', options: ['어떻게', '어떡해'], correctIndex: 1, explanation: "'어떡해'는 '어떻게 해'의 준말로, 난감한 상황에서 단독으로 감탄처럼 쓰입니다. 뒤에 다른 동사가 이어지지 않고 그 자체로 종결되므로 '어떡해'가 맞습니다." },
      { id: 'a06', type: '띄어쓰기', category: 'spacing', question: '다음 중 띄어쓰기가 올바른 것은?', context: '', options: ['그 만큼 열심히 했다', '그만큼 열심히 했다'], correctIndex: 1, explanation: "'그만큼'은 '그 정도로'라는 뜻의 부사 한 단어이므로 붙여 씁니다. '이만큼', '그만큼', '저만큼'은 각각 한 단어입니다." },
      { id: 'a07', type: '띄어쓰기', category: 'spacing', question: '다음 중 띄어쓰기가 올바른 것은?', context: '', options: ['네가 하고 싶은대로 해라', '네가 하고 싶은 대로 해라'], correctIndex: 1, explanation: "'대로'가 의존명사일 때(관형어 뒤: ~ㄴ 대로, ~는 대로)는 띄어 씁니다. 조사일 때(체언 뒤: 법대로, 마음대로)는 붙여 씁니다. '싶은'이 관형어이므로 '싶은 대로'로 띄어 씁니다." },
      { id: 'a08', type: '맞춤법 찾기', category: 'grammar', question: '다음 문장에서 맞춤법이 틀린 곳을 찾으세요.', context: '"금새 시간이 흘러 벌써 저녁이 됬다."', options: ['금새', '됬다', '금새와 됬다 모두', '틀린 곳 없음'], correctIndex: 2, explanation: "두 곳 모두 틀렸습니다. (1) '금새'는 '물건의 값'이라는 뜻이고, '시간이 빨리'를 뜻하는 올바른 표현은 '금세'(금시에의 준말)입니다. (2) '됬다'는 잘못된 표기이고 '되었다'의 준말인 '됐다'가 맞습니다." },
      { id: 'a09', type: '맞는 표현 고르기', category: 'spelling', question: '다음 중 맞는 표현은?', context: '"개인 정보는 ___ 공개하지 않습니다."', options: ['일체', '일절'], correctIndex: 1, explanation: "'일절(一切)'은 '아주, 절대로'라는 뜻의 부사로 부정문에 씁니다. '일체(一切)'는 '모든 것, 전부'라는 뜻의 명사입니다. '공개하지 않습니다'라는 부정문이므로 부사 '일절'이 맞습니다." },
      { id: 'a10', type: '맞춤법 찾기', category: 'grammar', question: '다음 문장에서 맞춤법이 틀린 곳을 찾으세요.', context: '"그 소식을 들으니 소름이 돋았다."', options: ['들으니', '소름이', '돋았다', '틀린 곳 없음'], correctIndex: 3, explanation: "이 문장은 모두 맞습니다. '소름이 돋다'가 올바른 표현입니다. 흔히 잘못 쓰는 '소름이 끼치다'와 구별해야 합니다. '끼치다'는 '영향을 끼치다' 등에 쓰이고, 소름과는 함께 쓰지 않습니다." },
      { id: 'a11', type: '맞는 표현 고르기', category: 'spelling', question: '다음 중 맞는 표현은?', context: '"함부로 남을 ___면 안 돼."', options: ['깔보', '깔봐'], correctIndex: 0, explanation: "'깔보다'의 어간은 '깔보-'입니다. '-면' 앞에서는 어간 그대로 '깔보면'이 맞습니다. '깔봐'는 '-아/어' 활용형(깔보+아=깔봐)으로, '-면' 앞에서는 쓸 수 없습니다." },
    ],
  },
  {
    id: 'expert',
    label: '전문가',
    icon: 'ri-fire-line',
    description: '전문가도 헷갈리는 까다로운 맞춤법',
    color: '#F59E0B',
    questions: [
      { id: 'e01', type: '맞는 표현 고르기', category: 'spelling', question: '다음 중 맞는 표현은?', context: '"방을 ___ 청소했다."', options: ['깨끗히', '깨끗이'], correctIndex: 1, explanation: "'-이/-히' 구별법: 'ㅅ' 받침 뒤에는 '-이'를 씁니다. '깨끗+이 = 깨끗이'. 참고: '조용히(ㅎ 받침)', '깨끗이(ㅅ 받침)', '가만히(ㄴ 받침)', '정확히(ㄱ 받침)'." },
      { id: 'e02', type: '맞는 표현 고르기', category: 'spelling', question: '다음 중 맞는 표현은?', context: '"시험을 ___ 봤다."', options: ['간간히', '간간이'], correctIndex: 1, explanation: "'간간이'가 맞습니다. 'ㄴ' 받침 뒤에서 '-이'를 쓸지 '-히'를 쓸지는 단어마다 다르지만, '간간이'는 부사 '간간'에 '-이'가 붙은 형태로, '이따금'이라는 뜻입니다." },
      { id: 'e03', type: '맞는 표현 고르기', category: 'spelling', question: '다음 중 맞는 표현은?', context: '"모든 것을 ___ 넘기다."', options: ['도매금으로', '도매값으로'], correctIndex: 0, explanation: "'도매금으로 넘기다'는 '여러 가지를 뭉뚱그려 한꺼번에 같은 것으로 취급하다'는 관용 표현입니다. '도매값'이 아닌 '도매금'이 올바른 형태입니다." },
      { id: 'e04', type: '맞는 표현 고르기', category: 'spelling', question: '다음 중 맞는 표현은?', context: '"사람이 많이 모이면 ___ 시끄럽다."', options: ['으레', '으례'], correctIndex: 0, explanation: "'으레'는 '당연히, 늘'이라는 뜻의 부사입니다. '으례'는 잘못된 표기입니다. '의례(儀禮)'는 '예식'이라는 뜻의 별개 명사이므로 혼동하지 말아야 합니다." },
      { id: 'e05', type: '맞는 표현 고르기', category: 'spelling', question: '다음 중 맞는 표현은?', context: '"서류를 하나도 ___ 제출해 주세요."', options: ['빠뜨리지 말고', '빠트리지 말고', '둘 다 맞음'], correctIndex: 2, explanation: "'빠뜨리다'와 '빠트리다' 모두 표준어입니다. 2011년 추가 표준어 규정에 따라 복수 표준어로 인정됩니다. 마찬가지로 '떨어뜨리다/떨어트리다', '늘어뜨리다/늘어트리다'도 복수 표준어입니다." },
      { id: 'e06', type: '띄어쓰기', category: 'spacing', question: '다음 중 띄어쓰기가 올바른 것은?', context: '', options: ['그를 만난지 오래됐다', '그를 만난 지 오래됐다'], correctIndex: 1, explanation: "시간의 경과를 나타내는 '지'는 의존명사이므로 앞말과 띄어 써야 합니다. '만난 지 오래됐다'가 맞습니다. 주의: '-는지'(어미)는 붙여 씁니다: '갈는지 모르겠다'." },
      { id: 'e07', type: '띄어쓰기', category: 'spacing', question: '다음 중 띄어쓰기가 올바른 것은?', context: '', options: ['나 밖에 없다', '나밖에 없다'], correctIndex: 1, explanation: "'밖에'가 조사('~밖에 없다', 제한의 뜻)일 때는 앞말에 붙여 씁니다. '밖에'가 명사+조사('집 밖에 나가다', 장소의 바깥)일 때는 띄어 씁니다." },
      { id: 'e08', type: '맞춤법 찾기', category: 'grammar', question: '다음 문장에서 맞춤법이 틀린 곳을 찾으세요.', context: '"새 학기에 대한 설레임으로 가득 차 있었다."', options: ['설레임', '가득 차', '있었다', '틀린 곳 없음'], correctIndex: 0, explanation: "'설레임'은 잘못된 표현입니다. '설레다'의 명사형은 '설렘'입니다. '설레이다'라는 동사가 존재하지 않으므로 '설레임'도 성립하지 않습니다. '설레다 \u2192 설렘'이 올바른 파생입니다." },
      { id: 'e09', type: '맞춤법 찾기', category: 'grammar', question: '다음 문장에서 맞춤법이 틀린 곳을 찾으세요.', context: '"역활 분담을 확실히 해야 한다."', options: ['역활', '확실히', '분담', '틀린 곳 없음'], correctIndex: 0, explanation: "'역활'은 잘못된 표기입니다. '역할(役割)'이 맞습니다. 한자 '割'의 음이 '할'이므로 '역할'로 적습니다. 마찬가지로 '비율(比率)'을 '비률'로 쓰지 않는 것과 같은 원리입니다." },
      { id: 'e10', type: '맞는 표현 고르기', category: 'spelling', question: '다음 중 맞는 표현은?', context: '"어려운 상황에서도 ___ 견뎌냈다."', options: ['꿋꿋이', '꿋꿋히', '꿋꿋하게'], correctIndex: 0, explanation: "'꿋꿋이'가 맞습니다. 'ㅅ' 받침 뒤에는 '-이'를 씁니다. '꿋꿋+이 = 꿋꿋이'. 이는 '깨끗이', '반듯이'와 같은 규칙입니다. '꿋꿋하게'도 문법적으로 가능하지만 별개의 표현입니다." },
      { id: 'e11', type: '맞는 표현 고르기', category: 'spelling', question: '다음 중 맞는 표현은?', context: '"이번 프로젝트의 ___을 맡겠습니다."', options: ['총괄', '총활'], correctIndex: 0, explanation: "'총괄(總括)'이 맞습니다. '괄(括)'은 '묶을 괄'로 '총체적으로 묶어서 관리한다'는 뜻입니다. '총활'은 잘못된 표기입니다." },
    ],
  },
  {
    id: 'master',
    label: '달인',
    icon: 'ri-vip-crown-2-fill',
    description: '어원과 한자어까지 꿰뚫는 최고 난이도',
    color: '#8B5CF6',
    questions: [
      { id: 'd01', type: '맞는 표현 고르기', category: 'spelling', question: "'앞으로 나아가기도 뒤로 물러나기도 어려운 곤란한 처지'를 뜻하는 올바른 사자성어는?", context: '', options: ['진퇴양난(進退兩難)', '진퇴양란(進退兩亂)', '진퇴량난(進退量難)'], correctIndex: 0, explanation: "'진퇴양난(進退兩難)'이 맞습니다. 進(나아갈 진), 退(물러날 퇴), 兩(두 양), 難(어려울 난). 두 방향 모두 어렵다는 뜻입니다. '亂(어지러울 란)'이나 '量(헤아릴 량)'은 의미가 맞지 않습니다." },
      { id: 'd02', type: '맞는 표현 고르기', category: 'spelling', question: '다음 중 올바른 한자어 표기는?', context: '"사건의 진상을 ___하다"', options: ['규명(糾明)', '구명(究明)'], correctIndex: 0, explanation: "'규명(糾明)'은 '사실 관계를 자세히 따져 밝힘'입니다. '구명(究明)'은 '깊이 연구하여 밝힘'입니다. '사건의 진상'은 사실 관계를 밝히는 것이므로 '규명'이 적합합니다." },
      { id: 'd03', type: '맞는 표현 고르기', category: 'spelling', question: '다음 중 올바른 표현은?', context: '"한 번의 실수로 모든 일을 ___"', options: ['그르치다', '그릇되다'], correctIndex: 0, explanation: "'그르치다'는 타동사로 '일을 잘못하여 망치다'입니다. '그릇되다'는 자동사로 '결과가 잘못되다'입니다. '일을 망치다'라는 뜻이므로 타동사 '그르치다'가 맞습니다." },
      { id: 'd04', type: '맞는 표현 고르기', category: 'spelling', question: '다음 중 맞는 표현은?', context: '"___으로 이런 사고가 발생했다."', options: ['부주의(不注意)', '불주의(不注意)', '부주이(不注意)'], correctIndex: 0, explanation: "'부주의'가 맞습니다. 접두사 '不'이 'ㄷ, ㅈ' 앞에서는 '부'로 읽힙니다: 부당(不當), 부정(不正), 부주의(不注意). 'ㄱ, ㅂ' 등 다른 자음 앞에서는 '불'로 읽힙니다: 불가(不可), 불법(不法)." },
      { id: 'd05', type: '맞는 표현 고르기', category: 'spelling', question: "다음 사자성어 중 '같은 처지의 사람끼리 서로 가엾게 여김'을 뜻하는 것은?", context: '', options: ['동병상련(同病相憐)', '동상이몽(同床異夢)', '동고동락(同苦同樂)', '동문서답(東問西答)'], correctIndex: 0, explanation: "'동병상련(同病相憐)': 同(같을 동), 病(병 병), 相(서로 상), 憐(가엾을 련). 같은 병을 앓는 사람끼리 서로 가엾이 여긴다는 뜻." },
      { id: 'd06', type: '맞는 표현 고르기', category: 'spelling', question: '다음 중 올바른 표기는?', context: '"그 사람의 행동은 ___이었다."', options: ['안하무인(眼下無人)', '안하무인(安下無人)', '안하무인(顔下無人)'], correctIndex: 0, explanation: "'안하무인(眼下無人)': 眼(눈 안), 下(아래 하), 無(없을 무), 人(사람 인). '눈 아래에 사람이 없다'는 뜻으로 방자하게 행동하는 것을 말합니다." },
      { id: 'd07', type: '맞는 표현 고르기', category: 'spelling', question: '다음 중 어원적으로 올바른 표현은?', context: '"열심히 노력한 ___에 합격했다."', options: ['덕분', '덕붙'], correctIndex: 0, explanation: "'덕분(德分)'이 맞습니다. '덕(德)'은 '덕, 은덕'이고, '분(分)'은 '나눌 분, 몫 분'입니다. 남의 은덕의 몫이라는 뜻에서 '덕분'이 유래했습니다." },
      { id: 'd08', type: '맞춤법 찾기', category: 'grammar', question: '다음 문장에서 맞춤법이 틀린 곳을 찾으세요.', context: '"그의 궤변에 속지 않고 일침을 놓았다."', options: ['궤변(詭辯)', '일침(一針)', '놓았다', '틀린 곳 없음'], correctIndex: 3, explanation: "이 문장은 모두 맞습니다. '궤변(詭辯)'은 '거짓 논리', '일침(一針)'은 '한 마디의 날카로운 지적', '놓다'는 '일침을 놓다'라는 관용 표현으로 올바릅니다." },
      { id: 'd09', type: '맞는 표현 고르기', category: 'spelling', question: "'자기 말이나 행동이 앞뒤가 서로 맞지 않음'을 뜻하는 사자성어는?", context: '', options: ['자가당착(自家撞着)', '자승자박(自繩自縛)', '자화자찬(自畫自讚)'], correctIndex: 0, explanation: "'자가당착(自家撞着)': 自(스스로 자), 家(집 가), 撞(부딪칠 당), 着(붙을 착). 자기 스스로 부딪치고 엉킨다는 뜻." },
      { id: 'd10', type: '맞는 표현 고르기', category: 'spelling', question: '다음 중 올바른 한자어 표기는?', context: '"이 안건을 ___에 부치겠습니다."', options: ['부의(附議)', '부이(付議)'], correctIndex: 0, explanation: "'부의(附議)': 附(붙일 부), 議(의논할 의). '안건을 회의에 붙여 의논함'이라는 뜻입니다." },
      { id: 'd11', type: '맞춤법 찾기', category: 'grammar', question: '다음 문장에서 틀린 곳을 찾으세요.', context: '"호사다마라더니 좋은 일에 항상 탈이 생긴다."', options: ['호사다마(好事多魔)', '항상', '탈이', '틀린 곳 없음'], correctIndex: 3, explanation: "모두 맞습니다. '호사다마(好事多魔)': 好(좋을 호), 事(일 사), 多(많을 다), 魔(마귀 마). '좋은 일에는 방해가 많다'는 뜻입니다." },
      { id: 'd12', type: '맞는 표현 고르기', category: 'spelling', question: '다음 중 올바른 표현은?', context: '"그는 ___에 빠져 현실을 직시하지 못했다."', options: ['아집(我執)', '아집(亞執)', '아집(牙執)'], correctIndex: 0, explanation: "'아집(我執)': 我(나 아), 執(잡을 집). 불교 용어에서 유래하여 '자기 자신에 대한 집착'을 뜻합니다." },
    ],
  },
];

// --- Helper Functions ---

export function getQuestionsForLevel(levelId: LevelId): Question[] {
  const level = LEVELS.find((l) => l.id === levelId);
  return level ? level.questions : [];
}

export function getGrade(percent: number): Grade {
  if (percent >= 90) return 'S';
  if (percent >= 80) return 'A';
  if (percent >= 70) return 'B';
  if (percent >= 60) return 'C';
  return 'D';
}
