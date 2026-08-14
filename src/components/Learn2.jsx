import LearningCardSection from './LearningCardSection'

const learningCards = [
  {
    number: '01',
    title: 'Frontend',
    description:
      'HTML, CSS, JavaScript, React, Vite, Streamlit',
    accent: 'from-[#E9ECFF] to-[#F8F9FF]',
  },
  {
    number: '02',
    title: 'UI / Interaction',
    description:
      'Responsive Layout, Tailwind CSS, CSS, Animation, Swiper',
    accent: 'from-[#EEF0FF] to-[#F9F4FF]',
  },
  {
    number: '03',
    title: 'Backend',
    description:
      'Python, Flask, Rest API, Jinja2, SQLAIchemy',
    accent: 'from-[#EAF5FF] to-[#F5F7FF]',
  },
  {
    number: '04',
    title: 'Database / Infra',
    description:
      'SQLite, Docker, Vercel',
    accent: 'from-[#EAFBFA] to-[#F3F7FF]',
  },
  {
    number: '05',
    title: '과정 기록',
    description:
      'OpenAI API, KaKao API, NAVER Login, Socket.IO',
    accent: 'from-[#F2ECFF] to-[#FAF7FF]',
  },
  {
    number: '06',
    title: 'Data / ML / DL',
    description:
      'Pandas, NumPy, Scikit-learn, LightGBM, CNN, LLM',
    accent: 'from-[#ECEFFF] to-[#F4F5FF]',
  },
  {
    number: '07',
    title: 'Tools',
    description:
      'GitHub, Docker Hub, Pycharm, VScode, Hugging Face Spaces, Google Colab',
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
        교육과정을 통해 학습한 기술들을 소개합니다.
        </>
    }
    cards={learningCards}
    nextSectionId="about-me"
  />
)

export default Learn2
