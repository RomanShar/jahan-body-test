import type { PainPoint, RetreatDay, Testimonial, VideoTestimonial, FAQItem, PricingIncluded, PricingTier, PhilosophyPillar, VenueHighlight, AccommodationTier, GalleryImage, ManifestoData } from './types'

// ===== SPOTS (single source of truth) =====
export const TOTAL_SPOTS = 20
export const SPOTS_TAKEN = 8

// ===== HERO =====
export const hero = {
  tagline: 'Пенише · Португалия · 1–4 мая 2026',
  headline: 'В голове - терапия, книги, понимание.\nВ теле - всё тот же зажим.',
  description: 'Телесный тренинг для русскоязычных в Европе. 4 дня тишины, звука и океана - чтобы вернуть контакт с собой, своим телом и близкими.',
  ctaPrimary: 'Оставить заявку',
  ctaSecondary: 'Почему это работает?',
  ctaSecondaryHref: '#philosophy',
  urgencyBadges: ['✓ 15+ лет практики', '✓ 1500+ участников', `✓ ${SPOTS_TAKEN} из ${TOTAL_SPOTS} мест занято`],
}

// ===== PAIN POINTS =====
export const painPoints: PainPoint[] = [
  { title: 'Сила заперта', text: 'Вы чувствуете мощный потенциал внутри, но он сжат в тугой узел. Вас распирает изнутри, но вы не даёте этому выйти. Сдерживаетесь, даже когда никто не видит.', icon: 'Lock' },
  { title: 'Рядом, но не вместе', text: 'Живёте с партнёром рядом, но настоящей близости нет. У каждого внутри «библиотека непроговорённого».', icon: 'Users' },
  { title: 'Автопилот', text: 'Вам за 30, внешне всё «нормально» – работа, семья, план. Но вкус жизни пропал. В какой-то момент: «А что дальше?» – и головой ответа не найти.', icon: 'Infinity' },
  { title: 'Замороженность', text: 'Тело зажато - и это забирает энергию, уверенность, привлекательность. Головой тело не расслабить.', icon: 'Snowflake' },
  { title: 'Эмоции под замком', text: 'Научились держать лицо. Таблетки, психолог, работа – а тело всё равно сжато. Цена контроля – не чувствовать ничего. Ни радости, ни злости, ни нежности.', icon: 'HeartOff' },
  { title: 'Контроль как защита', text: 'Всё под контролем - расписание, эмоции, даже расслабление. Но внутри - усталость от того, что нельзя отпустить.', icon: 'Shield' },
  { title: 'Новая страна, старые зажимы', text: 'Переехали - а тело привезло с собой всё: стресс адаптации, потерю опоры, невысказанное на чужом языке. После переезда связь с собой оборвалась.', icon: 'Globe' },
]

export const painPointsHeadline = 'Узнаёте себя?'

export const painPointsClosing = 'Хватит искать в себе проблемы. Лучше дайте выход силе.'

// ===== MANIFESTO =====
export const manifesto: ManifestoData = {
  quote: '«Удовольствие не создаётся усилием.\nОно появляется, когда исчезает защита.»',
  author: '— Джахан, ведущий ретрита, автор метода Телесной интимности',
}

// ===== PHILOSOPHY SECTION =====
export const philosophyHeadline = 'Три столпа практики'
export const philosophyCentralQuote = ''

export const philosophyPillars: PhilosophyPillar[] = [
  {
    name: 'Движение',
    quote: 'Мы всю жизнь двигались - бегали, танцевали. Это наша база. Через свободное движение тело само находит, где зажатость, и само её отпускает.',
    description: 'Мы будем много двигаться, чтобы высвободить напряжение, очистить мысли и наконец обратить внимание на настоящий момент.',
    iconName: 'move',
  },
  {
    name: 'Дыхание',
    quote: 'Пока тело не расслаблено, до переживаний не добраться. Дыхание - это первый ключ.',
    description: 'Простые дыхательные техники, которым легко следовать. Тело начинает расслабляться само - без усилий и анализа. Многие впервые замечают, где именно держат напряжение.',
    iconName: 'wind',
  },
  {
    name: 'Звук',
    quote: 'Говорить свою правду - это тоже звук. Голос высвобождает то, что застряло в горле и груди.',
    description: 'Мы используем голос - звуки, вибрации, иногда пение. Не нужен слух или талант. Когда голос свободен, уходит то напряжение, которое не достать движением.',
    iconName: 'volume-2',
  },
]

