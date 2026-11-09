// English content (UK spelling). Mirrors the structure of pt.ts.

import type { Dict } from "./pt";

export const en: Dict = {
  locale: "en",
  htmlLang: "en",
  common: {
    bookAssessment: "Book an appointment",
    whatsappCta: "Book an appointment on WhatsApp",
    whatsapp: "WhatsApp",
    call: "Call",
    phoneNote: "(call to a Portuguese mobile network)",
    phoneDisplay: "+351 924 098 545",
    seeTreatments: "See treatments",
    allServices: "See all services",
    learnMore: "About this service",
    comingSoon: "Coming soon",
    notifyMe: "Let me know when it opens",
    yearsExperience: "years of experience",
    googleReviews: "Google reviews",
    seeAllReviews: "See all reviews on Google",
    newWindow: "(opens in a new window)",
    home: "Home",
    menu: "Menu",
    closeMenu: "Close menu",
    openMenu: "Open menu",
    language: "Mudar para português",
    languageShort: "PT",
    scroll: "Scroll down",
    floatingWhatsapp: "Contact us on WhatsApp",
    directions: "Get directions",
    sendMessage: "Send a message",
    close: "Close",
    previous: "Previous",
    next: "Next",
    photo: "Photo",
    video: "Video",
    watchVideo: "Watch video",
  },
  nav: { home: "Home", services: "Physiotherapy", consultations: "Consultations", about: "About", contact: "Contact", comingSoon: "Coming soon" },
  wa: {
    general: "Hello, I'd like to book an appointment at Fisio4you.",
    service: "Hello, I'd like to book a {s} appointment.",
    problem: "Hello, I have {p} and I'd like to book an appointment.",
    notify: "Hello, I'd like to be notified when {s} becomes available.",
  },
  chat: {
    status: "WhatsApp",
    greeting: "Hello. How can we help?",
    book: "Book an appointment",
    quick: [
      { label: "Ask about prices", msg: "Hello, I'd like to know your appointment prices." },
      { label: "Another question", msg: "Hello, I have a question for Fisio4you." },
    ],
    placeholder: "Type your message…",
    redirecting: "Opening WhatsApp…",
    tooltip: "Have a question? Message us on WhatsApp.",
    open: "Open WhatsApp chat",
    close: "Close chat",
    send: "Send message",
    dismiss: "Dismiss",
  },
  hours: {
    weekdays: "Monday to Friday",
    weekdaysShort: "Mon–Fri",
    saturday: "Saturday",
    sunday: "Sunday",
    closed: "Closed",
    title: "Opening hours",
  },
  meta: {
    home: {
      title: "Physiotherapy in Portimão | Fisio4you, Rehabilitation Centre",
      description:
        "Physiotherapy clinic in Portimão: musculoskeletal injuries, sports rehabilitation and postnatal care. Ultrasound and a 100 m² rehabilitation gym.",
    },
    services: {
      title: "Physiotherapy Services in Portimão | Fisio4you",
      description:
        "Musculoskeletal and dermatofunctional physiotherapy in Portimão: sports injuries, pain, rehab after surgery, postnatal care and diastasis recti.",
    },
    consultations: {
      title: "Consultations in Portimão: Clinical Pilates, Psychology, Physical Medicine and Osteopathy | Fisio4you",
      description: "Clinical Pilates, Psychology, Physical Medicine and Osteopathy consultations at Fisio4you in Portimão. See what each one treats and book your appointment.",
    },
    comingSoon: {
      title: "Coming soon: Physical Medicine, Osteopathy, Clinical Pilates and Psychology | Fisio4you",
      description: "New specialities coming to Fisio4you in Portimão. Ask to be notified on WhatsApp.",
    },
    about: {
      title: "About Fisio4you | Physiotherapy Clinic in Portimão",
      description: "Physiotherapy clinic in Portimão run by physiotherapist Mário Barroso, with Angela Brazona in dermatofunctional physiotherapy. Meet the team, see how we work and view the facilities.",
    },
    contact: {
      title: "Contact & Opening Hours | Fisio4you Portimão",
      description: "Contact Fisio4you, a physiotherapy clinic in Portimão: phone +351 924 098 545, WhatsApp, address and opening hours. Book your appointment.",
    },
    privacy: { title: "Privacy Policy | Fisio4you", description: "How Fisio4you, Lda processes your personal data." },
    terms: { title: "Terms of Use | Fisio4you", description: "Terms of use of the fisio4you.pt website." },
    cookies: { title: "Cookie Policy | Fisio4you", description: "Which cookies fisio4you.pt uses and how to manage consent." },
  },

  home: {
    hero: {
      eyebrow: "Rehabilitation Centre · Portimão",
      lines: ["Physiotherapy", "made for you"],
      sub: "Physiotherapy in Portimão for musculoskeletal injuries and postnatal recovery, with ultrasound and a rehabilitation gym on site.",
    },
    stack: {
      title: "Everything you need, in one place",
      more: "About this service",
    },
    hub: {
      title: "Treatment and rehabilitation under one roof",
      text: "Musculoskeletal physiotherapy includes ultrasound, the rehabilitation gym, ice bath and sauna. Dermatofunctional physiotherapy focuses on postnatal recovery and diastasis recti.",
      cta: "View our services",
      items: { eco: "Ultrasound", gym: "Rehabilitation gym", ice: "Ice bath and sauna", postnatal: "Postnatal and diastasis" },
    },
    booking: {
      title: "Contact",
      text: "We reply to messages during clinic hours.",
      hoursLabel: "Hours",
    },
    bodyMap: {
      title: "How we treat each area",
      intro: "Choose an area to see how treatment works, from assessment to independence. Whether treatment is indicated is confirmed at your appointment.",
      listLabel: "Body areas",
      commonLabel: "Common conditions",
      talk: "Describe my case",
      phases: ["Assessment", "Treatment", "Independence"],
      regions: [
        {
          id: "cervical", label: "Neck",
          title: "Neck",
          text: "Neck pain and stiffness, headaches of cervical origin or pain running down the arm, often linked to sustained postures such as desk work.",
          steps: [
            "Neck and shoulder mobility, your working posture and, if the pain runs down your arm, neurological tests.",
            "Manual therapy and mobility and strength exercises for the neck and upper back.",
            "Exercises to keep up at home and changes to your routine, such as your desk set-up.",
          ],
          common: ["Neck pain", "Wry neck", "Pain radiating into the arm"],
          service: "msk", waTopic: "neck pain",
        },
        {
          id: "ombro", label: "Shoulder",
          title: "Shoulder",
          text: "Pain when raising your arm, loss of strength or instability, and rehab after shoulder surgery.",
          steps: [
            "Movement and strength tests and, when indicated, ultrasound to look at the tendons.",
            "Manual therapy and progressively loaded exercise for the shoulder and shoulder-blade muscles.",
            "A phased return to overhead movements, in sport or at work.",
          ],
          common: ["Rotator cuff tendinopathy", "Frozen shoulder", "After surgery"],
          service: "msk", waTopic: "shoulder pain",
        },
        {
          id: "coluna", label: "Back",
          title: "Back and spine",
          text: "Low or mid back pain, recent or persistent, sometimes with pain running down the leg.",
          steps: [
            "The history of your pain, movement tests and, if the pain runs down your leg, neurological tests.",
            "Manual therapy and exercise to restore mobility and strength in the trunk.",
            "An exercise plan to carry on with, at home or in the gym.",
          ],
          common: ["Low back pain", "Disc herniation", "Sciatica"],
          service: "msk", waTopic: "back pain",
        },
        {
          id: "abdomen", label: "Abdomen",
          title: "Abdomen and postnatal",
          text: "Recovery of the abdominal wall and pelvic floor after pregnancy, within our dermatofunctional physiotherapy service.",
          common: ["Diastasis recti", "Postnatal recovery", "C-section scar"],
          service: "dermato", waTopic: "a postnatal / diastasis recti concern",
        },
        {
          id: "anca", label: "Hip",
          title: "Hip",
          text: "Hip or groin pain when walking, running or climbing stairs, and rehab after hip replacement.",
          steps: [
            "Hip mobility, glute strength and a look at how you walk or run.",
            "Manual therapy and strength and control exercise for the hip and trunk, in the gym.",
            "Load built up gradually towards walking, running or sport.",
          ],
          common: ["Gluteal tendinopathy", "Groin pain", "Hip replacement"],
          service: "msk", waTopic: "hip pain",
        },
        {
          id: "joelho", label: "Knee",
          title: "Knee",
          text: "Sports injuries, pain when running or squatting and rehab after surgery, such as ACL reconstruction.",
          steps: [
            "Stability, strength and movement tests and, when indicated, ultrasound.",
            "Manual therapy and supervised exercise in the gym, with progressive load.",
            "Physical tests and set criteria before you return to training and competition.",
          ],
          common: ["ACL", "Meniscus", "Patellar tendinopathy"],
          service: "msk", waTopic: "knee pain",
        },
        {
          id: "tornozelo", label: "Ankle",
          title: "Ankle and foot",
          text: "Recurrent or poorly healed sprains, Achilles pain or pain under the foot.",
          steps: [
            "Stability and balance tests and, when indicated, ultrasound of the ligaments and tendon.",
            "Manual therapy and exercise for strength, balance and control of the foot and lower leg.",
            "Jumping, running and changes of direction, in stages, before you return to sport.",
          ],
          common: ["Ankle sprain", "Achilles tendinopathy", "Plantar fasciitis"],
          service: "msk", waTopic: "ankle/foot pain",
        },
      ],
      recovery: {
        title: "Recovery between training sessions",
        text: "Ice bath and sauna for anyone who trains regularly.",
        link: "See the recovery area",
      },
    },
    featured: {
      title: "Physiotherapy services",
      intro: "Two areas of practice, each with its own lead: Mário Barroso for musculoskeletal physiotherapy and Angela Brazona for dermatofunctional physiotherapy.",
      includesLabel: "Includes",
    },
    photoStrip: {
      title: "The space and the team",
      sub: "Treatment rooms, a rehabilitation gym and a recovery area, where our physiotherapists guide every stage of treatment.",
      pause: "Pause the photos",
      play: "Play the photos",
    },
    instagram: {
      title: "The clinic on Instagram",
      intro: "Short videos on physical testing, treatments and day-to-day work at the clinic. Videos in Portuguese.",
      follow: "Follow on Instagram",
      open: "Watch on Instagram",
      badge: "Reel",
    },
    visit: {
      title: "Inside the clinic",
      intro: "From assessment to your last exercise, everything happens in one place.",
      stops: [
        { media: "brand-room", title: "Reception", text: "Arrive, check in and meet the physiotherapist who will look after you." },
        { media: "service-eco", title: "Assessment room", text: "Where we hear your story and, when indicated, use ultrasound." },
        { media: "service-msk", title: "Treatment room", text: "Manual therapy and ultrasound-guided techniques, in private." },
        { media: "service-gym", title: "100 m² gym", text: "Supervised exercise, from your first steps to your return to sport." },
        { media: "service-recovery", title: "Ice bath", text: "Cold-water immersion to recover after training and competition." },
        { media: "recovery-sauna", title: "Sauna", text: "Heat to relax your muscles." },
      ],
    },
    eco: {
      eyebrow: "Technology",
      title: "We don't treat blind.",
      text: "With ultrasound, we assess muscles, tendons and ligaments in real time. That helps us understand what's going on, track your progress and apply ultrasound-guided techniques with greater precision.",
      points: [
        { icon: "target", title: "More precise assessment", text: "See the injured structure, not just the symptoms." },
        { icon: "scan", title: "Targeted treatment", text: "Ultrasound-guided techniques applied exactly where needed." },
        { icon: "eye", title: "Visible progress", text: "Compare images throughout your treatment." },
      ],
      cta: "More about ultrasound",
      caption: "Musculoskeletal ultrasound: muscles, tendons and ligaments seen in real time.",
    },
    journey: {
      eyebrow: "Your journey",
      title: "From first contact to getting back to what you love",
      steps: [
        { title: "Assessment", text: "We listen to your story, assess how you move and, when indicated, use ultrasound." },
        { title: "Tailored plan", text: "Clear goals and a plan built around you, your routine and your sport." },
        { title: "Treatment + exercise", text: "Hands-on therapy and active work in the rehabilitation gym." },
        { title: "Return & prevention", text: "Back to training, work or life without pain — and fewer relapses." },
      ],
    },
    why: {
      eyebrow: "Why Fisio4you",
      title: "Why Fisio4you",
      items: [
        { icon: "clock", title: "Experience", text: "Mário has 16 years of experience treating injuries and guiding recoveries." },
        { icon: "scan", title: "Technology", text: "Ultrasound and ultrasound-guided techniques at the service of treatment." },
        { icon: "building", title: "All in one place", text: "Physiotherapy, gym and recovery — no running between places." },
      ],
    },
    founder: {
      eyebrow: "Founder and physiotherapist",
      name: "Mário Barroso",
      lead: "A physiotherapist with 16 years of experience treating injuries and guiding recoveries, from day one to getting back to what you love.",
      bio: ["[[Mário's text, 3–4 sentences: background, specialisations and why he founded Fisio4you.]]"],
      timeline: [
        { value: "[[year]]", label: "Started clinical practice" },
        { value: "[[year]]", label: "Founded Fisio4you" },
        { value: "[[no.]]", label: "Specialities" },
      ],
      cta: "Meet the team",
    },
    team: {
      eyebrow: "Team",
      title: "Clinical team",
    },
    reviews: {
      title: "Patient reviews",
      photoCaption: "Mário Barroso with athletes in the Fisio4you gym.",
      source: "Google review",
      all: "See all reviews on Google",
      placeholder: "[Google review to be added]",
      pendingRating: "Verified reviews on Google",
    },
    coming: {
      eyebrow: "Coming soon",
      title: "Coming soon",
      text: "We will also offer",
    },
    insurance: "Fisio4you does not currently have agreements with insurers or health schemes.",
  },

  ctaFinal: {
    title: "Book your appointment",
    sub: "On WhatsApp or by phone. If you have scans or medical reports, please bring them to your first assessment.",
    whatsapp: { title: "WhatsApp", text: "The quickest way to book.", cta: "Send a message" },
    phone: { title: "Phone", text: "Prefer to talk?", cta: "Call" },
    directions: { title: "Getting here", text: "Parking and landmark details to be confirmed.", cta: "Open in Google Maps" },
  },

  map: {
    title: "Map",
    open: "Open in Google Maps",
  },

  team: [
    {
      media: "team-mario",
      name: "Mário Barroso",
      role: "Founder and physiotherapist",
      focus: "Founded Fisio4you to support musculoskeletal injuries and athletes' recovery from day one through to a full return to activity. Has 16 years of clinical experience in rehabilitation and sports performance, using ultrasound and ultrasound-guided techniques in assessment and treatment. [[Professional registration no. and relevant training]]",
    },
    {
      media: "team-angela",
      name: "Angela Brazona",
      role: "Physiotherapist",
      focus: "Focuses on dermatofunctional physiotherapy and women's health, supporting pregnancy and the postpartum period, and treating abdominal diastasis, scars, lymphatic drainage and lipoedema. Follows each case from the initial assessment to independence, with a plan reviewed throughout treatment. [[Professional registration no. and relevant training]]",
    },
  ],

  servicesPage: {
    eyebrow: "Services",
    title: "Physiotherapy services",
    sub: "Musculoskeletal physiotherapy and dermatofunctional physiotherapy. Each service starts with an individual assessment, which sets the treatment plan.",
    available: "Available services",
  },

  servicePage: {
    faq: "Frequently asked questions",
    related: "Also at Fisio4you",
    write: "Describe",
    seeService: "See the service",
    meetTeam: "Meet the team",
    onThisPage: "On this page",
    howNav: "How it works",
    faqNav: "FAQs",
    areas: {
      title: "Two areas, one clinic",
      intro: "Each area has its own lead physiotherapist. Choose one to see what it treats.",
      eyebrow: "Physiotherapy",
      treats: "What it treats",
      items: {
        msk: {
          name: "Musculoskeletal",
          what: "Injuries and pain in muscles, tendons, joints and the spine.",
          treats: ["Sports injuries", "Tendinopathies", "Low back and neck pain", "Rehab after surgery"],
          by: "With physiotherapist Mário Barroso",
          mediaId: "area-msk",
        },
        dermato: {
          name: "Dermatofunctional",
          what: "Health and aesthetics: postnatal care, lymphatic drainage, post-surgery care, lipoedema and body contouring.",
          treats: ["Postnatal and diastasis", "Lymphatic drainage", "Post-surgery and scars", "Lipoedema", "Body aesthetics"],
          by: "With physiotherapist Angela Brazona",
          mediaId: "service-dermato",
        },
      },
    },
  },

  services: {
    msk: {
      name: "Musculoskeletal Physiotherapy",
      short: "Assessment and treatment of sports injuries, low back and neck pain, tendinopathies and rehab after orthopaedic surgery.",
      mediaId: "msk-card",
      meta: {
        title: "Musculoskeletal Physiotherapy in Portimão | Fisio4you",
        description:
          "Sports injuries, low back and neck pain, tendinopathies and rehab after surgery in Portimão. Ultrasound assessment and a rehabilitation gym.",
      },
      heroTitle: "Musculoskeletal Physiotherapy",
      heroSub: "Assessment and treatment of injuries and pain in muscles, tendons, joints and the spine, using manual therapy, therapeutic exercise and ultrasound when indicated.",
      facts: [
        { icon: "scan", text: "Ultrasound in assessment" },
        { icon: "dumbbell", text: "100 m² rehabilitation gym" },
        { icon: "snowflake", text: "Ice bath and sauna" },
        { icon: "clock", text: "Mário Barroso, 16 years' experience" },
      ],
      specialist: "team-mario",
      forWho: {
        title: "Most common conditions",
        intro: "We treat athletes, physically active people and anyone with pain or restricted movement in daily life. Whether treatment is indicated is confirmed at the assessment.",
        items: [
          { icon: "activity", title: "Sprains and ligament injuries", text: "Ankle, knee and wrist." },
          { icon: "flame", title: "Muscle tears and strains", text: "Hamstrings, calves, quadriceps and other muscle groups." },
          { icon: "repeat", title: "Tendinopathies", text: "Shoulder, elbow, knee and Achilles tendon." },
          { icon: "bone", title: "Low back and neck pain", text: "Including disc herniation and pain radiating into the limbs." },
          { icon: "stethoscope", title: "Post-surgical rehab", text: "Anterior cruciate ligament, meniscus, shoulder and joint replacement." },
          { icon: "clock", title: "Chronic pain", text: "Pain lasting more than three months. Treatment prioritises exercise and restoring function." },
        ],
      },
      includes: {
        title: "What treatment includes",
        intro: "Assessment, treatment and recovery all happen at the same clinic, with no need to go anywhere else.",
      },
      modules: [
        {
          id: "ecografia",
          noChapter: true,
          nav: "Ultrasound",
          summary: "See the injury and guide treatment",
          eyebrow: "Assessment",
          title: "Ultrasound & guided techniques",
          text: "Ultrasound shows muscles, tendons and ligaments in real time, at rest and in motion. It is painless and uses no radiation. At the clinic, it complements the physical assessment, helps track progress and guides ultrasound-guided techniques.",
          mediaId: "service-eco",
          points: [
            { icon: "eye", title: "Assessment", text: "A view of the affected structure, alongside the clinical tests." },
            { icon: "target", title: "Targeted treatment", text: "Ultrasound-guided techniques applied with the target structure in view." },
            { icon: "trending", title: "Follow-up", text: "Images compared throughout treatment." },
          ],
          itemsTitle: "Ultrasound-guided techniques",
          items: [
            { title: "[[Technique 1]]", text: "[[2–3 lines in plain language.]]" },
            { title: "[[Technique 2]]", text: "[[2–3 lines in plain language.]]" },
            { title: "[[Technique 3]]", text: "[[2–3 lines in plain language.]]" },
          ],
          note: "In physiotherapy, ultrasound is used for functional assessment and to guide treatment. It does not replace diagnostic scans requested by a doctor.",
        },
        {
          id: "terapia-manual",
          nav: "Manual therapy",
          summary: "Hands-on techniques, on the treatment couch",
          eyebrow: "Treatment",
          title: "Manual therapy",
          text: "Hands-on techniques applied to the joints, muscles and soft tissue, to help ease pain and restore mobility. It takes place on the treatment couch, is adapted to the stage of your injury and prepares your body for exercise.",
          mediaId: "manual-therapy",
          points: [
            { title: "Joint mobilisation", text: "Targeted movements for joints with limited range." },
            { title: "Soft tissue", text: "Work on the muscles, tendons and fascia of the affected area." },
            { title: "Link to exercise", text: "Progress made on the couch is consolidated in the gym." },
          ],
        },
        {
          id: "ginasio",
          nav: "Gym",
          summary: "Supervised exercise through to your return to activity",
          eyebrow: "Active rehab",
          title: "100 m² rehabilitation gym",
          text: "Therapeutic exercise is supervised by physiotherapists and matched to your stage of recovery. Your plan moves from hands-on treatment to strength, mobility and motor control work without leaving the clinic.",
          mediaId: "gym",
          points: [
            { icon: "dumbbell", title: "Therapeutic exercise", text: "Supervised, with progressive loading." },
            { icon: "footprints", title: "Reconditioning", text: "Rebuilding physical capacity and load tolerance." },
            { icon: "activity", title: "Return to sport", text: "Decisions based on physical testing and defined criteria." },
            { icon: "shield", title: "Injury prevention", text: "Strength and motor control work to reduce the risk of re-injury." },
          ],
        },
        {
          id: "recuperacao",
          nav: "Ice and sauna",
          summary: "Recovery between training and competition",
          eyebrow: "Recovery",
          title: "Cold therapy (ice bath) & sauna",
          text: "Cold-water immersion means submerging the body in cold water for a controlled period. At Fisio4you it takes place in the clinic's ice bath, as part of the recovery plan of people who train regularly, and use is always guided by the team.",
          mediaId: "service-recovery",
          points: [
            { title: "Sauna", text: "Heat exposure, used for muscle relaxation." },
            { title: "Compression therapy", text: "Boots that compress and release the legs in cycles, used to recover after exertion." },
          ],
          itemsTitle: "General contraindications",
          items: [
            { title: "General contraindications", text: "Cardiovascular conditions, uncontrolled blood pressure, pregnancy, altered sensation or circulation, among others." },
          ],
          video: "video-circuito",
          panel: {
            moreText: "It is used mainly after demanding training and competition. Studies point to less muscle soreness and a lower feeling of fatigue in the days after exertion, but the effect varies from person to person and it does not replace treatment or rest.",
            secondMediaId: "strip-pressotherapy",
            sessionTitle: "What a session involves",
            session: [
              { title: "Before", text: "We confirm that it's suitable for you and choose the timing according to your training and stage of recovery." },
              { title: "During", text: "Cold-water immersion, with controlled timing and guidance from the team. [[water temperature and immersion time: confirm with Mário]]" },
              { title: "After", text: "Your body warms up gradually, with advice for your next training sessions." },
            ],
            indicatedTitle: "When it may be indicated",
            indicated: ["After intense training and competition", "Between closely spaced matches or events", "During periods of high training load"],
            alsoTitle: "Also in the recovery area",
            waTopic: "cold therapy",
            cta: "Ask about cold therapy",
          },
        },
      ],
      how: {
        title: "How treatment works",
        intro: "Treatment is organised in four stages. Goals and progress are reviewed with you throughout.",
        steps: [
          {
            title: "Assessment",
            line: "First, we assess.",
            text: "Clinical history, movement testing and, when indicated, ultrasound.",
            details: ["History of the injury, your routine and your goals", "Movement, strength and mobility tests", "Ultrasound, when it helps characterise the injury"],
            uses: ["ecografia"],
          },
          {
            title: "Plan",
            line: "Then, the plan.",
            text: "Treatment goals and an estimated duration, set according to your activity.",
            details: ["Goals for each stage of your recovery", "An estimate of the number of sessions, reviewed as you progress"],
          },
          {
            title: "Treatment and exercise",
            line: "We treat and train.",
            text: "Manual therapy, ultrasound-guided techniques when indicated, and supervised exercise.",
            details: ["Manual therapy and ultrasound-guided techniques, when indicated", "Supervised exercise with progressive load", "Regular reassessment to adjust the plan"],
            uses: ["ecografia", "ginasio"],
          },
          {
            title: "Independence & prevention",
            line: "Finally, independence.",
            text: "An exercise plan to maintain progress and reduce the risk of recurrence.",
            details: ["Defined criteria for returning to training and competition", "Exercises to continue at home or build into your training"],
            uses: ["ginasio", "recuperacao"],
          },
        ],
      },
      distinct: {
        title: "Who treats you",
        text: "Musculoskeletal physiotherapy is led by Mário Barroso, a physiotherapist with 16 years of experience in injury treatment and sports rehabilitation.",
        points: ["Ultrasound in assessment and follow-up", "100 m² rehabilitation gym", "Ice bath and sauna"],
      },
      duration: {
        title: "Duration and frequency",
        text: "The number and frequency of sessions are set after the initial assessment and reviewed during treatment.",
      },
      faq: [
        // With no confirmed answer, the question stays hidden (the empty field removes the item).
        { q: "Do I need a doctor's referral?", a: "[[confirm with Mário: is a referral needed? Short answer]]" },
        { q: "How many sessions are needed?", a: "It depends on the injury, how long you've had it and your goals. An estimate is set at the initial assessment and reviewed during treatment." },
        { q: "My pain has lasted several months. Can physiotherapy help?", a: "In many cases, yes. The assessment looks for what is keeping the pain going and allows a plan with realistic goals." },
        { q: "Does ultrasound hurt or use radiation?", a: "No. It's a painless scan: a gel is applied and the probe glides over the skin. It uses sound waves and involves no radiation." },
        { q: "How is ultrasound different from an MRI?", a: "Ultrasound shows muscles, tendons and ligaments in real time, at rest and in motion, and can be repeated throughout treatment. An MRI is a diagnostic scan prescribed by a doctor. In physiotherapy, ultrasound is used to assess and monitor, not to replace medical imaging." },
        { q: "Can I keep training during treatment?", a: "In many cases, yes, with adjustments. Training load is matched to your stage of recovery." },
        { q: "Can I use the gym, ice bath or sauna without physiotherapy?", a: "[[confirm with Mário: gym, ice bath and sauna without physiotherapy?]]" },
        { q: "What should I bring to my first appointment?", a: "Comfortable clothing that lets us see and move the area being treated, and any scans or medical reports you have." },
      ],
      related: ["dermato"],
      page: {
        treatments: {
          techniques: {
            id: "tecnicas", nav: "Techniques",
            title: "Treatment techniques",
            intro: "Minimally invasive and non-invasive techniques, used alongside an individual physiotherapy plan.",
            mediaId: "service-msk",
            usesLabel: "Used for",
            items: [
              {
                id: "epte", name: "EPTE", full: "Ultrasound-guided percutaneous therapeutic electro-puncture",
                text: "A low-intensity electrical current, applied through a very fine needle guided by ultrasound straight to the injury, stimulates tissue regeneration, especially in tendons.",
                uses: ["Achilles tendon", "Patellar tendinopathy", "Tennis elbow"],
              },
              {
                id: "mesoterapia", name: "Mesotherapy",
                text: "Micro-injections of small amounts of therapeutic substances into the area being treated, to relieve pain, reduce inflammation and help tissue recover.",
                uses: ["Muscle pain", "Tendinopathies", "Contractures", "Inflammation"],
              },
              {
                id: "neuromodulacao", name: "Ultrasound-guided percutaneous neuromodulation",
                text: "Low-frequency electrical stimulation through very fine needles, guided by ultrasound, on specific peripheral nerves, to reduce pain and improve muscle activation.",
                uses: ["Chronic pain", "Neuropathic pain", "Neuromuscular dysfunction"],
              },
              {
                id: "fotobiomodulacao", name: "Photobiomodulation",
                text: "Low-intensity light, by laser or LED, that acts at cellular level to relieve pain, reduce inflammation and support recovery. Painless and non-invasive.",
                uses: ["Muscle injuries", "Tendinopathies", "Joint pain", "Soft tissue"],
              },
            ],
            note: "Techniques are performed by qualified professionals and adapted to each person's clinical condition. Suitability is confirmed at assessment.",
          },
          recovery: {
            id: "recovery", nav: "Recovery session",
            title: "Recovery session",
            text: "Letting the body recover is as important as training. A Recovery session brings recovery techniques together in time set aside for rest, to ease fatigue and prepare the body for the next session.",
            mediaId: "service-recovery",
            // Vídeo do circuito de recuperação no lugar da foto da banheira (pedido do utilizador, 09/11)
            video: "video-circuito",
            secondMediaId: "strip-pressotherapy",
            plansTitle: "Choose your session",
            plans: [
              { name: "Recovery Start", parts: ["botas", "gelo"] },
              { name: "Recovery Active", parts: ["botas", "massagem"] },
              { name: "Recovery Plus", parts: ["massagem", "botas", "gelo"] },
              { name: "Recovery Elite", parts: ["ativa", "botas", "gelo", "massagem"] },
            ],
            partsTitle: "What it can include",
            parts: [
              { key: "botas", title: "Compression boots", text: "Sequential pneumatic compression that supports circulation and leaves the legs feeling lighter." },
              { key: "gelo", title: "Ice bath", text: "Cold-water immersion that can temporarily reduce muscle soreness and fatigue." },
              { key: "massagem", title: "Sports massage", text: "Eases muscle tension, improves mobility and prepares the muscles for effort." },
              { key: "ativa", title: "Active recovery", text: "Light exercise, cycling or mobility work to boost circulation and ease stiffness." },
            ],
            benefitsTitle: "Benefits",
            benefits: ["Less muscle fatigue", "Less muscle tension", "Better circulation", "Post-training recovery", "Physical and mental relaxation", "Ready for what's next"],
            waTopic: "Recovery session",
            cta: "Book a Recovery session",
          },
          sport: {
            id: "desporto", nav: "Sport",
            title: "Testing and prevention in sport",
            intro: "For athletes who want to return safely or reduce the risk of another injury.",
            items: [
              {
                id: "isocinetica", title: "Isokinetic assessment",
                text: "Specialised equipment measures muscle strength, power and endurance at a constant speed, and compares both limbs.",
                points: ["Identifies imbalances and asymmetries", "Tracks rehab progress", "Helps decide the return to sport"],
                mediaId: "athletes",
              },
              {
                id: "prevencao", title: "Injury prevention training",
                text: "An individual plan that considers the sport, injury history, playing position and each athlete's needs.",
                points: ["Corrects imbalances and strength deficits", "Improves physical performance", "With isokinetic testing when needed"],
                mediaId: "gym",
              },
            ],
          },
        },
        lead: "Sports injuries, pain and rehab after surgery, with physiotherapist Mário Barroso.",
        heroWide: "wide-msk",
        relatedPhoto: "related-msk",
        areas: true,
        about: {
          statement: ["", "Musculoskeletal physiotherapy", " assesses and treats injuries and pain in the muscles, tendons, joints and spine."],
          text: [
            "Every treatment starts with an individual assessment: clinical history, movement testing and, when indicated, ultrasound. From there we set a plan that combines manual therapy, supervised exercise and recovery, reviewed with you as you progress.",
            "We see athletes, physically active people and anyone with pain or limited movement in daily life. Whether treatment is indicated is confirmed at the assessment.",
          ],
          listTitle: "What we treat",
        },
        person: {
          bio: "has been a physiotherapist for 16 years and runs Fisio4you. He leads musculoskeletal physiotherapy, from sports injuries to rehab after surgery.",
        },
      },
    },
    dermato: {
      name: "Dermatofunctional Physiotherapy",
      short: "Postnatal recovery, lymphatic drainage, post-surgery and scar care, lipoedema, body contouring and therapeutic massage.",
      mediaId: "service-dermato",
      meta: {
        title: "Dermatofunctional Physiotherapy in Portimão | Fisio4you",
        description:
          "Dermatofunctional physiotherapy in Portimão: postnatal care and diastasis recti, lymphatic drainage, post-surgery and scar care, lipoedema and body contouring, with physiotherapist Angela Brazona.",
      },
      heroTitle: "Dermatofunctional Physiotherapy",
      heroSub: "Health and aesthetics in balance: postnatal recovery, lymphatic drainage, post-surgery and scar care, lipoedema and body contouring, always starting from an individual assessment.",
      facts: [
        { icon: "baby", text: "Postnatal care and diastasis recti" },
        { icon: "flower", text: "Manual lymphatic drainage" },
        { icon: "sparkles", text: "Post-surgery and scar care" },
        { icon: "heart", text: "Angela Brazona, physiotherapist" },
      ],
      specialist: "team-angela",
      explainer: {
        nav: "Diastasis",
        title: "What is diastasis recti?",
        intro: "Diastasis recti is a separation of the two rectus abdominis muscles along the midline of the abdomen. Select a stage to see how it develops.",
        stagesLabel: "Stages",
        legend: { muscle: "Rectus abdominis muscles", linea: "Linea alba", gap: "Gap between the muscles" },
        stages: [
          {
            label: "Before pregnancy",
            title: "Side by side",
            text: "The two rectus abdominis muscles sit side by side, joined in the middle by the linea alba, a firm band of connective tissue that contributes to abdominal stability.",
          },
          {
            label: "During pregnancy",
            title: "Adapting to pregnancy",
            text: "As the uterus grows, the linea alba stretches and widens and the muscles move apart. This is a normal adaptation of the body.",
          },
          {
            label: "After birth",
            title: "When the gap persists",
            text: "For many women the gap narrows in the months after birth. When it persists and the abdominal wall still lacks firmness, it is called diastasis recti.",
          },
        ],
        assessTitle: "How we assess it",
        assess: [
          "We measure the width and depth of the gap, by palpation and, when indicated, with ultrasound.",
          "We observe how the abdominal wall responds to breathing, effort and movement.",
          "We repeat the assessment during your care, so progress is recorded objectively.",
        ],
      },
      forWho: {
        title: "Most common conditions",
        intro: "Every treatment starts with an individual assessment that identifies each person's needs and goals.",
        items: [
          { icon: "baby", title: "Postnatal abdominal rehabilitation", text: "Diastasis recti, abdominal strength and tone, posture and the pelvic floor.", anchor: "pos-parto" },
          { icon: "flower", title: "Manual lymphatic drainage", text: "During pregnancy, after birth and for swelling and fluid retention.", anchor: "drenagem" },
          { icon: "stethoscope", title: "Post-surgery and scars", text: "Lymphatic drainage and scar treatment after surgery.", anchor: "pos-operatorio" },
          { icon: "heart", title: "Lipoedema protocol", text: "Drainage, soft-tissue techniques and devices to ease discomfort.", anchor: "lipedema" },
          { icon: "sparkles", title: "Body contouring", text: "Body shape, localised fat, cellulite and skin laxity.", anchor: "remodelacao" },
          { icon: "activity", title: "Therapeutic and facial massage", text: "Muscle tension in the back and facial relaxation.", anchor: "massagem-terapeutica" },
        ],
      },
      how: {
        title: "How your care works",
        intro: "The plan starts from where you are now, and each stage is explained before it begins.",
        steps: [
          {
            title: "Assessment",
            line: "First, we assess.",
            text: "An individual assessment of the changes, needs and goals of each person.",
            details: ["Clinical history: pregnancy, birth, surgery and current symptoms", "Assessment of the tissues, abdominal wall and posture, depending on the treatment"],
          },
          {
            title: "Plan",
            line: "Then, the plan.",
            text: "Techniques are chosen according to the assessment and your goals.",
            details: ["Techniques chosen according to the assessment and your goals", "After surgery, it respects the healing stage and the medical team's advice"],
          },
          {
            title: "Treatment",
            line: "We treat, step by step.",
            text: "Manual techniques, lymphatic drainage, therapeutic exercise and devices, when appropriate.",
            details: ["Manual techniques, lymphatic drainage and therapeutic exercise", "Devices, when the assessment supports them", "Regular reassessment to adjust the plan"],
          },
          {
            title: "Independence",
            line: "Finally, independence.",
            text: "Exercises and self-care to continue at home.",
            details: ["Exercises and self-care to continue at home, explained in your sessions", "A safe return to physical activity and daily tasks"],
          },
        ],
      },
      distinct: {
        title: "Who treats you",
        text: "Dermatofunctional physiotherapy is led by Angela Brazona, a physiotherapist who works in women's health and in care that brings health and aesthetics together.",
        points: ["An individual assessment before every plan", "Manual techniques, lymphatic drainage and devices", "Guided exercise and a home plan"],
      },
      duration: {
        title: "Duration and frequency",
        text: "The number and frequency of sessions are set after the initial assessment, according to each person's stage and goals.",
      },
      faq: [
        { q: "How soon after giving birth can I start?", a: "It depends on the type of birth, how your recovery has gone and your doctor's advice. If in doubt, contact us before booking." },
        { q: "How do I know if I have diastasis recti?", a: "Common signs are a bulge or dip along the middle of the abdomen when sitting up or straining, and a feeling of abdominal weakness. It is confirmed at the assessment, by palpation and, when indicated, with ultrasound." },
        { q: "Can diastasis recti be treated without surgery?", a: "Many cases improve with physiotherapy and specific exercise, but the response varies from person to person. The assessment shows where you're starting from and what's realistic." },
        { q: "I gave birth several years ago. Is it still worth it?", a: "Yes. Diastasis recti, abdominal weakness and scars can be assessed and treated long after giving birth. The plan is set from the assessment." },
        { q: "Can a C-section scar be treated?", a: "Once the scar has closed and healed, physiotherapy works on the mobility of the skin and surrounding tissue. It may be indicated when the scar pulls, feels stuck or has altered sensation." },
        { q: "What is the first assessment like?", a: "It starts with a conversation about your clinical history and goals, followed by a physical assessment explained step by step." },
      ],
      related: ["msk"],
      page: {
        lead: "Postnatal care, lymphatic drainage, lipoedema and body aesthetics, with physiotherapist Angela Brazona.",
        heroWide: "wide-dermato",
        heroBeside: true,
        relatedPhoto: "related-dermato",
        areas: true,
        about: {
          statement: ["", "Dermatofunctional physiotherapy", " brings health and aesthetics together: it restores how your body works and also cares for how it looks and feels."],
          text: [
            "Every body is different. That's why each treatment starts with an individual assessment that identifies each person's needs and goals and sets the most suitable plan.",
            "We believe aesthetics should go hand in hand with health and well-being, from postnatal care to recovery after surgery, from lipoedema to body contouring.",
          ],
          listTitle: "What we treat",
        },
        care: {
          nav: "Treatments",
          title: "Our treatments",
          intro: "Choose a treatment to see what it involves, its benefits and how it can help.",
          listLabel: "Dermatofunctional physiotherapy treatments",
          moreLabel: "Read more",
          lessLabel: "Show less",
          items: [
            {
              id: "pos-parto",
              label: "Postnatal",
              title: "Postnatal abdominal rehabilitation",
              tagline: "Health, recovery and aesthetics in harmony.",
              summary: "After birth, the abdominal muscles, skin, posture and pelvic floor may show changes that deserve specialised care. Recovery brings together two dimensions: health and aesthetics.",
              groups: {
                title: "What we aim for",
                items: [
                  {
                    label: "Health",
                    intro: "Restoring abdominal function and balance.",
                    points: [
                      "Improve the strength and function of the abdominal muscles",
                      "Work on diastasis recti",
                      "Restore trunk stability and control",
                      "Improve posture and the management of abdominal pressure",
                      "Help the abdominal muscles and pelvic floor work together",
                      "Return safely to physical activity and daily tasks",
                    ],
                  },
                  {
                    label: "Aesthetics",
                    intro: "Restoring harmony and body confidence.",
                    points: [
                      "The firmness and tone of the abdominal muscles",
                      "The shape and appearance of the abdomen",
                      "Posture and body silhouette",
                      "Body image and self-confidence",
                    ],
                  },
                ],
              },
              note: "Aesthetic results depend on several factors, including individual characteristics, the changes caused by pregnancy and how the tissues recover.",
              more: [
                {
                  title: "Why the abdomen changes",
                  text: [
                    "During pregnancy, the abdominal muscles adapt to make room for the baby. These changes can lead to diastasis recti (separation of the rectus abdominis muscles), loss of muscle strength, postural changes and less trunk stability.",
                    "Better muscle function and tone can contribute to a firmer, more defined abdomen, with a positive effect on body image and self-esteem.",
                  ],
                },
                {
                  title: "Personalised care, from the inside out",
                  text: [
                    "Every woman is different. That's why care starts with an individual assessment that identifies muscular and functional changes and sets each patient's goals. The plan may combine therapeutic exercise, physiotherapy techniques and specific strategies for abdominal recovery.",
                  ],
                },
                {
                  title: "Caring for your health is caring for your beauty",
                  text: [
                    "Recovering doesn't only mean getting back to how you looked before pregnancy. It means feeling well, regaining how your body works, improving self-esteem and moving with confidence again.",
                  ],
                },
              ],
              wa: { topic: "postnatal abdominal rehabilitation", cta: "Ask about postnatal rehabilitation" },
            },
            {
              id: "drenagem",
              label: "Lymphatic drainage",
              title: "Manual lymphatic drainage",
              tagline: "Health, lightness and well-being for your body.",
              summary: "Gentle, slow and rhythmic movements that stimulate the flow of lymph and help reduce fluid build-up in the tissues, swelling and heaviness.",
              options: {
                title: "During pregnancy and after birth",
                items: [
                  {
                    label: "Pregnancy",
                    title: "During pregnancy",
                    tagline: "More comfort, lightness and well-being.",
                    text: "Hormonal and circulatory changes can encourage fluid retention, with swelling in the legs, feet and ankles. With movements adapted to pregnancy, drainage can help reduce swelling and relieve heavy legs.",
                  },
                  {
                    label: "After birth",
                    title: "After birth",
                    tagline: "Comfort and lightness during recovery.",
                    text: "After birth, the body goes through several hormonal and circulatory changes, and fluid can build up. When indicated, drainage can help ease swelling and bring more comfort and lightness.",
                  },
                ],
              },
              groups: {
                title: "Benefits",
                items: [
                  {
                    label: "For health",
                    points: [
                      "Helps reduce swelling and fluid retention",
                      "Supports lymphatic circulation",
                      "Relieves heavy, swollen legs",
                      "Can be important in recovery after certain surgeries, when clinically indicated",
                      "Improves comfort and mobility when there is swelling",
                    ],
                  },
                  {
                    label: "For aesthetics",
                    points: [
                      "Reduces swelling and the feeling of volume caused by fluid build-up",
                      "Contributes to a less swollen appearance",
                      "Can improve comfort and a feeling of lightness",
                      "Complements some aesthetic and post-surgery care programmes, when appropriate",
                    ],
                  },
                ],
              },
              more: [
                {
                  title: "The lymphatic system",
                  text: [
                    "The lymphatic system is essential for fluid balance and for the body to work well. When fluid builds up in the tissues or doesn't circulate easily, swelling, heaviness and discomfort can appear.",
                  ],
                },
                {
                  title: "A personalised approach",
                  text: [
                    "We use lymphatic drainage as part of a personalised approach, based on each person's needs and goals. During pregnancy, each treatment is carried out by qualified professionals, respecting each woman's needs and the progress of the pregnancy.",
                  ],
                },
              ],
              wa: { topic: "lymphatic drainage", cta: "Ask about lymphatic drainage" },
            },
            {
              id: "pos-operatorio",
              label: "Post-surgery",
              title: "After surgery: drainage and scars",
              tagline: "Careful, safe and balanced recovery.",
              summary: "After surgery, swelling, tightness and tissue changes can appear. We combine manual lymphatic drainage and scar treatment, according to each patient's needs.",
              groups: {
                title: "What we work on",
                items: [
                  {
                    label: "Lymphatic drainage",
                    intro: "A gentle technique that helps control fluid build-up in the tissues. It can help to:",
                    points: [
                      "Reduce swelling",
                      "Ease tightness and discomfort",
                      "Improve tissue comfort",
                      "Support recovery after surgery",
                    ],
                  },
                  {
                    label: "Scars",
                    intro: "A scar can show changes in texture, elasticity, sensation and mobility. We aim to:",
                    points: [
                      "Improve tissue elasticity and mobility",
                      "Reduce adhesions and scar restrictions",
                      "Improve flexibility of the treated area",
                      "Support better scar quality and appearance",
                    ],
                  },
                ],
              },
              more: [
                {
                  title: "Health and aesthetics in balance",
                  text: [
                    "Recovery after surgery isn't only about appearance. Restoring function, mobility and tissue comfort is essential, while also supporting how the treated area looks as it heals.",
                    "Each treatment is personalised, respecting the type of surgery, the healing stage and the medical team's advice.",
                  ],
                },
              ],
              wa: { topic: "post-surgery physiotherapy", cta: "Ask about post-surgery care" },
            },
            {
              id: "lipedema",
              label: "Lipoedema",
              title: "Lipoedema protocol",
              tagline: "Care for your legs. Ease the discomfort. Regain your well-being.",
              summary: "Lipoedema is a chronic condition of the fatty tissue, with a disproportionate build-up of fat, mainly in the legs. The protocol combines therapeutic techniques to manage symptoms and improve comfort and quality of life.",
              steps: {
                title: "What the protocol involves",
                items: [
                  { title: "Manual lymphatic drainage", text: "Gentle, specific movements that help control swelling and ease heaviness in the legs." },
                  { title: "Soft-tissue techniques", text: "Manual techniques adapted to tissue sensitivity, to improve comfort and mobility and ease tightness." },
                  { title: "Devices", text: "Equipment chosen according to the assessment, complementing the manual work when appropriate." },
                ],
              },
              groups: {
                title: "Care can help to",
                items: [
                  {
                    label: "Benefits",
                    points: [
                      "Ease heaviness and tiredness in the legs",
                      "Reduce swelling, when present",
                      "Improve comfort and mobility",
                      "Reduce tightness and discomfort in the tissues",
                      "Complement the management of lipoedema symptoms",
                      "Improve well-being and body image",
                    ],
                  },
                ],
              },
              more: [
                {
                  title: "What lipoedema is",
                  text: [
                    "Lipoedema is a chronic condition of the fatty tissue, with a disproportionate and usually symmetrical build-up of fat, mainly in the legs and sometimes in the arms. It is often associated with pain, tenderness to touch, heaviness, easy bruising and physical discomfort.",
                  ],
                },
                {
                  title: "Personalised care for every woman",
                  text: [
                    "Lipoedema shows up differently in each person. That's why we always start with an individual assessment, considering sensitivity, symptoms, tissue characteristics and each patient's needs. Our aim is specialised, respectful care adapted to each stage of the condition.",
                  ],
                },
                {
                  title: "Caring for your health is caring for yourself",
                  text: [
                    "Living with lipoedema doesn't mean accepting pain, discomfort or limitations as an inevitable part of daily life. We want to help you feel better, with an approach that brings together physiotherapy, well-being and personalised care.",
                  ],
                },
              ],
              wa: { topic: "lipoedema", cta: "Ask about the lipoedema protocol" },
            },
            {
              id: "remodelacao",
              label: "Body contouring",
              title: "Body contouring",
              tagline: "Enhance your shape. Care for your body. Feel good in yourself.",
              summary: "Non-invasive aesthetic techniques and treatments to improve body shape, skin firmness and skin quality, in a personalised way.",
              groups: {
                title: "Benefits",
                items: [
                  {
                    label: "Benefits",
                    points: [
                      { title: "Body shape", text: "Helps define and balance certain areas of the body." },
                      { title: "Skin firmness", text: "Can contribute to a firmer, more toned appearance." },
                      { title: "Cellulite", text: "Some techniques can help improve the look of uneven skin." },
                      { title: "Skin texture", text: "Supports a more even, cared-for appearance." },
                      { title: "Well-being and self-esteem", text: "Helps you feel more comfortable and confident with your body image." },
                    ],
                  },
                ],
              },
              chips: {
                title: "Areas that can be treated",
                intro: "Depending on the assessment and the techniques used.",
                items: ["Abdomen", "Waist and flanks", "Thighs", "Buttocks", "Arms"],
              },
              more: [
                {
                  title: "Treatment adapted to you",
                  text: [
                    "Every body is different. That's why we start with an individual assessment to identify each patient's needs and set the most suitable treatment plan. The aim is a natural aesthetic improvement that respects health, body characteristics and each person's expectations.",
                  ],
                },
              ],
              wa: { topic: "body contouring", cta: "Ask about body contouring" },
            },
            {
              id: "gordura-celulite-flacidez",
              label: "Fat, cellulite and laxity",
              title: "Personalised treatment",
              tagline: "Localised fat, cellulite and skin laxity: treatment designed for you.",
              summary: "No two treatments are the same. We create individual body-contouring plans, choosing the techniques best suited to each patient's needs and goals.",
              options: {
                title: "What you'd like to treat",
                items: [
                  {
                    label: "Localised fat",
                    title: "Localised fat",
                    tagline: "Enhance body shape and balance.",
                    text: "Localised fat can persist in certain areas of the body, even with a balanced diet and regular physical activity. Treatment can help to:",
                    points: ["Improve body shape", "Work on areas with localised fat", "Create a more balanced appearance", "Complement a healthy diet and physical activity"],
                  },
                  {
                    label: "Cellulite",
                    title: "Cellulite",
                    tagline: "Smoother, more even-looking skin.",
                    text: "Cellulite is a change in the skin's surface that creates irregularities and the familiar \"orange peel\" look. We aim to:",
                    points: ["Improve the look of the skin", "Reduce the appearance of cellulite", "Improve skin texture and evenness", "Support better local circulation", "Improve tissue comfort and quality"],
                  },
                  {
                    label: "Skin laxity",
                    title: "Skin laxity",
                    tagline: "More firmness, tone and definition.",
                    text: "Skin laxity can come with ageing, weight changes, pregnancy or reduced tissue elasticity. Treatment can help to:",
                    points: ["Improve skin firmness and appearance", "Stimulate tissue tone, depending on the technique used", "Improve body appearance and definition", "Create a more balanced silhouette"],
                  },
                ],
              },
              more: [
                {
                  title: "Every body is different",
                  text: [
                    "Every body is different and deserves specific care. Localised fat, cellulite and skin laxity are changes that can affect body shape, skin firmness and self-esteem. Treatments are chosen according to the individual assessment.",
                  ],
                },
              ],
              wa: { topic: "personalised body treatment (localised fat, cellulite or skin laxity)", cta: "Ask about personalised treatment" },
            },
            {
              id: "massagem-terapeutica",
              label: "Therapeutic massage",
              title: "Therapeutic back massage",
              tagline: "Ease muscle tension. Regain comfort and well-being.",
              summary: "Stress, poor posture and repetitive movements can cause tension, stiffness and discomfort in the back. Therapeutic massage uses strokes and pressures adapted to each person to ease tension and promote relaxation.",
              groups: {
                title: "Benefits and who it's for",
                items: [
                  {
                    label: "Benefits",
                    points: [
                      { title: "Less muscle tension", text: "Helps reduce knots and muscle overload." },
                      { title: "Pain relief", text: "Can reduce muscle discomfort in the back." },
                      { title: "Mobility", text: "Reduces stiffness and makes movement easier." },
                      { title: "Relaxation", text: "Eases built-up tension." },
                      { title: "Physical and emotional well-being", text: "A sense of calm that helps relieve stress." },
                      { title: "Body awareness", text: "Helps you notice tension and look after your posture." },
                    ],
                  },
                  {
                    label: "Who it's for",
                    intro: "It can help people with:",
                    points: [
                      "Neck, upper or lower back muscle tension",
                      "Discomfort from long periods in the same posture",
                      "Muscle overload from work or physical activity",
                      "Stiffness and a heavy feeling in the back",
                      "Stress and built-up muscle tension",
                    ],
                  },
                ],
              },
              more: [
                {
                  title: "Look after your back",
                  text: [
                    "Well-being starts with a balanced body. With an individual approach and suitable therapeutic techniques, we help ease muscle tension and restore comfort in your daily life.",
                  ],
                },
              ],
              wa: { topic: "therapeutic massage", cta: "Ask about therapeutic massage" },
            },
            {
              id: "massagem-facial",
              label: "Facial massage",
              title: "Facial massage",
              tagline: "Care for your face. Enhance your beauty. Awaken your well-being.",
              summary: "Gentle, specific movements that promote relaxation, stimulate local circulation and leave the skin feeling fresh. It is personalised, respecting the characteristics of each skin.",
              groups: {
                title: "Benefits",
                items: [
                  {
                    label: "Aesthetic",
                    points: [
                      { title: "Radiance", text: "A fresher, revitalised look." },
                      { title: "Local circulation", text: "Supports surface blood circulation." },
                      { title: "Less puffiness", text: "Can help reduce mild swelling of the face." },
                      { title: "Skin appearance", text: "A healthier, cared-for look." },
                      { title: "Facial muscles", text: "Eases tension from facial expressions." },
                      { title: "Rested skin", text: "A fresher, revitalised appearance." },
                    ],
                  },
                  {
                    label: "Well-being",
                    points: [
                      "Reduces facial tension and tiredness",
                      "Promotes physical and mental relaxation",
                      "Offers a moment of calm and self-care",
                      "Eases tension in the jaw, forehead and face",
                      "Contributes to an overall sense of well-being",
                    ],
                  },
                ],
              },
              more: [
                {
                  title: "A moment just for you",
                  text: [
                    "The face is one of the places where stress, tiredness and daily tension show most. Caring for your beauty is also caring for your health and emotional balance: facial massage is an invitation to slow down, relax and take some time for yourself.",
                  ],
                },
              ],
              wa: { topic: "facial massage", cta: "Ask about facial massage" },
            },
          ],
        },
        person: {
          bio: "is a physiotherapist and leads dermatofunctional physiotherapy at Fisio4you, focusing on women's health during pregnancy and after childbirth and on care that brings health and aesthetics together.",
        },
      },
    },
  },

  consultations: {
    title: "Consultations",
    sub: "Clinical Pilates, Psychology, Physical Medicine and Osteopathy. See what each consultation treats and choose the one you need.",
    available: "Available consultations",
    others: "Other consultations",
    items: {
      pilates: {
        name: "Clinical Pilates",
        short: "Exercise led by health professionals to improve movement control, strength and posture.",
        lead: "Clinical Pilates adapts the principles of the Pilates method to each person's health needs, to improve movement control, strength and posture.",
        sections: [
          { title: "What Clinical Pilates is", text: ["It is a form of exercise led by health professionals. It starts from the Pilates method, but exercises are chosen and adjusted according to each person's health, goals and progress.", "The work focuses on breathing, trunk control, mobility and strength, with attention to the quality of each movement."] },
          { title: "When it can help", list: ["Low back and neck pain", "Postural changes", "Reduced strength, mobility or balance", "Continuing exercise after rehabilitation", "Pregnancy and the postnatal period, where appropriate"] },
          { title: "How it works", text: ["It starts by understanding your clinical history, your limitations and what you want to achieve. Suitable exercises are then set, and they progress as you gain control and confidence in your movement."] },
          { title: "Clinical Pilates and rehabilitation", text: ["It can complement rehabilitation or help maintain your progress once it ends. If you have an injury or health condition, bring any tests or medical reports you have, so the exercise can be adjusted to your situation."] },
        ],
        meta: { title: "Clinical Pilates in Portimão | Fisio4you", description: "Clinical Pilates in Portimão: exercise led by health professionals to improve movement control, strength and posture." },
      },
      psychology: {
        name: "Psychology",
        short: "Psychological assessment and support, in a confidential space where you are listened to.",
        lead: "A Psychology consultation helps you understand and deal with emotional, behavioural and relationship difficulties, in a confidential space where you are listened to.",
        sections: [
          { title: "What a Psychology consultation is", text: ["It is a space to talk about what worries you or causes you distress, with the support of a psychology professional. The aim is to better understand what is happening and find ways of dealing with it.", "You don't need to be in crisis to seek help. Many people come during a period of change, or when a difficulty starts to affect their daily life."] },
          { title: "When it can help", list: ["Anxiety and stress", "Changes in mood", "Coping with persistent pain", "Adjusting to an injury and returning to sport", "Life changes and difficult times"] },
          { title: "What to expect", text: ["The first consultations explore what brought you, get to know your history and set goals. From there, support is tailored to you and your situation."] },
          { title: "Pain, injury and psychological wellbeing", text: ["Pain and injury can affect sleep, mood, motivation and confidence in moving or competing again. Paying attention to these aspects can be an important part of recovery."] },
        ],
        meta: { title: "Psychology Consultation in Portimão | Fisio4you", description: "Psychology consultation in Portimão: assessment and support for situations such as anxiety, stress, persistent pain or adjusting to an injury." },
      },
      physiatry: {
        name: "Physical Medicine",
        short: "A medical consultation in physical medicine and rehabilitation, for diagnosis and guidance of your rehabilitation plan.",
        lead: "Physical Medicine and Rehabilitation is the medical speciality that assesses and guides people with pain or with limited mobility and function caused by illness or injury.",
        sections: [
          { title: "What Physical Medicine is", text: ["It is a medical speciality focused on preventing, diagnosing and treating conditions that affect movement and functional ability.", "The aim is to reduce pain, restore function and help each person reach the greatest possible independence in daily life, at work and in sport."] },
          { title: "When to seek this consultation", list: ["Spine and joint pain", "Muscle, tendon and sports injuries", "Rehabilitation after surgery or a fracture", "Limited mobility and function", "After-effects of neurological conditions"] },
          { title: "What to expect", text: ["The consultation includes your clinical history and a physical examination, and further tests may be needed. Based on this assessment, the doctor guides the diagnosis and explains the appropriate treatment options. If you have tests or medical reports, bring them with you."] },
          { title: "Physical medicine and physiotherapy", text: ["The physical medicine doctor assesses and guides rehabilitation. The physiotherapist delivers physiotherapy using manual techniques, exercise and other resources. Where indicated, the two can complement each other in the same recovery."] },
        ],
        meta: { title: "Physical Medicine Consultation in Portimão | Fisio4you", description: "Physical Medicine consultation in Portimão: medical assessment of pain, injuries and limited mobility, for diagnosis and rehabilitation guidance." },
      },
      osteopathy: {
        name: "Osteopathy",
        short: "A hands-on approach focused on the mobility of joints and tissues.",
        lead: "Osteopathy is a hands-on approach that assesses how the body's different structures move and relate to each other, and works on areas where mobility is restricted.",
        sections: [
          { title: "What Osteopathy is", text: ["It looks at the body as a whole: a limitation in one area can influence how others move. The assessment is therefore not limited to where you feel discomfort.", "Treatment uses manual techniques on the joints, muscles and other tissues."] },
          { title: "When it can help", list: ["Low back and neck pain", "Muscle tension", "Joint stiffness and limited movement", "Discomfort linked to posture or repetitive strain"] },
          { title: "What to expect", text: ["The consultation starts with your clinical history and a movement assessment. Techniques are chosen for each person and explained before they are applied. If you have tests or medical reports, bring them with you."] },
          { title: "When to see a doctor first", text: ["If the pain began after trauma, is severe or getting worse, or comes with fever, loss of strength or changes in sensation, seek a medical assessment first."] },
        ],
        meta: { title: "Osteopathy Consultation in Portimão | Fisio4you", description: "Osteopathy consultation in Portimão: a hands-on approach focused on the mobility of joints and tissues, for situations such as low back and neck pain." },
      },
    },
  },

  // Especialidades futuras: retiradas do site por agora (ver PRODUCT.md). Texto guardado para reativar quando abrirem.
  comingSoon: {
    eyebrow: "Coming soon",
    title: "New specialities",
    sub: "We're growing to look after you even more completely. Ask to be notified when they open.",
    items: [
      { icon: "stethoscope", name: "Physical Medicine & Rehabilitation", text: "Medical consultation for diagnosis and guidance of your rehabilitation plan." },
      { icon: "bone", name: "Osteopathy", text: "A hands-on approach focused on joint and tissue mobility." },
      { icon: "flower", name: "Clinical Pilates", text: "Exercise led by health professionals for control, strength and posture." },
      { icon: "brain", name: "Psychology", text: "Psychological support, including pain management and returning to sport after injury." },
    ],
  },

  about: {
    eyebrow: "About us",
    title: "Fisio4you, rehabilitation centre in Portimão",
    sub: "A physiotherapy clinic run by physiotherapist Mário Barroso, with two areas of practice: musculoskeletal physiotherapy, with Mário, and dermatofunctional physiotherapy, with physiotherapist Angela Brazona.",
    storyTitle: "Our story",
    story: ["[[Ask Mário for the clinic's story.]]"],
    missionTitle: "The clinic",
    mission: "Fisio4you treats musculoskeletal injuries and supports postnatal recovery, with ultrasound in the assessment and rehabilitation in the clinic's own gym.",
    valuesTitle: "How we work",
    values: [
      { icon: "target", title: "Assessment before treatment", text: "Every plan starts from a physical assessment and, when indicated, an ultrasound scan." },
      { icon: "users", title: "Supervised exercise", text: "Rehabilitation includes exercise supervised by physiotherapists in the clinic's gym." },
      { icon: "trending", title: "Regular reassessment", text: "Progress is measured during treatment and the plan is adjusted when needed." },
    ],
    founderTitle: "Clinical team",
    founderLong: ["[[Long version of Mário's background: training, specialisations, experience with athletes.]]"],
    teamTitle: "The team",
    galleryTitle: "Facilities",
    galleryIntro: "Everything under one roof in Portimão: the plan moves from the couch to the gym and on to recovery without leaving the clinic.",
    gallerySpaces: [
      { title: "Treatment rooms", text: "Assessment, with ultrasound when indicated, and manual therapy on the couch, in private." },
      { title: "Rehabilitation gym", text: "100 m² with strength machines, a rack, kettlebells and treadmills, for supervised exercise." },
      { title: "Recovery", text: "Ice bath, sauna and compression therapy, always guided by the team." },
    ],
    galleryPhotos: ["clinic-ginasio", "clinic-sala-fisio4you", "clinic-corredor-mural", "clinic-sala-tratamento", "clinic-camisolas"],
  },

  contact: {
    eyebrow: "Contact",
    title: "Contact",
    sub: "Physiotherapy in Portimão. Appointments are booked on WhatsApp or by phone.",
    email: "Email",
    address: "Address",
    phone: "Phone",
    findUs: "How to find us",
    accessTitle: "Accessibility and parking",
    access: "[[confirm accessibility and parking]]",
  },

  footer: {
    tagline: "Physiotherapy clinic and rehabilitation centre in Portimão.",
    services: "Physiotherapy",
    clinic: "Clinic",
    contacts: "Contact",
    team: "Team",
    legal: "Fisio4you, Lda",
    nif: "VAT no.",
    ers: "ERS registration no.",
    license: "Licence no.",
    complaints: "Electronic Complaints Book",
    privacy: "Privacy Policy",
    terms: "Terms",
    cookies: "Cookie Policy",
    cookieSettings: "Cookie preferences",
    rights: "All rights reserved.",
    builtBy: "Built by",
  },

  cookieBanner: {
    text: "We use essential cookies to make the site work and, with your consent, analytics cookies.",
    accept: "Accept",
    reject: "Decline",
    more: "Learn more",
  },

  legal: {
    updated: "Last updated: October 2026",
    privacy: {
      title: "Privacy Policy",
      sections: [
        { h: "Data controller", p: ["Fisio4you, Lda, VAT no. 514 628 847, Rua Francisco Alvo, loja 11, 8500-759 Portimão, Portugal. Contact: fisio4youportimao@gmail.com."] },
        { h: "What data we process", p: ["This website has no forms. Data you send us via WhatsApp, phone or email (name, contact details and the reason for your appointment) is used only to reply and book your appointment.", "With your consent, we may collect anonymous or pseudonymised browsing data to measure how the site is used."] },
        { h: "Legal basis and retention", p: ["We process data to take steps at your request before entering into a contract, to comply with legal obligations and on the basis of your consent. We keep data only for as long as needed for these purposes or as required by law."] },
        { h: "Data sharing", p: ["WhatsApp messages are processed by WhatsApp/Meta under their own policies. We do not sell or share your data with third parties for commercial purposes."] },
        { h: "Your rights", p: ["You may request access, rectification, erasure, restriction, portability or object to processing by writing to fisio4youportimao@gmail.com. You also have the right to lodge a complaint with the Portuguese Data Protection Authority (www.cnpd.pt)."] },
      ],
    },
    terms: {
      title: "Terms of Use",
      sections: [
        { h: "Purpose", p: ["This website presents Fisio4you, Lda and its services. The information is general and does not replace an individual clinical assessment."] },
        { h: "Intellectual property", p: ["Texts, images, logo and other content belong to Fisio4you, Lda or are used with permission, and may not be reproduced without consent."] },
        { h: "Liability", p: ["We aim to keep information accurate and up to date but cannot guarantee it is error-free. Treatment outcomes depend on each person and their clinical situation."] },
        { h: "External links", p: ["The site links to third-party services (WhatsApp, Google Maps, social networks), whose policies are the responsibility of their operators."] },
        { h: "Governing law", p: ["Portuguese law applies. Consumers may use the Electronic Complaints Book or an alternative dispute resolution body."] },
      ],
    },
    cookies: {
      title: "Cookie Policy",
      sections: [
        { h: "What cookies are", p: ["Cookies are small files stored on your device when you visit a website."] },
        { h: "Cookies we use", p: ["Essential: store your consent choice (browser local storage).", "Analytics (only with consent): Google Tag Manager / Google Analytics, to understand how the site is used.", "Third-party: the Google Maps embed on the Contact page may set its own cookies."] },
        { h: "Managing consent", p: ["You can change your choice at any time via the “Cookie preferences” link in the footer, or delete cookies in your browser settings."] },
      ],
    },
  },
};
