import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ModalIcon from './ModalIcon'

gsap.registerPlugin(ScrollTrigger)

const toolIcons = [
    {
        src: '/img/icon/docker3D.png',
        alt: 'Docker',
        level: 45,
        summary: '애플리케이션을 일관된 환경에서 실행하기 위한 컨테이너 도구입니다.',
        description: 'Docker를 활용한 개발 환경 구성과 이미지·컨테이너 관리 경험을 이곳에 작성해 주세요.',
    },
    {
        src: '/img/icon/drone3D.png',
        alt: 'Drone',
        level: 60,
        summary: '프로젝트의 자동화된 빌드와 배포 흐름을 구성하는 CI/CD 도구입니다.',
        description: 'Drone을 사용해 구축한 파이프라인과 자동화 작업에 대한 설명을 이곳에 작성해 주세요.',
    },
    {
        src: '/img/icon/effect3D.png',
        alt: 'Adobe After Effects',
        level: 80,
        summary: '영상에 모션 그래픽과 시각 효과를 더하는 디자인 도구입니다.',
        description: 'After Effects로 제작한 모션 그래픽과 영상 작업에 대한 설명을 이곳에 작성해 주세요.',
    },
    {
        src: '/img/icon/figma3D.png',
        alt: 'Figma',
        level: 70,
        summary: '화면 설계와 프로토타입 제작을 위한 협업 디자인 도구입니다.',
        description: 'Figma를 활용한 UI·UX 설계와 협업 경험에 대한 설명을 이곳에 작성해 주세요.',
    },
    {
        src: '/img/icon/github3D.png',
        alt: 'GitHub',
        level: 65,
        summary: '코드 버전 관리와 팀 협업을 위한 개발 플랫폼입니다.',
        description: 'GitHub에서 진행한 브랜치 관리, 코드 리뷰, 협업 방식에 대한 설명을 이곳에 작성해 주세요.',
    },
    {
        src: '/img/icon/premier3D.png',
        alt: 'Adobe Premiere Pro',
        level: 90,
        summary: '영상 편집과 사운드 구성을 위한 콘텐츠 제작 도구입니다.',
        description: 'Premiere Pro로 편집한 영상과 담당 작업에 대한 설명을 이곳에 작성해 주세요.',
    },
    {
        src: '/img/icon/visual3D.png',
        alt: 'Visual Studio Code',
        level: 82,
        summary: '다양한 개발 환경을 지원하는 확장 가능한 코드 편집기입니다.',
        description: 'Visual Studio Code에서 사용하는 개발 환경과 주요 확장 기능을 이곳에 작성해 주세요.',
    },
    {
        src: '/img/icon/pycharm3D.png',
        alt: 'PyCharm',
        level: 78,
        summary: 'Python 개발과 디버깅에 특화된 통합 개발 환경입니다.',
        description: 'PyCharm을 활용한 Python 프로젝트와 개발 경험에 대한 설명을 이곳에 작성해 주세요.',
    },
    {
        src: '/img/icon/react3D.png',
        alt: 'React',
        level: 60,
        summary: '컴포넌트 기반으로 사용자 인터페이스를 만드는 JavaScript 라이브러리입니다.',
        description: 'React로 구현한 컴포넌트, 상태 관리, 사용자 경험에 대한 설명을 이곳에 작성해 주세요.',
    },
    {
        src: '/img/icon/flask3D.png',
        alt: 'Flask',
        level: 55,
        summary: 'Python으로 가볍고 유연한 웹 서비스를 구축하는 프레임워크입니다.',
        description: 'Flask로 구현한 API와 백엔드 기능에 대한 설명을 이곳에 작성해 주세요.',
    },
]

const iconAnimationSettings = {
    arrivalEvent: 'home:portfolio-section-arrived',
    arrivalDelay: 1.5,
    duration: { min: 0.65, max: 1.1 },
    startDelay: { min: 0, max: 0.22 },
    ease: 'back.out(1.5)',
    iconWidth: 130,
    iconHeight: 110,
    edgePadding: 8,
    minimumGap: 18,
    centerExclusion: { width: 400, height: 350 },
    maxLayoutAttempts: 240,
    maxPlacementAttempts: 700,
    blur: {
        amount: 14,
        delay: 1.5,
        duration: 2,
        ease: 'power1.inOut',
    },
}

const textAnimationSettings = {
    duration: 4,
    strengthDelay: 0.45,
}

const textSequences = [
    { introduce: 'Introduce', strength: 'My Strength' },
    { introduce: 'Please Press', strength: 'The Icones!' },
]

const randomBetween = (min, max) => min + Math.random() * (max - min)