// ===== PHILOSOPHY INSIGHT =====
export const philosophyInsight = 'Мощь, энергия и вкус жизни – живут не в голове. Они живут в том, как вы дышите, двигаетесь и звучите.'

// ===== PHILOSOPHY PERMISSION =====
export const philosophyPermission = 'Хватит себя ремонтировать. Вы не сломаны. Вы просто забыли, на что способно ваше тело, когда ему не мешает голова.'

// ===== RESULTS =====
export const resultsSection = {
  headline: 'Что вас ждёт',
  items: [
    {
      number: '01',
      title: 'Глубокое расслабление',
      text: 'Настоящее расслабление — это не пауза перед следующим рывком. Это выход из постоянной фоновой тревоги.',
      results: ['Тело отпускает глубинные зажимы', 'Останавливается бесконечный поток мыслей', 'Ясность в голове', 'Спокойная энергия без спешки'],
      closing: 'Вы перестаёте жить в режиме постоянной готовности. И начинаете жить из состояния устойчивости.',
      image: '/images/landing/results/step-01-relaxation.webp',
    },
    {
      number: '02',
      title: 'Контакт с телом вместо постоянного напряжения',
      text: 'Мы будем много двигаться, чтобы высвободить напряжение, очистить мысли и наконец обратить внимание на настоящий момент.',
      results: [],
      closing: '',
      image: '/images/landing/results/step-02-body-contact.webp',
      tag: 'Движение',
    },
    {
      number: '03',
      title: 'Спонтанность вместо контроля',
      text: 'Когда тело перестаёт защищаться — появляется свобода быть собой, без фильтров и контроля.',
      results: [],
      closing: '',
      image: '/images/landing/results/step-03-spontaneity.webp',
    },
    {
      number: '04',
      title: 'Контакт, который ощущается',
      text: 'Близость — это не про слова. Это про присутствие, дыхание и способность быть рядом без защит.',
      results: [],
      closing: '',
      image: '/images/landing/results/step-04-felt-contact.webp',
    },
    {
      number: '05',
      title: 'Опыт, который остаётся после ретрита',
      text: 'Это не просто всплеск эмоций за выходные.',
      results: ['Простые телесные практики на каждый день', 'Ясное ощущение телесных «да» и «нет»', 'Способность оставаться устойчивым в стрессе', 'Возвращение радости в повседневность'],
      closing: 'Новое качество присутствия.',
      image: '/images/landing/results/step-05-lasting.webp',
    },
  ],
}

// ===== RETREAT =====
export const retreatSection = {
  headline: 'Что произойдёт за 4 дня',
  location: 'PPL Ocean Retreat Centre',
  locationDescription: 'Сан-Бернардино, рядом с Пенише. Ферма 7 000 м² у океана.',
}

export const retreatDays: RetreatDay[] = [
  {
    day: 1,
    title: 'Приезд и заземление',
    subtitle: 'Тело начинает доверять',
    description: 'Тело начинает доверять. Заселение, знакомство с пространством и группой. Мягкие дыхательные практики. Вечерний круг открытия.',
    practices: ['Заселение и знакомство', 'Мягкие дыхательные практики', 'Круг открытия'],
    emotionalArc: '«Что я здесь делаю? Может, это всё не для меня». Это нормально. Первый день - про разрешение быть.',
    image: '/images/landing/retreat/day1-grounding.webp',
  },
  {
    day: 2,
    title: 'Тело просыпается',
    subtitle: 'Энергия поднимается',
    description: 'Энергия поднимается. Утренние дыхательные практики. Телесное проживание через движение. Групповая сессия.',
    practices: ['Дыхательные практики', 'Движение', 'Групповая сессия', 'Интеграция'],
    emotionalArc: 'Тело перестаёт бороться. В какой-то момент - тишина. Впервые за долгое время - полное присутствие.',
    image: '/images/landing/retreat/day2-water.webp',
  },
  {
    day: 3,
    title: 'Глубина',
    subtitle: 'Мощь, голос, близость',
    description: 'Мощь, голос, близость. Экстатический танец, движение с закрытыми глазами. Голосовые практики. Практики близости и присутствия - через безопасные форматы контакта вы исследуете, как приближаетесь, где напряжение и где доверие.',
    practices: ['Экстатический танец', 'Движение с закрытыми глазами', 'Голосовые практики', 'Практики близости и присутствия'],
    emotionalArc: 'Тело проснулось. Голос, движение, контакт - не по команде, а потому что тело хочет.',
    image: '/images/landing/retreat/day3-circle.webp',
  },
  {
    day: 4,
    title: 'Интеграция и отъезд',
    subtitle: 'Забрать силу с собой',
    description: 'Забрать силу с собой. Мягкие практики. Круг закрытия. Практики для дома.',
    practices: ['Мягкие утренние практики', 'Круг закрытия', 'Практики для дома', 'Отъезд'],
    emotionalArc: 'Увозишь не теорию. Увозишь состояние и инструменты. Через неделю - дышишь глубже. Через месяц - партнёр спрашивает: «Что с тобой случилось?»',
    image: '/images/landing/retreat/day4-beach.webp',
  },
]

