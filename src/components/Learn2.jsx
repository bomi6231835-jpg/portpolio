import LearningCardSection from './LearningCardSection'

const learningCards = [
  {
    number: '01',
    eyebrow: 'DISCOVERY',
    title: '관심 분야 탐색',
    description:
      '새로운 기술과 아이디어를 살펴보며 다음에 깊이 학습할 주제를 발견합니다.',
    tags: ['Research', 'Trends', 'Ideas'],
    accent: 'from-[#E9ECFF] to-[#F8F9FF]',
  },
  {
    number: '02',
    eyebrow: 'PLANNING',
    title: '학습 계획 설계',
    description:
      '목표를 작은 단계로 나누고 꾸준히 실행할 수 있는 학습 흐름을 설계합니다.',
    tags: ['Roadmap', 'Goals', 'Routine'],
    accent: 'from-[#EEF0FF] to-[#F9F4FF]',
  },
  {
    number: '03',
    eyebrow: 'PRACTICE',
    title: '작은 기능 구현',
    description:
      '학습한 개념을 작은 기능으로 직접 구현하며 이해한 내용을 코드로 확인합니다.',
    tags: ['Prototype', 'Coding', 'Practice'],
    accent: 'from-[#EAF5FF] to-[#F5F7FF]',
  },
  {
    number: '04',
    eyebrow: 'REVIEW',
    title: '코드 점검과 개선',
    description:
      '작성한 코드를 다시 살펴보고 더 읽기 쉽고 안정적인 구조로 개선합니다.',
    tags: ['Refactoring', 'Review', 'Quality'],
    accent: 'from-[#EAFBFA] to-[#F3F7FF]',
  },
  {
    number: '05',
    eyebrow: 'DOCUMENT',
    title: '과정 기록',
    description:
      '문제를 해결한 과정과 배운 내용을 기록해 다시 활용할 수 있는 지식으로 남깁니다.',
    tags: ['Notes', 'README', 'Archive'],
    accent: 'from-[#F2ECFF] to-[#FAF7FF]',
  },
  {
    number: '06',
    eyebrow: 'SHARE',
    title: '피드백과 공유',
    description:
      '완성한 결과를 공유하고 다양한 피드백을 받아 다음 개선 방향을 찾습니다.',
    tags: ['Feedback', 'Community', 'Growth'],
    accent: 'from-[#ECEFFF] to-[#F4F5FF]',
  },
  {
    number: '07',
    eyebrow: 'NEXT STEP',
    title: '다음 도전 연결',
    description:
      '이번 경험에서 얻은 기준을 바탕으로 더 깊이 있는 다음 목표에 도전합니다.',
    tags: ['Challenge', 'Iteration', 'Future'],
    accent: 'from-[#EDEBFF] to-[#F8F7FF]',
  },
]

const Learn2 = () => (
  <LearningCardSection
    id="learning-2"
    eyebrow="Growth Process"
    title="학습한 기술들"
    description={
        <>
        프로그램을 통해 학습한 기술들을 소개합니다.
        </>
    }
    cards={learningCards}
    nextSectionId="about-me"
  />
)

export default Learn2
