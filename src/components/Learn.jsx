import LearningCardSection from './LearningCardSection'

const learningCards = [
  {
    number: '01',
    eyebrow: 'Study',
    title: 'AI+X',
    description:
      '웹 표준과 반응형 레이아웃을 바탕으로, 다양한 화면에서도 명확하게 정보를 전달하는 방법을 학습합니다.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    accent: 'from-[#E9ECFF] to-[#F8F9FF]',
  },
  {
    number: '02',
    eyebrow: 'Portpolio',
    title: '웹 화면흐름 읽기',
    description:
      '컴포넌트 중심의 설계와 상태 관리를 익히며, 재사용하기 쉽고 자연스럽게 반응하는 화면을 구현합니다.',
    tags: ['React', 'Components', 'UI'],
    accent: 'from-[#EEF0FF] to-[#F9F4FF]',
  },
  {
    number: '03',
    eyebrow: 'Book Store',
    title: '인터렉션 구현',
    description:
      'Python을 활용한 서버 로직과 API의 흐름을 이해하고, 프론트엔드와 데이터를 연결하는 경험을 쌓습니다.',
    tags: ['Python', 'Flask', 'REST API'],
    accent: 'from-[#EAF5FF] to-[#F5F7FF]',
  },
  {
    number: '04',
    eyebrow: 'FilmAtique',
    title: 'Flask-백엔드 경험',
    description:
      '데이터를 정리하고 탐색하는 과정을 통해 의미 있는 패턴을 찾고, 결과를 이해하기 쉽게 시각화합니다.',
    tags: ['Pandas', 'Analysis', 'Visualization'],
    accent: 'from-[#EAFBFA] to-[#F3F7FF]',
  },
  {
    number: '05',
    eyebrow: 'Today Menu',
    title: 'React/Tailwind 경험',
    description:
      '머신러닝과 언어 모델의 기본 원리를 익히고, 실제 문제에 적용할 수 있는 활용 방법을 탐구합니다.',
    tags: ['Machine Learning', 'LLM', 'Prompting'],
    accent: 'from-[#F2ECFF] to-[#FAF7FF]',
  },
  {
    number: '06',
    eyebrow: 'Drug Demand',
    title: '머신러닝 허깅페이스에 배포',
    description:
      '버전 관리와 컨테이너 기반의 작업 흐름을 익히며, 안정적으로 공유하고 협업하는 방식을 학습합니다.',
    tags: ['GitHub', 'Docker', 'CI/CD'],
    accent: 'from-[#ECEFFF] to-[#F4F5FF]',
  },
]

const Learn = () => (
  <LearningCardSection
    id="learning"
    title="학습과 경험"
    eyebrow="Learning Journey"
    description={
      <>
        배운 것을 직접 만들며 확인하고,
        <br className="hidden sm:block" /> 경험을 다음 도전으로 연결합니다.
      </>
    }
    cards={learningCards}
    nextSectionId="learning-2"
  />
)

export default Learn