export const retreatDailyRhythm = {
  headline: 'Ритм дня',
  subtitle: 'Расписание может немного меняться в зависимости от состояния группы',
  periods: [
    {
      time: 'Утро',
      description: 'Дыхательные и телесные практики. Мягкое пробуждение тела, настройка на день. Завтрак. Активная утренняя сессия телесного проживания.',
    },
    {
      time: 'День',
      description: 'Обед и свободное время - для отдыха, прогулок, уединения или спокойного присутствия. Групповая сессия для проживания и осмысления опыта.',
    },
    {
      time: 'Вечер',
      description: 'Совместный ужин. Мягкое совместное присутствие, круг деления, время у огня или личное пространство в тишине.',
    },
  ],
  integrationNote: 'Между практиками есть время для тишины, прогулок и уединения - чтобы переживания успели улечься в теле.',
}

export const retreatSafety = [
  'Все практики добровольны',
  'Согласие перед каждым парным упражнением',
  'Можно остановиться в любой момент',
  'Все практики в одежде',
  'Опытный фасилитатор рядом',
  'Интервью перед подтверждением',
]

export const safetyHeadline = 'Безопасность'
export const safetySubheadline = 'Все практики проходят в безопасном пространстве с опытным проводником'

// ===== FACILITATOR =====
export const facilitator = {
  name: 'Джахан',
  title: 'Ведущий ретрита, автор метода Телесной близости',
  bio: '',
  credentials: [
    'Преподаватель шиацу',
  ],
  photoUrl: '/images/landing/facilitator.webp',
  telegramChannel: 'https://t.me/duhovkainme',
  telegramChannelText: 'Канал Джахана в Telegram - практики, техники, истории →',
}

// ===== CO-FACILITATOR =====
export const coFacilitator = {
  name: 'Дева Варша',
  title: 'Организатор ретрита, маркетолог',
  bio: 'Люблю создавать праздники без повода, которые становятся лучшими воспоминаниями. Занимаюсь организацией медитационных групп и ретритов и вижу своей миссией дать людям возможность почувствовать себя счастливее и легче — также, как это помогло мне.',
  photoUrl: '/images/landing/co-facilitator.webp',
}

// ===== TESTIMONIALS =====
export const testimonials: Testimonial[] = [
  {
    name: 'Евгения, 43 года',
    text: '«Мама, жена, успешный бизнесмен. Птенцы улетели. А кто я? Куда иду? Старость? Что впереди? Тело раскрепостилось, на душе стало легко. Тотально себя понять и позволить быть такой, какой ты есть. А я знаю, куда мне идти.»',
    resultHighlight: 'Нашла свою силу',
    image: '/images/landing/testimonials/person-1.webp',
    featured: true,
  },
  {
    name: 'Анастасия',
    text: '«Пришла с зажатостью - "вот здесь, в груди, как стена". Через дыхание и движение тело начало оттаивать. К концу второй сессии - запела. Не потому что попросили. Тело само захотело звук.»',
    resultHighlight: 'Тело запело само',
    image: '/images/landing/testimonials/person-2.webp',
    featured: true,
  },
]

