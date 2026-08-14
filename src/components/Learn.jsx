import LearningCardSection from './LearningCardSection'

const learningCards = [
  {
    number: '01',
    eyebrow: 'booklovers',
    title: 'Open API를 활용한 \n인터넷 서점',
    description:
      '카카오 API를 활용한 프론트엔드',
    tags: ['HTML', 'CSS', 'JavaScript'],
    accent: 'from-[#E9ECFF] to-[#F8F9FF]',
  },
  {
    number: '02',
    eyebrow: 'FilmAtique',
    title: 'Flask 프로젝트',
    description:
      '백엔드 + 프론트엔드',
    tags: ['Flask','SQLAlchemy','HTML','CSS','JS','Bootstrap'],
    accent: 'from-[#EEF0FF] to-[#F9F4FF]',
  },
  {
    number: '03',
    eyebrow: '미래 서울시의 의약품 예측/분석',
    title: '빅데이터활용 분석 모델 개발 프로젝트',
    description:
      '인공지능(머신러닝,딥러닝) + Stremlit(서빙)',
    tags: ['Machine Learning','Deep Learning','Streamlit','python'],
    accent: 'from-[#EAF5FF] to-[#F5F7FF]',
  },
  {
    number: '04',
    eyebrow: '오늘 뭐먹지?',
    title: '생성형 AI Web App\n기획 및 개발 프로젝트',
    description:
      '백엔드(Flask) + 프론트엔드(React) + 챗봇(OpenAI)',
    tags: ['Flask','React','OpenAI','Tailwind CSS'],
    accent: 'from-[#EAFBFA] to-[#F3F7FF]',
  },
  {
    number: '05',
    eyebrow: 'Artis',
    title: 'AI 기반 인터랙티브\n웹소설 플랫폼',
    description:
      '대형 언어 모델(LLM) 프롬프트를 최적화하여 사용자의 입력에 따라 실시간으로 서사가 확장되는 콘텐츠 제작 플랫폼',
    tags: ['Open AI', 'LLM', 'React','Flask'],
    accent: 'from-[#F2ECFF] to-[#FAF7FF]',
  },
  {
    number: '06',
    eyebrow: 'WORKFLOW',
    title: 'DevOps·협업',
    description:
      '버전 관리와 컨테이너 기반의 작업 흐름을 익히며, 안정적으로 공유하고 협업하는\n방식을 경했습니다.',
    tags: ['GitHub', 'Docker', 'Figma'],
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
        배운 것을 프로젝트를 만들며 확인하고,
        <br className="hidden sm:block" /> 이 경험을 다음 도전으로 연결합니다.
      </>
    }
    cards={learningCards}
    nextSectionId="learning-2"
  />
)

export default Learn