const iconJiggleTimings = toolIcons.map(() => {
    const duration = randomBetween(0.12, 0.18)

    return {
        delay: Math.random() * 0.2,
        duration,
        iterations: Math.floor(3 / duration),
    }
})

const shuffle = (items) => {
    const shuffledItems = [...items]

    for (let index = shuffledItems.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1))
        ;[shuffledItems[index], shuffledItems[randomIndex]] = [
            shuffledItems[randomIndex],
            shuffledItems[index],
        ]
    }

    return shuffledItems
}

const createFallbackLayout = (count, stageWidth, stageHeight) => {
    const {
        iconWidth,
        iconHeight,
        edgePadding,
        minimumGap,
        centerExclusion,
    } = iconAnimationSettings
    const maxX = Math.max((stageWidth - iconWidth) / 2 - edgePadding, 0)
    const maxY = Math.max((stageHeight - iconHeight) / 2 - edgePadding, 0)
    const columns = stageWidth < 560 ? 2 : stageWidth < 900 ? 3 : 4
    const columnPositions = Array.from({ length: columns }, (_, index) =>
        columns === 1 ? 0 : -maxX + (index * maxX * 2) / (columns - 1),
    )
    const innerY =
        centerExclusion.height / 2 + iconHeight / 2 + minimumGap
    const requiredRows = Math.ceil(count / columns)
    const rowPositions = Array.from({ length: requiredRows }, (_, index) =>
        requiredRows === 1
            ? 0
            : -maxY + (index * maxY * 2) / (requiredRows - 1),
    ).map((y) => {
        if (Math.abs(y) >= innerY) return y

        return y < 0 ? -Math.min(innerY, maxY) : Math.min(innerY, maxY)
    })
    const safePositions = rowPositions.flatMap((y) =>
        columnPositions.map((x) => ({ x, y })),
    )

    return shuffle(safePositions).slice(0, count)
}

const createRandomLayout = (count, stageWidth, stageHeight) => {
    const {
        iconWidth,
        iconHeight,
        edgePadding,
        minimumGap,
        centerExclusion,
        maxLayoutAttempts,
        maxPlacementAttempts,
    } = iconAnimationSettings
    const maxX = Math.max((stageWidth - iconWidth) / 2 - edgePadding, 0)
    const maxY = Math.max((stageHeight - iconHeight) / 2 - edgePadding, 0)

    for (
        let layoutAttempt = 0;
        layoutAttempt < maxLayoutAttempts;
        layoutAttempt += 1
    ) {
        const positions = []

        for (let index = 0; index < count; index += 1) {
            let position

            for (
                let placementAttempt = 0;
                placementAttempt < maxPlacementAttempts;
                placementAttempt += 1
            ) {
                const candidate = {
                    x: randomBetween(-maxX, maxX),
                    y: randomBetween(-maxY, maxY),
                }
                const overlapsCenter =
                    Math.abs(candidate.x) <
                        centerExclusion.width / 2 + iconWidth / 2 &&
                    Math.abs(candidate.y) <
                        centerExclusion.height / 2 + iconHeight / 2
                const hasOverlap = positions.some(
                    (currentPosition) =>
                        Math.abs(candidate.x - currentPosition.x) <
                            iconWidth + minimumGap &&
                        Math.abs(candidate.y - currentPosition.y) <
                            iconHeight + minimumGap,
                )

                if (!overlapsCenter && !hasOverlap) {
                    position = candidate
                    break
                }
            }

            if (!position) break
            positions.push(position)
        }

        if (positions.length === count) return positions
    }

    return createFallbackLayout(count, stageWidth, stageHeight)
}