export const videoTestimonials: VideoTestimonial[] = [
  {
    name: 'Участница',
    quote: 'Я как будто спала, может год, может два. Сегодня было такое пробуждение - хотелось танцевать.',
    duration: '0:38',
    videoUrl: '/videos/testimonials/testimonial-02-awakening.mp4',
  },
  {
    name: 'Участница',
    quote: 'Это всё вылилось в то, что я уволилась с работы. Хватит терпеть. У меня много энергии творить.',
    duration: '0:27',
    videoUrl: '/videos/testimonials/testimonial-03-quit-job.mp4',
  },
  {
    name: 'Участница',
    quote: 'Когда в конце практики я себя обняла, мне пошли слёзы. Я забыла, как я себя люблю.',
    duration: '0:49',
    videoUrl: '/videos/testimonials/testimonial-04-self-love.mp4',
  },
  {
    name: 'Участница',
    quote: 'Тело ждало. Ждало, чтобы ему дали свободу - просто быть, двигаться, дышать.',
    duration: '1:00',
    videoUrl: '/videos/testimonials/testimonial-05-body-freedom.mp4',
  },
  {
    name: 'Участница',
    quote: 'За час полтора я как будто на семинаре побывала. Очень много всего высвободилось.',
    duration: '1:00',
    videoUrl: '/videos/testimonials/testimonial-06-first-online.mp4',
  },
  {
    name: 'Участник',
    quote: 'Снимите голову, положите в сторону - так круто! Такое качество расслабления тела получил.',
    duration: '0:54',
    videoUrl: '/videos/testimonials/testimonial-07-relaxation.mp4',
  },
]

export const testimonialsHeadline = 'Что говорят участники'
export const videoTestimonialsHeadline = 'Послушайте участников'
export const videoTestimonialsSubheadline = 'Настоящие отзывы после работы с Джаханом'

// ===== VENUE =====
export const venue = {
  headline: 'Где это происходит',
  subtitle: 'PPL Ocean Retreat Centre - Пенише, Португалия',
  description: 'Океан, тишина и дикая природа. 15 минут пешком от уединённого пляжа Атлантики - пространство, чтобы полностью выйти из суеты и вернуться к себе.',
  link: 'https://pplocean.com/ppl_retreat_centre',
  linkText: 'Подробнее о площадке →',
  address: 'Rua Rei Dom Dinis, Casa Buraco do Mocho, Geraldes, 2525-524, Atouguia de Baleia',
  mapLink: 'https://maps.app.goo.gl/P9JxW94kqn2dK8vT8',
}

export const venueHighlights: VenueHighlight[] = [
  { image: '/images/landing/venue/yoga-room.webp', label: 'Просторный зал для практик', alt: 'Зал для практик в PPL Ocean Retreat Centre' },
  { image: '/images/landing/venue/pool-2.webp', label: '25-метровый бассейн', alt: 'Бассейн с родниковой водой' },
  { image: '/images/landing/venue/ocean-view.webp', label: 'Вид на океан', alt: 'Вид на Атлантический океан с территории' },
  { image: '/images/landing/venue/terrace.webp', label: 'Балкон с видом на сад', alt: 'Приватный балкон с видом на сад' },
  { image: '/images/landing/venue/living-room.webp', label: 'Уютная гостиная', alt: 'Гостиная для отдыха и общения' },
  { image: '/images/landing/venue/territory-2.webp', label: 'Фруктовый сад на 7 000 м²', alt: 'Фруктовый сад на территории retreat-центра' },
]

export const accommodationTiers: AccommodationTier[] = [
  { name: 'Место в комнате на троих', description: 'Комната на 3 чел. · Своя ванная', image: '/images/landing/venue/room-atlantic.webp', alt: 'Комната на троих с собственной ванной' },
  { name: 'Место в комнате на двоих', description: 'Комната на 2 чел. · Своя ванная', image: '/images/landing/venue/room-pacific.webp', alt: 'Комната на двоих с собственной ванной' },
  { name: 'Одноместное размещение', description: 'Отдельная комната · Своя ванная · Вид на океан', image: '/images/landing/venue/room-indian.webp', alt: 'Одноместная комната с видом на океан' },
]

export const venueLocation = {
  beach: '15 минут пешком до пляжа',
  shops: '5–15 минут на машине до магазинов и ресторанов',
  lisbon: '1 час на машине от Лиссабона',
  bus: 'Прямой автобус из Лиссабона (остановка в 700 м от центра)',
}

// ===== PRICING =====
export const pricing = {
  currency: 'EUR',
  earlyBirdDeadline: '2026-04-15T23:59:59',
  earlyBirdNote: 'Early bird до 15 апреля - скидка €100',
  groupSize: '20',
  dates: '1–4 мая 2026 · 4 дня, 3 ночи · До 20 участников',
  depositAmount: '100',
  depositNote: 'Депозит €100 · Остаток за 28 дней',
  notIncluded: 'Не включено: авиабилеты, трансфер аэропорт - площадка (организуем групповой).',
  applicationNote: 'После заявки - короткое собеседование (15-20 мин), чтобы познакомиться и убедиться, что тренинг подходит именно вам.',
}

