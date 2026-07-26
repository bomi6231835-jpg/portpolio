import { useEffect, useRef, useState } from 'react'
import Portpolio2 from './Portpolio2'
import TabletZoomHero from './TabletZoomHero'
import Learn from './Learn'
import Learn2 from './Learn2'
import Skill from './Skill'
import AboutME from './AboutME'
import SiteNavigation from './SiteNavigation'

function Home() {
    const heroRef = useRef(null)
    const [activeSection, setActiveSection] = useState('home')

    useEffect(() => {
        const updateActiveSection = () => {
            const aboutMe = document.getElementById('about-me')
            const learning = document.getElementById('learning')
            const skills = document.getElementById('skills')
            const activationLine = window.innerHeight * 0.45

            if (aboutMe?.getBoundingClientRect().top <= activationLine) {
                setActiveSection('about-me')
            } else if (learning?.getBoundingClientRect().top <= activationLine) {
                setActiveSection('learning')
            } else if (skills?.getBoundingClientRect().top <= activationLine) {
                setActiveSection('skills')
            }
        }

        window.addEventListener('scroll', updateActiveSection, {
            passive: true,
        })
        updateActiveSection()

        return () => {
            window.removeEventListener('scroll', updateActiveSection)
        }
    }, [])

    const handleNavigate = (sectionId) => {
        heroRef.current?.navigateTo(sectionId)
    }

    return (
        <main className="bg-white">
            <SiteNavigation
                activeSection={activeSection}
                onNavigate={handleNavigate}
            />

            <TabletZoomHero
                ref={heroRef}
                eyebrow="Frontend Developer"
                title="JOYEYEON"
                nextSectionId="skills"
                onActiveSectionChange={setActiveSection}
            >
                {/* <Portpolio1 /> */}
                <Portpolio2 />
            </TabletZoomHero>

            <div className="mx-auto flex w-full max-w-[1300px] flex-col items-center">
                <Skill />
            </div>

            <Learn />
            <Learn2 />
            <AboutME />
        </main>
    )
}

export default Home