const Skill = () => {
    const [isTextAnimationActive, setIsTextAnimationActive] = useState(false)
    const [isIconJiggleActive, setIsIconJiggleActive] = useState(false)
    const [isIconModalEnabled, setIsIconModalEnabled] = useState(false)
    const [activeModalIcon, setActiveModalIcon] = useState(null)
    const iconSectionRef = useRef(null)
    const iconStageRef = useRef(null)
    const completedTextAnimationsRef = useRef(new Set())
    const clearBlurTweenRef = useRef(null)
    const shakeEndDelayRef = useRef(null)
    const navigationTweenRef = useRef(null)
    const isAnimationScrollLockedRef = useRef(false)
    const isDirectNavigationActiveRef = useRef(false)

    const handleTextAnimationEnd = (animationName) => {
        completedTextAnimationsRef.current.add(animationName)

        if (
            completedTextAnimationsRef.current.size <
            textSequences.length * 2
        ) {
            return
        }

        const icons = iconStageRef.current?.querySelectorAll('[data-tool-icon]')
        if (!icons?.length || clearBlurTweenRef.current) return

        clearBlurTweenRef.current = gsap.to(icons, {
            filter: 'blur(0px)',
            opacity: 1,
            duration: iconAnimationSettings.blur.duration,
            ease: iconAnimationSettings.blur.ease,
            onComplete: () => {
                isAnimationScrollLockedRef.current = false
                setIsIconModalEnabled(true)
                setIsIconJiggleActive(true)
                shakeEndDelayRef.current = window.setTimeout(() => {
                    setIsIconJiggleActive(false)
                    shakeEndDelayRef.current = null
                }, 3200)
            },
        })
    }

    useLayoutEffect(() => {
        const completedTextAnimations = completedTextAnimationsRef.current
        let expandDelay
        let expandTimeline
        let blurDelay
        let blurTween
        let sectionEntryTrigger
        let isAnimationCycleActive = false
        let iconPositions = []

        const ctx = gsap.context(() => {
            const icons = gsap.utils.toArray(
                '[data-tool-icon]',
                iconStageRef.current,
            )

            const setIconsToInitialState = () => {
                gsap.set(icons, {
                    xPercent: -50,
                    yPercent: -50,
                    x: 0,
                    y: 0,
                    rotation: 0,
                    scale: 0.72,
                    opacity: 0,
                    filter: 'blur(18px)',
                })
            }

            const updateIconPositions = () => {
                const stageBounds = iconStageRef.current.getBoundingClientRect()
                iconPositions = createRandomLayout(
                    icons.length,
                    stageBounds.width,
                    stageBounds.height,
                )

                if (
                    isAnimationCycleActive &&
                    !expandTimeline?.isActive()
                ) {
                    gsap.to(icons, {
                        x: (index) => iconPositions[index].x,
                        y: (index) => iconPositions[index].y,
                        rotation: 0,
                        duration: 0.35,
                        ease: 'power1.out',
                        overwrite: 'auto',
                    })
                }
            }

            setIconsToInitialState()
            updateIconPositions()

            const resetAnimationCycle = () => {
                expandDelay?.kill()
                expandTimeline?.kill()
                blurDelay?.kill()
                blurTween?.kill()
                clearBlurTweenRef.current?.kill()

                expandDelay = null
                expandTimeline = null
                blurDelay = null
                blurTween = null
                clearBlurTweenRef.current = null

                if (shakeEndDelayRef.current) {
                    window.clearTimeout(shakeEndDelayRef.current)
                    shakeEndDelayRef.current = null
                }

                isAnimationCycleActive = false
                isAnimationScrollLockedRef.current = false
                completedTextAnimations.clear()
                setIsTextAnimationActive(false)
                setIsIconJiggleActive(false)
                setIsIconModalEnabled(false)
                setActiveModalIcon(null)
                setIconsToInitialState()
                updateIconPositions()
            }

            const expandIcons = () => {
                if (isAnimationCycleActive) return

                isAnimationCycleActive = true
                isAnimationScrollLockedRef.current = true
                expandDelay = gsap.delayedCall(
                    iconAnimationSettings.arrivalDelay,
                    () => {
                        expandTimeline = gsap.timeline({
                            onComplete: () => {
                                blurDelay = gsap.delayedCall(
                                    iconAnimationSettings.blur.delay,
                                    () => {
                                        setIsTextAnimationActive(true)
                                        blurTween = gsap.to(icons, {
                                            filter: `blur(${iconAnimationSettings.blur.amount}px)`,
                                            opacity: 1,
                                            duration:
                                                iconAnimationSettings.blur
                                                    .duration,
                                            ease: iconAnimationSettings.blur.ease,
                                        })
                                    },
                                )
                            },
                        })

                        icons.forEach((icon, index) => {
                            const duration = randomBetween(
                                iconAnimationSettings.duration.min,
                                iconAnimationSettings.duration.max,
                            )
                            const startDelay = randomBetween(
                                iconAnimationSettings.startDelay.min,
                                iconAnimationSettings.startDelay.max,
                            )

                            expandTimeline.to(
                                icon,
                                {
                                    x: iconPositions[index].x,
                                    y: iconPositions[index].y,
                                    rotation: 0,
                                    scale: 1,
                                    opacity: 1,
                                    filter: 'blur(0px)',
                                    duration,
                                    ease: iconAnimationSettings.ease,
                                },
                                startDelay,
                            )
                        })
                    },
                )
            }

            const handlePortfolioSectionArrival = (event) => {
                if (event.detail?.sectionId === iconSectionRef.current?.id) {
                    expandIcons()
                }
            }

            const handleResize = () => {
                updateIconPositions()
            }

            sectionEntryTrigger = ScrollTrigger.create({
                trigger: iconSectionRef.current,
                start: 'top 85%',
                onEnter: expandIcons,
                onEnterBack: expandIcons,
                onLeave: resetAnimationCycle,
                onLeaveBack: resetAnimationCycle,
            })

            window.addEventListener('resize', handleResize)
            window.addEventListener(
                iconAnimationSettings.arrivalEvent,
                handlePortfolioSectionArrival,
            )

            return () => {
                window.removeEventListener('resize', handleResize)
                window.removeEventListener(
                    iconAnimationSettings.arrivalEvent,
                    handlePortfolioSectionArrival,
                )
            }
        }, iconSectionRef)

        return () => {
            expandDelay?.kill()
            expandTimeline?.kill()
            blurDelay?.kill()
            blurTween?.kill()
            sectionEntryTrigger?.kill()
            clearBlurTweenRef.current?.kill()
            if (shakeEndDelayRef.current) {
                window.clearTimeout(shakeEndDelayRef.current)
            }
            clearBlurTweenRef.current = null
            shakeEndDelayRef.current = null
            isAnimationScrollLockedRef.current = false
            completedTextAnimations.clear()
            ctx.revert()
        }
    }, [])

    useLayoutEffect(() => {
        const section = iconSectionRef.current
        if (!section) return undefined
        let touchStartY = null

        const handleDirectNavigationStart = () => {
            isDirectNavigationActiveRef.current = true
            navigationTweenRef.current?.kill()
            navigationTweenRef.current = null
        }

        const handleDirectNavigationEnd = () => {
            isDirectNavigationActiveRef.current = false
        }

        const scrollToLearning = () => {
            if (
                navigationTweenRef.current ||
                isDirectNavigationActiveRef.current ||
                isAnimationScrollLockedRef.current
            ) {
                return
            }

            const learningSection = document.getElementById('learning')
            if (!learningSection) return

            const scrollPosition = { value: window.scrollY }
            const destination =
                learningSection.getBoundingClientRect().top + window.scrollY

            navigationTweenRef.current = gsap.to(scrollPosition, {
                value: destination,
                duration: 1,
                ease: 'power2.inOut',
                overwrite: true,
                onUpdate: () => window.scrollTo(0, scrollPosition.value),
                onComplete: () => {
                    navigationTweenRef.current = null
                },
            })
        }

        const isSkillStageActive = () => {
            const bounds = section.getBoundingClientRect()
            return bounds.top <= 1 && bounds.bottom > window.innerHeight
        }

        const shouldLockScroll = () =>
            isAnimationScrollLockedRef.current &&
            !isDirectNavigationActiveRef.current &&
            isSkillStageActive()

        const handleWheel = (event) => {
            if (
                event.deltaY !== 0 &&
                shouldLockScroll() &&
                event.cancelable
            ) {
                event.preventDefault()
            }
        }

        const handleTouchStart = (event) => {
            touchStartY = event.touches[0]?.clientY ?? null
        }

        const handleTouchMove = (event) => {
            const currentY = event.touches[0]?.clientY
            if (
                touchStartY !== null &&
                currentY !== undefined &&
                touchStartY !== currentY &&
                shouldLockScroll() &&
                event.cancelable
            ) {
                event.preventDefault()
            }
        }

        const resetTouchGesture = () => {
            touchStartY = null
        }

        const transitionTrigger = ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            onLeave: scrollToLearning,
        })
        window.addEventListener(
            'home:section-navigation-start',
            handleDirectNavigationStart,
        )
        window.addEventListener(
            'home:section-navigation-end',
            handleDirectNavigationEnd,
        )
        window.addEventListener('wheel', handleWheel, {
            passive: false,
            capture: true,
        })
        window.addEventListener('touchstart', handleTouchStart, {
            passive: true,
            capture: true,
        })
        window.addEventListener('touchmove', handleTouchMove, {
            passive: false,
            capture: true,
        })
        window.addEventListener('touchend', resetTouchGesture, {
            capture: true,
        })
        window.addEventListener('touchcancel', resetTouchGesture, {
            capture: true,
        })

        return () => {
            window.removeEventListener(
                'home:section-navigation-start',
                handleDirectNavigationStart,
            )
            window.removeEventListener(
                'home:section-navigation-end',
                handleDirectNavigationEnd,
            )
            window.removeEventListener('wheel', handleWheel, {
                capture: true,
            })
            window.removeEventListener('touchstart', handleTouchStart, {
                capture: true,
            })
            window.removeEventListener('touchmove', handleTouchMove, {
                capture: true,
            })
            window.removeEventListener('touchend', resetTouchGesture, {
                capture: true,
            })
            window.removeEventListener('touchcancel', resetTouchGesture, {
                capture: true,
            })
            transitionTrigger.kill()
            navigationTweenRef.current?.kill()
            navigationTweenRef.current = null
            isDirectNavigationActiveRef.current = false
            touchStartY = null
        }
    }, [])

    return (
        <section
            ref={iconSectionRef}
            id="skills"
            className="relative min-h-[180vh] w-full scroll-mt-0 bg-white"
            aria-label="Additional portfolio content"
        >
            <div
                ref={iconStageRef}
                className="sticky top-0 h-screen w-full overflow-hidden"
            >
                {toolIcons.map((icon, index) => (
                    <div
                        key={icon.src}
                        data-tool-icon
                        className="absolute left-1/2 top-1/2 h-[200px] w-[180px] filter-none opacity-100 will-change-[transform,filter,opacity]"
                    >
                        <button
                            type="button"
                            className={`h-full w-full border-0 bg-transparent p-0 transition-transform duration-200 ease-out ${
                                isIconModalEnabled
                                    ? 'cursor-pointer hover:scale-110 focus-visible:scale-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-primary)]'
                                    : 'cursor-default'
                            }`}
                            aria-label={`${icon.alt} details`}
                            aria-expanded={
                                isIconModalEnabled &&
                                activeModalIcon === index
                            }
                            onClick={() => {
                                if (!isIconModalEnabled) return

                                setActiveModalIcon((currentIcon) =>
                                    currentIcon === index ? null : index,
                                )
                            }}
                        >
                            <img
                                src={icon.src}
                                alt={icon.alt}
                                className={`h-full w-full object-contain ${
                                    isIconJiggleActive ? 'icon-jiggle' : ''
                                }`}
                                style={{
                                    animationDelay: `${iconJiggleTimings[index].delay}s`,
                                    animationDuration: `${iconJiggleTimings[index].duration}s`,
                                    animationIterationCount:
                                        iconJiggleTimings[index].iterations,
                                }}
                            />
                        </button>
                    </div>
                ))}

                <ModalIcon
                    icon={
                        activeModalIcon === null
                            ? null
                            : toolIcons[activeModalIcon]
                    }
                    isOpen={
                        isIconModalEnabled && activeModalIcon !== null
                    }
                    onClose={() => setActiveModalIcon(null)}
                />

                <div
                    className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center gap-[clamp(0.5rem,2vh,1.5rem)] overflow-hidden"
                    aria-hidden={!isTextAnimationActive}
                >
                    {textSequences.map((sequence, index) => {
                        const sequenceDelay =
                            index *
                            (textAnimationSettings.duration +
                                textAnimationSettings.strengthDelay)

                        return (
                            <div
                                className="absolute inset-0 flex flex-col items-center justify-center gap-[clamp(0.5rem,2vh,1.5rem)]"
                                key={`${sequence.introduce}-${sequence.strength}`}
                            >
                                <p
                                    className={`w-max whitespace-nowrap text-center text-[clamp(2.25rem,9vw,8rem)] font-black leading-[0.9] tracking-[-0.065em] text-[var(--color-primary)] will-change-transform ${
                                        isTextAnimationActive
                                            ? '[animation:introduce-slide_7.5s_ease-in-out_1_both]'
                                            : 'invisible'
                                    }`}
                                    style={{
                                        animationDuration: `${textAnimationSettings.duration}s`,
                                        animationDelay: `${sequenceDelay}s`,
                                    }}
                                    onAnimationEnd={() =>
                                        handleTextAnimationEnd(
                                            `introduce-${index}`,
                                        )
                                    }
                                >
                                    {sequence.introduce}
                                </p>
                                <p
                                    className={`w-max whitespace-nowrap text-center text-[clamp(2.25rem,9vw,8rem)] font-black leading-[0.9] tracking-[-0.065em] text-[var(--color-primary)] will-change-transform ${
                                        isTextAnimationActive
                                            ? '[animation:my-strength-slide_7.5s_ease-in-out_1_both]'
                                            : 'invisible'
                                    }`}
                                    style={{
                                        animationDuration: `${textAnimationSettings.duration}s`,
                                        animationDelay: `${
                                            sequenceDelay +
                                            textAnimationSettings.strengthDelay
                                        }s`,
                                    }}
                                    onAnimationEnd={() =>
                                        handleTextAnimationEnd(
                                            `strength-${index}`,
                                        )
                                    }
                                >
                                    {sequence.strength}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Skill