export const pricingTiers: PricingTier[] = [
  {
    name: 'Место в комнате на троих',
    description: 'Комната на 3 чел., своя ванная',
    price: '790',
    earlyBird: '690',
    highlight: false,
  },
  {
    name: 'Место в комнате на двоих',
    description: 'Комната на 2 чел., своя ванная',
    price: '990',
    earlyBird: '890',
    highlight: true,
  },
  {
    name: 'Одноместное размещение',
    description: 'Отдельная комната, вид на океан, своя ванная',
    price: '1290',
    earlyBird: '1190',
    highlight: false,
  },
]

export const pricingIncludes: PricingIncluded[] = [
  { text: 'Проживание (4 дня / 3 ночи)', included: true },
  { text: 'Трёхразовое питание', included: true },
  { text: 'Все практики и сопровождение', included: true },
  { text: 'Групповая интеграция', included: true },
]

export const pricingValueStack = [
  'Практики с фасилитатором (15+ лет опыта)',
  'Проживание в retreat-центре у океана',
  'Трёхразовое домашнее питание',
  'Практики для дома - увозите с собой',
  'Группа до 20 человек - индивидуальное внимание',
  'Один из немногих русскоязычных соматических тренингов в Европе',
]

export const pricingBadge = 'Выбор участников'
export const pricingCTA = 'Забронировать'

// ===== WHO IS THIS FOR =====
export const targetAudience = {
  headline: 'Это для вас, если...',
  items: [
    'В голове всё понимаете, ходите к психологу - а телу не легче',
    'Пьёте таблетки, ходите к специалистам – но чувствуете, что причина глубже. Вы просто потеряли контакт с собой',
    'Живёте с партнёром рядом, но тепла и близости давно нет',
    'Переехали - и как будто потеряли себя. Одиночество, которое не проходит',
    'Не можете плакать, не чувствуете радость - всё как за стеклом',
    'Всё «нормально», но живёте на автопилоте - без кайфа и огня',
    'Тело зажато - в груди, в горле, в плечах. И головой это не отпустить',
    'Сложно расслабиться и довериться - даже когда хочется',
  ],
}

export const targetAudienceNotes = [
  'Можно участвовать без партнёра',
  'Физическая подготовка не нужна',
]

// ===== GALLERY SECTION =====
export const gallerySection = {
  headline: 'Как это выглядит',
  description: 'Настоящие моменты с тренингов',
}

export const galleryImages: GalleryImage[] = [
  {
    src: '/images/landing/gallery/moment-06-circle.webp',
    alt: 'Групповой круг - пространство безопасности',
    caption: 'Безопасность группы',
    category: 'connection',
  },
  {
    src: '/images/landing/gallery/moment-09-eye-contact.webp',
    alt: 'Встреча глаз в парной практике',
    caption: 'Встреча',
    category: 'connection',
  },
  {
    src: '/images/landing/gallery/moment-11-laughter.webp',
    alt: 'Смех в группе - легкость после процесса',
    caption: 'Легкость',
    category: 'joy',
  },
  {
    src: '/images/landing/gallery/moment-14-shiatsu.webp',
    alt: 'Практика шиацу в парах',
    caption: 'Телесная работа',
    category: 'process',
  },
  {
    src: '/images/landing/gallery/moment-12-sunset-circle.webp',
    alt: 'Завершающий круг на закате',
    caption: 'Трансформация',
    category: 'joy',
  },
  {
    src: '/images/landing/gallery/moment-16-training.webp',
    alt: 'Обучение в группе - руки и внимание',
    caption: 'Внимание',
    category: 'process',
  },
  {
    src: '/images/landing/gallery/moment-17-breathing.webp',
    alt: 'Дыхательная практика - расслабление',
    caption: 'Заземление',
    category: 'process',
  },
  {
    src: '/images/landing/gallery/moment-18-savasana.webp',
    alt: 'Группа на матах - шавасана после практики',
    caption: 'Тишина',
    category: 'process',
  },
  {
    src: '/images/landing/gallery/moment-19-jahan-teaching.webp',
    alt: 'Джахан объясняет технику - крупный план',
    caption: 'Внимание мастера',
    category: 'process',
  },
  {
    src: '/images/landing/gallery/moment-20-ecstasy.webp',
    alt: 'Женщина в белом, голова запрокинута - экстаз движения',
    caption: 'Экстаз движения',
    category: 'joy',
  },
  {
    src: '/images/landing/gallery/moment-21-prayer.webp',
    alt: 'Джахан и участница в позе благодарности',
    caption: 'Благодарность',
    category: 'connection',
  },
  {
    src: '/images/landing/gallery/moment-22-beach-pair.webp',
    alt: 'Две женщины сидят на песке вместе',
    caption: 'Близость на песке',
    category: 'connection',
  },
]

// ===== FAQ =====
export const faqItems: FAQItem[] = [
  {
    question: 'Что взять с собой?',
    answer: 'Удобную одежду для движения, купальник (бассейн!), тёплую кофту для вечеров. Полотенца и постельное бельё предоставляются. Коврик для практик тоже есть на месте.',
  },
  {
    question: 'Надо приходить одному или можно с парой?',
    answer: 'Очень круто, если вы придете парой. Ретрит станет огромным вкладом в ваши отношения. Программа ретрита рассчитана как на индивидуальное участие, так и на парное. И в том и в другом случае вы получите удовольствие и узнаете много нового о своем теле.',
  },
  {
    question: 'Какие рекомендации, если мы идем парой?',
    answer: 'Вам нужно заранее договориться — будете ли вы выполнять упражнения только друг с другом или вам ок практиковать с другими участниками. Ответ на этот вопрос почувствуйте интуитивно и честно обсудите со своим партнером. Ни одно из упражнений тренинга не нарушает общепринятых этических норм.',
  },
  {
    question: 'Какие рекомендации, если я иду один?',
    answer: 'Лучшее, что вы можете сделать для себя — приехать в ресурсном состоянии. Качественно высыпайтесь в течение всей недели до тренинга. Исключите алкоголь. И предупредите всех, что вы отключите телефон на 3 дня.',
  },
  {
    question: 'Сколько участников будет на тренинге?',
    answer: 'Это будет камерный тренинг на 20 человек.',
  },
  {
    question: 'Это безопасно?',
    answer: 'Ретрит полностью безопасен. С каждым участником мы проводим собеседование. У нас нет колдунов, шаманов, и людей, которые не умеют выдерживать границы. Практики разработаны таким образом, что вы сами выбираете партнеров и глубину взаимодействия. Весь ретрит от начала и до конца проходит под принципом безопасности и деликатности.',
  },
  {
    question: 'Расскажите про этические аспекты тренинга',
    answer: 'Язык тренинга — это взрослые смыслы для современных людей. Ни одно из упражнений тренинга не нарушает личные границы. Все участники одеты.',
  },
  {
    question: 'На каком языке проходит тренинг?',
    answer: 'На русском. Это один из немногих русскоязычных соматических тренингов в Европе.',
  },
  {
    question: 'Какова политика возврата?',
    answer: 'Полный возврат при отмене за 28+ дней. 50% при отмене за 14–28 дней. Менее 14 дней — перенос на следующий тренинг.',
  },
]

// ===== FINAL CTA =====
export const finalCTA = {
  headline: 'Готовы почувствовать разницу?',
  description: '4 дня в Португалии у океана. До 20 участников. Движение, дыхание, звук - программа, которая меняет то, как вы живёте в своём теле.',
  ctaPrimary: 'Оставить заявку',
  telegramChannel: 'https://t.me/duhovkainme',
  telegramChannelText: 'подпишитесь на канал',
  telegramChannelNote: ' - практики, техники, истории участников',
  healthDisclaimer: 'Тренинг не является медицинской диагностикой. Для медицинских вопросов обратитесь к врачу.',
}

// ===== CONTACT =====
export const contact = {
  telegramChannel: 'https://t.me/duhovkainme',
  telegram: 'https://t.me/viktorykoko',
  whatsapp: 'https://wa.me/351937914120',
  email: 'portugalvarcha@gmail.com',
}

// ===== SOCIAL PROOF BAR =====
export const socialProof = {
  items: [
    '15+ лет практики',
    '50+ тренингов',
    '1500+ участников',
  ],
}

// ===== NAVIGATION =====
export const navItems = [
  { label: 'Метод', href: '#philosophy' },
  { label: 'Программа', href: '#program' },
  { label: 'Ведущий', href: '#facilitator' },
  { label: 'Стоимость', href: '#pricing' },
  { label: 'Вопросы', href: '#faq' },
]